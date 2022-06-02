import React from 'react'
import styles from './index.module.scss'

function SubscribeModal () {
    return(
        <div className={styles.subscribemodalcon}>
                <div className={styles.subscribemodalhead}>
                    <h1>Be notified on new collections</h1>
                    <p>We recommended you to subscribe to our Akara newsletter, enter your email below to be notified when have new stuff</p>
                </div>
                <div className={styles.subscribemodalinput}>
                    <input type="email" placeholder='Enter your email address' />
                    <button>Subscribe now</button>
                </div>
        </div>
    );
}
export default SubscribeModal