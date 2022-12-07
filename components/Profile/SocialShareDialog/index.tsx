import React from "react";
import Dialog from "../../global/Dialog/Dialog";
import styles from "./index.module.scss";
import {
  FacebookIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
  FacebookShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { useRouter } from "next/router";

const Index = ({ open, handleClose, name }: any) => {
  const router = useRouter();
  const url = `${window.location.origin || process.env.NEXT_PUBLIC_DOMAIN}${
    router.asPath
  }`;
  return (
    <Dialog open={open} handleClose={handleClose}>
      <main className={styles.main}>
        <h3>Share to social media</h3>
        <div className={styles.social}>
          <FacebookShareButton
            url={url}
            quote={`Check out this awesome profile of ${name} on the Akara NFT marketplace`}
            hashtag="#Akara4Africa"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton
            url={url}
            title={`Check out this awesome profile of ${name} on the Akara NFT marketplace`}
            hashtags={["Akara4Africa"]}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <WhatsappShareButton
            url={url}
            title={`Check out this awesome profile of ${name} on the Akara NFT marketplace`}
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <TelegramShareButton
            url={url}
            title={`Check out this awesome profile of ${name} on the Akara NFT marketplace`}
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>
          <RedditShareButton
            url={url}
            title={`Check out this awesome profile of ${name} on the Akara NFT marketplace`}
          >
            <RedditIcon size={32} round />
          </RedditShareButton>
        </div>
      </main>
    </Dialog>
  );
};

export default Index;
