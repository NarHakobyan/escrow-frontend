/// <reference types="vite/client" />

import { MetaMaskInpageProvider } from '@metamask/providers';

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }

  interface ImportMetaEnv {
    VITE_NFT_DEPLOYED_ADDRESS: string;
    VITE_CHAIN_ID: string;
    VITE_API_URL: string;
    VITE_WAVE_PORTAL_ADDRESS: string;
  }
}

declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
