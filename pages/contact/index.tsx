import type { GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Typography } from "antd";

import { Layout } from "../../components";

const { Text } = Typography;

export default function ContactPage(props: any) {
  const { t } = useTranslation("common");

  return (
    <Layout
      title={`LeanFlutter - ${t("slogan")}`}
      description={`LeanFlutter - ${t("slogan")}`}
    >
      <div className="flex justify-center items-center" style={{ height: 200 }}>
        <div className="container flex justify-center">
          <Text>Coming soon</Text>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
}
