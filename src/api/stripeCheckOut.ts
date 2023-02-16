import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15"
});

export const stripeCheckOut = async (req: any, res: any) => {
  try {
    if (req.method !== "POST") throw new Error();

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY,
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: `${req.headers.origin}/?success=true`,
      cancel_url: `${req.headers.origin}/?canceled=true`
    });
    res.redirect(303, session.url);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
