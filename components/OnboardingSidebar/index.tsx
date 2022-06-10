/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import React, {useState} from 'react'
import styles from './index.module.scss'
import {AiOutlineTwitter, AiOutlineGoogle} from 'react-icons/ai'
import {TiSocialFacebook} from 'react-icons/ti'

const OnboardingSideBar = () => {
    const [swipe, setSwipe] = useState(false);

  return (
    <div className={styles.sideBar}>
        <img className={styles.image} src={`/assets/Logo.png`} alt='logo' />
        <div className={styles.leftCenter}>
            <h6>Buy and Own <span><span className={styles.emphasis}>Awesome</span> African NFTs</span></h6>
            <p>Welcome to Akara marketplace, you can buy and sell awesome artwork to enjoy cool feature form us.</p>
        </div>
        <div className={styles.leftBottom}>
            <h5 className={styles.title}>AKARA is all about</h5>
            <ul>
                <li className={styles.listItem}><span>Cool African NFTS</span></li>
                <li className={styles.listItem}><span>Meeting New People</span></li>
                <li className={styles.listItem}><span>Simple Exchanges</span></li>
                <li className={styles.listItem}><span>Building interesting communities</span></li>
            </ul>
        </div>
        <div className={styles.icons}>
            <AiOutlineTwitter color='#F78F21'/>
            <TiSocialFacebook color='#ffffff' />
            <AiOutlineGoogle color='#ffffff' />
        </div>
    </div>
  )
}

export default OnboardingSideBar