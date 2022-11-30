import React, { useEffect, useState, useContext } from "react";
import styles from "./index.module.scss";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../connectors";
import { AuthContext } from "../../contexts/AuthContext";
import googleLogin from "../../utils/auth/googleLogin";
import facebookLogin from "../../utils/auth/facebookLogin";
import twitterLogin from "../../utils/auth/twitterLogin";
import OnboardingLayout from "../../components/global/OnboardingLayout";
import OnboardingInput from "../../components/global/OnboardingInput";
import { useForm } from "react-hook-form";
import Button from "../../components/global/Button/Button";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Index = () => {
  const router = useRouter();
  const { account, active, activate } = useWeb3React();
  const { signIn, completeLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(25, "Password cannot exceed more than 20 characters"),
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });
  useEffect(() => {
    if (!active) activate(injected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
      const res = await facebookLogin(account, setError);
      console.log("facebook login", res);
      completeLogin(res);
    } catch (error: any) {
      toast.error(error.error?.message || error.message);
    }
  };

  const handlegoogleLogin = async () => {
    if (!account) {
      toast.info("Please connect with metamask to login");
      return;
    }
    try {
      const res = await googleLogin(account, setError);
      console.log("google login ", res);
      completeLogin(res);
    } catch (error: any) {
      console.log(error);
      toast.error(error.error?.message || error.message);
    }
  };

  const submit = async () => {
    if (!account) {
      toast.info("Please connect with metamask to login");
      setError("Please connect with metamask to signup");
      return;
    }
    const data = getValues();
    setLoading(true);
    try {
      const res = await signIn({
        email: data.email,
        password: data.password,
      });
      console.log("new signin result here ", res);
    } catch (error: any) {
      console.log("error here ", error.error?.message);

      setLoading(false);
      toast.error(error.error?.message || error.message);
      setError(error.error?.message || error.message);
    }
  };

  return (
    <OnboardingLayout>
      <div className={styles.login}>
        <h6 className={styles.title}>Login</h6>
        <p className={styles.text}>Log in with your email address</p>
        {error !== "" && <span className={styles.error}>{error}</span>}

        <form onSubmit={handleSubmit(submit)}>
          <div className={styles.inputs}>
            <OnboardingInput
              name="email"
              register={register}
              errors={errors}
              label="Email"
              type="email"
              placeholder="sarah@gmail.com"
            />
            <OnboardingInput
              name="password"
              register={register}
              errors={errors}
              label="Password"
              type="password"
              placeholder="***********"
            />
            <Button loading={loading}>Log in</Button>
          </div>
        </form>
        <span
          className={styles.forgot}
          onClick={() => router.push("/forgot-password")}
        >
          Forgot Password
        </span>
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
            onClick={() => router.push("/signup")}
          >
            {" "}
            Sign up
          </span>
        </p>
      </div>
    </OnboardingLayout>
  );
};

export default Index;
