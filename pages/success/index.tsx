import React from "react";
import styles from "./index.module.scss";
import { BsCheck2Circle } from "react-icons/bs";
import { useRouter } from "next/router";
import OnboardingLayout from "../../components/global/OnboardingLayout";

const Index = () => {
  const router = useRouter();
  return (
    <OnboardingLayout>
      <div className={styles.root}>
        <BsCheck2Circle size={200} color="#f78f21" />
        <h6 className={styles.title}>Successful</h6>
        <p className={styles.text}>
          You have completed you account verification.
        </p>
        {/* <OnboardingButton
          onClick={() => router.push("/login")}
          text="Go to Login"
        /> */}
      </div>
    </OnboardingLayout>
  );
};

export default Index;
