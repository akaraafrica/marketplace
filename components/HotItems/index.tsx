/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance

import React, { useCallback, useState } from "react";
import styles from "./index.module.scss";
import ProfileCard from "../ProfileCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import swiperClass from "swiper/types/swiper-class";

function HotItems({ items }: any) {
  console.log(items);
  const [data, setData] = useState([...items]);

  const [swiperRef, setSwiperRef] = useState<swiperClass>();

  const handleLeftClick = useCallback(() => {
    if (!swiperRef) return;
    swiperRef.slidePrev();
  }, [swiperRef]);

  const handleRightClick = useCallback(() => {
    if (!swiperRef) return;
    swiperRef.slideNext();
  }, [swiperRef]);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.top}>
          <h1>Hot Bids</h1>
          <div className={styles.hotitemsbtn}>
            <button onClick={handleLeftClick}>
              <span>
                <img alt="leftarrow" src={`/assets/leftArrow.svg`} />
              </span>
            </button>
            <button onClick={handleRightClick}>
              <span>
                <img alt="rightarrow" src={`/assets/rightArrow.svg`} />
              </span>
            </button>
          </div>
        </div>
        <div className={styles.bottom}>
          <Swiper
            slidesPerView={1}
            spaceBetween={32}
            style={{ zIndex: 0 }}
            onSwiper={setSwiperRef}
            breakpoints={{
              // when window width is >= 640px
              640: {
                width: 640,
                slidesPerView: 2,
              },
              // when window width is >= 768px
              768: {
                width: 768,
                slidesPerView: 3,
              },
              1260: {
                width: 1260,
                slidesPerView: 4,
              },
            }}
            modules={[Navigation]}
            className={styles.swiper_container}
          >
            {data &&
              data
                .sort((a: any, b: any) =>
                  a.bids.length > b.bids.length ? -1 : 1
                )
                .map((item: any) => (
                  <SwiperSlide key={item.id}>
                    <ProfileCard
                      key={item.id}
                      ProductImg={`${item.images ?? item.images[0]}`}
                      Name={item.title}
                      Price={item.price}
                      Stock={item.stock}
                      Avatar={`${item.owner?.profile?.avatar}`}
                      HighestBid={item.highestbid}
                    />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>
    </div>
    // <div className={styles.hotitemscon}>
    //   <div className={styles.hotitemssec1parent}>
    //     <div className={styles.hotitemssec1con}>
    //       <h1>Hot Items</h1>
    //       <div className={styles.hotitemsbtn}>
    //         <button onClick={handleLeftClick}>
    //           <span>
    //             <img alt="leftarrow" src={`/assets/leftArrow.svg`} />
    //           </span>
    //         </button>
    //         <button onClick={handleRightClick}>
    //           <span>
    //             <img alt="rightarrow" src={`/assets/rightArrow.svg`} />
    //           </span>
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    //   {/* <div className={styles.hotitemmobileparent}>
    //     <HotItemMobile />
    //   </div> */}
    //   <div className={styles.hotitemdesktopcon}>
    //     <Swiper
    //       slidesPerView={4}
    //       spaceBetween={30}
    //       style={{ zIndex: 0 }}
    //       onSwiper={setSwiperRef}
    //       breakpoints={{
    //         // when window width is >= 640px
    //         640: {
    //           width: 640,
    //           slidesPerView: 1,
    //         },
    //         // when window width is >= 768px
    //         768: {
    //           width: 768,
    //           slidesPerView: 2,
    //         },
    //         1260: {
    //           width: 1260,
    //           slidesPerView: 3,
    //         },
    //       }}
    //       modules={[Navigation]}
    //       className={styles.swiper_container}
    //     >
    //       <SwiperSlide>
    //         <ProfileCard
    //           ProductImg={`/assets/productimg.png`}
    //           Name="Amazing art"
    //           Price="2.45 ETH"
    //           Stock="3 in stock"
    //           Avatar={`/assets/avatars.png`}
    //           HighestBid="0.001 ETH"
    //         />
    //       </SwiperSlide>
    //       <SwiperSlide>
    //         <ProfileCard
    //           ProductImg={`/assets/productimg.png`}
    //           Name="Amazing digital art"
    //           Price="2.45 ETH"
    //           Stock="3 in stock"
    //           Avatar={`/assets/avatars.png`}
    //           HighestBid="0.001 ETH"
    //         />
    //       </SwiperSlide>
    //       <SwiperSlide>
    //         <ProfileCard
    //           ProductImg={`/assets/productimg.png`}
    //           Name="Amazing digital art"
    //           Price="2.45 ETH"
    //           Stock="3 in stock"
    //           Avatar={`/assets/avatars.png`}
    //           HighestBid="0.001 ETH"
    //         />
    //       </SwiperSlide>
    //       <SwiperSlide>
    //         <ProfileCard
    //           ProductImg={`/assets/productimg.png`}
    //           Name="Amazing digital art"
    //           Price="2.45 ETH"
    //           Stock="3 in stock"
    //           Avatar={`/assets/avatars.png`}
    //           HighestBid="0.001 ETH"
    //         />
    //       </SwiperSlide>
    //       <SwiperSlide>
    //         <ProfileCard
    //           ProductImg={`/assets/productimg.png`}
    //           Name="Amazing digital art"
    //           Price="2.45 ETH"
    //           Stock="3 in stock"
    //           Avatar={`/assets/avatars.png`}
    //           HighestBid="0.001 ETH"
    //         />
    //       </SwiperSlide>
    //       <SwiperSlide>
    //         <ProfileCard
    //           ProductImg={`/assets/productimg.png`}
    //           Name="Amazing digital art"
    //           Price="2.45 ETH"
    //           Stock="3 in stock"
    //           Avatar={`/assets/avatars.png`}
    //           HighestBid="0.001 ETH"
    //         />
    //       </SwiperSlide>
    //       <SwiperSlide>
    //         <ProfileCard
    //           ProductImg={`/assets/productimg.png`}
    //           Name="Amazing digital art"
    //           Price="2.45 ETH"
    //           Stock="3 in stock"
    //           Avatar={`/assets/avatars.png`}
    //           HighestBid="0.001 ETH"
    //         />
    //       </SwiperSlide>
    //       <SwiperSlide>
    //         <ProfileCard
    //           ProductImg={`/assets/productimg.png`}
    //           Name="Amazing digital art"
    //           Price="2.45 ETH"
    //           Stock="3 in stock"
    //           Avatar={`/assets/avatars.png`}
    //           HighestBid="0.001 ETH"
    //         />
    //       </SwiperSlide>
    //       <SwiperSlide>
    //         <ProfileCard
    //           ProductImg={`/assets/productimg.png`}
    //           Name="Amazing digital art"
    //           Price="2.45 ETH"
    //           Stock="3 in stock"
    //           Avatar={`/assets/avatars.png`}
    //           HighestBid="0.001 ETH"
    //         />
    //       </SwiperSlide>
    //     </Swiper>
    //   </div>
    //   {/* </div> */}
    //   {/* </div> */}
    // </div>
  );
}
export default HotItems;
