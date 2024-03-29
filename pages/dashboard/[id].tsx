import Items from "../../components/Dashboard/Items";
import ItemGrid from "../../components/Dashboard/ItemGrid";
import Layout from "../../components/global/Layout";
import { IItem } from "../../types/item.interface";
import Box from "@mui/material/Box";
import { useContext, useState } from "react";
import styles from "./dashboard.module.scss";
import { ProfileDs } from "../../ds";
import { ICollection } from "../../types/collection.interface";
import Collections from "../../components/Dashboard/Collections";
import { AuthContext } from "../../contexts/AuthContext";
import { GetServerSideProps } from "next";
import { ILike } from "../../types/like.interface";
import { IBid } from "../../types/bid.interface";
import withAuth from "../../HOC/withAuth";
import useSWR, { SWRConfig, unstable_serialize } from "swr";
import { useRouter } from "next/router";
import DashboardSidebar from "../../components/Dashboard/DashboardSidebar";
import { getCookies } from "cookies-next";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Dashboard = () => {
  const router = useRouter();
  const id = router.query.id as unknown as number;

  const { data, mutate } = useSWR(["dashboard", id], () =>
    ProfileDs.getDashboradData(id)
  );

  const { items, collections } = data as {
    items: IItem[];
    collections: ICollection[];
    likes: ILike[];
    bids: IBid[];
  };

  const [value, setValue] = useState(0);

  const { user } = useContext(AuthContext);
  return (
    <Layout>
      <div className={styles.root}>
        <Box className={styles.container}>
          <div className={styles.sidebar}>
            <DashboardSidebar setValue={setValue} id={id} />
          </div>
          <div className={styles.content}>
            {value === 0 && (
              <div className={styles.stats}>
                <div>
                  <h3>Minted items</h3>
                  <span>{data.mindtedItems.length || 0} Item(s)</span>
                </div>
                <div>
                  <h3>Minted items revenue</h3>
                  <span>{data.TotalMintedSold._sum.amount || 0} ETH</span>
                </div>
                <div>
                  <h3>Auction revenue </h3>
                  <span>{data.TotalAuctionSold._sum.amount || 0}ETH</span>
                </div>
                <div>
                  <h3>Revenue from collection</h3>
                  <span>{data.TotalCollectionSold._sum.amount || 0} ETH</span>
                </div>
                <div>
                  <h3>Collections as collaborator</h3>
                  <span> {data.collections.length || 0} ETH</span>
                </div>
                <div>
                  <h3>Total collections revenue</h3>
                  <span>
                    {data.collections.reduce(
                      (total: number, collection: any) =>
                        total + collection?.revenue || 0,
                      0
                    )}{" "}
                    ETH
                  </span>
                </div>
              </div>
            )}
            {value === 2 && (
              <div>
                <Items items={items} title="All Items" />
                <ItemGrid items={data.mindtedItems} title="Minted Items" />
                <Items items={items} auction={true} title="Items on Auction" />
              </div>
            )}
            {value === 1 && collections.length > 0 && (
              <div className={styles.collections}>
                {collections.map((collection) => (
                  <div className={styles.collection} key={collection.id}>
                    <Collections collection={collection} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Box>
      </div>
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id }: any = ctx.params;
  const data = await ProfileDs.getDashboradData(id);
  const cookie = getCookies(ctx);
  if (cookie?.address !== data?.walletAddress || !data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      fallback: {
        [unstable_serialize(["dashboard", id])]: data,
      },
    },
  };
};
const Page = ({ fallback }: any) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Dashboard />
    </SWRConfig>
  );
};
export default withAuth(Page);
