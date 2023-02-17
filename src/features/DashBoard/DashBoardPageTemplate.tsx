import { useRecoilValue } from "recoil";
import { authState } from "~/store/auth";
import { Table } from "@nextui-org/react";
import { formatUnixTimeDate } from "~/utils/formatUnixTimeDate";
import { PAYMENT_STATUS } from "./constants";
import { convertToMoney } from "~/utils/convertToMoney";
import { DashBoardPageProps } from "~/pages/dashboard";
import { useRouter } from "next/router";
import { Fragment } from "react";

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
    <main>
      <div>
        <p>id: {currentUser.uid}</p>
        <p>userName: {currentUser.displayName}</p>
        <p>status: {currentUser.subscriptionStatus}</p>
        <img src={currentUser.imagePath} alt={currentUser.displayName} />
        <Table
          aria-label="Example static collection table"
          css={{
            maxWidth: "896px",
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
      </div>
    </main>
  );
};
