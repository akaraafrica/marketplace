import React from "react";
import LandingMain from "../LandingMain";
import styles from "./index.module.scss";
import LandingBidding from "../LandingBidding";
import ListingMainCard from "../ListingMainCard";
import { ICollection } from "../../types/collection.interface";

interface properties {
  collection: ICollection;
}
const Index = ({ collection }: properties) => {
  return (
    <div className={styles.root}>
      <LandingMain />
      <LandingBidding collection={collection} />
      <div className={styles.bottom}>
        <ListingMainCard />
      </div>
    </div>
  );
};

export default Index;
