/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import React from "react";
import styles from "./index.module.scss";
import Switch from "@mui/material/Switch";
import SwitchComponent from "../SwitchComponent";
import ProfileCard from "../ProfileCard";

function SingleCollectibleItem() {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <div className={styles.sciCon}>
      <div className={styles.sci}>
        <div className={styles.scihead}>
          <h1>
            Add single collectible <span>to collection</span>
          </h1>
        </div>
        <div className={styles.sciuploadseccon}>
          <div className={styles.uploadsechead}>
            <span className={styles.upload}>Upload file</span>
            <span className={styles.drag}>
              Drag or choose your file to upload
            </span>
          </div>
          <div className={styles.sciuploadbox}>
            <img alt="upload icon" src={`/assets/uploadicon.svg`} />
            <p>PNG, GIF, WEBP, MP4 or MP3. Max 1Gb.</p>
          </div>
        </div>
        <div className={styles.itemdetailsformcon}>
          <h4>Item Details</h4>
          <div className={styles.itemdetailsforminput}>
            <label>ITEM NAME</label>
            <input
              type="text"
              placeholder='e. g. "Redeemable Bitcoin Card with logo"'
            />
          </div>
          <div className={styles.itemdetailsforminput}>
            <label>Description</label>
            <input
              type="text"
              placeholder='e. g. “After purchasing you will able to recived the logo...”"'
            />
          </div>
          <div className={styles.itemdetailsforminput}>
            <label>BLOCKCHAIN</label>
            <select defaultChecked={true}>
              <option selected disabled>
                Blockchain
              </option>
              <option>sample</option>
              <option>sample</option>
            </select>
          </div>
          <div className={styles.itemdetailformdropdownsCon}>
            <div className={styles.itemdetailsformdropdown}>
              <label>ROYALTIES</label>
              <select>
                <option>10%</option>
                <option>sample</option>
                <option>sample</option>
              </select>
            </div>
            <div className={styles.itemdetailsforminput1}>
              <label>GAS ESTIMATE</label>
              <input type="text" placeholder="10" />
            </div>
            <div className={styles.itemdetailsforminput1}>
              <label>PRICE</label>
              <input type="text" placeholder="2.45 ETH" />
            </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.putonscalesec}>
            <div className={styles.putonscalesec1}>
              <h4>Put on sale</h4>
              <p>You’ll receive bids on this item</p>
            </div>
            <SwitchComponent sx={{ m: 1, width: "56px" }} defaultChecked />
          </div>
          <div className={styles.putonscalebtnsec}>
            <button>
              Create item
              <span>
                <img src={`/assets/arrow.svg`} alt="" />
              </span>
            </button>
            <p>Auto saving</p>
          </div>
        </div>
      </div>
      <div className={styles.previewCard}>
        <div className={styles.previewheading}>
          <h1>Preview</h1>
        </div>
        <div className={styles.previewcontent}>
          <ProfileCard
            ProductImg={`/assets/productimg.png`}
            Name="Amazing digital art"
            Price="2.45 ETH"
            Stock="3 in stock"
            Avatar={`/assets/auctionAvatar.png`}
            HighestBid="0.001 ETH"
          />
          <div className={styles.clearsec}>
            <img alt="close icon" src={`/assets/closeicon.svg`} />
            <p>Clear all</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SingleCollectibleItem;
