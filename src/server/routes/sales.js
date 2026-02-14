const express = require('express');
const Sale = require('../models/Sale');

const router = express.Router();

// GET /api/sales
router.get('/', async (req, res) => {
    try {
        const salesData = await Sale.getAll();
        res.status(200).json(salesData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve sales data' });
    }
});

// GET /api/sales/metrics
router.get('/metrics', async (req, res) => {
    try {
        const totalRevenue = await Sale.getTotalRevenue();
        const averageOrderValue = await Sale.getAverageOrderValue();
        const conversionRate = await Sale.getConversionRate();

        const metrics = {
            totalRevenue,
            averageOrderValue,
            conversionRate,
        };

        res.status(200).json(metrics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve key metrics' });
    }
});

module.exports = router;