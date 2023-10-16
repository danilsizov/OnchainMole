<script setup>
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/vue'
import { mainnet, arbitrum, avalanche, bsc, polygon } from '@wagmi/core/chains'

const projectId = 'b7915d30215559247437b78bf90f8d52'

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum, avalanche, bsc, polygon]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig, projectId, chains })
</script>


<template>
  <div class="menu">
    <div class="logo">
      OnChainMole
    </div>
    <w3m-button />
  </div>
</template>

<style>
.menu {
  width: 100%;
  height: 60px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo {
  font-size: 20px;
  color: white;
  font-weight: 800;
}

.wallet_connect {
  padding: 7px 15px;
  background: linear-gradient(0deg, #389466, #42b883);
  color: white;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
}
</style>