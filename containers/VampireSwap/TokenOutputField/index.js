import React, { memo } from 'react'
import {
  TextField,
  InputAdornment,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import AvailableBalanceCaption from '../Shared/AvailableBalanceCaption'

const useStyles = makeStyles((theme) => ({
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
}));

const TokenOutputField = React.forwardRef(({
  dittoOutputAmount,
  dittoRemainingForUser
}, ref) => {
  const classes = useStyles()

  return (
    <>
      <AvailableBalanceCaption
        tooltip='Amount of DITTO you can still receive in this swap until the per user cap is reached.'
        label={`DITTO remaining for user: ${dittoRemainingForUser}`}
      />
      <div className={classes.root}>
        <TextField
          ref={ref}
          fullWidth
          id='receive-input'
          label='Receive'
          color='primary'
          value={dittoOutputAmount}
          InputLabelProps={{
            shrink: true,
            classes: {
              shrink: classes.label
            }
          }}
          InputProps={{
            classes: {
              root: classes.input,
            },
            readOnly: true,
            endAdornment:
              <InputAdornment position='end'>
                <Typography>DITTO</Typography>
              </InputAdornment>,
          }}
        />
      </div>
    </>
  );
})

export default memo(TokenOutputField)