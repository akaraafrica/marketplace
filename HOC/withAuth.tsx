import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { UserDs } from "../ds";
/* eslint-disable react/display-name */
export default function withAuth(WrappedComponent: any) {
  return function (props: any) {
    const Router = useRouter();
    const [verified, setVerified] = useState<boolean | null>(null);
    const user = useUser()?.user;
    useEffect(() => {
      if (user) {
        setVerified(true);
      } else {
        setVerified(false);
      }
    }, [user]);

    if (verified) return <WrappedComponent {...props} />;
    else  Router.replace("/login");
  };
}
