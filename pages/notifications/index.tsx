/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import styles from "./index.module.scss";
import Footer from "../../components/Footer/index";
import Header from "../../components/Header/index";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import getNiceDate from "../../utils/helpers/dateFormatter";
import { UserDs, NotificationDs } from "../../ds";
import { IUser } from "../../types/user.interface";

interface ListItemProps {
  title: string;
  subTitle: string;
  date: string;
  onClick: (e: any) => void;
}
const ListItem: React.FC<ListItemProps> = ({
  title,
  subTitle,
  date,
  onClick,
}) => (
  <div className={styles.listItem} onClick={onClick}>
    <div className={styles.left}>
      <img className={styles.avatar} src="/assets/avatar.png" alt="" />
      <div className={styles.desc}>
        <div className={styles.title}>{title}</div>
        <p className={styles.sub}>{subTitle}</p>
        <span className={styles.date}>{date}</span>
      </div>
    </div>
    <span className={styles.dot}></span>
  </div>
);

const Index = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState<IUser>();
  const { account, active, activate } = useWeb3React();

  useEffect(() => {
    const getUser = async (address: string) => {
      const user = await UserDs.fetch(address);
      if (!user) {
        console.log("user not found");
        return;
      }
      console.log("user here is ", user);
      setUser(user);
      const data = await NotificationDs.fetch(
        user?.accessToken,
        user?.walletAddress
      );
      setNotifications(data);
    };
    if (account) getUser(account);
  }, [account]);

  const updateData = async (id: string) => {
    await NotificationDs.update(
      id,
      user?.walletAddress || "",
      user?.accessToken || ""
    );
  };

  const updateAllData = async () => {
    const data = await NotificationDs.updateAll(
      user?.accessToken || "",
      user?.walletAddress || ""
    );
    if (data && data.status === 204) {
      return toast.success("Marked all as read");
    }
  };

  console.log(notifications);
  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.breadcrumbWrap}>
        <div onClick={() => router.push("/")} className={styles.backButton}>
          <BiArrowBack />
          <p className={styles.backText}>Back to home</p>
        </div>
        <div className={styles.breadcrumb}>
          <span>Profile</span>
          <span>&gt;</span>
          <span>Notifications</span>
        </div>
      </div>
      <div className={styles.notification}>
        <div className={styles.top}>
          <h3>Notifications</h3>
          <div className={styles.markButton} onClick={() => updateAllData()}>
            <p className={styles.markText}>Mark all as read</p>
          </div>
        </div>
        <div className={styles.nav}>
          <span className={styles.navItem}>Latest</span>
          <span>Unread</span>
          <span>All notifications</span>
        </div>
        <div className={styles.list}>
          {notifications &&
            notifications.map((item: any) => (
              <ListItem
                key={item.id}
                title={item.title}
                subTitle={item.content}
                date={getNiceDate(item.created)}
                onClick={() => {
                  updateData(item.id);
                  return router.push(`/notifications/${item.id}`);
                }}
              />
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
