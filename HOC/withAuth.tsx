import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
/* eslint-disable react/display-name */
export default function withAuth(WrappedComponent: any) {
  return function (props: any) {
    const Router = useRouter();
    const [verified, setVerified] = useState<boolean | null>(null);
    const { user, isAuthenticated, signIn } = useContext(AuthContext);

    useEffect(() => {
      if (user) {
        setVerified(true);
      } else {
        setVerified(false);
      }
    }, [user]);

    if (verified) return <WrappedComponent {...props} />;
    else Router.replace("/login");
  };
}
