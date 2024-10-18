/* eslint-disable max-lines */
import { CurrencyAmount, ChainId as UniswapSDKChainId } from '@uniswap/sdk-core'
import {
  ARBITRUM_LOGO,
  ASTROCHAIN_SEPOLIA_LOGO,
  AVALANCHE_LOGO,
  BASE_LOGO,
  BLAST_LOGO,
  BNB_LOGO,
  CELO_LOGO,
  ETHEREUM_LOGO,
  OPTIMISM_LOGO,
  POLYGON_LOGO,
  WORLD_CHAIN_LOGO,
  ZKSYNC_LOGO,
  ZORA_LOGO,
} from 'ui/src/assets'
import { config } from 'uniswap/src/config'
import {
  CUSD_CELO,
  DAI,
  DAI_ARBITRUM_ONE,
  DAI_OPTIMISM,
  DAI_POLYGON,
  USDB_BLAST,
  USDC,
  USDC_ARBITRUM,
  USDC_ASTROCHAIN_SEPOLIA,
  USDC_AVALANCHE,
  USDC_BASE,
  USDC_BNB,
  USDC_CELO,
  USDC_OPTIMISM,
  USDC_POLYGON,
  USDC_SEPOLIA,
  USDC_WORLD_CHAIN,
  USDC_ZKSYNC,
  USDC_ZORA,
  USDT,
} from 'uniswap/src/constants/tokens'
import { Chain as BackendChainId } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks'
import { ElementName } from 'uniswap/src/features/telemetry/constants'
import {
  InterfaceGqlChain,
  NetworkLayer,
  RPCType,
  RetryOptions,
  UniverseChainId,
  UniverseChainInfo,
} from 'uniswap/src/types/chains'
import { isInterface } from 'utilities/src/platform'
import { ONE_MINUTE_MS } from 'utilities/src/time/time'
import {
  arbitrum,
  avalanche,
  base,
  blast,
  bsc,
  celo,
  mainnet,
  optimism,
  polygon,
  sepolia,
  zkSync,
  zora,
} from 'wagmi/chains'

/** Address that represents native currencies on ETH, Arbitrum, etc. */
export const DEFAULT_NATIVE_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
export const DEFAULT_RETRY_OPTIONS: RetryOptions = { n: 10, minWait: 250, maxWait: 1000 }

export const DEFAULT_MS_BEFORE_WARNING = ONE_MINUTE_MS * 10

