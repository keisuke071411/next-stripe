import { useRouter } from "next/router";
import { useEffect } from "react";
import { atom, useResetRecoilState } from "recoil";

export const dropdownState = atom<boolean>({
  key: "dropdownState",
  default: false
});

// ページ遷移した際にdropdownStateをリセットする
export const ResetDropdownState = () => {
  const resetDropdownState = useResetRecoilState(dropdownState);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      resetDropdownState();
    });
    return () => {
      router.events.off("routeChangeStart", () => {
        resetDropdownState();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
