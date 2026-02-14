import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SalesChart = () => {
    const [salesData, setSalesData] = useState([]);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/sales');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setSalesData(data);
            } catch (error) {
                console.error("Could not fetch sales data:", error);
                // Optionally set an error state to display a message to the user
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (salesData.length > 0) {
            const labels = salesData.map(item => item.date);
            const data = salesData.map(item => item.revenue);

            const chartConfig = {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Revenue',
                        data: data,
                        backgroundColor: 'rgba(99, 102, 241, 0.2)', // primary color with opacity
                        borderColor: '#6366F1', // primary color
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 3,
                        pointBackgroundColor: '#6366F1',
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: '#9CA3AF' // text-secondary-color
                            },
                            grid: {
                                color: 'rgba(55, 65, 81, 0.5)' // A shade lighter than surface-color
                            }
                        },
                        x: {
                            ticks: {
                                color: '#9CA3AF' // text-secondary-color
                            },
                            grid: {
                                color: 'rgba(55, 65, 81, 0.5)' // A shade lighter than surface-color
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: '#E5E7EB' // text-color
                            }
                        }
                    }
                }
            };

            const ctx = chartRef.current.getContext('2d');

            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            chartInstance.current = new Chart(ctx, chartConfig);


            return () => {
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }
            };
        }
    }, [salesData]);

    return (
        <canvas ref={chartRef} aria-label="Sales Chart" role="img"></canvas>
    );
};

export default SalesChart;