/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import React, { useRef, useState, useContext, useEffect } from "react";
import styles from "./index.module.scss";
import { useForm } from "react-hook-form";
import { ProfileDs } from "../../../ds";
import useSWR from "swr";
import Button from "../../global/Button/Button";
import Input from "../../global/Form/Input";
import { IProfile } from "../../../types/profile.interface";
import DefaultAvatar from "../../global/DefaultAvatar";
import { AuthContext } from "../../../contexts/AuthContext";
import { getFileUploadURL } from "../../../utils/upload/fileUpload";
import userDs from "../../../ds/user.ds";
import { IUser } from "../../../types/user.interface";
import { watch } from "fs";
import useDebounce from "../../../hooks/useDebounce";

type UnknownArrayOrObject = unknown[] | Record<string, unknown>;

const SettingsForm = () => {
  const user = useContext(AuthContext).user;
  const id = user?.id as number;

  const { data: profile, mutate } = useSWR<IProfile>("profile" + id, () =>
    ProfileDs.fetchSettings(id)
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [foto, setFoto] = useState();
  const {
    register,
    handleSubmit,
    getValues,
    setError: seterror,
    clearErrors,
    watch,
    reset,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({
    defaultValues: {
      name: profile?.profile?.name,
      username: profile?.profile?.username,
      phoneNumber: profile?.profile?.phoneNumber,
      bio: profile?.profile?.bio,
      website: profile?.profile?.website,
      twitter: profile?.profile?.twitter,
      facebook: profile?.profile?.facebook,
      instagram: profile?.profile?.instagram,
      avatar: profile?.profile?.avatar,
    },
  });

  const onSubmit = async () => {
    setLoading(true);
    const dirtyValues = (
      dirtyFields: UnknownArrayOrObject | boolean,
      allValues: UnknownArrayOrObject
    ): UnknownArrayOrObject => {
      // NOTE: Recursive function.

      // If *any* item in an array was modified, the entire array must be submitted, because there's no
      // way to indicate "placeholders" for unchanged elements. `dirtyFields` is `true` for leaves.
      if (dirtyFields === true || Array.isArray(dirtyFields)) {
        return allValues;
      }

      // Here, we have an object.
      return Object.fromEntries(
        Object.keys(dirtyFields).map((key) => [
          key,
          // @ts-ignore
          dirtyValues(dirtyFields[key], allValues[key]),
        ])
      );
    };

    try {
      if (dirtyValues(dirtyFields, getValues()).hasOwnProperty("username")) {
        const data = await userDs.fetchSearchedUsername(
          getValues("username") as string
        );
        if (data) {
          setError("Username selected is not available");
          seterror("username", {
            type: "custom",
            message: "Username is not available",
          });
          setLoading(false);
          return;
        }
      }
      // console.log("values", dirtyValues(dirtyFields, getValues()));
      const accessToken: string = localStorage.getItem("accessToken")!;

      if (foto) {
        // console.log(foto);

        const imageUrl = await getFileUploadURL(foto, `user/profile/${id}/`);
        // await userDs.updateProfile({
        //   id: id,
        //   avatar: imageUrl,
        // });
        await ProfileDs.updateSettingsData(
          { ...dirtyValues(dirtyFields, getValues()), avatar: imageUrl },
          id,
          accessToken
        );
        setLoading(false);
        reset();
        mutate();
      } else {
        await ProfileDs.updateSettingsData(
          dirtyValues(dirtyFields, getValues()),
          id,
          accessToken
        );
        setLoading(false);
        reset();
        mutate();
      }
    } catch (error) {
      setError("Something went wrong, try again!");
      console.log(error);
    }
  };

  const debouncedSearchTerm = useDebounce(watch("username"), 500) as string;

  useEffect(() => {
    (async () => {
      if (debouncedSearchTerm?.length >= 3) {
        const data = await userDs.fetchSearchedUsername(debouncedSearchTerm);
        if (data) {
          seterror("username", {
            type: "custom",
            message: "Username is not available",
          });
        }
        // console.log(data);
      }
    })();
    clearErrors();
  }, [clearErrors, debouncedSearchTerm, seterror]);

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
                  src={
                    foto
                      ? URL.createObjectURL(foto)
                      : profile?.profile?.avatar ||
                        `/assets/placeholder-image.jpg`
                  }
                  alt=""
                />
                {/* <DefaultAvatar
                  url={new MediaStream(foto) as unknown as string}
                  walletAddress={profile?.walletAddress as string}
                  width='150rem'
                  height='150rem'
                /> */}
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
                    type="button"
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
                    placeholder={
                      profile?.profile?.name || "Enter your display name"
                    }
                  />
                  <Input
                    label="USERNAME"
                    register={register}
                    errors={errors}
                    name="username"
                    placeholder={
                      profile?.profile?.username || "Enter your username"
                    }
                  />
                  <Input
                    label="PHONE NUMBER"
                    register={register}
                    errors={errors}
                    name="phoneNumber"
                    placeholder={profile?.profile?.phoneNumber || "+2340000000"}
                  />

                  <div className={styles.itemsettingforminputsec2}>
                    <label>Bio</label>
                    <textarea
                      placeholder={
                        profile?.profile?.bio || "About yourselt in a few words"
                      }
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
                name="website"
                placeholder={profile?.profile?.website || "www.mywebsite.com"}
              />
              <Input
                label="Twitter"
                register={register}
                errors={errors}
                name="twitter"
                placeholder={profile?.profile?.twitter || "@twitter username"}
              />
              <Input
                label="Facebook"
                register={register}
                errors={errors}
                name="facebook"
                placeholder={profile?.profile?.facebook || "@facebook username"}
              />
              <Input
                label="Instagram"
                register={register}
                errors={errors}
                name="instagram"
                placeholder={
                  profile?.profile?.instagram || "@instagram username"
                }
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
                  To update your profile settings click the button below.
                  Profile update may take some seconds to reflect.
                </p>
              </div>
              <div className={styles.clearallsec}></div>
              <div className={styles.clearallsec}>
                <Button disabled={!isDirty && !foto} loading={loading}>
                  Update Profile
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SettingsForm;
