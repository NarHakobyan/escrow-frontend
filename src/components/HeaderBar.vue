<script setup lang="ts">
import { ref } from 'vue';

// defineProps<{ msg: string }>();
</script>

<template>
  <header class="header-area absolute w-full top-0 pt-4 pb-10">
    <div class="container mx-auto relative px-4 z-20">
      <nav class="flex items-center justify-between relative">
        <a class="flex items-center flex-shrink-0 mr-6" href="/light/">
          <img
            class="h-10"
            src="https://d33wubrfki0l68.cloudfront.net/0fcd3a5de968db4747c50586a61bcc126b4890fd/3ca91/assets/images/header-logo.svg"
            alt="title"
          />
        </a>
        <div class="w-full flex-grow lg:flex lg:items-center lg:w-auto">
          <ul
            class="mobile-menu bg-white lg:bg-transparent shadow lg:shadow-none absolute lg:relative inset-x-0 hidden lg:flex lg:flex-grow items-center text-base text-blueGray-600 font-semibold mt-7 lg:mt-0 mobile-hover"
          >
            <li class="relative lg:mr-4">
              <a
                class="p-4 flex items-center hover:text-indigo-500 transition duration-500 arrow"
                href="#"
              >
                Home
                <span
                  class="leading-5 text-2xl text-center bg-blueGray-100 w-6 h-6 absolute right-2 top-4 block lg:hidden toggle"
                  >+</span
                ></a
              >
            </li>
            <li class="relative lg:mr-4">
              <a
                class="p-4 flex items-center hover:text-indigo-500 transition duration-500 arrow"
                href="#"
              >
                Explore
                <span
                  class="leading-5 text-2xl text-center bg-blueGray-100 w-6 h-6 absolute right-2 top-4 block lg:hidden toggle"
                  >+</span
                ></a
              >
            </li>
            <li class="relative lg:mr-4">
              <a
                class="p-4 flex items-center hover:text-indigo-500 transition duration-500 arrow"
                href="#"
              >
                Pages
                <span
                  class="leading-5 text-2xl text-center bg-blueGray-100 w-6 h-6 absolute right-2 top-4 block lg:hidden toggle"
                  >+</span
                ></a
              >
            </li>
            <li>
              <a
                class="p-4 flex items-center hover:text-indigo-500 transition duration-500"
                href="/light/activity"
              >
                Activity
              </a>
            </li>
          </ul>
          <form class="header-newsletter hidden lg:flex items-center">
            <div
              class="flex flex-1 items-center xl:w-80 bg-white shadow transition duration-500 hover:shadow-lg rounded h-14 p-4 mr-6"
            >
              <input
                class="appearance-none bg-transparent border-none w-full text-blueGray-600 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Search items"
              />
            </div>
          </form>
          <a
            class="btn hidden xl:flex items-center text-white font-body font-semibold rounded h-14 p-4 transition-all duration-500 bg-gradient-to-tl from-indigo-500 via-purple-500 to-indigo-500 bg-size-200 bg-pos-0 hover:bg-pos-100"
            href="/light/wallet"
            type="submit"
          >
            Connect Wallet</a
          >
        </div>
        <button class="bg-blueGray-50 mobile-toggle block lg:hidden">
          <span class="bg-blueGray-600"></span>
          <span class="bg-blueGray-600"></span>
          <span class="bg-blueGray-600"></span>
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped></style>
