export enum SupportedChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,
}

export const CHAIN_IDS_TO_NAMES = {
  [SupportedChainId.MAINNET]: "mainnet",
  [SupportedChainId.ROPSTEN]: "ropsten",
  [SupportedChainId.RINKEBY]: "rinkeby",
  [SupportedChainId.GOERLI]: "goerli",
  [SupportedChainId.KOVAN]: "kovan",
};
