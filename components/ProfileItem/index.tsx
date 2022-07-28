import React from "react";
import FollowingSec from "../FollowingSec";
import ItemCard from "../ItemCard";
import styles from "./index.module.scss";
import { IItem } from "../../types/item.interface";

interface ProfileItemProps {
  items: IItem[];
  open: number;
  following: any;
  collections: any;
}
const Index = ({ items, open, following, collections }: ProfileItemProps) => {
  console.log(items);
  return (
    <div>
      {open === 0 || open === 2 ? (
        <div className={styles.root}>
          {items &&
            items.map((item: any, idx) => (
              <ItemCard
                key={idx}
                id={item.id}
                img={item.images[0]}
                name={item.title}
                price={item.price}
                stock="3 in stock"
                ownerAvatar={item.images[0]}
                highestBid="0.001 ETH"
              />
            ))}
        </div>
      ) : open === 1 ? (
        <div className={styles.root}>
          {collections &&
            collections.map((item: any, idx:number) => (
              <ItemCard
                key={idx}
                id={item.id}
                img={item.images[0]}
                name={item.title}
                price={item.price}
                stock={`${item.images.length} in stock`}
                ownerAvatar={item.images[0]}
                highestBid="0.001 ETH"
                collectionImages={item.images}
              />
            ))}
        </div>
      ) : open === 3 ? (
        <div className={styles.following}>
          {following &&
            following.map((person: any) => (
              <FollowingSec
                key={person.id}
                ProfilePhoto={`/assets/profilephoto.png`}
                Name="Sally Fadel"
                Followers="161 followers"
                FollowerImage={`/assets/notificationImg.png`}
              />
            ))}
        </div>
      ) : (
        <div>Empty</div>
      )}
    </div>
  );
};

export default Index;
