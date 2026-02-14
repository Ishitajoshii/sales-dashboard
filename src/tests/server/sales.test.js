const request = require('supertest');
const express = require('express');
const salesRoutes = require('../../server/routes/sales');
const Sale = require('../../server/models/Sale');

// Mock the Sale model
jest.mock('../../server/models/Sale', () => ({
    getAll: jest.fn(),
    getTotalRevenue: jest.fn(),
    getAverageOrderValue: jest.fn(),
    getConversionRate: jest.fn(),
}));

const app = express();
app.use('/api/sales', salesRoutes);

describe('Sales API Routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('GET /api/sales - should return all sales data', async () => {
        const mockSalesData = [
            { id: 1, date: '2024-01-01', revenue: 1500 },
            { id: 2, date: '2024-01-02', revenue: 1650 },
        ];
        Sale.getAll.mockResolvedValue(mockSalesData);

        const response = await request(app).get('/api/sales');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockSalesData);
        expect(Sale.getAll).toHaveBeenCalledTimes(1);
    });

    it('GET /api/sales - should return 500 if there is an error', async () => {
        Sale.getAll.mockRejectedValue(new Error('Failed to retrieve data'));

        const response = await request(app).get('/api/sales');

        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to retrieve sales data' });
        expect(Sale.getAll).toHaveBeenCalledTimes(1);
    });

    it('GET /api/sales/metrics - should return key metrics', async () => {
        Sale.getTotalRevenue.mockResolvedValue(125000);
        Sale.getAverageOrderValue.mockResolvedValue(75);
        Sale.getConversionRate.mockResolvedValue(0.025);

        const response = await request(app).get('/api/sales/metrics');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            totalRevenue: 125000,
            averageOrderValue: 75,
            conversionRate: 0.025,
        });
        expect(Sale.getTotalRevenue).toHaveBeenCalledTimes(1);
        expect(Sale.getAverageOrderValue).toHaveBeenCalledTimes(1);
        expect(Sale.getConversionRate).toHaveBeenCalledTimes(1);
    });

    it('GET /api/sales/metrics - should return 500 if there is an error', async () => {
        Sale.getTotalRevenue.mockRejectedValue(new Error('Failed to retrieve data'));

        const response = await request(app).get('/api/sales/metrics');

        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to retrieve key metrics' });
        expect(Sale.getTotalRevenue).toHaveBeenCalledTimes(1);
    });
});