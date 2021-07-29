import { memo, useCallback, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { makeStyles } from '@material-ui/core/styles'
import { useWeb3React } from '@web3-react/core'
import { Card, CardContent } from '@material-ui/core'

import { CONTRACTS, ETH_CHAIN_ID } from 'config'
import SWAP_ABI from 'libs/abis/swap.json'
import TOKEN_ABI from 'libs/abis/swap-token.json'
import PageTitle from 'parts/PageTitle'
import VampireTitle from './VampireTitle'
import TokenInputField from './TokenInputField'
import TokenOutputField from './TokenOutputField'
import SwapButton from './SwapButton'
import DittoRemainingAmount from './DittoRemainingAmount'
import { usePopup } from 'contexts/popup-context'
import VAMPIRE_SWAP_STATUS from 'utils/constants/vampire-swap-status'
import { VAMPIRE_ICON_IMAGE_PATH } from 'utils/constants/image-paths'
import debounce from 'utils/helpers/debounce'
import { isEmpty } from 'utils/helpers/utility'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    contentContainer: {
      position: 'relative',
      maxWidth: 480,
      width: '100%',
      padding: theme.spacing(0, 3),
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(0),
      },
    },
    vampireIcon: {
      position: 'absolute',
      right: 0,
      width: 240,
    },
    card: {
      position: 'relative',
      backgroundColor: theme.palette.background.secondary,
      width: '100%',
      zIndex: 1,
      marginTop: 120,
    },
    content: {
      padding: theme.spacing(3),
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  };
});

