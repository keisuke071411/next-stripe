import type { InferGetServerSidePropsType, NextPage } from "next";
import { stripeApi } from "~/context/ApiContext";
import { HomePageTemplate } from "~/features/Home/HomePageTemplate";
import { StripeProduct } from "./api/getProductList";

export type HomePageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

export const getServerSideProps = async () => {
  const res = await stripeApi.getProductList();
  const productList = await res.json();

  return {
    props: {
      productList: productList as StripeProduct[]
    }
  };
};

const Home: NextPage<HomePageProps> = ({ productList }): JSX.Element => {
  return <HomePageTemplate productList={productList} />;
};

export default Home;
