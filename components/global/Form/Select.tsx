import styles from "./select.module.scss";
type Prop = {
  label: string;
  error?: string;
  name: string;
  disabled?: boolean;
  errors: any;
  register: any;
  data: string[] | undefined;
};

export default function Select({
  register,
  name,
  label,
  errors,
  data,
  ...rest
}: Prop) {
  return (
    <div className={styles.main}>
      <label>{label}</label>
      <div
        className={errors && errors[name] && errors[name] ? styles.error : ""}
      >
        <select {...rest} {...register(name, { required: true })}>
          <option value="" selected disabled hidden>
            {label}
          </option>
          {data?.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
        {errors[name] && errors[name].type === "required" && (
          <span>This field is required</span>
        )}
      </div>
    </div>
  );
}
