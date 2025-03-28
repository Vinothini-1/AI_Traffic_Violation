import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env file

import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Function to create Stripe Checkout session for payment
async function createCheckoutSession(paymentDetails) {
  try {
    const { amount, customerId, successUrl, cancelUrl } = paymentDetails;

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],  // The payment methods you accept
      line_items: [
        {
          price_data: {
            currency: 'lkr',
            product_data: {
              name: 'Payment for Services',
            },
            unit_amount: amount * 100,  // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',  // For a one-time payment
      success_url: successUrl,  // URL to redirect to after successful payment
      cancel_url: cancelUrl,    // URL to redirect to if the payment is canceled
    });

    return { sessionId: session.id };  // Return the session ID to redirect user
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw new Error('Failed to create checkout session');
  }
}

// Payout function to transfer money to user's bank account
async function payoutToUser(userDetails) {
  try {
    const { customerId, amount, bankAccountDetails } = userDetails;  // Get customer details from request

    // First, check if the user already has a connected account, if not create a new one
    let connectedAccount;
    if (!customerId) {
      // Creating a new connected account for the user (only for Stripe Connect users)
      connectedAccount = await stripe.accounts.create({
        type: 'express',  // Use 'express' for a simpler flow or 'standard' if more control is needed
        country: 'LK',  // Assuming Sri Lanka for this example; change to user's country
        business_type: 'individual',
        individual: {
          first_name: 'Induvidwa',
          last_name: 'Gamage',
          email: 'jinad@example.com',
          // Add additional details such as address, phone number
        },
        requested_capabilities: ['transfers'],  // Required for payouts
      });

      // Attach the bank account to the connected account (if not already set)
      await stripe.accounts.update(connectedAccount.id, {
        external_account: {
          object: 'bank_account',
          country: 'LK',
          currency: 'lkr',
          account_number: bankAccountDetails.accountNumber,
          account_holder_name: bankAccountDetails.accountName,
          bank_name: bankAccountDetails.bankName,
        },
      });
    } else {
      // If the user already has a connected account
      connectedAccount = await stripe.accounts.retrieve(customerId);
    }

    // Create a payout request to send money to the user's bank account
    const payout = await stripe.payouts.create(
      {
        amount: amount * 100, // Amount in cents (for example, 99 LKR)
        currency: 'lkr',
      },
      { stripeAccount: connectedAccount.id } // Payout to the connected account
    );

    return payout; // Return payout confirmation
  } catch (error) {
    console.error('Error in payout:', error);
    throw new Error('Failed to transfer money');
  }
}

// Controller to handle payment and payout
export async function handlePaymentAndPayout(paymentDetails, userDetails) {
  try {
    // First, create the Stripe Checkout session for the payment
    const { sessionId } = await createCheckoutSession(paymentDetails);

    // Next, initiate the payout process to the user if needed
    if (userDetails) {
      await payoutToUser(userDetails);  // Transfer money to the user
    }

    return { checkoutSessionId: sessionId };
  } catch (error) {
    console.error('Error in handling payment and payout:', error);
    throw new Error('Failed to handle payment and payout');
  }
}

export { createCheckoutSession, payoutToUser };
