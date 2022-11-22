import styles from "./Input.module.scss";

type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  errors: any;
  register: any;
};

export default function Input({
  label,
  type,
  required,
  errors,
  placeholder,
  disabled,
  register,
  name,
  ...rest
}: InputProps) {
  return (
    <>
      <div className={styles.main}>
        <label>{label}</label>
        <div className={errors[name] && errors[name] ? styles.error : ""}>
          <div className={styles.input}>
            <input
              {...register(name, { required: required })}
              disabled={disabled}
              placeholder={placeholder}
              type={type}
            />
          </div>
          {errors[name] && errors[name].type === "required" && (
            <span>This field is required</span>
          )}
        </div>
      </div>
    </>
  );
}
