import { memo, useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  Typography,
  CircularProgress
} from '@material-ui/core'

import ContainedButton from 'components/UI/Buttons/ContainedButton'
import { usePopup } from 'contexts/popup-context'
import { isEmpty } from 'utils/helpers/utility'

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(4, 0),
    width: '50%'
  },
}));

const MintButton = ({
  account,
  inputDitto,
  dittoContract,
  xDittoContract,
}) => {
  const classes = useStyles();
  const { setPopUp } = usePopup();

  const [dittoAllowanceAmount, setDittoAllowanceAmount] = useState('0');
  const [approvalLoading, setApprovalLoading] = useState(false);
  const [mintLoading, setMintLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getAllowanceAmount = async () => {
      const dittoAllowance = await dittoContract.allowance(account, xDittoContract.address);
      const formattedDittoAllowance = ethers.utils.formatUnits(dittoAllowance, 9);
      setDittoAllowanceAmount(formattedDittoAllowance);
    }
    if (!isEmpty(account) && dittoContract) {
      getAllowanceAmount();
    }
  }, [account, xDittoContract, dittoContract])

  const showError = async (message) => {
    setErrorMessage(message);
    await new Promise(r => setTimeout(r, 5000));
    setErrorMessage('');
  }

  const approveMint = async () => {
    const amountToApprove = ethers.utils.parseUnits(`1000000000000000000000000.0`, 9);
    setApprovalLoading(true);
    try {
      const approvalTx = await dittoContract.approve(xDittoContract.address, amountToApprove);
      await approvalTx.wait();
      getAllowanceAmount();
    } catch (error) {
      console.error(error)
    }
    setApprovalLoading(false);
  }

  const mint = async () => {
    const inputDittoToMintWith = ethers.utils.parseUnits(inputDitto, 9);
    console.log(inputDittoToMintWith, inputDitto)
    setMintLoading(true);
    try {
      const mintTx = await xDittoContract.mint(account, inputDittoToMintWith);
      await mintTx.wait();

      setPopUp({
        title: 'Successfully minted XDITTO',
        text: 'Refresh page & check wallet balance :)'
      })
    } catch (error) {
      console.error(error);
      if (error.message.includes('MetaMask Tx Signature: User denied transaction signature.'))
        showError('Transaction cancelled.');
    }
    setMintLoading(false);
  }

  const buttonRender = () => {
    if (account === undefined || account === null) {
      return (
        <ContainedButton>
          Connect wallet to BSC mainnet to continue
        </ContainedButton>
      );
    }

    if (!(parseFloat(inputDitto) > 0) || inputDitto === undefined || inputDitto === '') {
      return (
        <ContainedButton>Enter an amount</ContainedButton>
      )
    }

    if (approvalLoading) {
      return (
        <ContainedButton>
          <Box paddingRight={2} paddingTop={1}>
            <CircularProgress color='#ffffff' size={20} />
          </Box>
          Approval loading
        </ContainedButton>
      )
    }

    if (parseInt(dittoAllowanceAmount) === 0) {
      return (
        <ContainedButton onClick={approveMint}>
          Approve Mint
        </ContainedButton>
      )
    }

    if (mintLoading) {
      return (
        <ContainedButton>
          <Box paddingRight={2} paddingTop={1}>
            <CircularProgress color='#ffffff' size={20} />
          </Box>
          Minting
        </ContainedButton>
      )
    }

    return (
      <ContainedButton onClick={mint}>
        Mint
      </ContainedButton>
    )
  }

  return (
    <Box className={classes.buttonContainer} >
      {buttonRender()}
      {errorMessage && <Typography>{errorMessage}</Typography>}
    </Box>
  );
};

export default memo(MintButton)