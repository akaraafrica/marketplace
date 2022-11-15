import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { CollectionDs } from "../../ds";
import { ICollection } from "../../types/collection.interface";
import { BiSearch } from "react-icons/bi";
import useSWR, { SWRConfig, unstable_serialize } from "swr";
import useDebounce from "../../hooks/useDebounce";
import dynamic from "next/dynamic";
const LandingLayout: any = dynamic(() => import("../../components/Layout"));
const HotCollectionCard: any = dynamic(
  () => import("../../components/HotCollectionsCard")
);

const Index = () => {
  const { data: collections } = useSWR<ICollection[]>(["collection"], () =>
    CollectionDs.getCollections()
  );
  const [data, setData] = useState(collections);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const debouncedSearchTerm: string = useDebounce(searchTerm, 250);

  const handleSearch = async (e: any) => {
    const value: string = e.target.value.toLowerCase();
    setSearchTerm(value);
    if (value.length < 1) {
      setData(collections);
    }
  };
  useEffect(() => {
    (async () => {
      if (debouncedSearchTerm.length >= 1) {
        setLoading(true);
        setData([]);
        try {
          const results = await CollectionDs.search(searchTerm);
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
    <LandingLayout>
      <div className={styles.root}>
        <h1>Explore Collections</h1>
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
        {data ? (
          <div className={styles.collections}>
            {loading && <h3 className={styles.found}>loading...</h3>}
            {data?.map((collection) => (
              <HotCollectionCard key={collection.id} collection={collection} />
            ))}
            {!loading && !data.length && (
              <h3 className={styles.found}>No item found</h3>
            )}
          </div>
        ) : (
          <div className={styles.noData}>No Data</div>
        )}
      </div>
    </LandingLayout>
  );
};

export async function getServerSideProps() {
  const collections = await CollectionDs.getCollections();

  return {
    props: {
      fallback: {
        [unstable_serialize(["collection"])]: collections,
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
