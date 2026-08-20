const express = require('express');
const store = require('../store');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', (req, res) => {
  const { restaurant_name, contact_name, phone, email, location, service_type, message } = req.body;
  if (!restaurant_name || !contact_name || !phone || !email || !location) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const row = store.createRestaurant({
    restaurant_name, contact_name, phone, email, location, service_type, message,
  });
  res.status(201).json({ id: row.id, message: 'Partnership inquiry submitted!' });
});

router.get('/', auth, (req, res) => {
  res.json(store.listRestaurants());
});

router.patch('/:id', auth, (req, res) => {
  const { status } = req.body;
  const allowed = ['New', 'Contacted', 'Partnered', 'Declined'];
  if (!allowed.includes(status)) return res.status(400).json({ error: 'Invalid status' });
  const row = store.updateRestaurantStatus(req.params.id, status);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Status updated' });
});

router.delete('/:id', auth, (req, res) => {
  store.deleteRestaurant(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
