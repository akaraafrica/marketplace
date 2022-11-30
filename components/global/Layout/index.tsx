import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import styles from "./index.module.scss";

interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
}
const Index: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.children}>{children}</div>
      <Footer />
    </div>
  );
};

export default Index;
