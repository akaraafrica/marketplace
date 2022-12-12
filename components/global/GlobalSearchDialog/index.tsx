import React from "react";
import { Backdrop } from "@mui/material";
import styles from "./index.module.scss";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import itemDs from "../../../ds/item.ds";

interface Properties {
  open: boolean;
  data: any;
  handleClose: () => void;
}
const Index = ({ open, data, handleClose }: Properties) => {
  console.log(data);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <ClickAwayListener onClickAway={handleClose}>
        <div className={styles.background}>
          <h3>Search results</h3>
          <div className={styles.list}>
            {data &&
              data[0] &&
              data[0].map((user: any) => (
                <div key={user.id}>{user?.profile?.name}</div>
              ))}
            {data &&
              data[1] &&
              data[1].map((collection: any) => (
                <div key={collection.id}>{collection.title}</div>
              ))}
            {data &&
              data[2] &&
              data[2].map((item: any) => <div key={item.id}>{item.title}</div>)}
          </div>
        </div>
      </ClickAwayListener>
    </Backdrop>
  );
};

export default Index;
