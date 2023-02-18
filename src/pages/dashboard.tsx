import type { InferGetServerSidePropsType, NextPage } from "next";
import Stripe from "stripe";
import { stripeApi } from "~/context/ApiContext";
import { DashBoardPageTemplate } from "~/features/DashBoard/DashBoardPageTemplate";

export type DashBoardPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

export const getServerSideProps = async () => {
  const res = await stripeApi.getPaymentList(
    process.env.NEXT_PUBLIC_CUSTOMER_ID as string
  );
  const paymentList = await res.json();

  const response = await stripeApi.getSubscriptionList(
    process.env.NEXT_PUBLIC_CUSTOMER_ID as string
  );
  const subscriptionList = await response.json();

  console.log(subscriptionList);

  return {
    props: {
      paymentList: paymentList.data as Stripe.Checkout.Session[],
      subscriptionList: subscriptionList.data as Stripe.Subscription[]
    }
  };
};

const DashBoardPage: NextPage<DashBoardPageProps> = ({
  paymentList,
  subscriptionList
}): JSX.Element => {
  return (
    <DashBoardPageTemplate
      paymentList={paymentList}
      subscriptionList={subscriptionList}
    />
  );
};

export default DashBoardPage;
