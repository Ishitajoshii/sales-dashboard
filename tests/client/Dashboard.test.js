import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '../../src/client/components/Dashboard';
import * as api from '../../src/client/api';

// Mock the API calls
jest.mock('../../src/client/api', () => ({
    fetchSalesData: jest.fn(),
    fetchKeyMetrics: jest.fn()
}));

describe('Dashboard Component', () => {
    beforeEach(() => {
        api.fetchSalesData.mockClear();
        api.fetchKeyMetrics.mockClear();
    });

    it('renders loading state initially', () => {
        render(<Dashboard />);
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });

    it('fetches and displays sales data and key metrics', async () => {
        const mockSalesData = [{ date: '2024-01-01', sales: 100 }, { date: '2024-01-02', sales: 200 }];
        const mockKeyMetrics = { totalRevenue: 300, averageOrderValue: 150 };

        api.fetchSalesData.mockResolvedValue(mockSalesData);
        api.fetchKeyMetrics.mockResolvedValue(mockKeyMetrics);

        render(<Dashboard />);

        await waitFor(() => {
            expect(api.fetchSalesData).toHaveBeenCalledTimes(1);
            expect(api.fetchKeyMetrics).toHaveBeenCalledTimes(1);
        });

        expect(screen.getByText(/Total Revenue:/i)).toBeInTheDocument();
        expect(screen.getByText(/300/i)).toBeInTheDocument();
        expect(screen.getByText(/Average Order Value:/i)).toBeInTheDocument();
        expect(screen.getByText(/150/i)).toBeInTheDocument();
    });

    it('displays error message when API calls fail', async () => {
        api.fetchSalesData.mockRejectedValue(new Error('Failed to fetch sales data'));
        api.fetchKeyMetrics.mockRejectedValue(new Error('Failed to fetch key metrics'));

        render(<Dashboard />);

        await waitFor(() => {
            expect(api.fetchSalesData).toHaveBeenCalledTimes(1);
            expect(api.fetchKeyMetrics).toHaveBeenCalledTimes(1);
        });

        expect(screen.getByText(/Error fetching data/i)).toBeInTheDocument();
    });
});