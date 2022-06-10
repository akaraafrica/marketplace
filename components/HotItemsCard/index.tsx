/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance

import React from 'react'
import avators from '/assets/avatars.png'

function HotItemCard (props: any) {
    return(
        <div>
            <div className="previewcardcontentcon">
              <div className="previewcardimg">
                  <img alt="product image" src={props.ProductImg} />
              </div>
              <div className="previewcardname">
                  <p>{props.Name}</p>
                  <div className="previewcardprice"><p>{props.Price}</p></div>
              </div>
              <div className="previewstockcon">
                <img alt="avatar" src={props.Avatar} />
                <p>{props.Stock}</p>
              </div>
              <div className="previewdivider"></div>
              <div className="bidsec">
                <div className="bidsec1">
                  <img alt="bid icon" src={`/assets/bidicon.svg`} />
                  <p>Highest bid <span>{props.HighestBid}</span></p>
                </div>
                <div className="bidsec2">
                  <p>New bid 🔥</p>
                </div>
              </div>
          </div>
        </div>
    );
}
export default HotItemCard