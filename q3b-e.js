import Stripe from 'stripe';

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = new Stripe('sk_test_51RDgKlPoK1psmfNnLDTqbFDCCTnddqdvQxi8M0rbAeL79uSirxQQe1xZhFvShmrvf7vFeyvP9fEY9xQMY3bqElla002Slyyl7G');

const paymentIntent = await stripe.paymentIntents.create(
  {
    currency: 'usd',
    amount: 2000,
    payment_method: 'pm_card_visa',
    confirm: true,
    transfer_data: {
      destination: 'acct_1RDj6ePo9YKx13g9',
      amount: 1500,
    },
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: 'never',
    },
  },
)
console.log('Created payment intent:', paymentIntent.id)

// 3c. Lyft Platform Fee = $5.00 (not configured)
// 3d. Stripe processing fee = 2.9% + $0.30 = $0.88
// 3e. Lyft Nett Earnings = $5.00 - $0.88 = $4.12
