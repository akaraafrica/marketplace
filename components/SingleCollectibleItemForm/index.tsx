/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import React, { MutableRefObject, useRef, useState } from "react";
import styles from "./index.module.scss";
import Switch from "@mui/material/Switch";
import SwitchComponent from "../SwitchComponent";
import ProfileCard from "../ProfileCard";
import { useForm } from "react-hook-form";

function SingleCollectibleItem() {
  const [foto, setFoto] = useState(null);
  const [state, setState] = useState({
    title: "",
    description: "",
    price: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    if (foto) {
      data.images = [foto];
    }
    console.log(data);
  };

  const target = useRef<HTMLInputElement>(null);
  const handleChange = (e: any) => {
    setFoto(e.target.files[0]);
  };
  return (
    <div className={styles.sciCon}>
      <div className={styles.sci}>
        <div className={styles.scihead}>
          <h1>
            Create single <span>collectible item</span>
          </h1>
        </div>
        <div className={styles.sciuploadseccon}>
          <div className={styles.uploadsechead}>
            <span className={styles.upload}>Upload file</span>
            <span className={styles.drag}>
              Drag or choose your file to upload
            </span>
          </div>
          <div
            onClick={() => target.current?.click()}
            className={styles.sciuploadbox}
          >
            <img alt="upload icon" src={`/assets/uploadicon.svg`} />
            <p>PNG, GIF, WEBP, MP4 or MP3. Max 1Gb.</p>
          </div>
          <input
            style={{ display: "none" }}
            type="file"
            ref={target}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.itemdetailsformcon}
        >
          <h4>Item Details</h4>
          <div className={styles.itemdetailsforminput}>
            <label>ITEM NAME</label>
            <input
              type="text"
              placeholder='e. g. "Redeemable Bitcoin Card with logo"'
              {...register("title", { required: true })}
              name="title"
              onChange={(e) =>
                setState({ ...state, [e.target.name]: e.target.value })
              }
            />
            {errors.title && <span>This field is required</span>}
          </div>
          <div className={styles.itemdetailsforminput}>
            <label>Description</label>
            <input
              type="text"
              placeholder='e. g. “After purchasing you will able to recived the logo...”"'
              {...register("description", { required: true })}
              name="description"
              onChange={(e) =>
                setState({ ...state, [e.target.name]: e.target.value })
              }
            />
            {errors.description && <span>This field is required</span>}
          </div>
          <div className={styles.itemdetailsforminput}>
            <label>BLOCKCHAIN</label>
            <select
              {...register("blockchain", { required: true })}
              defaultValue="Ethereum"
              defaultChecked={true}
            >
              <option>Ethereum</option>
              <option>Bitcoin</option>
              <option>Solana</option>
            </select>
          </div>
          <div className={styles.itemdetailformdropdownsCon}>
            <div className={styles.itemdetailsformdropdown}>
              <label>ROYALTIES</label>
              <select {...register("royalties")}>
                <option>10%</option>
                <option>15%</option>
                <option>20%</option>
              </select>
            </div>
            <div className={styles.itemdetailsforminput1}>
              <label>GAS ESTIMATE</label>
              <input type="number" placeholder="10" {...register("gas", {})} />
            </div>
            <div className={styles.itemdetailsforminput1}>
              <label>PRICE</label>
              <input
                type="number"
                placeholder="2.45 ETH"
                {...register("price", { required: true })}
                name="price"
                onChange={(e) =>
                  setState({ ...state, [e.target.name]: e.target.value })
                }
              />
              {errors.price && <span>This field is required</span>}
            </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.putonscalesec}>
            <div className={styles.putonscalesec1}>
              <h4>Put on sale</h4>
              <p>You’ll receive bids on this item</p>
            </div>
            <label className={styles.switch}>
              <input type="checkbox" {...register("published", {})} />
              <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
          </div>
          <div className={styles.putonscalebtnsec}>
            <button type="submit">
              Create item
              <span>
                <img src={`/assets/arrow.svg`} alt="" />
              </span>
            </button>
            <p>Auto saving</p>
          </div>
        </form>
      </div>
      <div className={styles.previewCard}>
        <div className={styles.previewheading}>
          <h1>Preview</h1>
        </div>
        <div className={styles.previewcontent}>
          <img
            className={styles.previewimg}
            src={
              foto ? URL.createObjectURL(foto) : `/assets/placeholder-image.jpg`
            }
            alt="preview"
          />
          <div className={styles.previewdiv}>
            <div className={styles.previewtitle}>
              {state.title ? state.title : "Amazing digital art"}
            </div>
            <span className={styles.previewprice}>
              {state.price ? state.price : "0.00"} ETH
            </span>
          </div>
          <div className={styles.previewdiv}>
            <div className={styles.avatars}>
              <img alt="avatar" src={`/assets/auctionAvatar.png`} />
              <img alt="avatar" src={`/assets/auctionAvatar.png`} />
              <img alt="avatar" src={`/assets/auctionAvatar.png`} />
            </div>
            <div>3 in stock</div>
          </div>
          <hr />
          <div className={styles.bidsec}>
            <div className={styles.bidsec1}>
              <img alt="bid icon" src={`/assets/bidicon.svg`} />
              <span>
                Highest bid <span>0.01</span>
              </span>
            </div>
            <div className="bidsec2">
              <span>New bid</span>
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
