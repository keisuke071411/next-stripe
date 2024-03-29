import { Fragment, useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import Stripe from "stripe";
import { stripeApi } from "~/context/ApiContext";
import { CurrentUser } from "~/store/auth";
import { Container } from "~/components/layout/Container";
import { FlexContainer } from "~/components/layout/FlexContainer";
import { PaymentTable } from "./components/PaymentTable";
import { SubscriptionTable } from "./components/SubscriptionTable";
import { colors } from "styles/themes";
import { StripePayment } from "~/pages/api/getPaymentList";

interface DashBoardPageTemplateProps {
  currentUser: CurrentUser;
}

export const DashBoardPageTemplate = ({
  currentUser
}: DashBoardPageTemplateProps): JSX.Element => {
  const { push } = useRouter();

  const [paymentList, setPaymentList] = useState<StripePayment[]>([]);
  const [subscriptionList, setSubscriptionList] = useState<
    Stripe.Subscription[]
  >([]);

  const initialFetch = async () => {
    try {
      const response = await stripeApi.getSubscriptionList(
        currentUser.stripeCustomerId as string
      );
      const subscriptionList = await response.json();
      setSubscriptionList(subscriptionList.data);

      const res = await stripeApi.getPaymentList(
        currentUser.stripeCustomerId as string
      );
      const paymentList = await res.json();
      setPaymentList(paymentList.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    initialFetch();
  }, []);

  if (!currentUser) {
    push("/");
    return <Fragment />;
  }

  return (
    <main css={main}>
      <Container>
        <FlexContainer gap={20} style={{ marginBottom: 32 }}>
          <img src={currentUser.imagePath} alt={currentUser.displayName} />
          <FlexContainer flexDirection="column" justifyContent="center">
            <h1 css={name}>{currentUser.displayName}</h1>
            <p css={account}>@{currentUser.uid}</p>
            <p css={role}>
              あなたは
              {currentUser.subscriptionStatus === "active" ? "有料" : "無料"}
              会員です
            </p>
          </FlexContainer>
        </FlexContainer>
        <div>
          <p css={label}>サブスク一覧</p>
          <SubscriptionTable subscriptionList={subscriptionList} />
        </div>
        <div style={{ marginTop: 40 }}>
          <p css={label}>注文履歴</p>
          <PaymentTable paymentList={paymentList} />
        </div>
      </Container>
    </main>
  );
};

const main = css`
  min-height: 100vh;
  padding: 80px 0;
  background: ${colors.black.lighten[4]};
`;

const name = css`
  margin-bottom: 8px;
  font-size: 2.4rem;
  line-height: 2.4rem;
`;

const account = css`
  margin-bottom: 16px;
  font-size: 1.4rem;
  line-height: 1.4rem;
  color: ${colors.black.lighten[2]};
`;

const role = css`
  font-size: 1.4rem;
  line-height: 1.4rem;
`;

const label = css`
  font-size: 2em;
  line-height: 2em;
  font-weight: bold;
`;
