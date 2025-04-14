import Stripe from 'stripe';

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = new Stripe('sk_test_51RDgKlPoK1psmfNnLDTqbFDCCTnddqdvQxi8M0rbAeL79uSirxQQe1xZhFvShmrvf7vFeyvP9fEY9xQMY3bqElla002Slyyl7G');

const pi = { id: 'pi_3RDh3qPoK1psmfNn0tPLiJmj' }
const paymentIntent = await stripe.paymentIntents.capture(
  pi.id,
  {
    amount_to_capture: 7500,
  }
);
console.log('Captured $75 out of $100. Updated PI:', paymentIntent.id)
console.log('Upon execution, user pending transaction should be finalized as $75 and the balance $25 will be released.')
