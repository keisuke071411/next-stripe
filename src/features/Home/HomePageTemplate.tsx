import { Fragment } from "react";
import { css } from "@emotion/react";
import { Container, Loading } from "@nextui-org/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "~/store/auth";
import { dropdownState } from "~/libs/Dropdown/dropdownState";
import { stripeApi } from "~/context/ApiContext";
import { Dropdown } from "~/libs/Dropdown";
import { Header } from "~/components/shared/Header";
import { Overlay } from "~/components/shared/Overlay";
import { ProductList } from "./components/ProductList";
import { colors } from "styles/themes";
import { HomePageProps } from "~/pages";

export const HomePageTemplate = ({
  productList
}: HomePageProps): JSX.Element => {
  const { currentUser, isLoading } = useRecoilValue(authState);
  const [isOpen, setOpen] = useRecoilState(dropdownState);

  if (isLoading) return <Loading size="xl" />;

  const handleClick = async (priceId: string) => {
    try {
      if (!currentUser) throw new Error();

      const res = await stripeApi.checkOutForStripe({
        customerId: currentUser.stripeCustomerId,
        priceId
      });

      const stripeCheckOutSession = await res.json();

      location.href = stripeCheckOutSession.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Header />
      {isOpen && (
        <Overlay setOverlay={setOpen} color="secondary">
          <Dropdown />
        </Overlay>
      )}
      <main css={main}>
        <Container>
          <ProductList productList={productList} handleClick={handleClick} />
        </Container>
      </main>
    </Fragment>
  );
};

const main = css`
  min-height: calc(100vh - 54px);
  padding: 80px 0;
  background: ${colors.black.lighten[4]};
`;
