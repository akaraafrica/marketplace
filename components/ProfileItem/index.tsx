import React from "react";
import FollowingSec from "../FollowingSec";
import ItemCard from "../ItemCard";
import styles from "./index.module.scss";
import { IItem } from "../../types/item.interface";
import { ILike } from "../../types/like.interface";

interface ProfileItemProps {
  items: IItem[];
  open: number;
  following: any;
  followBy: any;
  collections: any;
  likes: ILike[] | undefined;
}
const Index = ({
  items,
  open,
  followBy,
  following,
  likes,
  collections,
}: ProfileItemProps) => {
  return (
    <div>
      {open === 0 ? (
        <div className={styles.root}>
          {items &&
            items.map((item, idx) => (
              <ItemCard
                key={idx}
                id={item.id}
                img={item.images[0]}
                name={item.title}
                price={item.price}
                ownerAvatar={item.images[0]}
                highestBid="0.001 ETH"
                owner={item.owner}
                item={item}
                isCollectionAdmin={true}
              />
            ))}
        </div>
      ) : open === 1 ? (
        <div className={styles.root}>
          {collections &&
            collections.map((item: any, idx: number) => (
              <ItemCard
                key={idx}
                id={item.id}
                img={item.images[0]}
                name={item.title}
                price={item.price}
                ownerAvatar={item.images[0]}
                highestBid=""
                collectionImages={item.images}
              />
            ))}
        </div>
      ) : open === 2 ? (
        <div className={styles.root}>
          {likes?.length &&
            likes.map(({ item }) => (
              <ItemCard
                key={item?.id}
                id={item!.id}
                img={item!.images[0]}
                name={item!.title}
                price={item!.price}
                ownerAvatar={item!.images[0]}
                highestBid=""
              />
            ))}
        </div>
      ) : open === 3 ? (
        <div className={styles.following}>
          {followBy &&
            followBy.map((person: any) => (
              <FollowingSec key={person.id} person={person} />
            ))}
        </div>
      ) : open === 4 ? (
        <div className={styles.following}>
          {following &&
            following.map((person: any) => (
              <FollowingSec key={person.id} person={person} />
            ))}
        </div>
      ) : (
        <div>Empty</div>
      )}
    </div>
  );
};

export default Index;
