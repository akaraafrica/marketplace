import React, { useCallback, useEffect, useState } from "react";
import SellersCard from "../SellersCard";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];
  const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
        backgroundColor: "#777E91",
        color: "white",
      },
    },
  };
  const handleLeftClick = useCallback(() => {
    if (!swiperRef) return;
    swiperRef.slidePrev();
  }, [swiperRef]);

  const handleRightClick = useCallback(() => {
    if (!swiperRef) return;
    swiperRef.slideNext();
  }, [swiperRef]);

  console.log(props.sellers.sellers);
  return (
    <div className={styles.root}>
      <div className={styles.popularHeader}>
        <div className={styles.popularCon}>
          <span className={styles.popularText}>Popular</span>
          <span className={styles.sellersText}>
            Sellers{" "}
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
        <div>
          {/* <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Name</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={[]}
              // onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
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
          {props.sellers.sellers
            ?.filter((seller: any) => seller._count.items > 0)
            .sort((a: any, b: any) =>
              a._count.items > b._count.items ? -1 : 1
            )
            .map((seller: any, idx: number) => (
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
