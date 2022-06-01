<script setup lang="ts">
import WavePortalArtifact from '../../../escrow-contracts/artifacts/contracts/WavePortal.sol/WavePortal.json';
import { WavePortal } from '../../../escrow-contracts/typechain/WavePortal';
import { ref } from 'vue';
import { ethers } from 'ethers';
import HeaderBar from '~/components/HeaderBar.vue';

const { ethereum } = window;

if (!ethereum) {
  throw new Error("Ethereum object doesn't exist!");
}

let wavePortalContract: WavePortal;

const wavesCount = ref(0);

async function connectMetaMask() {
  await requestAccounts();
  const provider = new ethers.providers.Web3Provider(ethereum as never);

  wavePortalContract = new ethers.Contract(
    import.meta.env.VITE_WAVE_PORTAL_ADDRESS,
    WavePortalArtifact.abi,
    provider.getSigner(),
  ) as WavePortal;
}

async function wave() {
  const transaction = await wavePortalContract.wave('Hello, world!');

  const confirmed = await transaction.wait();

  console.log(confirmed);
}

// onMounted(async () => {
//   const accounts = await requestAccounts();
//   const networkId = await getNetworkId();
//   const networkName = getNetworkName(Number(networkId));
//
//   console.log(networkName);
//
//   console.log(accounts);
// });

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
  if (ethereum) {
    return ethereum.request({ method: 'eth_accounts' });
  } else {
    throw new Error('No ethereum provider found');
  }
}

async function requestAccounts() {
  if (ethereum) {
    return ethereum.request<string[]>({
      method: 'eth_requestAccounts',
    });
  } else {
    throw new Error(
      'Missing install Metamask. Please access https://metamask.io/ to install extension on your browser',
    );
  }
}
</script>

