import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15"
});

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") throw new Error();

    const data = await stripe.subscriptions.list({
      limit: 10,
      customer: req.body,
      status: "all"
    });

    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message);
    }

    console.error(error);
  }
}
