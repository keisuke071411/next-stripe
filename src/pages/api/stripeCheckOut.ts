import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15"
});

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") throw new Error();

    const session = await stripe.checkout.sessions.create({
      customer: req.body,
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

    res.status(200).json({ url: session.url });
  } catch (err: unknown) {
    console.log(err);

    if (err instanceof Error) {
      res.status(500).json(err.message);
    }
  }
}
