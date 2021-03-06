import { AppShell } from "@mantine/core";
import { Footer } from "./Footer";
import Head from "next/head";
import { Header } from "./Header";
import React from "react";
import { useTranslation } from "next-i18next";

interface LayoutProps {
  title?: string;
  description?: string;
  children?: any;
}

export function Layout({ title, description, children }: LayoutProps) {
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div>
        <AppShell
          header={
            <Header
              links={[
                {
                  link: "/plugins/window_manager",
                  label: t("nav-item-plugins"),
                  links: [],
                },
                {
                  link: "/tools",
                  label: t("nav-item-tools"),
                  links: [
                    {
                      link: "https://github.com/leanflutter/flutter_distributor",
                      label: "flutter_distributor",
                    },
                    {
                      link: "https://github.com/leanflutter/makeanyicon",
                      label: "makeanyicon",
                    },
                  ],
                },
                { link: "/blog", label: t("nav-item-blog"), links: [] },
                {
                  link: "/sponsor",
                  label: t("nav-item-sponsor"),
                  links: [],
                },
              ]}
            />
          }
          padding={0}
        >
          <div style={{ marginTop: 56 }}>{children}</div>
          <Footer />
        </AppShell>
      </div>
    </>
  );
}
