import { SupportedChainId } from "./chains";

export const CHAIN_TO_AKARA_MARKETPLACE_ADDRESS = {
  [SupportedChainId.MAINNET]: "",
  [SupportedChainId.ROPSTEN]: "0xb404Ea3acA5d51f2f6AfA774e6350626F5A1fF51",
  [SupportedChainId.RINKEBY]: "",
  [SupportedChainId.KOVAN]: "",
  [SupportedChainId.GOERLI]: "",
};

export const CHAIN_TO_AKARA_COLLECTION_PROTOCOL_ADDRESS = {
  [SupportedChainId.MAINNET]: "0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95",
  [SupportedChainId.ROPSTEN]: "0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351",
  [SupportedChainId.RINKEBY]: "0xf5D915570BC477f9B8D6C0E980aA81757A3AaC36",
  [SupportedChainId.KOVAN]: "0xD3E51Ef092B2845f10401a0159B2B96e8B6c3D30",
  [SupportedChainId.GOERLI]: "0x6Ce570d02D73d4c384b46135E87f8C592A8c86dA",
};
