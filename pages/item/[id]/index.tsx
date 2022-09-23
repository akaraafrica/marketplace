import { GetServerSideProps } from "next";
import React, { useContext } from "react";
import NextImage from "../../../components/Image";
import Layout from "../../../components/Layout";
import QuickButtons from "../../../components/SingleItems/QuickButtons";
import Tags from "../../../components/SingleItems/Tags";
import { AuthContext } from "../../../contexts/AuthContext";
import { ItemDs } from "../../../ds";
import useWindowSize from "../../../hooks/useWindowSize";
import { IItem } from "../../../types/item.interface";
import styles from "./index.module.scss";
import ReactHtmlParser from "react-html-parser";
import Link from "next/link";
const Index = ({ item }: { item: IItem }) => {
  const { user } = useContext(AuthContext);
  const width = useWindowSize().width!;
  const isComingSoon = item?.openForBid;
  return (
    <Layout>
      <main className={styles.main}>
        <section className={styles.sectionone}>
          <div className={styles.tags}>
            {/* TODO: change to item category */}
            <span>ART</span>
            {isComingSoon && <span>coming soon</span>}
          </div>

          <div className={styles.img}>
            {item?.images[0] && (
              <NextImage alt={item.title} src={item.images[0]} layout="fill" />
            )}
            {width < 800 && <QuickButtons item={item} />}
          </div>
        </section>
        <section className={styles.sectiontwo}>
          <div className={styles.price}>
            <h3>{item.title}</h3>
            <span>{item?.price} ETH</span>
            {/* <span>$4,429.87</span> */}
          </div>
          <div className={styles.stats}>
            <div>
              <span>Likes</span>
              <span>{item?.ratings?.length || 0}</span>
            </div>
            <div>
              <span>Offers</span>
              <span>{item?.bids?.length || 0}</span>
            </div>
            {/* <div>
              <span>Views</span>
              <span>2345</span>
            </div> */}
            <div>
              <span>Rating</span>
              <span>{item?.ratings?.length || 0}</span>
            </div>
          </div>
          <p>
            This NFT Card will give you Access to Special Airdrops. To learn
            more about UI8 please visit
          </p>
          <p>{ReactHtmlParser(item.description)}</p>
          <Tags item={item} />
          <Link href={`/item/create?id=${item.id}`}>
            <button className={styles.edit}>Edit Item</button>
          </Link>
          {width > 800 && <QuickButtons desktop={true} item={item} />}
        </section>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const itemId = ctx.params?.id;
  let item = await ItemDs.getItem(itemId);

  if (!item) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      item,
    },
  };
};

export default Index;
