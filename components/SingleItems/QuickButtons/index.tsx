import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { AuthContext } from "../../../contexts/AuthContext";
import { LikeDs } from "../../../ds";
import { ICollection } from "../../../types/collection.interface";
import { IItem } from "../../../types/item.interface";
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
import { toast } from "react-toastify";
import { AiFillHeart, AiOutlineSetting } from "react-icons/ai";
import Link from "next/link";
import { useSWRConfig } from "swr";
interface IQuickButtons {
  desktop?: boolean;
  item?: IItem;
  collection?: ICollection;
}
export default function QuickButtons({
  desktop,
  item,
  collection,
}: IQuickButtons) {
  const router = useRouter();
  const url = `${process.env.NEXT_PUBLIC_DOMAIN}${router.asPath}`;
  const [showSocial, setShowSocial] = useState(false);
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const handleShare = () => {
    setShowSocial(!showSocial);
  };

  const { user } = useContext(AuthContext);
  const like = item?.likes?.find((like) => like.userId === user?.id);

  const [isLiked, setIsLiked] = useState(!!like);

  useEffect(() => {
    if (like) {
      setIsLiked(true);
    }
  }, [like]);
  const handleLike = async () => {
    if (loading) return;
    if (!item) {
      return;
    }

    if (!user) {
      toast.error("please login first");
      return;
    }

    setIsLiked(!isLiked);

    try {
      setLoading(true);
      if (item) await LikeDs.postData(item, user);
      setLoading(false);
      mutate(["item", item.id]);
      console.log("success!");
    } catch (error) {
      console.log(error);
    }
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
            <FacebookShareButton
              url={url}
              quote={item?.title}
              hashtag="#Akara4Africa"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={url}
              title={item?.title}
              hashtags={["#Akara4Africa"]}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <WhatsappShareButton url={url} title={item?.title}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <TelegramShareButton url={url} title={item?.title}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
            <RedditShareButton url={url} title={item?.title}>
              <RedditIcon size={32} round />
            </RedditShareButton>
          </section>
        )}
        <Image
          alt="share"
          src="/assets/singleItem/share.svg"
          onClick={handleShare}
          width={40}
          height={40}
        />
      </div>
      {user && (
        <div className={styles.love} onClick={handleLike}>
          <AiFillHeart size={30} color={isLiked ? "#EF466F" : "grey"} />
        </div>
      )}
      {collection && user?.id === collection?.author.id && (
        <div className={styles.settings}>
          <Link href={`/collection/${collection.id}/admin`}>
            <AiOutlineSetting size={30} height={20} />
          </Link>
        </div>
      )}
    </div>
  );
}
