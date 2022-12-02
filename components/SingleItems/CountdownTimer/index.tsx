import React from "react";
import { useCountdown } from "../../../hooks/useCountdown";
import styles from "./index.module.scss";

const DateTimeDisplay = ({ value, type }: any) => {
  return (
    <div className={styles.countdown}>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
};
const ShowCounter = ({ days, hours, minutes, seconds }: any) => {
  return (
    <div className={styles.showCounter}>
      <div className={styles.countdownLink}>
        <DateTimeDisplay value={days} type={"Days"} />
        <p>:</p>
        <DateTimeDisplay value={hours} type={"Hours"} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={"Mins"} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={"Seconds"} />
      </div>
    </div>
  );
};

const CountdownTimer = ({ targetDate }: any) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  return (
    <ShowCounter
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
    />
  );
};

export default CountdownTimer;
