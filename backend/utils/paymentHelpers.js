const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Handle successful payment
exports.handlePaymentSuccess = async (paymentIntentId) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  return paymentIntent.status === 'succeeded';
};

// Create refund
exports.createRefund = async (chargeId, amount) => {
  const refund = await stripe.refunds.create({
    charge: chargeId,
    amount: Math.round(amount * 100)
  });
  return refund;
};

// Get payment methods
exports.listPaymentMethods = async (customerId) => {
  const methods = await stripe.paymentMethods.list({
    customer: customerId,
    type: 'card'
  });
  return methods;
};
