import React from "react";
import { Backdrop } from "@mui/material";
import styles from "./index.module.scss";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import Link from "next/link";

interface Properties {
  open: boolean;
  data: any;
  handleClose: () => void;
}
const Index = ({ open, data, handleClose }: Properties) => {
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
                <Link href={`/profile/${user.username}`} key={user.id}>
                  <div>{user?.profile?.name}</div>
                </Link>
              ))}
            {data &&
              data[1] &&
              data[1].map((collection: any) => (
                <Link href={`/collection/${collection.id}`} key={collection.id}>
                  <div>{collection.title}</div>
                </Link>
              ))}
            {data &&
              data[2] &&
              data[2].map((item: any) => (
                <Link href={`/item/${item.id}`} key={item.id}>
                  <div>{item.title}</div>
                </Link>
              ))}
          </div>
        </div>
      </ClickAwayListener>
    </Backdrop>
  );
};

export default Index;
