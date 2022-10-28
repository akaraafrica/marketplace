import "../styles/globals.scss";
import "plyr-react/dist/plyr.css";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/bundle";
import "./_app.css";
import "react-toastify/dist/ReactToastify.css";
import "./react-quill.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
const MainAppWrapper: any = dynamic(
  () => import("../components/MainAppWrapper")
);
function MyApp({ Component, pageProps }: AppProps) {
  return <MainAppWrapper Component={Component} pageProps={pageProps} />;
}

export default MyApp;
