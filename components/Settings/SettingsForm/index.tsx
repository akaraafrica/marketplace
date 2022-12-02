/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import React, { useRef, useState } from "react";
import styles from "./index.module.scss";
import { useForm } from "react-hook-form";
import { ProfileDs } from "../../../ds";
import Button from "../../global/Button/Button";
import Input from "../../global/Form/Input";

function SettingsForm() {
  const [foto, setFoto] = useState(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    const id: number = parseInt(localStorage.getItem("id")!);
    const accessToken: string = localStorage.getItem("accessToken")!;
    const data = getValues();
    ProfileDs.updateData(data, id, accessToken);
  };

  const target = useRef<HTMLInputElement>(null);
  const handleChange = (e: any) => {
    setFoto(e.target.files[0]);
  };

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
                  <Button
                    onClick={() => target.current?.click()}
                    customStyle={{
                      background: "black",
                      border: "2px solid #353945",
                      minWidth: "100px",
                      padding: "1px",
                    }}
                  >
                    Upload
                  </Button>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    ref={target}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>

              {/* <div className={styles.turnonnotification}>
                <div className={styles.turnonnotificationtext}>
                  <h4>Turn on Notifications?</h4>
                  <p>This will unmute all notifications</p>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" {...register("turnOnNotify", {})} />
                  <span className={`${styles.slider} ${styles.round}`}></span>
                </label>
              </div> */}
            </div>
            <div className={styles.settingformsec2}>
              <div className={styles.settingformsec1content1}>
                <h4>Account info</h4>
                <div className={styles.settingformsec2inputs}>
                  <Input
                    label="DISPLAY NAME"
                    register={register}
                    errors={errors}
                    name="name"
                    placeholder="Enter your display name"
                  />

                  <Input
                    label="PHONE NUMBER"
                    register={register}
                    errors={errors}
                    name="phoneNumber"
                    placeholder="+2348010203040"
                  />

                  <div className={styles.itemsettingforminputsec2}>
                    <label>Bio</label>
                    <textarea
                      placeholder='About yourselt in a few words"'
                      {...register("bio", {})}
                    ></textarea>
                  </div>
                </div>
              </div>
              <h4>SOCIAL</h4>
              <Input
                label="PORTFOLIO OR WEBSITE"
                register={register}
                errors={errors}
                name="websites"
                placeholder="Enter your portfolio or website"
              />

              <Input
                label="Twitter"
                register={register}
                errors={errors}
                name="twitter"
                placeholder="@twitter username"
              />
              <Input
                label="Facebook"
                register={register}
                errors={errors}
                name="facebook"
                placeholder="@facebook username"
              />
              <Input
                label="Instagram"
                register={register}
                errors={errors}
                name="instagram"
                placeholder="instagram username"
              />
              {/* <div className={styles.addsocialaccountbtn}>
                  <button type="button" onClick={() => setshow(!show)}>
                    <span>
                      <img alt="plus icon" src={`/assets/plusicon.svg`} />
                    </span>
                    {show
                      ? "Hide other social account"
                      : "Add more social account"}
                  </button>
                </div> */}
              <div className={styles.socialtext}>
                <p>
                  To update your settings you should sign message through your
                  wallet. Click &apos Update profile &apos then sign the message
                </p>
              </div>
              <div className={styles.clearallsec}></div>
              <div className={styles.clearallsec}>
                <Button>Update Profile</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SettingsForm;
