import React from "react";
import { Text, SimpleGrid, Container, Title, useMantineTheme, Anchor } from "@mantine/core";

import useStyles from "./SectionPlugins.styles";

export const MOCKDATA = [
  {
    title: "auto_updater",
    description: "This plugin allows Flutter desktop apps to automatically update themselves (based on sparkle and winsparkle).",
  },
  {
    title: "hotkey_manager",
    description: "This plugin allows Flutter desktop apps to defines system/inapp wide hotkey (i.e. shortcut).",
  },
  {
    title: "launch_at_startup",
    description: "This plugin allows Flutter desktop apps to Auto launch on startup / login.",
  },
  {
    title: "local_notifier",
    description: "This plugin allows Flutter desktop apps to notify local notifications.",
  },
  {
    title: "protocol_handler",
    description: "This plugin allows Flutter desktop apps to register and handle custom protocols (i.e. deep linking).",
  },
  {
    title: "screen_capturer",
    description: "This plugin allows Flutter desktop apps to capture screenshots.",
  },
  {
    title: "screen_retriever",
    description: "This plugin allows Flutter desktop apps to Retrieve information about screen size, displays, cursor position, etc.",
  },
  {
    title: "screen_text_extractor",
    description: "This plugin allows Flutter desktop apps to extract text from screen.",
  },
  {
    title: "tray_manager",
    description: "This plugin allows Flutter desktop apps to defines system tray.",
  },
  {
    title: "window_manager",
    description: "This plugin allows Flutter desktop apps to resizing and repositioning the window.",
  },
];



interface FeatureProps {
  title: React.ReactNode;
  description: React.ReactNode;
}

export function Feature({ title, description }: FeatureProps) {
  const theme = useMantineTheme();
  return (
    <div>
      <Anchor<"a"> href={`https://github.com/leanflutter/${title}`} target="_blank">
        <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>{title}</Text>
      </Anchor>
      <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
        {description}
      </Text>
    </div>
  );
}

interface SectionPluginsProps {
}

export function SectionPlugins(props: SectionPluginsProps) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const features = MOCKDATA.map((feature, index) => <Feature {...feature} key={index} />);

  return (
    <div className={classes.wrapper}>
      <Container >
        <Title className={classes.title}>{"Our Plugins"}</Title>
        <SimpleGrid
          mt={60}
          cols={3}
          spacing={theme.spacing.xl * 2}
          breakpoints={[
            { maxWidth: 980, cols: 2, spacing: 'xl' },
            { maxWidth: 755, cols: 1, spacing: 'xl' },
          ]}
        >
          {features}
        </SimpleGrid>
      </Container>
    </div>
  );
}