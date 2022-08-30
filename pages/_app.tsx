// types
import type { AppProps } from "next/app";

// i18n
import { appWithTranslation, useTranslation } from "next-i18next";

// styles
import { theme } from "theme/theme";
import "../styles/globals.css";

// components
import { NextUIProvider } from "@nextui-org/react";
import { useEffect } from "react";
import Layout from "components/layout/Layout";

// icons
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();
  useEffect(() => {
    if (i18n.language) {
      localStorage.setItem("lang", i18n.language);
    }
  }, [i18n.language]);

  return (
    <NextUIProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NextUIProvider>
  );
}

export default appWithTranslation(MyApp);
