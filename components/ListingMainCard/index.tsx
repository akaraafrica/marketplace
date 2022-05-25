import React from 'react'
import './index.module.scss'
import listingmaincardimg from '/assets/listingcardimg.png'
import avatar from '/assets/Avator.svg'

function ListingMainCard () {
    return(
        <div className="listingmaincardcon">
            <div className="listingmaincard">
                <div className="listingmaincardsec1">
                    <img src={listingmaincardimg} />
                </div>
                <div className="listingmaincardcontentcon">
                <div className="listingmaincardsec1contentcon">
                    <img src={avatar} />
                    <div className='listingcardsec1content'>
                        <h4>The future of ETH®</h4>
                        <p>18 in stock</p>
                    </div>
                </div>
                <div className="listingcardsec2content">
                    <p>Highest bid</p>
                    <div className="listingcardsec2price">
                        <p>1.125 ETH</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
export default ListingMainCard