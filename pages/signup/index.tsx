import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "./index.module.scss";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { BsFillCameraFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../connectors";
import { toast } from "react-toastify";
import VerifyEmail from "../../components/global/VerifyEmail";
import NextImage from "../../components/global/Image";
import { getFileUploadURL } from "../../utils/upload/fileUpload";
import userDs from "../../ds/user.ds";
import googleLogin from "../../utils/auth/googleLogin";
import { AuthContext } from "../../contexts/AuthContext";
import facebookLogin from "../../utils/auth/facebookLogin";
import twitterLogin from "../../utils/auth/twitterLogin";
import OnboardingLayout from "../../components/global/OnboardingLayout";
import OnboardingInput from "../../components/global/OnboardingInput";
import Button from "../../components/global/Button/Button";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useDebounce from "../../hooks/useDebounce";

const Index = () => {
  const { completeLogin } = useContext(AuthContext);
  const formSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username shouldbe at least 3 characters"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(25, "Password cannot exceed more than 20 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(25, "Password cannot exceed more than 20 characters")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
    gender: Yup.string().required("choose gender"),
    birthdate: Yup.string().required("choose birthdate"),
  });

  const {
    register,
    handleSubmit,
    getValues,
    setError: seterror,
    clearErrors,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });

  const debouncedSearchTerm: string = useDebounce(watch("username"), 500);

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
        console.log(data);
      }
    })();
    clearErrors();
  }, [debouncedSearchTerm, seterror]);

  console.log(errors);

  const handlegoogleLogin = async () => {
    try {
      const res = await googleLogin(account, setError, setVerify);
      console.log("google login ", res);
      completeLogin(res);
    } catch (error: any) {
      console.log(error);
    }
  };
  const handleTwitterLogin = async () => {
    if (!account) {
      toast.info("Please connect with metamask to login");
      return;
    }
    try {
      const res = await twitterLogin(account, setError);
      console.log("twitter login", res);
      completeLogin(res);
    } catch (error: any) {
      toast.error(error.error?.message || error.message);
    }
  };
  const handlefacebookLogin = async () => {
    if (!account) {
      toast.info("Please connect with metamask to login");
      return;
    }
    try {
      const res = await facebookLogin(account, setError, setVerify);
      console.log("facebook login", res);
      completeLogin(res);
    } catch (error: any) {
      console.log(error);
      toast.error(error.error?.message || error.message);
    }
  };

  const [error, setError] = useState("");
  const [gender, setGender] = useState("");
  const [verify, setVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const router = useRouter();

  const { account, activate } = useWeb3React();

  const target = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!account) {
      activate(injected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeImage = (e?: any) => {
    setImage(e.target.files[0]);
    console.log(`Image`, e.target.files[0]);
  };

  const onSubmit = async () => {
    setError("");
    if (!account) {
      setError("Please connect with metamask to signup");
      toast.info("Please connect with metamask to login");
      return;
    }
    const { name, email, birthdate, password, username } = getValues();

    try {
      setLoading(true);
      const data = await userDs.fetchSearchedUsername(username);
      if (data) {
        setError("Username selected is not available");
        setLoading(false);
        return;
      }
      const res = await userDs.create({
        address: account,
        email: email,
        password: password,
        name: name,
        dob: birthdate,
        gender: gender,
        username: username,
      });
      if (image) {
        const imageUrl = await getFileUploadURL(
          image,
          `user/profile/${res.data.user.id}/`
        );
        await userDs.updateProfile({
          id: res.data.user.id,
          avatar: imageUrl,
        });
      }
      if (res.status === 200) {
        setVerify(true);
      }
      console.log("response", res);
    } catch (error: any) {
      setLoading(false);

      if (error.response.status === 401)
        return setError(error.response.data.message);
      if (error.response.status === 409)
        return setError(error.response.data.message);
      if (error.response.status === 500)
        return setError("Server error, please try again later");
    }
  };

  return (
    <OnboardingLayout>
      {verify ? (
        <VerifyEmail
          title="Check your email"
          text="A verification email has been sent to your email"
        />
      ) : (
        <div className={styles.login}>
          <h6 className={styles.title}>Create an account</h6>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.inputs}>
            <div className={styles.mainImgdiv}>
              <NextImage
                className={styles.mainImg}
                src={
                  image
                    ? URL.createObjectURL(image)
                    : `/assets/placeholder-image.jpg`
                }
                layout="fill"
                alt=""
              />
              <div
                onClick={() => target?.current?.click()}
                className={styles.upload}
              >
                <BsFillCameraFill size={30} color="#fff" />
              </div>
              <input
                style={{ display: "none" }}
                type="file"
                ref={target}
                onChange={(e) => handleChangeImage(e)}
              />
            </div>

            {error !== "" && <span className={styles.error}>{error}</span>}
            <OnboardingInput
              register={register}
              errors={errors}
              label="Full Name"
              name="name"
              type="text"
              placeholder="John Smith"
            />
            <OnboardingInput
              register={register}
              errors={errors}
              label="Username"
              name="username"
              type="text"
              placeholder="Johnsmith"
              autoComplete="off"
            />
            <OnboardingInput
              register={register}
              errors={errors}
              label="Email"
              name="email"
              type="email"
              placeholder="johnsmith@gmail.com"
            />
            <OnboardingInput
              register={register}
              errors={errors}
              label="Password"
              name="password"
              type="password"
              placeholder="***********"
            />
            <OnboardingInput
              register={register}
              errors={errors}
              label="Password"
              name="confirmPassword"
              type="password"
              placeholder="***********"
            />

            <div className={styles.gender}>
              <label htmlFor="gender">Gender</label>
              <div
                className={
                  errors?.gender?.type === "required" ? styles.error : ""
                }
              >
                <div className={styles.btns}>
                  <button
                    className={
                      gender === "MALE" ? styles.active : styles.button
                    }
                    onClick={() => {
                      setGender("MALE");
                      setValue("gender", "MALE");
                      seterror("gender", {});
                    }}
                    type="button"
                  >
                    Male
                  </button>
                  <button
                    className={
                      gender === "FEMALE" ? styles.active : styles.button
                    }
                    onClick={() => {
                      setGender("FEMALE");
                      setValue("gender", "FEMALE");
                      seterror("gender", {});
                    }}
                    type="button"
                  >
                    Female
                  </button>
                  <button
                    className={
                      gender === "OTHERS" ? styles.active : styles.button
                    }
                    onClick={() => {
                      setGender("OTHERS");
                      setValue("gender", "OTHERS");
                      seterror("gender", {});
                    }}
                    type="button"
                  >
                    Others
                  </button>
                </div>
                {errors.gender && (
                  <span>{errors?.gender?.message as string}</span>
                )}
              </div>
            </div>
            <div className={styles.birthdate}>
              <label htmlFor="gender">Birthdate</label>
              <OnboardingInput
                type="date"
                label=""
                register={register}
                errors={errors}
                name="birthdate"
                placeholder="choose your DOB"
              />
            </div>
            <Button loading={loading}>Sign up </Button>
          </form>

          <span className={styles.continue}>Or continue with</span>
          <div className={styles.socials}>
            <span>
              <FcGoogle
                onClick={handlegoogleLogin}
                style={{ cursor: "pointer" }}
              />
            </span>
            <span>
              <FaTwitter
                color="#1877F2"
                style={{ cursor: "pointer" }}
                onClick={handleTwitterLogin}
              />
            </span>
            <span>
              <FaFacebook
                color="#1877F2"
                style={{ cursor: "pointer" }}
                onClick={handlefacebookLogin}
              />
            </span>
          </div>
          <p>
            Don’t have an account?{" "}
            <span
              className={styles.signup}
              onClick={() => router.push("/login")}
            >
              {" "}
              Log in
            </span>
          </p>
        </div>
      )}
    </OnboardingLayout>
  );
};

export default Index;
