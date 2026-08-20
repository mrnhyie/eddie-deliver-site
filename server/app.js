const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const authRoutes = require('./routes/auth');
const errandRoutes = require('./routes/errands');
const restaurantRoutes = require('./routes/restaurants');

const app = express();

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    return callback(null, false);
  },
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/errands', errandRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// Local monolith only — on Vercel, static files come from client/dist via outputDirectory
if (!process.env.VERCEL) {
  const dist = path.join(__dirname, '..', 'client', 'dist');
  if (fs.existsSync(dist)) {
    app.use(express.static(dist));
    app.get(/^(?!\/api).*/, (_req, res) => {
      res.sendFile(path.join(dist, 'index.html'));
    });
  }
}

module.exports = app;
