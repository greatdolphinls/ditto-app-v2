import { ethers } from 'ethers'
import XDITTO_ABI from 'libs/abis/abi.json'
import ORACLE_ABI from 'libs/abis/oracle.json'
import ALLOY_ABI from 'libs/abis/alloy.json'
import ICARUS_ABI from 'libs/abis/icarus.json'
import ICARUS_V2_ABI from 'libs/abis/icarusV2.json'
import ZETH_ABI from 'libs/abis/zeth.json'
import STAKE_ZETH_ABI from 'libs/abis/stakeZethAbi.json'
import STAKE_XDITTO_ABI from 'libs/abis/stakeXdittoAbi.json'
import STAKE_XDITTO_V2_ABI from 'libs/abis/stakeXdittoV2Abi.json'
import STAKE_ALLOY_ABI from 'libs/abis/stakeAlloyAbi.json'
import STAKE_ICARUS_ABI from 'libs/abis/stakeIcarusAbi.json'
import STAKE_ICARUS_V2_ABI from 'libs/abis/stakeIcarusV2Abi.json'


const ABIs = {
  '0xB0a1DE764A033A76f28E821fBe402EDBFEe937dB': XDITTO_ABI,
  '0x2df19009b4a48636699d4dbf00e1d7f923c6fa47': ORACLE_ABI,
  '0x5ef5994fa33ff4eb6c82d51ee1dc145c546065bd': ALLOY_ABI,
  '0xdbeb98858f5d4dca13ea0272b2b786e9415d3992': ZETH_ABI,
  '0x95111f630aC215Eb74599ED42C67E2c2790d69e2': ICARUS_ABI,
  '0x0ca2f09eca544b61b91d149dea2580c455c564b2': ICARUS_V2_ABI,
  '0xDb17b0433611322eC4272547f47acAc299C04489': STAKE_XDITTO_ABI,
  '0x23247F7a6631A90dC535bc06c742411402580E0b': STAKE_ALLOY_ABI,
  '0x991cf0bF85DCb2570AeEc42cadfd3Ef63cc4aE36': STAKE_ICARUS_ABI,
  '0xF773733f0dF1549Cbd99a4126Da85dDE398a0EF1': STAKE_ICARUS_V2_ABI,
  '0x5cE93BE92c1A098E6bF7C21647C6930470B2052A': STAKE_ZETH_ABI,
  '0xCE55437008A798660ACec8f76073a80Af7740fd1': STAKE_XDITTO_V2_ABI
}

const getAbi = (contractAddress) => {
  return ABIs[contractAddress];
};

export const getContract = async (address, provider) => {
  const contractAbi = getAbi(address);
  const newContract = await new ethers.Contract(address, contractAbi, provider.getSigner());
  return newContract;
};