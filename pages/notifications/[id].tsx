/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import styles from "./index.module.scss";
import Footer from "../../components/Footer/index";
import Header from "../../components/Header/index";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import getNiceDate from "../../utils/helpers/dateFormatter";
import { NotificationDs, ContributorDs } from "../../ds";
import { AuthContext } from "../../contexts/AuthContext";
import useSWR, { mutate, SWRConfig, unstable_serialize } from "swr";
import { INotification } from "../../types/notification.interface";
import NextImage from "../../components/global/Image";
import Link from "next/link";
import DefaultAvatar from "../../components/global/DefaultAvatar";
import useWindowSize from "../../hooks/useWindowSize";
import { GetServerSideProps } from "next";
import withAuth from "../../HOC/withAuth";
import collectionsDs from "../../ds/collections.ds";

interface ListItemProps {
  title: string;
  subTitle: string;
  date: string;
  img: string;
  action: string;
  id: string;
  read: string;
}
const ListItem: React.FC<ListItemProps> = ({
  title,
  subTitle,
  date,
  img,
  read,
  id,
  action,
}) => {
  return (
    <div className={styles.listItemWrapper} id={id}>
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
          {!read && <span className={styles.dot}></span>}
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const width = useWindowSize().width!;
  const [loading, setLoading] = useState(false);

  const { data: notifications } = useSWR<{ data: INotification[] }>(
    "notificationsAll",
    () => NotificationDs.fetchAll(user!.id)
  );

  const updateData = async (id: any) => {
    if (user) await NotificationDs.update(id, user.walletAddress);
    mutate("notificationsAll");
  };
  const [selectedNotification, setSelectedNotification] = useState(
    notifications?.data[0]
  );
  useEffect(() => {
    if (!selectedNotification?.read) {
      updateData(selectedNotification?.id);
    }
  }, [selectedNotification]);

  // useEffect(() => {
  //   const id = router.query.id as string;

  //   if (id && notifications?.data) {
  //     const findNotification = notifications?.data.find(
  //       (item) => item!.id === Number(id)
  //     );
  //     if (findNotification) {
  //       setSelectedNotification(findNotification);
  //     }
  //   }
  // }, [router, notifications]);
  useEffect(() => {
    if (selectedNotification)
      document
        .getElementById(selectedNotification!.id!.toString())
        ?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
  }, [selectedNotification]);
  // useEffect(() => {
  //   if (!selectedNotification) {
  //     setSelectedNotification(notifications?.data[0]);
  //   }
  // }, [notifications]);

  // useEffect(() => {
  //   if (selectedNotification && !selectedNotification?.read) {
  //     updateData(selectedNotification.id as unknown as string);
  //   }
  // }, [selectedNotification]);
  const updateAllData = async () => {
    const data = await NotificationDs.updateAll(user!.walletAddress);
    mutate("notificationsAll");
    if (data && data.status === 204) {
      return toast.success("Marked all as read");
    }
  };
  const isContributor = () => {
    return selectedNotification?.collection?.contributors?.find(
      (con) => con.userId === user?.id
    );
  };

  const handleAccept = async () => {
    try {
      const contributor = isContributor();
      setLoading(true);
      await ContributorDs.updateStatus({
        id: contributor?.id,
        status: "ACCEPTED",
      });
      setLoading(false);
      toast.success("Accepted");
    } catch (error) {
      toast.error("Error Acceptting");
    }
  };
  const handleReject = async () => {
    try {
      const contributor = isContributor();
      setLoading(true);
      await ContributorDs.updateStatus({
        id: contributor?.id,
        status: "REJECTED",
      });
      setLoading(false);
      toast.success("Rejected");
    } catch (error) {
      toast.error("Error");
    }
  };

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
          <div className={styles.markButton} onClick={() => updateAllData()}>
            <p className={styles.markText}>Mark all as read</p>
          </div>
        </div>

        <main>
          {(width > 800 || !selectedNotification) && (
            <div className={styles.list}>
              {notifications &&
                notifications.data.map((item: any) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedNotification(item)}
                    className={
                      item.id === selectedNotification?.id ? styles.active : ""
                    }
                  >
                    <ListItem
                      key={item.id}
                      id={item.id}
                      read={item.read}
                      title={item.title}
                      subTitle={item.content}
                      img={item?.item?.images[0] || item?.collection?.images[0]}
                      date={getNiceDate(item.createdAt)}
                      action={item.action}
                    />
                  </div>
                ))}
            </div>
          )}

          {selectedNotification && (
            <section>
              {width < 800 && (
                <BiArrowBack
                  className={styles.back}
                  onClick={() => setSelectedNotification(undefined)}
                />
              )}
              <div className={styles.header}>
                <div className={styles.avater}>
                  <h3>{selectedNotification?.title}</h3>
                  <br />
                </div>

                <h4>
                  {selectedNotification?.item?.createdAt &&
                    getNiceDate(selectedNotification!.item!.createdAt)}
                </h4>
              </div>
              <div className={styles.description}>
                <DefaultAvatar
                  id={selectedNotification?.sender?.id}
                  url={selectedNotification?.sender?.profile?.avatar}
                  walletAddress={
                    selectedNotification?.sender?.walletAddress || ""
                  }
                  width="100px"
                  height="100px"
                />

                <span>{selectedNotification?.description}</span>
              </div>
              {selectedNotification?.item && (
                <>
                  <div className={styles.img}>
                    <Link href={"/item/" + selectedNotification?.item?.id}>
                      <a>
                        <NextImage
                          alt={selectedNotification?.item?.title}
                          src={selectedNotification?.item?.images[0]}
                          width={500}
                          height={500}
                        />
                      </a>
                    </Link>

                    <Link href={"/item/" + selectedNotification?.item?.id}>
                      <a>
                        <button className={styles.visit}>Go to Item</button>
                      </a>
                    </Link>
                  </div>
                </>
              )}
              {selectedNotification?.collection && (
                <>
                  <div className={styles.contributorImages}>
                    {selectedNotification?.collection?.items.length
                      ? selectedNotification?.collection?.items
                          ?.filter((item) => item.ownerId === user?.id)
                          .slice(0, 4)
                          .map((item) => {
                            return (
                              <Link href={"item/" + item?.id} key={item.id}>
                                <a>
                                  <NextImage
                                    alt={item?.title}
                                    src={item?.images[0]}
                                    layout="fixed"
                                    width={300}
                                    height={300}
                                  />
                                </a>
                              </Link>
                            );
                          })
                      : selectedNotification?.collection?.draftItems
                          ?.filter((item) => item.ownerId === user?.id)
                          .slice(0, 4)
                          .map((item) => {
                            return (
                              <Link href={"item/" + item?.id} key={item.id}>
                                <a>
                                  <NextImage
                                    alt={item?.title}
                                    src={item?.images[0]}
                                    layout="fixed"
                                    width={300}
                                    height={300}
                                  />
                                </a>
                              </Link>
                            );
                          })}
                  </div>
                  <Link
                    href={
                      "collection/" +
                      selectedNotification?.collection?.id +
                      "/admin"
                    }
                  >
                    <button className={styles.visit}>
                      Collection Dashboard
                    </button>
                  </Link>
                  {!loading ? (
                    selectedNotification?.action === "contributor-notice" &&
                    isContributor()?.confirmation === "PENDING" && (
                      <div className={styles.actions}>
                        <button onClick={handleAccept}>Accept</button>
                        <button onClick={handleReject}>Reject</button>
                      </div>
                    )
                  ) : (
                    // )
                    <span className={styles.actions}>Wait...</span>
                  )}
                </>
              )}
            </section>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id }: any = ctx.params;
  let data = await NotificationDs.fetchAll(id);

  return {
    props: {
      fallback: {
        [unstable_serialize("notificationsAll")]: data,
      },
    },
  };
};
const Page = ({ fallback }: any) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Index />
    </SWRConfig>
  );
};
export default Page;

// export default withAuth(Page);
