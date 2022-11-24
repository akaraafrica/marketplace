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
      <select {...rest} {...register(name)}>
        {data?.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
