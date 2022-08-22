import React, { useEffect, useRef } from "react";
import NextImage from "../Image";
import styles from "./index.module.scss";
import CircleType from "circletype";

interface AvatarProps {
  url: string | undefined;
  width: string;
  height: string;
  walletAddress: string;
  fontSize: string;
  length?: number;
}
const Index: React.FC<AvatarProps> = ({
  url,
  walletAddress,
  width,
  height,
  fontSize,
  length,
}) => {
  const circleInstance = useRef();
  const colors = [
    "Aqua",
    "Red",
    "Green",
    "Yellow",
    "Blue",
    "Khaki",
    "Cyan",
    "White",
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  if (url === undefined || url === null || url === "") {
    console.log("length in avatar ", length);
    const len = length && length > 0 ? length : 3;
    const lastThree = walletAddress.length - len;
    const walletFirstThree = walletAddress.slice(0, len);
    const walletLastThree = walletAddress.slice(lastThree);

    return (
      <div
        style={{ width: width, height: height, backgroundColor: randomColor }}
        className={styles.default}
      >
        <div
          style={{ fontSize: fontSize }}
          /* @ts-ignore: Unreachable code error */
          // ref={circleInstance}
        >
          {walletFirstThree + walletLastThree}
        </div>
      </div>
    );
  }
  return (
    <NextImage
      src={url}
      width={width}
      height={height}
      style={{ borderRadius: "50%" }}
      className={styles.avatar}
    />
  );
};

export default Index;
