# TAM Assessment

## Q1

[Customer ID: cus_S8fATgp47MMqEH](https://dashboard.stripe.com/test/customers/cus_S8fATgp47MMqEH)

## Q2

### Q2A

[Payment Intent ID: pi_3RENrEPpoMfuP2vh2fIWGlkm](https://dashboard.stripe.com/test/payments/pi_3RENrEPpoMfuP2vh2fIWGlkm)
Upon execution, user bank statement should show a "Pending" charge of $100

### Q2B

![Payment SS](https://github.com/mingshenggan/tam/blob/main/q2b.png)

### Q2C

Upon execution, user pending transaction should be finalized as $75 and the balance $25 will be released.
From the merchant's end, various fees like stripe platform fee or other fees are also settled.

### Q2D

#### Pending

![Pending Payment](https://github.com/mingshenggan/tam/blob/main/q2d%20-%20a%20-%20pending.png)

#### Captured

![Completed Payment](https://github.com/mingshenggan/tam/blob/main/q2d%20-%20c%20-%20captured.png)

### Q2E

#### Pre-authorizing a higher amount to mitigate fraud or insufficient funds
Example: EV charging stations often authorize a larger amount upfront before the session begins, since the final cost depends on usage and cannot be determined until the session ends. This ensures that sufficient funds are available and reduces payment failures after the transaction.

#### Holding a deposit prior to fulfillment to secure commitment
Example: Hotels or B2B order placements may authorize a deposit or the full estimated amount at the time of booking. The actual charge is captured only after the stay or once the goods are shipped, ensuring payment while allowing for fulfillment flexibility.

## Q3

### Q3A

[Connected Account ID: acct_1RENv3PpE6n1PHPJ](https://dashboard.stripe.com/test/connect/accounts/acct_1RENv3PpE6n1PHPJ)

### Q3B

[Destination Charge ID: pi_3RENwwPpoMfuP2vh2345cTZC](https://dashboard.stripe.com/test/payments/pi_3RENwwPpoMfuP2vh2345cTZC)

### Q3C to Q3E

Lyft Platform Fee = $5.00 (not configured)
Stripe processing fee = 2.9% + $0.30 = $0.88
Lyft Nett Earnings = $5.00 - $0.88 = $4.12

### Q3F

[Subscription ID: sub_1RENwyPpoMfuP2vhYnEY1YkP](https://dashboard.stripe.com/test/subscriptions/sub_1RENwyPpoMfuP2vhYnEY1YkP)

### Q3G

Tried a few approaches. Most exploration is done on the dashboard console and via ChatGPT

1. Partial refund from the earlier transfer
  - works, but not ideal because user doesn't know what fees hit them since there's no description
2. Payment intent
  - charge on customer card with 200 amount and 200 fee
  - this ended with stripe fees which is not ideal for a small amount
3. Subscription
  - Considering the use case of $2 for neon-lighted Lyft which is likely a recurring cost, automation seems good
  - Considering there'll be fees, seems better to use subscription which also handles the recurring payment

 Finally settled with 3 - not sure if there'll be a no-fee approach out there

 ### Q3H

Any company requiring digital wallets or wanting to customize their payment workflows can use connect.

Examples:

 - Crypto exchanges collecting payments for people
 - Consumer chains supporting "top up" services for subsequent usages (i.e. kopitiam card in singapore)

## Q4

Hi [Customer's Name],

That’s fantastic news—congrats on getting the green light for your streaming service! I’m glad you’re considering Stripe for your subscription billing needs. Stripe’s Billing product is well-suited for both flat-rate and usage-based pricing models.

Here are the implementation references for each of your use cases. In the provided links, you will also be able to visual how it works before diving deeper into the implementation details.
- Plan A: Flat rate of $24.99 per month for unlimited usage of the service
    - [Demo](https://github.com/stripe-samples/subscription-use-cases/tree/main/fixed-price-subscriptions)
    - [Python Implementation Reference](https://github.com/stripe-samples/subscription-use-cases/tree/main/fixed-price-subscriptions/server/python)
- Plan B: Metered Billing ($10.99 base + $1.00 per 10GB)
    - [Demo](https://github.com/stripe-samples/subscription-use-cases/tree/main/usage-based-subscriptions)
    - [Python Implementation Reference](https://github.com/stripe-samples/subscription-use-cases/tree/main/usage-based-subscriptions/server/python)

In general, Coupons in Stripe allow you to apply discounts either as a percentage, fixed amount, or for a limited time. [Here's](https://docs.stripe.com/billing/subscriptions/coupons?dashboard-or-api=api&lang=python) the relevant documentation which can help you get up to speed rapidly.

Since the timeline of 1 week before development is short, I'd be happy to speed things up for you. Let me know when's a good time for an initial call.


Best regards,
[Your Name]
Technical Account Manager, Stripe
