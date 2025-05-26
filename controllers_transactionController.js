
// controllers/transactionController.js

const pool = require('../db');

const getTransactions = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM transactions WHERE user_id = $1', [req.user.id]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
};

const createTransaction = async (req, res) => {
  const { amount, category, type, date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO transactions (user_id, amount, category, type, date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.id, amount, category, type, date]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error creating transaction', error });
  }
};

module.exports = { getTransactions, createTransaction };
