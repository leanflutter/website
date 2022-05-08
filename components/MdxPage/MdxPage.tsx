import { Divider, Title } from "@mantine/core";

import { Article } from "../../interfaces";
import { Layout } from "..";
import { MdxContent } from "./MdxContent";
import { Navbar } from "./Navbar";
import { TableOfContents } from "./TableOfContents";
import useStyles from "./MdxPage.styles";
import { useTranslation } from "next-i18next";

interface MdxPageProps {
  navbarLinks: any[];
  article: Article;
}

export function MdxPage(props: MdxPageProps) {
  const { classes } = useStyles();
  const { t } = useTranslation("common");
  const { navbarLinks = [], article } = props;
  return (
    <Layout
      title={`${article.title} - ${t("name")}`}
      description={`${article.title} - ${t("name")}`}
    >
      <div className={classes.wrapper}>
        {navbarLinks.length > 0 && (
          <Navbar links={navbarLinks} />
        )}
        <div className={classes.container}>
          <Title>{article.title}</Title>
          <Divider my={24} variant="dotted" />
          <MdxContent article={article} />
        </div>
        <div className={classes.tableOfContents}>
          {/* <TableOfContents headings={article?.headings || []} withTabs={false} /> */}
        </div>
      </div>
    </Layout>
  );
}
