import React from 'react'
import ListingSubCard from './index';
import styles from "./index.module.scss";

const data = [
    {
        "image": "/assets/01.png",
        "avatar": "/assets/Avator.svg",
        "text": "2.135 ETH",
        "text1": "33 in stock",
        "title": 'Future coming soon'
    },
    {
        "image": "/assets/listingcardimg.png",
        "avatar": "/assets/Avator.svg",
        "text": "4.022 ETH",
        "text1": "05 in stock",
        "title": "ETH never die"
    },
    {
        "image": "/assets/balancecardimg.svg",
        "avatar": "/assets/Avator.svg",
        "text": "1.597 ETH",
        "text1": "120 in stock",
        "title": "Elon Musk silver coin"
    },
    {
        "image": "/assets/listingcardimg.png",
        "avatar": "/assets/Avator.svg",
        "text": "0.499 ETH",
        "text1": "19 in stock",
        "title": "Larger than life"
    },
    {
        "image": "/assets/listingcardimg.png",
        "avatar": "/assets/Avator.svg",
        "text": "0.126 ETH",
        "text1": "12 in stock" ,
        "title": "Filtered with coins"      
    }
]

function ListingSubCardDynamic() {
    console.log('Welcome')
  return (
    <div className={styles.show} >
      {
        data.slice(0,3).map((item,i)=>(
            <div key={i} className={styles.show}>

                <ListingSubCard image={item.image} avatar={item.avatar} value={item.text} number={item.text1} title={item.title} />  
                </div>
        ))
      }
    </div>
  )
}

export default ListingSubCardDynamic