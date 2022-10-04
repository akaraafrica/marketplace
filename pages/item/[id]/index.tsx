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
import Link from "next/link";
import parse from "html-react-parser";

const Index = ({ item }: { item: IItem }) => {
  const { user } = useContext(AuthContext);
  const width = useWindowSize().width!;
  return (
    <Layout>
      <main className={styles.main}>
        <section className={styles.sectionone}>
          <div className={styles.tags}>
            {/* TODO: change to item category */}
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
            <div className={styles.title}>
              <h3>{item.title}</h3>
              {item.ownerId === user?.id && (
                <Link href={`/item/create?id=${item.id}`}>
                  <button className={styles.edit}>Edit Item</button>
                </Link>
              )}
            </div>

            <span>{item?.price} ETH</span>
          </div>
          <div className={styles.stats}>
            <div>
              <span>Likes</span>
              <span>{item?.likes?.length || 0}</span>
            </div>
            <div>
              <span>Offers</span>
              <span>{item?.bids?.length || 0}</span>
            </div>
            <div>
              <span>Rating</span>
              <span>{item?.ratings?.length || 0}</span>
            </div>
          </div>
          <p>{user && parse(item.description)}</p>
          {user && <Tags item={item} />}

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
