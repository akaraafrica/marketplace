import Box from "@mui/material/Box";
import { useContext } from "react";
import styles from "./admin.module.scss";
import Layout from "../../../components/Layout";
import { GetServerSideProps } from "next";
import { ICollection } from "../../../types/collection.interface";
import ItemGrid from "../../../components/CollectionAdmin/ItemGrid";
import { CollectionDs } from "../../../ds";
import ContributorsGrid from "../../../components/CollectionAdmin/ContributorsGrid";
import Link from "next/link";

const CollectionAdmin = ({ collection }: { collection: ICollection }) => {
  return (
    <Layout>
      <Box className={styles.container}>
        <div>
          <div className={styles.heading}>
            <h2>{collection?.title}</h2>
            <div className={styles.editCollection}>
              <span>status: {collection.status}</span>
              <Link href={`/collection/create?id=${collection.id}`}>
                <button>Edit Collection</button>
              </Link>
            </div>
          </div>
          <div className={styles.bottom}>
            <div>
              <ContributorsGrid collection={collection} />
            </div>
            <div>
              <ItemGrid items={collection.items} title="Collection Items" />
            </div>
          </div>
        </div>
      </Box>
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id }: any = ctx.params;
  let collection = await CollectionDs.getCollectionById(id);
  if (!collection) return { notFound: true };

  return {
    props: {
      collection: collection.data,
    },
  };
};
export default CollectionAdmin;
