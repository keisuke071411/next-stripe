import { css } from "@emotion/react";
import { ComponentPropsWithRef } from "react";

const container = css`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 16px;
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
