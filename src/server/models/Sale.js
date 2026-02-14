const knex = require('../db/knex');

class Sale {
    static async getAll() {
        try {
            const salesData = await knex.select('*').from('sales');
            return salesData;
        } catch (error) {
            console.error("Error fetching all sales:", error);
            throw error;
        }
    }

    static async getTotalRevenue() {
        try {
            const result = await knex('sales').sum('revenue as totalRevenue').first();
            return result.totalRevenue || 0;
        } catch (error) {
            console.error("Error fetching total revenue:", error);
            throw error;
        }
    }

    static async getAverageOrderValue() {
        try {
            const result = await knex('sales').avg('revenue as averageOrderValue').first();
            return result.averageOrderValue || 0;
        } catch (error) {
            console.error("Error fetching average order value:", error);
            throw error;
        }
    }

   static async getConversionRate() {
        try {
            // Example calculation: (number of sales / number of website visits)
            // This requires another table or data source for website visits.
            // For now, return a placeholder value or fetch from a mock data source.
            // Replace this with actual database query when the data source is available.

            // Placeholder: Assuming a fixed number of website visits for demonstration
            const totalSales = await knex('sales').count('id as count').first();
            const numberOfSales = totalSales.count;
            const websiteVisits = 1000; // Example value

            const conversionRate = (numberOfSales / websiteVisits) || 0;
            return conversionRate;

        } catch (error) {
            console.error("Error fetching conversion rate:", error);
            throw error;
        }
    }
}

module.exports = Sale;