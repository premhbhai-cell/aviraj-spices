# Aviraj Foods and Spices — Storefront

A responsive TanStack Start + React + TypeScript storefront.

## Run locally

```bash
npm install
npm run dev
```

## Shopping flow

1. Open any product from the home page or catalogue.
2. Choose a pack size and quantity, then Add to Cart or Buy Now.
3. Review and edit quantities on `/cart`.
4. Enter delivery information on `/checkout`.
5. Choose Cash on Delivery on `/payment`.
6. The order request is saved in the current browser, then the customer can send it to the business via WhatsApp from the confirmation page.

## Important before production

- Product prices and delivery fees were not supplied, so the storefront intentionally asks the business to confirm the final amount before dispatch. Do not ship orders until prices are agreed with the customer.
- Cash on Delivery is a request only and must be confirmed by the business.
- No online payment gateway is configured. To accept UPI/cards online, connect a real payment provider and server-side order backend.
- Order details are saved in browser local storage and are not automatically transmitted to the company. The customer must tap **Send order to WhatsApp** on the confirmation page. For reliable production order handling, connect a backend/database and order notifications.
- Customer review content is not fabricated. The home page has a feedback slider inviting genuine feedback.
