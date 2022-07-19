/* eslint-disable @next/next/no-img-element */
import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../lotties/json-background.json";
import SellersSec from "../components/SellersSec";
import styles from "./index.module.scss";
import Hotitems from "../components/HotItems";
import Discover from "../components/DiscoverSection/index";
import SubscribeModal from "../components/SubscribeModal/index";
import HowItWorks from "../components/HowItWorks/index";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Filter } from "../ds/discovery.ds";
import LandingMainSection from "../components/LandingMainSection";
import Layout from "../components/Layout";
import HotCollectionsSection from "../components/HotCollectionsSection";
import { CollectionDs, DiscoveryDs } from "../ds/index";

const Home = (props: any) => {
  SwiperCore.use([Pagination, Autoplay]);
  console.log(props);

  // const settings = {
  //   arrows: false,
  //   arrowsBlock: false,
  //   shift: 10,
  //   slidesPerRow: 3,
  //   autoplay: true,
  // };

  return (
    <Layout>
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
      <HotCollectionsSection collection={props.collection} />
      <Discover items={props.data} />
      <div className={styles.discoverdividercon}></div>
      <SubscribeModal />
      <HowItWorks />
    </Layout>
  );
};

export async function getServerSideProps() {
  let [discovery, collection] = await Promise.all([
    DiscoveryDs.getData(Filter.All),
    CollectionDs.getData(),
  ]);

  return {
    props: {
      discovery,
      collection,
    },
  };
}

export default Home;
