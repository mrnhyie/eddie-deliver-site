const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');
const router = express.Router();

// Public — submit restaurant inquiry
router.post('/', (req, res) => {
  const { restaurant_name, contact_name, phone, email, location, service_type, message } = req.body;
  if (!restaurant_name || !contact_name || !phone || !email || !location) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const stmt = db.prepare(
    'INSERT INTO restaurants (restaurant_name, contact_name, phone, email, location, service_type, message) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );
  const result = stmt.run(restaurant_name, contact_name, phone, email, location, service_type || '', message || '');
  res.status(201).json({ id: result.lastInsertRowid, message: 'Partnership inquiry submitted!' });
});

// Admin — list all
router.get('/', auth, (req, res) => {
  const rows = db.prepare('SELECT * FROM restaurants ORDER BY created_at DESC').all();
  res.json(rows);
});

// Admin — update status
router.patch('/:id', auth, (req, res) => {
  const { status } = req.body;
  const allowed = ['New', 'Contacted', 'Partnered', 'Declined'];
  if (!allowed.includes(status)) return res.status(400).json({ error: 'Invalid status' });
  db.prepare('UPDATE restaurants SET status = ? WHERE id = ?').run(status, req.params.id);
  res.json({ message: 'Status updated' });
});

// Admin — delete
router.delete('/:id', auth, (req, res) => {
  db.prepare('DELETE FROM restaurants WHERE id = ?').run(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
