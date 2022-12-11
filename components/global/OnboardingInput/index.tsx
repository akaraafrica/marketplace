import React from "react";
import styles from "./index.module.scss";

interface Props {
  label: string;
  type: string;
  placeholder: string;
  name: string;
  register: any;
  errors: any;
  autoComplete?: string;
}
const OnboardingInput = ({
  label,
  type,
  placeholder,
  name,
  register,
  errors,
  autoComplete,
}: Props) => {
  return (
    <div className={errors && errors[name] && errors[name] ? styles.error : ""}>
      <div className={styles.input}>
        <label htmlFor={label}>{label}</label>
        <input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          name={name}
          autoComplete={autoComplete}
        />
      </div>
      {errors[name] && <span>{errors[name].message}</span>}
    </div>
  );
};

export default OnboardingInput;
