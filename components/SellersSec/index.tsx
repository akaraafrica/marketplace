import React, { useCallback, useEffect, useState } from "react";
import SellersCard from "../SellersCard";
import styles from "./styles.module.scss";
// import Slider from "infinite-react-carousel";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import swiperClass from "swiper/types/swiper-class";
import NextImage from "../Image";

const SellersSec = (props: any) => {
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
      <div className={styles.popularHeader}>
        <div className={styles.popularCon}>
          <span className={styles.popularText}>Popular</span>
          <span className={styles.sellersText}>
            Sellers
            <div
              style={{
                width: "2vw",
                height: "2vw",
                marginLeft: "-1vw",
                color: "white",
              }}
            ></div>{" "}
          </span>
        </div>
      </div>
      <div className={styles.swiperWrapper}>
        <button className={styles.left} onClick={handleLeftClick}>
          <span>
            <NextImage
              width="40px"
              height="40px"
              alt="leftarrow"
              src={`/assets/leftArrow.svg`}
            />
          </span>
        </button>
        <Swiper
          slidesPerView={1}
          spaceBetween={32}
          style={{ zIndex: 0 }}
          onSwiper={setSwiperRef}
          breakpoints={{
            // when window width is >= 640px
            640: {
              width: 640,
              slidesPerView: 1,
            },
            // when window width is >= 768px
            768: {
              width: 768,
              slidesPerView: 3,
            },
            1260: {
              width: 1260,
              slidesPerView: 5,
            },
          }}
          modules={[Navigation]}
          className={styles.swiper_container}
        >
          {props.sellers.map((seller: any, idx: number) => (
            <SwiperSlide key={seller.id} className={styles.slide}>
              <SellersCard seller={seller} index={idx} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button className={styles.right} onClick={handleRightClick}>
          <span>
            <NextImage
              width="40px"
              height="40px"
              alt="rightarrow"
              src={`/assets/rightArrow.svg`}
            />
          </span>
        </button>
      </div>
    </div>
  );
};

export default SellersSec;
