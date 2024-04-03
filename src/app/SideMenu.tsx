import {
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import React from "react";

export default function SideMenu() {
  return (
    <div>
      <Drawer
        sx={{
          width: "200px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "200px",
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        {/* <Divider /> */}
        <List>
          {["json", "MongoDB", "SQL", "Postgres"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
              <Link href={`/${text}`}>{text.toLocaleUpperCase() }</Link>
                {/* <ListItemText primary={text}  /> */}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
