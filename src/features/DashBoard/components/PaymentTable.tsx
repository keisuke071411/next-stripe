import { Table } from "@nextui-org/react";
import Stripe from "stripe";
import { convertToMoney } from "~/utils/convertToMoney";
import { formatUnixTimeDate } from "~/utils/formatUnixTimeDate";
import { PAYMENT_STATUS } from "../constants";

interface PaymentTableProps {
  paymentList: Stripe.Checkout.Session[];
}

export const PaymentTable = ({ paymentList }: PaymentTableProps) => {
  return (
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
            <Table.Cell>{PAYMENT_STATUS[payment.payment_status]}</Table.Cell>
            <Table.Cell>
              {formatUnixTimeDate(payment.created, "jp", true)}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
