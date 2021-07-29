import { memo, useEffect, useState } from 'react'
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

const RedeemButton = ({
  account,
  xDittoContract,
  dittoContract,
  xDittoInput
}) => {
  const classes = useStyles();
  const { setPopUp } = usePopup();

  const [xDittoAllowanceAmount, setXDittoAllowanceAmount] = useState('0');
  const [approvalLoading, setApprovalLoading] = useState(false);
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getAllowanceAmount = async () => {
      const xDittoAllowance = await xDittoContract.allowance(account, xDittoContract.address);
      const formattedXDittoAllowance = ethers.utils.formatUnits(xDittoAllowance, 18);
      setXDittoAllowanceAmount(formattedXDittoAllowance);
    }

    if (!isEmpty(account) && xDittoContract) {
      getAllowanceAmount();
    }
  }, [account, xDittoContract, dittoContract])

  const showError = async (message) => {
    setErrorMessage(message);
    await new Promise(r => setTimeout(r, 5000));
    setErrorMessage('');
  }

  const approveRedeem = async () => {
    const amountToApprove = ethers.utils.parseUnits(`1000000000000000000000000.0`, 9);
    setApprovalLoading(true);
    try {
      const approvalTx = await xDittoContract.approve(xDittoContract.address, amountToApprove);
      await approvalTx.wait();
      getAllowanceAmount();
    } catch (error) {
      console.error(error)
    }
    setApprovalLoading(false);
  }

  const redeem = async () => {
    const inputXDittoToRedeemWith = ethers.utils.parseUnits(xDittoInput, 18);
    setRedeemLoading(true);
    try {
      const redeemTx = await xDittoContract.burn(inputXDittoToRedeemWith);
      await redeemTx.wait();

      setPopUp({
        title: 'Successfully redeemed DITTO',
        text: 'Refresh page & check wallet balance :)'
      })
    } catch (error) {
      console.error(error);
      if (error.message.includes('MetaMask Tx Signature: User denied transaction signature.'))
        showError('Transaction cancelled.');
    }
    setRedeemLoading(false);
  }

  const buttonRender = () => {
    if (account === undefined || account === null) {
      return (
        <ContainedButton>
          Connect wallet to BSC mainnet to continue
        </ContainedButton>
      );
    }

    if (!(parseFloat(xDittoInput) > 0) || xDittoInput === undefined || xDittoInput === '') {
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

    if (parseInt(xDittoAllowanceAmount) === 0) {
      return (
        <ContainedButton onClick={approveRedeem}>
          Approve Redeem
        </ContainedButton>
      )
    }

    if (redeemLoading) {
      return (
        <ContainedButton>
          <Box paddingRight={2} paddingTop={1}>
            <CircularProgress color='#ffffff' size={20} />
          </Box>
          Redeeming
        </ContainedButton>
      )
    }

    return (
      <ContainedButton onClick={redeem}>
        Redeem
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

export default memo(RedeemButton)