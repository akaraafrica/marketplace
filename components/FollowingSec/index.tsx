/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import React from "react";
import { getUserName } from "../../utils/helpers/getUserName";
import styles from "./index.module.scss";
import DefaultAvatar from "../global/DefaultAvatar";
import Link from "next/link";

function FollowingSec({ person }: any) {
  return (
    <div className={styles.followingsec}>
      <div className={styles.followingsec1con}>
        <DefaultAvatar
          id={person?.id}
          url={person?.profile?.avatar}
          width="100px"
          height="100px"
          walletAddress={person?.walletAddress!}
          fontSize="1.2em"
        />
        <div className={styles.followingsec1content}>
          <h4>{getUserName(person)}</h4>
          <p>
            {person?.followers?.length} <span> followers</span>
          </p>
        </div>
      </div>
      <div className={styles.followingsec2con}>
        {person?.items?.slice(0, 4)?.map((item: any) => (
          <Link href={`/item/${item.id}`} key={item.id}>
            <a>
              <img key={item.id} alt="follower image" src={item.images[0]} />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default FollowingSec;
