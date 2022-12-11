import Image from "next/image";
import React from "react";
import styles from "./button.module.scss";
type Prop = {
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  customStyle?: {};
  onClick?: () => void;
  type?: "button" | "reset" | "submit" | undefined;
};

export default function Button({
  children,
  loading,
  onClick,
  disabled,
  customStyle,
  type,
  ...rest
}: Prop) {
  return (
    <div className={styles.main}>
      <button
        onClick={onClick}
        {...rest}
        disabled={disabled || loading}
        style={customStyle}
        className={styles.btn}
        type={type}
      >
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
