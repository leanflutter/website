import { useEffect } from "react";
import type { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";

import { Layout } from "../../components";
import { localDb } from "../../utils";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function PluginsPage(props: any) {
  const { articles } = props;

  const router = useRouter();

  useEffect(() => {
    router.push(`/plugins/${articles[0].slug}`);
  });

  return <Layout></Layout>;
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const articles = localDb.getArticles(locale!, "plugins");
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
      articles,
    },
  };
}
