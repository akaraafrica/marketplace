import React from 'react'
import './index.module.scss'

function ProfileCard (props:any) {
    return(
        <div>
            <div className="previewcardcontentcon">
              <div className="previewcardimg">
                  <img src={props.ProductImg} />
              </div>
              <div className="previewcardname">
                  <p>{props.Name}</p>
                  <div className="previewcardprice"><p>{props.Price}</p></div>
              </div>
              <div className="previewstockcon">
                <img src={props.Avatar} />
                <p>{props.Stock}</p>
              </div>
              <div className="previewdivider"></div>
              <div className="bidsec">
                <div className="bidsec1">
                  <img src={`/assets/bidicon.svg`} />
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
export default ProfileCard