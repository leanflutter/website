import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Dropdown, Layout as LayoutComp, Menu } from "antd";

import { Brand } from "..";
import { DownOutlined } from "@ant-design/icons";
import { useTranslation } from "next-i18next";

interface LayoutProps {
  title?: string;
  description?: string;
  children?: any;
}

export default function Layout({ title, description, children }: LayoutProps) {
  const { t } = useTranslation("common");

  const router = useRouter();
  const { locale, locales, route } = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <LayoutComp className="bg-white">
        <LayoutComp.Header className="w-screen fixed z-10 flex justify-center bg-white border-t-0 border-l-0 border-r-0 border-b border-solid border-b-slate-100">
          <div className="container flex flex-row items-center">
            <Brand />
            <div className="flex-1">
              <Menu
                className="border-none bg-transparent"
                mode="horizontal"
                selectedKeys={[router.pathname]}
              >
                <Menu.Item key="/plugins">
                  <Link href="/plugins">
                    <a>{t("nav-item-plugins")}</a>
                  </Link>
                </Menu.Item>
                <Menu.SubMenu key="/tools" title={t("nav-item-tools")}>
                  <Menu.Item key="/tools/flutter_distributor">
                    <Link
                      href={
                        "https://github.com/leanflutter/flutter_distributor"
                      }
                    >
                      <a>flutter_distributor</a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="/tools/makeanyicon">
                    <Link href={"https://github.com/leanflutter/makeanyicon"}>
                      <a>makeanyicon</a>
                    </Link>
                  </Menu.Item>
                </Menu.SubMenu>
              </Menu>
            </div>
            <Dropdown
              overlay={
                <Menu>
                  {locales?.map((e) => (
                    <Menu.Item key={e}>
                      <Link href={route} locale={e}>
                        <a className="flex justify-center">
                          <Image
                            src={`/images/flags/${e}.svg`}
                            width={20}
                            height={20}
                            alt=""
                          />
                          <label className="ml-2">{t(`language.${e}`)}</label>
                        </a>
                      </Link>
                    </Menu.Item>
                  ))}
                </Menu>
              }
            >
              <Button>
                <a
                  className="flex items-center"
                  onClick={(e) => e.preventDefault()}
                >
                  <Image
                    src={`/images/flags/${locale}.svg`}
                    width={20}
                    height={20}
                    alt=""
                  />
                  <label className="ml-2 mr-2">{t(`language.${locale}`)}</label>
                  <DownOutlined />
                </a>
              </Button>
            </Dropdown>
          </div>
        </LayoutComp.Header>
        <LayoutComp.Content className="pt-16">{children}</LayoutComp.Content>
        <LayoutComp.Footer className="w-screen flex justify-center bg-white border-b-0 border-l-0 border-r-0 border-t border-solid border-t-slate-100">
          <div className="container">
            <label>© 2022 LeanFlutter Team. All rights reserved.</label>
          </div>
        </LayoutComp.Footer>
      </LayoutComp>
    </>
  );
}
