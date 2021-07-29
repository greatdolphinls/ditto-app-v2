import React, { memo, useState } from 'react'
import {
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import AvailableBalanceCaption from '../Shared/AvailableBalanceCaption'
import VAMPIRE_SWAP_STATUS from 'utils/constants/vampire-swap-status'

const useStyles = makeStyles(theme => {
  return {
    root: {
      width: '100%',
      padding: theme.spacing(1, 3),
      borderRadius: 50,
      backgroundColor: theme.palette.secondary.main,
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
    },
    label: {
      color: theme.custom.palette.white
    },
    input: {
      color: theme.custom.palette.white,
      '&::before': {
        borderBottom: 0
      },
    },
    availableBalanceButton: {
      width: 5,
      whiteSpace: 'initial',
      fontSize: 'medium',
      marginRight: theme.spacing(1),
      color: theme.custom.palette.white
    },
    select: {
      color: theme.custom.palette.white,
      '&::before': {
        borderBottom: 0
      },
    },
    selectIcon: {
      color: theme.custom.palette.white,
    },
    menu: {
      backgroundColor: theme.palette.background.default
    }
  };
});

const TokenInputField = React.forwardRef(({
  swapState,
  inputTokens,
  selectedToken,
  handleInputAmount,
  handleTokenChange
}, ref) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState(0);

  return (
    <>
      {selectedToken &&
        <AvailableBalanceCaption
          tooltip='Your balance of the selected input tokens.'
          label={`Available balance: ${selectedToken.balance}`}
        />
      }
      <div className={classes.root}>
        <TextField
          ref={ref}
          fullWidth
          id='swap-input'
          type='number'
          label='Swap'
          placeholder='Amount to swap'
          disabled={swapState === VAMPIRE_SWAP_STATUS.SWAP_LOADING}
          InputLabelProps={{
            shrink: true,
            classes: {
              shrink: classes.label
            }
          }}
          inputProps={{
            min: 0
          }}
          value={inputValue}
          onChange={(e) => {
            handleInputAmount(e.target.value);
            setInputValue(e.target.value);
          }}
          InputProps={{
            classes: {
              root: classes.input,
            },
            endAdornment:
              <InputAdornment position='end'>
                <Button
                  disabled={swapState === VAMPIRE_SWAP_STATUS.SWAP_LOADING}
                  className={classes.availableBalanceButton}
                  onClick={() => { handleInputAmount(selectedToken.balance.toString()); setInputValue(selectedToken.balance.toString()); }}
                >
                  Max
              </Button>
                <FormControl disabled={swapState === VAMPIRE_SWAP_STATUS.SWAP_LOADING}>
                  <Select
                    displayEmpty
                    inputProps={{ 'aria-label': 'available tokens' }}
                    value={selectedToken}
                    onChange={handleTokenChange}
                    MenuProps={{
                      classes: {
                        paper: classes.menu
                      }
                    }}
                    className={classes.select}
                    classes={{
                      icon: classes.selectIcon
                    }}
                  >
                    {inputTokens.map((token, index) => {
                      return (
                        <MenuItem key={index} value={token}>
                          {token.symbol}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </InputAdornment>,
          }}
        />
      </div>
    </>
  );
})

export default memo(TokenInputField)