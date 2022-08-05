import Image from "next/image";
import styles from "./QuickButtons.module.scss";
import {
  FacebookIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { useState } from "react";
export default function QuickButtons({ desktop }: any) {
  const [showSocial, setShowSocial] = useState(false);
  const handleShare = () => {
    setShowSocial(!showSocial);
  };
  return (
    <div className={desktop ? styles.horizontal : styles.main}>
      <div className={styles.close}>
        <Image
          alt="close"
          src="/assets/singleItem/close.svg"
          width={40}
          height={40}
        />
      </div>
      <div className={styles.share}>
        {showSocial && (
          <section>
            <FacebookIcon size={32} round />
            <TwitterIcon size={32} round />
            <WhatsappIcon size={32} round />
            <TelegramIcon size={32} round />
            <RedditIcon size={32} round />
          </section>
        )}

        <Image
          alt="share"
          src="/assets/singleItem/share.svg"
          width={40}
          onClick={handleShare}
          height={40}
        />
      </div>
      <div className={styles.love}>
        <Image
          alt="love"
          src="/assets/singleItem/love.svg"
          width={25}
          height={25}
        />
      </div>
      <div className={styles.option}>
        <Image
          src="/assets/singleItem/option.svg"
          width={38}
          alt="option"
          height={desktop ? 45 : 40}
        />
      </div>
    </div>
  );
}
