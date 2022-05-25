import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LandingBidding from "../../components/LandingBidding";
import LandingMain from "../../components/LandingMain";
import SellersSec from "../../components/SellersSec";
import styles from "./styles.module.scss";
import ListingMainCard from "../../components/ListingMainCard/index";
import ListingSubCard from "../../components/ListingSubCard/index";
import UpdateFromCreators from "../../components/UpdateFromCreators/index";
import rightarrow from "/assets/rightArrow.svg";
import Hotitems from "../../components/HotItems";
import Discover from "../../components/DiscoverSec/index";
import HotCollectionCard from "../../components/HotCollectionsCard/index";
import SubscribeModal from "../../components/SubscribeModal/index";
import HowItWorks from "../../components/HowItWorks/index";
import Slider from "infinite-react-carousel";
import HotCollectionMobile from "../../components/HotCollectionMobile/index";

const LandingPage = () => {
  const settings = {
    arrows: false,
    arrowsBlock: false,
    shift: 10,
    slidesPerRow: 3,
    autoplay: true,
  };
 // document.body.style = "background: black;";
  return (
    <div>
      <Header />
      <div className={styles.styles} >
        <LandingMain />
      </div>
        <LandingBidding />
      <div className={styles.listingcardparent}>
        <ListingMainCard />
        <div className={styles.listingsubcardparent}>
          <ListingSubCard />
          <ListingSubCard />
          <ListingSubCard />
        </div>
        <div className={styles.updatefromcreatorparent}>
          <p className={styles.updatefromcreatorheading}>
            Latest upload from creators 🔥
          </p>
          <UpdateFromCreators />
          <UpdateFromCreators />
          <UpdateFromCreators />
          <UpdateFromCreators />
          <div className={styles.discovermore}>
            <button>
              Discover more
              <span>
                <img src={rightarrow} />
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
          <Slider {...settings}>
            <div>
              <HotCollectionCard />
            </div>
            <div>
              <HotCollectionCard />
            </div>
            <div>
              <HotCollectionCard />
            </div>
            <div>
              <HotCollectionCard />
            </div>
            <div>
              <HotCollectionCard />
            </div>
            <div>
              <HotCollectionCard />
            </div>
            <div>
              <HotCollectionCard />
            </div>
            <div>
              <HotCollectionCard />
            </div>
          </Slider>
        </div>
      </div>
      <Discover />
      <div className={styles.discoverdividercon}></div>
      <SubscribeModal />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default LandingPage;
