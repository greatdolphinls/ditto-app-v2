import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent } from '@material-ui/core'

import WalletInfoItem from './WalletInfoItem'
import { X_DITTO_WALLET_ICON_IMAGE_PATH } from 'utils/constants/image-paths'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 290,
    width: '100%',
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(5, 0)
    },
  },
  iconContainer: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  walletIcon: {
    width: 240,
  },
  card: {
    position: 'relative',
    backgroundColor: theme.palette.background.secondary,
    width: '100%',
    zIndex: 1,
    marginTop: 105,
  },
}));

const WalletInfo = ({
  account,
  dittoBalance,
  xDittoBalance,
  exchangeRate,
  usdPrice
}) => {
  const classes = useStyles();

  const dittoInUSD = parseFloat(usdPrice) * parseFloat(dittoBalance);
  const xDittoInUSD = (parseFloat(usdPrice) * parseFloat(exchangeRate)) * parseFloat(xDittoBalance);

  return (
    <div className={classes.root}>
      <div className={classes.iconContainer}>
        <img
          alt='xditto-wallet'
          src={X_DITTO_WALLET_ICON_IMAGE_PATH}
          className={classes.walletIcon}
        />
      </div>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <WalletInfoItem
            account={account}
            title='DITTO in wallet'
            startValue={`${parseFloat(dittoBalance).toFixed(4)} DITTO`}
            endValue={`${(dittoInUSD || 0).toFixed(2)} USD`}
          />
          <WalletInfoItem
            account={account}
            title='xDITTO in wallet'
            startValue={`${parseFloat(xDittoBalance).toFixed(4)} xDITTO`}
            endValue={`${(xDittoInUSD || 0).toFixed(2)} USD`}
          />
          <WalletInfoItem
            account={account}
            title='Exchange rate'
            startValue={`1 xDITTO`}
            endValue={`${parseFloat((exchangeRate || 0)).toFixed(4)} DITTO`}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default memo(WalletInfo)