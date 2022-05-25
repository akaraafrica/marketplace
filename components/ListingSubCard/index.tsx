import React from 'react'
import './index.module.scss'
import listingsubcardimg from '/assets/listingsubcardimg.png'
import avatar from '/assets/Avator.svg'

function ListingSubCard () {
    return(
        <div className='listingsubcardcon'>
            <div className="listingsubcard">
                <div className="listingsubcardsec1">
                    <img src={listingsubcardimg} />
                </div>
                <div className='listingsubcardsec2'>
                    <p className="listingsubcardsec2heading">ETH never die</p>
                    <div className="listingsubpricesec">
                        <img src={avatar} />
                        <div className="listingcardsec2pricecon">
                        <div className="listingcardsec2price">
                        <p>1.125 ETH</p>
                    </div>
                    </div>
                    <span>3 of 2</span>
                    </div>
                    <div className='listingcardsubsec2btn'>
                        <button>Place a bid</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ListingSubCard