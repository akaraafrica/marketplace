import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { SupportedChainId } from "../constants";

export const injected = new InjectedConnector({
  supportedChainIds: [
    SupportedChainId.MAINNET,
    SupportedChainId.ROPSTEN,
    SupportedChainId.RINKEBY,
    SupportedChainId.GOERLI,
    SupportedChainId.KOVAN,
    1337,
    1339,
  ],
});

export const network = new NetworkConnector({
  urls: {
    1339: "https://ropsten.infura.io/v3/5aa48dce1fac44fa80f379d5dec09472",
    1337: "http://localhost:8545",
  },
  defaultChainId: 1,
});
