import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import Layout from "../../components/Layout";
import ProgressBar from "../../components/ProgressBar";
import styles from "./index.module.scss";
import Discovery, { Filter } from "../../ds/discovery.ds";
import { MdCancel } from "react-icons/md";
import DiscoveryItems from "../../components/DiscoveryItems";
import {
  handleChange,
  handleResetFilter,
  handleSliderChange,
} from "../../components/DiscoverSection/utils";
import CustomSelect from "../../components/CustomSelect";
import { IItem } from "../../types/item.interface";

interface properties {
  items: IItem[]
}
const Index = ({ items }: properties) => {
  const [open, setOpen] = useState(Filter.All);
  const [data, setData] = useState(items);
  const handleSearch = (e: any) => {
    const value: string = e.target.value;

    const newData = items.filter((item: any) => {
      const words: string[] = item.title.toLocaleLowerCase().split(" ");
      const isWord = words.find((word) => word === value.toLocaleLowerCase());

      if (isWord) {
        return item;
      }
    });
    setData([...newData]);
    if (value === "") {
      setData([...items]);
    }
  };
  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.top}>
          <input
            type="text"
            placeholder="Search by keywords"
            onChange={handleSearch}
          />
          <button>
            <BiSearch size={20} color="white" />
          </button>
        </div>
        <hr />
        <div className={styles.content}>
          <div className={styles.filters}>
            <div className={styles.filter}>
              <span>PRICE RANGE</span>
              <ProgressBar
                onChange={(e) => handleSliderChange(e, setData, items)}
              />
              <div className={styles.eth}>
                <span>0.01 ETH</span>
                <span>10 ETH</span>
              </div>
            </div>{" "}
            <div className={styles.recent}>
              <CustomSelect
                placeholder="Recently added"
                onChange={(e) => handleChange(e, "RECENT", setData, data)}
                options={["Recently added", "First added"]}
              />
            </div>
            <div className={styles.filter}>
              <span>PRICE</span>
              <CustomSelect
                placeholder="Highest price"
                onChange={(e) => handleChange(e, "PRICE", setData, data)}
                options={["Highest price", "Lowest price"]}
              />
            </div>
            <div className={styles.filter}>
              <span>LIKES</span>
              <CustomSelect
                placeholder="Most liked"
                onChange={(e) => handleChange(e, "LIKES", setData, data)}
                options={["Most liked", "Least liked"]}
              />
            </div>
            <div className={styles.filter}>
              <span>CREATOR</span>
              <CustomSelect
                placeholder="Verified only"
                onChange={(e) => handleChange(e, "CREATORS", setData, data)}
                options={["Verified only", "Non verified only"]}
              />
            </div>
            <hr />
            <div
              className={styles.reset}
              onClick={() => handleResetFilter(setData, items)}
            >
              <MdCancel size={20} color="white" />
              <span>Reset filter</span>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.navs}>
              <span
                onClick={() => setOpen(0)}
                className={`${styles.navItem} ${
                  open === 0 ? styles.active : ""
                }`}
              >
                All items
              </span>
              <span
                onClick={() => setOpen(1)}
                className={`${styles.navItem} ${
                  open === 1 ? styles.active : ""
                }`}
              >
                Art
              </span>
              <span
                onClick={() => setOpen(2)}
                className={`${styles.navItem} ${
                  open === 2 ? styles.active : ""
                }`}
              >
                Game
              </span>
              <span
                onClick={() => setOpen(3)}
                className={`${styles.navItem} ${
                  open === 3 ? styles.active : ""
                }`}
              >
                Photography
              </span>
              <span
                onClick={() => setOpen(4)}
                className={`${styles.navItem} ${
                  open === 4 ? styles.active : ""
                }`}
              >
                Music
              </span>
              <span
                onClick={() => setOpen(5)}
                className={`${styles.navItem} ${
                  open === 5 ? styles.active : ""
                }`}
              >
                Video
              </span>
            </div>
            <div>
              <DiscoveryItems filterBy={open} initialItems={data} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export async function getServerSideProps() {
  let data = await Discovery.getData(Filter.All);
  
  return {
    props: {
      data,
    },
  };
}

export default Index;
