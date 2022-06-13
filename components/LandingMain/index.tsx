import React from "react";
import styles from "./styles.module.scss";

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
    </div>
  );
};

export default LandingMain;
