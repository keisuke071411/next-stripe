import Link from "next/link";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { colors } from "styles/themes";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "~/infra/firebase";

export const Dropdown = (): JSX.Element => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(firebaseAuth);

    router.reload();
  };

  return (
    <nav css={nav} onClick={(e) => e.stopPropagation()}>
      <ul style={{ margin: 0 }}>
        <li css={item}>
          <Link href="/dashboard" passHref>
            <a css={content}>マイページ</a>
          </Link>
        </li>
        <li css={item}>
          <button css={content} onClick={handleSignOut}>
            ログアウト
          </button>
        </li>
      </ul>
    </nav>
  );
};

const nav = css`
  width: 190px;
  background: ${colors.white};
  position: absolute;
  top: 54px;
  right: 48px;
  box-shadow: 0px 3px 6px ${colors.black.lighten[3]};
  border-radius: 8px;
  z-index: 1000;
`;

const item = css`
  width: 100%;
  height: 32px;
  margin: 0;
  cursor: pointer;
  transition: 0.5s;

  :first-child {
    border-radius: 8px 8px 0 0;
  }

  :last-child {
    border-radius: 0 0 8px 8px;
  }

  &:hover {
    background: rgba(75, 197, 187, 0.33);
  }
`;

const content = css`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  color: ${colors.black.lighten[1]};
  display: flex;
  align-items: center;
`;
