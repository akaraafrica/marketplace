import "../styles/globals.scss";
import "plyr-react/dist/plyr.css";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/bundle";
import "./_app.css";
import "./react-quill.css";
import type { AppProps } from "next/app";
import { ethers } from "ethers";
import { Provider } from "react-redux";
import store from "../store/store";
import { AuthProvider } from "../contexts/AuthContext";
import { Web3ReactProvider } from "@web3-react/core";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Web3ReactProvider
        getLibrary={(provider: any) =>
          new ethers.providers.Web3Provider(provider)
        }
      >
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Web3ReactProvider>
    </Provider>
  );
}

export default MyApp;
