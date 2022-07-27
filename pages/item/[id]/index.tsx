import { GetServerSideProps } from "next";
import Image from "next/image";
import React, { useContext } from "react";
import Layout from "../../../components/Layout";
import QuickButtons from "../../../components/SingleItems/QuickButtons";
import Tags from "../../../components/SingleItems/Tags";
import { AuthContext } from "../../../contexts/AuthContext";
import { ItemDs } from "../../../ds";
import useWindowSize from "../../../hooks/useWindowSize";
import styles from "./index.module.scss";

const Index = ({ item }: any) => {
  console.log(item);
  const { user, isAuthenticated } = useContext(AuthContext);
  console.log(user);
  console.log(isAuthenticated);

  const width = useWindowSize().width!;
  const isComingSoon = item?.openForBid;
  const isOwner = true;
  return (
    <Layout>
      <main className={styles.main}>
        <section className={styles.sectionone}>
          <div className={styles.tags}>
            <span>ART</span>
            <span>coming soon</span>
          </div>

          <div className={styles.img}>
            {item?.images[0] && <Image src={item.images[0]} layout="fill" />}
            {width < 800 && <QuickButtons />}
          </div>
        </section>
        <section className={styles.sectiontwo}>
          <div className={styles.price}>
            <h3>{item.title}</h3>
            <span>{item.price} ETH</span>
            <span>$4,429.87</span>
            <span>10 in stock</span>
          </div>
          <div className={styles.stats}>
            <div>
              <span>Likes</span>
              <span>{item?.ratings?.length || 0}</span>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const itemId = ctx.params?.id;
  let [Item] = await Promise.all([ItemDs.getData()]);
  let item = Item.find((i: any) => i.id == Number(itemId));
  console.log(item);

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
