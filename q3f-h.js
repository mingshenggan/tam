import Stripe from 'stripe';

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = new Stripe('sk_test_51RDgKlPoK1psmfNnLDTqbFDCCTnddqdvQxi8M0rbAeL79uSirxQQe1xZhFvShmrvf7vFeyvP9fEY9xQMY3bqElla002Slyyl7G');

// 3f.
// Assume that the driver is the original customer, thus use its cust ID to avoid recreation
const product = await stripe.products.create({
  name: 'neon signboard',
  default_price_data: {
    unit_amount: 200,
    currency: 'usd',
    recurring: {
      interval: 'month',
      interval_count: 1,
    },
  },
  active: true,
})

const subscription = await stripe.subscriptions.create({
  customer: 'cus_S7wnxEIOplma8u',
  currency: 'usd',
  off_session: true,
  description: 'rental of neon lyft sign',
  collection_method: 'charge_automatically',
  items: [
    {
      price_data: {
        product: product.id,
        currency: 'usd',
        recurring: {
          interval_count: 1,
          interval: 'month',
        },
        unit_amount: 200,
      },
    },
  ],
})

// 3g.
/*
 *  Tried a few approaches. Most exploration is done on the dashboard console and via ChatGPT
 *    1. Partial refund from the earlier transfer
 *        - works, but not ideal because user doesn't know what fees hit them since there's no description
 *    2. Payment intent
 *        - charge on customer card with 200 amount and 200 fee
 *        - this ended with stripe fees which is not ideal for a small amount
 *    3. Subscription
 *        - Considering the use case of $2 for neon-lighted Lyft which is likely a recurring cost, automation seems good
 *        - Considering there'll be fees, seems better to use subscription which also handles the recurring payment
 *
 *   Finally settled with 3 - not sure if there'll be a no-fee approach out there
 *
 * */

// 3h. I think any company requiring digital wallets or wanting to customize their payment workflows can use connect.
//     Examples:
//      - Crypto exchanges collecting payments for people
//      - Consumer chains supporting "top up" services for subsequent usages (i.e. kopitiam card in singapore)
