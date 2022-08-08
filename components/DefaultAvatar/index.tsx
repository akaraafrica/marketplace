import React, { useEffect, useRef } from "react";
import NextImage from "../Image";
import styles from "./index.module.scss";
import CircleType from "circletype";

interface AvatarProps {
  url: string;
  width: string;
  height: string;
  walletAddress: string;
  fontSize: string;
}
const Index: React.FC<AvatarProps> = ({
  url,
  walletAddress,
  width,
  height,
  fontSize,
}) => {
  const circleInstance = useRef();
  const colors = [
    "Aqua",
    "Red",
    "Green",
    "Yellow",
    "Blue",
    "Magenta",
    "BlueViolet",
    "MagentaViolet",
    "Chocolate",
    "Khaki",
    "Cyan",
    "White",
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  useEffect(() => {
    new CircleType(circleInstance.current).radius(parseInt(width) / 2);
  }, [width]);

  if (url === undefined || url === null || url === "") {
    const lastThree = walletAddress.length - 3;

    const walletFirstThree = walletAddress.slice(0, 3);

    const walletLastThree = walletAddress.slice(lastThree);

    return (
      <div
        style={{ width: width, height: height, backgroundColor: randomColor }}
        className={styles.default}
      >
        {/* @ts-ignore: Unreachable code error */}
        <div style={{ fontSize: fontSize }} ref={circleInstance}>
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
      className={styles.avatar}
    />
  );
};

export default Index;
