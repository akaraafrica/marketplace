import React from "react";
import styles from "./index.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import HotCollectionCard from "../HotCollectionsCard";

const Index = (props: any) => {
  return (
    <div className={styles.root}>
      <h2>Hot collections</h2>
      <Swiper
        breakpoints={{
          // when window width is >= 640px
          640: {
            width: 640,
            slidesPerView: 1,
          },
          // when window width is >= 768px
          768: {
            width: 768,
            slidesPerView: 2,
          },
          1260: {
            width: 1260,
            slidesPerView: 3,
          },
        }}
        spaceBetween={30}
        modules={[Navigation]}
        className={styles.swiper_container}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {props.collection.map((item: any) => (
          <SwiperSlide key={item.id}>
            <HotCollectionCard data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Index;
