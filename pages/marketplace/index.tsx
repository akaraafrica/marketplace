import React from "react";
import { BiSearch } from "react-icons/bi";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import AllItems2 from "../../components/AllItems2";
import Art2 from "../../components/Art2";
import Game2 from "../../components/Game2";
import Layout from "../../components/Layout";
import Music2 from "../../components/Music2";
import Photography2 from "../../components/Photography2";
import ProgressBar from "../../components/ProgressBar";
import Video2 from "../../components/Video2";
import styles from "./index.module.scss";
import Discovery, { Filter } from "../../ds/discovery.ds";
import { MdCancel } from "react-icons/md";

interface CustomSelectProps {
  placeholder: string;
}
const CustomSelect: React.FC<CustomSelectProps> = ({ placeholder }) => {
  return (
    <div className={styles.customInput}>
      <input type="text" placeholder={placeholder} />
      <IoChevronDownCircleOutline size={20} />
    </div>
  );
};

const Index = (props: any) => {
  const [open, setOpen] = React.useState(0);
  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.top}>
          <input type="text" placeholder="Search by keywords" />
          <button>
            <BiSearch size={20} color="white" />
          </button>
        </div>
        <hr />
        <div className={styles.content}>
          <div className={styles.left}>
            <CustomSelect placeholder="Recently added" />
            <div className={styles.filters}>
              <div className={styles.filter}>
                <span>PRICE RANGE</span>
                <ProgressBar />
                <div className={styles.eth}>
                  <span>0.01 ETH</span>
                  <span>10 ETH</span>
                </div>
              </div>
              <hr />
              <div className={styles.filter}>
                <span>LIKES</span>
                <CustomSelect placeholder="Most liked" />
              </div>
              <div className={styles.filter}>
                <span>CREATOR</span>
                <CustomSelect placeholder="Verified only" />
              </div>
              <div className={styles.filter}>
                <span>PRICE</span>
                <CustomSelect placeholder="Highest price" />
              </div>
              <hr />
              <div className={styles.reset}>
                <MdCancel size={20} color="white" />
                <span>Reset filter</span>
              </div>
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
              {open === 0 && <AllItems2 products={props.items} />}
              {open === 1 && <Art2 products={props.items} />}
              {open === 2 && <Game2 products={props.items} />}
              {open === 3 && <Photography2 products={props.items} />}
              {open === 4 && <Music2 products={props.items} />}
              {open === 5 && <Video2 products={props.items} />}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export async function getServerSideProps() {
  let data = {};

  try {
    data = await Discovery.getData(Filter.All);
  } catch (error) {
    console.log(error);
  }

  return {
    props: data,
  };
}

export default Index;
