/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NextImage from "../../global/Image";
import { ItemDs } from "../../../ds";
import userDs from "../../../ds/user.ds";
import { IItem } from "../../../types/item.interface";
import { IUser } from "../../../types/user.interface";
import { getUserName } from "../../../utils/helpers/getUserName";
import styles from "./index.module.scss";
const DefaultAvatar = dynamic(() => import("../../global/DefaultAvatar"), {
  ssr: false,
});

function ListingMainCard() {
  const [items, setItem] = useState<IItem[] | null>(null);
  const [users, setUsers] = useState<IUser[] | null>(null);

  const [lastestItems, setLastestItem] = useState<IItem[] | null>(null);
  useEffect(() => {
    (async () => {
      let data: IItem[] = await ItemDs.getData();

      data = data?.sort((a, b) => a?.price - b?.price);
      setItem(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let data: IUser[] = await userDs.fetchlatestUsers();
      setUsers(data);
    })();
  }, []);
  return (
    <div className={styles.root}>
      <div className={styles.left}>
        {items &&
          items.slice(0, 1).map((item) => {
            return (
              <div key={item.id} className={styles.left}>
                {item?.images[0] && (
                  <Link href={`item/${item.id}`}>
                    <a>
                      <NextImage
                        src={item.images[0]}
                        width="800px"
                        height="600px"
                        className={styles.image}
                        alt="product"
                      />
                    </a>
                  </Link>
                )}

                <div className={styles.leftBottom}>
                  <div className={styles.avatarName}>
                    {item?.owner.profile?.avatar && (
                      <NextImage
                        className={styles.avatar}
                        src={item?.owner.profile?.avatar}
                        width="48px"
                        height="48px"
                        alt="avatar"
                      />
                    )}
                    <div className={styles.name}>
                      <Link href={`item/${item.id}`}>
                        <span className={styles.title}>{item.title}</span>
                      </Link>
                    </div>
                  </div>
                  <div className={styles.high}>
                    <span className={styles.highEth}>{item.price} ETH</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className={styles.center}>
        {items &&
          items.slice(1, 4).map((item) => {
            return (
              <Link href={`item/${item.id}`} key={item.id}>
                <a>
                  <div className={styles.cards} key={item.id}>
                    {item?.images[0] && (
                      <NextImage
                        className={styles.cardImg}
                        src={item.images[0]}
                        width="160px"
                        height="148px"
                        alt="product"
                      />
                    )}

                    <div className={styles.cardDetails}>
                      <Link href={`item/${item.id}`}>
                        <span className={styles.cardName}>{item?.title}</span>
                      </Link>
                      <div className={styles.centerDiv}>
                        {item?.owner.profile?.avatar && (
                          <Link href={`item/${item.id}`}>
                            <NextImage
                              className={styles.centerDivImg}
                              src={item?.owner.profile?.avatar}
                              width="24px"
                              height="24px"
                              alt="avatar"
                            />
                          </Link>
                        )}
                        <span>{item?.price} ETH</span>
                      </div>
                      {/* <Link href={`item/${item.id}`}>
                    <button>Buy</button>
                  </Link> */}
                    </div>
                  </div>
                </a>
              </Link>
            );
          })}
      </div>
      <div className={styles.right}>
        <hr />
        <div className={styles.rightContainer}>
          <h5>Latest creators 🔥</h5>
          {users &&
            users.slice(0, 5).map((user) => {
              return (
                <Link href={`/profile/${user.id}`} key={user.id}>
                  <a key={user.id}>
                    <div key={user.id} className={styles.creator}>
                      <div className={styles.creatorImgDiv}>
                        <DefaultAvatar
                          username={user.username}
                          url={user.profile?.avatar}
                          walletAddress={user.walletAddress}
                          width="60px"
                          height="60px"
                          verify={user.verified}
                          showVerify={true}
                          iconRight="-10px"
                        />
                      </div>
                      <div className={styles.creatorNameDiv}>
                        <span className={styles.name}>{getUserName(user)}</span>
                      </div>
                    </div>
                  </a>
                </Link>
              );
            })}

          <Link href="/marketplace">
            <div className={styles.btn}>Discover more </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default ListingMainCard;
