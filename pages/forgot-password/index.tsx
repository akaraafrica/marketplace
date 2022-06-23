import React, { useState } from "react";
import styles from "./index.module.scss";
import OnboardingLayout from "../../components/OnboardingLayout";
import OnboardingInput from "../../components/OnboardingInput";
import OnboardingButton from "../../components/OnboardingButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import VerifyEmail from "../../components/VerifyEmail";

const Index = () => {
  const [email, setEmail] = useState("");
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(email);

    try {
      if (!email) {
        return setError("Email field is empty");
      }
      if (!result) {
        return setError("Invalid email, check email and try again");
      }

      const res = await axios.post("/api/user/forgot-password", {
        email: email,
      });

      if (res.status === 200) {
        setVerify(true);
        return toast.success(
          "Email has been sent to mailbox with reset password link."
        );
      }
    } catch (error: any) {
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
      {verify ? (
        <VerifyEmail
          title="Check your email"
          text="A Password reset link has been sent to your email"
        />
      ) : (
        <div className={styles.forgot}>
          <h6 className={styles.title}>Forgot Password</h6>
          <p>Type your correct email address to get your password reset link</p>
          {error !== "" && <span className={styles.error}>{error}</span>}
          <div className={styles.action}>
            <OnboardingInput
              label="Email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              onChange={handleChange}
            />
            <OnboardingButton text="Reset Password" onClick={handleSubmit} />
          </div>
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
