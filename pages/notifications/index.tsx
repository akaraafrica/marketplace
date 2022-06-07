import React from 'react'
import styles from './index.module.scss'
import Footer from '../../components/Footer/index'
import Header from '../../components/Header/index'
import {BiArrowBack} from 'react-icons/bi'
import { useRouter } from 'next/router'

interface ListItemProps {
    title: string,
    subTitle: string,
    date: string
}
const ListItem: React.FC<ListItemProps> = ({title, subTitle, date}) => (
    <div className={styles.listItem}>
        <div className={styles.left}>
            <img className={styles.avatar} src="/assets/avatar.png" alt="" />
            <div className={styles.desc}>
                <div className={styles.title}>{title}</div>
                <p className={styles.sub}>{subTitle}</p>
                <span className={styles.date}>{date}</span>
            </div>
        </div>
        <span className={styles.dot}></span>
    </div>
)

const Index = () => {
    const router = useRouter()
  return (
    <div className={styles.root}>
        <Header />
        <div className={styles.breadcrumbWrap}>
            <div onClick={() => router.push('/')} className={styles.backButton}>
                <BiArrowBack />
                <p className={styles.backText}>Back to home</p>
            </div>
            <div className={styles.breadcrumb}>
                <span>Profile</span>
                <span>&gt;</span>
                <span>Notification</span>
            </div>
        </div>
        <div className={styles.notification}>
            <div className={styles.top}>
                <h3>Notification</h3>
                <div className={styles.markButton}>
                    <p className={styles.markText}>Mark all as read</p>
                </div>
            </div>
            <div className={styles.nav}>
                <span className={styles.navItem}>Latest</span>
                <span>Unread</span>
                <span>All notifications</span>
            </div>
            <div className={styles.list}>
                <ListItem title='UI8' subTitle='started following you' date='2 days ago' />
                <ListItem title='UI8' subTitle='started following you' date='2 days ago' />
                <ListItem title='UI8' subTitle='started following you' date='2 days ago' />
                <ListItem title='UI8' subTitle='started following you' date='2 days ago' />
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Index