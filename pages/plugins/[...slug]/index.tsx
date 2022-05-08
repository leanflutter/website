import { Article } from "../../../interfaces";
import type { GetStaticPropsContext } from "next";
import { MdxPage } from "../../../components";
import { localDb } from "../../../utils";
import rehypeExtractHeadings from "../../../utils/rehypeExtractHeadings";
import remarkGfm from "remark-gfm";
import { serialize } from "next-mdx-remote/serialize";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const kNavbarLinks = [
  {
    label: "Plugins",
    initiallyOpened: true,
    links: [
      { label: "hotkey_manager", link: "/plugins/hotkey_manager" },
      { label: "window_manager", link: "/plugins/window_manager" },
    ],
  },
];

export default function DocsDetailPage(props: any) {
  if (!props.article) {
    return <div />;
  }
  return <MdxPage navbarLinks={kNavbarLinks} {...props} />;
}

export async function getStaticPaths({ locales }: any) {
  const paths: Array<any> = [];
  for (let i = 0; i < locales.length; i++) {
    const locale = locales[i];
    const articles: Array<Article> = await localDb.getArticles(
      locale,
      "plugins"
    );
    for (let j = 0; j < articles.length; j++) {
      const article: Article = articles[j];
      paths.push({
        params: {
          slug: article.path
            ?.replace(`plugins/`, "")
            .replace(".md", "")
            ?.split("/"),
        },
        locale,
      });
    }
  }
  return { paths, fallback: true };
}

export async function getStaticProps({
  locale,
  params,
}: GetStaticPropsContext) {
  const article = localDb.getArticleByPath(
    locale!,
    `plugins/${((params?.slug as []) || []).join("/")}.md`
  );
  const headings: any[] = [];
  const mdxContent = await serialize(article.content || "", {
    mdxOptions: {
      remarkPlugins: [[remarkGfm]],
      rehypePlugins: [[rehypeExtractHeadings, { rank: 2, headings }]],
    },
  });
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
      params,
      article: { ...article, mdxContent, headings },
    },
  };
}
