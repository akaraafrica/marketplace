/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import styles from "./index.module.scss";
import Footer from "../../components/Footer/index";
import Header from "../../components/Header/index";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import getNiceDate from "../../utils/helpers/dateFormatter";
import { NotificationDs, ContributorDs } from "../../ds";
import { AuthContext } from "../../contexts/AuthContext";
import withAuth from "../../HOC/withAuth";

interface ListItemProps {
  title: string;
  subTitle: string;
  date: string;
  img: string;
  action: string;
}
const ListItem: React.FC<ListItemProps> = ({
  title,
  subTitle,
  date,
  img,
  action,
}) => {
  const { user, isAuthenticated, signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [respond, setRespond] = useState(true);

  const id = user?.id;
  const handleAccept = async () => {
    setLoading(true);
    await ContributorDs.updateStatus({ id, status: "ACCEPTED" });
    setLoading(false);
    setRespond(false);
  };
  const handleReject = async () => {
    setLoading(true);
    await ContributorDs.updateStatus({ id, status: "REJECTED" });
    setLoading(false);
    setRespond(false);
  };
  return (
    <div className={styles.listItemWrapper}>
      <div className={styles.listItem}>
        <div className={styles.left}>
          <img
            className={styles.avatar}
            src={img ? img : "/assets/avatar.png"}
            alt=""
          />
          <div className={styles.desc}>
            <div className={styles.title}>{title}</div>
            <p className={styles.sub}>{subTitle}</p>
            <span className={styles.date}>{date}</span>
          </div>
        </div>
        <span className={styles.dot}></span>
      </div>
      {!loading ? (
        action === "create-collection" || (action === "add-item" && respond) ? (
          <div className={styles.actions}>
            <button onClick={handleAccept}>Accept</button>
            <button onClick={handleReject}>Reject</button>
          </div>
        ) : (
          ""
        )
      ) : (
        <span className={styles.actions}>Wait...</span>
      )}
    </div>
  );
};

const Index = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const { user, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (user?.id)
      NotificationDs.fetch(user!.id).then((res) => {
        setNotifications(res.data);
      });
  }, [user]);

  // const updateData = async (id: string) => {
  //   await NotificationDs.update(
  //     id,
  //     user?.walletAddress || "",
  //     user?.accessToken || ""
  //   );
  // };

  const updateAllData = async () => {
    const data = await NotificationDs.updateAll(
      user?.accessToken || "",
      user?.walletAddress || ""
    );
    if (data && data.status === 204) {
      return toast.success("Marked all as read");
    }
  };

  console.log({ notifications });
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
                img={item?.item?.images[0]}
                date={getNiceDate(item.createdAt)}
                action={item.action}
              />
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withAuth(Index);
