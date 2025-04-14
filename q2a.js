
import Stripe from 'stripe';

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = new Stripe('sk_test_51RDgKlPoK1psmfNnLDTqbFDCCTnddqdvQxi8M0rbAeL79uSirxQQe1xZhFvShmrvf7vFeyvP9fEY9xQMY3bqElla002Slyyl7G');

const customer = { id: 'cus_S7wnxEIOplma8u' }
const paymentIntent = await stripe.paymentIntents.create({
  amount: 10000,
  currency: 'usd',
  customer: customer.id,
  payment_method: 'pm_card_visa',
  capture_method: 'manual',
  confirm: true,
  off_session: true,
});


