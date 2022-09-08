import React from "react";
import styles from "./index.module.scss";
import SingleCollectibleItemForm from "../../../components/SingleItemForm";
import Layout from "../../../components/Layout";
// import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";
import { ItemDs } from "../../../ds";
import { GetServerSideProps } from "next";
import { IItem } from "../../../types/item.interface";
import withAuth from "../../../HOC/withAuth";

const SingleCollectibleItem = ({ item }: { item: IItem }) => {
  return (
    <Layout>
      <SingleCollectibleItemForm item={item} />
    </Layout>
  );
};

export default withAuth(SingleCollectibleItem);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const itemId = ctx.query?.id;

  let [Item] = await Promise.all([ItemDs.getData()]);
  let item = Item ? Item.find((i: any) => i.id == Number(itemId)) : null;
  return {
    props: {
      item,
    },
  };
};
