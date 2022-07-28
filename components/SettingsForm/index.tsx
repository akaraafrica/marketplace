/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import React, { useRef, useState } from "react";
import styles from "./index.module.scss";
import Switch from "@mui/material/Switch";
import { useForm } from "react-hook-form";
import { ProfileDs } from "../../ds";

function SettingsForm() {
  const [show, setshow] = useState(false);
  const [foto, setFoto] = useState(null);
  const [state, setState] = useState({
    name: "",
    bio: "",
    phoneNumber: "",
    website: "",
    twitter: "",
    facebook: "",
    instagram: "",
    itemMinOffer: "",
    itemMaxOffer: "",
    turnOnNotify: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
    // if (foto) {
    //   data.avatar = foto;
    // }
    const newData: any = {};
    if (
      !data.name &&
      !data.bio &&
      !data.phoneNumber &&
      !data.website &&
      !data.twitter &&
      !data.facebook &&
      !data.instagram &&
      !data.itemMaxOffer &&
      !data.itemMinOffer
    ) {
      return;
    }

    for (let key in data) {
      if (data[key] !== "") {
        newData[key] = data[key];
      }
    }
    console.log(newData);
    const address: string = localStorage.getItem("address")!;
    const accessToken: string = localStorage.getItem("accessToken")!;

    ProfileDs.updateData(newData, address, accessToken);
    clearState();
  };

  const target = useRef<HTMLInputElement>(null);
  const handleChange = (e: any) => {
    setFoto(e.target.files[0]);
  };

  const clearState = () => {
    setFoto(null);
    reset();
  };

  const inputValue = getValues();
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <div className={styles.settingformcon}>
      <div className={styles.settingform}>
        <div className={styles.settingformheading}>
          <h1>Settings</h1>
          <p>
            You can set preferred display name, create{" "}
            <span>your profile URL</span> and manage other personal settings.
          </p>
        </div>
        <div className={styles.settingformcontentparent}>
          <form
            className={styles.settingformcontentcon}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.settimgformsec1}>
              <div className={styles.settingformsec1profilecard}>
                <img
                  className={styles.pic}
                  alt="profile photo"
                  src={
                    foto
                      ? URL.createObjectURL(foto)
                      : `/assets/placeholder-image.jpg`
                  }
                />
                <div className={styles.settingformprofilecardtext}>
                  <h4>Profile photo</h4>
                  <p>
                    We recommend an image of at least 400x400.Gifs work too 🙌
                  </p>
                  <button type="button" onClick={() => target.current?.click()}>
                    Upload
                  </button>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    ref={target}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className={styles.itemsetting}>
                <h4>Item Settings</h4>
                <div className={styles.itemsettinginput}>
                  <div className={styles.itemsettingforminput}>
                    <label>MIN OFFER</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder='Minimum Offer"'
                      {...register("itemMinOffer", {})}
                      value={inputValue.itemMinOffer}
                    />
                  </div>
                  <div className={styles.itemsettingforminput}>
                    <label>MAX OFFER</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder='Maximum Offer"'
                      {...register("itemMaxOffer", {})}
                      value={inputValue.itemMaxOffer}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.turnonnotification}>
                <div className={styles.turnonnotificationtext}>
                  <h4>Turn on Notifications?</h4>
                  <p>This will unmute all notifications</p>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" {...register("turnOnNotify", {})} />
                  <span className={`${styles.slider} ${styles.round}`}></span>
                </label>
              </div>
            </div>
            <div className={styles.settingformsec2}>
              <div className={styles.settingformsec1content1}>
                <h4>Account info</h4>
                <div className={styles.settingformsec2inputs}>
                  <div className={styles.itemsettingforminputsec2}>
                    <label>DISPLAY NAME</label>
                    <input
                      type="text"
                      placeholder='Enter your display name"'
                      {...register("name", {})}
                      value={inputValue.name}
                    />
                  </div>
                  <div className={styles.itemsettingforminputsec2}>
                    <label>Phone number</label>
                    <input
                      type="text"
                      placeholder="+2348010203040"
                      {...register("phoneNumber", {})}
                      value={inputValue.phoneNumber}
                    />
                  </div>
                  <div className={styles.itemsettingforminputsec2}>
                    <label>Bio</label>
                    <textarea
                      placeholder='About yourselt in a few words"'
                      {...register("bio", {})}
                      value={inputValue.bio}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className={styles.settingformsec1content2}>
                <h4>Social</h4>
                <div className={styles.itemsettingforminputsec2}>
                  <label>portfolio or website</label>
                  <input
                    type="text"
                    placeholder='Enter URL"'
                    {...register("website", {})}
                    value={inputValue.website}
                  />
                </div>
                <div className={styles.itemsettingforminputsec2twitter}>
                  <label>twitter</label>
                  <div className={styles.inputcon}>
                    <input
                      type="text"
                      placeholder="@twitter username"
                      {...register("twitter", {})}
                      value={inputValue.twitter}
                    />
                    <button type="button">Verify account</button>
                  </div>
                  <div
                    className={show ? styles.socialmedias : styles.hidesocials}
                  >
                    <div>
                      <label>facebook</label>
                      <div className={styles.inputcon}>
                        <input
                          type="text"
                          placeholder="facebook url"
                          {...register("facebook", {})}
                          value={inputValue.facebook}
                        />
                        <button type="button">Verify account</button>
                      </div>
                    </div>
                    <div>
                      <label>instagram</label>
                      <div className={styles.inputcon}>
                        <input
                          type="text"
                          placeholder="instagram username"
                          {...register("instagram", {})}
                          value={inputValue.instagram}
                        />
                        <button type="button">Verify account</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.addsocialaccountbtn}>
                  <button type="button" onClick={() => setshow(!show)}>
                    <span>
                      <img alt="plus icon" src={`/assets/plusicon.svg`} />
                    </span>
                    {show
                      ? "Hide other social account"
                      : "Add more social account"}
                  </button>
                </div>
                <div className={styles.socialtext}>
                  <p>
                    To update your settings you should sign message through your
                    wallet. Click &apos Update profile &apos then sign the
                    message
                  </p>
                </div>
                <div className={styles.clearallsec}></div>
                <div className={styles.clearallsec}>
                  <button type="submit">Update Profile</button>
                  <div className={styles.clearsecone} onClick={clearState}>
                    <img alt="close icon" src={`/assets/closeicon.svg`} />
                    <p>Clear all</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SettingsForm;
