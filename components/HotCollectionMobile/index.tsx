import React from 'react'
// import Slider from 'infinite-react-carousel';
import HotCollectionCard from '../HotCollectionsCard/index';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";

SwiperCore.use([Pagination, Autoplay]);

function HotCollectionMobile () {
    const settings =  {
        arrows: false,
        arrowsBlock: false,
        shift: 10,
        slidesPerRow: 1,
        autoplay: true
      };
    return(
        <div className="hotcollectionmobilecon">
          <Swiper 
          >
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
export default HotCollectionMobile