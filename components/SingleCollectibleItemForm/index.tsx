/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import React from "react";
import styles from "./index.module.scss";
import Switch from "@mui/material/Switch";

function SingleCollectibleItem() {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <div className={styles.sciCon}>
      <div className={styles.sci}>
        <div className={styles.scihead}>
          <h1>Create single collectible item</h1>
        </div>
        <div className={styles.sciuploadseccon}>
          <div className={styles.uploadsechead}>
            <h4>Upload file</h4>
            <p>Drag or choose your file to upload</p>
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
            <select>
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
            <Switch {...label} />
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
        <div className={styles.previewcardcontentcon}>
          <div className={styles.previewcardimg}>
            <img alt="product image" src={`/assets/productimg.png`} />
          </div>
          <div className={styles.previewcardname}>
            <p>Black Golden Tiger</p>
            <div className={styles.previewcardprice}>
              <p>2.45 ETH</p>
            </div>
          </div>
          <div className={styles.previewstockcon}>
            <img alt="avatars" src={`/assets/avatars.png`} />
            <p>3 in stock</p>
          </div>
          <div className={styles.previewdivider}></div>
          <div className={styles.bidsec}>
            <div className={styles.bidsec1}>
              <img alt="bid icon" src={`/assets/bidicon.svg`} />
              <p>
                Highest bid <span>0.001 ETH</span>
              </p>
            </div>
            <div className={styles.bidsec2}>
              <p>New bid 🔥</p>
            </div>
          </div>
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
