import React from "react";
import {
  Title,
  Group,
  Text,
  Button,
  Container,
  useMantineTheme,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { BrandGithub } from "tabler-icons-react";
import useStyles from "./SectionJumbotron.styles";
import { useTranslation } from "next-i18next";

interface BannerProps {}

export function SectionJumbotron(props: BannerProps) {
  const { classes, cx } = useStyles();
  const [, scrollTo] = useWindowScroll();

  const { t } = useTranslation("common");

  return (
    <div className={classes.wrapper}>
      <Container>
        <div className={classes.body}>
          <Title className={classes.title}>
            <span className={classes.highlight}>{t("name")}</span>
          </Title>
          <Text className={classes.description}>{t("slogan")}</Text>
          <Group className={classes.controls}>
            <Button
              className={cx(classes.control)}
              leftIcon={<BrandGithub />}
              variant="outline"
              component="a"
              href="https://github.com/leanflutter"
            >
              GitHub
            </Button>
          </Group>
        </div>
      </Container>
    </div>
  );
}