const VampireSwap = () => {
  const classes = useStyles();
  const { setPopUp } = usePopup();
  const { library, chainId, account } = useWeb3React();

  const [swapContract, setSwapContract] = useState();
  const [inputTokens, setInputTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState('');
  const [totalDittoRemaining, setTotalDittoRemaining] = useState(0);
  const [dittoRemainingForUser, setDittoRemainingForUser] = useState(0);
  const [swapState, setSwapState] = useState(VAMPIRE_SWAP_STATUS.AMOUNT_IS_ZERO);
  const [error, setError] = useState(null);
  const [inputTokenAmount, setInputTokenAmount] = useState(0);
  const [dittoOutputAmount, setDittoOutputAmount] = useState(0);
  const [approvedAllowanceAmount, setApprovedAllowanceAmount] = useState(0);

  useEffect(() => {
    if (!chainId) return

    if (parseInt(chainId, 10) !== ETH_CHAIN_ID) {
      setPopUp({
        title: 'Network Error',
        text: 'Switch to Ethereum Mainnet to proceed with swap for DITTO'
      })
      return;
    }

    if (library) {
      getContactInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [library, chainId]);

  const getContactInfo = useCallback(async () => {
    try {
      const swapContract = new ethers.Contract(CONTRACTS.swap, SWAP_ABI, library.getSigner());
      setSwapContract(swapContract)

      const dittoRemainingInSwap = await swapContract.remainingTokensInActiveSwap();
      const dittoRemainingInSwapForUser = await swapContract.remainingTokensForUser(account);
      setTotalDittoRemaining(ethers.utils.formatUnits(dittoRemainingInSwap.toString(), 9));
      setDittoRemainingForUser(ethers.utils.formatUnits(dittoRemainingInSwapForUser.toString(), 9));

      const numberOfInputs = await swapContract.numberOfInputs();
      const finalInputTokens = [];
      for (let tokenIndex = 0; tokenIndex < numberOfInputs.toNumber(); tokenIndex++) {
        const address = await swapContract.inputAddresses(tokenIndex);
        const tokenContract = new ethers.Contract(address, TOKEN_ABI, library.getSigner());
        const symbol = await tokenContract.symbol();
        const decimals = await tokenContract.decimals();
        const balance = ethers.utils.formatUnits(await tokenContract.balanceOf(account), decimals);
        finalInputTokens.push({
          address,
          tokenContract,
          symbol,
          decimals,
          balance
        });
      }
      setInputTokens(finalInputTokens)
      setSelectedToken(finalInputTokens[0])
    } catch (error) {
      console.error('error => ', error)
    }
  }, [account, library, setInputTokens, setSelectedToken])

  useEffect(() => {
    const checkAllowance = async () => {
      try {
        if (!isEmpty(selectedToken) && inputTokenAmount) {
          const formattedInputTokenAmount = ethers.utils.formatUnits(inputTokenAmount, selectedToken.decimals);
          const allowanceAmount = await selectedToken.tokenContract.allowance(account, swapContract.address);
          const approvedAllowance = ethers.utils.formatUnits(allowanceAmount, selectedToken.decimals);
          setApprovedAllowanceAmount(approvedAllowance);

          if (parseFloat(formattedInputTokenAmount) <= 0) {
            setSwapState(VAMPIRE_SWAP_STATUS.AMOUNT_IS_ZERO);
          } else if (!(parseFloat(approvedAllowance) <= parseFloat(formattedInputTokenAmount))) {
            setSwapState(VAMPIRE_SWAP_STATUS.SWAP_APPROVED);
          } else {
            setSwapState(VAMPIRE_SWAP_STATUS.INITIAL);
          }
        }
      } catch (error) {
        console.error('error => ', error)
      }
    };
    checkAllowance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedToken, inputTokenAmount]);

  const handleTokenChange = (event) => {
    setSelectedToken(event.target.value);
    calculateOutputAmount(ethers.utils.formatUnits(inputTokenAmount, selectedToken.decimals), event.target.value);
    setError(null);
  };

  const calculateOutputAmount = async (inputAmount, token) => {
    try {
      if (inputAmount > 0) {
        const convertedInputAmount = ethers.utils.parseUnits(inputAmount, token.decimals);
        const output = await swapContract.getDittoOutputAmount(convertedInputAmount, token.address);
        setDittoOutputAmount(ethers.utils.formatUnits(output, 9));
        setInputTokenAmount(convertedInputAmount);
        setError(null);
      } else {
        setDittoOutputAmount(0);
        setInputTokenAmount(0);
        setError(null);
      }
    } catch (error) {
      console.error('error => ', error)
    }
  };

  const handleInputAmount = debounce((inputAmount) => calculateOutputAmount(inputAmount, selectedToken), 500);

  const approveSwap = async () => {
    try {
      const formattedInputTokenAmount = ethers.utils.formatUnits(inputTokenAmount, selectedToken.decimals);
      if (parseFloat(formattedInputTokenAmount) > 0) {
        const amountToApprove = ethers.utils.parseUnits(`${10000000000}.0`, selectedToken.decimals);

        try {
          setSwapState(VAMPIRE_SWAP_STATUS.APPROVING_SWAP);
          if (approvedAllowanceAmount < parseFloat(formattedInputTokenAmount)) {
            const approveAllowanceTx = await selectedToken.tokenContract.approve(swapContract.address, amountToApprove);
            await approveAllowanceTx.wait();
          }
          setSwapState(VAMPIRE_SWAP_STATUS.SWAP_APPROVED);
        } catch (error) {
          console.log(error);
          setError('Unable to complete transaction, please try again. :)');
        }
      }
    } catch (error) {
      console.error('error => ', error)
    }
  };

  const swap = async () => {
    try {
      setSwapState(VAMPIRE_SWAP_STATUS.SWAP_LOADING);
      const swapTx = await swapContract.swap(selectedToken.address, inputTokenAmount);
      await swapTx.wait();
      setSwapState(VAMPIRE_SWAP_STATUS.SWAP_COMPLETE);
    } catch (error) {
      console.log(error);
      setError('Unable to complete transaction, please try again. :)');
    }
  };

  return (
    <>
      <PageTitle title='Vampire Swap' />
      <div className={classes.root}>
        <div className={classes.contentContainer}>
          <img
            alt='vampire-icon'
            src={VAMPIRE_ICON_IMAGE_PATH}
            className={classes.vampireIcon}
          />
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <form
                noValidate
                autoComplete='off'
                className={classes.formContainer}
              >
                <VampireTitle />
                <TokenInputField
                  swapState={swapState}
                  inputTokens={inputTokens}
                  selectedToken={selectedToken}
                  inputTokenAmount={inputTokenAmount}
                  handleTokenChange={handleTokenChange}
                  handleInputAmount={handleInputAmount}
                />
                <TokenOutputField
                  dittoOutputAmount={dittoOutputAmount}
                  dittoRemainingForUser={dittoRemainingForUser}
                />
                <SwapButton
                  error={error}
                  swapState={swapState}
                  dittoOutputAmount={dittoOutputAmount}
                  swap={swap}
                  setError={setError}
                  approveSwap={approveSwap}
                />
                <DittoRemainingAmount
                  totalDittoRemaining={totalDittoRemaining}
                />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default memo(VampireSwap)