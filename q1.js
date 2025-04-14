import Stripe from 'stripe';

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = new Stripe('sk_test_51RDgKlPoK1psmfNnLDTqbFDCCTnddqdvQxi8M0rbAeL79uSirxQQe1xZhFvShmrvf7vFeyvP9fEY9xQMY3bqElla002Slyyl7G');

const customer = await stripe.customers.create({
  payment_method: 'pm_card_visa',
  email: 'mingshengg@outlook.com',
  name: 'TAM Candidate Mingsheng',
});
console.log('Customer created. Cust ID: ', customer.id)
