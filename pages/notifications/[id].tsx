import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Footer from "../../components/Footer/index";
import Header from "../../components/Header/index";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";

interface NotificationProps {
  title: string;
  content: string;
  status: boolean;
}
const Item = () => {
  const router = useRouter();
  const [notification, setNotification] = useState<NotificationProps>();

  const user = useSelector((state: any) => state.userSlice.user);

  const address = user.user.address;
  const token = user.accessToken;
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`/api/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ address: address }),
      });
      setNotification(data.data.data);
    };

    fetchData();
  }, [address, token, id]);

  console.log(notification);
  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.breadcrumbWrap}>
        <div
          onClick={() => router.push("/notifications")}
          className={styles.backButton}
        >
          <BiArrowBack />
          <p className={styles.backText}>Back</p>
        </div>
        <div className={styles.breadcrumb}>
          <span>Profile</span>
          <span>&gt;</span>
          <span>Notifications</span>
          <span>&gt;</span>
          <span>{notification && notification.title}</span>
        </div>
      </div>
      <div className={styles.notification}>
        <div className={styles.noteTitle}>
          <h3>{notification && notification.title}</h3>
        </div>
        <div className={styles.body}>
          <p>{notification && notification.content}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Item;
