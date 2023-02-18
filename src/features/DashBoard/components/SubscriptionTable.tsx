import { Button, Table } from "@nextui-org/react";
import { useRouter } from "next/router";
import Stripe from "stripe";
import { stripeApi } from "~/context/ApiContext";
import { convertToMoney } from "~/utils/convertToMoney";
import { formatUnixTimeDate } from "~/utils/formatUnixTimeDate";

interface SubscriptionTableProps {
  subscriptionList: Stripe.Subscription[];
}

export const SubscriptionTable = ({
  subscriptionList
}: SubscriptionTableProps) => {
  const { reload } = useRouter();

  const handleClick = async (stripeCustomerId: string) => {
    try {
      await stripeApi.cancelSubscription(stripeCustomerId);

      reload();
    } catch (error) {
      console.error(error);
    }
  };

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
        <Table.Column>契約日</Table.Column>
        <Table.Column>契約更新日</Table.Column>
        <Table.Column>cancel</Table.Column>
      </Table.Header>
      <Table.Body>
        {subscriptionList.map((subscription) => (
          <Table.Row key={subscription.id}>
            <Table.Cell>
              {convertToMoney(subscription.items.data[0].price.unit_amount)}
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
  );
};
