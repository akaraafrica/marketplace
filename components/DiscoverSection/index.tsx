/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import ProgressBar from "../ProgressBar/index";
import DiscoveryItems from "../DiscoveryItems/index";
import { Filter } from "../../ds/discovery.ds";
import CustomSelect from "../CustomSelect";
import {
  handleCategoryChange,
  handleChange,
  handleResetFilter,
  handleSliderChange,
} from "./utils";
import { IItem } from "../../types/item.interface";

interface properties {
  items: IItem[];
}
function Discover({ items }: properties) {
  const [open, setOpen] = useState(Filter.All);
  const [data, setData] = useState<IItem[] | undefined>(items);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    category: "ALL",
    verifiedCreator: false,
    sort: "Most liked",
    priceRange: 1000,
  });
  return (
    <div className={styles.root}>
      <h1>Discover</h1>
      <div className={styles.navbar}>
        <div className={styles.recent}></div>
        <div className={styles.navs}>
          <span
            onClick={() => {
              setOpen(0),
                handleCategoryChange(
                  "ALL",
                  setData,
                  items,
                  setLoading,
                  filter,
                  setFilter
                );
            }}
            className={`${styles.navItem} ${open === 0 ? styles.active : ""}`}
          >
            All items
          </span>
          <span
            onClick={() => {
              setOpen(1);
              handleCategoryChange(
                "ART",
                setData,
                items,
                setLoading,
                filter,
                setFilter
              );
            }}
            className={`${styles.navItem} ${open === 1 ? styles.active : ""}`}
          >
            Art
          </span>
          <span
            onClick={() => {
              setOpen(2);
              handleCategoryChange(
                "GAME",
                setData,
                items,
                setLoading,
                filter,
                setFilter
              );
            }}
            className={`${styles.navItem} ${open === 2 ? styles.active : ""}`}
          >
            Game
          </span>
          <span
            onClick={() => {
              setOpen(3);
              handleCategoryChange(
                "PHOTOGRAPHY",
                setData,
                items,
                setLoading,
                filter,
                setFilter
              );
            }}
            className={`${styles.navItem} ${open === 3 ? styles.active : ""}`}
          >
            Photography
          </span>
          <span
            onClick={() => {
              setOpen(4);
              handleCategoryChange(
                "MUSIC",
                setData,
                items,
                setLoading,
                filter,
                setFilter
              );
            }}
            className={`${styles.navItem} ${open === 4 ? styles.active : ""}`}
          >
            Music
          </span>
          <span
            onClick={() => {
              setOpen(5);
              handleCategoryChange(
                "VIDEO",
                setData,
                items,
                setLoading,
                filter,
                setFilter
              );
            }}
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
          <span>SORT BY</span>
          <CustomSelect
            placeholder="Sort By"
            onChange={(e) =>
              handleChange(e, "SORT", setData, filter, setFilter, setLoading)
            }
            options={[
              "Most liked",
              "Least liked",
              "Highest price",
              "Lowest price",
              "Recently added",
              "First added",
            ]}
          />
        </div>

        <div className={styles.filter}>
          <span>CREATOR</span>
          <CustomSelect
            placeholder="Verified only"
            onChange={(e) =>
              handleChange(
                e,
                "CREATORS",
                setData,
                filter,
                setFilter,
                setLoading
              )
            }
            options={["Non verified only", "Verified only"]}
          />
        </div>
        <div className={styles.filter}>
          <span>PRICE RANGE</span>
          <ProgressBar
            onChange={(e) =>
              handleSliderChange(e, setData, filter, setFilter, setLoading)
            }
          />
        </div>
      </div>
      <div className={styles.discoverCont}>
        {loading ? (
          <h3 className={styles.found}>loading...</h3>
        ) : data?.length ? (
          <DiscoveryItems initialItems={data} filter={filter} />
        ) : (
          <h3 className={styles.found}>No item found</h3>
        )}
      </div>
    </div>
  );
}
export default Discover;
