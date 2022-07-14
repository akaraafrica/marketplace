/* eslint-disable @next/next/no-img-element */
import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../lotties/json-background.json";
import SellersSec from "../components/SellersSec";
import styles from "./index.module.scss";
import Hotitems from "../components/HotItems";
import Discover from "../components/DiscoverSection/index";
import HotCollectionCard from "../components/HotCollectionsCard/index";
import SubscribeModal from "../components/SubscribeModal/index";
import HowItWorks from "../components/HowItWorks/index";
import HotCollectionMobile from "../components/HotCollectionMobile/index";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import Discovery, { Filter } from "../ds/discovery.ds";
import LandingMainSection from "../components/LandingMainSection";
import Layout from "../components/Layout";

const Home = (props: any) => {
  SwiperCore.use([Pagination, Autoplay]);
  console.log(props);

  const settings = {
    arrows: false,
    arrowsBlock: false,
    shift: 10,
    slidesPerRow: 3,
    autoplay: true,
  };

  return (
    <Layout>
      {/* <Header /> */}
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
      </div>
      <LandingMainSection />
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
      <Discover items={props.data} />
      <div className={styles.discoverdividercon}></div>
      <SubscribeModal />
      <HowItWorks />
      {/* <Footer /> */}
    </Layout>
  );
};

export async function getServerSideProps() {
  let data = await Discovery.getData(Filter.All);

  return {
    props: {
      data,
    },
  };
}

export default Home;
