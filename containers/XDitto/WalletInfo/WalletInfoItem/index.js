import { memo } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { isEmpty } from 'utils/helpers/utility'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(0.5, 2),
    margin: theme.spacing(2, 0),
    borderRadius: 50,
    backgroundColor: theme.palette.secondary.main,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
  },
  title: {
    color: theme.custom.palette.white,
  },
  rowContainer: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const WalletInfoItem = ({
  account,
  title,
  startValue,
  endValue
}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant='caption' className={classes.title}>
        {title}
      </Typography>
      {isEmpty(account)
        ? (
          <Typography className={classes.title}>
            ...
          </Typography>
        ) : (
          <Typography className={classes.title}>
            {`${startValue} ${endValue}`}
          </Typography>
        )
      }
    </div>
  );
};

export default memo(WalletInfoItem)