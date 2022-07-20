import { useState } from "react";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import styles from "./index.module.scss";

interface CustomSelectProps {
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: string[];
}
const CustomSelect: React.FC<CustomSelectProps> = ({ onChange, options }) => {
  const [value, setValue] = useState("");
  const handleOnChange = (e: any) => {
    setValue(e.target.value);
    onChange!(e);
  };
  return (
    <div className={styles.customInput}>
      <select onChange={(e) => handleOnChange(e)} value={value}>
        {options &&
          options.map((option) => {
            return (
              <option key={option} id={option}>
                {option}
              </option>
            );
          })}
      </select>
      <IoChevronDownCircleOutline size={20} />
    </div>
  );
};

export default CustomSelect;
