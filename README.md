# payments-api

AtomBank Payments API — handles NPP, BPAY and SWIFT payment processing.

## Stack
Node.js 20 · Express · Azure Service Bus · PostgreSQL

## Pipelines
[![Build Status](https://dev.azure.com/AtomicworkBanking/AtomBanking/_apis/build/status/payments-api)](https://dev.azure.com/AtomicworkBanking/AtomBanking/_build)

## Endpoints
- `POST /payments/npp` — NPP Osko real-time transfer
- `POST /payments/bpay` — BPAY bill payment
- `POST /payments/swift` — SWIFT wire transfer
- `GET  /payments/:id` — Payment status
- `GET  /health` — Service health check