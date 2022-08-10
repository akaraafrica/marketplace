/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { useForm } from "react-hook-form";
import MintTokenDialog from "./MintTokenDialog";
import { toast } from "react-toastify";
import { getFileUploadURL } from "../../utils/upload/fileUpload";
import dynamic from "next/dynamic";
import { ItemDs } from "../../ds";
import Image from "next/image";
import itemDs from "../../ds/item.ds";
const ReactQuill: any = dynamic(() => import("react-quill"), { ssr: false });
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: ["#353945"] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
];

function SingleCollectibleItem() {
  const [images, setImages] = useState({
    main: null,
    optional1: null,
    optional2: null,
    optional3: null,
  });
  const [state, setState] = useState({
    title: "",
    description: "",
    price: "",
    gas: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const clearState = () => {
    setImages({
      main: null,
      optional1: null,
      optional2: null,
      optional3: null,
    });
    setState({
      title: "",
      description: "",
      price: "",
      gas: "",
    });
  };

  const onSubmit = async () => {
    setOpenDialog(true);
  };

  const handleMint = async () => {
    const data = getValues();
    const address: string = localStorage.getItem("address")!;

    try {
      data.description = state.description;
      const result = await ItemDs.createData(data, address);
      let imageArr = [];
      for (const image of Object.entries(images)) {
        imageArr.push({
          name: image[0],
          file: image[1],
        });
      }
      let promise: any = [];
      imageArr.forEach((image) => {
        promise.push(getFileUploadURL(image.file, `item/${image.name}`));
      });
      toast.success("successful");
      reset();
      clearState();
      setOpenDialog(false);

      const imageURLs = await Promise.all(promise);
      await itemDs.updateData({ id: result.data.id, images: imageURLs });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDialogClose = () => setOpenDialog(false);

  const target = useRef<HTMLInputElement>(null);
  const optional1 = useRef<HTMLInputElement>(null);
  const optional2 = useRef<HTMLInputElement>(null);
  const optional3 = useRef<HTMLInputElement>(null);

  const handleChnage = (e?: any, name?: any) => {
    setImages({
      ...images,
      main: e.target.files[0],
    });
  };
  const handleOptional1 = (e?: any) => {
    setImages({
      ...images,
      optional1: e.target.files[0],
    });
  };
  const handleOptional2 = (e?: any) => {
    setImages({
      ...images,
      optional2: e.target.files[0],
    });
  };
  const handleOptional3 = (e?: any) => {
    setImages({
      ...images,
      optional3: e.target.files[0],
    });
  };

  return (
    <>
      <MintTokenDialog
        open={openDialog}
        handleClose={handleDialogClose}
        handleMint={handleMint}
      />

      <div className={styles.sciCon}>
        <div className={styles.sci}>
          <div className={styles.scihead}>
            <h1>
              Create <span>single item</span>
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
              onChange={(e) => handleChnage(e, "main")}
            />
          </div>
          <div className={styles.sciuploadseccon}>
            <div className={styles.uploadsechead}>
              <span className={styles.upload}>
                Additional Images (optional)
              </span>
            </div>
            <section className={styles.additional}>
              <div
                onClick={() => optional1.current?.click()}
                className={images.optional1 ? styles.img : styles.optional}
              >
                {images.optional1 ? (
                  <Image
                    width={600}
                    height={500}
                    alt="item optional 1"
                    src={URL.createObjectURL(images.optional1)}
                  />
                ) : (
                  <Image
                    width={20}
                    height={20}
                    alt="upload icon"
                    src={`/assets/uploadicon.svg`}
                  />
                )}
                <input
                  style={{ display: "none" }}
                  type="file"
                  ref={optional1}
                  onChange={(e) => handleOptional1(e)}
                />
              </div>
              <div
                onClick={() => optional2.current?.click()}
                className={images.optional2 ? styles.img : styles.optional}
              >
                {images.optional2 ? (
                  <Image
                    width={600}
                    height={500}
                    alt="item optional 2"
                    src={URL.createObjectURL(images.optional2)}
                  />
                ) : (
                  <Image
                    width={20}
                    height={20}
                    alt="upload icon"
                    src={`/assets/uploadicon.svg`}
                  />
                )}
                <input
                  style={{ display: "none" }}
                  type="file"
                  ref={optional2}
                  onChange={(e) => handleOptional2(e)}
                />
              </div>
              <div
                onClick={() => optional3.current?.click()}
                className={images.optional3 ? styles.img : styles.optional}
              >
                {images.optional3 ? (
                  <Image
                    width={600}
                    height={500}
                    alt="item optional 1"
                    src={URL.createObjectURL(images.optional3)}
                  />
                ) : (
                  <Image
                    width={20}
                    height={20}
                    alt="upload icon"
                    src={`/assets/uploadicon.svg`}
                  />
                )}
                <input
                  style={{ display: "none" }}
                  type="file"
                  ref={optional3}
                  onChange={(e) => handleOptional3(e)}
                />
              </div>
            </section>
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
              />
              {errors.title && <span>This field is required</span>}
            </div>
            <div className={styles.editor}>
              <label>DESCRIPTION</label>

              <div className={styles.editor}>
                <ReactQuill
                  modules={{
                    toolbar: toolbarOptions,
                  }}
                  theme="snow"
                  style={{
                    height: "20rem",
                  }}
                  placeholder='e.g. “After purchasing you will able to receive the logo...”"'
                  value={state.description}
                  onChange={(e: any) => {
                    setState({
                      ...state,
                      description: e,
                    });
                  }}
                />
              </div>
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
                <input
                  type="number"
                  className={styles.input}
                  placeholder="1"
                  {...register("gas", { required: true })}
                />
              </div>
              <div className={styles.itemdetailsforminput1}>
                <label>PRICE</label>
                <input
                  type="number"
                  placeholder="2.45 ETH"
                  className={styles.input}
                  min="0"
                  step="0.01"
                  {...register("price", { required: true })}
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
              <button disabled={!images.main} type="submit">
                Create item
                <span>
                  <img src={`/assets/arrow.svg`} alt="" />
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
            <img
              className={styles.previewimg}
              src={
                images.main
                  ? URL.createObjectURL(images.main)
                  : `/assets/placeholder-image.jpg`
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
                <img alt="bid icon" src={`/assets/bidicon.svg`} />
                <span>
                  Highest bid <span>0.00</span>
                </span>
              </div>
              <div className="bidsec2">
                <span>New bid</span>
              </div>
            </div>

            <div className={styles.clearsec} onClick={() => clearState()}>
              <img alt="close icon" src={`/assets/closeicon.svg`} />
              <span>Clear all</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SingleCollectibleItem;
