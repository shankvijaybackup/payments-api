const express = require('express');
const router = express.Router();
const NPPGateway = require('../gateways/nppGateway');

// NPP Osko real-time payment (target: < 60s settlement)
router.post('/', async (req, res) => {
  const { amount, payId, fromBSB, fromAccount, description } = req.body;
  if (amount > 250000) return res.status(422).json({ error: 'NPP limit is $250,000 per transaction' });
  const result = await NPPGateway.submit({ amount, payId, fromBSB, fromAccount, description, idempotencyKey: req.headers['idempotency-key'] });
  res.status(202).json({ nppTransactionId: result.transactionId, status: 'SUBMITTED', payId, amount });
});

module.exports = router;