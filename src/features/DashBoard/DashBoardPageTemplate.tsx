import { Fragment } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { Table, Loading, Button } from "@nextui-org/react";
import { useRecoilValue } from "recoil";
import { authState } from "~/store/auth";
import { Container } from "~/components/layout/Container";
import { DashBoardPageProps } from "~/pages/dashboard";
import { FlexContainer } from "~/components/layout/FlexContainer";
import { PAYMENT_STATUS } from "./constants";
import { convertToMoney } from "~/utils/convertToMoney";
import { formatUnixTimeDate } from "~/utils/formatUnixTimeDate";
import { colors } from "styles/themes";
import { stripeApi } from "~/context/ApiContext";

export const DashBoardPageTemplate = ({
  paymentList,
  subscriptionList
}: DashBoardPageProps): JSX.Element => {
  const { currentUser, isLoading } = useRecoilValue(authState);
  const { push, reload } = useRouter();

  if (isLoading) return <Loading size="xl" />;

  if (!currentUser) {
    push("/");
    return <Fragment />;
  }

  const handleClick = async (stripeCustomerId: string) => {
    try {
      await stripeApi.cancelSubscription(stripeCustomerId);

      reload();
    } catch (error) {
      console.error(error);
    }
  };

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
          <Table
            aria-label="Example static collection table"
            css={{
              height: "auto",
              fontSize: "1.4rem"
            }}
          >
            <Table.Header>
              <Table.Column>金額</Table.Column>
              <Table.Column>ステータス</Table.Column>
              <Table.Column>契約日</Table.Column>
              <Table.Column>契約更新日</Table.Column>
              <Table.Column>cancel</Table.Column>
            </Table.Header>
            <Table.Body>
              {subscriptionList.map((subscription) => (
                <Table.Row key={subscription.id}>
                  <Table.Cell>
                    {convertToMoney(
                      subscription.items.data[0].price.unit_amount
                    )}
                  </Table.Cell>
                  <Table.Cell>{subscription.status}</Table.Cell>
                  <Table.Cell>
                    {formatUnixTimeDate(subscription.start_date, "jp")}
                  </Table.Cell>
                  <Table.Cell>
                    {formatUnixTimeDate(subscription.current_period_end, "jp")}
                  </Table.Cell>
                  <Table.Cell>
                    {subscription.status === "active" && (
                      <Button
                        auto
                        color="error"
                        onClick={() => handleClick(subscription.id)}
                      >
                        解約する
                      </Button>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <div style={{ marginTop: 40 }}>
          <p css={label}>注文履歴</p>
          <Table
            aria-label="Example static collection table"
            css={{
              height: "auto",
              fontSize: "1.4rem"
            }}
          >
            <Table.Header>
              <Table.Column>金額</Table.Column>
              <Table.Column>ステータス</Table.Column>
              <Table.Column>作成日</Table.Column>
            </Table.Header>
            <Table.Body>
              {paymentList.map((payment) => (
                <Table.Row key={payment.id}>
                  <Table.Cell>
                    {convertToMoney(payment.amount_total)}
                  </Table.Cell>
                  <Table.Cell>
                    {PAYMENT_STATUS[payment.payment_status]}
                  </Table.Cell>
                  <Table.Cell>
                    {formatUnixTimeDate(payment.created, "jp", true)}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
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
