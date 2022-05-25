import React, { useEffect } from "react";
import Plyr from "plyr-react";
import Poster from "/assets/01.png";
import "plyr-react/dist/plyr.css";
import "./styles.module.scss";
import BidCard from "../BidCard";

const LandingBidding = () => {
  const videoSrc = {
    type: "video",
    sources: [
      {
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
  };

  useEffect(() => {
    document.querySelector("#videoSec video").setAttribute("poster", Poster);
  }, [Poster]);

  return (
    <div id="videoSec">
      <Plyr
        source={videoSrc}
        options={{
          rewind: false,
        }}
      />
      <BidCard />
    </div>
  );
};

export default LandingBidding;
