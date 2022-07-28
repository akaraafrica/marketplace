import NextImage from "../../../components/Image";
import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import QuickButtons from "../../../components/SingleItems/QuickButtons";
import { CollectionDs } from "../../../ds";
import useWindowSize from "../../../hooks/useWindowSize";
import styles from "./index.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { ICollection } from "../../../types/collection.interface";
import { GetServerSideProps } from "next";
import { IItem } from "../../../types/item.interface";

interface properties {
  collection: ICollection
}
const Index = ({ collection }: properties) => {

  const width = useWindowSize().width!;
  const [selectedItem, setSelectedItem] = useState<IItem>();

  useEffect(()=>{
    if(collection.items.length > 0) setSelectedItem(collection.items[0])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  console.log("collection iimages here is ", collection.items)
  return (
    <Layout>
      <main className={styles.main}>
        <section className={styles.sectionone}>
          <div>
            <NextImage className={styles.img} alt={selectedItem ? selectedItem.title: collection.title} src={selectedItem ? selectedItem.images[0]: collection.images[0]} layout="fill" />
            {width < 800 && <QuickButtons />}
          </div>
          {collection.items && collection.items?.length > 0 &&
          <div className={styles.images}>
            <Swiper
              slidesPerView={4}
              spaceBetween={5}
              style={{ zIndex: 1 }}
              className={styles.swiper_container}
            >
              {collection.items.map((item: IItem, idx) => (
                (item.images.length >0 &&
                  <SwiperSlide key={idx}>
                    <NextImage
                      onClick={() => {
                        setSelectedItem(item);
                      }}
                      key={idx}
                      src={item.images[0] || ""}
                      width={100}
                      height={100}
                      alt={item.title}
                      className={styles.image}
                    />
                  </SwiperSlide>)
              ))}
            </Swiper>
          </div>}
        </section>

        <section className={styles.sectiontwo}>
          <div className={styles.price}>
            <h3>{collection.title}</h3>
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
              <span>{collection?.ratings?.length || 0}</span>
            </div>
          </div>
          <p>{collection.description}</p>

          {width > 800 && <QuickButtons desktop={true} />}
          <section>
            <div className={styles.price}>
              <h4>{selectedItem?.title}</h4>
            </div>
            <div className={styles.stats}>
              <div>
                <span>Likes</span>
                <span>110</span>
              </div>
              <div>
                <span>Offers</span>
                <span>{selectedItem?.bids?.length || 0}</span>
              </div>
              <div>
                <span>Rating</span>
                <span>{selectedItem?.ratings?.length || 0}</span>
              </div>
            </div>
            <p>{selectedItem?.description}</p>
            {collection.author &&
              <a href={`/profile/${selectedItem ? selectedItem.owner.id : collection?.author?.id}`}>
                <div className={styles.profileInfoCard}>
                  <NextImage
                    className={styles.image}
                    src={selectedItem ? selectedItem.owner.profile.avatar : collection.author.profile.avatar}
                    width="50px"
                    height="50px"
                  />
                  <div className={styles.owner}>
                    By {selectedItem ? selectedItem.owner.profile.name :collection.author.profile.name}
                  </div>
                </div>
              </a>
            }
          </section>
        </section>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id }: any = ctx.params;
  let collection = await CollectionDs.getCollectionById(id);

  if (!collection) return { notFound: true };

  return {
    props: {
      collection: collection.data,
    },
  };
}

export default Index;
