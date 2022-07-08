import styles from "./index.module.scss";
import { IoChevronDownCircleOutline } from "react-icons/io5";

interface CustomSelectProps {
  placeholder: string;
}
const CustomSelect: React.FC<CustomSelectProps> = ({ placeholder }) => {
  return (
    <div className={styles.customInput}>
      <input type="text" placeholder={placeholder} />
      <IoChevronDownCircleOutline size={20} />
    </div>
  );
};

export default CustomSelect;
