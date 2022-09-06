/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import styles from "./index.module.scss";
import Layout from "../../components/Layout";
import NextImage from "next/image";
import { AiTwotoneEdit } from "react-icons/ai";
import { TbWorld, TbBrandTwitter, TbBrandInstagram } from "react-icons/tb";
import { IoShareOutline } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { RiFacebookCircleLine } from "react-icons/ri";
import { ProfileDs } from "../../ds";
import { GetServerSideProps } from "next";
import getNiceDate from "../../utils/helpers/dateFormatter";
import ProfileItem from "../../components/ProfileItem";
import DefaultAvatar from "../../components/DefaultAvatar";
import { UserDs } from "../../ds";
import { AuthContext } from "../../contexts/AuthContext";
import { IProfile } from "../../types/profile.interface";

const ProfilePage = ({ profile }: { profile: IProfile }) => {
  const [open, setOpen] = React.useState(0);
  const { walletAddress, createdAt, items, userFollowers, collections } =
    profile;
  const user = useContext(AuthContext).user;
  // console.log(profile);
  const [isFollowing, setIsFollowing] = useState<false | { id: number }>(false);
  useEffect(() => {
    const isFollowing = userFollowers?.find(
      (follower) => follower.followerId === user?.id
    );
    if (isFollowing?.id) {
      setIsFollowing(isFollowing);
    }
  }, [user?.id, userFollowers]);

  const handleFollow = async () => {
    if (!user) return;
    if (isFollowing) {
      await UserDs.unfollow(isFollowing.id);
      setIsFollowing(false);
    } else {
      const res = await UserDs.follow(profile, user);
      setIsFollowing(res);
    }
  };
  return (
    <Layout>
      <div className={styles.root}>
        <div
          className={styles.top}
          style={{ backgroundImage: `url(/assets/profilebg.png)` }}
        >
          <button>
            Edit profile <AiTwotoneEdit size={15} />
          </button>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <div className={styles.leftTop}>
              <DefaultAvatar
                url={profile && profile.avatar}
                width="160px"
                height="160px"
                walletAddress={walletAddress!}
                fontSize="1.2em"
              />
              {/* <NextImage
                className={styles.image2}
                src={
                  profile.avatar
                    ? profile.avatar
                    : "/assets/placeholder-image.jpg"
                }
                width="160px"
                height="160px"
              /> */}
              <span className={styles.name}>
                {profile && profile.name && profile.name}
              </span>
              <div className={styles.wallet2}>
                <span>{walletAddress && walletAddress}</span>
                <NextImage
                  width="20px"
                  height="20px"
                  src="/assets/copyicon.svg"
                />
              </div>
              <span className={styles.desc}>
                {profile && profile.bio && profile.bio}
              </span>
              <span className={styles.web}>
                <TbWorld /> https://ui8.net
              </span>
            </div>
            <div className={styles.leftCenter}>
              <button className={styles.btn} onClick={handleFollow}>
                {isFollowing ? "unfollow" : "follow"}
              </button>
              <span className={styles.icon}>
                <IoShareOutline />
              </span>
              <span className={styles.icon}>
                <IoIosMore />
              </span>
            </div>
            <div className={styles.social}>
              <TbBrandTwitter size={25} color="#777E91" />
              <TbBrandInstagram size={25} color="#777E91" />
              <RiFacebookCircleLine size={25} color="#777E91" />
            </div>
            <hr />
            <span className={styles.date}>
              Member since {createdAt && getNiceDate(createdAt)}
            </span>
          </div>
          <div className={styles.right}>
            <div className={styles.nav}>
              <span
                onClick={() => setOpen(0)}
                className={`${styles.navItem} ${
                  open === 0 ? styles.active : ""
                }`}
              >
                Gallery
              </span>
              <span
                onClick={() => setOpen(1)}
                className={`${styles.navItem} ${
                  open === 1 ? styles.active : ""
                }`}
              >
                Collections
              </span>
              <span
                onClick={() => setOpen(2)}
                className={`${styles.navItem} ${
                  open === 2 ? styles.active : ""
                }`}
              >
                Favourites
              </span>
              <span
                onClick={() => setOpen(3)}
                className={`${styles.navItem} ${
                  open === 3 ? styles.active : ""
                }`}
              >
                Following
              </span>
            </div>
            <div className={styles.sections}>
              <ProfileItem
                items={items!}
                open={open}
                following={userFollowers}
                collections={collections}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id }: any = ctx.params;

  const profile = await ProfileDs.fetch(id);
  if (!profile) return { notFound: true };

  return {
    props: {
      profile,
    },
  };
};
export default ProfilePage;
