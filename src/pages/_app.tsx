import "../../styles/reset.css";
import "../../styles/global.css";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { RecoilRoot } from "recoil";
import { AuthInit } from "~/store/auth";
import { ApiProvider } from "~/context/ApiContext";
import { NextUIProvider } from "@nextui-org/react";
import { ResetDropdownState } from "~/libs/Dropdown/dropdownState";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <DefaultSeo
        title="Next × Stripe"
        description="テキストが入るよ"
        canonical="https://sample.test.com"
        openGraph={{
          site_name: "Next × Stripe",
          title: "Next × Stripe",
          type: "website",
          url: "https://sample.test.com",
          description: "テキストが入るよ",
          images: [{ url: `ogp.jpg` }]
        }}
      />
      <ApiProvider>
        <RecoilRoot>
          <NextUIProvider>
            <AuthInit />
            <ResetDropdownState />
            <Component {...pageProps} />
          </NextUIProvider>
        </RecoilRoot>
      </ApiProvider>
    </>
  );
};

export default MyApp;
