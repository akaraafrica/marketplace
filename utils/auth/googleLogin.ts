import firebase from "../lib/firebaseConfig";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import userDs from "../../ds/user.ds";
import axios from "axios";

const googleLogin = async (account: any, setError: any, setVerify?: any) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(firebase);
  try {
    const { user } = await signInWithPopup(auth, provider);

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

    if (error.response?.status === 401)
      throw new Error(error?.response?.data?.message);
    if (error?.response?.status === 409)
      throw new Error(error?.response?.data?.message);
    if (error?.response?.status === 500)
      throw new Error("Server error, please try again later");
  }
};
export default googleLogin;
