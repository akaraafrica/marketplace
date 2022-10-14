import "../styles/globals.scss";
import "plyr-react/dist/plyr.css";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/bundle";
import "./_app.css";
import "react-toastify/dist/ReactToastify.css";
import "./react-quill.css";
import type { AppProps } from "next/app";
import { ethers } from "ethers";
import { AuthProvider } from "../contexts/AuthContext";
import { Web3ReactProvider } from "@web3-react/core";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <Web3ReactProvider
        getLibrary={(provider: any) =>
          new ethers.providers.Web3Provider(provider)
        }
      >
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Web3ReactProvider>
    </SWRConfig>
  );
}

export default MyApp;