export const UNIVERSE_CHAIN_INFO: Record<UniverseChainId, UniverseChainInfo> = {
  [UniverseChainId.Mainnet]: {
    ...mainnet,
    id: UniverseChainId.Mainnet,
    sdkId: UniswapSDKChainId.MAINNET,
    assetRepoNetworkName: 'ethereum',
    backendChain: {
      chain: BackendChainId.Ethereum as InterfaceGqlChain,
      backendSupported: true,
      isSecondaryChain: false,
      nativeTokenBackendAddress: undefined,
    },
    blockPerMainnetEpochForChainId: 1,
    blockWaitMsBeforeWarning: isInterface ? DEFAULT_MS_BEFORE_WARNING : ONE_MINUTE_MS,
    bridge: undefined,
    chainPriority: 0,
    docs: 'https://docs.uniswap.org/',
    elementName: ElementName.ChainEthereum,
    explorer: {
      name: 'Etherscan',
      url: 'https://etherscan.io/',
      apiURL: 'https://api.etherscan.io',
    },
    helpCenterUrl: undefined,
    infoLink: 'https://app.uniswap.org/explore',
    infuraPrefix: 'mainnet',
    interfaceName: 'mainnet',
    label: 'Ethereum',
    logo: ETHEREUM_LOGO,
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      address: DEFAULT_NATIVE_ADDRESS,
      explorerLink: 'https://etherscan.io/chart/etherprice',
      logo: ETHEREUM_LOGO,
    },
    networkLayer: NetworkLayer.L1,
    pendingTransactionsRetryOptions: undefined,
    rpcUrls: {
      [RPCType.Private]: {
        http: ['https://rpc.mevblocker.io/?referrer=uniswapwallet'],
      },
      [RPCType.Public]: {
        http: [config.quicknodeMainnetRpcUrl],
      },
      default: {
        http: ['https://cloudflare-eth.com'],
      },
      fallback: {
        http: ['https://rpc.ankr.com/eth', 'https://eth-mainnet.public.blastapi.io'],
      },
      appOnly: {
        http: [`https://mainnet.infura.io/v3/${config.infuraKey}`, config.quicknodeMainnetRpcUrl],
      },
    },
    urlParam: 'ethereum',
    statusPage: undefined,
    spotPriceStablecoinAmount: CurrencyAmount.fromRawAmount(USDC, 100_000e6),
    stablecoins: [USDC, DAI, USDT],
    supportsClientSideRouting: true,
    supportsGasEstimates: true,
    wrappedNativeCurrency: {
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    },
  } as const satisfies UniverseChainInfo,
  [UniverseChainId.Sepolia]: {
    ...sepolia,
    id: UniverseChainId.Sepolia,
    sdkId: UniswapSDKChainId.SEPOLIA,
    assetRepoNetworkName: undefined,
    backendChain: {
      chain: BackendChainId.EthereumSepolia as InterfaceGqlChain,
      backendSupported: true,
      isSecondaryChain: false,
      nativeTokenBackendAddress: undefined,
    },
    blockPerMainnetEpochForChainId: 1,
    blockWaitMsBeforeWarning: undefined,
    bridge: undefined,
    chainPriority: 0,
    docs: 'https://docs.uniswap.org/',
    elementName: ElementName.ChainSepolia,
    explorer: {
      name: 'Etherscan',
      url: 'https://sepolia.etherscan.io/',
      apiURL: 'https://api-sepolia.etherscan.io',
    },
    helpCenterUrl: undefined,
    infoLink: 'https://app.uniswap.org/explore',
    infuraPrefix: 'sepolia',
    interfaceName: 'sepolia',
    label: 'Sepolia',
    logo: ETHEREUM_LOGO,
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      address: DEFAULT_NATIVE_ADDRESS,
      explorerLink: 'https://sepolia.etherscan.io/chart/etherprice',
      logo: ETHEREUM_LOGO,
    },
    networkLayer: NetworkLayer.L1,
    pendingTransactionsRetryOptions: undefined,
    rpcUrls: {
      [RPCType.Public]: {
        http: [config.quicknodeSepoliaRpcUrl],
      },
      default: {
        http: ['https://rpc.sepolia.org/'],
      },
      fallback: {
        http: [
          'https://rpc.sepolia.org/',
          'https://rpc2.sepolia.org/',
          'https://rpc.sepolia.online/',
          'https://www.sepoliarpc.space/',
          'https://rpc-sepolia.rockx.com/',
          'https://rpc.bordel.wtf/sepolia',
        ],
      },
      appOnly: { http: [`https://sepolia.infura.io/v3/${config.infuraKey}`] },
    },
    spotPriceStablecoinAmount: CurrencyAmount.fromRawAmount(USDC_SEPOLIA, 100e6),
    stablecoins: [USDC_SEPOLIA],
    statusPage: undefined,
    supportsClientSideRouting: true,
    supportsGasEstimates: false,
    urlParam: 'sepolia',
    wrappedNativeCurrency: {
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      address: '0xfff9976782d46cc05630d1f6ebab18b2324d6b14',
    },
  } as const satisfies UniverseChainInfo,
  [UniverseChainId.ArbitrumOne]: {
    ...arbitrum,
    id: UniverseChainId.ArbitrumOne,
    sdkId: UniswapSDKChainId.ARBITRUM_ONE,
    assetRepoNetworkName: 'arbitrum',
    backendChain: {
      chain: BackendChainId.Arbitrum as InterfaceGqlChain,
      backendSupported: true,
      isSecondaryChain: false,
      nativeTokenBackendAddress: undefined,
    },
    blockPerMainnetEpochForChainId: 46,
    blockWaitMsBeforeWarning: DEFAULT_MS_BEFORE_WARNING,
    bridge: 'https://bridge.arbitrum.io/',
    chainPriority: 1,
    docs: 'https://offchainlabs.com/',
    elementName: ElementName.ChainArbitrum,
    explorer: {
      name: 'Arbiscan',
      url: 'https://arbiscan.io/',
      apiURL: 'https://api.arbiscan.io',
    },
    helpCenterUrl: 'https://help.uniswap.org/en/collections/3137787-uniswap-on-arbitrum',
    infoLink: 'https://app.uniswap.org/explore/tokens/arbitrum',
    infuraPrefix: 'arbitrum-mainnet',
    interfaceName: 'arbitrum',
    label: 'Arbitrum',
    logo: ARBITRUM_LOGO,
    nativeCurrency: {
      name: 'Arbitrum ETH',
      symbol: 'ETH',
      decimals: 18,
      address: DEFAULT_NATIVE_ADDRESS,
      explorerLink: 'https://arbiscan.io/chart/etherprice',
      logo: ETHEREUM_LOGO,
    },
    networkLayer: NetworkLayer.L2,
    pendingTransactionsRetryOptions: DEFAULT_RETRY_OPTIONS,
    spotPriceStablecoinAmount: CurrencyAmount.fromRawAmount(USDC_ARBITRUM, 10_000e6),
    stablecoins: [USDC_ARBITRUM, DAI_ARBITRUM_ONE],
    statusPage: undefined,
    supportsClientSideRouting: true,
    supportsGasEstimates: true,
    urlParam: 'arbitrum',
    rpcUrls: {
      [RPCType.Public]: { http: [config.quicknodeArbitrumRpcUrl] },
      default: { http: ['https://arb1.arbitrum.io/rpc'] },
      fallback: { http: ['https://arbitrum.public-rpc.com'] },
      appOnly: {
        http: [`https://arbitrum-mainnet.infura.io/v3/${config.infuraKey}`, config.quicknodeArbitrumRpcUrl],
      },
      [RPCType.PublicAlt]: { http: ['https://arb1.arbitrum.io/rpc'] },
    },
    wrappedNativeCurrency: {
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      address: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
    },
  } as const satisfies UniverseChainInfo,
  [UniverseChainId.Optimism]: {
    ...optimism,
    id: UniverseChainId.Optimism,
    sdkId: UniswapSDKChainId.OPTIMISM,
    assetRepoNetworkName: 'optimism',
    backendChain: {
      chain: BackendChainId.Optimism as InterfaceGqlChain,
      backendSupported: true,
      isSecondaryChain: false,
      nativeTokenBackendAddress: undefined,
    },
    blockPerMainnetEpochForChainId: 6,
    blockWaitMsBeforeWarning: isInterface ? 1500000 : 1200000,
    bridge: 'https://app.optimism.io/bridge',
    chainPriority: 2,
    docs: 'https://optimism.io/',
    elementName: ElementName.ChainOptimism,
    explorer: {
      name: 'OP Etherscan',
      url: 'https://optimistic.etherscan.io/',
      apiURL: 'https://api-optimistic.etherscan.io',
    },
    helpCenterUrl: 'https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ',
    infoLink: 'https://app.uniswap.org/explore/tokens/optimism',
    infuraPrefix: 'optimism-mainnet',
    interfaceName: 'optimism',
    label: 'Optimism',
    logo: OPTIMISM_LOGO,
    nativeCurrency: {
      name: 'Optimistic ETH',
      symbol: 'ETH',
      decimals: 18,
      address: DEFAULT_NATIVE_ADDRESS,
      explorerLink: 'https://optimistic.etherscan.io/chart/etherprice',
      logo: ETHEREUM_LOGO,
    },
    networkLayer: NetworkLayer.L2,
    pendingTransactionsRetryOptions: DEFAULT_RETRY_OPTIONS,
    rpcUrls: {
      [RPCType.Public]: { http: [config.quicknodeOpRpcUrl] },
      [RPCType.PublicAlt]: { http: ['https://mainnet.optimism.io'] },
      default: { http: ['https://mainnet.optimism.io/'] },
      fallback: { http: ['https://rpc.ankr.com/optimism'] },
      appOnly: { http: [`https://optimism-mainnet.infura.io/v3/${config.infuraKey}`] },
    },
    spotPriceStablecoinAmount: CurrencyAmount.fromRawAmount(DAI_OPTIMISM, 10_000e18),
    stablecoins: [USDC_OPTIMISM, DAI_OPTIMISM],
    statusPage: 'https://optimism.io/status',
    supportsClientSideRouting: true,
    supportsGasEstimates: true,
    urlParam: 'optimism',
    wrappedNativeCurrency: {
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      address: '0x4200000000000000000000000000000000000006',
    },
  } as const satisfies UniverseChainInfo,
  [UniverseChainId.Base]: {
    ...base,
    id: UniverseChainId.Base,
    sdkId: UniswapSDKChainId.BASE,
    backendChain: {
      chain: BackendChainId.Base as InterfaceGqlChain,
      backendSupported: true,
      isSecondaryChain: false,
      nativeTokenBackendAddress: undefined,
    },
    blockPerMainnetEpochForChainId: 6,
    blockWaitMsBeforeWarning: isInterface ? 1500000 : 600000,
    bridge: 'https://bridge.base.org/deposit',
    chainPriority: 4,
    docs: 'https://docs.base.org/docs/',
    elementName: ElementName.ChainBase,
    explorer: {
      name: 'BaseScan',
      url: 'https://basescan.org/',
      apiURL: 'https://api.basescan.org',
    },
    helpCenterUrl: undefined,
    infoLink: 'https://app.uniswap.org/explore/tokens/base',
    interfaceName: 'base',
    label: 'Base',
    logo: BASE_LOGO,
    nativeCurrency: {
      name: 'Base ETH',
      symbol: 'ETH',
      decimals: 18,
      address: DEFAULT_NATIVE_ADDRESS,
      explorerLink: 'https://basescan.org/chart/etherprice',
      logo: ETHEREUM_LOGO,
    },
    networkLayer: NetworkLayer.L2,
    pendingTransactionsRetryOptions: DEFAULT_RETRY_OPTIONS,
    statusPage: 'https://status.base.org/',
    supportsClientSideRouting: true,
    supportsGasEstimates: true,
    urlParam: 'base',
    rpcUrls: {
      [RPCType.Public]: { http: [config.quicknodeBaseRpcUrl] },
      default: { http: ['https://mainnet.base.org/'] },
      fallback: { http: ['https://1rpc.io/base', 'https://base.meowrpc.com'] },
      appOnly: { http: [`https://base-mainnet.infura.io/v3/${config.infuraKey}`] },
    },
    spotPriceStablecoinAmount: CurrencyAmount.fromRawAmount(USDC_BASE, 10_000e6),
    assetRepoNetworkName: 'base',
    stablecoins: [USDC_BASE],
    infuraPrefix: 'base-mainnet',
    wrappedNativeCurrency: {
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      address: '0x4200000000000000000000000000000000000006',
    },
  } as const satisfies UniverseChainInfo,
  [UniverseChainId.Bnb]: {
    ...bsc,
    sdkId: UniswapSDKChainId.BNB,
    assetRepoNetworkName: 'smartchain',
    backendChain: {
      chain: BackendChainId.Bnb as InterfaceGqlChain,
      backendSupported: true,
      isSecondaryChain: false,
      nativeTokenBackendAddress: undefined,
    },
    blockPerMainnetEpochForChainId: 4,
    blockWaitMsBeforeWarning: 600000,
    bridge: 'https://cbridge.celer.network/1/56',
    chainPriority: 5,
    docs: 'https://docs.bnbchain.org/',
    elementName: ElementName.ChainBNB,
    explorer: {
      name: 'BscScan',
      url: 'https://bscscan.com/',
      apiURL: 'https://api.bscscan.com',
    },
    helpCenterUrl: undefined,
    id: UniverseChainId.Bnb,
    infoLink: 'https://app.uniswap.org/explore/tokens/bnb',
    infuraPrefix: undefined,
    interfaceName: 'bnb',
    label: 'BNB Chain',
    logo: BNB_LOGO,
    name: 'BNB Smart Chain Mainnet',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
      address: '0xb8c77482e45f1f44de1745f52c74426c631bdd52',
      logo: BNB_LOGO,
    },
    networkLayer: NetworkLayer.L1,
    pendingTransactionsRetryOptions: undefined,
    rpcUrls: {
      [RPCType.Public]: { http: [config.quicknodeBnbRpcUrl] },
      default: { http: ['https://bsc-dataseed1.bnbchain.org'] },
      appOnly: { http: [config.quicknodeBnbRpcUrl] },
    },
    spotPriceStablecoinAmount: CurrencyAmount.fromRawAmount(USDC_BNB, 100e18),
    stablecoins: [USDC_BNB],
    statusPage: undefined,
    supportsClientSideRouting: true,
    supportsGasEstimates: true,
    urlParam: 'bnb',
    wrappedNativeCurrency: {
      name: 'Wrapped BNB',
      symbol: 'WBNB',
      decimals: 18,
      address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
  } as const satisfies UniverseChainInfo,
  [UniverseChainId.Polygon]: {
    ...polygon,
    id: UniverseChainId.Polygon,
    sdkId: UniswapSDKChainId.POLYGON,
    assetRepoNetworkName: 'polygon',
    blockPerMainnetEpochForChainId: 5,
    backendChain: {
      chain: BackendChainId.Polygon as InterfaceGqlChain,
      backendSupported: true,
      nativeTokenBackendAddress: '0x0000000000000000000000000000000000001010',
      isSecondaryChain: false,
    },
    blockWaitMsBeforeWarning: 600000,
    bridge: 'https://portal.polygon.technology/bridge',
    chainPriority: 3,
    docs: 'https://polygon.io/',
    elementName: ElementName.ChainPolygon,
    explorer: {
      name: 'PolygonScan',
      url: 'https://polygonscan.com/',
      apiURL: 'https://api.polygonscan.com',
    },
    helpCenterUrl: undefined,
    infoLink: 'https://app.uniswap.org/explore/tokens/polygon',
    infuraPrefix: 'polygon-mainnet',
    interfaceName: 'polygon',
    label: 'Polygon',
    logo: POLYGON_LOGO,
    name: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'Polygon POL',
      symbol: 'POL',
      decimals: 18,
      address: '0x0000000000000000000000000000000000001010',
      logo: POLYGON_LOGO,
    },
    networkLayer: NetworkLayer.L1,
    pendingTransactionsRetryOptions: undefined,
    rpcUrls: {
      [RPCType.Public]: { http: [config.quicknodePolygonRpcUrl] },
      [RPCType.PublicAlt]: { http: ['https://polygon-rpc.com/'] },
      default: { http: ['https://polygon-rpc.com/'] },
      appOnly: { http: [`https://polygon-mainnet.infura.io/v3/${config.infuraKey}`] },
    },
    spotPriceStablecoinAmount: CurrencyAmount.fromRawAmount(USDC_POLYGON, 10_000e6),
    stablecoins: [USDC_POLYGON, DAI_POLYGON],
    statusPage: undefined,
    supportsClientSideRouting: true,
    supportsGasEstimates: true,
    urlParam: 'polygon',
    wrappedNativeCurrency: {
      name: 'Wrapped POL',
      symbol: 'WPOL',
      decimals: 18,
      address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
    },
  } as const satisfies UniverseChainInfo,
  [UniverseChainId.Blast]: {
    ...blast,
    id: UniverseChainId.Blast,
    sdkId: UniswapSDKChainId.BLAST,
    assetRepoNetworkName: 'blast',
    backendChain: {
      chain: BackendChainId.Blast as InterfaceGqlChain,
      backendSupported: true,
      isSecondaryChain: false,
      nativeTokenBackendAddress: undefined,
    },
    blockPerMainnetEpochForChainId: 1,
    blockWaitMsBeforeWarning: undefined,
    bridge: 'https://blast.io/bridge',
    chainPriority: 8,
    docs: 'https://docs.blast.io',
    elementName: ElementName.ChainBlast,
    explorer: {
      name: 'BlastScan',
      url: 'https://blastscan.io/',
      apiURL: 'https://api.blastscan.io',
    },
    helpCenterUrl: undefined,
    infoLink: 'https://app.uniswap.org/explore/tokens/blast',
    infuraPrefix: 'blast-mainnet',
    interfaceName: 'blast',
    label: 'Blast',
    logo: BLAST_LOGO,
    networkLayer: NetworkLayer.L2,
    pendingTransactionsRetryOptions: DEFAULT_RETRY_OPTIONS,
    spotPriceStablecoinAmount: CurrencyAmount.fromRawAmount(USDB_BLAST, 10_000e18),
    stablecoins: [USDB_BLAST],
    statusPage: undefined,
    supportsClientSideRouting: false,
    supportsGasEstimates: true,
    urlParam: 'blast',
    nativeCurrency: {
      name: 'Blast ETH',
      symbol: 'ETH',
      decimals: 18,
      address: DEFAULT_NATIVE_ADDRESS,
      logo: ETHEREUM_LOGO,
    },
    rpcUrls: {
      [RPCType.Public]: { http: [config.quicknodeBlastRpcUrl] },
      default: { http: ['https://rpc.blast.io/'] },
      appOnly: { http: [`https://blast-mainnet.infura.io/v3/${config.infuraKey}`] },
    },
    wrappedNativeCurrency: {
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      address: '0x4300000000000000000000000000000000000004',
    },
  } as const satisfies UniverseChainInfo,
  [UniverseChainId.Avalanche]: {
    ...avalanche,
    id: UniverseChainId.Avalanche,
    sdkId: UniswapSDKChainId.AVALANCHE,
    assetRepoNetworkName: 'avalanchec',
    backendChain: {
      chain: BackendChainId.Avalanche as InterfaceGqlChain,
      backendSupported: true,
      isSecondaryChain: false,
      nativeTokenBackendAddress: undefined,
    },
    blockPerMainnetEpochForChainId: 6,
    blockWaitMsBeforeWarning: 600000,
    bridge: 'https://core.app/bridge/',
    chainPriority: 6,
    docs: 'https://docs.avax.network/',
    elementName: ElementName.ChainAvalanche,
    explorer: {
      name: 'Snowtrace',
      url: 'https://snowtrace.io/',
      apiURL: 'https://api.snowscan.xyz',
    },
    helpCenterUrl: undefined,
    infoLink: 'https://app.uniswap.org/explore/tokens/avalanche',
    infuraPrefix: 'avalanche-mainnet',
    interfaceName: 'avalanche',
    label: 'Avalanche',
    logo: AVALANCHE_LOGO,
    name: 'Avalanche C-Chain',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
      address: DEFAULT_NATIVE_ADDRESS,
      logo: AVALANCHE_LOGO,
    },
    networkLayer: NetworkLayer.L1,
    pendingTransactionsRetryOptions: undefined,
    rpcUrls: {
      [RPCType.Public]: { http: [config.quicknodeAvaxRpcUrl] },
      default: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
      appOnly: { http: [`https://avalanche-mainnet.infura.io/v3/${config.infuraKey}`] },
    },
    spotPriceStablecoinAmount: CurrencyAmount.fromRawAmount(USDC_AVALANCHE, 10_000e6),
    stablecoins: [USDC_AVALANCHE],
    statusPage: undefined,
    supportsClientSideRouting: true,
    supportsGasEstimates: true,
    urlParam: 'avalanche',
    wrappedNativeCurrency: {
      name: 'Wrapped AVAX',
      symbol: 'WAVAX',
      decimals: 18,
      address: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
    },
  } as const satisfies UniverseChainInfo,
  [UniverseChainId.Celo]: {
    ...celo,
    id: UniverseChainId.Celo,
    sdkId: UniswapSDKChainId.CELO,
    assetRepoNetworkName: 'celo',
    backendChain: {
      chain: BackendChainId.Celo as InterfaceGqlChain,
      backendSupported: true,
      nativeTokenBackendAddress: '0x471EcE3750Da237f93B8E339c536989b8978a438',
      isSecondaryChain: false,
    },
    blockPerMainnetEpochForChainId: 2,
    blockWaitMsBeforeWarning: 600000,
    bridge: 'https://www.portalbridge.com/#/transfer',
    chainPriority: 7,
    docs: 'https://docs.celo.org/',
    elementName: ElementName.ChainCelo,
    explorer: {
      name: 'Celoscan',
      url: 'https://celoscan.io/',
      apiURL: 'https://api.celoscan.io',
    },
    helpCenterUrl: undefined,
    infoLink: 'https://app.uniswap.org/explore/tokens/celo',
    infuraPrefix: 'celo-mainnet',
    interfaceName: 'celo',
    label: 'Celo',
    logo: CELO_LOGO,
    name: 'Celo Mainnet',
    nativeCurrency: {
      name: 'Celo',
      symbol: 'CELO',
      decimals: 18,
      address: '0x471EcE3750Da237f93B8E339c536989b8978a438',
      logo: CELO_LOGO,
    },
    networkLayer: NetworkLayer.L1,
    pendingTransactionsRetryOptions: undefined,
    spotPriceStablecoinAmount: CurrencyAmount.fromRawAmount(CUSD_CELO, 10_000e18),
    stablecoins: [USDC_CELO],
    statusPage: undefined,
    supportsClientSideRouting: true,
    supportsGasEstimates: true,
    urlParam: 'celo',
    rpcUrls: {
      [RPCType.Public]: { http: [config.quicknodeCeloRpcUrl] },
      default: { http: [`https://forno.celo.org`] },
      appOnly: { http: [`https://celo-mainnet.infura.io/v3/${config.infuraKey}`] },
    },
    wrappedNativeCurrency: {
      name: 'Celo',
      symbol: 'CELO',
      decimals: 18,
      address: '0x471EcE3750Da237f93B8E339c536989b8978a438',
    },
  } as const satisfies UniverseChainInfo,
  [UniverseChainId.WorldChain]: {
    // ...worldChain,
    name: 'World Chain',
    id: UniverseChainId.WorldChain,
    sdkId: UniswapSDKChainId.WORLDCHAIN,
    assetRepoNetworkName: 'worldcoin',
    backendChain: {
      chain: BackendChainId.Worldchain as InterfaceGqlChain,
      backendSupported: true,
      isSecondaryChain: false,
      nativeTokenBackendAddress: undefined,
    },
    blockPerMainnetEpochForChainId: 1, // TODO: verify
    blockWaitMsBeforeWarning: undefined,
    bridge: 'https://superbridge.app/world-chain',
    chainPriority: 11,
    docs: 'https://docs.worldcoin.org/',
    elementName: ElementName.ChainWorldChain,
    explorer: {
      name: 'World Chain Explorer',
      url: 'https://worldchain-mainnet.explorer.alchemy.com/',
    },
    helpCenterUrl: undefined,
    infoLink: 'https://app.uniswap.org/explore/tokens/ethereum/0x163f8c2467924be0ae7b5347228cabf260318753',
    infuraPrefix: undefined,
    interfaceName: 'worldchain',
    label: 'World Chain',
    logo: WORLD_CHAIN_LOGO,
    nativeCurrency: {
      name: 'World Chain ETH',
      symbol: 'ETH',
      decimals: 18,
      address: DEFAULT_NATIVE_ADDRESS,
      logo: ETHEREUM_LOGO,
    },
    networkLayer: NetworkLayer.L2,
    pendingTransactionsRetryOptions: undefined,
    rpcUrls: {
      [RPCType.Public]: {
        http: [config.quicknodeWorldChainRpcUrl],
      },
      default: { http: ['https://worldchain-mainnet.g.alchemy.com/public'] },
      appOnly: {
        http: [config.quicknodeWorldChainRpcUrl],
      },
    },
    urlParam: 'worldchain',
    statusPage: undefined,
    spotPriceStablecoinAmount: CurrencyAmount.fromRawAmount(USDC_WORLD_CHAIN, 10_000e6),
    stablecoins: [USDC_WORLD_CHAIN],
    supportsClientSideRouting: false,
    supportsGasEstimates: false,
    wrappedNativeCurrency: {
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      address: '0x4200000000000000000000000000000000000006',
    },
  } as const satisfies UniverseChainInfo,
  [UniverseChainId.Zora]: {
    ...zora,
    id: UniverseChainId.Zora,
    sdkId: UniswapSDKChainId.ZORA,
    assetRepoNetworkName: 'zora',
    backendChain: {
      chain: BackendChainId.Zora as InterfaceGqlChain,
      backendSupported: false,
      isSecondaryChain: false,
      nativeTokenBackendAddress: undefined,
    },
    blockPerMainnetEpochForChainId: 1, // TODO: verify
    blockWaitMsBeforeWarning: 600000,
    bridge: 'https://bridge.zora.energy/',
    chainPriority: 9,
    docs: 'https://docs.zora.co/',
    elementName: ElementName.ChainZora,
    explorer: {
      name: 'Zora Explorer',
      url: 'https://explorer.zora.energy/',
    },
    helpCenterUrl: undefined,
    infoLink: 'https://app.uniswap.org/explore/tokens/zora',
    infuraPrefix: undefined,
    interfaceName: 'zora',
    label: 'Zora Network',
    logo: ZORA_LOGO,
    networkLayer: NetworkLayer.L2,
    nativeCurrency: {
      name: 'Zora ETH',
      symbol: 'ETH',
      decimals: 18,
      address: DEFAULT_NATIVE_ADDRESS,
      logo: ETHEREUM_LOGO,
    },
    pendingTransactionsRetryOptions: undefined,
    rpcUrls: {
      [RPCType.Public]: { http: [config.quicknodeZoraRpcUrl] },
      default: { http: ['https://rpc.zora.energy/'] },
      appOnly: { http: [config.quicknodeZoraRpcUrl] },
    },
    spotPriceStablecoinAmount: CurrencyAmount.fromRawAmount(USDC_ZORA, 10_000e6),
    stablecoins: [USDC_ZORA],
    statusPage: undefined,
    supportsClientSideRouting: false,
    supportsGasEstimates: true,
    urlParam: 'zora',
    wrappedNativeCurrency: {
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      address: '0x4200000000000000000000000000000000000006',
    },
  } as const satisfies UniverseChainInfo,
  [UniverseChainId.Zksync]: {
    ...zkSync,
    id: UniverseChainId.Zksync,
    sdkId: UniswapSDKChainId.ZKSYNC,
    assetRepoNetworkName: 'zksync',
    backendChain: {
      chain: BackendChainId.Zksync as InterfaceGqlChain,
      backendSupported: true,
      isSecondaryChain: false,
      nativeTokenBackendAddress: undefined,
    },
    blockPerMainnetEpochForChainId: 12,
    blockWaitMsBeforeWarning: 600000,
    bridge: 'https://portal.zksync.io/bridge/',
    chainPriority: 10,
    docs: 'https://docs.zksync.io/',
    elementName: ElementName.ChainZkSync,
    explorer: {
      name: 'ZKsync Explorer',
      url: 'https://explorer.zksync.io/',
      apiURL: 'https://block-explorer-api.mainnet.zksync.io',
    },
    helpCenterUrl: undefined,
    infoLink: 'https://app.uniswap.org/explore/tokens/zksync',
    infuraPrefix: undefined,
    interfaceName: 'zksync',
    label: 'ZKsync',
    logo: ZKSYNC_LOGO,
    nativeCurrency: {
      name: 'ZKsync ETH',
      symbol: 'ETH',
      decimals: 18,
      address: DEFAULT_NATIVE_ADDRESS,
      logo: ETHEREUM_LOGO,
    },
    networkLayer: NetworkLayer.L2,
    pendingTransactionsRetryOptions: undefined,
    rpcUrls: {
      [RPCType.Public]: { http: [config.quicknodeZkSyncRpcUrl] },
      default: { http: ['https://mainnet.era.zksync.io/'] },
      appOnly: { http: [config.quicknodeZkSyncRpcUrl] },
    },
    urlParam: 'zksync',
    statusPage: undefined,
    spotPriceStablecoinAmount: CurrencyAmount.fromRawAmount(USDC_ZKSYNC, 10_000e6),
    stablecoins: [USDC_ZKSYNC],
    supportsClientSideRouting: false,
    supportsGasEstimates: false,
    wrappedNativeCurrency: {
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      address: '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91',
    },
  } as const satisfies UniverseChainInfo,
  [UniverseChainId.AstrochainSepolia]: {
    // ...astrochainSepolia,
    name: 'Unichain Sepolia',
    testnet: true,
    id: UniverseChainId.AstrochainSepolia,
    sdkId: UniswapSDKChainId.ASTROCHAIN_SEPOLIA,
    assetRepoNetworkName: undefined,
    backendChain: {
      chain: BackendChainId.AstrochainSepolia as InterfaceGqlChain,
      backendSupported: true,
      isSecondaryChain: false,
      nativeTokenBackendAddress: undefined,
    },
    blockPerMainnetEpochForChainId: 1,
    blockWaitMsBeforeWarning: undefined,
    bridge: undefined,
    chainPriority: 0,
    docs: 'https://docs.uniswap.org/', // need docs
    elementName: ElementName.ChainSepolia,
    explorer: {
      name: 'Unichain Sepolia Explorer',
      url: 'https://unichain-sepolia.blockscout.com/',
    },
    helpCenterUrl: undefined,
    infoLink: 'https://app.uniswap.org/explore', // need
    infuraPrefix: 'astrochain-sepolia',
    interfaceName: 'astrochain',
    label: 'Unichain Sepolia',
    logo: ASTROCHAIN_SEPOLIA_LOGO,
    nativeCurrency: {
      name: 'Unichain Sepolia ETH',
      symbol: 'ETH',
      decimals: 18,
      address: DEFAULT_NATIVE_ADDRESS,
      logo: ETHEREUM_LOGO,
    },
    networkLayer: NetworkLayer.L2,
    pendingTransactionsRetryOptions: undefined,
    rpcUrls: {
      [RPCType.Public]: {
        http: [config.quicknodeAstrochainSepoliaRpcUrl],
      },
      default: {
        http: [config.quicknodeAstrochainSepoliaRpcUrl],
      },
      appOnly: {
        http: [config.quicknodeAstrochainSepoliaRpcUrl],
      },
    },
    spotPriceStablecoinAmount: CurrencyAmount.fromRawAmount(USDC_ASTROCHAIN_SEPOLIA, 10_000e6),
    stablecoins: [USDC_ASTROCHAIN_SEPOLIA],
    statusPage: undefined,
    supportsClientSideRouting: true,
    supportsGasEstimates: false,
    urlParam: 'astrochain-sepolia',
    wrappedNativeCurrency: {
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      address: '0x4200000000000000000000000000000000000006',
    },
  } as const satisfies UniverseChainInfo,
}

export const GQL_MAINNET_CHAINS = Object.values(UNIVERSE_CHAIN_INFO)
  .filter((chain) => !chain.testnet && !chain.backendChain.isSecondaryChain)
  .map((chain) => chain.backendChain.chain)
  .filter((backendChain) => !!backendChain)

export const GQL_TESTNET_CHAINS = Object.values(UNIVERSE_CHAIN_INFO)
  .filter((chain) => chain.testnet && !chain.backendChain.isSecondaryChain)
  .map((chain) => chain.backendChain.chain)
  .filter((backendChain) => !!backendChain)

/** Used for making graphql queries to all chains supported by the graphql backend. Must be mutable for some apollo typechecking. */
export const GQL_MAINNET_CHAINS_MUTABLE = GQL_MAINNET_CHAINS.map((c) => c)
export const GQL_TESTNET_CHAINS_MUTABLE = GQL_TESTNET_CHAINS.map((c) => c)
