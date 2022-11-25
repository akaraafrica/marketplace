import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import OnboardingSideBar from "../OnboardingSidebar";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const OnboardingLayout = ({ children }: Props) => {
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
        <OnboardingSideBar />
      </div>

      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default OnboardingLayout;
