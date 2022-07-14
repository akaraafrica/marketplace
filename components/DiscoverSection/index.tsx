/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import React, { useState } from "react";
import styles from "./index.module.scss";
import DiscoverSelect from "../DiscoverSelect/index";
import ProgressBar from "../ProgressBar/index";
import AllItems from "../AllItems/index";
import Art from "../Art/index";
import Game from "../Game/index";
import Photography from "../Photography/index";
import Music from "../Music/index";
import Video from "../Video/index";
import { IoChevronDownCircleOutline } from "react-icons/io5";

interface CustomSelectProps {
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const CustomSelect: React.FC<CustomSelectProps> = ({
  placeholder,
  onChange,
}) => {
  return (
    <div className={styles.customInput}>
      <input type="text" placeholder={placeholder} onChange={onChange} />
      <IoChevronDownCircleOutline size={20} />
    </div>
  );
};

function Discover({ items }: any) {
  console.log(items);
  const [open, setOpen] = React.useState(0);
  const [filter, setFilter] = useState("");
  const [data, setData] = useState(items);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    param: string
  ) => {
    let newData;

    switch (param) {
      case "RECENT":
        break;
      case "PRICE":
        newData = items.filter((item: any) => item.price <= filter);
        setData(newData);
        break;
      case "LIKES":
        break;
      case "CREATORS":
        break;

      default:
        break;
    }
  };

  return (
    <div className={styles.root}>
      <h1>Discover</h1>
      <div className={styles.navbar}>
        <div className={styles.recent}>
          <CustomSelect
            placeholder="Recently added"
            onChange={(e) => handleChange(e, "RECENT")}
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
        <div className={styles.filterBtn}>
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
            onChange={(e) => handleChange(e, "PRICE")}
          />
        </div>
        <div className={styles.filter}>
          <span>LIKES</span>
          <CustomSelect
            placeholder="Most liked"
            onChange={(e) => handleChange(e, "LIKES")}
          />
        </div>
        <div className={styles.filter}>
          <span>CREATOR</span>
          <CustomSelect
            placeholder="Verified only"
            onChange={(e) => handleChange(e, "CREATORS")}
          />
        </div>
        <div className={styles.filter}>
          <span>PRICE RANGE</span>
          <ProgressBar />
          <div className={styles.eth}>
            <span>0.01 ETH</span>
            <span>10 ETH</span>
          </div>
        </div>
      </div>
      <div className={styles.discoverCont}>
        {open === 0 && <AllItems products={data} />}
        {open === 1 && <Art products={data} />}
        {open === 2 && <Game products={data} />}
        {open === 3 && <Photography products={data} />}
        {open === 4 && <Music products={data} />}
        {open === 5 && <Video products={data} />}
      </div>
    </div>
  );
}
export default Discover;
