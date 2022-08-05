import React, { createContext, ReactNode, useEffect, useState } from "react";
import Router from "next/router";
import { useWeb3React } from "@web3-react/core";
import { getCookies, setCookies, removeCookies } from "cookies-next";
import { api } from "../services/apiClient";
import { AxiosResponse } from "axios";
import { IUser } from "../types/user.interface";
import { UserDs } from "../ds";

type SignInCredential = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredential) => Promise<void>;
  signOut: () => void;
  user: IUser | undefined;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  authChannel.postMessage("signOut");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser>();
  const { account, active, activate } = useWeb3React();

  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case "signOut":
          {
            // signOut();
            removeCookies("nextauth.token");
            removeCookies("nextauth.refreshToken");
            removeCookies("address");
            localStorage.clear();
            Router.push("/");
          }
          break;

        default: {
          break;
        }
      }
    };
  }, []);

  useEffect(() => {
    const id = localStorage.getItem("id");
    const { "nextauth.token": token } = getCookies();
    console.log("trying to get token ", id);
    if (id) {
      console.log("we have token please ", token);
      api
        .get(`/user/${id}`)
        .then((response: AxiosResponse) => {
          const { email, walletAddress, id } = response.data;
          console.log({ "response.data from user": response.data });

          setUser(response.data);
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCredential) {
    try {
      const response = await api.post("/api/user/login", {
        email,
        password,
      });

      if (response.status == 400) return response.error;

      const { accessToken, user, refreshToken } = response.data;

      setCookies("nextauth.token", accessToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setCookies("nextauth.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setCookies("address", user.walletAddress, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        // path: "/",
      });

      localStorage.setItem("id", user.id);
      localStorage.setItem("address", user.walletAddress);
      localStorage.setItem("accessToken", accessToken);

      const savedUser = await UserDs.fetch(account || "");
      setUser(savedUser);

      api.defaults.headers.head["Authorization"] = `Bearer ${accessToken}`;

      Router.push("/");
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
