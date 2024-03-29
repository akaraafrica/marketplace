/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import React, { useState } from "react";
import styles from "./index.module.scss";
import { AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai";
import { TiSocialFacebook } from "react-icons/ti";
import Link from "../Link";

const OnboardingSideBar = () => {
  // const [swipe, setSwipe] = useState(false);

  return (
    <div className={styles.sideBar}>
      <Link href={`/`}>
        <img className={styles.image} src={`/assets/Logo.png`} alt="logo" />
      </Link>
      <div className={styles.leftCenter}>
        <h6>
          Buy and Own{" "}
          <span>
            <span className={styles.emphasis}>Awesome</span> African NFTs
          </span>
        </h6>
        <p>
          Welcome to Akara marketplace, you can buy and sell awesome artwork to
          enjoy cool feature form us.
        </p>
      </div>
      <div className={styles.leftBottom}>
        <h5 className={styles.title}>AKARA is all about</h5>
        <ul>
          <li className={styles.listItem}>
            <span>Cool African NFTS</span>
          </li>
          <li className={styles.listItem}>
            <span>Meeting New People</span>
          </li>
          <li className={styles.listItem}>
            <span>Simple Exchanges</span>
          </li>
          <li className={styles.listItem}>
            <span>Building interesting communities</span>
          </li>
        </ul>
      </div>
      <div className={styles.icons}>
        <Link href={"https://twitter.com/akara4africa"}>
          <a target="_blank">
            <AiOutlineTwitter color="#F78F21" />
          </a>
        </Link>
        <Link href={"https://www.facebook.com/akara4africa"}>
          <a target="_blank">
            <TiSocialFacebook color="#ffffff" />
          </a>
        </Link>
        <Link href={"https://www.instagram.com/akara4africa"}>
          <a target="_blank">
            <AiOutlineInstagram color="#ffffff" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default OnboardingSideBar;
