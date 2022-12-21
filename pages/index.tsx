/* eslint-disable @next/next/no-img-element */
import React from "react";
import lottieJson from "../lotties/json-background.json";
import dynamic from "next/dynamic";
import styles from "./index.module.scss";
import { CollectionDs, DiscoveryDs, ItemDs, UserDs } from "../ds/index";
import useSWR, { SWRConfig, unstable_serialize } from "swr";
import { ICollection } from "../types/collection.interface";
import { IItem } from "../types/item.interface";
import { IUser } from "../types/user.interface";
const SellersSec: any = dynamic(() => import("../components/Home/SellersSec"), {
  ssr: false,
});
const HotItems: any = dynamic(() => import("../components/Home/HotItems"));
const Layout: any = dynamic(() => import("../components/global/Layout"));
const HotCollectionsSection: any = dynamic(
  () => import("../components/Home/HotCollectionsSection")
);

const LandingMainSection: any = dynamic(
  () => import("../components/Home/LandingMainSection")
);

const Discover: any = dynamic(
  () => import("../components/Home/DiscoverSection/index")
);
const SubscribeModal: any = dynamic(
  () => import("../components/Home/SubscribeModal/index")
);
const HowItWorks: any = dynamic(
  () => import("../components/Home/HowItWorks/index")
);
const Lottie: any = dynamic(() => import("react-lottie-player"));

const filter = {
  category: "ALL",
  verifiedCreator: "All",
  sort: "Most liked",
  priceRange: 1000,
};

const Home = () => {
  const { data: collection } = useSWR<ICollection[]>(["collection"], () =>
    CollectionDs.getCollections()
  );
  const { data: discovery } = useSWR<any>(["discovery"], () =>
    DiscoveryDs.getPageData(filter, 1)
  );

  const { data: item } = useSWR<IItem[]>(["item"], () =>
    ItemDs.getHotItemsData()
  );
  const { data: sellers } = useSWR<IUser[]>(["sellers"], () =>
    UserDs.fetchSellers()
  );

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
      {collection && collection?.length > 0 && (
        <LandingMainSection collection={collection[0]} />
      )}
      {sellers && sellers.length > 0 && <SellersSec sellers={sellers} />}
      {item && item?.length > 0 && <HotItems items={item} />}
      {collection && collection.length > 0 && (
        <HotCollectionsSection collections={collection} />
      )}
      {discovery && discovery.length > 0 && <Discover items={discovery[1]} />}
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
    DiscoveryDs.getPageData(filter, 1),
    CollectionDs.getCollections(),
    ItemDs.getHotItemsData(),
    UserDs.fetchSellers(),
  ]);

  return {
    props: {
      fallback: {
        [unstable_serialize(["discovery"])]: discovery,
        [unstable_serialize(["collection"])]: collection,
        [unstable_serialize(["item"])]: item,
        [unstable_serialize(["sellers"])]: sellers,
      },
    },
  };
}
const Page = ({ fallback }: any) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Home />
    </SWRConfig>
  );
};
export default Page;
