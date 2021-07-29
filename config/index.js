
const API_URL = 'https://api.ditto.money'
const BSC_SCAN_URL = 'https://bscscan.com/block/'

const CONTRACTS = {
  token: '0x233d91A0713155003fc4DcE0AFa871b508B3B715',
  controller: '0xdaE0B6F111c62010a8dC6A003B02053C004cFFc1',
  oracle: '0x0738288975Bcc40b522c7B00d5801dBC70705220',
  xDitto: '0xB0a1DE764A033A76f28E821fBe402EDBFEe937dB',
  zeth: '0xdbeb98858f5d4dca13ea0272b2b786e9415d3992',
  zethPool: '0x5cE93BE92c1A098E6bF7C21647C6930470B2052A',
  alloy: '0x5ef5994fa33ff4eb6c82d51ee1dc145c546065bd',
  icarus: '0x95111f630aC215Eb74599ED42C67E2c2790d69e2',
  icarusV2: '0x0ca2f09eca544b61b91d149dea2580c455c564b2',
  xDittoPool: '0xDb17b0433611322eC4272547f47acAc299C04489',
  xDittoPoolV2: '0xCE55437008A798660ACec8f76073a80Af7740fd1',
  alloyPool: '0x23247F7a6631A90dC535bc06c742411402580E0b',
  icarusPool: '0x991cf0bF85DCb2570AeEc42cadfd3Ef63cc4aE36',
  icarusPoolV2: '0xF773733f0dF1549Cbd99a4126Da85dDE398a0EF1',
  swap: '0x6edc3Dfd23856A932601494abCa753Eb144450BC',
}

const CACHE_WALLET_KEY = 'wallet'
const ETH_CHAIN_ID = 1
const SMART_CHAIN_ID = 56
const READ_WEB3_PROVIDER = 'https://bsc-dataseed1.binance.org:443'

const ARENA_POOLS = [
  {
    name: 'ZETH pool',
    stakingContractAddress: CONTRACTS.zethPool,
    stakingTokenAddress: CONTRACTS.xDitto,
    rewardTokenAddress: CONTRACTS.zeth,
    compounding: false,
    poolImage: "/assets/images/zeth.png",
    price: 5.25,
    projectLink: 'https://icarus.finance/'
  },
  {
    name: 'Icarus pool - V2',
    stakingContractAddress: CONTRACTS.icarusPoolV2,
    stakingTokenAddress: CONTRACTS.xDitto,
    rewardTokenAddress: CONTRACTS.icarusV2,
    compounding: false,
    poolImage: "/assets/images/icarus.png",
    price: 0.38,
    projectLink: 'https://icarus.finance/'
  },
  {
    name: 'xDITTO pool - V2',
    stakingContractAddress: CONTRACTS.xDittoPoolV2,
    stakingTokenAddress: CONTRACTS.xDitto,
    rewardTokenAddress: CONTRACTS.xDitto,
    compounding: true,
    poolImage: "/assets/images/xDitto_transparent.png",
    price: 0,
  },
  {
    name: 'xDITTO pool',
    stakingContractAddress: CONTRACTS.xDittoPool,
    stakingTokenAddress: CONTRACTS.xDitto,
    rewardTokenAddress: CONTRACTS.xDitto,
    compounding: true,
    poolImage: "/assets/images/xDitto_transparent.png",
    price: 0
  },
  {
    name: 'Alloy pool',
    stakingContractAddress: CONTRACTS.alloyPool,
    stakingTokenAddress: CONTRACTS.xDitto,
    rewardTokenAddress: CONTRACTS.alloy,
    compounding: false,
    poolImage: "/assets/images/alloy.png",
    price: 0.15,
    projectLink: 'https://hyperjump.fi'
  },

  {
    name: 'Icarus pool',
    stakingContractAddress: CONTRACTS.icarusPool,
    stakingTokenAddress: CONTRACTS.xDitto,
    rewardTokenAddress: CONTRACTS.icarus,
    compounding: false,
    poolImage: "/assets/images/icarus.png",
    price: 0.38,
    projectLink: 'https://icarus.finance/'
  },
];

export {
  API_URL,
  BSC_SCAN_URL,
  CONTRACTS,
  CACHE_WALLET_KEY,
  ETH_CHAIN_ID,
  SMART_CHAIN_ID,
  READ_WEB3_PROVIDER,
  ARENA_POOLS
}