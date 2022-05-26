import React from 'react'
import styles from './index.module.scss'
import avatar from '/assets/Avator.svg'

function HotCollectionCard () {
    return(
        <div className={styles.hotcollectioncardcon}>
            <div className={styles.hotcollectionseccon}>
                <div className={styles.hotcollectionsec1}>
                </div>
                <div className={styles.hotcollectionsec2con}>
                    <div className={styles.hotcollectionsec2}></div>
                    <div className={styles.hotcollectionsec2}></div>
                    <div className={styles.hotcollectionsec2}></div>
                </div>
                <div className={styles.hotcollectionsec3con}>
                    <h2>Awesome collection</h2>
                    <div className={styles.hotcollectionsec3contentcon}>
                        <div className={styles.artist}>
                            <img src={`/assets/Avator.svg`} />
                            <p>By Tyrese Littel</p>
                        </div>
                        <div className={styles.quantity}>
                            <p>28 items</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HotCollectionCard