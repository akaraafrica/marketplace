import Image from "next/image";
import React, { useState } from "react";
import Layout from "../../../components/Layout";
import QuickButtons from "../../../components/SingleItems/QuickButtons";
import Tags from "../../../components/SingleItems/Tags";
import { CollectionDs } from "../../../ds";
import useWindowSize from "../../../hooks/useWindowSize";
import styles from "./index.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";

const Index = ({ collection }: any) => {
  console.log(collection);

  const width = useWindowSize().width!;
  const [selectImage, setSelectImage] = useState("/assets/productimg4.png");
  const isComingSoon = true;
  const isOwner = true;
  return (
    <Layout>
      <main className={styles.main}>
        <section className={styles.sectionone}>
          <div className={styles.tags}>
            <span>ART</span>
            {isComingSoon && <span>coming soon</span>}
          </div>

          <div className={styles.img}>
            <Image src={selectImage} layout="fill" />
            {width < 800 && <QuickButtons />}
          </div>
          <div className={styles.images}>
            <Swiper
              slidesPerView={4}
              spaceBetween={0}
              style={{ zIndex: 0 }}
              className={styles.swiper_container}
            >
              {[...collection[2].images, ...collection[1].images]
                .slice(0, 4)
                .map((item: any) => (
                  <SwiperSlide key={item.id}>
                    <Image
                      onClick={() => {
                        setSelectImage(item);
                      }}
                      src={item}
                      width={100}
                      height={100}
                      className={styles.image}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </section>
        <section className={styles.sectiontwo}>
          <div className={styles.price}>
            <h3>Awesome Work</h3>
            <span>2.5 ETH</span>
            <span>$4,429.87</span>
            <span>10 in stock</span>
          </div>
          <div className={styles.stats}>
            <div>
              <span>Likes</span>
              <span>110</span>
            </div>
            <div>
              <span>Offers</span>
              <span>23</span>
            </div>
            <div>
              <span>Views</span>
              <span>2345</span>
            </div>
            <div>
              <span>Favourited</span>
              <span>146</span>
            </div>
          </div>
          {isComingSoon && (
            <p>
              This NFT Card will give you Access to Special Airdrops. To learn
              more about UI8 please visit <span>https://ui8.net</span>
            </p>
          )}
          <Tags isOwner={isOwner} />
          {width > 800 && <QuickButtons desktop={true} />}
        </section>
      </main>
    </Layout>
  );
};

export async function getServerSideProps() {
  let [collection] = await Promise.all([CollectionDs.getData()]);

  return {
    props: {
      collection,
    },
  };
}

export default Index;
