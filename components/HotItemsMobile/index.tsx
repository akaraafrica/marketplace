import React from 'react'
import Slider from 'infinite-react-carousel';
import HotItemCard from "../HotItemsCard";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";

SwiperCore.use([Pagination, Autoplay]);

function HotItemsMobile () {
    const settings =  {
        arrows: false,
        arrowsBlock: false,
        shift: 10,
        slidesPerRow: 1,
        autoplay: true
      };
    return(
        <div className="hotitemsmobilecon">
          <Swiper
          >
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
    );
}
export default HotItemsMobile