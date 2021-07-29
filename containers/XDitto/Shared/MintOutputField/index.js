import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress
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
}));

const MintOutputField = React.forwardRef(({
  currencyLabel,
  loading = false,
  ...rest
}, ref) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        ref={ref}
        id='xditto-amount-output'
        className={classes.textField}
        label='Receive'
        color='primary'
        InputLabelProps={{
          shrink: true,
          classes: {
            shrink: classes.label
          }
        }}
        InputProps={{
          readOnly: true,
          classes: {
            root: classes.input,
          },
          endAdornment:
            <InputAdornment position='start'>
              {loading &&
                <Box paddingRight={5}>
                  <CircularProgress color='primary' size={20} />
                </Box>
              }
              <Typography>{currencyLabel}</Typography>
            </InputAdornment>,
        }}
        {...rest}
      />
    </div>
  );
});

export default memo(MintOutputField)