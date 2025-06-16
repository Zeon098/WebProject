import Stripe from "stripe";
import algoliasearch from "algoliasearch";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const stripe = new Stripe(useRuntimeConfig().stripeSecret, {
    apiVersion: "2025-04-30.basil",
  });

  const checkout = await stripe.checkout.sessions.create({
    cancel_url: "http://localhost:3000",
    success_url: "http://localhost:3000/success",
    mode: "payment",
    line_items: [
      {
        quantity: body.nights,
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Accommodation Booking',
            description: `${body.nights} night(s) stay`,
          },
          unit_amount: body.pricePerNight * 100, // Convert to cents
        },
      },
    ],
  });

  return checkout;
});
