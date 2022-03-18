import { css } from "@emotion/react";
import { ComponentPropsWithRef } from "react";

const container = css`
  max-width: 1240px;
  margin: 0 auto;
`;

export const Container = ({
  children,
  ...props
}: ComponentPropsWithRef<"div">): JSX.Element => {
  return (
    <div css={container} {...props}>
      {children}
    </div>
  );
};
