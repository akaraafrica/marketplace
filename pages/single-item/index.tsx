import React from "react"
import styles from './index.module.scss'
import Header from '../../components/Header/index';
import SingleCollectibleItemForm from '../../components/SingleCollectibleItemForm'
import Footer from '../../components/Footer/index'

const SingleCollectibleItem = () => {
  return (
        <div>
            <Header />
            <SingleCollectibleItemForm />
            <div className={styles.footercon}>
            <Footer />
            </div>
        </div>
  )
}

// export async function getStaticProps() {

//   return {
//   }
// }

export default SingleCollectibleItem
