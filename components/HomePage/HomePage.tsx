import { useTranslation } from "next-i18next";
import { Layout } from "..";

import { SectionPlugins } from "./SectionPlugins/SectionPlugins";
import { SectionJumbotron } from "./SectionJumbotron/SectionJumbotron";
import { SectionPartyPopper } from "./SectionPartyPopper/SectionPartyPopper";

export function HomePage() {
  const { t } = useTranslation("common");
  return (
    <Layout
      title={`${t("name")} - ${t("slogan")}`}
      description={`${t("name")} - ${t("slogan")}`}
    >
      <SectionJumbotron />
      <SectionPlugins />
      <SectionPartyPopper />
    </Layout>
  );
}
