import React, { useEffect, useRef } from "react";
import Plyr, { PlyrSource } from "plyr-react";
import styles from "./styles.module.scss";
import BidCard from "../BidCard";
import { ICollection } from "../../../types/collection.interface";

interface properties {
  collection: ICollection;
}
const LandingBidding = ({ collection }: properties) => {
  const videoSrc: PlyrSource = {
    type: "video",
    sources: [
      {
        src: collection?.videos[0] && collection.videos[0],
      },
    ],
  };

  let playerRef = useRef();
  useEffect(() => {
    // @ts-ignore
    document
      .querySelector("#videoSec video")
      .setAttribute("poster", `/assets/01.png`);
  }, []);

  return (
    <div id="videoSec" className={styles.videoSec}>
      <Plyr
        //  ref={playerRef}
        source={videoSrc}
        width={"100%"}
        height={"100%"}
        options={
          {
            //  rewind: false,
          }
        }
      />
      <BidCard collection={collection} />
    </div>
  );
};

export default LandingBidding;
