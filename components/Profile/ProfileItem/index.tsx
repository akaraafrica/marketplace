import React, { useContext } from "react";
import FollowingSec from "../FollowingSec";
import ItemCard from "../../global/ItemCard";
import styles from "./index.module.scss";
import { IItem } from "../../../types/item.interface";
import { ILike } from "../../../types/like.interface";
import HotCollectionCard from "../../Collections/HotCollectionsCard";
import { ICollection } from "../../../types/collection.interface";
import Link from "next/link";
import { AuthContext } from "../../../contexts/AuthContext";

interface ProfileItemProps {
  items: IItem[];
  open: number;
  following: any;
  followers: any;
  collections: ICollection[] | undefined;
  likes: ILike[] | undefined;
}
const Index = ({
  items,
  open,
  followers,
  following,
  likes,
  collections,
}: ProfileItemProps) => {
  const { user } = useContext(AuthContext);

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
        <div>
          {user && (
            <div>
              <Link href={`/collection/create`}>
                <a>
                  <button className={styles.btn}>Create Collection</button>
                </a>
              </Link>
            </div>
          )}
          <div className={styles.collections}>
            {collections &&
              collections.map((collection) => (
                <div key={collection.id}>
                  <HotCollectionCard collection={collection} />
                </div>
              ))}
          </div>
        </div>
      ) : open === 2 ? (
        <div className={styles.root}>
          {likes &&
            likes.map(
              ({ item }) =>
                item && (
                  <ItemCard
                    key={item?.id}
                    id={item.id}
                    img={item!.images[0]}
                    name={item!.title}
                    price={item!.price}
                    ownerAvatar={item!.images[0]}
                    highestBid=""
                  />
                )
            )}
        </div>
      ) : open === 3 ? (
        <div className={styles.following}>
          {followers &&
            followers.map(
              (person: any) =>
                person && (
                  <FollowingSec key={person.id} person={person?.following} />
                )
            )}
        </div>
      ) : open === 4 ? (
        <div className={styles.following}>
          {following &&
            following.map(
              (person: any) =>
                person && (
                  <FollowingSec key={person.id} person={person?.followers} />
                )
            )}
        </div>
      ) : (
        <div>Empty</div>
      )}
    </div>
  );
};

export default Index;
