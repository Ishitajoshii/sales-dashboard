import { fetchSalesData, fetchKeyMetrics } from '../../src/client/api';
import fetch from 'node-fetch';

// Mock the global fetch function
global.fetch = jest.fn();

describe('API Functions', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('fetchSalesData should successfully fetch data', async () => {
        const mockData = [{ date: '2024-01-01', sales: 100 }];
        fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockData),
        });

        const data = await fetchSalesData();
        expect(fetch).toHaveBeenCalledWith('/api/sales');
        expect(data).toEqual(mockData);
    });

    it('fetchSalesData should handle errors', async () => {
        fetch.mockResolvedValue({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error'
        });

        await expect(fetchSalesData()).rejects.toThrow('HTTP error! Status: 500');
        expect(fetch).toHaveBeenCalledWith('/api/sales');
    });

    it('fetchKeyMetrics should successfully fetch data', async () => {
        const mockData = { totalRevenue: 1000, averageOrderValue: 100 };
        fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockData),
        });

        const data = await fetchKeyMetrics();
        expect(fetch).toHaveBeenCalledWith('/api/metrics');
        expect(data).toEqual(mockData);
    });

    it('fetchKeyMetrics should handle errors', async () => {
        fetch.mockRejectedValue(new Error('Network error'));

        await expect(fetchKeyMetrics()).rejects.toThrow('Network error');
        expect(fetch).toHaveBeenCalledWith('/api/metrics');
    });
});