import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OnboardingSidebar from "../../components/OnboardingSidebar";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const OnboardingLayout: React.FC<Props> = ({ children }) => {
  const [slide, setSlide] = useState<Boolean>(false);
  useEffect(() => {
    if (window.innerWidth <= 600 || !slide) {
      setSlide(false);
    } else {
      setSlide(true);
    }
  }, [slide]);

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <OnboardingSidebar />
      </div>

      <div className={styles.children}>{children}</div>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default OnboardingLayout;
