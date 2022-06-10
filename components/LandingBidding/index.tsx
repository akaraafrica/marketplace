import React, { useEffect, useRef } from "react";
import Plyr, { PlyrSource } from "plyr-react";
import styles from "./styles.module.scss";
import BidCard from "../BidCard";

const LandingBidding = () => {
  const videoSrc: PlyrSource = {
    type: "video",
    sources: [
      {
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
  };

  let playerRef = useRef();
  useEffect(() => {
      // @ts-ignore
      document.querySelector("#videoSec video").setAttribute("poster", `/assets/01.png`);
  }, []);

  return (
    <div id="videoSec" className={styles.videoSec}>
      <Plyr
      //  ref={playerRef}
        source={videoSrc}
        width={500}
        height={500}
        options={{
        //  rewind: false,
        }}
      />
      <BidCard />
    </div>
  );
};

export default LandingBidding;
