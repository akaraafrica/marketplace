import React, { useState } from "react";
import styles from "./index.module.scss";
import OnboardingInput from "../../../components/OnboardingInput";
import OnboardingLayout from "../../../components/OnboardingLayout";
import OnboardingButton from "../../../components/OnboardingButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/router";

const Index = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfrim] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const email = router.query.email;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleChangeConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfrim(e.target.value);
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      if (!password) {
        return setError("Type your new password.");
      }
      if (!confirm) {
        return setError("Confirm your new password.");
      }
      const res = await axios.post("/api/user/password-reset", {
        email: email,
        password: password,
      });

      if (res.status === 200) {
        router.push("/login");
        return toast.success("Password reset was successful.");
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
      <div className={styles.root}>
        <h6 className={styles.title}>Reset Password</h6>
        <p className={styles.text}>Reset your account password</p>
        {error !== "" && <span className={styles.error}>{error}</span>}
        <div className={styles.inputs}>
          <OnboardingInput
            onChange={handleChange}
            name="password"
            label="New Password"
            type="password"
            placeholder="************"
          />
          <OnboardingInput
            onChange={handleChangeConfirm}
            name="password"
            label="Confirm New Password"
            type="password"
            placeholder="***********"
          />
          {password && confirm && password !== confirm && (
            <span className={styles.match}>Password does not match</span>
          )}
        </div>
        <OnboardingButton onClick={handleSubmit} text="Reset Password" />
      </div>
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
