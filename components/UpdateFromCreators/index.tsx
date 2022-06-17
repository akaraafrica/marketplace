import React from "react";
import styles from "./index.module.scss";

function UpdateFromCreators() {
  return (
    <div className={styles.updatefromcreatorscon}>
      <div className={styles.updatefromcreateor}>
        <div className={styles.updatefromcreatorsec1}>
          <div className={styles.updatefromcreatornum}>
            <p>2</p>
          </div>
        </div>
        <div className={styles.updatefromcreatorsec2}>
          <h4>Payton Harris</h4>
          <p>
            2.456<span>ETH</span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default UpdateFromCreators;
