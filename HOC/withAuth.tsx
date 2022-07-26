import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UserDs } from "../ds";
/* eslint-disable react/display-name */
export default function withAuth(WrappedComponent: any) {
  return function (props: any) {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      const address = localStorage.getItem("address");
      if (!address) {
        Router.replace("/login");
      } else {
        const checkUser = async () => {
          try {
            await UserDs.fetch(address);
            setVerified(true);
          } catch (error) {
            localStorage.removeItem("address");
            Router.replace("/login");
          }
        };
        checkUser();
      }
    }, [Router]);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
}
