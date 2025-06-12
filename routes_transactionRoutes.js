
const express = require('express');
const router = express.Router();
const {
  addTransaction,
  getTransactions,
  deleteTransaction
} = require('./transactionController');

// POST /api/transactions - Add new transaction
router.post('/', addTransaction);

// GET /api/transactions - Get all transactions
router.get('/', getTransactions);

// DELETE /api/transactions/:id - Delete a transaction
router.delete('/:id', deleteTransaction);

module.exports = router;
