import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export interface StripePayment extends Stripe.Checkout.Session {
  productList: Stripe.LineItem[];
}

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15"
});

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") throw new Error();

    const paymentList: StripePayment[] = [];

    const { data } = await stripe.checkout.sessions.list({
      limit: 100,
      customer: req.body
    });

    await Promise.all(
      data.map(async (session, i) => {
        const productList = await stripe.checkout.sessions.listLineItems(
          session.id
        );

        paymentList.push({
          ...data[i],
          productList: productList.data
        });
      })
    );

    res.status(200).json({
      data: paymentList.filter((item) => item.payment_status === "paid")
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message);
    }

    console.error(error);
  }
}
