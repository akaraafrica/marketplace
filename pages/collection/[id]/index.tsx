import Image from "next/image";
import React, { useState } from "react";
import Layout from "../../../components/Layout";
import QuickButtons from "../../../components/SingleItems/QuickButtons";
import { CollectionDs } from "../../../ds";
import useWindowSize from "../../../hooks/useWindowSize";
import styles from "./index.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Avatar } from "@mui/material";

const Index = ({ collection }: any) => {
  const item = collection[0];

  const width = useWindowSize().width!;
  const [select, setSelect] = useState(item.items[0]);

  return (
    <Layout>
      <main className={styles.main}>
        <section className={styles.sectionone}>
          <div className={styles.img}>
            <Image src={select.images[0]} layout="fill" />
            {width < 800 && <QuickButtons />}
          </div>
          <div className={styles.images}>
            <Swiper
              slidesPerView={4}
              spaceBetween={5}
              style={{ zIndex: 0 }}
              className={styles.swiper_container}
            >
              {item.items.map((item: any) => (
                <SwiperSlide key={item.id}>
                  <Image
                    onClick={() => {
                      setSelect(item);
                    }}
                    src={item.images[0]}
                    width={"100px"}
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
            <h3>{item.title}</h3>
            {/* <span>{item.price} 2.5 ETH</span> */}
            {/* <span>$4,429.87</span> */}
          </div>
          <div className={styles.stats}>
            <div>
              <span>Likes</span>
              <span>110</span>
            </div>

            <div>
              <span>Rating</span>
              <span>{item?.ratings?.length || 0}</span>
            </div>
          </div>
          <p>{item.description}</p>

          {width > 800 && <QuickButtons desktop={true} />}
          <section>
            <div className={styles.price}>
              <h4>{select.title}</h4>
              {/* <span>{item.price} 2.5 ETH</span> */}
              {/* <span>$4,429.87</span> */}
            </div>
            <div className={styles.stats}>
              <div>
                <span>Likes</span>
                <span>110</span>
              </div>
              <div>
                <span>Offers</span>
                <span>{item?.bids?.length || 0}</span>
              </div>
              <div>
                <span>Rating</span>
                <span>{select?.ratings?.length || 0}</span>
              </div>
            </div>
            <p>{select.description}</p>
            <div className={styles.profileInfoCard}>
              <Avatar
                src={`/assets/auctionAvatar.png`}
                alt="creator-photo"
                sx={{ width: 50, height: 50 }}
              />
              <div>
                <span>Creator</span>
                <span>Sarah Shaibu</span>
              </div>
            </div>
          </section>
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
