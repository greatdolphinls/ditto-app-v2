import { useState, memo, useCallback } from 'react'
import { ethers } from 'ethers'
import { makeStyles } from '@material-ui/core/styles'
import { useWeb3React } from '@web3-react/core'

import MintButton from './MintButton'
import MintInputField from '../Shared/MintInputField'
import MintOutputField from '../Shared/MintOutputField'
import debounce from 'utils/helpers/debounce'
import { isEmpty } from 'utils/helpers/utility'

const useStyles = makeStyles((theme) => ({
  mintForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(6),
  }
}));

const MintForm = ({
  dittoBalance,
  dittoContract,
  xDittoContract,
}) => {
  const classes = useStyles();
  const { account } = useWeb3React();

  const [dittoInput, setDittoInput] = useState(0);
  const [xDittoOutput, setXDittoOutput] = useState(0);
  const [loading, setLoading] = useState(false);

  const getXDittoMintOutput = useCallback(async (value) => {
    if (isEmpty(value)) {
      setXDittoOutput(0);
      return;
    }

    setLoading(true);
    try {
      const inputDitto = ethers.utils.parseUnits(value, 9);
      const mintOutput = await xDittoContract.getMintAmount(inputDitto);
      setXDittoOutput(ethers.utils.formatUnits(mintOutput, 18));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, [xDittoContract, setXDittoOutput, setLoading])

  const onInputChangeHandler = useCallback((e) => {
    setDittoInput(e.target.value);
    debounce(getXDittoMintOutput(e.target.value), 500)
  }, [setDittoInput, getXDittoMintOutput])

  const onMaxHandler = useCallback(() => {
    setDittoInput(dittoBalance);
    debounce(getXDittoMintOutput(dittoBalance), 500)
  }, [dittoBalance, setDittoInput, getXDittoMintOutput])

  return (
    <form className={classes.mintForm} noValidate autoComplete='off'>
      <MintInputField
        value={dittoInput}
        label='Amount of DITTO to mint with'
        currencyLabel='DITTO'
        disabled={isEmpty(account)}
        maxDisabled={isEmpty(account) || parseFloat(dittoBalance) === 0}
        onMax={onMaxHandler}
        onChange={onInputChangeHandler}
      />
      <MintOutputField
        value={xDittoOutput}
        currencyLabel='xDITTO'
        loading={loading}
      />
      {!isEmpty(dittoContract) && !isEmpty(xDittoContract) &&
        <MintButton
          account={account}
          dittoContract={dittoContract}
          xDittoContract={xDittoContract}
          inputDitto={dittoInput}
        />
      }
    </form>
  );
};

export default memo(MintForm)