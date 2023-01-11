import React from "react";
import { string } from "yup/lib/locale";
import styles from "./index.module.scss";

interface Props {
  label: string;
  type: string;
  placeholder: string;
  name: string;
  register: any;
  errors: any;
  autoComplete?: string;
  dataTestId?: string;
}
const OnboardingInput = ({
  label,
  type,
  placeholder,
  name,
  register,
  errors,
  autoComplete,
  dataTestId,
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
          data-testid={dataTestId}
        />
      </div>
      {errors[name] && <span>{errors[name].message}</span>}
    </div>
  );
};

export default OnboardingInput;
