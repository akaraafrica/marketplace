import Items from "../../components/dashboard/Items";
import Layout from "../../components/Layout";
import discoveryDs, { Filter } from "../../ds/discovery.ds";
import { IItem } from "../../types/item.interface";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import styles from "./dashboard.module.scss";
import CustomTable from "../../components/dashboard/Table";
import { NoSsr } from "@mui/material";
import { IoMdListBox } from "react-icons/io";
import { CgArrowsExchangeV } from "react-icons/cg";
import SettingsIcon from "@mui/icons-material/Settings";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import TurnedInIcon from "@mui/icons-material/TurnedIn";

import MarkunreadIcon from "@mui/icons-material/Markunread";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ItemGrid from "../../components/dashboard/ItemGrid";
import Link from "next/link";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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
const Dashboard = ({ items }: { items: IItem[] }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
                Indox
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
            <Link href="/profile/9">
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
          <Box className={styles.tabs}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab sx={{ color: "white" }} label="Auction" {...a11yProps(0)} />
              <Tab sx={{ color: "white" }} label="Items" {...a11yProps(1)} />
              <Tab
                sx={{ color: "white" }}
                label="Collections"
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Items items={items} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Items items={items} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Items items={items} />
          </TabPanel>
          <NoSsr>
            <div id="watchlist">
              <ItemGrid items={items} title="watchlist" />
            </div>
            <div id="itemsold">
              <ItemGrid items={items} title="Items Sold" />
            </div>
            <div id="bids">
              <CustomTable title="Bids" />
            </div>
          </NoSsr>
        </div>
      </Box>
    </Layout>
  );
};
export async function getServerSideProps() {
  let data = await discoveryDs.getData(Filter.All);
  console.log("items here are ", data);
  return {
    props: {
      items: data,
    },
  };
}

export default Dashboard;
