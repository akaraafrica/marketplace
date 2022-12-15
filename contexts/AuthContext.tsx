import React, { createContext, ReactNode, useEffect, useState } from "react";
import Router from "next/router";
import { useWeb3React } from "@web3-react/core";
import { setCookies, removeCookies } from "cookies-next";
import { api } from "../services/apiClient";
import { IUser } from "../types/user.interface";
import { AxiosError } from "axios";

type SignInCredential = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredential) => Promise<void>;
  signOut: () => void;
  completeLogin: (response: any) => void;
  user: IUser | undefined;
  isAuthenticated: boolean;
  loading: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export async function signOut() {
  removeCookies("nextauth.token");
  removeCookies("nextauth.refreshToken");
  removeCookies("address");
  localStorage.clear();
  authChannel.postMessage("signOut");
  Router.push("/login");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser>();
  const { account, active, activate } = useWeb3React();
  const isAuthenticated = !!user;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (isAuthenticated && account != user.walletAddress) signOut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  useEffect(() => {
    api
      .get(`/api/me`)
      .then((savedUser: { data: IUser }) => {
        setUser(savedUser.data);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");
    authChannel.onmessage = (message) => {
      switch (message.data) {
        case "signOut":
          Router.push("/");
          setUser(undefined);
          setLoading(false);

          break;

        default:
          break;
      }
    };
  }, []);
  async function completeLogin(response: any) {
    if (response?.status == 400) return response?.error;
    if (response?.data) {
      const { accessToken, user, refreshToken } = response?.data;
      if (account && account != user.walletAddress) {
        throw new AxiosError(
          "Please connect the metamask account attached to this credentials to login.",
          "500"
        );
      }

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

      api.defaults.headers.head["Authorization"] = `Bearer ${accessToken}`;

      api
        .get(`/api/me`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((savedUser: { data: IUser }) => {
          setUser(savedUser.data);
          setLoading(false);
        })
        .catch((err: any) => console.log(err));

      Router.push("/");
    }
  }
  async function signIn({ email, password }: SignInCredential) {
    try {
      if (email && password) {
        const response = await api.post("/api/user/login", {
          email,
          password,
        });
        return completeLogin(response);
      }
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  }

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, user, isAuthenticated, loading, completeLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}
