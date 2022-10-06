import React, { useState } from "react";
import styles from "./index.module.scss";
import LandingLayout from "../../components/Layout/index";
import { CollectionDs } from "../../ds";
import HotCollectionCard from "../../components/HotCollectionsCard";
import { ICollection } from "../../types/collection.interface";
import { BiSearch } from "react-icons/bi";
import useSWR, { SWRConfig, unstable_serialize } from "swr";

interface properties {
  collections: ICollection[];
}
const Index = () => {
  const { data: collections } = useSWR<ICollection[]>(["collection"], () =>
    CollectionDs.getCollections()
  );
  const [data, setData] = useState(collections);
  const handleSearch = (e: any) => {
    const value: string = e.target.value;

    const newData = collections?.filter((collection: any) => {
      const words: string[] = collection.title.toLocaleLowerCase().split(" ");
      const isWord = words.find((word) => word === value.toLocaleLowerCase());

      if (isWord) {
        return collection;
      }
    });
    if (newData) {
      setData([...newData]);
    }

    if (value === "" && collections) {
      setData([...collections]);
    }
  };
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
            {data?.map((collection) => (
              <HotCollectionCard key={collection.id} collection={collection} />
            ))}
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
