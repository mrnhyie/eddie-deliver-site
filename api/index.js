// Vercel serverless entry — same Express app as local monolith
require('dotenv').config({ path: require('path').join(__dirname, '..', 'server', '.env') });
module.exports = require('../server/app');
