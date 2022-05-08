import type { GetStaticPropsContext } from "next";
import { MdxPage } from "../../components";
import { localDb } from "../../utils";
import rehypeExtractHeadings from "../../utils/rehypeExtractHeadings";
import remarkGfm from "remark-gfm";
import { serialize } from "next-mdx-remote/serialize";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function DocsDetailPage(props: any) {
  if (!props.article) {
    return <div />;
  }
  return <MdxPage {...props} />;
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const article = localDb.getArticleByPath(locale!, `sponsor.md`);
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
      article: { ...article, mdxContent, headings },
    },
  };
}
