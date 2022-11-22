import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import styles from "./index.module.scss";
import Discovery, { Filter } from "../../ds/discovery.ds";
import { MdCancel } from "react-icons/md";
import {
  handleCategoryChange,
  handleChange,
  handleResetFilter,
  handleSliderChange,
} from "../../components/DiscoverSection/utils";
import { IItem } from "../../types/item.interface";
import useSWR, { SWRConfig, unstable_serialize, mutate } from "swr";
import itemDs from "../../ds/item.ds";
import useDebounce from "../../hooks/useDebounce";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const Layout: any = dynamic(() => import("../../components/Layout"));
const ProgressBar: any = dynamic(() => import("../../components/ProgressBar"));
const DiscoveryItems: any = dynamic(
  () => import("../../components/DiscoveryItems")
);
const CustomSelect: any = dynamic(
  () => import("../../components/CustomSelect")
);

const preFechedData = (page: any, filter: any) => {
  mutate("discovery" + page, () => Discovery.getPageData(filter, page));
};
const Index = () => {
  const router = useRouter();
  const page = Number(router?.query?.page) || 1;
  const [open, setOpen] = useState(Filter.All);

  const { data: items } = useSWR<any>(["discovery"], () =>
    Discovery.getPageData(open, page)
  );
  const [data, setData] = useState<null | []>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    category: "ALL",
    verifiedCreator: false,
    sort: "Most liked",
    priceRange: 1000,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm: string = useDebounce(searchTerm, 250);

  useEffect(() => {
    if (items) {
      setData(items[1]);
      preFechedData(page + 1, open);
      preFechedData(page - 1, open);
    }
  }, [items]);

  const handleSearch = async (e: any) => {
    const value: string = e.target.value.toLowerCase();

    setSearchTerm(value);
    if (value.length < 1) {
      setData(items);
    }
  };
  useEffect(() => {
    (async () => {
      if (debouncedSearchTerm.length >= 1) {
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
                onChange={(e: any) =>
                  handleSliderChange(e, setData, filter, setFilter, setLoading)
                }
              />
            </div>

            <div className={styles.filter}>
              <span>SORT BY</span>
              <CustomSelect
                placeholder="Sort By"
                onChange={(e: any) =>
                  handleChange(
                    e,
                    "SORT",
                    setData,
                    filter,
                    setFilter,
                    setLoading
                  )
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
                placeholder="Non verified only"
                onChange={(e: any) =>
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
        <div className={styles.pagination}>
          <button
            onClick={() =>
              page === 2
                ? router.push("/marketplace", undefined, { shallow: true })
                : router.push(`/marketplace?page=${page - 1}`, undefined, {
                    shallow: true,
                  })
            }
            disabled={page === 1}
          >
            Previous
          </button>
          <p>
            Page {page} of {items && Math.ceil(items[0] / 6)}{" "}
          </p>
          <button
            onClick={() =>
              router.push(`/marketplace?page=${page + 1}`, undefined, {
                shallow: true,
              })
            }
            disabled={items && page >= Math.ceil(items[0] / 6)}
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};
export async function getServerSideProps(ctx: any) {
  const page = Number(ctx.query.page);

  let discovery = await Discovery.getPageData(Filter.All, page || 1);
  return {
    props: {
      fallback: {
        [unstable_serialize(["discovery" + (page || 1)])]: discovery,
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
