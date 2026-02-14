import React from 'react';
import SalesChart from './SalesChart';
import KeyMetrics from './KeyMetrics';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="card">
                <h2>Sales Overview</h2>
                <SalesChart />
            </div>
            <div className="card">
                <h2>Key Metrics</h2>
                <KeyMetrics />
            </div>
        </div>
    );
};

export default Dashboard;