import Image from "next/image";
import React from "react";
import styles from "./button.module.scss";
type Prop = {
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  customStyle?: {};
};

export default function Button({
  children,
  loading,
  disabled,
  customStyle,
  ...rest
}: Prop) {
  return (
    <div className={styles.main}>
      <button {...rest} disabled={disabled || loading} style={customStyle}>
        {loading ? (
          <Image
            width="20px"
            height="20px"
            className={styles.spinner}
            src={`/assets/singleItem/spinner.svg`}
            alt=""
          />
        ) : (
          children
        )}
      </button>
    </div>
  );
}
