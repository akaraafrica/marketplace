import axios, { AxiosError, AxiosInstance } from "axios";
import { getCookies, setCookies, removeCookies } from "cookies-next";
import { TbChevronDownLeft } from "react-icons/tb";
import { signOut } from "../contexts/AuthContext";
import { AuthTokenError } from "./errors/AuthTokenError";

let isRefreshing = false;
let failedRequestQueue: {
  onSuccess: (token: string) => void;
  onFailure: (err: AxiosError<unknown, any>) => void;
}[] = [];

export function setupAPIClient(ctx = undefined): any {
  let cookies = getCookies();

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DOMAIN!,
    headers: {
      Authorization: `Bearer ${cookies["nextauth.token"]}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (!error || !error.response) {
        console.log("inside here");
        return Promise.reject(error);
      }
      console.log("about to switch here");
      switch (error.response.status as number) {
        case 400:
          return Promise.reject({
            status: error.status,
            data: error.response.statusText,
            hasError: true,
            error: error.response.data,
          });
          break;
        case 401:
          if (error.response.statusText === "token.expired") {
            cookies = getCookies();

            // getCookies('key');
            // setCookies('key', 'value');
            // removeCookies('key');

            const { "nextauth.refreshToken": refreshToken } = cookies;
            const originalConfig = error.config;

            console.log("token has expired");
            if (!isRefreshing) {
              isRefreshing = true;

              api
                .post("/user/refresh", {
                  refreshToken,
                })
                .then((response) => {
                  const { token } = response.data;
                  setCookies("nextauth.token", token, {
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                    path: "/",
                  });

                  setCookies(
                    "nextauth.refreshToken",
                    response.data.refreshToken,
                    {
                      maxAge: 60 * 60 * 24 * 30, // 30 days
                      path: "/",
                    }
                  );
                  // api.defaults.headers["Authorization"] = `Bearer ${token}`;
                  api.defaults.headers.head[
                    "Authorization"
                  ] = `Bearer ${token}`;

                  failedRequestQueue.forEach((request) =>
                    request.onSuccess(token)
                  );
                  failedRequestQueue = [];
                })
                .catch((err) => {
                  console.log("ap ierror here ", err);
                  failedRequestQueue.forEach((request) =>
                    request.onFailure(err)
                  );
                  failedRequestQueue = [];

                  if (typeof window !== "undefined") {
                    console.log("window undefined");
                    signOut();
                  } else {
                    console.log("other token error");
                    return Promise.reject(new AuthTokenError());
                  }
                })
                .finally(() => {
                  isRefreshing = false;
                });
            }

            return new Promise((resolve, reject) => {
              failedRequestQueue.push({
                onSuccess: (token: string) => {
                  //originalConfig.headers["Authorization"] = `Bearer ${token}`;
                  //    originalConfig.headers ["Authorization"] = `Bearer ${token}`;

                  resolve(api(originalConfig));
                },
                onFailure: (err: AxiosError) => {
                  reject(err);
                },
              });
            });
          } else {
            console.log("token has not expired");
            if (typeof window === "undefined") {
              signOut();
            } else {
              return Promise.reject(new AuthTokenError());
            }
          }
          break;
        case 500:
          return Promise.reject(error);
          break;
        default:
          return Promise.reject(error);
          break;
        // and so on..
      }
    }
  );
  return api;
}
