import React from "react";
import styles from "./index.module.scss";

interface Props {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const OnboardingButton: React.FC<Props> = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {text}
    </button>
  );
};

export default OnboardingButton;
