<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
  import HelloWorld from './components/HelloWorld.vue';
  import WavePortalArtifact from '../../my-wave-portal/artifacts/contracts/WavePortal.sol/WavePortal.json';
  import { WavePortal } from '../../my-wave-portal/typechain/WavePortal';
  import { onMounted, ref } from 'vue';
  import { ethers } from 'ethers';

  const { ethereum } = window;

  if (!ethereum) {
    throw new Error("Ethereum object doesn't exist!");
  }

  const provider = new ethers.providers.Web3Provider(ethereum as never);
  const signer = provider.getSigner();
  const wavePortalContract = new ethers.Contract(
    import.meta.env.VITE_WAVE_PORTAL_ADDRESS,
    WavePortalArtifact.abi,
    signer,
  ) as WavePortal;

  const wavesCount = ref(0);

  async function wave() {
    const transaction = await wavePortalContract.wave('Hello, world!');

    const confirmed = await transaction.wait();

    console.log(confirmed);
  }

  function getNetworkName(networkId: number) {
    switch (networkId) {
      case 1:
        return 'Mainnet';
      case 3:
        return 'Ropsten';
      case 4:
        return 'Rinkeby';
      case 42:
        return 'Kovan';
      default:
        return 'Unknown';
    }
  }

  onMounted(async () => {
    const accounts = await requestAccounts();
    const networkId = await getNetworkId();
    const networkName = getNetworkName(Number(networkId));

    console.log(networkName);

    console.log(accounts);
  });

  async function getWaves() {
    const waves = await wavePortalContract.getAllWaves();
    console.log(waves);
    wavesCount.value = (await wavePortalContract.getTotalWaves()).toNumber();
  }

  async function getNetworkId() {
    if (window.ethereum) {
      return window.ethereum.request({ method: 'net_version' });
    } else {
      throw new Error('No ethereum provider found');
    }
  }

  async function getAccounts() {
    if (window.ethereum) {
      return window.ethereum.request({ method: 'eth_accounts' });
    } else {
      throw new Error('No ethereum provider found');
    }
  }

  async function requestAccounts() {
    if (window.ethereum) {
      return window.ethereum.request<string[]>({
        method: 'eth_requestAccounts',
      });
    } else {
      throw new Error('No ethereum provider found');
    }
  }
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <button class="waveButton" @click="wave">Wave at Me</button>
  <button class="waveButton" @click="getWaves">
    Get Waves {{ wavesCount }}
  </button>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
