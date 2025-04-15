import Stripe from 'stripe';

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = new Stripe('sk_test_51RDgKlPoK1psmfNnLDTqbFDCCTnddqdvQxi8M0rbAeL79uSirxQQe1xZhFvShmrvf7vFeyvP9fEY9xQMY3bqElla002Slyyl7G');

var account = await stripe.accounts.create({
  type: 'custom',
  email: 'driver3@tam_assessment.com',
  country: 'US',
  capabilities: {
    transfers: {
      requested: true,
    },
    card_payments: {
      requested: true,
    },
  },
});

// For custom onboarding handled by merchants, they should handle the flow thus most likely it will be account update
account = await stripe.accounts.update(
  account.id,
  {
    business_type: 'individual',
    business_profile: {
      url: 'www.tam_assessment.com',
      mcc: '5734',
    },
    tos_acceptance: {
      date: 1744687258,
      ip: '192.168.1.1',
    },
    individual: {
      address: {
        city: 'Manitowish Waters',
          country: 'US',
          line1: 'Hello Circle',
          line2: null,
          postal_code: '54545',
          state: 'WI',
      },
      phone: '+10000000000',
      dob: { day: 1, month: 1, year: 2000 },
      id_number: '000000000',
      first_name: 'legal_first_name',
      last_name: 'legal_last_name',
      ssn_last_4: '0000',
      email: account.email,
    },
    settings: {
      payments: { statement_descriptor: 'tam assessment' },
    },
  },
  {
    stripeAccount: account.id,
  },
)
console.log('Connected account created:', account.id)

const externalAccount = await stripe.accounts.createExternalAccount(
  account.id,
  {
    external_account: 'btok_us_verified',
    default_for_currency: true,
  },
  {
    stripeAccount: account.id,
  }
);
console.log('External account created:', externalAccount.id)
