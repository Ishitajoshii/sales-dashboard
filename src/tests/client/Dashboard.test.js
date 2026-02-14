import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../../client/components/Dashboard';

describe('Dashboard Component', () => {
    test('renders the Dashboard component', () => {
        render(<Dashboard />);
        const salesOverviewElement = screen.getByText(/Sales Overview/i);
        const keyMetricsElement = screen.getByText(/Key Metrics/i);

        expect(salesOverviewElement).toBeInTheDocument();
        expect(keyMetricsElement).toBeInTheDocument();
    });

    test('contains SalesChart component', () => {
        render(<Dashboard />);
        const salesChartElement = screen.getByRole('img', { hidden: true }); // Assuming SalesChart renders a canvas
        expect(salesChartElement).toBeInTheDocument();
    });

    test('contains KeyMetrics component', () => {
        render(<Dashboard />);
        const totalRevenueLabel = screen.getByText(/Total Revenue/i);
        expect(totalRevenueLabel).toBeInTheDocument();
    });
});