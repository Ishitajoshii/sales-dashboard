const express = require('express');
const cors = require('cors');
const salesRoutes = require('./routes/sales');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Routes
app.use('/api/sales', salesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something broke!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});