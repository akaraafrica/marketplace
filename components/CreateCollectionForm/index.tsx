import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { useForm } from "react-hook-form";
import NextImage from "../Image";
import DefaultAvatar from "../DefaultAvatar";
import { IUser } from "../../types/user.interface";
import { toast } from "react-toastify";

const Index = ({
  users,
  collectionTypes,
}: {
  users: any[];
  collectionTypes: any[];
}) => {
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [selectedUser, setSelectedUser] = useState<IUser[]>([]);
  const [resultDisplay, setResultDisplay] = useState(false);
  const [items, setItems] = useState([]);

  console.log(users);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    // setOpenDialog(true);
  };

  const title = watch("title", "");
  const price = watch("price", "");

  const handleChange = (event: any) => {
    const file = event.target.files[0];
    if (!file) return;
    const videoFile = URL.createObjectURL(file);
    setVideo(videoFile);
  };
  const clearState = () => {
    setPhotos([]);
    reset();
  };

  console.log(collectionTypes);
  return (
    <div className={styles.root}>
      <div className={styles.sciCon}>
        <div className={styles.sci}>
          <div className={styles.scihead}>
            <h1>Create new collection</h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.itemdetailsformcon}
          >
            <h4>Collection Details</h4>
            <div className={styles.uploadsechead}>
              <h4 className={styles.upload}>Upload Video Section</h4>
              <span className={styles.drag}>
                Drag or choose your file to upload
              </span>
            </div>
            <input
              style={{
                display: "block",
                backgroundColor: "#f2994a",
                width: "200px",
                color: "#fff",
              }}
              type="file"
              accept="video/*"
              onChange={(event) => {
                handleChange(event);
              }}
            />
            <div className={styles.itemdetailsforminput}>
              <label>COLLECTION NAME</label>
              <input
                type="text"
                placeholder='e. g. "Redeemable Bitcoin Card with logo"'
                {...register("title", { required: true })}
              />
              {errors.title && <span>This field is required</span>}
            </div>
            <div className={styles.itemdetailsforminput}>
              <label>DESCRIPTION</label>
              <input
                type="text"
                placeholder='e. g. “After purchasing you will able to recived the logo...”"'
                {...register("description", { required: true })}
              />
              {errors.description && <span>This field is required</span>}
            </div>
            <div className={styles.itemdetailsforminput}>
              <label>COLLECTION TYPE</label>
              <select {...register("collectionType", { required: true })}>
                {collectionTypes &&
                  collectionTypes.map((collectionType, index) => (
                    <option key={index} value={collectionType}>
                      {collectionType.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className={styles.itemdetailformdropdownsCon}>
              <div className={styles.itemdetailsformdropdown}>
                <label>COUNT DOWN FROM</label>
                <input
                  type="text"
                  placeholder="12-03-2022"
                  onFocus={(e) => (e.target.type = "date")}
                  {...register("countdown", {})}
                />
              </div>
              <div className={styles.itemdetailsforminput1}>
                <label>COLLECTION STOCK</label>
                <input
                  type="number"
                  placeholder="1"
                  {...register("stock", {})}
                />
              </div>
              <div className={styles.itemdetailsforminput1}>
                <label>PRICE</label>
                <input
                  type="number"
                  placeholder="2.45 ETH"
                  min="0"
                  step="0.01"
                  {...register("price", { required: true })}
                />
                {errors.price && <span>This field is required</span>}
              </div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.itemdetailsforminputSearch}>
              <label>SEARCH TO SELECT CONTRIBUTORS</label>
              <input
                type="text"
                name="Search"
                placeholder="Search users"
                onChange={(e) => {
                  setResultDisplay(true);
                  setSearchUser(e.target.value);
                }}
              />
              <div
                style={{ display: `${resultDisplay ? "flex" : "none"}` }}
                className={styles.searchResults}
              >
                {searchUser &&
                  users &&
                  users
                    .filter((user) => user.walletAddress.includes(searchUser))
                    .map((user, index) => (
                      <span
                        key={index}
                        onClick={() => {
                          for (let i = 0; i < selectedUser.length; i++) {
                            if (
                              selectedUser[i].walletAddress ===
                              user.walletAddress
                            ) {
                              toast.warning("User already selected");
                              return;
                            }
                          }
                          setSelectedUser([...selectedUser, user]);
                          setResultDisplay(false);
                        }}
                      >
                        {user.walletAddress && user.walletAddress}
                      </span>
                    ))}
              </div>
              <div className={styles.itemImagesDiv}>
                {selectedUser.map((user, index) => (
                  <div key={index} className={styles.userImage}>
                    <div
                      className={styles.closeIcon}
                      onClick={() =>
                        setSelectedUser([
                          ...selectedUser.slice(0, index),
                          ...selectedUser.slice(index + 1, selectedUser.length),
                        ])
                      }
                    >
                      <NextImage
                        width="30px"
                        height="30px"
                        alt="close icon"
                        src={`/assets/closeicon.svg`}
                      />
                    </div>
                    <DefaultAvatar
                      fontSize=".6rem"
                      url={user.profile && user.profile.avatar}
                      walletAddress={user.walletAddress}
                      width="56px"
                      height="56px"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.itemdetailsforminputSearch}>
              <label>SELECT ITEMS FROM GALLERY</label>
              <input type="text" name="Search" placeholder="Search items" />
              <div className={styles.itemImagesDiv}>
                {}
                <div>
                  <NextImage
                    src="/assets/productimg3.png"
                    width="112px"
                    height="88px"
                  />
                </div>
              </div>
            </div>
            <div className={styles.addItem}>
              <h4>Add to Collection</h4>
              <span>Upload New Items to Collection</span>
            </div>
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
                Create collection
                <span>
                  <NextImage
                    width="20px"
                    height="10px"
                    src={`/assets/arrow.svg`}
                    alt=""
                  />
                </span>
              </button>
              {/* <p>Auto saving</p> */}
            </div>
          </form>
        </div>
        <div className={styles.previewCard}>
          <div className={styles.previewheading}>
            <h1>Preview</h1>
          </div>
          <div className={styles.previewcontent}>
            <NextImage
              src={
                photos[0]
                  ? URL.createObjectURL(photos[0])
                  : `/assets/placeholder-image.jpg`
              }
              width="256px"
              height="303px"
              className={styles.previewimg}
            />

            <div className={styles.previewdiv}>
              <div className={styles.previewtitle}>
                {title ? title : "Amazing digital art"}
              </div>
              <span className={styles.previewprice}>
                {price ? price : "0.00"} ETH
              </span>
            </div>
            {/* <div className={styles.previewdiv}>
            <div className={styles.avatars}>
              <img alt="avatar" src={`/assets/auctionAvatar.png`} />
              <img alt="avatar" src={`/assets/auctionAvatar.png`} />
              <img alt="avatar" src={`/assets/auctionAvatar.png`} />
            </div>
            <div>{state.stock ? state.stock : "0"} in stock</div>
          </div> */}
            <hr />
            <div className={styles.bidsec}>
              <div className={styles.bidsec1}>
                <NextImage
                  width="20px"
                  height="20px"
                  alt="bid icon"
                  src={`/assets/bidicon.svg`}
                />
                <span>
                  Highest bid <span>0.00</span>
                </span>
              </div>
              <div className="bidsec2">
                <span>New bid</span>
              </div>
            </div>
            <div className={styles.clearsec} onClick={() => clearState()}>
              <NextImage
                width="20px"
                height="20px"
                alt="close icon"
                src={`/assets/closeicon.svg`}
              />
              <span>Clear all</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
