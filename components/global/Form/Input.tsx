import styles from "./input.module.scss";

type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  error?: any;
  name: string;
  required?: boolean;
  disabled?: boolean;
  errors?: any;
  register?: any;
  onChange?: any;
  value?: any;
};

export default function Input({
  label,
  type = "text",
  required,
  errors,
  placeholder,
  disabled,
  register,
  name,
  error,
  onChange,
  value,
  ...rest
}: InputProps) {
  // console.log("error", error);

  return (
    <>
      <div className={styles.main}>
        <label>{label}</label>
        {register ? (
          <div
            className={
              errors && errors[name] && errors[name] ? styles.error : ""
            }
          >
            <div className={styles.input}>
              <input
                {...register(name, { required: required })}
                type={type}
                disabled={disabled}
                placeholder={placeholder}
                {...rest}
              />
            </div>
            {errors[name] && errors[name].type === "required" && (
              <span>This field is required</span>
            )}
          </div>
        ) : (
          <div
            className={
              errors && errors[name] && errors[name].type === "required"
                ? styles.error
                : ""
            }
          >
            <div className={styles.input}>
              <input
                type={type}
                onChange={onChange}
                value={value}
                disabled={disabled}
                placeholder={placeholder}
                {...rest}
              />
            </div>
            {errors && errors[name] && errors[name].type === "required" && (
              <span>This field is required</span>
            )}
          </div>
        )}
      </div>
    </>
  );
}
