import React, { useState } from "react";
import styles from "./index.module.scss";
import OnboardingLayout from "../../components/OnboardingLayout";
import OnboardingInput from "../../components/OnboardingInput";
import OnboardingButton from "../../components/OnboardingButton";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/reducers/userSlice";

const Index = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setError("");
    const pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(state.email);
    // console.log(state);
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
        return setError("Password must have six (6) characters");
      }
      const res = await axios.post("/api/user/login", {
        ...state,
      });
      if (res.status === 200) {
        toast.success("Welcome to Akara, Login successful.");
        localStorage.setItem("user", res.data.accessToken);
        dispatch(setUser(res.data));
        router.push("/");
      } else {
        toast.error(res.statusText);
      }

      // console.log(res);
    } catch (error: any) {
      console.log(error)
      if (error.response.status === 401) {
        return setError(error.response.data.message);
      }
      if (error.response.status === 400) {
        return setError(error.response.data.message);
      }
      if (error.response.status === 500) {
        return setError("Server error, please try again later");
      }
    }
  };

  return (
    <OnboardingLayout>
      <div className={styles.login}>
        <h6 className={styles.title}>Login</h6>
        <p className={styles.text}>Log in with your email address</p>
        {error !== "" && <span className={styles.error}>{error}</span>}
        <div className={styles.inputs}>
          <OnboardingInput
            onChange={handleChange}
            name="email"
            label="Email"
            type="email"
            placeholder="sarah@gmail.com"
          />
          <OnboardingInput
            onChange={handleChange}
            name="password"
            label="Password"
            type="password"
            placeholder="***********"
          />
        </div>
        <OnboardingButton onClick={handleSubmit} text="Log in" />
        <span
          className={styles.forgot}
          onClick={() => router.push("/forgot-password")}
        >
          Forgot Password
        </span>
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
            onClick={() => router.push("/signup")}
          >
            {" "}
            Sign up
          </span>
        </p>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={7000}
        hideProgressBar={true}
        newestOnTop={true}
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
