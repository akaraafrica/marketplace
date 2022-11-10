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
      if (!loading && isAuthenticated) {
        setVerified(true);
      }
    }, [user]);
    if (!loading && !isAuthenticated && verified === null) {
      setVerified(false);
      Router.replace("/login");
    }
    if (typeof window !== "undefined" && verified != null) {
      if (verified === true) {
        return <WrappedComponent {...props} />;
      } else {
        Router.replace("/login");
      }
    }
  };
}
