/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance

import React from "react";
import styles from "./index.module.scss";
import HotItemCard from "../HotItemsCard";
import ProfileCard from "../ProfileCard";
import HotItemMobile from "../HotItemsMobile";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";

function HotItems() {
  SwiperCore.use([Pagination, Autoplay]);

  const settings = {
    arrows: false,
    arrowsBlock: false,
    shift: 10,
    slidesPerRow: 4,
    autoplay: true,
  };
  return (
    <div className={styles.hotitemscon}>
      <div className={styles.hotitemssec1parent}>
        <div className={styles.hotitemssec1con}>
          <h1>Hot Items</h1>
          <div className={styles.hotitemsbtn}>
            <button>
              <span>
                <img alt="leftarrow" src={`/assets/leftArrow.svg`} />
              </span>
            </button>
            <button>
              <span>
                <img alt="rightarrow" src={`/assets/rightArrow.svg`} />
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* <div className="hotitemssec2parent"> */}
      {/* <div className="hotitemssec2con"> */}
      <div className={styles.hotitemmobileparent}>
        <HotItemMobile />
      </div>
      <div className={styles.hotitemdesktopcon}>
        {/* <Slider { ...settings }> */}
        <Swiper style={{ zIndex: 0 }}>
          <SwiperSlide>
            <HotItemCard
              ProductImg={`/assets/productimg.png`}
              Name="Amazing digital art"
              Price="2.45 ETH"
              Stock="3 in stock"
              Avatar={`/assets/avatars.png`}
              HighestBid="0.001 ETH"
            />
          </SwiperSlide>
          <SwiperSlide>
            <HotItemCard
              ProductImg={`/assets/productimg.png`}
              Name="Amazing digital art"
              Price="2.45 ETH"
              Stock="3 in stock"
              Avatar={`/assets/avatars.png`}
              HighestBid="0.001 ETH"
            />
          </SwiperSlide>
          <SwiperSlide>
            <HotItemCard
              ProductImg={`/assets/productimg.png`}
              Name="Amazing digital art"
              Price="2.45 ETH"
              Stock="3 in stock"
              Avatar={`/assets/avatars.png`}
              HighestBid="0.001 ETH"
            />
          </SwiperSlide>
          <SwiperSlide>
            <HotItemCard
              ProductImg={`/assets/productimg.png`}
              Name="Amazing digital art"
              Price="2.45 ETH"
              Stock="3 in stock"
              Avatar={`/assets/avatars.png`}
              HighestBid="0.001 ETH"
            />
          </SwiperSlide>
          <SwiperSlide>
            <HotItemCard
              ProductImg={`/assets/productimg.png`}
              Name="Amazing digital art"
              Price="2.45 ETH"
              Stock="3 in stock"
              Avatar={`/assets/avatars.png`}
              HighestBid="0.001 ETH"
            />
          </SwiperSlide>
          <SwiperSlide>
            <HotItemCard
              ProductImg={`/assets/productimg.png`}
              Name="Amazing digital art"
              Price="2.45 ETH"
              Stock="3 in stock"
              Avatar={`/assets/avatars.png`}
              HighestBid="0.001 ETH"
            />
          </SwiperSlide>
          <SwiperSlide>
            <HotItemCard
              ProductImg={`/assets/productimg.png`}
              Name="Amazing digital art"
              Price="2.45 ETH"
              Stock="3 in stock"
              Avatar={`/assets/avatars.png`}
              HighestBid="0.001 ETH"
            />
          </SwiperSlide>
          <SwiperSlide>
            <HotItemCard
              ProductImg={`/assets/productimg.png`}
              Name="Amazing digital art"
              Price="2.45 ETH"
              Stock="3 in stock"
              Avatar={`/assets/avatars.png`}
              HighestBid="0.001 ETH"
            />
          </SwiperSlide>
          <SwiperSlide>
            <HotItemCard
              ProductImg={`/assets/productimg.png`}
              Name="Amazing digital art"
              Price="2.45 ETH"
              Stock="3 in stock"
              Avatar={`/assets/avatars.png`}
              HighestBid="0.001 ETH"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      {/* </div> */}
      {/* </div> */}
    </div>
  );
}
export default HotItems;
