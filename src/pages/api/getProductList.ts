import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export interface StripeProduct extends Stripe.Product {
  priceList: Stripe.Price[];
}

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15"
});

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") throw new Error();

    const productList: StripeProduct[] = [];

    const response = await stripe.products.list({
      active: true,
      limit: 10
    });

    if (!response.data || response.data.length < 1) {
      return res.status(200).json([]);
    }

    await Promise.all(
      response.data.map(async (product, i) => {
        const priceList = await stripe.prices.list({
          product: product.id
        });

        productList.push({
          ...response.data[i],
          priceList: priceList.data
        });
      })
    );

    res.status(200).json(productList);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message);
    }

    console.log(error);
  }
}
