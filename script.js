import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config()

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = new Stripe(process.env.STRIPE_SANDBOX_KEY);

// q1
// Create customer
var customer = await stripe.customers.create({
  payment_method: 'pm_card_visa',
  email: 'mingshengg@outlook.com',
  name: 'TAM Candidate Mingsheng',
  }, {
    idempotencyKey: 'create-customer-for-q1',
  });
console.log('Q1 - Customer created. Cust ID: ', customer.id)
console.log('\n\n')

// Set default payment method
const paymentMethods = await stripe.customers.listPaymentMethods(customer.id);
customer = await stripe.customers.update(
  customer.id,
  {
    invoice_settings: {
      default_payment_method: paymentMethods.data[0].id,
    },
  }
)

// q2a
var paymentIntent = await stripe.paymentIntents.create({
  amount: 10000,
  currency: 'usd',
  customer: customer.id,
  payment_method: 'pm_card_visa',
  capture_method: 'manual',
  confirm: true,
  off_session: true,
}, {
  idempotencyKey: 'preauth-100-for-q2a'
});
console.log('Q2a - Preauth $100. PI:', paymentIntent.id)
console.log('\n\n')

// q2c
paymentIntent = await stripe.paymentIntents.capture(
  paymentIntent.id,
  {
    amount_to_capture: 7500,
  }, {
    idempotencyKey: 'capture-75-for-q2c'
  }
);
console.log('Q2c - Captured $75 out of $100. Updated PI:', paymentIntent.id)
console.log('\n\n')


// Q3a
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
}, {
  idempotencyKey: 'create-connect-account-for-q3a'
});
console.log('Q3a')
console.log('Connected account created:', account.id)

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
    idempotencyKey: 'perform-verification-of-connected-account-for-q3a',
    stripeAccount: account.id,
  },
)
console.log('Connected account verification completed:', account.id)

const externalAccount = await stripe.accounts.createExternalAccount(
  account.id,
  {
    external_account: 'btok_us_verified',
    default_for_currency: true,
  },
  {
    idempotencyKey: 'add-external-account-to-connected-account-for-q3a',
    stripeAccount: account.id,
  }
);
console.log('External account created:', externalAccount.id)
console.log('\n\n')

// Create only after verification
console.log('We need to allow time for the connected account to be verified')
console.log('Please press any key to continue')
await process.stdin.once('data', async function () {
  // Q3b
  const destinationCharge = await stripe.paymentIntents.create(
    {
      currency: 'usd',
      amount: 2000,
      payment_method: 'pm_card_visa',
      confirm: true,
      transfer_data: {
        destination: account.id,
        amount: 1500,
      },
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    }, {
      idempotencyKey: 'perform-destination-charge-q3b',
    }
  )
  console.log('Q3b - Created payment intent:', destinationCharge.id)
  console.log('\n\n')

  // 3f.
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
    }, {
      idempotencyKey: 'create-product-for-neon-sign-q3f'
    })

  const subscription = await stripe.subscriptions.create({
    // Assume that the driver is the original customer, thus use its cust ID to avoid recreation
    customer: customer.id,
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
  }, {
    idempotencyKey: 'create-subscription-for-q3f'
  })
  console.log('Q3f - Created subscription:', subscription.id)
  console.log('\n\n')
  console.log('You may terminate the script now.')
});
