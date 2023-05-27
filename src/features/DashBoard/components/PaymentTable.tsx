import { Button, Table } from "@nextui-org/react";
import { stripeApi } from "~/context/ApiContext";
import { StripePayment } from "~/pages/api/getPaymentList";
import { convertToMoney } from "~/utils/convertToMoney";
import { formatUnixTimeDate } from "~/utils/formatUnixTimeDate";
import { PAYMENT_STATUS } from "../constants";

interface PaymentTableProps {
  paymentList: StripePayment[];
}

export const PaymentTable = ({ paymentList }: PaymentTableProps) => {
  const createReceipt = async (invoiceId: string) => {
    try {
      const res = await stripeApi.getReceipt(invoiceId);

      const data = await res.json();

      location.href = data.pdf;
    } catch (error) {
      console.error(error);
    }
  };

  // const createRepayment = async (paymentId: string) => {
  //   try {
  //     const res = await stripeApi.createRepayment(paymentId);

  //     const data = await res.json();

  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <Table
      aria-label="Example static collection table"
      css={{
        height: "auto",
        fontSize: "1.4rem"
      }}
    >
      <Table.Header>
        <Table.Column>商品名</Table.Column>
        <Table.Column>金額</Table.Column>
        <Table.Column>ステータス</Table.Column>
        <Table.Column>作成日</Table.Column>
        <Table.Column>領収書</Table.Column>
        {/* <Table.Column>返金</Table.Column> */}
      </Table.Header>
      <Table.Body>
        {paymentList.map((payment) => (
          <Table.Row key={payment.id}>
            <Table.Cell>{payment.productList[0].description}</Table.Cell>
            <Table.Cell>{convertToMoney(payment.amount_total)}</Table.Cell>
            <Table.Cell>{PAYMENT_STATUS[payment.payment_status]}</Table.Cell>
            <Table.Cell>
              {formatUnixTimeDate(payment.created, "jp", true)}
            </Table.Cell>
            <Table.Cell>
              <Button
                color="success"
                onClick={() => createReceipt(payment.invoice as string)}
                disabled={!payment.invoice}
              >
                作成
              </Button>
            </Table.Cell>
            {/* <Table.Cell>
              <Button
                color="error"
                onClick={() => createRepayment(payment.charge)}
                disabled={payment.refunded}
              >
                申請
              </Button>
            </Table.Cell> */}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
