
import { memo, useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { makeStyles } from '@material-ui/core/styles'
import { useWeb3React } from '@web3-react/core'
import { Card, CardContent } from '@material-ui/core'

import { CONTRACTS, SMART_CHAIN_ID } from 'config'
import XDITTO_ABI from 'libs/abis/abi.json'
import DITTO_ABI from 'libs/abis/ditto.json'
import ORACLE_ABI from 'libs/abis/oracle.json'
import PageTitle from 'parts/PageTitle'
import XDittoTabs from './XDittoTabs'
import MintForm from './MintForm'
import RedeemForm from './RedeemForm'
import WalletInfo from './WalletInfo'
import TabPanel from './Shared/TabPanel'
import { usePopup } from 'contexts/popup-context'
import { X_DITTO_FORM_ICON_IMAGE_PATH } from 'utils/constants/image-paths'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: theme.spacing(8, 0),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      margin: theme.spacing(3, 0),
    },
  },
  contentContainer: {
    position: 'relative',
    maxWidth: 450,
    width: '100%'
  },
  iconContainer: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  formIcon: {
    width: 240,
  },
  card: {
    position: 'relative',
    backgroundColor: theme.palette.background.secondary,
    width: '100%',
    zIndex: 1,
    marginTop: 105,
  },
  content: {
    padding: theme.spacing(3),
  },
  panel: {
    maxWidth: 450,
    width: '100%'
  },
}));

const XDitto = () => {
  const classes = useStyles();
  const { setPopUp } = usePopup();
  const { library, chainId, account } = useWeb3React();

  const [dittoBalance, setDittoBalance] = useState('0');
  const [xDittoBalance, setXDittoBalance] = useState('0');
  const [dittoContract, setDittoContract] = useState();
  const [xDittoContract, setXDittoContract] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [usdPrice, setUsdPrice] = useState();
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const getContactInfo = async () => {
      const dittoContract = new ethers.Contract(CONTRACTS.token, DITTO_ABI, library.getSigner());
      setDittoContract(dittoContract)
      const latestDittoBalance = await dittoContract.balanceOf(account);
      const dittoBalance = ethers.utils.formatUnits(latestDittoBalance, 9);
      setDittoBalance(dittoBalance);

      const xDittoContract = new ethers.Contract(CONTRACTS.xDitto, XDITTO_ABI, library.getSigner());
      setXDittoContract(xDittoContract);
      const latestXDittoBalance = await xDittoContract.balanceOf(account);
      const xDittoBalance = ethers.utils.formatUnits(latestXDittoBalance, 18);
      setXDittoBalance(xDittoBalance);

      const exchangeRate = await xDittoContract.getRedeemAmount(ethers.BigNumber.from("1000000000000000000"));
      const formattedExchangeRate = ethers.utils.formatUnits(exchangeRate, 9);
      setExchangeRate(formattedExchangeRate);

      const oracleContract = new ethers.Contract(CONTRACTS.oracle, ORACLE_ABI, library.getSigner());
      const oracleData = await oracleContract.getData();
      const oraclePrice = ethers.utils.formatUnits(oracleData, 18);
      setUsdPrice(oraclePrice);
    }

    if (!chainId) return

    if (parseInt(chainId, 10) !== SMART_CHAIN_ID) {
      setPopUp({
        title: 'Network Error',
        text: 'Switch to Smart Chain to mint and redeem'
      })
      return;
    }

    if (library) {
      getContactInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, library, chainId]);

  return (
    <>
      <PageTitle title='xDitto' />
      <main className={classes.root}>
        <div className={classes.contentContainer}>
          <div className={classes.iconContainer}>
            <img
              alt='xditto-form'
              src={X_DITTO_FORM_ICON_IMAGE_PATH}
              className={classes.formIcon}
            />
          </div>
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <XDittoTabs
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
              <TabPanel value={selectedTab} index={0} className={classes.panel}>
                <MintForm
                  dittoBalance={dittoBalance}
                  dittoContract={dittoContract}
                  xDittoContract={xDittoContract}
                />
              </TabPanel>
              <TabPanel value={selectedTab} index={1} className={classes.panel}>
                <RedeemForm
                  xDittoBalance={xDittoBalance}
                  dittoContract={dittoContract}
                  xDittoContract={xDittoContract}
                />
              </TabPanel>
            </CardContent>
          </Card>
        </div>
        <WalletInfo
          account={account}
          usdPrice={usdPrice}
          exchangeRate={exchangeRate}
          dittoBalance={dittoBalance}
          xDittoBalance={xDittoBalance}
        />
      </main>
    </>
  )
}

export default memo(XDitto)