<template>
  <!--  <button @click="connectMetaMask">Connect</button>-->
  <!--  <button bg="hex-84ff38" p="2.5" class="hover:py-3">123123</button>-->
  <!--  <button class="waveButton" @click="wave">Wave at Me</button>-->
  <!--  <button class="waveButton" @click="getWaves">-->
  <!--    Get Waves {{ wavesCount }}-->
  <!--  </button>-->
  <!--  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />-->
  <!--  ====================== Header Section =============================  -->
  <header-bar></header-bar>
  <!--  ====================== Product Section =============================  -->
  <section class="product-section relative pt-32 pb-28 lg:pt-32 lg:pb-20">
    <div class="container mx-auto relative px-4 z-10">
      <div
        class="section-title flex flex-wrap items-center justify-between mb-8 lg:mb-14"
      >
        <div class="flex items-center mb-3">
          <span
            class="flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg w-10 h-10 mr-4"
            ><img class="w-4 h-4" src="assets/images/sec-icon3.svg" alt="title"
          /></span>
          <h3
            class="font-display text-blueGray-900 font-bold text-2xl lg:text-4xl"
          >
            Hot Auctions
          </h3>
        </div>
        <a
          class="arrow-btn block bg-indigo-100 text-indigo-500 text-sm text-sm font-body font-bold rounded py-2 px-4 ml-14 transition duration-500 hover:bg-indigo-50"
          href="/light/explore"
          >See All</a
        >
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div
          class="product-box shadow bg-white lg:flex p-6 rounded transition duration-500 hover:shadow-lg aos-init aos-animate"
          data-aos="fade-up"
        >
          <div
            class="flex-shrink-0 product-image relative rounded mb-4 lg:mb-0 overflow-hidden"
          >
            <img
              class="w-full lg:h-56 lg:w-56 xl:w-72 object-cover"
              src="assets/images/product/10.jpg"
              alt="title"
            />
          </div>
          <div
            class="product-content flex flex-col flex-grow justify-center md:pl-6"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <a
                  class="relative"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/1.jpg"
                    alt="title"
                /></a>
                <a
                  class="relative -left-2"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/2.jpg"
                    alt="title" />
                  <span class="absolute bottom-0 right-1"
                    ><img
                      class="w-3 h-3"
                      src="assets/images/verified-icon.svg"
                      alt="title" /></span
                ></a>
              </div>
              <div class="flex items-center">
                <span
                  class="bg-indigo-100 flex items-center justify-center rounded-lg w-8 h-8"
                  ><img src="assets/images/heart-icon2.svg" alt="title"
                /></span>
                <p class="font-body font-bold text-sm text-blueGray-600 ml-2">
                  79
                </p>
              </div>
            </div>
            <div>
              <h3
                class="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500"
              >
                <a href="/light/item-single2">Oilpaint Artwork #2</a>
              </h3>
            </div>
            <div class="mt-4">
              <p class="font-body text-sm text-blueGray-600">Current Bid</p>
              <p
                class="flex items-center font-body font-bold text-blueGray-900 my-1"
              >
                <img
                  class="w-5 h-5 inline-block mr-1"
                  src="assets/images/cryptocurrency-icon.svg"
                  alt="title"
                />
                0.008 ETH
              </p>
            </div>
          </div>
        </div>
        <div
          class="product-box shadow bg-white lg:flex p-6 rounded transition duration-500 hover:shadow-lg aos-init aos-animate"
          data-aos="fade-up"
        >
          <div
            class="flex-shrink-0 product-image relative rounded mb-4 lg:mb-0 overflow-hidden"
          >
            <img
              class="w-full lg:h-56 lg:w-56 xl:w-72 object-cover"
              src="assets/images/product/3.gif"
              alt="title"
            />
          </div>
          <div
            class="product-content flex flex-col flex-grow justify-center md:pl-6"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <a
                  class="relative"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/1.jpg"
                    alt="title"
                /></a>
                <a
                  class="relative -left-2"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/2.jpg"
                    alt="title" />
                  <span class="absolute bottom-0 right-1"
                    ><img
                      class="w-3 h-3"
                      src="assets/images/verified-icon.svg"
                      alt="title" /></span
                ></a>
              </div>
              <div class="flex items-center">
                <span
                  class="bg-indigo-100 flex items-center justify-center rounded-lg w-8 h-8"
                  ><img src="assets/images/heart-icon2.svg" alt="title"
                /></span>
                <p class="font-body font-bold text-sm text-blueGray-600 ml-2">
                  23
                </p>
              </div>
            </div>
            <div>
              <h3
                class="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500"
              >
                <a href="/light/item-single2">Giga Boss #4 </a>
              </h3>
            </div>
            <div class="mt-4">
              <p class="font-body text-sm text-blueGray-600">Current Bid</p>
              <p
                class="flex items-center font-body font-bold text-blueGray-900 my-1"
              >
                <img
                  class="w-5 h-5 inline-block mr-1"
                  src="assets/images/cryptocurrency-icon.svg"
                  alt="title"
                />
                0.008 ETH
              </p>
            </div>
          </div>
        </div>
        <div
          class="product-box shadow bg-white lg:flex p-6 rounded transition duration-500 hover:shadow-lg aos-init aos-animate"
          data-aos="fade-up"
        >
          <div
            class="flex-shrink-0 product-image relative rounded mb-4 lg:mb-0 overflow-hidden"
          >
            <img
              class="w-full lg:h-56 lg:w-56 xl:w-72 object-cover"
              src="assets/images/product/7.gif"
              alt="title"
            />
          </div>
          <div
            class="product-content flex flex-col flex-grow justify-center md:pl-6"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <a
                  class="relative"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/1.jpg"
                    alt="title"
                /></a>

                <a
                  class="relative -left-4"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/3.jpg"
                    alt="title" />
                  <span class="absolute bottom-0 right-1"
                    ><img
                      class="w-3 h-3"
                      src="assets/images/verified-icon.svg"
                      alt="title" /></span
                ></a>
              </div>
              <div class="flex items-center">
                <span
                  class="bg-indigo-100 flex items-center justify-center rounded-lg w-8 h-8"
                  ><img src="assets/images/heart-icon2.svg" alt="title"
                /></span>
                <p class="font-body font-bold text-sm text-blueGray-600 ml-2">
                  48
                </p>
              </div>
            </div>
            <div>
              <h3
                class="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500"
              >
                <a href="/light/item-single2">Animated Love </a>
              </h3>
            </div>
            <div class="mt-4">
              <p class="font-body text-sm text-blueGray-600">Current Bid</p>
              <p
                class="flex items-center font-body font-bold text-blueGray-900 my-1"
              >
                <img
                  class="w-5 h-5 inline-block mr-1"
                  src="assets/images/cryptocurrency-icon.svg"
                  alt="title"
                />
                0.008 ETH
              </p>
            </div>
          </div>
        </div>
        <div
          class="product-box shadow bg-white lg:flex p-6 rounded transition duration-500 hover:shadow-lg aos-init aos-animate"
          data-aos="fade-up"
        >
          <div
            class="flex-shrink-0 product-image relative rounded mb-4 lg:mb-0 overflow-hidden"
          >
            <img
              class="w-full lg:h-56 lg:w-56 xl:w-72 object-cover"
              src="assets/images/product/15.jpg"
              alt="title"
            />
          </div>
          <div
            class="product-content flex flex-col flex-grow justify-center md:pl-6"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <a
                  class="relative"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/1.jpg"
                    alt="title"
                /></a>
                <a
                  class="relative -left-2"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/3.jpg"
                    alt="title" />
                  <span class="absolute bottom-0 right-1"
                    ><img
                      class="w-3 h-3"
                      src="assets/images/verified-icon.svg"
                      alt="title" /></span
                ></a>
              </div>
              <div class="flex items-center">
                <span
                  class="bg-indigo-100 flex items-center justify-center rounded-lg w-8 h-8"
                  ><img src="assets/images/heart-icon2.svg" alt="title"
                /></span>
                <p class="font-body font-bold text-sm text-blueGray-600 ml-2">
                  17
                </p>
              </div>
            </div>
            <div>
              <h3
                class="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500"
              >
                <a href="/light/item-single2">Creative Oilpaint Artwork </a>
              </h3>
            </div>
            <div class="mt-4">
              <p class="font-body text-sm text-blueGray-600">Current Bid</p>
              <p
                class="flex items-center font-body font-bold text-blueGray-900 my-1"
              >
                <img
                  class="w-5 h-5 inline-block mr-1"
                  src="assets/images/cryptocurrency-icon.svg"
                  alt="title"
                />
                0.008 ETH
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--  ====================== Product Section =============================  -->
  <section class="product-section relative my-20 lg:my-32">
    <div class="container mx-auto relative px-4 z-10">
      <div
        class="section-title flex flex-wrap items-center justify-between mb-8 lg:mb-14"
      >
        <div class="flex items-center mb-3">
          <span
            class="flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg w-10 h-10 mr-4"
            ><img class="w-4 h-4" src="assets/images/sec-icon3.svg" alt="title"
          /></span>
          <h3
            class="font-display text-blueGray-900 font-bold text-2xl lg:text-4xl"
          >
            Seller Leaderboard
          </h3>
        </div>
        <a
          class="arrow-btn block bg-indigo-100 text-indigo-500 text-sm text-sm font-body font-bold rounded py-2 px-4 ml-14 transition duration-500 hover:bg-indigo-50"
          href="/light/leaderboard"
          >See All</a
        >
      </div>
      <div
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
      >
        <div
          class="seller-box text-center rounded transition duration-500 hover:shadow-lg p-6 aos-init"
          data-aos="fade-up"
        >
          <div class="flex items-center justify-center mb-4">
            <div class="relative">
              <img
                class="w-20 h-20 object-cover rounded-lg"
                src="assets/images/author/1.jpg"
                alt="title"
              /><span class="absolute bottom-2 -right-0"
                ><img
                  class="w-5 h-5"
                  src="assets/images/verified-icon.svg"
                  alt="title"
              /></span>
            </div>
          </div>
          <h6
            class="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500"
          >
            <a href="/light/creator-published">Steven Robart</a>
          </h6>
          <p class="font-body text-sm text-blueGray-600 mt-2">
            <img
              class="w-4 h-4 inline-block mr-1"
              src="assets/images/diamond-icon.svg"
              alt="title"
            />
            Diamond Seller
          </p>
          <div class="flex items-center justify-between mt-4">
            <div>
              <p class="font-body text-sm text-blueGray-400">Level</p>
              <h5
                class="flex items-center justify-center text-xl font-body font-bold text-blueGray-900"
              >
                <img
                  class="w-3 h-3 mr-1"
                  src="assets/images/up-icon.svg"
                  alt="title"
                />
                8
              </h5>
            </div>
            <div>
              <p class="font-body text-sm text-blueGray-400">Items</p>
              <h5
                class="flex items-center justify-center text-xl font-body font-bold text-blueGray-900"
              >
                17
              </h5>
            </div>
          </div>
        </div>
        <div
          class="seller-box text-center rounded transition duration-500 hover:shadow-lg p-6 aos-init"
          data-aos="fade-up"
        >
          <div class="flex items-center justify-center mb-4">
            <div class="relative">
              <img
                class="w-20 h-20 object-cover rounded-lg"
                src="assets/images/author/2.jpg"
                alt="title"
              /><span class="absolute bottom-2 -right-0"
                ><img
                  class="w-5 h-5"
                  src="assets/images/verified-icon.svg"
                  alt="title"
              /></span>
            </div>
          </div>
          <h6
            class="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500"
          >
            <a href="/light/creator-published">Jenny Wilson</a>
          </h6>
          <p class="font-body text-sm text-blueGray-600 mt-2">
            <img
              class="w-6 h-6 inline-block mr-1"
              src="assets/images/new-icon.svg"
              alt="title"
            />
            New Seller
          </p>
          <div class="flex items-center justify-between mt-4">
            <div>
              <p class="font-body text-sm text-blueGray-400">Level</p>
              <h5
                class="flex items-center justify-center text-xl font-body font-bold text-blueGray-900"
              >
                <img
                  class="w-3 h-3 mr-1"
                  src="assets/images/up-icon.svg"
                  alt="title"
                />
                4
              </h5>
            </div>
            <div>
              <p class="font-body text-sm text-blueGray-400">Items</p>
              <h5
                class="flex items-center justify-center text-xl font-body font-bold text-blueGray-900"
              >
                15
              </h5>
            </div>
          </div>
        </div>
        <div
          class="seller-box text-center rounded transition duration-500 hover:shadow-lg p-6 aos-init"
          data-aos="fade-up"
        >
          <div class="flex items-center justify-center mb-4">
            <div class="relative">
              <img
                class="w-20 h-20 object-cover rounded-lg"
                src="assets/images/author/3.jpg"
                alt="title"
              /><span class="absolute bottom-2 -right-0"
                ><img
                  class="w-5 h-5"
                  src="assets/images/verified-icon.svg"
                  alt="title"
              /></span>
            </div>
          </div>
          <h6
            class="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500"
          >
            <a href="/light/creator-published">Guy Hawkins</a>
          </h6>
          <p class="font-body text-sm text-blueGray-600 mt-2">
            <img
              class="w-6 h-6 inline-block mr-1"
              src="assets/images/new-icon.svg"
              alt="title"
            />
            New Seller
          </p>
          <div class="flex items-center justify-between mt-4">
            <div>
              <p class="font-body text-sm text-blueGray-400">Level</p>
              <h5
                class="flex items-center justify-center text-xl font-body font-bold text-blueGray-900"
              >
                <img
                  class="w-3 h-3 mr-1"
                  src="assets/images/down-icon.svg"
                  alt="title"
                />
                7
              </h5>
            </div>
            <div>
              <p class="font-body text-sm text-blueGray-400">Items</p>
              <h5
                class="flex items-center justify-center text-xl font-body font-bold text-blueGray-900"
              >
                2
              </h5>
            </div>
          </div>
        </div>
        <div
          class="seller-box text-center rounded transition duration-500 hover:shadow-lg p-6 aos-init"
          data-aos="fade-up"
        >
          <div class="flex items-center justify-center mb-4">
            <div class="relative">
              <img
                class="w-20 h-20 object-cover rounded-lg"
                src="assets/images/author/4.jpg"
                alt="title"
              /><span class="absolute bottom-2 -right-0"
                ><img
                  class="w-5 h-5"
                  src="assets/images/verified-icon.svg"
                  alt="title"
              /></span>
            </div>
          </div>
          <h6
            class="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500"
          >
            <a href="/light/creator-published">Robert Fox</a>
          </h6>
          <p class="font-body text-sm text-blueGray-600 mt-2">
            <img
              class="w-4 h-4 inline-block mr-1"
              src="assets/images/diamond-icon.svg"
              alt="title"
            />
            Diamond Seller
          </p>
          <div class="flex items-center justify-between mt-4">
            <div>
              <p class="font-body text-sm text-blueGray-400">Level</p>
              <h5
                class="flex items-center justify-center text-xl font-body font-bold text-blueGray-900"
              >
                <img
                  class="w-3 h-3 mr-1"
                  src="assets/images/up-icon.svg"
                  alt="title"
                />
                8
              </h5>
            </div>
            <div>
              <p class="font-body text-sm text-blueGray-400">Items</p>
              <h5
                class="flex items-center justify-center text-xl font-body font-bold text-blueGray-900"
              >
                14
              </h5>
            </div>
          </div>
        </div>
        <div
          class="seller-box text-center rounded transition duration-500 hover:shadow-lg p-6 aos-init"
          data-aos="fade-up"
        >
          <div class="flex items-center justify-center mb-4">
            <div class="relative">
              <img
                class="w-20 h-20 object-cover rounded-lg"
                src="assets/images/author/5.jpg"
                alt="title"
              /><span class="absolute bottom-2 -right-0"
                ><img
                  class="w-5 h-5"
                  src="assets/images/verified-icon.svg"
                  alt="title"
              /></span>
            </div>
          </div>
          <h6
            class="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500"
          >
            <a href="/light/creator-published">Cody Fisher</a>
          </h6>
          <p class="font-body text-sm text-blueGray-600 mt-2">
            <img
              class="w-6 h-6 inline-block mr-1"
              src="assets/images/new-icon.svg"
              alt="title"
            />
            New Seller
          </p>
          <div class="flex items-center justify-between mt-4">
            <div>
              <p class="font-body text-sm text-blueGray-400">Level</p>
              <h5
                class="flex items-center justify-center text-xl font-body font-bold text-blueGray-900"
              >
                <img
                  class="w-3 h-3 mr-1"
                  src="assets/images/up-icon.svg"
                  alt="title"
                />
                2
              </h5>
            </div>
            <div>
              <p class="font-body text-sm text-blueGray-400">Items</p>
              <h5
                class="flex items-center justify-center text-xl font-body font-bold text-blueGray-900"
              >
                23
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--  ====================== Product Section =============================  -->
  <section class="product-section relative py-20 lg:py-32 bg-blueGray-100">
    <div class="container mx-auto relative px-4 z-10">
      <div
        class="section-title flex flex-wrap items-center justify-between mb-8 lg:mb-14"
      >
        <div class="flex items-center mb-3">
          <span
            class="flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg w-10 h-10 mr-4"
            ><img class="w-5 h-5" src="assets/images/sec-icon2.svg" alt="title"
          /></span>
          <h3
            class="font-display text-blueGray-900 font-bold text-2xl lg:text-4xl"
          >
            Live Auctions
          </h3>
        </div>
        <a
          class="arrow-btn block bg-indigo-100 text-indigo-500 text-sm text-sm font-body font-bold rounded py-2 px-4 ml-14 transition duration-500 hover:bg-indigo-50"
          href="/light/explore"
          >See All</a
        >
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <div
          class="product-box bg-white flex justify-between flex-col shadow rounded overflow-hidden transition duration-500 hover:shadow-lg aos-init"
          data-aos="fade-up"
        >
          <div class="product-top">
            <div class="product-image relative rounded overflow-hidden">
              <img
                class="w-full md:h-64 object-cover"
                src="assets/images/product/1.jpg"
                alt="title"
              />
              <div
                class="product-meta text-white leading-4 font-body font-medium countdown-time absolute bottom-4 right-4 grid grid-cols-4 gap-4 text-center bg-gradient-to-r from-purple-500 to-indigo-500 rounded p-3"
              >
                <p class="text-white leading-4 font-opens font-medium">
                  <span>02</span><br /><span class="text-sm">Days</span>
                </p>
                <p class="text-white leading-4 font-opens font-medium">
                  <span>00</span><br /><span class="text-sm">Hrs</span>
                </p>
                <p class="text-white leading-4 font-opens font-medium">
                  <span>52</span><br /><span class="text-sm">Min</span>
                </p>
                <p class="text-white leading-4 font-opens font-medium">
                  <span>09</span><br /><span class="text-sm">Sec</span>
                </p>
              </div>
            </div>
            <div class="product-content px-6 pt-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3
                    class="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500"
                  >
                    <a href="/light/item-single">Creative Artwork</a>
                  </h3>
                </div>
                <span
                  class="font-body text-blueGray-600 flex items-center flex-shrink-0 ml-4"
                  ><img
                    class="w-5 h-5 mr-2"
                    src="assets/images/heart-icon.svg"
                    alt="title"
                  />4k</span
                >
              </div>
              <div class="flex mb-8 mt-2">
                <a
                  class="relative"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/1.jpg"
                    alt="title"
                /></a>
                <a
                  class="relative -left-4"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/3.jpg"
                    alt="title" />
                  <span class="absolute bottom-0 right-1"
                    ><img
                      class="w-3 h-3"
                      src="assets/images/verified-icon.svg"
                      alt="title" /></span
                ></a>
              </div>
            </div>
          </div>
          <div class="product-bottom flex flex-wrap justify-between px-6 pb-6">
            <div>
              <p class="font-body text-sm text-blueGray-600">Current Bid</p>
              <p
                class="flex items-center font-body font-bold text-blueGray-900 my-1"
              >
                <img
                  class="w-5 h-5 inline-block mr-1"
                  src="assets/images/cryptocurrency-icon.svg"
                  alt="title"
                />
                0.008 ETH
              </p>
              <p class="font-body text-sm text-blueGray-600">≈$26.69</p>
            </div>
            <div class="text-center">
              <a
                class="border-gradient block bg-gradient-to-r text-indigo-500 font-body font-semibold rounded py-2 px-4 hover:text-white hover:from-indigo-500 hover:to-purple-500 mb-2"
                href="/light/item-single"
                ><img
                  class="w-4 h-4 inline-block mb-1"
                  src="assets/images/bid-icon.svg"
                  alt="title"
                />
                Place a bid</a
              >
              <p class="font-body text-xs text-blueGray-600">12 bids total</p>
            </div>
          </div>
        </div>
        <div
          class="product-box bg-white flex justify-between flex-col shadow rounded overflow-hidden transition duration-500 hover:shadow-lg aos-init"
          data-aos="fade-up"
        >
          <div class="product-top">
            <div class="product-image relative rounded overflow-hidden">
              <img
                class="w-full md:h-64 object-cover"
                src="assets/images/product/2.jpg"
                alt="title"
              />
              <div
                class="product-meta text-white leading-4 font-body font-medium countdown-time2 absolute bottom-4 right-4 grid grid-cols-4 gap-4 text-center bg-gradient-to-r from-purple-500 to-indigo-500 rounded p-3"
              >
                <p class="text-white leading-4 font-opens font-medium">
                  <span>05</span><br /><span class="text-sm">Days</span>
                </p>
                <p class="text-white leading-4 font-opens font-medium">
                  <span>00</span><br /><span class="text-sm">Hrs</span>
                </p>
                <p class="text-white leading-4 font-opens font-medium">
                  <span>52</span><br /><span class="text-sm">Min</span>
                </p>
                <p class="text-white leading-4 font-opens font-medium">
                  <span>09</span><br /><span class="text-sm">Sec</span>
                </p>
              </div>
            </div>
            <div class="product-content px-6 pt-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3
                    class="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500"
                  >
                    <a href="/light/item-single">Cyber Boss #43</a>
                  </h3>
                </div>
                <span
                  class="font-body text-blueGray-600 flex items-center flex-shrink-0 ml-4"
                  ><img
                    class="w-5 h-5 mr-2"
                    src="assets/images/heart-icon.svg"
                    alt="title"
                  />4k</span
                >
              </div>
              <div class="flex mb-8 mt-2">
                <a
                  class="relative"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/1.jpg"
                    alt="title"
                /></a>
                <a
                  class="relative -left-4"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/3.jpg"
                    alt="title" />
                  <span class="absolute bottom-0 right-1"
                    ><img
                      class="w-3 h-3"
                      src="assets/images/verified-icon.svg"
                      alt="title" /></span
                ></a>
              </div>
            </div>
          </div>
          <div class="product-bottom flex flex-wrap justify-between px-6 pb-6">
            <div>
              <p class="font-body text-sm text-blueGray-600">Current Bid</p>
              <p
                class="flex items-center font-body font-bold text-blueGray-900 my-1"
              >
                <img
                  class="w-5 h-5 inline-block mr-1"
                  src="assets/images/cryptocurrency-icon.svg"
                  alt="title"
                />
                0.000 ETH
              </p>
              <p class="font-body text-sm text-blueGray-600">≈$0.00</p>
            </div>
            <div class="text-center">
              <a
                class="border-gradient block bg-gradient-to-r text-indigo-500 font-body font-semibold rounded py-2 px-4 hover:text-white hover:from-indigo-500 hover:to-purple-500 mb-2"
                href="/light/item-single"
                ><img
                  class="w-4 h-4 inline-block mb-1"
                  src="assets/images/bid-icon.svg"
                  alt="title"
                />
                Place a bid</a
              >
              <p class="font-body text-xs text-blueGray-600">no bids</p>
            </div>
          </div>
        </div>
        <div
          class="product-box bg-white flex justify-between flex-col shadow rounded overflow-hidden transition duration-500 hover:shadow-lg aos-init"
          data-aos="fade-up"
        >
          <div class="product-top">
            <div class="product-image relative rounded overflow-hidden">
              <img
                class="w-full md:h-64 object-cover"
                src="assets/images/product/4.gif"
                alt="title"
              />
              <div
                class="product-meta text-white leading-4 font-body font-medium countdown-time3 absolute bottom-4 right-4 grid grid-cols-4 gap-4 text-center bg-gradient-to-r from-purple-500 to-indigo-500 rounded p-3"
              >
                <p class="text-white leading-4 font-opens font-medium">
                  <span>00</span><br /><span class="text-sm">Days</span>
                </p>
                <p class="text-white leading-4 font-opens font-medium">
                  <span>00</span><br /><span class="text-sm">Hrs</span>
                </p>
                <p class="text-white leading-4 font-opens font-medium">
                  <span>52</span><br /><span class="text-sm">Min</span>
                </p>
                <p class="text-white leading-4 font-opens font-medium">
                  <span>09</span><br /><span class="text-sm">Sec</span>
                </p>
              </div>
            </div>
            <div class="product-content px-6 pt-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3
                    class="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500"
                  >
                    <a href="/light/item-single">Token Art #23</a>
                  </h3>
                </div>
                <span
                  class="font-body text-blueGray-600 flex items-center flex-shrink-0 ml-4"
                  ><img
                    class="w-5 h-5 mr-2"
                    src="assets/images/heart-icon.svg"
                    alt="title"
                  />4k</span
                >
              </div>
              <div class="flex mb-8 mt-2">
                <a
                  class="relative"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/1.jpg"
                    alt="title"
                /></a>
                <a
                  class="relative -left-2"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/2.jpg"
                    alt="title" />
                  <span class="absolute bottom-0 right-1"
                    ><img
                      class="w-3 h-3"
                      src="assets/images/verified-icon.svg"
                      alt="title" /></span
                ></a>
                <a
                  class="relative -left-4"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/3.jpg"
                    alt="title" />
                  <span class="absolute bottom-0 right-1"
                    ><img
                      class="w-3 h-3"
                      src="assets/images/verified-icon.svg"
                      alt="title" /></span
                ></a>
              </div>
            </div>
          </div>
          <div class="product-bottom flex flex-wrap justify-between px-6 pb-6">
            <div>
              <p class="font-body text-sm text-blueGray-600">Current Bid</p>
              <p
                class="flex items-center font-body font-bold text-blueGray-900 my-1"
              >
                <img
                  class="w-5 h-5 inline-block mr-1"
                  src="assets/images/cryptocurrency-icon.svg"
                  alt="title"
                />
                0.008 ETH
              </p>
              <p class="font-body text-sm text-blueGray-600">≈$3.34</p>
            </div>
            <div class="text-center">
              <a
                class="border-gradient block bg-gradient-to-r text-indigo-500 font-body font-semibold rounded py-2 px-4 hover:text-white hover:from-indigo-500 hover:to-purple-500 mb-2"
                href="/light/item-single"
                ><img
                  class="w-4 h-4 inline-block mb-1"
                  src="assets/images/bid-icon.svg"
                  alt="title"
                />
                Place a bid</a
              >
              <p class="font-body text-xs text-blueGray-600">2 bids total</p>
            </div>
          </div>
        </div>
        <div
          class="product-box bg-white flex justify-between flex-col shadow rounded overflow-hidden transition duration-500 hover:shadow-lg aos-init"
          data-aos="fade-up"
        >
          <div class="product-top">
            <div class="product-image relative rounded overflow-hidden">
              <img
                class="w-full md:h-64 object-cover"
                src="assets/images/product/2.gif"
                alt="title"
              />
              <div
                class="product-meta text-white leading-4 font-body font-medium countdown-time4 absolute bottom-4 right-4 grid grid-cols-4 gap-4 text-center bg-gradient-to-r from-purple-500 to-indigo-500 rounded p-3"
              >
                <p class="text-white leading-4 font-opens font-medium">
                  <span>04</span><br /><span class="text-sm">Days</span>
                </p>
                <p class="text-white leading-4 font-opens font-medium">
                  <span>00</span><br /><span class="text-sm">Hrs</span>
                </p>
                <p class="text-white leading-4 font-opens font-medium">
                  <span>52</span><br /><span class="text-sm">Min</span>
                </p>
                <p class="text-white leading-4 font-opens font-medium">
                  <span>09</span><br /><span class="text-sm">Sec</span>
                </p>
              </div>
            </div>
            <div class="product-content px-6 pt-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3
                    class="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500"
                  >
                    <a href="/light/item-single">Token Art #20</a>
                  </h3>
                </div>
                <span
                  class="font-body text-blueGray-600 flex items-center flex-shrink-0 ml-4"
                  ><img
                    class="w-5 h-5 mr-2"
                    src="assets/images/heart-icon.svg"
                    alt="title"
                  />4k</span
                >
              </div>
              <div class="flex mb-8 mt-2">
                <a
                  class="relative"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/1.jpg"
                    alt="title" />
                  <span class="absolute bottom-0 right-1"
                    ><img
                      class="w-3 h-3"
                      src="assets/images/verified-icon.svg"
                      alt="title" /></span
                ></a>
                <a
                  class="relative -left-2"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/2.jpg"
                    alt="title"
                /></a>
                <a
                  class="relative -left-4"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/3.jpg"
                    alt="title" />
                  <span class="absolute bottom-0 right-1"
                    ><img
                      class="w-3 h-3"
                      src="assets/images/verified-icon.svg"
                      alt="title" /></span
                ></a>
              </div>
            </div>
          </div>
          <div class="product-bottom flex flex-wrap justify-between px-6 pb-6">
            <div>
              <p class="font-body text-sm text-blueGray-600">Current Bid</p>
              <p
                class="flex items-center font-body font-bold text-blueGray-900 my-1"
              >
                <img
                  class="w-5 h-5 inline-block mr-1"
                  src="assets/images/cryptocurrency-icon.svg"
                  alt="title"
                />0.005 ETH
              </p>
              <p class="font-body text-sm text-blueGray-600">≈$16.68</p>
            </div>
            <div class="text-center">
              <a
                class="border-gradient block bg-gradient-to-r text-indigo-500 font-body font-semibold rounded py-2 px-4 hover:text-white hover:from-indigo-500 hover:to-purple-500 mb-2"
                href="/light/item-single"
                ><img
                  class="w-4 h-4 inline-block mb-1"
                  src="assets/images/bid-icon.svg"
                  alt="title"
                />
                Place a bid</a
              >
              <p class="font-body text-xs text-blueGray-600">14 bids total</p>
            </div>
          </div>
        </div>
        <div
          class="product-box bg-white flex justify-between flex-col shadow rounded overflow-hidden transition duration-500 hover:shadow-lg aos-init"
          data-aos="fade-up"
        >
          <div class="product-top">
            <div class="product-image relative rounded overflow-hidden">
              <img
                class="w-full md:h-64 object-cover"
                src="assets/images/product/1.gif"
                alt="title"
              />
              <div
                class="product-meta text-white leading-4 font-body font-medium countdown-time4 absolute bottom-4 right-4 grid grid-cols-4 gap-4 text-center bg-gradient-to-r from-purple-500 to-indigo-500 rounded p-3"
              >
                <p class="text-white leading-4 font-opens font-medium">
                  <span>04</span><br /><span class="text-sm">Days</span>
                </p>
                <p class="text-white leading-4 font-opens font-medium">
                  <span>00</span><br /><span class="text-sm">Hrs</span>
                </p>
                <p class="text-white leading-4 font-opens font-medium">
                  <span>52</span><br /><span class="text-sm">Min</span>
                </p>
                <p class="text-white leading-4 font-opens font-medium">
                  <span>09</span><br /><span class="text-sm">Sec</span>
                </p>
              </div>
            </div>
            <div class="product-content px-6 pt-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3
                    class="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500"
                  >
                    <a href="/light/item-single">Token Art #20</a>
                  </h3>
                </div>
                <span
                  class="font-body text-blueGray-600 flex items-center flex-shrink-0 ml-4"
                  ><img
                    class="w-5 h-5 mr-2"
                    src="assets/images/heart-icon.svg"
                    alt="title"
                  />4k</span
                >
              </div>
              <div class="flex mb-8 mt-2">
                <a
                  class="relative"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/1.jpg"
                    alt="title" />
                  <span class="absolute bottom-0 right-1"
                    ><img
                      class="w-3 h-3"
                      src="assets/images/verified-icon.svg"
                      alt="title" /></span
                ></a>
                <a
                  class="relative -left-2"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/2.jpg"
                    alt="title"
                /></a>
                <a
                  class="relative -left-4"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/3.jpg"
                    alt="title" />
                  <span class="absolute bottom-0 right-1"
                    ><img
                      class="w-3 h-3"
                      src="assets/images/verified-icon.svg"
                      alt="title" /></span
                ></a>
              </div>
            </div>
          </div>
          <div class="product-bottom flex flex-wrap justify-between px-6 pb-6">
            <div>
              <p class="font-body text-sm text-blueGray-600">Current Bid</p>
              <p
                class="flex items-center font-body font-bold text-blueGray-900 my-1"
              >
                <img
                  class="w-5 h-5 inline-block mr-1"
                  src="assets/images/cryptocurrency-icon.svg"
                  alt="title"
                />0.005 ETH
              </p>
              <p class="font-body text-sm text-blueGray-600">≈$16.68</p>
            </div>
            <div class="text-center">
              <a
                class="border-gradient block bg-gradient-to-r text-indigo-500 font-body font-semibold rounded py-2 px-4 hover:text-white hover:from-indigo-500 hover:to-purple-500 mb-2"
                href="/light/item-single"
                ><img
                  class="w-4 h-4 inline-block mb-1"
                  src="assets/images/bid-icon.svg"
                  alt="title"
                />
                Place a bid</a
              >
              <p class="font-body text-xs text-blueGray-600">14 bids total</p>
            </div>
          </div>
        </div>
        <div
          class="product-box bg-white flex justify-between flex-col shadow rounded overflow-hidden transition duration-500 hover:shadow-lg aos-init"
          data-aos="fade-up"
        >
          <div class="product-top">
            <div class="product-image relative rounded overflow-hidden">
              <img
                class="w-full md:h-64 object-cover"
                src="assets/images/product/5.gif"
                alt="title"
              />
              <div
                class="product-meta text-white leading-4 font-body font-medium countdown-time4 absolute bottom-4 right-4 grid grid-cols-4 gap-4 text-center bg-gradient-to-r from-purple-500 to-indigo-500 rounded p-3"
              >
                <p class="text-white leading-4 font-opens font-medium">
                  <span>04</span><br /><span class="text-sm">Days</span>
                </p>
                <p class="text-white leading-4 font-opens font-medium">
                  <span>00</span><br /><span class="text-sm">Hrs</span>
                </p>
                <p class="text-white leading-4 font-opens font-medium">
                  <span>52</span><br /><span class="text-sm">Min</span>
                </p>
                <p class="text-white leading-4 font-opens font-medium">
                  <span>09</span><br /><span class="text-sm">Sec</span>
                </p>
              </div>
            </div>
            <div class="product-content px-6 pt-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3
                    class="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500"
                  >
                    <a href="/light/item-single">Cyber Boss #43</a>
                  </h3>
                </div>
                <span
                  class="font-body text-blueGray-600 flex items-center flex-shrink-0 ml-4"
                  ><img
                    class="w-5 h-5 mr-2"
                    src="assets/images/heart-icon.svg"
                    alt="title"
                  />4k</span
                >
              </div>
              <div class="flex mb-8 mt-2">
                <a
                  class="relative"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/1.jpg"
                    alt="title" />
                  <span class="absolute bottom-0 right-1"
                    ><img
                      class="w-3 h-3"
                      src="assets/images/verified-icon.svg"
                      alt="title" /></span
                ></a>
                <a
                  class="relative -left-2"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/2.jpg"
                    alt="title"
                /></a>
                <a
                  class="relative -left-4"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/3.jpg"
                    alt="title" />
                  <span class="absolute bottom-0 right-1"
                    ><img
                      class="w-3 h-3"
                      src="assets/images/verified-icon.svg"
                      alt="title" /></span
                ></a>
              </div>
            </div>
          </div>
          <div class="product-bottom flex flex-wrap justify-between px-6 pb-6">
            <div>
              <p class="font-body text-sm text-blueGray-600">Current Bid</p>
              <p
                class="flex items-center font-body font-bold text-blueGray-900 my-1"
              >
                <img
                  class="w-5 h-5 inline-block mr-1"
                  src="assets/images/cryptocurrency-icon.svg"
                  alt="title"
                />0.005 ETH
              </p>
              <p class="font-body text-sm text-blueGray-600">≈$16.68</p>
            </div>
            <div class="text-center">
              <a
                class="border-gradient block bg-gradient-to-r text-indigo-500 font-body font-semibold rounded py-2 px-4 hover:text-white hover:from-indigo-500 hover:to-purple-500 mb-2"
                href="/light/item-single"
                ><img
                  class="w-4 h-4 inline-block mb-1"
                  src="assets/images/bid-icon.svg"
                  alt="title"
                />
                Place a bid</a
              >
              <p class="font-body text-xs text-blueGray-600">14 bids total</p>
            </div>
          </div>
        </div>
        <div
          class="product-box bg-white flex justify-between flex-col shadow rounded overflow-hidden transition duration-500 hover:shadow-lg aos-init"
          data-aos="fade-up"
        >
          <div class="product-top">
            <div class="product-image relative rounded overflow-hidden">
              <img
                class="w-full md:h-64 object-cover"
                src="assets/images/product/8.jpg"
                alt="title"
              />
              <div
                class="product-meta text-white leading-4 font-body font-medium countdown-time4 absolute bottom-4 right-4 grid grid-cols-4 gap-4 text-center bg-gradient-to-r from-purple-500 to-indigo-500 rounded p-3"
              >
                <p class="text-white leading-4 font-opens font-medium">
                  <span>04</span><br /><span class="text-sm">Days</span>
                </p>
                <p class="text-white leading-4 font-opens font-medium">
                  <span>00</span><br /><span class="text-sm">Hrs</span>
                </p>
                <p class="text-white leading-4 font-opens font-medium">
                  <span>52</span><br /><span class="text-sm">Min</span>
                </p>
                <p class="text-white leading-4 font-opens font-medium">
                  <span>09</span><br /><span class="text-sm">Sec</span>
                </p>
              </div>
            </div>
            <div class="product-content px-6 pt-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3
                    class="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500"
                  >
                    <a href="/light/item-single">Token Art #23</a>
                  </h3>
                </div>
                <span
                  class="font-body text-blueGray-600 flex items-center flex-shrink-0 ml-4"
                  ><img
                    class="w-5 h-5 mr-2"
                    src="assets/images/heart-icon.svg"
                    alt="title"
                  />4k</span
                >
              </div>
              <div class="flex mb-8 mt-2">
                <a
                  class="relative"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/1.jpg"
                    alt="title" />
                  <span class="absolute bottom-0 right-1"
                    ><img
                      class="w-3 h-3"
                      src="assets/images/verified-icon.svg"
                      alt="title" /></span
                ></a>
                <a
                  class="relative -left-2"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/2.jpg"
                    alt="title"
                /></a>
                <a
                  class="relative -left-4"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/3.jpg"
                    alt="title" />
                  <span class="absolute bottom-0 right-1"
                    ><img
                      class="w-3 h-3"
                      src="assets/images/verified-icon.svg"
                      alt="title" /></span
                ></a>
              </div>
            </div>
          </div>
          <div class="product-bottom flex flex-wrap justify-between px-6 pb-6">
            <div>
              <p class="font-body text-sm text-blueGray-600">Current Bid</p>
              <p
                class="flex items-center font-body font-bold text-blueGray-900 my-1"
              >
                <img
                  class="w-5 h-5 inline-block mr-1"
                  src="assets/images/cryptocurrency-icon.svg"
                  alt="title"
                />0.005 ETH
              </p>
              <p class="font-body text-sm text-blueGray-600">≈$16.68</p>
            </div>
            <div class="text-center">
              <a
                class="border-gradient block bg-gradient-to-r text-indigo-500 font-body font-semibold rounded py-2 px-4 hover:text-white hover:from-indigo-500 hover:to-purple-500 mb-2"
                href="/light/item-single"
                ><img
                  class="w-4 h-4 inline-block mb-1"
                  src="assets/images/bid-icon.svg"
                  alt="title"
                />
                Place a bid</a
              >
              <p class="font-body text-xs text-blueGray-600">14 bids total</p>
            </div>
          </div>
        </div>
        <div
          class="product-box bg-white flex justify-between flex-col shadow rounded overflow-hidden transition duration-500 hover:shadow-lg aos-init"
          data-aos="fade-up"
        >
          <div class="product-top">
            <div class="product-image relative rounded overflow-hidden">
              <img
                class="w-full md:h-64 object-cover"
                src="assets/images/product/9.jpg"
                alt="title"
              />
              <div
                class="product-meta text-white leading-4 font-body font-medium countdown-time4 absolute bottom-4 right-4 grid grid-cols-4 gap-4 text-center bg-gradient-to-r from-purple-500 to-indigo-500 rounded p-3"
              >
                <p class="text-white leading-4 font-opens font-medium">
                  <span>04</span><br /><span class="text-sm">Days</span>
                </p>
                <p class="text-white leading-4 font-opens font-medium">
                  <span>00</span><br /><span class="text-sm">Hrs</span>
                </p>
                <p class="text-white leading-4 font-opens font-medium">
                  <span>52</span><br /><span class="text-sm">Min</span>
                </p>
                <p class="text-white leading-4 font-opens font-medium">
                  <span>09</span><br /><span class="text-sm">Sec</span>
                </p>
              </div>
            </div>
            <div class="product-content px-6 pt-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3
                    class="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500"
                  >
                    <a href="/light/item-single">Token Art #20</a>
                  </h3>
                </div>
                <span
                  class="font-body text-blueGray-600 flex items-center flex-shrink-0 ml-4"
                  ><img
                    class="w-5 h-5 mr-2"
                    src="assets/images/heart-icon.svg"
                    alt="title"
                  />4k</span
                >
              </div>
              <div class="flex mb-8 mt-2">
                <a
                  class="relative"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/1.jpg"
                    alt="title" />
                  <span class="absolute bottom-0 right-1"
                    ><img
                      class="w-3 h-3"
                      src="assets/images/verified-icon.svg"
                      alt="title" /></span
                ></a>
                <a
                  class="relative -left-2"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/2.jpg"
                    alt="title"
                /></a>
                <a
                  class="relative -left-4"
                  data-tooltip="Steven Robart"
                  href="/light/creator-published"
                  ><img
                    class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                    src="assets/images/author/3.jpg"
                    alt="title" />
                  <span class="absolute bottom-0 right-1"
                    ><img
                      class="w-3 h-3"
                      src="assets/images/verified-icon.svg"
                      alt="title" /></span
                ></a>
              </div>
            </div>
          </div>
          <div class="product-bottom flex flex-wrap justify-between px-6 pb-6">
            <div>
              <p class="font-body text-sm text-blueGray-600">Current Bid</p>
              <p
                class="flex items-center font-body font-bold text-blueGray-900 my-1"
              >
                <img
                  class="w-5 h-5 inline-block mr-1"
                  src="assets/images/cryptocurrency-icon.svg"
                  alt="title"
                />0.005 ETH
              </p>
              <p class="font-body text-sm text-blueGray-600">≈$16.68</p>
            </div>
            <div class="text-center">
              <a
                class="border-gradient block bg-gradient-to-r text-indigo-500 font-body font-semibold rounded py-2 px-4 hover:text-white hover:from-indigo-500 hover:to-purple-500 mb-2"
                href="/light/item-single"
                ><img
                  class="w-4 h-4 inline-block mb-1"
                  src="assets/images/bid-icon.svg"
                  alt="title"
                />
                Place a bid</a
              >
              <p class="font-body text-xs text-blueGray-600">14 bids total</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--  ====================== Blog Section =============================  -->
  <section class="blog-section relative my-20 lg:my-32">
    <div class="container mx-auto relative px-4 z-10">
      <div
        class="section-title flex flex-wrap items-center justify-between mb-8 lg:mb-14"
      >
        <div class="flex items-center mb-3">
          <span
            class="flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg w-10 h-10 mr-4"
            ><img class="w-4 h-4" src="assets/images/sec-icon3.svg" alt="title"
          /></span>
          <h3
            class="font-display text-blueGray-900 font-bold text-2xl lg:text-4xl"
          >
            Latest Blog
          </h3>
        </div>
        <a
          class="arrow-btn block bg-indigo-100 text-indigo-500 text-sm text-sm font-body font-bold rounded py-2 px-4 ml-14 transition duration-500 hover:bg-indigo-50"
          href="/light/blog"
          >See All</a
        >
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        <div
          class="blog-box shadow bg-white md:flex p-6 rounded transition duration-500 hover:shadow-lg aos-init"
          data-aos="fade-up"
        >
          <div
            class="flex-shrink-0 blog-image relative rounded overflow-hidden mb-4 md:mb-0"
          >
            <img
              class="w-full md:h-40 md:w-40 rounded object-cover"
              src="assets/images/product/5.jpg"
              alt="title"
            />
          </div>
          <div
            class="blog-content flex flex-col flex-grow justify-center md:pl-6"
          >
            <div>
              <h4
                class="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500"
              >
                <a href="/light/single"
                  >Top 10 NFT Projects That the Internet</a
                >
              </h4>
            </div>
            <div class="mt-4">
              <a
                class="readmore-btn font-body font-normal text-indigo-500 transition duration-500 hover:text-indigo-500 underline-hover"
                href="/light/single"
                >Read More<img
                  class="inline-block w-3 ml-2 mb-1"
                  src="assets/images/readmore-icon.svg"
                  alt="title"
              /></a>
            </div>
          </div>
        </div>
        <div
          class="blog-box shadow bg-white md:flex p-6 rounded transition duration-500 hover:shadow-lg aos-init"
          data-aos="fade-up"
        >
          <div
            class="flex-shrink-0 blog-image relative rounded overflow-hidden mb-4 md:mb-0"
          >
            <img
              class="w-full md:h-40 md:w-40 rounded object-cover"
              src="assets/images/product/6.jpg"
              alt="title"
            />
          </div>
          <div
            class="blog-content flex flex-col flex-grow justify-center md:pl-6"
          >
            <div>
              <h4
                class="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500"
              >
                <a href="/light/single">Honoring Black History with Toddlers</a>
              </h4>
            </div>
            <div class="mt-4">
              <a
                class="readmore-btn font-body font-normal text-indigo-500 transition duration-500 hover:text-indigo-500 underline-hover"
                href="/light/single"
                >Read More<img
                  class="inline-block w-3 ml-2 mb-1"
                  src="assets/images/readmore-icon.svg"
                  alt="title"
              /></a>
            </div>
          </div>
        </div>
        <div
          class="blog-box shadow bg-white md:flex p-6 rounded transition duration-500 hover:shadow-lg aos-init"
          data-aos="fade-up"
        >
          <div
            class="flex-shrink-0 blog-image relative rounded overflow-hidden mb-4 md:mb-0"
          >
            <img
              class="w-full md:h-40 md:w-40 rounded object-cover"
              src="assets/images/product/8.jpg"
              alt="title"
            />
          </div>
          <div
            class="blog-content flex flex-col flex-grow justify-center md:pl-6"
          >
            <div>
              <h4
                class="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500"
              >
                <a href="/light/single">NFT Market – A Big Benefits</a>
              </h4>
            </div>
            <div class="mt-4">
              <a
                class="readmore-btn font-body font-normal text-indigo-500 transition duration-500 hover:text-indigo-500 underline-hover"
                href="/light/single"
                >Read More<img
                  class="inline-block w-3 ml-2 mb-1"
                  src="assets/images/readmore-icon.svg"
                  alt="title"
              /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--  ====================== Product Section =============================  -->
  <section class="product-section relative mt-20 mb-16 lg:mt-32 lg:mb-24">
    <div class="container mx-auto relative px-4 z-10">
      <div
        class="section-title flex flex-wrap items-center justify-between mb-6 lg:mb-8"
      >
        <div class="flex items-center mb-3">
          <span
            class="flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg w-10 h-10 mr-4"
            ><img class="w-4 h-4" src="assets/images/sec-icon3.svg" alt="title"
          /></span>
          <h3
            class="font-display text-blueGray-900 font-bold text-2xl lg:text-4xl"
          >
            Featured Auctions
          </h3>
        </div>
        <a
          class="arrow-btn block bg-indigo-100 text-indigo-500 text-sm text-sm font-body font-bold rounded py-2 px-4 ml-14 transition duration-500 hover:bg-indigo-50"
          href="/light/explore"
          >See All</a
        >
      </div>
      <div class="relative">
        <div
          class="swiper-container product-slider swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events"
        >
          <div
            id="swiper-wrapper-a826127a52fffe3a"
            class="swiper-wrapper"
            aria-live="off"
            style="
              transform: translate3d(0px, 0px, 0px);
              transition-duration: 0ms;
            "
          >
            <div
              class="swiper-slide swiper-slide-active"
              role="group"
              aria-label="1 / 5"
              style="width: 312px; margin-right: 24px"
            >
              <div
                class="product-box bg-white flex justify-between flex-col shadow rounded overflow-hidden transition duration-500 hover:shadow-lg aos-init"
                data-aos="fade-up"
              >
                <div class="product-top">
                  <div class="product-image relative rounded overflow-hidden">
                    <img
                      class="w-full md:h-64 object-cover"
                      src="assets/images/product/16.jpg"
                      alt="title"
                    />
                  </div>
                  <div class="product-content px-6 pt-6">
                    <div class="flex items-center justify-between">
                      <div>
                        <h3
                          class="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500"
                        >
                          <a href="/light/item-single">Cyber Boss #43</a>
                        </h3>
                      </div>
                      <a
                        href="wishlist.html"
                        class="w-5 h-5 heart-btn flex-shrink-0"
                        ><img
                          class="transition duration-500 grayscale block"
                          src="assets/images/heart-icon.svg"
                          alt="title"
                      /></a>
                    </div>
                    <div class="flex mb-8 mt-2">
                      <a
                        class="relative"
                        data-tooltip="Steven Robart"
                        href="/light/creator-published"
                        ><img
                          class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                          src="assets/images/author/1.jpg"
                          alt="title"
                      /></a>
                      <a
                        class="relative -left-4"
                        data-tooltip="Steven Robart"
                        href="/light/creator-published"
                        ><img
                          class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                          src="assets/images/author/3.jpg"
                          alt="title" />
                        <span class="absolute bottom-0 right-1"
                          ><img
                            class="w-3 h-3"
                            src="assets/images/verified-icon.svg"
                            alt="title" /></span
                      ></a>
                    </div>
                  </div>
                </div>
                <div
                  class="product-bottom flex flex-wrap justify-between px-6 pb-6"
                >
                  <div>
                    <p class="font-body text-sm text-blueGray-600">
                      Current Bid
                    </p>
                    <p
                      class="flex items-center font-body font-bold text-blueGray-900 my-1"
                    >
                      <img
                        class="w-5 h-5 inline-block mr-1"
                        src="assets/images/cryptocurrency-icon.svg"
                        alt="title"
                      />
                      0.000 ETH
                    </p>
                    <p class="font-body text-sm text-blueGray-600">≈$0.00</p>
                  </div>
                  <div class="text-center">
                    <a
                      class="border-gradient block bg-gradient-to-r text-indigo-500 font-body font-semibold rounded py-2 px-4 hover:text-white hover:from-indigo-500 hover:to-purple-500 mb-2"
                      href="/light/item-single"
                      ><img
                        class="w-4 h-4 inline-block mb-1"
                        src="assets/images/bid-icon.svg"
                        alt="title"
                      />
                      Place a bid</a
                    >
                    <p class="font-body text-xs text-blueGray-600">no bids</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="swiper-slide swiper-slide-next"
              role="group"
              aria-label="2 / 5"
              style="width: 312px; margin-right: 24px"
            >
              <div
                class="product-box bg-white flex justify-between flex-col shadow rounded overflow-hidden transition duration-500 hover:shadow-lg aos-init"
                data-aos="fade-up"
              >
                <div class="product-top">
                  <div class="product-image relative rounded overflow-hidden">
                    <img
                      class="w-full md:h-64 object-cover"
                      src="assets/images/product/17.jpg"
                      alt="title"
                    />
                  </div>
                  <div class="product-content px-6 pt-6">
                    <div class="flex items-center justify-between">
                      <div>
                        <h3
                          class="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500"
                        >
                          <a href="/light/item-single">Cyber Boss #43</a>
                        </h3>
                      </div>
                      <a
                        href="wishlist.html"
                        class="w-5 h-5 heart-btn flex-shrink-0"
                        ><img
                          class="transition duration-500 grayscale block"
                          src="assets/images/heart-icon.svg"
                          alt="title"
                      /></a>
                    </div>
                    <div class="flex mb-8 mt-2">
                      <a
                        class="relative"
                        data-tooltip="Steven Robart"
                        href="/light/creator-published"
                        ><img
                          class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                          src="assets/images/author/1.jpg"
                          alt="title"
                      /></a>
                      <a
                        class="relative -left-4"
                        data-tooltip="Steven Robart"
                        href="/light/creator-published"
                        ><img
                          class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                          src="assets/images/author/3.jpg"
                          alt="title" />
                        <span class="absolute bottom-0 right-1"
                          ><img
                            class="w-3 h-3"
                            src="assets/images/verified-icon.svg"
                            alt="title" /></span
                      ></a>
                    </div>
                  </div>
                </div>
                <div
                  class="product-bottom flex flex-wrap justify-between px-6 pb-6"
                >
                  <div>
                    <p class="font-body text-sm text-blueGray-600">
                      Current Bid
                    </p>
                    <p
                      class="flex items-center font-body font-bold text-blueGray-900 my-1"
                    >
                      <img
                        class="w-5 h-5 inline-block mr-1"
                        src="assets/images/cryptocurrency-icon.svg"
                        alt="title"
                      />
                      0.000 ETH
                    </p>
                    <p class="font-body text-sm text-blueGray-600">≈$0.00</p>
                  </div>
                  <div class="text-center">
                    <a
                      class="border-gradient block bg-gradient-to-r text-indigo-500 font-body font-semibold rounded py-2 px-4 hover:text-white hover:from-indigo-500 hover:to-purple-500 mb-2"
                      href="/light/item-single"
                      ><img
                        class="w-4 h-4 inline-block mb-1"
                        src="assets/images/bid-icon.svg"
                        alt="title"
                      />
                      Place a bid</a
                    >
                    <p class="font-body text-xs text-blueGray-600">no bids</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="swiper-slide"
              role="group"
              aria-label="3 / 5"
              style="width: 312px; margin-right: 24px"
            >
              <div
                class="product-box bg-white flex justify-between flex-col shadow rounded overflow-hidden transition duration-500 hover:shadow-lg aos-init"
                data-aos="fade-up"
              >
                <div class="product-top">
                  <div class="product-image relative rounded overflow-hidden">
                    <img
                      class="w-full md:h-64 object-cover"
                      src="assets/images/product/18.jpg"
                      alt="title"
                    />
                  </div>
                  <div class="product-content px-6 pt-6">
                    <div class="flex items-center justify-between">
                      <div>
                        <h3
                          class="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500"
                        >
                          <a href="/light/item-single">Cyber Boss #43</a>
                        </h3>
                      </div>
                      <a
                        href="wishlist.html"
                        class="w-5 h-5 heart-btn flex-shrink-0"
                        ><img
                          class="transition duration-500 grayscale block"
                          src="assets/images/heart-icon.svg"
                          alt="title"
                      /></a>
                    </div>
                    <div class="flex mb-8 mt-2">
                      <a
                        class="relative"
                        data-tooltip="Steven Robart"
                        href="/light/creator-published"
                        ><img
                          class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                          src="assets/images/author/1.jpg"
                          alt="title"
                      /></a>
                      <a
                        class="relative -left-4"
                        data-tooltip="Steven Robart"
                        href="/light/creator-published"
                        ><img
                          class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                          src="assets/images/author/3.jpg"
                          alt="title" />
                        <span class="absolute bottom-0 right-1"
                          ><img
                            class="w-3 h-3"
                            src="assets/images/verified-icon.svg"
                            alt="title" /></span
                      ></a>
                    </div>
                  </div>
                </div>
                <div
                  class="product-bottom flex flex-wrap justify-between px-6 pb-6"
                >
                  <div>
                    <p class="font-body text-sm text-blueGray-600">
                      Current Bid
                    </p>
                    <p
                      class="flex items-center font-body font-bold text-blueGray-900 my-1"
                    >
                      <img
                        class="w-5 h-5 inline-block mr-1"
                        src="assets/images/cryptocurrency-icon.svg"
                        alt="title"
                      />
                      0.000 ETH
                    </p>
                    <p class="font-body text-sm text-blueGray-600">≈$0.00</p>
                  </div>
                  <div class="text-center">
                    <a
                      class="border-gradient block bg-gradient-to-r text-indigo-500 font-body font-semibold rounded py-2 px-4 hover:text-white hover:from-indigo-500 hover:to-purple-500 mb-2"
                      href="/light/item-single"
                      ><img
                        class="w-4 h-4 inline-block mb-1"
                        src="assets/images/bid-icon.svg"
                        alt="title"
                      />
                      Place a bid</a
                    >
                    <p class="font-body text-xs text-blueGray-600">no bids</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="swiper-slide"
              role="group"
              aria-label="4 / 5"
              style="width: 312px; margin-right: 24px"
            >
              <div
                class="product-box bg-white flex justify-between flex-col shadow rounded overflow-hidden transition duration-500 hover:shadow-lg aos-init"
                data-aos="fade-up"
              >
                <div class="product-top">
                  <div class="product-image relative rounded overflow-hidden">
                    <img
                      class="w-full md:h-64 object-cover"
                      src="assets/images/product/19.jpg"
                      alt="title"
                    />
                  </div>
                  <div class="product-content px-6 pt-6">
                    <div class="flex items-center justify-between">
                      <div>
                        <h3
                          class="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500"
                        >
                          <a href="/light/item-single">Cyber Boss #43</a>
                        </h3>
                      </div>
                      <a
                        href="wishlist.html"
                        class="w-5 h-5 heart-btn flex-shrink-0"
                        ><img
                          class="transition duration-500 grayscale block"
                          src="assets/images/heart-icon.svg"
                          alt="title"
                      /></a>
                    </div>
                    <div class="flex mb-8 mt-2">
                      <a
                        class="relative"
                        data-tooltip="Steven Robart"
                        href="/light/creator-published"
                        ><img
                          class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                          src="assets/images/author/1.jpg"
                          alt="title"
                      /></a>
                      <a
                        class="relative -left-4"
                        data-tooltip="Steven Robart"
                        href="/light/creator-published"
                        ><img
                          class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                          src="assets/images/author/3.jpg"
                          alt="title" />
                        <span class="absolute bottom-0 right-1"
                          ><img
                            class="w-3 h-3"
                            src="assets/images/verified-icon.svg"
                            alt="title" /></span
                      ></a>
                    </div>
                  </div>
                </div>
                <div
                  class="product-bottom flex flex-wrap justify-between px-6 pb-6"
                >
                  <div>
                    <p class="font-body text-sm text-blueGray-600">
                      Current Bid
                    </p>
                    <p
                      class="flex items-center font-body font-bold text-blueGray-900 my-1"
                    >
                      <img
                        class="w-5 h-5 inline-block mr-1"
                        src="assets/images/cryptocurrency-icon.svg"
                        alt="title"
                      />
                      0.000 ETH
                    </p>
                    <p class="font-body text-sm text-blueGray-600">≈$0.00</p>
                  </div>
                  <div class="text-center">
                    <a
                      class="border-gradient block bg-gradient-to-r text-indigo-500 font-body font-semibold rounded py-2 px-4 hover:text-white hover:from-indigo-500 hover:to-purple-500 mb-2"
                      href="/light/item-single"
                      ><img
                        class="w-4 h-4 inline-block mb-1"
                        src="assets/images/bid-icon.svg"
                        alt="title"
                      />
                      Place a bid</a
                    >
                    <p class="font-body text-xs text-blueGray-600">no bids</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="swiper-slide"
              role="group"
              aria-label="5 / 5"
              style="width: 312px; margin-right: 24px"
            >
              <div
                class="product-box bg-white flex justify-between flex-col shadow rounded overflow-hidden transition duration-500 hover:shadow-lg aos-init"
                data-aos="fade-up"
              >
                <div class="product-top">
                  <div class="product-image relative rounded overflow-hidden">
                    <img
                      class="w-full md:h-64 object-cover"
                      src="assets/images/product/6.jpg"
                      alt="title"
                    />
                  </div>
                  <div class="product-content px-6 pt-6">
                    <div class="flex items-center justify-between">
                      <div>
                        <h3
                          class="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500"
                        >
                          <a href="/light/item-single">Cyber Boss #43</a>
                        </h3>
                      </div>
                      <a
                        href="wishlist.html"
                        class="w-5 h-5 heart-btn flex-shrink-0"
                        ><img
                          class="transition duration-500 grayscale block"
                          src="assets/images/heart-icon.svg"
                          alt="title"
                      /></a>
                    </div>
                    <div class="flex mb-8 mt-2">
                      <a
                        class="relative"
                        data-tooltip="Steven Robart"
                        href="/light/creator-published"
                        ><img
                          class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                          src="assets/images/author/1.jpg"
                          alt="title"
                      /></a>
                      <a
                        class="relative -left-4"
                        data-tooltip="Steven Robart"
                        href="/light/creator-published"
                        ><img
                          class="border-2 border-white w-10 h-10 object-cover rounded-lg"
                          src="assets/images/author/3.jpg"
                          alt="title" />
                        <span class="absolute bottom-0 right-1"
                          ><img
                            class="w-3 h-3"
                            src="assets/images/verified-icon.svg"
                            alt="title" /></span
                      ></a>
                    </div>
                  </div>
                </div>
                <div
                  class="product-bottom flex flex-wrap justify-between px-6 pb-6"
                >
                  <div>
                    <p class="font-body text-sm text-blueGray-600">
                      Current Bid
                    </p>
                    <p
                      class="flex items-center font-body font-bold text-blueGray-900 my-1"
                    >
                      <img
                        class="w-5 h-5 inline-block mr-1"
                        src="assets/images/cryptocurrency-icon.svg"
                        alt="title"
                      />
                      0.000 ETH
                    </p>
                    <p class="font-body text-sm text-blueGray-600">≈$0.00</p>
                  </div>
                  <div class="text-center">
                    <a
                      class="border-gradient block bg-gradient-to-r text-indigo-500 font-body font-semibold rounded py-2 px-4 hover:text-white hover:from-indigo-500 hover:to-purple-500 mb-2"
                      href="/light/item-single"
                      ><img
                        class="w-4 h-4 inline-block mb-1"
                        src="assets/images/bid-icon.svg"
                        alt="title"
                      />
                      Place a bid</a
                    >
                    <p class="font-body text-xs text-blueGray-600">no bids</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span
            class="swiper-notification"
            aria-live="assertive"
            aria-atomic="true"
          ></span>
        </div>
        <div
          class="swiper-button-prev bg-white shadow rounded-full bg-gradient-to-r transition duration-500 hover:from-indigo-500 hover:to-purple-500 2xl:-translate-x-24 swiper-button-disabled"
          tabindex="-1"
          role="button"
          aria-label="Previous slide"
          aria-controls="swiper-wrapper-a826127a52fffe3a"
          aria-disabled="true"
        ></div>
        <div
          class="swiper-button-next bg-white shadow rounded-full bg-gradient-to-r transition duration-500 hover:from-indigo-500 hover:to-purple-500 2xl:translate-x-24"
          tabindex="0"
          role="button"
          aria-label="Next slide"
          aria-controls="swiper-wrapper-a826127a52fffe3a"
          aria-disabled="false"
        ></div>
      </div>
    </div>
  </section>
  <!--  ====================== Footer Section =============================  -->
  <footer class="footer-section overflow-hidden">
    <div class="relative footer-shape2 py-20 lg:py-32">
      <div class="container mx-auto relative px-4 z-10">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8"
        >
          <div
            class="footer-widget xl:flex xl:flex-col xl:justify-center xl:col-span-2"
          >
            <a class="block mb-10" href="/light/">
              <img
                class="h-10"
                src="https://d33wubrfki0l68.cloudfront.net/0fcd3a5de968db4747c50586a61bcc126b4890fd/3ca91/assets/images/header-logo.svg"
                alt="title"
              />
            </a>
            <div class="social-share flex items-center">
              <a
                class="flex items-center justify-center w-10 h-10 bg-blueGray-200 rounded-lg border border-blueGray-200 transition duration-500 hover:bg-indigo-500 mr-2"
                href="#"
                ><img
                  class="w-4 h-4"
                  src="assets/images/facebook-icon.svg"
                  alt="title"
              /></a>
              <a
                class="flex items-center justify-center w-10 h-10 bg-blueGray-200 rounded-lg border border-blueGray-200 transition duration-500 hover:bg-indigo-500 mr-2"
                href="#"
                ><img
                  class="w-4 h-4"
                  src="assets/images/twitter-icon.svg"
                  alt="title"
              /></a>
              <a
                class="flex items-center justify-center w-10 h-10 bg-blueGray-200 rounded-lg border border-blueGray-200 transition duration-500 hover:bg-indigo-500 mr-2"
                href="#"
                ><img
                  class="w-4 h-4"
                  src="assets/images/instagram-icon.svg"
                  alt="title"
              /></a>
              <a
                class="flex items-center justify-center w-10 h-10 bg-blueGray-200 rounded-lg border border-blueGray-200 transition duration-500 hover:bg-indigo-500 mr-2"
                href="#"
                ><img
                  class="w-4 h-4"
                  src="assets/images/linkein-icon.svg"
                  alt="title"
              /></a>
            </div>
          </div>
          <div
            class="footer-widget pb-4 lg:pb-0 lg:border-b-0 border-b border-indigo-200"
          >
            <h4 class="font-display text-xl text-blueGray-900 font-semibold">
              Navigation
            </h4>
            <ul class="mt-4 xl:mt-10 flex flex-wrap xl:block">
              <li class="mb-4 mr-4">
                <a
                  class="font-body text-blueGray-600 transition duration-500 hover:text-indigo-500 underline-hover"
                  href="/light/"
                  >Home</a
                >
              </li>
              <li class="mb-4 mr-4">
                <a
                  class="font-body text-blueGray-600 transition duration-500 hover:text-indigo-500 underline-hover"
                  href="/light/explore"
                  >Explore</a
                >
              </li>
              <li class="mb-4 mr-4">
                <a
                  class="font-body text-blueGray-600 transition duration-500 hover:text-indigo-500 underline-hover"
                  href="/light/wallet"
                  >Wallet</a
                >
              </li>
              <li class="mb-4 mr-4">
                <a
                  class="font-body text-blueGray-600 transition duration-500 hover:text-indigo-500 underline-hover"
                  href="/light/creator-published"
                  >Author</a
                >
              </li>
              <li class="mb-4 mr-4">
                <a
                  class="font-body text-blueGray-600 transition duration-500 hover:text-indigo-500 underline-hover"
                  href="/light/term-condition"
                  >Terms &amp; Conditions</a
                >
              </li>
            </ul>
          </div>
          <div
            class="footer-widget pb-4 lg:pb-0 lg:border-b-0 border-b border-indigo-200"
          >
            <h4 class="font-display text-xl text-blueGray-900 font-semibold">
              Community
            </h4>
            <ul class="mt-4 xl:mt-10 flex flex-wrap xl:block">
              <li class="mb-4 mr-4">
                <a
                  class="font-body text-blueGray-600 transition duration-500 hover:text-indigo-500 underline-hover"
                  href="/light/item-single"
                  >Item Details</a
                >
              </li>
              <li class="mb-4 mr-4">
                <a
                  class="font-body text-blueGray-600 transition duration-500 hover:text-indigo-500 underline-hover"
                  href="/light/item-single2"
                  >Item Details v2</a
                >
              </li>
              <li class="mb-4 mr-4">
                <a
                  class="font-body text-blueGray-600 transition duration-500 hover:text-indigo-500 underline-hover"
                  href="/light/activity"
                  >Activity</a
                >
              </li>
              <li class="mb-4 mr-4">
                <a
                  class="font-body text-blueGray-600 transition duration-500 hover:text-indigo-500 underline-hover"
                  href="/light/term-condition"
                  >Terms &amp; Conditions</a
                >
              </li>
              <li class="mb-4 mr-4">
                <a
                  class="font-body text-blueGray-600 transition duration-500 hover:text-indigo-500 underline-hover"
                  href="/light/contact"
                  >Contact</a
                >
              </li>
            </ul>
          </div>
          <div class="footer-widget col-span-1 md:col-span-2">
            <h4 class="font-display text-xl text-blueGray-900 font-semibold">
              Subscribe Us
            </h4>
            <form
              class="footer-newsletter flex items-center w-full mb-4 mt-4 xl:mt-10"
            >
              <input
                class="bg-transparent border-2 border-r-0 border-indigo-500 transition duration-500 focus:outline-none hover:bg-white rounded-l w-full h-14 p-4"
                type="text"
                placeholder="Your e-mail address"
              />
              <button
                class="flex items-center rounded-r h-14 py-4 px-8 transition-all duration-500 bg-gradient-to-tl from-indigo-500 via-purple-500 to-indigo-500 bg-size-200 bg-pos-0 hover:bg-pos-100"
                type="submit"
              >
                <img
                  class="w-6 h-6"
                  src="assets/images/newsletter-icon.svg"
                  alt="title"
                />
              </button>
            </form>
            <p class="font-body text-sm text-blueGray-600">
              Your privacy protected! We dont disclose Email.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="container mx-auto relative px-4 z-10 lg:text-center py-10 xl:py-20"
    >
      <p class="font-body text-sm text-blueGray-600">
        © <span id="spanYear">2022</span> Tokenmart - All Rights Reserved by
        <a
          href="https://themeix.com/"
          class="text-indigo-500 underline-hover"
          rel="noopener"
          target="_blank"
          >themeix</a
        >
      </p>
    </div>
    <a
      href="#"
      class="footer-back w-10 h-10 hidden fixed bottom-8 right-8 z-50 bg-blueGray-600 rounded-lg items-center justify-center show"
      ><svg
        width="18"
        height="10"
        viewBox="0 0 18 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 9L9 1L17 9"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </a>
  </footer>
</template>

<style scoped></style>
