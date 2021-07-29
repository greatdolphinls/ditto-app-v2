import { memo, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Tooltip } from '@material-ui/core'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'

import { CONTRACTS, SMART_CHAIN_ID } from 'config'
import { useStats } from 'contexts/stats-context'
import { usePopup } from 'contexts/popup-context'
import CONTROLLER_ABI from 'libs/abis/controller.json'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import CardWrapper from '../CardWrapper'
import { showInfoToast } from 'utils/helpers/toast'

const useStyles = makeStyles((theme) => ({
  arrow: {
    color: theme.custom.palette.pink,
  },
  tooltip: {
    borderRadius: 12,
    backgroundColor: theme.custom.palette.pink,
  },
}));

const RebaseStat = () => {
  const classes = useStyles();
  const { cooldownExpired } = useStats()
  const { library, chainId, account } = useWeb3React();
  const { setPopUp } = usePopup();

  const [controllerContract, setControllerContract] = useState();
  const [isRebasing, setIsRebasing] = useState(false)

  useEffect(() => {
    const getContactInfo = async () => {
      try {
        const controllerContract = new ethers.Contract(CONTRACTS.controller, CONTROLLER_ABI, library.getSigner());
        setControllerContract(controllerContract)
      } catch (error) {
        console.error('error => ', error)
      }
    }

    if (!chainId) return

    if (parseInt(chainId, 10) !== SMART_CHAIN_ID) {
      setPopUp({
        title: 'Network Error',
        text: 'Switch to Smart Chain to rebase'
      })
      return;
    }

    if (library) {
      getContactInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [library, chainId]);

  const connectOrRebase = async () => {
    if (!account) return;

    if (parseInt(chainId, 10) !== SMART_CHAIN_ID) {
      setPopUp({
        title: 'Network Error',
        text: 'Switch to Smart Chain to rebase'
      })
      return;
    }

    try {
      setIsRebasing(true)
      const tx = await controllerContract.rebase()
      showInfoToast(`Rebasing: ${tx.hash}`)
      await tx.wait()
      showInfoToast(`Rebased: ${tx.hash}`)
    } catch (e) {
      console.log(e)
    } finally {
      setIsRebasing(false)
    }
  }

  return (
    <Tooltip
      arrow
      classes={{
        arrow: classes.arrow,
        tooltip: classes.tooltip
      }}
      title={'Triggers the rebase. Try increasing the gas limit if your transaction fails.'}
      placement={'top'}
    >
      <div>
        <CardWrapper title='Rebase'>
          <Box display='flex' justifyContent='center'>
            <ContainedButton
              disabled={!cooldownExpired || isRebasing}
              onClick={connectOrRebase}
            >
              {isRebasing ? 'REBASING...' : 'REBASE'}
            </ContainedButton>
          </Box>
        </CardWrapper>
      </div>
    </Tooltip>
  )
}

export default memo(RebaseStat)