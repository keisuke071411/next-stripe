import { Fragment } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { Table } from "@nextui-org/react";
import { useRecoilValue } from "recoil";
import { authState } from "~/store/auth";
import { Container } from "~/components/layout/Container";
import { DashBoardPageProps } from "~/pages/dashboard";
import { FlexContainer } from "~/components/layout/FlexContainer";
import { PAYMENT_STATUS } from "./constants";
import { convertToMoney } from "~/utils/convertToMoney";
import { formatUnixTimeDate } from "~/utils/formatUnixTimeDate";
import { colors } from "styles/themes";

export const DashBoardPageTemplate = ({
  paymentList
}: DashBoardPageProps): JSX.Element => {
  const { currentUser, isLoading } = useRecoilValue(authState);
  const { push } = useRouter();

  if (isLoading) return <p>now loading...</p>;

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
                <Table.Cell>{convertToMoney(payment.amount_total)}</Table.Cell>
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
