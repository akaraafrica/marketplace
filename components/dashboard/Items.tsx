/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useState, useEffect } from "react";
import styles from "./Items.module.scss";
import ItemCard from "./ItemCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import swiperClass from "swiper/types/swiper-class";
import { IItem } from "../../types/item.interface";
import { NoSsr } from "@mui/material";

interface properties {
  items: IItem[];
}

function Items({ items }: properties) {
  const [data, setData] = useState<IItem[]>();
  const [swiperRef, setSwiperRef] = useState<swiperClass>();

  useEffect(() => {
    if (items && items.length > 0) setData([...items]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLeftClick = useCallback(() => {
    if (!swiperRef) return;
    swiperRef.slidePrev();
  }, [swiperRef]);

  const handleRightClick = useCallback(() => {
    if (!swiperRef) return;
    swiperRef.slideNext();
  }, [swiperRef]);

  return (
    <NoSsr>
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.top}>
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
            {data && (
              <Swiper
                slidesPerView={1}
                spaceBetween={1}
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
            )}
          </div>
        </div>
      </div>
    </NoSsr>
  );
}
export default Items;
