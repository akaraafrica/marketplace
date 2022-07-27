import Image from "next/image";
import styles from "./QuickButtons.module.scss";
export default function QuickButtons({ desktop }: any) {
  return (
    <div className={desktop ? styles.horizontal : styles.main}>
      <div className={styles.close}>
        <Image src="/assets/singleItem/close.svg" width={40} height={40} />
      </div>
      <Image src="/assets/singleItem/share.svg" width={40} height={40} />
      <div className={styles.love}>
        <Image src="/assets/singleItem/love.svg" width={25} height={25} />
      </div>
      <div className={styles.option}>
        <Image
          src="/assets/singleItem/option.svg"
          width={38}
          height={desktop ? 45 : 30}
        />
      </div>
    </div>
  );
}
