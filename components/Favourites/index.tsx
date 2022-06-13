import React from "react";
import styles from "./index.module.scss";
import ProfileCard from "../ProfileCard/index";

function Favourites() {
  return (
    <div className={styles.Favourites}>
      <ProfileCard
        ProductImg={`/assets/productimg.png`}
        Name="Amazing digital art"
        Price="2.45 ETH"
        Stock="3 in stock"
        Avatar={`/assets/avatars.png`}
        HighestBid="0.001 ETH"
      />
      <ProfileCard
        ProductImg={`/assets/productimg.png`}
        Name="Amazing digital art"
        Price="2.45 ETH"
        Stock="3 in stock"
        Avatar={`/assets/avatars.png`}
        HighestBid="0.001 ETH"
      />
      <ProfileCard
        ProductImg={`/assets/productimg.png`}
        Name="Amazing digital art"
        Price="2.45 ETH"
        Stock="3 in stock"
        Avatar={`/assets/avatars.png`}
        HighestBid="0.001 ETH"
      />
      <ProfileCard
        ProductImg={`/assets/productimg.png`}
        Name="Amazing digital art"
        Price="2.45 ETH"
        Stock="3 in stock"
        Avatar={`/assets/avatars.png`}
        HighestBid="0.001 ETH"
      />
      <ProfileCard
        ProductImg={`/assets/productimg.png`}
        Name="Amazing digital art"
        Price="2.45 ETH"
        Stock="3 in stock"
        Avatar={`/assets/avatars.png`}
        HighestBid="0.001 ETH"
      />
      <ProfileCard
        ProductImg={`/assets/productimg.png`}
        Name="Amazing digital art"
        Price="2.45 ETH"
        Stock="3 in stock"
        Avatar={`/assets/avatars.png`}
        HighestBid="0.001 ETH"
      />
    </div>
  );
}
export default Favourites;
