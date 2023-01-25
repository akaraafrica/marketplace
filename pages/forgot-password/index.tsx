import React, { useState } from "react";
import styles from "./index.module.scss";
import { toast } from "react-toastify";
import axios from "axios";
import VerifyEmail from "../../components/global/VerifyEmail";
import OnboardingLayout from "../../components/global/OnboardingLayout";
import OnboardingInput from "../../components/global/OnboardingInput";
import Button from "../../components/global/Button/Button";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Index = () => {
  const [email, setEmail] = useState("");
  const [verify, setVerify] = useState(false);
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

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const email = e.target.value;
  //   setEmail(email);
  // };

  const submit = async () => {
    // const pattern =
    //   /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    // const result = pattern.test(email);
    const data = getValues();
    setLoading(true);

    try {
      // if (!email) {
      //   return setError("Email field is empty");
      // }
      // if (!result) {
      //   return setError("Invalid email, check email and try again");
      // }

      const res = await axios.post("/api/user/forgot-password", {
        email: data.email,
      });

      if (res.status === 200) {
        setLoading(false);
        setVerify(true);
        return toast.success(
          "Email has been sent to mailbox with reset password link."
        );
      }
    } catch (error: any) {
      setLoading(false);
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
          <form className={styles.action} onSubmit={handleSubmit(submit)}>
            <OnboardingInput
              name="email"
              register={register}
              errors={errors}
              label="Email"
              type="email"
              dataTestId="email"
              placeholder="sarah@gmail.com"
            />
            <Button type="submit" data-testid="submit">
              Reset Password
            </Button>
          </form>
        </div>
      )}
    </OnboardingLayout>
  );
};

export default Index;
