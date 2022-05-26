import React from 'react'
import styles from './index.module.scss'

function ListingSubCard () {
    return(
        <div className={styles.listingsubcardcon}>
            <div className={styles.listingsubcard}>
                <div className={styles.listingsubcardsec1}>
                    <img src={`/assets/listingsubcardimg.png`} />
                </div>
                <div className={styles.listingsubcardsec2}>
                    <p className={styles.listingsubcardsec2heading}>ETH never die</p>
                    <div className={styles.listingsubpricesec}>
                        <img src={`/assets/Avator.svg`} />
                        <div className={styles.listingcardsec2pricecon}>
                        <div className={styles.listingcardsec2price}>
                        <p>1.125 ETH</p>
                    </div>
                    </div>
                    <span>3 of 2</span>
                    </div>
                    <div className={styles.listingcardsubsec2btn}>
                        <button>Place a bid</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ListingSubCard