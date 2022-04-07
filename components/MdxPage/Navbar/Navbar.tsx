import React from "react";
import { Navbar as NavbarComp, ScrollArea } from "@mantine/core";
import { Notes } from "tabler-icons-react";
import { LinksGroup } from "./LinksGroup";

import useStyles from "./Navbar.styles";

const mockdata = [
  {
    label: "Plugins",
    initiallyOpened: true,
    links: [
      { label: "hotkey_manager", link: "/plugins/hotkey_manager" },
      { label: "window_manager", link: "/plugins/window_manager" },
    ],
  },
];

export function Navbar() {
  const { classes } = useStyles();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <NavbarComp
      height={800}
      width={{ sm: 260 }}
      className={classes.navbar}
    >
      <NavbarComp.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </NavbarComp.Section>
    </NavbarComp>
  );
}
