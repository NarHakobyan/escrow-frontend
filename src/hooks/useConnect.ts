import { reactive, ref, markRaw, Ref } from 'vue';
import { ethers } from 'ethers';

export interface ReturnConnect {
  getAccount: () => Promise<Ref<string | null> | undefined>;
  getChainId: () => Promise<Ref<string | number | null> | undefined>;
  getSigner: () => Promise<ethers.providers.JsonRpcSigner>;
  chainId: Ref<number | string | null>;
  connect: () => Promise<Record<string, any> | void>;
  disconnect: () => Promise<Record<string, any> | void>;
  switchChain: (localChainId: string) => Promise<void>;
  account: Ref<string | null>;
  data: Record<string, any>;
}

export function useConnect(): ReturnConnect {
  if (!window.ethereum) {
    throw 'No provider';
  }

  const provider = reactive(window.ethereum);

  const account = ref<string | null>(null);
  const chainId = ref<string | number | null>(null);
  const data = reactive<{ signer: ethers.providers.JsonRpcSigner | null }>({
    signer: null,
  });

  const getAccount = async () => {
    if (!provider.request) return;

    const accounts = await provider.request<string[]>({
      method: 'eth_requestAccounts',
    });

    if (!accounts?.[0]) {
      throw new Error('No account');
    }

    account.value = ethers.utils.getAddress(accounts[0]);

    return account;
  };

  const getChainId = async () => {
    if (!provider.request) return;

    chainId.value = await provider.request({
      method: 'eth_chainId',
    });

    return chainId;
  };

  const getSigner = async (): Promise<ethers.providers.JsonRpcSigner> => {
    const localProvider = new ethers.providers.Web3Provider(
      <ethers.providers.ExternalProvider | ethers.providers.JsonRpcFetchFunc>(
        provider
      ),
    );

    data.signer = markRaw(localProvider.getSigner(<string>account.value));

    return data.signer;
  };

  const accountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) disconnect();
    else account.value = ethers.utils.getAddress(accounts[0]);
  };

  const chainChanged = (localChainId: string) => {
    chainId.value = localChainId;
  };

  const switchChain = async (localChainId: string) => {
    if (!provider.request) return;

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: localChainId }],
      });
    } catch (error) {
      throw error;
    }
  };

  const connect = async () => {
    if (provider.on) {
      provider.on('accountsChanged', accountsChanged);
      provider.on('chainChanged', chainChanged);
      provider.on('disconnect', disconnect);
    }

    await getAccount();
    await getChainId();
    await getSigner();

    return { account, chainId, data };
  };

  const disconnect = async () => {
    if (!provider.removeListener) return;

    provider.removeListener('accountsChanged', accountsChanged);
    provider.removeListener('chainChanged', chainChanged);
    provider.removeListener('disconnect', disconnect);

    account.value = null;
    chainId.value = null;
    data.signer = null;

    return { account, chainId, data };
  };

  return {
    account,
    chainId,
    data,
    connect,
    switchChain,
    disconnect,
    getSigner,
    getAccount,
    getChainId,
  };
}
