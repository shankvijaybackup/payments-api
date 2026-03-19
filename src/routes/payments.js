const express = require('express');
const router = express.Router();
const { validatePayment } = require('../middleware/validation');
const PaymentService = require('../services/paymentService');

router.post('/', validatePayment, async (req, res) => {
  try {
    const { amount, currency, fromAccount, toAccount, reference, type } = req.body;
    const result = await PaymentService.processPayment({ amount, currency, fromAccount, toAccount, reference, type });
    res.status(201).json({ paymentId: result.id, status: 'PROCESSING', estimatedSettlement: result.eta });
  } catch (err) {
    if (err.code === 'INSUFFICIENT_FUNDS') return res.status(422).json({ error: 'Insufficient funds' });
    if (err.code === 'LIMIT_EXCEEDED') return res.status(422).json({ error: 'Daily limit exceeded' });
    throw err;
  }
});

router.get('/:id', async (req, res) => {
  const payment = await PaymentService.getPayment(req.params.id);
  if (!payment) return res.status(404).json({ error: 'Payment not found' });
  res.json(payment);
});

module.exports = router;