/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useState } from "react";
import styles from "./index.module.scss";
import ItemCard from "../ItemCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import swiperClass from "swiper/types/swiper-class";
import { IItem } from "../../types/item.interface";

interface properties {
  items: IItem[];
}

function HotItems({ items }: properties) {
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
                .map((item: any, idx) => (
                  <SwiperSlide key={idx}>
                    <ItemCard
                      key={idx}
                      id={item.id}
                      img={`${item.images ?? item.images[0]}`}
                      name={item.title}
                      price={item.price}
                      stock={item.stock}
                      ownerAvatar={`${item.owner?.profile?.avatar}`}
                      highestBid={item.highestbid}
                    />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
export default HotItems;
