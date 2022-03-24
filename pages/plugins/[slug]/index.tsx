import type { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Menu, Typography } from "antd";

import { ArticleBody, Layout } from "../../../components";
import { localDb, markdownToHtml } from "../../../utils";

const { Title } = Typography;

const kItems: any = {
  "/": [
    {
      key: "plugins",
      children: [
        {
          title: "window_manager",
          path: "/plugins/window_manager",
        },
      ],
    },
  ],
};

export default function PluginDetailPage(props: any) {
  const router = useRouter();

  const { article } = props;

  return (
    <Layout title={`${article?.title} - LeanFlutter`}>
      <div className="flex flex-col items-center">
        <div className="container flex flex-row">
          <div className="w-64 mr-6 ">
            <Menu
              className="custom-menu w-64 mt-4"
              defaultSelectedKeys={[router.pathname]}
              defaultOpenKeys={kItems["/"].map((e: any) => e.key)}
              mode={"inline"}
            >
              {kItems["/"].map((section: any) => {
                const { key, key: title, children: subPaths } = section;
                return (
                  <Menu.SubMenu key={key} title={title.toUpperCase()}>
                    {subPaths.map((subPath: any) => {
                      return (
                        <Menu.Item key={subPath.path}>
                          <Link href={`${subPath.path}`}>
                            <a>{subPath.title}</a>
                          </Link>
                        </Menu.Item>
                      );
                    })}
                  </Menu.SubMenu>
                );
              })}
            </Menu>
          </div>
          <div className="flex-1 pt-4 pb-4">
            <Title>{article?.title}</Title>
            <ArticleBody content={article?.content} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: "" } }],
    fallback: true, // false or 'blocking'
  };
}

export async function getStaticProps({
  locale,
  params,
}: GetStaticPropsContext) {
  const article = localDb.getArticleBySlug(
    locale!,
    "plugins",
    `${params?.slug}`
  );
  const content = await markdownToHtml(article.content || "");

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
      article: {
        ...article,
        content,
      },
    },
  };
}
