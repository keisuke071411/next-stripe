import type { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") throw new Error();

    const customer = await stripe.customers.create();

    res.status(200).json({ customer: customer });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json(err.message);
    }

    console.log(err);
  }
}
