import { ComponentPropsWithRef, ForwardedRef } from "react";
import { css } from "@emotion/react";
import { SetterOrUpdater } from "recoil";

interface OverlayProps extends ComponentPropsWithRef<"div"> {
  color?: "primary" | "secondary";
  setOverlay: SetterOrUpdater<boolean>;
  forwardRef?: ForwardedRef<HTMLDivElement>;
}

const common = css`
  width: 100%;
  height: 100%;
  margin: auto;
  position: fixed;
  inset: 0;
  z-index: 100;
`;

const overlayColor = {
  primary: "rgba(0, 0, 0, 0.54)",
  secondary: "inherit"
};

export const Overlay = ({
  color = "primary",
  children,
  setOverlay,
  ...props
}: OverlayProps): JSX.Element => {
  const overlay = css`
    ${common};
    background: ${overlayColor[color]};
  `;

  return (
    <div onClick={() => setOverlay(false)} css={overlay} {...props}>
      {children}
    </div>
  );
};
