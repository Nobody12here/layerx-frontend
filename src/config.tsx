import { http, createConfig } from '@wagmi/core'
import {  sepolia } from '@wagmi/core/chains'

export const config = createConfig({
  chains: [ sepolia],
  transports: {
    // [mainnet.id]: http(),
    [sepolia.id]: http("https://sepolia.infura.io/v3/bb27752d9dc94ef8bb759f8f4a4083d6"),
  },
})