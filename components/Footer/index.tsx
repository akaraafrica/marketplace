/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance

import Link from "next/link";
import React from "react";
import NextImage from "../Image";
import styles from "./index.module.scss";

function Footer() {
  return (
    <div className={styles.footercon}>
      <div className={styles.footer}>
        <div className={styles.footersec1}>
          <Link href={`/`}>
            <NextImage width={180} height={100} src="/assets/Logo.png" alt="" />
          </Link>
          <div className={styles.footersec1text}>
            <p>Copyright © 2020 Akara Marketplace</p>
            <p>All rights reserved</p>
          </div>
        </div>
        <div className={styles.footersec2}>
          <h4>Company</h4>
          <div className={styles.footersec2text}>
            <p>Open Sea</p>
            <p>Contact us</p>
          </div>
        </div>
        <div className={styles.footersec3}>
          <h4>Support</h4>
          <div className={styles.footersec3text}>
            <p>F.A.Q</p>
            <p>Terms of service</p>
            <p>Privacy policy</p>
          </div>
        </div>
        <div className={styles.footersec4}>
          <h4>Social Platforms</h4>
          <div className={styles.socialicons}>
            <img alt="instagram icon" src="/assets/instagramicon.svg" />
            <img alt="social icon" src={`/assets/socialicon.svg`} />
            <img alt="twitter icon" src={`/assets/twittericon.svg`} />
            <img alt="youtube icon" src={`/assets/youtubeicon.svg`} />
          </div>
          <div className={styles.footersec4btn}>
            <button>Join Our Slack Community</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
