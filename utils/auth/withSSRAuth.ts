import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { getCookies, setCookies, removeCookies } from "cookies-next";
import { AuthTokenError } from "../../services/errors/AuthTokenError";
import decode from "jwt-decode";
import { validateUserPermissions } from "./validateUserPermissions";

type WithSSRAuthOptions = {
  permissions: string[];
  roles: string[];
};

export function withSSRAuth<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>,
  options?: WithSSRAuthOptions
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = getCookies(ctx);

    const token = cookies["nextauth.token"];

    if (!cookies["nextauth.token"]) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    if (options) {
      const user = decode<{ permissions: string[]; roles: string[] }>(
        token || ""
      );
      const { permissions, roles } = options;

      // const userHasValidPermissions = validateUserPermissions({
      //   user,
      //   permissions,
      //   roles,
      // });

      // if (!userHasValidPermissions) {
      //   return {
      //     notFound: true,
      //   };
      // }
    }

    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        removeCookies("nextauth.token");
        removeCookies("nextauth.refreshToken");

        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
      return {
        notFound: true,
      };
    }
  };
}
