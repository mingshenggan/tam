import Stripe from 'stripe';

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = new Stripe('sk_test_51RDgKlPoK1psmfNnLDTqbFDCCTnddqdvQxi8M0rbAeL79uSirxQQe1xZhFvShmrvf7vFeyvP9fEY9xQMY3bqElla002Slyyl7G');

const account = await stripe.accounts.create({
  type: 'standard',
  email: 'driver@tam_assessment.com',
  capabilities: {
    transfers: {
      requested: true,
    },
    card_payments: {
      requested: true,
    },
  },
});
console.log('Connected account created:', account.id)
