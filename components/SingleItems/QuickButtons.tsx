import Image from "next/image";
import { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { LikeDs } from "../../ds";
import { ICollection } from "../../types/collection.interface";
import { IItem } from "../../types/item.interface";
import styles from "./QuickButtons.module.scss";
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
  const user = useUser()?.user;

  const like = user?.likes?.find((like) => like.itemId === item?.id);

  const [isLiked, setIsLiked] = useState(!!like);
  const handleLike = async () => {
    setIsLiked(!isLiked);
    let data = {
      likedId: like?.id,
      itemId: item?.id,
      userId: user!.id,
      collectionId: collection?.id,
    };

    try {
      await LikeDs.postData(data);
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
      <Image
        alt="share"
        src="/assets/singleItem/share.svg"
        width={40}
        height={40}
      />
      <div className={styles.love} onClick={handleLike}>
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill=""
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4.86817C10.8321 3.7474 9.24649 3.05859 7.5 3.05859C3.91015 3.05859 1 5.96874 1 9.55859C1 15.9269 7.97034 19.4436 10.8138 20.6133C11.5796 20.9283 12.4204 20.9283 13.1862 20.6133C16.0297 19.4436 23 15.9268 23 9.55859C23 5.96874 20.0899 3.05859 16.5 3.05859C14.7535 3.05859 13.1679 3.7474 12 4.86817Z"
            fill={isLiked ? "#EF466F" : "grey"}
          />
        </svg>
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
