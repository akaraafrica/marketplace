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
import withAuth from "../../../HOC/withAuth";
import { BiArrowBack } from "react-icons/bi";
import { BiRightArrowAlt } from "react-icons/bi";
import { FiChevronRight } from "react-icons/fi";

// const CollectionAdmin = ({ collectionx }: { collectionx: ICollection }) => {
const CollectionAdmin = () => {
  const collection = {
    title: "red x collection",
    status: "READY",
    items: [
      {
        title: "Amazing digital art",
        price: 10.2,
        images: [
          "https://ak-marketplace.s3.eu-west-3.amazonaws.com/item/81/main",
        ],
      },
      {
        title: "Amazing digital art",
        price: 10.2,
        images: [
          "https://ak-marketplace.s3.eu-west-3.amazonaws.com/item/81/main",
        ],
      },
      {
        images: [
          "https://ak-marketplace.s3.eu-west-3.amazonaws.com/item/81/main",
        ],
        title: "Amazing digital art",
        price: 10.2,
      },
      {
        images: [
          "https://ak-marketplace.s3.eu-west-3.amazonaws.com/item/81/main",
        ],
        title: "Amazing digital art",
        price: 10.2,
      },
      {
        images: [
          "https://ak-marketplace.s3.eu-west-3.amazonaws.com/item/81/main",
        ],
        title: "Amazing digital art",
        price: 10.2,
      },
      {
        images: [
          "https://ak-marketplace.s3.eu-west-3.amazonaws.com/item/81/main",
        ],
        title: "Amazing digital art",
        price: 10.2,
      },
    ],
    id: 1,
  };
  const total = collection.items.reduce((total, item) => total + item.price, 0);
  return (
    <Layout>
      <Box className={styles.container}>
        <div className={styles.top}>
          <span className={styles.right}>
            <BiArrowBack size={10} />
            {/* <BiRightArrowAlt size={10} /> */}
            Back to collections
          </span>
          <section className={styles.left}>
            <span>Home</span>
            <FiChevronRight size={10} />
            <span>Manage Collection</span>
          </section>
        </div>
        <main>
          <div className={styles.heading}>
            <div className={styles.left}>
              <span> {collection?.status}</span>
              <h2>{collection?.title}</h2>
            </div>

            <div className={styles.right}>
              <button>Payount Funds</button>
              <Link href={`/collection/create?id=${collection?.id}`}>
                <button>
                  Edit Collection Details <BiRightArrowAlt />
                </button>
              </Link>
            </div>
          </div>
          <section className={styles.nav}>
            <span className={styles.active}>Items</span>
            <FiChevronRight size={12} />
            <span>Contriburors</span>
            <FiChevronRight size={12} />
            <span>Whitelist</span>
            <FiChevronRight size={12} />
            <span>Beneficiary</span>
          </section>
          <section className={styles.stats}>
            <div>
              <span>{collection?.items?.length}</span>
              <h3>Collection Items</h3>
            </div>
            <div>
              <span>{total} ETH</span>
              <h3>Total worth of Collection </h3>
            </div>
            {/* <div>
              <span>{sold} ETH</span>
              <h3>Revenue from Items</h3>
            </div> */}
          </section>
          <section>
            <h2></h2>
            <div className={styles.bottom}>
              <div>{/* <ContributorsGrid collection={collection} /> */}</div>
              <div>
                <ItemGrid
                  items={collection.items}
                  title="Manage Collection Items"
                />
              </div>
            </div>
          </section>
        </main>
      </Box>
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const { id }: any = ctx.params;
  // let collection = await CollectionDs.getCollectionById(id);
  // if (!collection) return { notFound: true };

  return {
    props: {
      // collection: collection.data,
    },
  };
};
export default CollectionAdmin;
