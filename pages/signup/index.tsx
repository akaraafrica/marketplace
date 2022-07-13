import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import OnboardingLayout from "../../components/OnboardingLayout";
import OnboardingInput from "../../components/OnboardingInput";
import OnboardingButton from "../../components/OnboardingButton";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../connectors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyEmail from "../../components/VerifyEmail";

const Index = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [verify, setVerify] = useState(false);
  const router = useRouter();

  const { account, active, activate } = useWeb3React();

  useEffect(() => {
    if (!account) {
      activate(injected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      const res = await axios.post("/api/user/signup", {
        address: account,
        email: state.email,
        password: state.password,
      });

      if (res.status === 200) {
        toast.success(
          "Welcome to Akara, check your email to complete verification"
        );
        setVerify(true);
      }
      console.log(res);
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
          <h6 className={styles.title}>Sign Up</h6>
          <p className={styles.text}>Sign up with your email and password</p>
          {error !== "" && <span className={styles.error}>{error}</span>}
          <form className={styles.inputs}>
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
          </form>
          <OnboardingButton text="Sign up" onClick={handleSubmit} />
          {/* <span className={styles.forgot}>Forgot Password</span> */}
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

      <ToastContainer
        position="top-center"
        autoClose={7000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </OnboardingLayout>
  );
};

export default Index;
