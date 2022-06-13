/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance

import React from "react";
import styles from "./index.module.scss";

function HowitWorks() {
  return (
    <div className={styles.howitworkscon}>
      <h1 className={styles.howitworksheading}>How it works</h1>
      <div className={styles.howitworksseccontent}>
        <div className={styles.howitworksseccontentsec1}>
          <img alt="how ti works image" src={`/assets/howitworksimg.png`} />
        </div>
        <div className={styles.howitworksseccontentsec2con}>
          <div className={styles.howitworkseccontentsec2}>
            <h1>Set up your wallet</h1>
            <p>Once you’ve set up your wallet of choice.</p>
          </div>
          <div className={styles.howitworkseccontentsec2}>
            <h1>Make your collection</h1>
            <p>
              Add social links, a description, profile & banner images adn name
              of your collection.
            </p>
          </div>
          <div className={styles.howitworkseccontentsec2}>
            <h1>Add your NFTs </h1>
            <p>
              Upload your artwork (image, 3D, videos) and customize with NFTs
              wit properties.
            </p>
          </div>
          <div className={styles.howitworkseccontentsec2}>
            <h1>List for sale</h1>
            <p>
              Choose between auctions, fixed-price listings, and declining-price
              listings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HowitWorks;
