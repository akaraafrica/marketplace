import Box from "@mui/material/Box";
import { useContext, useState } from "react";
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
import LunchTimeDialog from "../../../components/LunchTimeDialog";
import PayoutDialog from "../../../components/PayoutDialog";

const CollectionAdmin = ({ collection }: { collection: ICollection }) => {
  const total = collection.items.reduce((total, item) => total + item.price, 0);
  const [openLunchTime, setOpenLunchTime] = useState(false);
  // const [openPayout, setOpenPayout] = useState(false);
  const handleClose = () => {
    setOpenLunchTime(false);
    // setOpenPayout(false);
  };
  return (
    <Layout>
      <LunchTimeDialog
        collectionId={collection.id}
        handleClose={handleClose}
        open={openLunchTime}
      />
      {/* <PayoutDialog
        collection={collection}
        handleClose={handleClose}
        open={openPayout}
      /> */}
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
              {/* <Link href={`/collection/create?id=${collection?.id}`}> */}
              <button onClick={() => setOpenLunchTime(true)}>
                Edit Collection Details <BiRightArrowAlt />
              </button>
              {/* </Link> */}
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
  const { id }: any = ctx.params;
  let collection = await CollectionDs.getCollectionById(id);
  if (!collection.data) return { notFound: true };

  return {
    props: {
      collection: collection.data,
    },
  };
};
export default CollectionAdmin;
