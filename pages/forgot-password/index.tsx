import React, { useState } from "react";
import styles from "./index.module.scss";
import { toast } from "react-toastify";
import axios from "axios";
import VerifyEmail from "../../components/VerifyEmail";
import OnboardingLayout from "../../components/global/OnboardingLayout";
import OnboardingInput from "../../components/global/OnboardingInput";

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
            {/* <OnboardingInput
              label="Email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
            /> */}
            {/* <Button text="Reset Password" onClick={handleSubmit} /> */}
          </div>
        </div>
      )}
    </OnboardingLayout>
  );
};

export default Index;
