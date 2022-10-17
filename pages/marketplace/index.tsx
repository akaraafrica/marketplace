import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Layout from "../../components/Layout";
import ProgressBar from "../../components/ProgressBar";
import styles from "./index.module.scss";
import Discovery, { Filter } from "../../ds/discovery.ds";
import { MdCancel } from "react-icons/md";
import DiscoveryItems from "../../components/DiscoveryItems";
import {
  handleCategoryChange,
  handleChange,
  handleResetFilter,
  handleSliderChange,
} from "../../components/DiscoverSection/utils";
import CustomSelect from "../../components/CustomSelect";
import { IItem } from "../../types/item.interface";
import useSWR, { SWRConfig, unstable_serialize } from "swr";
import itemDs from "../../ds/item.ds";
import useDebounce from "../../hooks/useDebounce";

const Index = () => {
  const { data: items } = useSWR<IItem[]>(["discovery"], () =>
    Discovery.getData(Filter.All)
  );
  const [open, setOpen] = useState(Filter.All);
  const [data, setData] = useState(items);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    category: "ALL",
    verifiedCreator: false,
    likesOrder: "asc",
    createdOrder: "asc",
    priceOrder: "desc",
    priceRange: 1000,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm: string = useDebounce(searchTerm, 250);
  const handleSearch = async (e: any) => {
    const value: string = e.target.value.toLowerCase();

    setSearchTerm(value);
    if (value.length < 1) {
      setData(items);
    }
  };
  useEffect(() => {
    (async () => {
      if (debouncedSearchTerm.length > 1) {
        setLoading(true);
        try {
          const results = await itemDs.search(searchTerm);
          setData(results.data);
          setLoading(false);
        } catch (error) {
          setData([]);
          setLoading(false);
        }
      }
    })();
  }, [debouncedSearchTerm]);

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
                onChange={(e) =>
                  handleSliderChange(e, setData, filter, setFilter, setLoading)
                }
              />
            </div>
            <div className={styles.recent}>
              <CustomSelect
                placeholder="Recently added"
                onChange={(e) =>
                  handleChange(
                    e,
                    "RECENT",
                    setData,
                    filter,
                    setFilter,
                    setLoading
                  )
                }
                options={["Recently added", "First added"]}
              />
            </div>
            <div className={styles.filter}>
              <span>PRICE</span>
              <CustomSelect
                placeholder="Highest price"
                onChange={(e) =>
                  handleChange(
                    e,
                    "PRICE",
                    setData,
                    filter,
                    setFilter,
                    setLoading
                  )
                }
                options={["Highest price", "Lowest price"]}
              />
            </div>
            <div className={styles.filter}>
              <span>LIKES</span>
              <CustomSelect
                placeholder="Most liked"
                onChange={(e) =>
                  handleChange(
                    e,
                    "LIKES",
                    setData,
                    filter,
                    setFilter,
                    setLoading
                  )
                }
                options={["Most liked", "Least liked"]}
              />
            </div>
            <div className={styles.filter}>
              <span>CREATOR</span>
              <CustomSelect
                placeholder="Non verified only"
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
                className={`${styles.navItem} ${
                  open === 0 ? styles.active : ""
                }`}
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
                className={`${styles.navItem} ${
                  open === 1 ? styles.active : ""
                }`}
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
                className={`${styles.navItem} ${
                  open === 2 ? styles.active : ""
                }`}
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
                className={`${styles.navItem} ${
                  open === 3 ? styles.active : ""
                }`}
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
                className={`${styles.navItem} ${
                  open === 4 ? styles.active : ""
                }`}
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
                className={`${styles.navItem} ${
                  open === 5 ? styles.active : ""
                }`}
              >
                Video
              </span>
            </div>
            <div>
              {loading ? (
                <h3 className={styles.found}>loading...</h3>
              ) : data?.length ? (
                <DiscoveryItems initialItems={data} filter={filter} />
              ) : (
                <h3 className={styles.found}>No item found</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export async function getServerSideProps() {
  let discovery = await Discovery.getData(Filter.All);
  return {
    props: {
      fallback: {
        [unstable_serialize(["discovery"])]: discovery,
      },
    },
  };
}
const Page = ({ fallback }: any) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Index />
    </SWRConfig>
  );
};
export default Page;
