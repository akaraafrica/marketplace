import React, { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import MovingIcon from "@mui/icons-material/Moving";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CollectionsIcon from "@mui/icons-material/Collections";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";

const Index = ({ setValue, id }: any) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <ListItemButton onClick={() => setValue(0)}>
        <ListItemIcon>
          <DashboardIcon sx={{ color: "#777e90" }} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InventoryIcon sx={{ color: "#777e90" }} />
        </ListItemIcon>
        <ListItemText primary="Inventory" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => setValue(1)}>
            <ListItemIcon>
              <CollectionsIcon sx={{ color: "#777e90" }} />
            </ListItemIcon>
            <ListItemText primary="Collections" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => setValue(2)}>
            <ListItemIcon>
              <StarBorder sx={{ color: "#777e90" }} />
            </ListItemIcon>
            <ListItemText primary="Items" />
          </ListItemButton>
        </List>
      </Collapse>
      <Link href={`/notifications/${id}`}>
        <ListItemButton onClick={() => setValue(3)}>
          <ListItemIcon>
            <InboxIcon sx={{ color: "#777e90" }} />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton>
      </Link>
      <ListItemButton onClick={() => setValue(4)}>
        <ListItemIcon>
          <MovingIcon sx={{ color: "#777e90" }} />
        </ListItemIcon>
        <ListItemText primary="Bids" />
      </ListItemButton>
      <Link href={`/profile/${id}`}>
        <ListItemButton onClick={() => setValue(5)}>
          <ListItemIcon>
            <AccountCircleIcon sx={{ color: "#777e90" }} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
      </Link>
      <Link href={`/settings`}>
        <ListItemButton onClick={() => setValue(6)}>
          <ListItemIcon>
            <SettingsIcon sx={{ color: "#777e90" }} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </Link>
    </List>
  );
};

export default Index;
