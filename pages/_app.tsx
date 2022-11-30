import "../styles/globals.scss";
import "plyr-react/dist/plyr.css";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/bundle";
import "./_app.css";
import "react-toastify/dist/ReactToastify.css";
import "./react-quill.css";
import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import LoadingSpinner from "../components/global/LoadingSpinner";
const MainAppWrapper: any = dynamic(
  () => import("../components/global/MainAppWrapper")
);
function MyApp({ Component, pageProps }: AppProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: string) => {
      console.log(`Loading: ${url}`);
      setOpen(true);
    };

    const handleStop = () => {
      setOpen(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <>
      <MainAppWrapper Component={Component} pageProps={pageProps} />
      <LoadingSpinner open={open} />
    </>
  );
}

export default MyApp;
