import { Backdrop } from "@mui/material";
import Image from "next/image";
import styles from "./Dialog.module.scss";
export default function Dialog({ open, handleClose, title, children }: any) {
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <div className={styles.background}>
          <div className={styles.content}>
            <div className={styles.bidheader}>
              {title && <h1>{title}</h1>}
              <Image
                alt="close"
                src="/assets/close.svg"
                width={35}
                height={35}
                onClick={handleClose}
              />
            </div>
            {children}
          </div>
        </div>
      </Backdrop>
    </>
  );
}
