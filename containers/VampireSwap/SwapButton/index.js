import { memo, useEffect } from 'react'
import CachedIcon from '@material-ui/icons/Cached'
import CheckIcon from '@material-ui/icons/Check'
import SwapVertIcon from '@material-ui/icons/SwapVert'
import { makeStyles } from '@material-ui/core/styles'

import { usePopup } from 'contexts/popup-context'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import VAMPIRE_SWAP_STATUS from 'utils/constants/vampire-swap-status'

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4)
  },
  loadingIcon: {
    animation: 'rotation 2s infinite linear'
  },
  errorMessage: {
    color: theme.custom.palette.red
  }
}));

const SwapButton = ({
  swap,
  swapState,
  approveSwap,
  dittoOutputAmount,
  error,
  setError,
}) => {
  const classes = useStyles();
  const { setPopUp } = usePopup();

  useEffect(() => {
    if (swapState === VAMPIRE_SWAP_STATUS.SWAP_COMPLETE) {
      setPopUp({
        title: 'Swap Successful!',
        text: `You will receive ${dittoOutputAmount || 0} DITTO on your wallet on Binance smart chain shortly.`
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swapState]);

  const renderButton = () => {

    switch (swapState) {
      case VAMPIRE_SWAP_STATUS.AMOUNT_IS_ZERO:
        return <ContainedButton disabled>Enter an amount</ContainedButton>
      case VAMPIRE_SWAP_STATUS.INITIAL:
        return (
          <ContainedButton
            startIcon={<CheckIcon />}
            onClick={() => { approveSwap(); setError(null); }}
          >
            Approve Swap
          </ContainedButton>
        );
      case VAMPIRE_SWAP_STATUS.APPROVING_SWAP:
        return (
          <ContainedButton
            startIcon={<CachedIcon className={classes.loadingIcon} />}
          >
            Approving Swap
          </ContainedButton>
        );
      case VAMPIRE_SWAP_STATUS.SWAP_APPROVED:
        return (
          <ContainedButton
            startIcon={<SwapVertIcon />}
            onClick={() => { swap(); setError(null); }}
          >
            Swap for Ditto
          </ContainedButton>
        );
      case VAMPIRE_SWAP_STATUS.SWAP_LOADING:
        return (
          <ContainedButton
            startIcon={<CachedIcon className={classes.loadingIcon} />}
          >
            Swapping
          </ContainedButton>
        );
      case VAMPIRE_SWAP_STATUS.SWAP_COMPLETE:
        return (
          <ContainedButton startIcon={<CheckIcon />}>
            Swap Complete
          </ContainedButton>
        );
      default:
        return null;
    }
  };

  return (
    <div className={classes.buttonContainer}>
      {renderButton()}
      {error && <p className={classes.errorMessage}>{error}</p>}
    </div>
  );
}

export default memo(SwapButton)
