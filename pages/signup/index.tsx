import React, { useState, useEffect, useRef } from "react";
import styles from "./index.module.scss";
import OnboardingLayout from "../../components/OnboardingLayout";
import OnboardingInput from "../../components/OnboardingInput";
import OnboardingButton from "../../components/OnboardingButton";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { BsFillCameraFill } from "react-icons/bs";
import axios from "axios";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../connectors";
import { toast } from "react-toastify";
import VerifyEmail from "../../components/VerifyEmail";
import NextImage from "../../components/Image";
import { getFileUploadURL } from "../../utils/upload/fileUpload";
import userDs from "../../ds/user.ds";

const Index = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    name: "",
    dob: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [gender, setGender] = useState("");
  const [verify, setVerify] = useState(false);
  const [image, setImage] = useState(null);
  const router = useRouter();

  const { account, active, activate } = useWeb3React();

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setError("");
    if (!account) {
      toast.info("Please connect with metamask to login");
      return;
    }

    const pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(state.email);

    try {
      if (!state.email) {
        return setError("Email field is empty");
      }
      if (!state.name) {
        return setError("Name field is empty");
      }
      if (!state.password) {
        return setError("Password field is empty");
      }
      if (!result) {
        return setError("Invalid email, check email and try again");
      }
      if (state.password.length < 6) {
        return setError(
          "Password is too short, choose a more secured password"
        );
      }
      if (state.password !== state.confirmPassword) {
        return setError("Password and confirm password does not match");
      }

      console.log(state, image, gender);

      const res = await userDs.create({
        address: account,
        email: state.email,
        password: state.password,
        name: state.name,
        dob: state.dob,
        gender: gender,
      });

      const imageUrl = await getFileUploadURL(
        image,
        `user/profile/${res.data.user.id}/`
      );

      console.log(res.data);
      await userDs.updateProfile({
        id: res.data.user.id,
        avatar: imageUrl,
      });
      if (res.status === 200) {
        setVerify(true);
      }
      console.log("response", res);
    } catch (error: any) {
      if (error.response.status === 401)
        return setError(error.response.data.message);
      if (error.response.status === 409)
        return setError(error.response.data.message);
      if (error.response.status === 500)
        return setError("Server error, please try again later");
    }
  };

  //
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
          <form className={styles.inputs}>
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
              onChange={handleChange}
              label="Name"
              name="name"
              type="text"
              placeholder="John Smith"
            />
            <OnboardingInput
              onChange={handleChange}
              label="Email"
              name="email"
              type="email"
              placeholder="sarah@gmail.com"
            />
            <OnboardingInput
              onChange={handleChange}
              label="Password"
              name="password"
              type="password"
              placeholder="***********"
            />
            <div className={styles.confirm}>
              <label>Confirm password</label>
              <input
                onChange={handleChange}
                name="confirmPassword"
                type="password"
                placeholder="***********"
                className={
                  state.confirmPassword &&
                  state.confirmPassword === state.password
                    ? styles.input
                    : styles.errorInput
                }
              />
            </div>
            {state.confirmPassword &&
              state.confirmPassword !== state.password && (
                <span className={styles.confirmError}>
                  Password does not match
                </span>
              )}
            <div className={styles.gender}>
              <label htmlFor="gender">Gender</label>
              <div className={styles.btns}>
                <button
                  className={gender === "MALE" ? styles.active : styles.button}
                  onClick={() => setGender("MALE")}
                  type="button"
                >
                  Male
                </button>
                <button
                  className={
                    gender === "FEMALE" ? styles.active : styles.button
                  }
                  onClick={() => setGender("FEMALE")}
                  type="button"
                >
                  Female
                </button>
                <button
                  className={
                    gender === "OTHERS" ? styles.active : styles.button
                  }
                  onClick={() => setGender("OTHERS")}
                  type="button"
                >
                  Others
                </button>
              </div>
            </div>
            <div className={styles.gender}>
              <label htmlFor="gender">Birthdate</label>
              <div className={styles.btns}>
                <OnboardingInput
                  type="date"
                  onChange={handleChange}
                  label=""
                  name="dob"
                  placeholder="choose your DOB"
                />
              </div>
            </div>
          </form>
          <OnboardingButton text="Sign up" onClick={handleSubmit} />
          <span className={styles.continue}>Or continue with</span>
          <div className={styles.socials}>
            <span>
              <FcGoogle />
            </span>
            <span>
              <FaFacebook color="#1877F2" />
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
