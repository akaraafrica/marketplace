import React from 'react'
import styles from './index.module.scss'

function Footer () {
    return(
        <div className={styles.footercon}>
            <div className={styles.footer}>
                <div className={styles.footersec1}>
                    <img src="/assets/Logo.png" />
                    <div className={styles.footersec1text}>
                    <p>Copyright © 2020 Akara Marketplace</p>
                    <p>All rights reserved</p>
                    </div>
                </div>
                <div className={styles.footersec2}>
                    <h4>Company</h4>
                    <div className={styles.footersec2text}>
                    <p>Open Sea</p>
                    <p>Contact us</p>
                    </div>
                </div>
                <div className={styles.footersec3}>
                    <h4>Support</h4>
                    <div className={styles.footersec3text}>
                    <p>F.A.Q</p>
                    <p>Terms of service</p>
                    <p>Privacy policy</p>
                    </div>
                </div>
                <div className={styles.footersec4}>
                    <h4>Social Platforms</h4>
                    <div className={styles.socialicons}>
                        <img src="/assets/instagramicon.svg" />
                        <img src={`/assets/socialicon.svg`} />
                        <img src={`/assets/twittericon.svg`} />
                        <img src={`/assets/youtubeicon.svg`} />
                    </div>
                    <div className={styles.footersec4btn}>
                        <button>Join Our Slack Community</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Footer