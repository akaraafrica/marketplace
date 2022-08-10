import { GetServerSideProps } from "next";
import React from "react";
import CreateCollectionForm from "../../../components/CreateCollectionForm";
import Layout from "../../../components/Layout";
import { UserDs, CollectionTypeDs } from "../../../ds";
import { ICollectionType } from "../../../types/collection.interface";
import { IUser } from "../../../types/user.interface";

interface CreateCollection {
  users: IUser[];
  collectionTypes: ICollectionType[];
}

const Index: React.FC<CreateCollection> = (props: CreateCollection) => {
  return (
    <Layout>
      <CreateCollectionForm
        users={props.users}
        collectionTypes={props.collectionTypes}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const [users, collectionTypes] = await Promise.all([
    UserDs.fetchAll(),
    CollectionTypeDs.fetchAll(),
  ]);
  console.log(collectionTypes);

  return {
    props: {
      users,
      collectionTypes,
    },
  };
};
export default Index;
