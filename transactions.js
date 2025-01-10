const express = require('express');
const router = express.Router();
const transactionService = require('../services/transactionService');

// List transactions with search and pagination
router.get('/list', async (req, res) => {
  try {
    const { month = 3, search = '', page = 1, perPage = 10 } = req.query;
    const result = await transactionService.listTransactions(
      parseInt(month),
      search,
      parseInt(page),
      parseInt(perPage)
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get statistics
router.get('/statistics', async (req, res) => {
  try {
    const { month = 3 } = req.query;
    const statistics = await transactionService.getStatistics(parseInt(month));
    res.json(statistics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get bar chart data
router.get('/bar-chart', async (req, res) => {
  try {
    const { month = 3 } = req.query;
    const barChartData = await transactionService.getBarChartData(parseInt(month));
    res.json(barChartData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get pie chart data
router.get('/pie-chart', async (req, res) => {
  try {
    const { month = 3 } = req.query;
    const pieChartData = await transactionService.getPieChartData(parseInt(month));
    res.json(pieChartData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get combined data
router.get('/combined', async (req, res) => {
  try {
    const { month = 3 } = req.query;
    const combinedData = await transactionService.getCombinedData(parseInt(month));
    res.json(combinedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;  // Make sure this is the last line