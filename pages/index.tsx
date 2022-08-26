import type { GetStaticPropsContext, NextPage } from "next";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home: NextPage = () => {
  const { t, i18n } = useTranslation("common");

  return <div>{t("hello")}</div>;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(context?.locale ?? "", ["common"])),
    },
  };
}

export default Home;
