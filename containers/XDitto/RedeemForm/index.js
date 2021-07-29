import { memo, useCallback, useState } from 'react'
import { ethers } from 'ethers'
import { makeStyles } from '@material-ui/core/styles'
import { useWeb3React } from '@web3-react/core'

import MintInputField from '../Shared/MintInputField'
import MintOutputField from '../Shared/MintOutputField'
import RedeemButton from './RedeemButton'
import debounce from 'utils/helpers/debounce'
import { isEmpty } from 'utils/helpers/utility'

const useStyles = makeStyles((theme) => ({
  redeemForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(6),
  }
}));

const RedeemForm = ({
  xDittoBalance,
  dittoContract,
  xDittoContract,
}) => {
  const classes = useStyles();
  const { account } = useWeb3React();

  const [xDittoInput, setXDittoInput] = useState(0);
  const [dittoOutput, setDittoOutput] = useState(0);
  const [loading, setLoading] = useState(false);

  const getDittoRedeemOutput = useCallback(async (value) => {
    if (isEmpty(value)) {
      setDittoOutput(0);
      return;
    }

    setLoading(true)
    try {
      const xDittoInput = ethers.utils.parseUnits(value, 18);
      const redeemOutput = await xDittoContract.getRedeemAmount(xDittoInput);
      setDittoOutput(ethers.utils.formatUnits(redeemOutput, 9));
    } catch (error) {
      console.error(error);
    }
    setLoading(false)
  }, [xDittoContract, setDittoOutput])

  const onInputChangeHandler = useCallback((e) => {
    setXDittoInput(e.target.value);
    debounce(getDittoRedeemOutput(e.target.value), 500)
  }, [setXDittoInput, getDittoRedeemOutput])

  const onMaxHandler = useCallback(() => {
    setXDittoInput(xDittoBalance);
    debounce(getDittoRedeemOutput(xDittoBalance), 500)
  }, [xDittoBalance, setXDittoInput, getDittoRedeemOutput])

  return (
    <form className={classes.redeemForm} noValidate autoComplete='off'>
      <MintInputField
        value={xDittoInput}
        label='Amount of xDITTO to redeem from'
        currencyLabel='xDITTO'
        disabled={isEmpty(account)}
        maxDisabled={(isEmpty(account) || parseFloat(xDittoBalance) === 0)}
        onMax={onMaxHandler}
        onChange={onInputChangeHandler}
      />
      <MintOutputField
        value={dittoOutput}
        currencyLabel='DITTO'
        loading={loading}
      />
      {!isEmpty(dittoContract) && !isEmpty(xDittoContract) &&
        <RedeemButton
          account={account}
          xDittoContract={xDittoContract}
          dittoContract={dittoContract}
          xDittoInput={xDittoInput}
        />
      }
    </form>
  );
};

export default memo(RedeemForm)