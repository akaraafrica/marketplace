import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
/* eslint-disable react/display-name */
export default function withAuth(WrappedComponent: any) {
  return function (props: any) {
    const Router = useRouter();
    const [verified, setVerified] = useState<boolean | null>(null);
    const { user, isAuthenticated, loading } = useContext(AuthContext);
    useEffect(() => {
      if (!!loading) {
        if (isAuthenticated) setVerified(true);
      } else {
        setVerified(false);
      }
    }, [user]);
    if (typeof window !== "undefined" && verified != null) {
      if (verified != null) {
        return <WrappedComponent {...props} />;
      } else {
        Router.replace("/login");
      }
    }
    return null;
  };
}
