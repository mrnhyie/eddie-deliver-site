const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');
const router = express.Router();

// Public — submit errand
router.post('/', (req, res) => {
  const { name, phone, email, pickup, dropoff, description } = req.body;
  if (!name || !phone || !pickup || !dropoff || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const stmt = db.prepare(
    'INSERT INTO errands (name, phone, email, pickup, dropoff, description) VALUES (?, ?, ?, ?, ?, ?)'
  );
  const result = stmt.run(name, phone, email || '', pickup, dropoff, description);
  res.status(201).json({ id: result.lastInsertRowid, message: 'Errand request submitted!' });
});

// Admin — list all
router.get('/', auth, (req, res) => {
  const rows = db.prepare('SELECT * FROM errands ORDER BY created_at DESC').all();
  res.json(rows);
});

// Admin — update status
router.patch('/:id', auth, (req, res) => {
  const { status } = req.body;
  const allowed = ['Pending', 'In Progress', 'Completed', 'Cancelled'];
  if (!allowed.includes(status)) return res.status(400).json({ error: 'Invalid status' });
  db.prepare('UPDATE errands SET status = ? WHERE id = ?').run(status, req.params.id);
  res.json({ message: 'Status updated' });
});

// Admin — delete
router.delete('/:id', auth, (req, res) => {
  db.prepare('DELETE FROM errands WHERE id = ?').run(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
