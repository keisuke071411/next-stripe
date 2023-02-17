import { Fragment } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { Loading } from "@nextui-org/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "~/store/auth";
import { dropdownState } from "~/libs/Dropdown/dropdownState";
import { stripeApi } from "~/context/ApiContext";
import { Dropdown } from "~/libs/Dropdown";
import { FlexContainer } from "~/components/layout/FlexContainer";
import { Header } from "~/components/shared/Header";
import { Overlay } from "~/components/shared/Overlay";
import { colors } from "styles/themes";

export const HomePageTemplate = (): JSX.Element => {
  const { currentUser, isLoading } = useRecoilValue(authState);
  const [isOpen, setOpen] = useRecoilState(dropdownState);

  const { push } = useRouter();

  if (isLoading) return <Loading size="xl" />;

  if (!currentUser) {
    push("/");
    return <Fragment />;
  }

  const handleClick = async () => {
    try {
      if (!currentUser) throw new Error();

      const res = await stripeApi.checkOutForStripe(
        currentUser.stripeCustomerId
      );

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
        <FlexContainer justifyContent="center" alignItems="center">
          {currentUser.subscriptionStatus === "active" ? (
            <p>あなたは有料会員です</p>
          ) : (
            <button onClick={handleClick}>課金する</button>
          )}
        </FlexContainer>
      </main>
    </Fragment>
  );
};

const main = css`
  min-height: calc(100vh - 54px);
  padding: 80px 0;
  background: ${colors.black.lighten[4]};
`;
