import React from 'react'
import styles from './index.module.scss'

function FollowingSec (props : any) {
    return(
        <div className={styles.followingseccon}>
            <div className={styles.followingsec}>
                <div className={styles.followingsec1con}>
                    <img src={props.ProfilePhoto} />
                    <div className={styles.followingsec1content}>
                        <h4>{props.Name}</h4>
                        <p>{props.Followers}</p>
                        <button>Unfollow</button>
                    </div>
                </div>
                <div className={styles.followingsec2con}>
                    <img src={props.FollowerImage} />
                    <img src={props.FollowerImage} />
                    <img src={props.FollowerImage} />
                    <img src={props.FollowerImage} />
                </div>
            </div>
        </div>
    );
}
export default FollowingSec