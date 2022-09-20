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
        users={props.users}
        collectionTypes={props.collectionTypes}
        collection={props.collection}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id }: any = ctx.query;

  let collection;
  if (id) {
    collection = await CollectionDs.getCollectionById(id);
  }
  const [users, collectionTypes] = await Promise.all([
    UserDs.fetchAll(),
    CollectionTypeDs.fetchAll(),
  ]);

  return {
    props: {
      users,
      collectionTypes,
      collection: collection?.data,
    },
  };
};
export default withAuth(Index);
