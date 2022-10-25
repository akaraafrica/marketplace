import { providers } from "ethers";
import { AuthProvider } from "../contexts/AuthContext";
import { Web3ReactProvider } from "@web3-react/core";
import { SWRConfig } from "swr";

function MainAppWrapper({ Component, pageProps }: any) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <Web3ReactProvider
        getLibrary={(provider: any) => new providers.Web3Provider(provider)}
      >
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Web3ReactProvider>
    </SWRConfig>
  );
}

export default MainAppWrapper;
