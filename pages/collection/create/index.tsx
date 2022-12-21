import { GetServerSideProps } from "next";
import React from "react";
import CreateCollectionForm from "../../../components/CreateCollectionForm";
import Layout from "../../../components/global/Layout";
import { CollectionDs } from "../../../ds";
import withAuth from "../../../HOC/withAuth";
import { ICollection } from "../../../types/collection.interface";

interface CreateCollection {
  collection: ICollection;
}

const Index: React.FC<CreateCollection> = (props: CreateCollection) => {
  return (
    <Layout>
      <CreateCollectionForm collection={props.collection} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id }: any = ctx.query;

  let collection;
  if (id) {
    collection = await CollectionDs.getCollectionById(id);
  }
  return {
    props: {
      collection: collection,
    },
  };
};
export default withAuth(Index);
