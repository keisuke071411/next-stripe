import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import "../../styles/reset.css";
import "../../styles/global.css";
import { RecoilRoot } from "recoil";
import { AuthInit } from "~/store/auth";
import { ApiProvider } from "~/context/ApiContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
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
          <AuthInit />
          <Component {...pageProps} />
        </RecoilRoot>
      </ApiProvider>
    </>
  );
};

export default MyApp;
