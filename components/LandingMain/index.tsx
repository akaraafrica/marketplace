import React from "react";
import styles from "./styles.module.scss";
import Lottie from "react-lottie-player";
import lottieJson from "../../lotties/json-background.json";

const LandingMain = () => {
  return (
    <div className={styles.landingMain}>
      <span className={styles.subHead}>
        Create, explore, & collect AFRICAN NFTs.
      </span>
      <span className={styles.headOne}>Buy and Own</span>
      <span className={styles.headTwo}>
        <span className={styles.headColor}>Awesome </span>
        African NFTs
      </span>
      <button className={styles.landingBtn}>Start your search</button>
      <div className={styles.lottieBg}>
        <Lottie
          loop
          animationData={lottieJson}
          play
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: -1,
            left: 0,
            right: 0,
          }}
        />
      </div>
    </div>
  );
};

export default LandingMain;
