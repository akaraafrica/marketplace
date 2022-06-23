/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../lotties/json-background.json";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LandingBidding from "../components/LandingBidding";
import LandingMain from "../components/LandingMain";
import SellersSec from "../components/SellersSec";
import styles from "./landing/styles.module.scss";
import ListingMainCard from "../components/ListingMainCard/index";
import UpdateFromCreators from "../components/UpdateFromCreators/index";
import Hotitems from "../components/HotItems";
import Discover from "../components/DiscoverSec/index";
import HotCollectionCard from "../components/HotCollectionsCard/index";
import SubscribeModal from "../components/SubscribeModal/index";
import HowItWorks from "../components/HowItWorks/index";
import HotCollectionMobile from "../components/HotCollectionMobile/index";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import ListingSubCardDynamic from "../components/ListingSubCard/ListingSubCardDynamic";
import UpdateFromCreatorsShow from "../components/UpdateFromCreators/UpdateFromCreatorsShow";
import { Box, Typography } from "@mui/material";

const Home = () => {
  SwiperCore.use([Pagination, Autoplay]);

  const settings = {
    arrows: false,
    arrowsBlock: false,
    shift: 10,
    slidesPerRow: 3,
    autoplay: true,
  };

  return (
    <>
      <Header />
      <div className={styles.styles}>
        <div className={styles.lottieBg}>
          <Lottie
            loop
            animationData={lottieJson}
            play
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              left: 0,
              right: 0,
            }}
          />
        </div>
        <LandingMain />
      </div>
      <LandingBidding />
      <div className={styles.listingcardparent}>
        <Box sx={{ borderRadius: "5px" }}>
          <ListingMainCard />
        </Box>

        <div className={styles.listingsubcardparent}>
          <ListingSubCardDynamic />
          {/* <ListingSubCard /> */}
          {/* <ListingSubCard />
          <ListingSubCard /> */}
        </div>

        <div className={styles.updatefromcreatorheading}>
          <p className={styles.updatefromcreatorheading}>
            Latest upload from creators 🔥
          </p>
          <UpdateFromCreatorsShow />
          {/* <UpdateFromCreators />
          <UpdateFromCreators />
          <UpdateFromCreators /> */}
          <div className={styles.discovermore}>
            <button>
              Discover more
              <span>
                <img alt="right arrow" src={`/assets/rightArrow.svg`} />
              </span>
            </button>
          </div>
        </div>
      </div>
      <SellersSec />
      <Hotitems />
      <div className={styles.hotcollectioncardparent}>
        <h2>Hot collections</h2>
        <div className={styles.hotcollectionmobilecon}>
          <HotCollectionMobile />
        </div>
        <div className={styles.hotcollectioncardwrapper}>
          <Swiper
            spaceBetween={30}
            width={200}
            // breakpoints={{
            //   200: { slidesPerView: 1.5 },
            //   700: { slidesPerView: 2.5 },
            //   1200: { slidesPerView: 1.5 },
            //   2500: { slidesPerView: 1.5 },
            // }}
            loop
            className={`swiper-wrapper ${styles.slideWrapper}`}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
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
          </Swiper>
        </div>
      </div>
      <Discover />
      <div className={styles.discoverdividercon}></div>
      <SubscribeModal />
      <HowItWorks />
      <Footer />
    </>
  );
};

export default Home;
