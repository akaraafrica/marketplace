/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import styles from "./index.module.scss";
import Layout from "../../components/global/Layout";
import NextImage from "next/image";
import { AiTwotoneEdit } from "react-icons/ai";
import { TbWorld, TbBrandTwitter, TbBrandInstagram } from "react-icons/tb";
import { IoShareOutline } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { RiFacebookCircleLine } from "react-icons/ri";
import { ProfileDs } from "../../ds";
import { GetServerSideProps } from "next";
import getNiceDate from "../../utils/helpers/dateFormatter";
import ProfileItem from "../../components/Profile/ProfileItem";
import { UserDs } from "../../ds";
import { AuthContext } from "../../contexts/AuthContext";
import { IProfile } from "../../types/profile.interface";
import { useRouter } from "next/router";
import NextLink from "../../components/global/Link";
import useSWR, { SWRConfig, unstable_serialize } from "swr";
import dynamic from "next/dynamic";
import SocialShareDialog from "../../components/Profile/SocialShareDialog";

const DefaultAvatar = dynamic(
  () => import("../../components/global/DefaultAvatar"),
  {
    ssr: false,
  }
);

const Index = () => {
  const [open, setOpen] = React.useState(0);
  const user = useContext(AuthContext).user;
  const router = useRouter();
  const username = router.query.username as unknown as string;

  const { data: profile, mutate } = useSWR<IProfile>("profile" + username, () =>
    ProfileDs.fetchProfile(username)
  );
  const [isFollowing, setIsFollowing] = useState<any>(false);
  const [share, setShare] = useState(false);

  useEffect(() => {
    setOpen(0);
    if (router.query.open) {
      setOpen(Number(router.query.open));
    }
  }, []);
  useEffect(() => {
    const isFollowing = followers?.find(
      (follower) => follower.followingId == user?.id
    );
    if (isFollowing?.followingId == user?.id) {
      setIsFollowing(isFollowing);
    }
  }, [profile?.followers, user]);

  if (!profile) {
    return <h1>404</h1>;
  }
  const {
    walletAddress,
    createdAt,
    items,
    followers,
    following,
    collections,
    verified,
  } = profile;

  const handleFollow = async () => {
    if (!user) {
      return router.push("/login");
    }
    if (isFollowing) {
      setIsFollowing(false);
      await UserDs.unfollow(isFollowing.id);
      mutate();
    } else {
      setIsFollowing(true);
      const res = await UserDs.follow(profile, user);
      mutate();
      setIsFollowing(res);
    }
  };
  // console.log(profile)
  return (
    <Layout>
      <div className={styles.root}>
        <div
          className={styles.top}
          style={{ backgroundImage: `url(/assets/profilebg.png)` }}
        >
          {user?.walletAddress === walletAddress && (
            <NextLink href={"/settings"}>
              <button>
                Edit profile <AiTwotoneEdit size={15} />
              </button>
            </NextLink>
          )}
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <div className={styles.leftTop}>
              {profile && (
                <DefaultAvatar
                  username={profile?.username}
                  url={profile?.profile?.avatar}
                  width="160px"
                  height="160px"
                  walletAddress={walletAddress!}
                  fontSize="1.2em"
                  verify={verified}
                  showVerify={true}
                  iconSize={30}
                  notActiveLink={true}
                />
              )}
              <span className={styles.name}>{profile?.profile?.name}</span>
              <div className={styles.wallet2}>
                <span>{walletAddress && walletAddress}</span>
                <NextImage
                  width="20px"
                  height="20px"
                  src="/assets/copyicon.svg"
                />
              </div>
              <span className={styles.desc}>{profile?.profile?.bio}</span>
              {profile?.profile?.website && (
                <span className={styles.web}>
                  <TbWorld /> profile?.profile?.website
                </span>
              )}
            </div>
            <div className={styles.leftCenter}>
              {user && user?.walletAddress != walletAddress && (
                <button className={styles.btn} onClick={handleFollow}>
                  {isFollowing ? "unfollow" : "follow"}
                </button>
              )}
              <span onClick={() => setShare(true)} className={styles.icon}>
                <IoShareOutline />
              </span>
              <span className={styles.icon}>
                <IoIosMore />
              </span>
            </div>
            <div className={styles.social}>
              {profile?.profile?.twitter && (
                <TbBrandTwitter size={25} color="#777E91" />
              )}
              {profile.profile?.instagram && (
                <TbBrandInstagram size={25} color="#777E91" />
              )}
              {profile.profile?.facebook && (
                <RiFacebookCircleLine size={25} color="#777E91" />
              )}
            </div>
            <hr />
            <span className={styles.date}>
              Member since {createdAt && getNiceDate(createdAt)}
            </span>
          </div>
          <div className={styles.right}>
            <div className={styles.nav}>
              <div>
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
                  Followers
                </span>
                <span
                  onClick={() => setOpen(4)}
                  className={`${styles.navItem} ${
                    open === 4 ? styles.active : ""
                  }`}
                >
                  Following
                </span>
              </div>
            </div>
            <div className={styles.sections}>
              <ProfileItem
                items={items!}
                open={open}
                followers={followers}
                following={following}
                likes={profile.likes}
                collections={collections}
              />
            </div>
          </div>
        </div>
      </div>
      <SocialShareDialog
        open={share}
        handleClose={() => setShare(false)}
        name={profile?.profile?.name}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { username }: any = ctx.params;
  const profile = await ProfileDs.fetchProfile(username);
  if (!profile) return { notFound: true };

  return {
    props: {
      fallback: {
        [unstable_serialize("profile" + username)]: profile,
      },
    },
  };
};
function Page({ fallback }: any) {
  return (
    <SWRConfig value={{ fallback }}>
      <Index />
    </SWRConfig>
  );
}

export default Page;
