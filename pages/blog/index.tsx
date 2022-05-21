/* eslint-disable @next/next/no-img-element */
import { Anchor, Container, Divider, Text, Title } from "@mantine/core";

import { GetStaticPropsContext } from "next";
import { Layout } from "../../components";
import React from "react";
import { localDb } from "../../utils";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

export default function BlogPage(props: any) {
  const { articles } = props;

  return (
    <Layout>
      <Container>
        <Title pt={42}>Blog</Title>
        <Divider my={24} variant="dotted" />
        {articles.map((article: any) => (
          <div key={`${article.title}`}>
            <Title order={2} pt={24}>
              <Anchor component={Link}
                href={`/${article.path.replaceAll('.md', '')}`}
              >
                {article.title}
              </Anchor>
            </Title>
            <Text color="gray" style={{ fontSize: 14 }}>
              {article.date}
            </Text>
            <Divider my="sm" variant="dotted" />
          </div>
        ))}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({
  locale,
}: GetStaticPropsContext) {
  const articles = localDb.getArticles(locale!, `blog`);


  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
      articles,
    },
  };
}
