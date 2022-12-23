import React, { useContext } from "react";
import SettingsForm from "../../components/Settings/SettingsForm";
import Layout from "../../components/global/Layout";
import { BiArrowBack } from "react-icons/bi";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import withAuth from "../../HOC/withAuth";
import { GetServerSideProps } from "next";
import { ProfileDs } from "../../ds";
import { IProfile, UProfile } from "../../types/profile.interface";
import { AuthContext } from "../../contexts/AuthContext";
import useSWR, { SWRConfig, unstable_serialize } from "swr";
import { api } from "../../services/apiClient";

const Settings = () => {
  const router = useRouter();
  // const {user} = useContext(AuthContext);

  const id = router.query.id as unknown as number;
  const { data, mutate } = useSWR(["settings", id], () =>
    ProfileDs.fetchSettings(id)
  );

  return (
    <Layout>
      <div className={styles.breadcrumbWrap}>
        <div onClick={() => router.push("/")} className={styles.backButton}>
          <BiArrowBack />
          <p className={styles.backText}>Back</p>
        </div>
        <div className={styles.breadcrumb}>
          <span>Settings</span>
          <span>&gt;</span>
          <span className={styles.currentCrumb}>Settings Main</span>
        </div>
      </div>
      <SettingsForm profile={data} mutate={mutate} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id }: any = ctx.query;
  // let data;
  const data = await ProfileDs.fetchSettings(id);

  return {
    props: {
      fallback: {
        [unstable_serialize(["settings", id])]: data,
      },
    },
  };
};

const Page = ({ fallback }: any) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Settings />
    </SWRConfig>
  );
};
export default withAuth(Page);
