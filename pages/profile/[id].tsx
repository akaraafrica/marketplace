/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import React from "react";
import styles from "./index.module.scss";
import Header from "../../components/Header";
import Gallery from "../../components/Gallery/index";
import Collections from "../../components/Collections/index";
import Favourites from "../../components/Favourites/index";
import Following from "../../components/Following/index";
import Footer from "../../components/Footer/index";
import Layout from "../../components/Layout";
import NextImage from "../../utils/helpers/NextImage";
import { AiTwotoneEdit } from "react-icons/ai";
import { TbWorld, TbBrandTwitter, TbBrandInstagram } from "react-icons/tb";
import { IoShareOutline } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { RiFacebookCircleLine } from "react-icons/ri";

const ProfilePage = () => {
  const [open, setOpen] = React.useState(0);
  // document.body.style = "background: black;";
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
              <NextImage
                className={styles.image2}
                src="/assets/profileFoto.png"
                width="160px"
                height="160px"
              />
              <span className={styles.name}>Sarah Shaibu</span>
              <div className={styles.wallet2}>
                <span>0xc4c16ab5ac7d...b21a</span>
                <NextImage
                  width="20px"
                  height="20px"
                  src="/assets/copyicon.svg"
                />
              </div>
              <span className={styles.desc}>
                A wholesome farm owner in Abuja. Upcoming gallery solo show in
                Lagos
              </span>
              <span className={styles.web}>
                <TbWorld /> https://ui8.net
              </span>
            </div>
            <div className={styles.leftCenter}>
              <button className={styles.btn}>Follow</button>
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
            <span className={styles.date}>Member since Mar 15, 2021</span>
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
              {open === 0 && <Gallery />}
              {open === 1 && <Collections />}
              {open === 2 && <Favourites />}
              {open === 3 && <Following />}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
