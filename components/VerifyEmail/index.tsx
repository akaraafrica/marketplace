/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import styles from "./index.module.scss";

interface Verify {
  title: string;
  text: string;
}

const Index: React.FC<Verify> = ({ title, text }) => {
  return (
    <div className={styles.root}>
      <img
        className={styles.image}
        src="/assets/checkmail.png"
        alt="verify email"
      />
      <h6 className={styles.title}>{title}</h6>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Index;
