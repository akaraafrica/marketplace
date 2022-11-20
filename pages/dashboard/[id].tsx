import Items from "../../components/Dashboard/Items";
import ItemGrid from "../../components/Dashboard/ItemGrid";
import Layout from "../../components/Layout";
import { IItem } from "../../types/item.interface";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useContext, useState } from "react";
import styles from "./dashboard.module.scss";
import CustomTable from "../../components/Dashboard/Table";
import { NoSsr } from "@mui/material";
import { IoMdListBox } from "react-icons/io";
import { CgArrowsExchangeV } from "react-icons/cg";
import SettingsIcon from "@mui/icons-material/Settings";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
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
  const { items, collections, likes, bids } = data as {
    items: IItem[];
    collections: ICollection[];
    likes: ILike[];
    bids: IBid[];
  };

  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { user } = useContext(AuthContext);
  return (
    <Layout>
      <Box className={styles.container}>
        <div className={styles.sidebar}>
          <ul>
            <Link href="#watchlist">
              <li>
                <IoMdListBox size={25} /> Watchlist
              </li>
            </Link>
            <Link href="/notifications">
              <li>
                <MarkunreadIcon />
                Inbox
              </li>
            </Link>
            <Link href="#bids">
              <li>
                <CgArrowsExchangeV size={25} />
                Bids
              </li>
            </Link>
            {/* <li>
              <TurnedInIcon />
              Owned
            </li> */}
            <Link href="#itemsold">
              <li>
                <TurnedInNotIcon />
                Sold
              </li>
            </Link>
            <Link href={`/profile/${user?.id}`}>
              <li>
                <AccountCircleIcon />
                Profile
              </li>
            </Link>
            <Link href="/settings">
              <li>
                <SettingsIcon /> Settings
              </li>
            </Link>
          </ul>
        </div>
        <div>
          <div className={styles.main}>
            <Box className={styles.tabs}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab sx={{ color: "white" }} label="Items" {...a11yProps(0)} />
                <Tab
                  sx={{ color: "white" }}
                  label="Collections"
                  {...a11yProps(1)}
                />
                <Tab
                  sx={{ color: "white" }}
                  label="Auction"
                  {...a11yProps(2)}
                />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Items items={items} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Items items={items} auction={true} />
            </TabPanel>

            <TabPanel value={value} index={1}>
              <div className={styles.collections}>
                {collections.map((collection) => (
                  <div className={styles.collection} key={collection.id}>
                    <Collections collection={collection} />
                  </div>
                ))}
              </div>
            </TabPanel>
          </div>
          <div className={styles.stats}>
            <div>
              <h3>
                Minted items <span>{data.mindtedItems.length} </span>
              </h3>
            </div>
            <div>
              <h3>Minted items revenue</h3>
              <span>{data.TotalMintedSold._sum.amount} ETH</span>
            </div>
            <div>
              <h3>Auction revenue </h3>
              <span>{data.TotalAuctionSold._sum.amount}ETH</span>
            </div>
            <div>
              <h3>Revenue from collection</h3>
              <span>{data.TotalCollectionSold._sum.amount} ETH</span>
            </div>
            <div>
              <h3>Collections as collaborator</h3>
              <span> {data.collections.length} ETH</span>
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
          <div>
            <ItemGrid items={data.mindtedItems} title="Minted Items" />
          </div>
        </div>
      </Box>
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id }: any = ctx.params;
  const data = await ProfileDs.getDashboradData(id);

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
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box color="ActiveBorder">{children}</Box>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
