import React from "react";
import SingleCollectibleItemForm from "../../../components/CreateItem/CreateItem";
import Layout from "../../../components/Layout";
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
  const itemId = ctx?.query?.id;
  if (itemId) {
    let item = await ItemDs.getItem(itemId);
    return {
      props: {
        item,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
