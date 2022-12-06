import Image from "next/image";
import styles from "./index.module.scss";

export default function Index({ heading, paragraph }: any) {
  return (
    <section className={styles.main}>
      <Image
        alt="deposit"
        src={`/assets/singleItem/alert.svg`}
        width={50}
        height={50}
      />
      <div>
        <h4>{heading}</h4>
        <p>{paragraph}</p>
      </div>
    </section>
  );
}
