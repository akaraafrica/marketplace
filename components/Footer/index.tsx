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
            <div>
              <NextImage
                width="100px"
                height="30px"
                src="/assets/Logo.png"
                alt=""
              />
            </div>
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
            <Link href={`/contact`}>
              <p>Contact us</p>
            </Link>
          </div>
        </div>
        <div className={styles.footersec3}>
          <h4>Support</h4>
          <div className={styles.footersec3text}>
            <Link href={`/faq`}>
              <p>F.A.Q</p>
            </Link>
            <p>Terms of service</p>
            <p>Privacy policy</p>
          </div>
        </div>
        <div className={styles.footersec4}>
          <h4>Social Platforms</h4>
          <div className={styles.socialicons}>
            <a
              href={`https://www.instagram.com/akara4africa`}
              target={`_blank`}
            >
              <img alt="instagram icon" src="/assets/instagramicon.svg" />
            </a>
            <img alt="social icon" src={`/assets/socialicon.svg`} />
            <a href={`https://www.twitter.com/akara4africa`} target={`_blank`}>
              <img alt="twitter icon" src={`/assets/twittericon.svg`} />
            </a>
            <img alt="youtube icon" src={`/assets/youtubeicon.svg`} />
          </div>
          <div className={styles.footersec4btn}>
            <a href={`https://discord.com/invite/uVWugs7Pgy`} target={`_blank`}>
              <button>Join Our Discord Community</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
