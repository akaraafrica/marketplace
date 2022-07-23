import React from "react";
// import Slider from 'infinite-react-carousel';
import HotCollectionCard from "../HotCollectionsCard/index";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";

function HotCollectionMobile() {
  SwiperCore.use([Pagination, Autoplay]);

  const settings = {
    arrows: false,
    arrowsBlock: false,
    shift: 10,
    slidesPerRow: 1,
    autoplay: true,
  };
  return (
    <div className="hotcollectionmobilecon">
      <Swiper style={{ zIndex: 0 }}>
        <SwiperSlide>
          <HotCollectionCard />
        </SwiperSlide>
        <SwiperSlide>
          <HotCollectionCard />
        </SwiperSlide>
        <SwiperSlide>
          <HotCollectionCard />
        </SwiperSlide>
        <SwiperSlide>
          <HotCollectionCard />
        </SwiperSlide>
        <SwiperSlide>
          <HotCollectionCard />
        </SwiperSlide>
        <SwiperSlide>
          <HotCollectionCard />
        </SwiperSlide>
        <SwiperSlide>
          <HotCollectionCard />
        </SwiperSlide>
        <SwiperSlide>
          <HotCollectionCard />
        </SwiperSlide>
        <SwiperSlide>
          <HotCollectionCard />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
export default HotCollectionMobile;
