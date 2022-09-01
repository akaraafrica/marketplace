import Box from "@mui/material/Box";
import { useContext } from "react";
import styles from "./admin.module.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import Layout from "../../../components/Layout";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { ICollection } from "../../../types/collection.interface";
import { AuthContext } from "../../../contexts/AuthContext";
import ItemGrid from "../../../components/CollectionAdmin/ItemGrid";
import { CollectionDs } from "../../../ds";
import ContributorsGrid from "../../../components/CollectionAdmin/ContributorsGrid";
import AddContributor from "../../../components/CollectionAdmin/AddContributor";

const CollectionAdmin = ({ collection }: { collection: ICollection }) => {
  //   console.log(collection);
  const { user } = useContext(AuthContext);
  return (
    <Layout>
      <Box className={styles.container}>
        <div className={styles.sidebar}>
          <ul>
            <Link href="/settings">
              <li>
                <SettingsIcon /> Settings
              </li>
            </Link>
          </ul>
        </div>
        <div>
          <div className={styles.heading}>
            <h2>{collection.title}</h2>
            <span>status: {collection.status}</span>
          </div>
          <AddContributor />
          <div className={styles.bottom}>
            <div>
              <ContributorsGrid collection={collection} />
            </div>
            <div>
              <ItemGrid items={collection.items} title="Items" />
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
