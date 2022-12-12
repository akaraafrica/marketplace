import React, { useContext } from "react";
import SettingsForm from "../../components/Settings/SettingsForm";
import Layout from "../../components/global/Layout";
import { BiArrowBack } from "react-icons/bi";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import withAuth from "../../HOC/withAuth";

const Settings = () => {
  const router = useRouter();

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
      <SettingsForm />
    </Layout>
  );
};
export default withAuth(Settings);
