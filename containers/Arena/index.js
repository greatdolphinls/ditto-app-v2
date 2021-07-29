import React, { memo, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useWeb3React } from "@web3-react/core";

import { CONTRACTS, ARENA_POOLS } from 'config';
import XDITTO_ABI from 'libs/abis/abi.json';
import ORACLE_ABI from 'libs/abis/oracle.json';

import Image from 'next/image';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';


import Pool from './Pool';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        marginTop: '-20px',
        width: '90%'
    },
    gridContainer: {
        marginTop: '5px'
    },
    poolContainer: {
        padding: 20,
        backgroundColor: '#E5D0DD',
        borderRadius: '35px'
    },
    poolTitle: {
        color: 'white',
        fontSize: '25px',
        textShadow: '2px 2px grey',
        fontWeight: 'bold'
    },
    poolActionButton: {
        fontSize: 14,
        fontWeight: 'bold',
        borderRadius: 30,
        '&:hover': {
            color: theme.palette.primary.main
        }
    },
    applyLink: {
        fontSize: 14,
        fontWeight: 'bold',
        borderRadius: 30,
        backgroundColor: theme.palette.secondary.main,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        textTransform: 'uppercase',
        textDecoration: 'none',
        color: 'white',
        '&:hover': {
            backgroundColor: 'grey',
        }

    },

}));

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.primary.main,
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.grey[500],
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.common.white,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.secondary.main,
    },
    checked: {},
}))(Switch);



const Arena = () => {
    const context = useWeb3React();
    const theme = useTheme();
    const classes = useStyles();

    const matchesLg = useMediaQuery(theme.breakpoints.up('lg'));

    const {
        library,
        chainId,
    } = context;

    const [xDittoContract, setXDittoContract] = useState();
    const [currentBlockNumber, setCurrentBlockNumber] = useState(0);
    const [xDittoPrice, setXDittoPrice] = useState();

    const [state, setState] = React.useState({
        checkedC: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const getBlockNumber = async () => {
        const blockNumber = await library.getBlockNumber();
        setCurrentBlockNumber(blockNumber);
    }

    useEffect(() => {
        const getXDittoContractAndBalance = async () => {
            const newXDittoContract = new ethers.Contract(CONTRACTS.xDitto, XDITTO_ABI, library.getSigner());
            setXDittoContract(newXDittoContract);
        }

        if (library) {
            getXDittoContractAndBalance();
            getBlockNumber();
        }

    }, [library, chainId]);

    useEffect(() => {
        if (library) {
            library.on("block", () => {
                getBlockNumber();
            })
        }
    }, [library]);


    useEffect(() => {
        const getXDittoPrice = async () => {
            const oracleContract = new ethers.Contract(CONTRACTS.oracle, ORACLE_ABI, library.getSigner());
            const oracleData = await oracleContract.getData();
            const oraclePrice = ethers.utils.formatUnits(oracleData, 18);
            const exchangeRateData = await xDittoContract.getRedeemAmount(ethers.BigNumber.from("1000000000000000000"));
            const exchangeRate = ethers.utils.formatUnits(exchangeRateData, 9);
            const price = parseFloat(oraclePrice) * parseFloat(exchangeRate);
            setXDittoPrice(price);
        }

        if (xDittoContract) {
            getXDittoPrice();
        }

    }, [xDittoContract])


    return (
        <main className={classes.root}>
            <p style={{ color: '#A03B79', fontFamily: 'Source Sans Pro', fontSize: 25 }}>Welcome to the Arena Trainer</p>
            <hr style={{ borderTop: '1px solid #A03B79', marginTop: '-25px' }} />
            {/* <Box display="flex" justifyContent="center">
                <Typography component="div">
                    <Grid component="label" container alignItems="center" spacing={1}>
                        <Grid item>
                            <p style={{ color: '#A03B79', fontFamily: 'Source Sans Pro', fontSize: 20 }}>Live</p>
                        </Grid>
                        <Grid item>
                            <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                        </Grid>
                        <Grid item>
                            <p style={{ color: '#A03B79', fontFamily: 'Source Sans Pro', fontSize: 20 }}>Finished</p>
                        </Grid>
                    </Grid>
                </Typography>
            </Box> */}
            <Grid alignItems="center" container spacing={3} >
                {console.log(ARENA_POOLS)}
                {ARENA_POOLS.map((pool) => {
                    return (
                        <Grid key={pool.name} item xs={matchesLg ? 4 : 12} className={classes.gridContainer}>
                            <Pool
                                name={pool.name}
                                stakingContractAddress={pool.stakingContractAddress}
                                stakingTokenAddress={pool.stakingTokenAddress}
                                rewardTokenAddress={pool.rewardTokenAddress}
                                price={pool.price}
                                xdittoPrice={xDittoPrice}
                                compounding={pool.compounding}
                                currentBlockNumber={currentBlockNumber}
                                poolImage={pool.poolImage}
                                poolLink={pool.projectLink}
                            />

                        </Grid>
                    )
                })}
                <Grid key="???" item xs={matchesLg ? 4 : 12} className={classes.gridContainer}>
                    <Paper className={classes.poolContainer}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography className={classes.poolTitle} >Your Project ?</Typography>
                            <Image
                                src="/assets/images/your-project.png"
                                alt="Reward token logo"
                                width={'45px'}
                                height={'55px'}
                            />
                        </Box>
                        <Typography>TVL: $ X</Typography>
                        <hr style={{ borderTop: '1px solid black', backgroundColor: '#A03B79' }} />
                        <Box display="flex" justifyContent="space-between">
                            <Typography>Pool APR:</Typography>
                            <Typography> X% </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <Typography>Earn:</Typography>
                            <Typography> XXX </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <Typography>Staked:</Typography>
                            <Typography> X </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <Typography>XXX Earned:</Typography>
                            <Typography> X </Typography>
                        </Box>
                        <hr style={{ borderTop: '1px solid black', backgroundColor: '#A03B79' }} />
                        <Box display="flex" justifyContent="space-evenly" mt={2}>
                            <a href="mailto:contact@ditto.money" className={classes.applyLink}>
                                Apply
                            </a>
                        </Box>
                    </Paper>

                </Grid>

            </Grid >
        </main>
    );
}

export default memo(Arena)
