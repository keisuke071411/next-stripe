import { ComponentType, Fragment } from "react";
import { useRouter } from "next/router";
import { useRecoilValueLoadable } from "recoil";
import { authState } from "~/store/auth";

export const withAuthenticated = <P extends {} = {}>(
  Element: ComponentType<P>
) => {
  return (props: Omit<P, keyof {}>) => {
    const { contents: currentUser, state } = useRecoilValueLoadable(authState);
    const router = useRouter();

    if (!router.isReady) return <Fragment />;

    if (state === "loading") return <Fragment />;

    if (state === "hasError") return <p>Error page</p>;

    if (!currentUser) {
      router.push("/");
      return <Fragment />;
    }

    return <Element {...props} />;
  };
};
