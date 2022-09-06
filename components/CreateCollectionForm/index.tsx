import React, { useRef, useState, useContext, useEffect } from "react";
import styles from "./index.module.scss";
import { useForm } from "react-hook-form";
import Image from "../Image";
import DefaultAvatar from "../DefaultAvatar";
import { IUser } from "../../types/user.interface";
import { toast } from "react-toastify";
import { IItem } from "../../types/item.interface";
import { RiVideoUploadLine } from "react-icons/ri";
import dynamic from "next/dynamic";
import { getFileUploadURL } from "../../utils/upload/fileUpload";
import MintTokenDialog from "../SingleItemForm/MintTokenDialog";
import { CollectionDs } from "../../ds";
import { AuthContext } from "../../contexts/AuthContext";
import { Step } from "../SingleItemForm";

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

const Index = ({
  users,
  collectionTypes,
}: {
  users: any[];
  collectionTypes: any[];
}) => {
  const [desc, setDesc] = useState("");
  const [type, setType] = useState<Number>();
  const [video, setVideo] = useState(null);
  const [searchUser, setSearchUser] = useState("");
  const [selectedUser, setSelectedUser] = useState<IUser[]>([]);
  const [resultDisplay, setResultDisplay] = useState(false);
  const [itemResultDisplay, setItemResultDisplay] = useState(false);
  const [items, setItems] = useState<IItem[]>([]);
  const [searchItem, setSearchItem] = useState("");
  const [selectedItems, setSelectedItems] = useState<IItem[]>([]);
  const [images, setImages] = useState({
    main: null,
    optional1: null,
    optional2: null,
    optional3: null,
    optional4: null,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useContext(AuthContext);
  const userIndex = users.filter((person) => person.id === user?.id);
  useEffect(() => {
    if (userIndex[0]?.items.length > 0) {
      setItems([...userIndex[0].items]);
    }
  }, [userIndex]);

  const targetVid = useRef<HTMLInputElement>(null);
  const target = useRef<HTMLInputElement>(null);
  const optional1 = useRef<HTMLInputElement>(null);
  const optional2 = useRef<HTMLInputElement>(null);
  const optional3 = useRef<HTMLInputElement>(null);
  const optional4 = useRef<HTMLInputElement>(null);

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
  const handleOptional4 = (e?: any) => {
    setImages({
      ...images,
      optional4: e.target.files[0],
    });
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const [step, setStep] = useState<Step>({
    count: 1,
    loading: false,
    complete: false,
  });

  const title = watch("title", "");
  const countdown = watch("countdown", "");

  const onSubmit = () => {
    if (!title || !desc || !type || !countdown) {
      toast.error("Ensure required fields are not empty");
      return;
    }
    setOpenDialog(true);
  };
  const handleUpload = async () => {
    console.log("items", items);
    const data = getValues();
    const address: string = localStorage.getItem("address")!;

    try {
      data.description = desc;
      data.type = type;
      data.owners = selectedUser;
      data.items = selectedItems;
      const result = await CollectionDs.createData(data, user!, address);
      console.log(result);
      let imageArr = [];
      for (const image of Object.entries(images)) {
        imageArr.push({
          name: image[0],
          file: image[1],
        });
      }
      let promise: any = [];
      imageArr.forEach((image) => {
        promise.push(getFileUploadURL(image.file, `collection/${image.name}`));
      });

      let videoUrl = await getFileUploadURL(
        video,
        `collection/${title.replace(" ", "-")}`
      );
      // console.log({ videoUrl });

      console.log(data);
      toast.success("successful");
      reset();
      clearState();
      setOpenDialog(false);

      const imageURLs = await Promise.all(promise);
      await CollectionDs.updateData({
        id: result.data.id,
        images: imageURLs,
        videos: [videoUrl],
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDialogClose = () => setOpenDialog(false);

  const handleVideoChange = async (event: any) => {
    const file = event.target.files[0];
    const MIN_FILE_SIZE = 1024; // 1MB
    const MAX_FILE_SIZE = 5120; // 5MB

    // if (file.size / 1024 < MIN_FILE_SIZE) {
    //   toast.warning("uploaded video file is too small");
    //   return;
    // }

    if (file.size / 1024 > MAX_FILE_SIZE) {
      toast.warning("uploaded video file is too big");
      return;
    }
    setVideo(file);
  };
  const handleChangeRequired = (e?: any, name?: any) => {
    setImages({
      ...images,
      main: e.target.files[0],
    });
  };
  const clearState = () => {
    setDesc("");
    setVideo(null);
    setImages({
      main: null,
      optional1: null,
      optional2: null,
      optional3: null,
      optional4: null,
    });
    reset();
    setSelectedItems([]);
    setSelectedUser([]);
  };
  // console.log("users", selectedUser);
  // console.log("items", items);
  return (
    <div className={styles.root}>
      <MintTokenDialog
        open={openDialog}
        handleClose={handleDialogClose}
        handleMint={() => console.log("handling mint")}
        handleUpload={handleUpload}
        step={step}
        handleSignOrder={() => console.log("handing sell order")}
      />
      <div className={styles.sciCon}>
        <div className={styles.sci}>
          <div className={styles.scihead}>
            <h1>Create new collection</h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.itemdetailsformcon}
          >
            <div className={styles.uploadsechead}>
              <h4 className={styles.upload}>Upload Video (required)</h4>
              <span className={styles.drag}>
                Drag or choose your file to upload
              </span>
            </div>
            {!video ? (
              <div
                onClick={() => targetVid.current?.click()}
                className={styles.sciuploadvideobox}
              >
                <RiVideoUploadLine size={50} color="#777E91" />
                <p>WEBM or MP4.</p>
              </div>
            ) : (
              <video controls>
                <source src={URL.createObjectURL(video)} />
              </video>
            )}
            <input
              style={{
                display: "none",
                backgroundColor: "#f2994a",
                width: "200px",
                color: "#fff",
              }}
              ref={targetVid}
              type="file"
              accept="video/*"
              onChange={(event) => {
                handleVideoChange(event);
              }}
            />
            <div className={styles.sciuploadseccon}>
              <div className={styles.uploadsechead}>
                <span className={styles.upload}>Upload image (required)</span>
                <span className={styles.drag}>
                  Drag or choose your file to upload
                </span>
              </div>
              <div
                onClick={() => target.current?.click()}
                className={styles.sciuploadbox}
              >
                <Image
                  width="50px"
                  height="50px"
                  alt="upload icon"
                  src={`/assets/uploadicon.svg`}
                />
                <p>PNG, GIF, WEBP, MP4 or MP3. Max 1Gb.</p>
              </div>
              <input
                style={{ display: "none" }}
                type="file"
                ref={target}
                onChange={(e) => handleChangeRequired(e, "main")}
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
                <div
                  onClick={() => optional4.current?.click()}
                  className={images.optional4 ? styles.img : styles.optional}
                >
                  {images.optional4 ? (
                    <Image
                      width={600}
                      height={500}
                      alt="item optional 1"
                      src={URL.createObjectURL(images.optional4)}
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
                    ref={optional4}
                    onChange={(e) => handleOptional4(e)}
                  />
                </div>
              </section>
            </div>
            <h4>Collection Details</h4>
            <div className={styles.itemdetailsforminput}>
              <label>COLLECTION NAME</label>
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
                    height: "16rem",
                  }}
                  placeholder='e.g. “After purchasing you will able to receive the logo...”"'
                  value={desc}
                  onChange={(e: any) => {
                    setDesc(e);
                  }}
                />
              </div>
            </div>
            <div className={styles.itemdetailsforminput}>
              <label>COLLECTION TYPE</label>
              <select
                defaultValue={"default"}
                onChange={(e: any) => setType(e.target.value)}
              >
                <option value="default" disabled>
                  Choose a Collection type
                </option>
                {collectionTypes &&
                  collectionTypes.map((collectionType, index) => (
                    <option key={index} value={collectionType.id}>
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
              {/* <div className={styles.itemdetailsforminput1}>
                <label>COLLECTION STOCK</label>
                <input
                  type="number"
                  placeholder="1"
                  {...register("stock", {})}
                />
              </div> */}
            </div>
            <div className={styles.divider}></div>
            <div className={styles.itemdetailsforminputSearch}>
              <label>SEARCH TO SELECT CONTRIBUTORS</label>
              <input
                type="text"
                name="Search"
                placeholder="Search users"
                value={searchUser}
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
                          setItems([...items, ...user.items]);
                          setSearchUser("");
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
                      <Image
                        width="30px"
                        height="30px"
                        alt="close icon"
                        src={`/assets/closeicon.svg`}
                      />
                    </div>
                    <DefaultAvatar
                      fontSize=".6rem"
                      url={user?.profile?.avatar}
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
              <input
                type="text"
                name="Search"
                placeholder="Search items"
                value={searchItem}
                onChange={(e) => {
                  setItemResultDisplay(true);
                  setSearchItem(e.target.value);
                }}
              />
              <div
                style={{ display: `${itemResultDisplay ? "flex" : "none"}` }}
                className={styles.searchResults}
              >
                {searchItem &&
                  items &&
                  items
                    .filter((item) => item.title.includes(searchItem))
                    .map((item, index) => (
                      <span
                        key={index}
                        onClick={() => {
                          for (let i = 0; i < selectedItems.length; i++) {
                            if (selectedItems[i].title === item.title) {
                              toast.warning("Item already selected");
                              return;
                            }
                          }
                          setSelectedItems([...selectedItems, item]);
                          setSearchItem("");
                          setItemResultDisplay(false);
                        }}
                      >
                        {item.title && item.title}
                      </span>
                    ))}
              </div>
              <div className={styles.itemImagesDiv}>
                {selectedItems.map((user, index) => (
                  <div key={index} className={styles.userImage}>
                    <div
                      className={styles.closeIcon}
                      onClick={() =>
                        setSelectedItems([
                          ...selectedItems.slice(0, index),
                          ...selectedItems.slice(
                            index + 1,
                            selectedItems.length
                          ),
                        ])
                      }
                    >
                      <Image
                        width="30px"
                        height="30px"
                        alt="close icon"
                        src={`/assets/closeicon.svg`}
                      />
                    </div>
                    <Image
                      src="/assets/productimg3.png"
                      width="112px"
                      height="88px"
                      alt=""
                    />
                  </div>
                ))}
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
                <input type="checkbox" {...register("visible", {})} />
                <span className={`${styles.slider} ${styles.round}`}></span>
              </label>
            </div>
            <div className={styles.putonscalebtnsec}>
              <button type="submit">
                Create collection
                <span>
                  <Image
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
          <div className={styles.previewContent}>
            <div className={styles.collectionsPreview}>
              <div className={styles.mainImgdiv}>
                <Image
                  className={styles.mainImg}
                  src={
                    images.main
                      ? URL.createObjectURL(images.main)
                      : `/assets/placeholder-image.jpg`
                  }
                  layout="fill"
                  alt=""
                />
              </div>
              <div className={styles.imagesDiv}>
                <div className={styles.images}>
                  <Image
                    className={styles.subImg}
                    src={
                      images.optional1
                        ? URL.createObjectURL(images.optional1)
                        : `/assets/placeholder-image.jpg`
                    }
                    layout="fill"
                    alt=""
                  />
                </div>
                <div className={styles.images}>
                  <Image
                    className={styles.subImg}
                    src={
                      images.optional2
                        ? URL.createObjectURL(images.optional2)
                        : `/assets/placeholder-image.jpg`
                    }
                    layout="fill"
                    alt=""
                  />
                </div>
                <div className={styles.images}>
                  <Image
                    className={styles.subImg}
                    src={
                      images.optional3
                        ? URL.createObjectURL(images.optional3)
                        : `/assets/placeholder-image.jpg`
                    }
                    layout="fill"
                    alt=""
                  />
                </div>
              </div>
              <div className={styles.infoDiv}>
                <h4>{(title && title) || "Amazing Digital Art"}</h4>
                <div className={styles.bottom}>
                  <div className={styles.left}>
                    <Image
                      className={styles.image}
                      src={`/assets/avatar.png`}
                      width="50px"
                      height="50px"
                      alt=""
                    />

                    <div className={styles.owner}>
                      By Samuel Nnaji
                      {/* {author?.profile?.name && author.profile.name} */}
                    </div>
                  </div>
                  <span>{selectedItems && selectedItems.length} Items</span>
                </div>
              </div>
              <div className={styles.clearsec} onClick={() => clearState()}>
                <Image
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
    </div>
  );
};

export default Index;
