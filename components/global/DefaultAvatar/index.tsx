import React, { useEffect, useRef } from "react";
import NextImage from "../Image";
import styles from "./index.module.scss";
import Link from "next/link";
import { MdVerified } from "react-icons/md";

interface AvatarProps {
  url: string | undefined;
  width?: string;
  height?: string;
  walletAddress: string;
  fontSize?: string;
  length?: number;
  username?: string;
  verify?: boolean;
  showVerify?: boolean;
  iconSize?: number;
  iconRight?: string | number;
}
const Index: React.FC<AvatarProps> = ({
  url,
  username,
  walletAddress,
  width = "40px",
  height = "40px",
  showVerify,
  verify,
  iconSize = 20,
  iconRight = "15px",
}) => {
  if (url === undefined || url === null || url === "") {
    return (
      <Link href={username ? `/profile/${username}` : "#"}>
        <a>
          <div
            style={{
              // border: "2px solid #353945",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <NextImage
              src={`https://avatars.dicebear.com/api/micah/${walletAddress}.svg`}
              width={width}
              height={height}
              style={{ borderRadius: "50%" }}
              className={styles.avatar}
            />
            {showVerify && verify && (
              <div
                style={{
                  position: "absolute",
                  right: iconRight,
                  bottom: "5px",
                }}
              >
                <MdVerified size={iconSize} />
              </div>
            )}
          </div>
        </a>
      </Link>
    );
  } else {
    return (
      <Link href={username ? `/profile/${username}` : "#"}>
        <a
          style={{
            // border: "2px solid #353945",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <NextImage
            src={url as string}
            width={width}
            height={height}
            // style={{ borderRadius: "50%" }}
            className={styles.avatar}
          />
          {showVerify && verify && (
            <div
              style={{
                position: "absolute",
                right: iconRight,
                bottom: "5px",
              }}
            >
              <MdVerified size={iconSize} />
            </div>
          )}
        </a>
      </Link>
    );
  }
};

export default Index;
