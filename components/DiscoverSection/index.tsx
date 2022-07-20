/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import ProgressBar from "../ProgressBar/index";
import DiscoveryItems from "../DiscoveryItems/index";
import { Filter } from "../../ds/discovery.ds";
import CustomSelect from "../CustomSelect";
import { handleChange, handleResetFilter, handleSliderChange } from "./utils";

function Discover({ items }: any) {
  const [open, setOpen] = useState(Filter.All);
  const [data, setData] = useState(items);

  return (
    <div className={styles.root}>
      <h1>Discover</h1>
      <div className={styles.navbar}>
        <div className={styles.recent}>
          <CustomSelect
            placeholder="Recently added"
            onChange={(e) => handleChange(e, "RECENT", setData, data)}
            options={["Recently added", "First added"]}
          />
        </div>
        <div className={styles.navs}>
          <span
            onClick={() => setOpen(0)}
            className={`${styles.navItem} ${open === 0 ? styles.active : ""}`}
          >
            All items
          </span>
          <span
            onClick={() => setOpen(1)}
            className={`${styles.navItem} ${open === 1 ? styles.active : ""}`}
          >
            Art
          </span>
          <span
            onClick={() => setOpen(2)}
            className={`${styles.navItem} ${open === 2 ? styles.active : ""}`}
          >
            Game
          </span>
          <span
            onClick={() => setOpen(3)}
            className={`${styles.navItem} ${open === 3 ? styles.active : ""}`}
          >
            Photography
          </span>
          <span
            onClick={() => setOpen(4)}
            className={`${styles.navItem} ${open === 4 ? styles.active : ""}`}
          >
            Music
          </span>
          <span
            onClick={() => setOpen(5)}
            className={`${styles.navItem} ${open === 5 ? styles.active : ""}`}
          >
            Video
          </span>
        </div>
        <div
          className={styles.filterBtn}
          onClick={() => handleResetFilter(setData, items)}
        >
          <span>Filter</span>
          &#x2715;
        </div>
      </div>
      <hr />
      <div className={styles.filters}>
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
        <div className={styles.filter}>
          <span>PRICE RANGE</span>
          <ProgressBar
            onChange={(e) => handleSliderChange(e, setData, items)}
          />
          <div className={styles.eth}>
            <span>0.01 ETH</span>
            <span>10 ETH</span>
          </div>
        </div>
      </div>
      <div className={styles.discoverCont}>
        <DiscoveryItems filterBy={open} products={data} />
      </div>
    </div>
  );
}
export default Discover;
