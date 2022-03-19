// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function (req: any, res: any) {
  try {
    if (req.method !== "POST") throw new Error();

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: process.env.NEXT_PUBLIC_STRIPE_API_KEY,
          quantity: 1
        }
      ],

      mode: "subscription",
      success_url: `${req.headers.origin}/success/?success=true`,
      cancel_url: `${req.headers.origin}/?canceled=true`
    });

    res.redirect(303, session.url);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json(err.message);
    }

    console.log(err);
  }
}
