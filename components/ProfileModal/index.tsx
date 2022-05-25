import React from 'react'
import styles from './index.module.scss'

function ProfileModal () {
    return(
        <div className={styles.profilemodalcon}>
             <div className={styles.tooltipiconcon}>
            <img className={styles.tooltipicon} src={`/assets/toolTipIcon.svg`} />
            </div>
            <div className={styles.profilemodal}>
                <div className={styles.profilemodalhead}>
                    <h1>Sarah Shaibu</h1>
                    <div className={styles.profilemodalheadsec2}>
                        <p>0xc4c16ab5ac7d...b21a</p>
                        <img src={`/assets/copyicon.svg`} />
                    </div>
                </div>
                <div className={styles.balancecard}>
                    <div className={styles.balancecardsec1}>
                        <img src={`/assets/balancecardimg.svg`} />
                    </div>
                    <div className={styles.balancecardsec2}>
                        <p>Balance</p>
                        <h1>4.689 ETH</h1>
                    </div>
                </div>
                <div className={styles.profilemodallistcon}>
                    <div className={styles.profilemodallist}>
                        <img src={`/assets/usericon.svg`} />
                        <p>My Profile</p>
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.profilemodallist}>
                        <img src={`/assets/collectionicon.svg`} />
                        <p>My Collections</p>
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.profilemodallist}>
                        <img src={`/assets/settingsicon.svg`} />
                        <p>Settings</p>
                    </div>
                    <div className={styles.line}></div>
                     <div className={styles.profilemodallist}>
                        <img src={`/assets/logout.svg`} />
                        <p>Log Out</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProfileModal