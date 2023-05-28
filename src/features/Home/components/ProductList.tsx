import { Card, Grid, Row, Text } from "@nextui-org/react";
import { StripeProduct } from "~/pages/api/getProductList";
import { convertToMoney } from "~/utils/convertToMoney";

interface ProductListProps {
  productList: StripeProduct[];
  handleClick: (product: StripeProduct) => Promise<void>;
}

export const ProductList = ({ productList, handleClick }: ProductListProps) => {
  return (
    <Grid.Container gap={6} justify="flex-start">
      {productList.map((product) => (
        <Grid xs={6} sm={4} key={product.id}>
          <Card isPressable onPressStart={() => handleClick(product)}>
            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src={product.images[0]}
                width="100%"
                height={140}
                alt={product.name}
                objectFit="cover"
              />
            </Card.Body>
            <Card.Footer css={{ justifyItems: "flex-start" }}>
              <Row wrap="wrap" justify="space-between" align="center">
                <Text size={16} b>
                  {product.name}
                </Text>
                <Text
                  size={14}
                  css={{
                    color: "$accents7",
                    fontWeight: "$semibold",
                    fontSize: "$sm"
                  }}
                >
                  {convertToMoney(
                    product.priceList.filter(
                      (price) => price.id === product.default_price
                    )[0].unit_amount
                  )}
                </Text>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  );
};
