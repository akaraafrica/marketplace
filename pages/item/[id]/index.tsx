import { GetServerSideProps } from "next";
import React, { useContext, useEffect, useState } from "react";
import NextImage from "../../../components/global/Image";
import Layout from "../../../components/global/Layout";
import QuickButtons from "../../../components/SingleItems/QuickButtons";
import Tags from "../../../components/SingleItems/Tags";
import { AuthContext } from "../../../contexts/AuthContext";
import { ItemDs } from "../../../ds";
import useWindowSize from "../../../hooks/useWindowSize";
import { IItem } from "../../../types/item.interface";
import styles from "./index.module.scss";
import Link from "next/link";
import useSWR, { SWRConfig, unstable_serialize } from "swr";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const itemId = router.query.id;
  const { user } = useContext(AuthContext);
  const width = useWindowSize().width!;
  const { data: item } = useSWR<IItem>("item" + itemId, () =>
    ItemDs.getItem(itemId)
  );
  const [selectedItem, setSelectedItem] = useState<undefined | string>(
    item?.images[0]
  );
  useEffect(() => {
    setSelectedItem(item?.images[0]);
  }, [item]);
  if (!item) {
    return <h1></h1>;
  }

  return (
    <Layout>
      <main className={styles.main}>
        <section className={styles.sectionone}>
          <div className={styles.tags}>
            <span>{item.category}</span>
          </div>
          <div>
            <div>
              <div className={styles.img}>
                {selectedItem && (
                  <NextImage
                    alt={item?.title}
                    src={selectedItem}
                    layout="fill"
                    onError={(e) => {
                      console.log(e);
                    }}
                  />
                )}
                {width < 800 && <QuickButtons item={item} />}
              </div>
              <div className={styles.images}>
                {item?.images.map((image) => (
                  <NextImage
                    alt={item?.title || ""}
                    src={image}
                    key={image}
                    width="115%"
                    onClick={() => setSelectedItem(image)}
                    height="100%"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className={styles.sectiontwo}>
          <div className={styles.price}>
            <div className={styles.title}>
              <h3>{item?.title}</h3>
              {item?.collection?.title && (
                <Link href={`/collection/${item?.collection?.id}`}>
                  <a>{item?.collection?.title}</a>
                </Link>
              )}
            </div>
            <div className={styles.title}>
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

          {item && <Tags item={item} />}

          {width > 800 && <QuickButtons desktop={true} item={item} />}
        </section>
      </main>
    </Layout>
  );
};
export default function Page({ fallback }: any) {
  return (
    <SWRConfig value={{ fallback }}>
      <Index />
    </SWRConfig>
  );
}
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
      fallback: {
        [unstable_serialize("item" + itemId)]: item,
      },
    },
  };
};
