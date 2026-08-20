const express = require('express');
const store = require('../store');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', (req, res) => {
  const { name, phone, email, pickup, dropoff, description } = req.body;
  if (!name || !phone || !pickup || !dropoff || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const row = store.createErrand({ name, phone, email, pickup, dropoff, description });
  res.status(201).json({ id: row.id, message: 'Errand request submitted!' });
});

router.get('/', auth, (req, res) => {
  res.json(store.listErrands());
});

router.patch('/:id', auth, (req, res) => {
  const { status } = req.body;
  const allowed = ['Pending', 'In Progress', 'Completed', 'Cancelled'];
  if (!allowed.includes(status)) return res.status(400).json({ error: 'Invalid status' });
  const row = store.updateErrandStatus(req.params.id, status);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Status updated' });
});

router.delete('/:id', auth, (req, res) => {
  store.deleteErrand(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
