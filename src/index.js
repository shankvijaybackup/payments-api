const express = require('express');
const helmet = require('helmet');
const { createLogger } = require('winston');
const paymentsRouter = require('./routes/payments');
const nppRouter = require('./routes/npp');
const { connectDb } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'healthy', version: '3.2.1', uptime: process.uptime() }));
app.use('/payments', paymentsRouter);
app.use('/payments/npp', nppRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', requestId: req.headers['x-request-id'] });
});

connectDb().then(() => {
  app.listen(PORT, () => console.log(`Payments API v3.2.1 running on port ${PORT}`));
});