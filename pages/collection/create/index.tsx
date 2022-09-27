import { GetServerSideProps } from "next";
import React from "react";
import CreateCollectionForm from "../../../components/CreateCollectionForm";
import Layout from "../../../components/Layout";
import { UserDs, CollectionTypeDs, CollectionDs } from "../../../ds";
import withAuth from "../../../HOC/withAuth";
import {
  ICollection,
  ICollectionType,
} from "../../../types/collection.interface";
import { IUser } from "../../../types/user.interface";

interface CreateCollection {
  users: IUser[];
  collectionTypes: ICollectionType[];
  collection: ICollection;
}

const Index: React.FC<CreateCollection> = (props: CreateCollection) => {
  return (
    <Layout>
      <CreateCollectionForm
        collectionTypes={props.collectionTypes}
        collection={props.collection}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id }: any = ctx.query;

  const [collectionTypes, collection] = await Promise.all([
    // UserDs.fetchAll(),
    CollectionTypeDs.fetchAll(),
    CollectionDs.getCollectionById(id),
  ]);

  return {
    props: {
      collectionTypes,
      collection: collection?.data,
    },
  };
};
export default Index;
