import NextImage from "../../../components/Image";
import React, { useState } from "react";
import Layout from "../../../components/Layout";
import QuickButtons from "../../../components/SingleItems/QuickButtons";
import { CollectionDs } from "../../../ds";
import useWindowSize from "../../../hooks/useWindowSize";
import styles from "./index.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { ICollection } from "../../../types/collection.interface";
import { GetServerSideProps } from "next";
import { IItem } from "../../../types/item.interface";
import ReactHtmlParser from "react-html-parser";
import withAuth from "../../../HOC/withAuth";
import DefaultAvatar from "../../../components/DefaultAvatar";
import { getUserName } from "../../../utils/helpers/getUserName";

interface properties {
  collection: ICollection;
}
const Index = ({ collection }: properties) => {
  const width = useWindowSize().width!;
  const [selectedItem, setSelectedItem] = useState<IItem>();

  return (
    <Layout>
      <main className={styles.main}>
        <section className={styles.sectionone}>
          <div className={styles.img}>
            <NextImage
              className={styles.img}
              alt={selectedItem ? selectedItem.title : collection.title}
              src={selectedItem ? selectedItem.images[0] : collection.images[0]}
              layout="fill"
            />
            {width < 800 && <QuickButtons collection={collection} />}
          </div>
          {collection.items && collection.items?.length > 0 && (
            <div className={styles.images}>
              <Swiper
                slidesPerView={4}
                spaceBetween={5}
                style={{ zIndex: 1 }}
                className={styles.swiper_container}
              >
                <SwiperSlide key={-1}>
                  <NextImage
                    onClick={() => {
                      setSelectedItem(undefined);
                    }}
                    key={-1}
                    src={collection.images[0]}
                    width={100}
                    height={100}
                    alt={collection.title}
                    className={styles.image}
                  />
                </SwiperSlide>
                {collection.items.map(
                  (item: IItem, idx) =>
                    item.images.length > 0 && (
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
                      </SwiperSlide>
                    )
                )}
              </Swiper>
            </div>
          )}
        </section>

        <section className={styles.sectiontwo}>
          <div className={styles.price}>
            <h3>{collection.title}</h3>
            {/* <span>{item.price} 2.5 ETH</span> */}
            {/* <span>$4,429.87</span> */}
          </div>
          {collection?.likes?.length && (
            <div className={styles.stats}>
              <div>
                <span>Likes</span>
                <span>{collection?.likes?.length || 0}</span>
              </div>
            </div>
          )}
          <div>{ReactHtmlParser(collection.description)}</div>

          {width > 800 && (
            <QuickButtons desktop={true} collection={collection} />
          )}
          <section>
            {selectedItem && (
              <>
                <div className={styles.price}>
                  <h4>{selectedItem?.title}</h4>
                </div>
                <div className={styles.stats}>
                  <div>
                    <span>Likes</span>
                    <span>{selectedItem?.bids?.length || 0}</span>
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
              </>
            )}
            <p>{selectedItem?.description}</p>
            {collection.author && (
              <a
                href={`/profile/${
                  selectedItem ? selectedItem.owner.id : collection?.author?.id
                }`}
              >
                <div className={styles.profileInfoCard}>
                  <DefaultAvatar
                    id={selectedItem ? selectedItem.id : collection.author.id}
                    walletAddress={
                      selectedItem
                        ? selectedItem.owner.walletAddress!
                        : collection.author.walletAddress!
                    }
                    url={
                      selectedItem
                        ? selectedItem.owner.profile?.avatar
                        : collection.author.profile?.avatar
                    }
                  />
                  <div className={styles.owner}>
                    {getUserName(
                      selectedItem ? selectedItem.owner : collection.author
                    )}
                  </div>
                </div>
              </a>
            )}
          </section>
        </section>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id }: any = ctx.params;
  let collection = await CollectionDs.getCollectionById(id);
  console.log({ collection });

  // /  if (!collection) return { notFound: true };

  return {
    props: {
      collection: collection.data,
    },
  };
};

// export default Index;
export default withAuth(Index);
