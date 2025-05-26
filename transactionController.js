
// controllers/transactionController.js

const db = require('../db'); // assuming db.js handles PostgreSQL pool
const jwt = require('jsonwebtoken');

// Get all transactions for the authenticated user
exports.getTransactions = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await db.query('SELECT * FROM transactions WHERE user_id = $1', [userId]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error retrieving transactions' });
  }
};

// Add a new transaction
exports.addTransaction = async (req, res) => {
  const userId = req.user.id;
  const { description, amount, category, type, date } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO transactions (user_id, description, amount, category, type, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, description, amount, category, type, date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add transaction' });
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  const userId = req.user.id;
  const transactionId = req.params.id;

  try {
    const result = await db.query(
      'DELETE FROM transactions WHERE id = $1 AND user_id = $2 RETURNING *',
      [transactionId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Transaction not found or unauthorized' });
    }

    res.status(200).json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
};
