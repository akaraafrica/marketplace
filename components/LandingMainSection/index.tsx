import React from "react";
import LandingMain from "../LandingMain";
import styles from "./index.module.scss";
import LandingBidding from "../LandingBidding";
import ListingMainCard from "../ListingMainCard";

const Index = () => {
  return (
    <div className={styles.root}>
      <LandingMain />
      <LandingBidding />
      <div className={styles.bottom}>
        <ListingMainCard />
      </div>
    </div>
  );
};

export default Index;
