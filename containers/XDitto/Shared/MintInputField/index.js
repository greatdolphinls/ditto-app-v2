import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  TextField,
  Typography,
  InputAdornment,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(1, 3),
    margin: theme.spacing(1, 0),
    borderRadius: 50,
    backgroundColor: theme.palette.secondary.main,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
  },
  textField: {
    width: '100%',
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
  maxButton: {
    width: 5,
    whiteSpace: 'initial',
    fontSize: 'medium',
    marginRight: theme.spacing(1),
    color: theme.custom.palette.white
  },
}));

const MintInputField = React.forwardRef(({
  maxDisabled,
  onMax,
  currencyLabel,
  ...rest
}, ref) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        ref={ref}
        id='mint-amount-input'
        color='primary'
        type='number'
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
          classes: {
            shrink: classes.label
          }
        }}
        inputProps={{ min: 0 }}
        InputProps={{
          classes: {
            root: classes.input,
          },
          endAdornment:
            <InputAdornment>
              <Button
                onClick={onMax}
                disabled={maxDisabled}
                className={classes.maxButton}
              >
                Max
              </Button>
              <Typography>{currencyLabel}</Typography>
            </InputAdornment>,
        }}
        {...rest}
      />
    </div>
  );
});

export default memo(MintInputField)