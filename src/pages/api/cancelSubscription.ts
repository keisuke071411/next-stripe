import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15"
});

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") throw new Error();

    const canceledSubscription = await stripe.subscriptions.del(req.body);

    res.status(200).json({ canceledSubscription });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json(err.message);
    }

    console.error(err);
  }
}
