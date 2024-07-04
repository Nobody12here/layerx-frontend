import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [ sepolia],
  connectors: [
    injected(),
    coinbaseWallet(),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
  ],
  transports: {
    
    [sepolia.id]: http("https://sepolia.infura.io/v3/bb27752d9dc94ef8bb759f8f4a4083d6"),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
