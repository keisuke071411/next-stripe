import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15"
});

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") throw new Error();

    // 1. 生成したCheckout URLを一覧で取得
    const { data: sessionList } = await stripe.checkout.sessions.list({
      customer: req.body
    });

    // 2. 現在有効中のURLをフィルターする
    const openSessionList = sessionList.filter(
      (sessionItem) => sessionItem.status === "open"
    );

    // 3. 有効中のURLを無効化する
    await Promise.all(
      openSessionList.map((openSessionItem) =>
        stripe.checkout.sessions.expire(openSessionItem.id)
      )
    );

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
