import NextImage from "../Image";
import styles from "./index.module.scss";

interface Verify {
  title: string;
  text: string;
}

const Index: React.FC<Verify> = ({ title, text }) => {
  return (
    <div className={styles.root}>
      <NextImage
        className={styles.image}
        width={200}
        height={100}
        src="/assets/checkmail.png"
        alt="verify email"
      />
      <h6 className={styles.title}>{title}</h6>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Index;
