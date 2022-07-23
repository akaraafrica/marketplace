import React from "react";
import FollowingSec from "../FollowingSec";
import ProfileCard from "../ProfileCard";
import styles from "./index.module.scss";

interface ProfileItemProps {
  items: any;
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
            items.map((item: any) => (
              <ProfileCard
                key={item.id}
                ProductImg={item.images[0]}
                Name={item.title}
                Price={item.price}
                Stock="3 in stock"
                Avatar={item.images[0]}
                HighestBid="0.001 ETH"
              />
            ))}
        </div>
      ) : open === 1 ? (
        <div className={styles.root}>
          {collections &&
            collections.map((item: any) => (
              <ProfileCard
                key={item.id}
                ProductImg={item.images[0]}
                Name={item.title}
                Price={item.price}
                Stock={`${item.images.length} in stock`}
                Avatar={item.images[0]}
                HighestBid="0.001 ETH"
                collections={item.images}
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
