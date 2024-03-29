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
import { IItem } from "../../types/item.interface";
import validateImage from "../../utils/helpers/validateImage";
import Input from "../global/Form/Input";
import Select from "../global/Form/Select";
import Button from "../global/Button/Button";
import TextEditor from "../global/TextEditor";

export interface Step {
  count: number;
  loading: boolean;
  complete: boolean;
}

function SingleCollectibleItem({ item }: { item?: IItem }) {
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
    category: "ART" | "GAME" | "PHOTOGRAPHY" | "MUSIC" | "VIDEO";
    published: boolean;
    royalties: number;
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

  useEffect(() => {
    if (item) {
      setValue("image", item.images[0]);
      setValue("title", item.title);
      setValue("description", item.description);
      setValue("royalties", item?.royalties);
      setValue("published", item?.published);
      setValue("price", item.price.toString());
      setUploadId(item.id);
      if (item.step == 2) {
        setOpenDialog(true);
        setStep({
          count: 2,
          loading: false,
          complete: false,
        });
      }
      if (item.step == 3) {
        setOpenDialog(true);
        setStep({
          count: 3,
          loading: false,
          complete: false,
        });
      }
      if (item.step == 4) {
        setOpenDialog(true);
        setStep({
          count: 4,
          loading: false,
          complete: false,
        });
      }
    }
  }, [item]);

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

  const [step, setStep] = useState<Step>({
    count: 1,
    loading: false,
    complete: false,
  });
  const [tokenId, setTokenId] = useState("");
  const [uploadId, setUploadId] = useState(0);
  // console.log(item?.images.slice(0, 3));

  const onSubmit = async () => {
    if (item) {
      if (item.step === 5) handleEditItem();
    } else {
      setOpenDialog(true);
    }
  };
  const [loading, setLoading] = useState(false);
  const handleEditItem = async () => {
    if (!user) return;
    const data = getValues();
    try {
      setLoading(true);
      await ItemDs.updateItem({ ...data, id: item!.id });
      let imageArr = [];

      for (const image of Object.entries(images)) {
        if (image[1])
          imageArr.push({
            name: image[0],
            file: image[1],
          });
      }
      let promise: any = [];
      imageArr.forEach((image, index) => {
        promise.push(
          getFileUploadURL(image.file, `item/${item!.id}/${image.name}`)
        );
      });
      const imageURLs = await Promise.all(promise);
      if (imageURLs.length) {
        let imageArr;
        const prevImages = item?.images as any;
        if (imageURLs.length === 1) {
          imageArr = images["optional1"]
            ? [
                ...prevImages?.slice(0, 1),
                ...imageURLs,
                ...prevImages?.slice(2, 4),
              ]
            : images["optional2"]
            ? [
                ...prevImages?.slice(0, 2),
                ...imageURLs,
                ...prevImages?.slice(3, 4),
              ]
            : [...prevImages?.slice(0, 3), ...imageURLs];
        } else if (imageURLs.length === 2) {
          imageArr = !images["optional3"]
            ? [
                ...prevImages?.slice(0, 1),
                ...imageURLs,
                ...prevImages?.slice(3, 4),
              ]
            : !images["optional2"]
            ? [
                ...prevImages?.slice(0, 1),
                ...imageURLs.slice(0, 1),
                ...prevImages?.slice(2, 3),
                ...imageURLs.slice(1, 2),
              ]
            : [...prevImages.slice(0, 2), ...imageURLs];
        } else {
          imageArr = [...prevImages.slice(0, 1), ...imageURLs];
        }
        await itemDs.updateData({ id: item!.id, images: imageArr });
      }
      setStep({ ...step, loading: false, complete: true });
      router.push("/item/" + item?.id);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleUpload = async () => {
    if (!user) return;
    const data = getValues();

    try {
      setStep({ ...step, loading: true });
      const result = await ItemDs.createData(data, user);

      setUploadId(result.data.id);
      setUploadId(result.data.id);

      let imageArr = [];
      for (const image of Object.entries(images)) {
        if (image[1])
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
      const imageURLs = await Promise.all(promise);
      await itemDs.updateData({
        id: result.data.id,
        images: imageURLs,
      });
      await itemDs.updateStep({ id: result.data.id, step: 2 });
      setStep({ ...step, loading: false, count: 2 });
    } catch (error) {
      setStep({ ...step, loading: false });
      handleDialogClose();
      toast.error("error uploading files");
      console.log(error);
    }
  };

  const handleMint = async () => {
    setStep({ ...step, loading: true });

    try {
      const uploadResp = await itemDs.storeNFT(
        images.main || getValues().image,
        getValues("title"),
        getValues("description")
      );
      console.log("upload to ipfs resp ", uploadResp);

      const mintedResp = await tokenContract?.createToken(uploadResp.url, {
        gasLimit: 3e6,
      });
      console.log("mint Token resp ", mintedResp);
      const status = await mintedResp?.wait();
      console.log("mintedResp status", status?.status);
      if (status?.status == 0) {
        handleDialogClose();

        toast.error("error minting token try again");
        setStep({ ...step, loading: false });
      } else {
        await itemDs.updateStep({ id: uploadId, step: 3 });
        setStep({ ...step, loading: false, count: 3 });
      }
    } catch (error) {
      handleDialogClose();
      setStep({ ...step, loading: false });

      console.log(error);
      toast.error("error minting token");
    }
  };

  const handleSignSellOrder = async () => {
    console.log("handleSignSellOrder");
    setStep({ ...step, loading: true });

    try {
      const listResp = await marketplaceContract?.list(
        tokenId, // itemId from response
        getValues("price"),
        getValues("royalties"),
        tokenContract?.address
      );
      console.log("listing token resp ", listResp);
      await itemDs.updateStep({ id: uploadId, step: 4 });
      setStep({ ...step, loading: false, count: 4 });
      // await itemDs.updateData({ id: result.data.id, images: imageURLs });
    } catch (error) {
      handleDialogClose();
      setStep({ ...step, loading: false });

      console.log(error);
      toast.error("error siging sell order");
    }
  };
  const handleDialogSubmit = async () => {
    setStep({ ...step, complete: true });
    await itemDs.updateStep({ id: uploadId, step: 5 });

    handleDialogClose();
    toast.success("successful");
    reset();
    clearState();
    router.push("/item/" + uploadId);
  };
  const handleDialogClose = () => setOpenDialog(false);

  const target = useRef<HTMLInputElement>(null);
  const optional1 = useRef<HTMLInputElement>(null);
  const optional2 = useRef<HTMLInputElement>(null);
  const optional3 = useRef<HTMLInputElement>(null);

  const handleChange = (e?: any, name?: any) => {
    setError("image", {});
    if (validateImage(e.target.files[0]))
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
    if (validateImage(e.target.files[0]))
      setImages({
        ...images,
        optional1: e.target.files[0],
      });
  };
  const handleOptional2 = (e?: any) => {
    if (validateImage(e.target.files[0]))
      setImages({
        ...images,
        optional2: e.target.files[0],
      });
  };
  const handleOptional3 = (e?: any) => {
    if (validateImage(e.target.files[0]))
      setImages({
        ...images,
        optional3: e.target.files[0],
      });
  };
  return (
    <>
      <MintTokenDialog
        handleClose={handleDialogClose}
        open={openDialog}
        handleMint={handleMint}
        handleUpload={handleUpload}
        step={step}
        handleSignOrder={handleSignSellOrder}
        handleSubmit={handleDialogSubmit}
      />

      <div className={styles.sciCon}>
        <div className={styles.sci}>
          <div className={styles.scihead}>
            <h1>
              {item ? "Edit" : "Create"}
              <span>single item</span>
            </h1>
          </div>
          {!item && (
            <div className={styles.sciuploadseccon}>
              <div className={styles.uploadsechead}>
                <span className={styles.upload}>Upload file</span>
                <span className={styles.drag}>
                  Drag or choose your file to upload
                </span>
              </div>

              <div className={errors.image?.type ? styles.error : ""}>
                <div
                  onClick={() => target.current?.click()}
                  className={styles.sciuploadbox}
                >
                  <img alt="upload icon" src={`/assets/uploadicon.svg`} />
                  <p>PNG, GIF, WEBP Max 5MB.</p>
                </div>
                <input
                  style={{ display: "none" }}
                  type="file"
                  {...register("image", { required: true })}
                  ref={target}
                  onChange={(e) => handleChange(e, "main")}
                />
                {errors.image?.type === "required" && (
                  <span>This field is required</span>
                )}
              </div>
            </div>
          )}
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
              <Input
                label="Item Name"
                type="text"
                name="title"
                disabled={!!item}
                required={true}
                errors={errors}
                register={register}
                placeholder='e. g. "Redeemable Bitcoin Card with logo"'
              />
            </div>
            <div className={styles.editor}>
              <TextEditor
                label="DESCRIPTION"
                onChange={(e: any) => setValue("description", e)}
                value={getValues("description")}
                name="description"
                placeholder='e.g. “After purchasing you will able to receive the logo...”"'
              />
            </div>

            {!item && (
              <>
                <div className={styles.itemdetailformdropdownsCon}>
                  <div className={styles.itemdetailsformdropdown}>
                    <Select
                      name="category"
                      label="Category"
                      register={register}
                      data={["ART", "GAME", "PHOTOGRAPHY", "MUSIC", "VIDEO"]}
                      errors={errors}
                    />
                  </div>
                  <div className={styles.itemdetailsformdropdown}>
                    <Select
                      name="royalties"
                      label="ROYALTIES"
                      register={register}
                      data={["1", "5", "10", "15", "20"]}
                      errors={errors}
                    />
                  </div>
                  <div className={styles.itemdetailsforminput1}>
                    <Input
                      label="Price"
                      type="number"
                      name="price"
                      required={true}
                      errors={errors}
                      register={register}
                      placeholder="0.25 ETH"
                    />
                  </div>
                </div>
                <div className={styles.divider}></div>

                <div className={styles.putonscalebtnsec}>
                  <Button>
                    Create item
                    <span>
                      <img src={`/assets/arrow.svg`} alt="" />
                    </span>
                  </Button>
                </div>
              </>
            )}
          </form>

          {item && (
            <div>
              <div className={styles.putonscalebtnsec}>
                <Button onClick={handleEditItem} loading={loading}>
                  Edit item
                  <span>
                    <img src={`/assets/arrow.svg`} alt="" />
                  </span>
                </Button>
              </div>
            </div>
          )}
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
                  : item?.images
                  ? item?.images[0]
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
            <hr />
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
