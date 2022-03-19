// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

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
