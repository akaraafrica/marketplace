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
  fontSize = " 0.7em",
  length = 2,
}) => {
  // console.log(url)
  if (url === undefined || url === null || url === "") {
    // const len = length && length > 0 ? length : 3;
    // const lastThree = walletAddress?.length - len;
    // const walletFirstThree = walletAddress.slice(0, len);
    // const walletLastThree = walletAddress.slice(lastThree);

    return (
      // <div
      //   style={{ width: width, height: height, backgroundColor: "Khaki" }}
      //   className={styles.default}
      // >
      //   <Link href={id ? `/profile/${id}` : "#"}>
      //     <a>
      //       <div
      //         style={{ fontSize: fontSize }}
      //         /* @ts-ignore: Unreachable code error */
      //       >
      //         {walletFirstThree + walletLastThree}
      //       </div>
      //     </a>
      //   </Link>
      // </div>
      <Link href={id ? `/profile/${id}` : "#"}>
        <NextImage
          src={`https://avatars.dicebear.com/api/micah/${walletAddress}.svg`}
          width={width}
          height={height}
          style={{ borderRadius: "50%" }}
          className={styles.avatar}
        />
      </Link>
    );
  } else {
    return (
      <Link href={id ? `/profile/${id}` : "#"}>
        <NextImage
          src={url as string}
          width={width}
          height={height}
          style={{ borderRadius: "50%" }}
          className={styles.avatar}
        />
      </Link>
    );
  }
};

export default Index;
