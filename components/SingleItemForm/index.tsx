/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import { useContract } from "../../hooks/web3";
import {
  CHAIN_TO_NFT_ADDRESS,
  CHAIN_TO_MARKETPLACE_ADDRESS,
  SupportedChainId,
} from "../../constants";
import token from "../../artifacts/nft.json";
import styles from "./index.module.scss";
import MintTokenDialog from "./MintTokenDialog";
import { ItemDs } from "../../ds";
import { AuthContext } from "../../contexts/AuthContext";
import { getFileUploadURL } from "../../utils/upload/fileUpload";
import itemDs from "../../ds/item.ds";
import { useRouter } from "next/router";

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
  const { chainId } = useWeb3React();
  const tokenContract = useContract(
    CHAIN_TO_NFT_ADDRESS[chainId as SupportedChainId],
    token
  );
  const { user } = useContext(AuthContext);

  const marketplaceContract = useContract(
    CHAIN_TO_MARKETPLACE_ADDRESS[chainId as SupportedChainId],
    token
  );
  const router = useRouter();
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
  type form = {
    title: string;
    description: string;
    price: string;
    blockchain: string;
    published: boolean;
    royalties: string;
    image: any;
  };

  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm<form>();
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
    console.log("storing NFT...");
    const uploadResp = await itemDs.storeNFT(
      images.main,
      getValues("title"),
      getValues("description")
    );
    console.log("upload to ipfs resp ", uploadResp);
    // step 2
    const mintedResp = await tokenContract?.createToken(uploadResp.url);
    console.log("mint Token resp ", mintedResp);
    // step 3
    const listResp = await marketplaceContract?.list(
      mintedResp.data.id, // itemId from response
      getValues("price"),
      getValues("royalties"),
      tokenContract?.address
    );
    console.log("listing token resp ", listResp);
    console.log("submitting here ......");
    setOpenDialog(true);
  };
  const handleMint = async () => {
    if (!user) return;
    const data = getValues();
    const address: string = localStorage.getItem("address")!;

    try {
      data.description = state.description;
      const result = await ItemDs.createData(data, user, address);

      let imageArr = [];
      for (const image of Object.entries(images)) {
        imageArr.push({
          name: image[0],
          file: image[1],
        });
      }
      let promise: any = [];
      imageArr.forEach((image, index) => {
        promise.push(
          getFileUploadURL(image.file, `item/${result.data.id}/${image.name}`)
        );
      });
      toast.success("successful");
      reset();
      clearState();
      setOpenDialog(false);
      const imageURLs = await Promise.all(promise);
      await itemDs.updateData({ id: result.data.id, images: imageURLs });
      router.push("/marketplace");
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
    if (e.target.files[0]) {
      setValue("image", true);
    } else {
      setValue("image", undefined);
    }
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
              {...register("image", { required: true })}
              ref={target}
              onChange={(e) => handleChnage(e, "main")}
            />
            {errors.image && <span>This field is required</span>}
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
              {/* {errors.title && <p>{errors["title"]}</p>} */}
              <input
                type="text"
                placeholder='e. g. "Redeemable Bitcoin Card with logo"'
                // required
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
                  value={getValues("description")}
                  onChange={(e: any) => {
                    setValue("description", e);
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
                  <option value="1">1%</option>
                  <option value="5">5%</option>
                  <option value="10">10%</option>
                  <option value="15">15%</option>
                  <option value="20">20%</option>
                </select>
              </div>
              <div className={styles.itemdetailsforminput1}>
                <label>PRICE</label>
                <input
                  type="number"
                  placeholder="0.25 ETH"
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
              <button type="submit">
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
              <div className={styles.previewtitle}>{getValues("title")}</div>
              <span className={styles.previewprice}>
                {getValues("price") || "0.00"} ETH
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
            {/* <div className={styles.bidsec}>
              <div className={styles.bidsec1}>
                <img alt="bid icon" src={`/assets/bidicon.svg`} />
                <span>
                  Highest bid <span>0.00</span>
                </span>
              </div>
              <div className="bidsec2">
                <span>New bid</span>
              </div>
            </div> */}

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
