import React from "react";
import Header from "../../components/Header/index";
import SettingsForm from "../../components/SettingsForm/index";
import Footer from "../../components/Footer/index";
import Layout from "../../components/Layout";
import { BiArrowBack } from "react-icons/bi";
import styles from "./index.module.scss";
import { useRouter } from "next/router";

const Settings = () => {
  //  document.body.style = 'background: black;';
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
export default Settings;
