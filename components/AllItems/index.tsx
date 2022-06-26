import React from "react";
import styles from "./index.module.scss";
import ProfileCard from "../ProfileCard/index";

function AllItems() {
  return (
    <div className={styles.allitems}>
      <ProfileCard
        ProductImg={`/assets/productimg1.png`}
        Name="Amazing digital art"
        Price="2.45 ETH"
        Stock="3 in stock"
        Avatar={`/assets/auctionAvatar.png`}
        HighestBid="0.001 ETH"
      />
      <ProfileCard
        ProductImg={`/assets/productimg2.png`}
        Name="Amazing digital art"
        Price="2.45 ETH"
        Stock="3 in stock"
        Avatar={`/assets/auctionAvatar.png`}
        HighestBid="0.001 ETH"
      />
      <ProfileCard
        ProductImg={`/assets/productimg3.png`}
        Name="Amazing digital art"
        Price="2.45 ETH"
        Stock="3 in stock"
        Avatar={`/assets/auctionAvatar.png`}
        HighestBid="0.001 ETH"
      />
      <ProfileCard
        ProductImg={`/assets/productimg4.png`}
        Name="Amazing digital art"
        Price="2.45 ETH"
        Stock="3 in stock"
        Avatar={`/assets/auctionAvatar.png`}
        HighestBid="0.001 ETH"
      />
      <ProfileCard
        ProductImg={`/assets/productimg5.png`}
        Name="Amazing digital art"
        Price="2.45 ETH"
        Stock="3 in stock"
        Avatar={`/assets/auctionAvatar.png`}
        HighestBid="0.001 ETH"
      />
      <ProfileCard
        ProductImg={`/assets/productimg6.png`}
        Name="Amazing digital art"
        Price="2.45 ETH"
        Stock="3 in stock"
        Avatar={`/assets/auctionAvatar.png`}
        HighestBid="0.001 ETH"
      />
      <ProfileCard
        ProductImg={`/assets/productimg7.png`}
        Name="Amazing digital art"
        Price="2.45 ETH"
        Stock="3 in stock"
        Avatar={`/assets/auctionAvatar.png`}
        HighestBid="0.001 ETH"
      />
      <ProfileCard
        ProductImg={`/assets/productimg8.png`}
        Name="Amazing digital art"
        Price="2.45 ETH"
        Stock="3 in stock"
        Avatar={`/assets/auctionAvatar.png`}
        HighestBid="0.001 ETH"
      />
    </div>
  );
}
export default AllItems;
