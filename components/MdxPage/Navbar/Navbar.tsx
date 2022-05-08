import React from "react";
import { Navbar as NavbarComp, ScrollArea } from "@mantine/core";
import { LinksGroup } from "./LinksGroup";

import useStyles from "./Navbar.styles";

export function Navbar({ links = [] }: any) {
  const { classes } = useStyles();
  return (
    <NavbarComp height={800} width={{ sm: 260 }} className={classes.navbar}>
      <NavbarComp.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>
          {links.map((item: any) => (
            <LinksGroup {...item} key={item.label} />
          ))}
        </div>
      </NavbarComp.Section>
    </NavbarComp>
  );
}
