import { ComponentPropsWithRef } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "~/store/auth";
import { dropdownState } from "~/libs/Dropdown/dropdownState";
import { firebaseAuth } from "~/infra/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FlexContainer } from "~/components/layout/FlexContainer";
import { colors } from "styles/themes";

export const Header = ({ ...props }: ComponentPropsWithRef<"header">) => {
  const { currentUser } = useRecoilValue(authState);
  const setOpen = useSetRecoilState(dropdownState);

  const { push } = useRouter();

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
    <header css={header} {...props}>
      <FlexContainer
        justifyContent="flex-end"
        alignItems="center"
        css={flexContainer}
      >
        {currentUser ? (
          <button onClick={() => setOpen(true)} css={icon}>
            <Image
              src={currentUser.imagePath}
              width={32}
              height={32}
              objectFit="cover"
              layout="fill"
              alt={currentUser.displayName}
            />
          </button>
        ) : (
          <button onClick={login}>ログイン</button>
        )}
      </FlexContainer>
    </header>
  );
};

const header = css`
  width: 100%;
  height: 54px;
  background: ${colors.green};
  position: sticky;
  top: 0;
  box-shadow: 0 2px 4px rgb(0 0 0 / 6%);
  z-index: 100;
`;

const flexContainer = css`
  width: 100%;
  height: 100%;
  padding: 0 32px;
`;

const icon = css`
  width: 40px;
  height: 40px;
  position: relative;
  border: 2px solid ${colors.white};
  border-radius: 50%;
`;
