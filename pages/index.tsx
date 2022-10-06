/* eslint-disable @next/next/no-img-element */
import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../lotties/json-background.json";
import SellersSec from "../components/SellersSec";
import styles from "./index.module.scss";
import HotItems from "../components/HotItems";
import Discover from "../components/DiscoverSection/index";
import SubscribeModal from "../components/SubscribeModal/index";
import HowItWorks from "../components/HowItWorks/index";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Filter } from "../ds/discovery.ds";
import LandingMainSection from "../components/LandingMainSection";
import Layout from "../components/Layout";
import HotCollectionsSection from "../components/HotCollectionsSection";
import { CollectionDs, DiscoveryDs, ItemDs, UserDs } from "../ds/index";

const Home = (props: any) => {
  SwiperCore.use([Pagination, Autoplay]);
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
      {props.collection[0] && (
        <LandingMainSection collection={props.collection[0]} />
      )}
      {props.sellers && <SellersSec sellers={props.sellers} />}
      <HotItems items={props.item} />
      {props.collection && (
        <HotCollectionsSection collections={props.collection} />
      )}
      <Discover items={props.discovery} />
      <div className={styles.discoverdividercon}></div>
      <div id="subscribe">
        <SubscribeModal />
      </div>
      <div className={styles.discoverdividercon}></div>
      <HowItWorks />
    </Layout>
  );
};

export async function getServerSideProps() {
  let [discovery, collection, item, sellers] = await Promise.all([
    DiscoveryDs.getData(Filter.All),
    CollectionDs.getCollections(),
    ItemDs.getData(),
    UserDs.fetchSellers(),
  ]);

  return {
    props: {
      discovery,
      collection,
      item,
      sellers,
    },
  };
}

export default Home;
