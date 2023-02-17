import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { Loading } from "@nextui-org/react";
import { useRecoilValue } from "recoil";
import { authState } from "~/store/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "~/infra/firebase";
import { stripeApi } from "~/context/ApiContext";
import { FlexContainer } from "~/components/layout/FlexContainer";
import { colors } from "styles/themes";

export const HomePageTemplate = (): JSX.Element => {
  const { currentUser, isLoading } = useRecoilValue(authState);
  const { push } = useRouter();

  if (isLoading) return <Loading size="xl" />;

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

  const login = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(firebaseAuth, provider);

      push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main css={main}>
      {currentUser ? (
        <FlexContainer justifyContent="center" alignItems="center">
          {currentUser.subscriptionStatus === "active" ? (
            <p>あなたは有料会員です</p>
          ) : (
            <button onClick={handleClick}>課金する</button>
          )}
        </FlexContainer>
      ) : (
        <button onClick={login}>ログイン</button>
      )}
    </main>
  );
};

const main = css`
  min-height: 100vh;
  padding: 80px 0;
  background: ${colors.black.lighten[4]};
`;
