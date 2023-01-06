import firebase from "../lib/firebaseConfig";
import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import userDs from "../../ds/user.ds";
import axios from "axios";

const twitterLogin = async (account: any, setError: any, setVerify?: any) => {
  const provider = new TwitterAuthProvider();
  const auth = getAuth(firebase);
  setError("");
  try {
    const { user } = await signInWithPopup(auth, provider);
    console.log(user);

    try {
      const resp = await axios.post("/api/user/loginGoogle", {
        email: user.email,
      });
      return resp;
    } catch (error: any) {
      console.log(error);
      if (
        error.response.data.message ===
        "You have not been signed up. Please signup to login"
      ) {
        console.log("no user found");
        const res = await userDs.create({
          address: account,
          email: user.email,
          password: user.uid,
          name: user.displayName,
          username: user.email?.split("@")[0],
          dob: null,
          gender: null,
        });
        if (user.photoURL) {
          await userDs.updateProfile({
            id: res.data.user.id,
            avatar: user.photoURL,
          });
        }
        const resp = await axios.post("/api/user/loginGoogle", {
          email: user.email,
        });
        return resp;
      }
    }
  } catch (error: any) {
    console.log(error);
    if (error.code === "auth/account-exists-with-different-credential") {
      throw new Error("Use email or google to login");
    }
    if (error.response?.status === 401)
      throw new Error(error?.response?.data?.message);
    if (error?.response?.status === 409)
      throw new Error(error?.response?.data?.message);
    if (error?.response?.status === 500)
      throw new Error("Server error, please try again later");
  }
};
export default twitterLogin;
