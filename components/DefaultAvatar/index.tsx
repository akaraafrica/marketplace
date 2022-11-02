import React, { useEffect, useRef } from "react";
import NextImage from "../Image";
import styles from "./index.module.scss";
import Link from "next/link";

interface AvatarProps {
  url: string | undefined;
  width?: string;
  height?: string;
  walletAddress: string;
  fontSize?: string;
  length?: number;
  id?: number;
}
const Index: React.FC<AvatarProps> = ({
  url,
  id,
  walletAddress,
  width = "40px",
  height = "40px",
}) => {
  if (url === undefined || url === null || url === "") {
    return (
      <Link href={id ? `/profile/${id}` : "#"}>
        <a>
          <NextImage
            src={`https://avatars.dicebear.com/api/micah/${walletAddress}.svg`}
            width={width}
            height={height}
            style={{ borderRadius: "50%" }}
            className={styles.avatar}
          />
        </a>
      </Link>
    );
  } else {
    return (
      <Link href={id ? `/profile/${id}` : "#"}>
        <a>
          <NextImage
            src={url as string}
            width={width}
            height={height}
            style={{ borderRadius: "50%" }}
            className={styles.avatar}
          />
        </a>
      </Link>
    );
  }
};

export default Index;
