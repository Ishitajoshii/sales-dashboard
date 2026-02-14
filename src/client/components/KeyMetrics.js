import React, { useState, useEffect } from 'react';

const KeyMetrics = () => {
    const [metrics, setMetrics] = useState({
        totalRevenue: 0,
        averageOrderValue: 0,
        conversionRate: 0,
    });

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await fetch('/api/sales/metrics');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setMetrics(data);
            } catch (error) {
                console.error("Could not fetch key metrics:", error);
                // Optionally set an error state to display a message to the user
            }
        };

        fetchMetrics();
    }, []);

    return (
        <div className="key-metrics">
            <div className="metric-card">
                <h3>Total Revenue</h3>
                <p>${metrics.totalRevenue.toFixed(2)}</p>
            </div>
            <div className="metric-card">
                <h3>Average Order Value</h3>
                <p>${metrics.averageOrderValue.toFixed(2)}</p>
            </div>
            <div className="metric-card">
                <h3>Conversion Rate</h3>
                <p>{(metrics.conversionRate * 100).toFixed(2)}%</p>
            </div>
        </div>
    );
};

export default KeyMetrics;