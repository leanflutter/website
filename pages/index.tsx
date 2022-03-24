import type { GetStaticPropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Button, Typography } from "antd";
import { GithubOutlined } from "@ant-design/icons";

import { Layout } from "../components";

const { Text } = Typography;

export default function HomePage(props: any) {
  const { t } = useTranslation("common");

  return (
    <Layout
      title={`LeanFlutter - ${t("slogan")}`}
      description={`LeanFlutter - ${t("slogan")}`}
    >
      <div
        className="w-screen flex justify-center bg-white"
        style={{ height: 400 }}
      >
        <div className="container flex items-center">
          <div>
            <Text className="text-5xl">LeanFlutter</Text>
            <br />
            <br />
            <Text className="text-3xl">{t("slogan")}</Text>
            <div className="h-10" />
            <div className="flex flex-row items-center">
              <Button type="primary" size="large" prefix="">
                <Link href="/contact" passHref={true}>
                  {t("btn-get-in-touch")}
                </Link>
              </Button>
              <div className="w-10" />
              <a href="https://github.com/leanflutter">
                <Button
                  icon={<GithubOutlined />}
                  type="text"
                  size="large"
                ></Button>
              </a>
            </div>
            <div className="h-10" />
          </div>
        </div>
      </div>
      <div
        className="w-screen flex justify-center bg-slate-50"
        style={{ height: 200 }}
      >
        <div className="container flex justify-center items-center">
          <Text>🎉 🎉 🎉</Text>
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
