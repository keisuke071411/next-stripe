import { css } from "@emotion/react";
import { Loading } from "@nextui-org/react";
import { colors } from "styles/themes";

export const LoadingScreen = () => {
  return (
    <div css={wrapper}>
      <Loading size="xl" />
    </div>
  );
};

const wrapper = css`
  min-height: 100vh;
  padding: 80px 0;
  background: ${colors.black.lighten[4]};
  display: flex;
  justify-content: center;
  align-items: center;
`;
