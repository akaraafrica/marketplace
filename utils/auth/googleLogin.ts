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
        console.log("no user found");
        const res = await userDs.create({
          address: account,
          email: user.email,
          password: user.uid,
          name: user.displayName,
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
        // if (res.status === 200) {
        //     setVerify(true);
        // }
      }
    }
  } catch (error: any) {
    console.log(error);

    if (error.response?.status === 401)
      return setError(error?.response?.data?.message);
    if (error?.response?.status === 409)
      return setError(error?.response?.data?.message);
    if (error?.response?.status === 500)
      return setError("Server error, please try again later");
  }
  // .then((result) => {
  //     const user = result.user;
  //     console.log(result);
  //     console.log({ user });

  // }).catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  // });
};
export default googleLogin;
