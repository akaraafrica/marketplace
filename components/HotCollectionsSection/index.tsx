import React from "react";
import styles from "./index.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import HotCollectionCard from "../HotCollectionsCard";
import { ICollection } from "../../types/collection.interface";

interface properties {
  collections: ICollection[];
}
const Index = ({ collections }: properties) => {
  return (
    <div className={styles.root}>
      <h2>Hot collections</h2>
      <Swiper
        style={{ zIndex: 0 }}
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
        {collections &&
          collections.map((c: ICollection, idx) => (
            <SwiperSlide key={idx}>
              <HotCollectionCard collection={c} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Index;
