const express = require('express');
const router = express.Router();
const { parseMxMessage } = require('../parsers/mxParser');

// ISO20022 MX message handler - upgraded from MT format
router.post('/mx', async (req, res) => {
  const { rawMessage, bic, amount, currency } = req.body;
  if (!bic) return res.status(400).json({ error: 'BIC is required for SWIFT MX routing' });
  const parsed = await parseMxMessage(rawMessage);
  res.status(202).json({ swiftRef: parsed.txRef, status: 'QUEUED', bic, amount, currency });
});

module.exports = router;