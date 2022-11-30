import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { CollectionDs } from "../../ds";
import { BiSearch } from "react-icons/bi";
import useSWR, { SWRConfig, unstable_serialize, mutate } from "swr";
import useDebounce from "../../hooks/useDebounce";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const LandingLayout: any = dynamic(
  () => import("../../components/global/Layout")
);
const HotCollectionCard: any = dynamic(
  () => import("../../components/Collections/HotCollectionsCard")
);

const preFechedData = (page: any) => {
  mutate("collection" + page, () => CollectionDs.getPage(page));
};
const Index = () => {
  const router = useRouter();
  const page = Number(router?.query?.page) || 1;

  const { data: collections } = useSWR<any>("collection" + page, () =>
    CollectionDs.getPage(page)
  );

  const [data, setData] = useState<null | []>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const debouncedSearchTerm: string = useDebounce(searchTerm, 250);

  useEffect(() => {
    if (collections) {
      setData(collections[1]);
      preFechedData(page + 1);
      preFechedData(page - 1);
    }
  }, [collections]);

  const handleSearch = async (e: any) => {
    const value: string = e.target.value.toLowerCase();
    setSearchTerm(value);
    if (value.length < 1) {
      setData(collections[1]);
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
      {data && (
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
              {data?.map((collection: any) => (
                <HotCollectionCard
                  key={collection.id}
                  collection={collection}
                />
              ))}
              {!loading && !data.length && (
                <h3 className={styles.found}>No item found</h3>
              )}
            </div>
          ) : (
            <div className={styles.noData}>No Data</div>
          )}
          <div className={styles.pagination}>
            <button
              onClick={() =>
                page === 2
                  ? router.push("/collections", undefined, { shallow: true })
                  : router.push(`/collections?page=${page - 1}`, undefined, {
                      shallow: true,
                    })
              }
              disabled={page === 1}
            >
              Previous
            </button>
            <p>
              Page {page} of {collections && Math.ceil(collections[0] / 6)}{" "}
            </p>
            <button
              onClick={() =>
                router.push(`/collections?page=${page + 1}`, undefined, {
                  shallow: true,
                })
              }
              disabled={collections && page >= Math.ceil(collections[0] / 6)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </LandingLayout>
  );
};

export async function getServerSideProps(ctx: any) {
  const page = Number(ctx.query.page);
  const collections = await CollectionDs.getPage(page || 1);

  return {
    props: {
      fallback: {
        [unstable_serialize("collection" + (page || 1))]: collections,
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
