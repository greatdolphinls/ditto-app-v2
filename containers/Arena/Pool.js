import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers'
import { makeStyles } from '@material-ui/core/styles';

import {
    useWeb3React,
} from "@web3-react/core";

import Image from 'next/image'

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper'

import { getContract } from 'libs/utilities'

import StakingModal from './StakingModal'
import WithdrawingModal from './WithdrawingModal'


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '12px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '45%',
        display: 'flex',
        flexDirection: 'column'
    },
    availableBalance: {
        alignSelf: 'flex-end',
        paddingTop: 30,
        paddingBottom: 30
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
        paddingTop: '2%'
    },
    spinner: {
        size: 2
    },
    connectToContinuePrompt: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 10
    },
    poolActionButton: {
        fontSize: 14,
        fontWeight: 'bold',
        borderRadius: 30,
        '&:hover': {
            color: theme.palette.primary.main
        }

    },
    poolButtonContainer: {
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        },
    },
    poolButton: {
        [theme.breakpoints.down('md')]: {
            marginTop: '10px'
        },
    },
    poolLink: {
        textDecoration: 'none'
    },
    stakeButton: {
        padding: 0,
    }
}));

export default function Pool({ name, stakingContractAddress, stakingTokenAddress, rewardTokenAddress, price, xdittoPrice, compounding, currentBlockNumber, poolImage, poolLink }) {
    const context = useWeb3React();
    const classes = useStyles();

    const {
        library,
        account,
    } = context;

    const [stakingTokenName, setStakingTokenName] = useState();
    const [stakingContract, setStakingContract] = useState();
    const [stakingPoolBalance, setStakingPoolBalance] = useState();
    const [stakingTokenContract, setStakingTokenContract] = useState();
    const [stakingTokenBalance, setStakingTokenBalance] = useState();
    const [stakingTokenDecimals, setStakingTokenDecimals] = useState();
    const [reward, setReward] = useState();
    const [rewardTokenName, setRewardTokenName] = useState();
    const [rewardTokenContract, setRewardTokenContract] = useState();
    const [rewardTokenBalance, setRewardTokenBalance] = useState();
    const [rewardTokenDecimals, setRewardTokenDecimals] = useState();


    const [endBlock, setEndBlock] = useState();
    const [amountStaked, setAmountStaked] = useState();
    const [stakingAllowance, setStakingAllowance] = useState();
    const [stakeInput, setStakeInput] = useState();
    const [withdrawInput, setWithdrawInput] = useState();
    const [errorMessage, setErrorMessage] = useState(null);
    const [harvestLoading, setHarvestLoading] = useState(false);
    const [compoundLoading, setCompoundLoading] = useState(false);
    const [approvalLoading, setApprovalLoading] = useState(false);
    const [withdrawLoading, setWithdrawLoading] = useState(false);
    const [stakingLoading, setStakingLoading] = useState(false);
    const [rewardPerBlock, setRewardPerBlock] = useState();
    const [poolApr, setPoolApr] = useState();
    const [currentPrice, setCurrentPrice] = useState()

    const [openStakeModal, setOpenStakeModal] = useState(false);

    const handleOpenStakeModal = () => {
        setOpenStakeModal(true);
    };

    const [openWithdrawModal, setOpenWithdrawModal] = React.useState(false);

    const handleOpenWithdrawModal = () => {
        setOpenWithdrawModal(true);
    };

    const getPendingReward = async () => {
        const pendingReward = await stakingContract.pendingReward(account);
        const formattedPendingReward = ethers.utils.formatUnits(pendingReward, rewardTokenDecimals);
        setReward(formattedPendingReward);
    }

    useEffect(() => {
        const getPoolContractsAndTokenBalances = async () => {
            const newStakingContract = await getContract(stakingContractAddress, library);
            const newStakingTokenContract = await getContract(stakingTokenAddress, library);
            const newStakingTokenName = await newStakingTokenContract.name();
            const stakingTokenBalance = await newStakingTokenContract.balanceOf(account);
            const stakingTokenDecimals = await newStakingTokenContract.decimals();
            const stakingPoolAddress = await newStakingContract.stakingPool();
            const newStakingPoolBalance = await newStakingTokenContract.balanceOf(stakingPoolAddress);
            const formattedStakingPoolBalance = ethers.utils.formatUnits(newStakingPoolBalance, stakingTokenDecimals);
            const formattedStakingTokenBalance = ethers.utils.formatUnits(stakingTokenBalance, stakingTokenDecimals);
            const newRewardTokenContract = await getContract(rewardTokenAddress, library);
            const newRewardTokenName = await newRewardTokenContract.name();
            const rewardTokenBalance = await newRewardTokenContract.balanceOf(account);
            const rewardTokenDecimals = await newRewardTokenContract.decimals();
            const formattedRewardTokenBalance = ethers.utils.formatUnits(rewardTokenBalance, rewardTokenDecimals);

            setStakingContract(newStakingContract);
            setStakingPoolBalance(formattedStakingPoolBalance);
            setStakingTokenName(newStakingTokenName);
            setStakingTokenContract(newStakingTokenContract);
            setStakingTokenBalance(formattedStakingTokenBalance);
            setStakingTokenDecimals(stakingTokenDecimals);
            setRewardTokenContract(newRewardTokenContract);
            setRewardTokenBalance(formattedRewardTokenBalance);
            setRewardTokenDecimals(rewardTokenDecimals);
            setRewardTokenName(newRewardTokenName);

        }

        if (library) {
            getPoolContractsAndTokenBalances();
            if (price === 0) {
                setCurrentPrice(xdittoPrice)
            } else {
                setCurrentPrice(price);
            }
        }

    }, [library, xdittoPrice])

    useEffect(() => {
        const getEndBlockAndRate = async () => {
            const end = await stakingContract.bonusEndBlock();
            const rewardPerBlock = await stakingContract.rewardPerBlock();
            const formattedRewardPerBlock = ethers.utils.formatUnits(rewardPerBlock, stakingTokenDecimals);
            setEndBlock(end);
            setRewardPerBlock(formattedRewardPerBlock);
        }

        const getAllowanceAmount = async () => {
            const stakingAllowance = await stakingTokenContract.allowance(account, stakingContract.address);
            const formattedStakingAllowance = ethers.utils.formatUnits(stakingAllowance, stakingTokenDecimals);
            setStakingAllowance(formattedStakingAllowance);
        }

        const getStakedAmount = async () => {
            const info = await stakingContract.userInfo(account);
            const formattedAmountStaked = ethers.utils.formatUnits(info.amount, stakingTokenDecimals);
            setAmountStaked(formattedAmountStaked);
        }

        if (stakingTokenContract && stakingContract) {
            getEndBlockAndRate();
            getAllowanceAmount();
            getStakedAmount();
            getPendingReward();
        }

    }, [stakingContract, stakingTokenContract]);

    useEffect(() => {
        if (rewardPerBlock && stakingPoolBalance) {
            const newApr = (rewardPerBlock * currentPrice * 10512000 / (stakingPoolBalance * xdittoPrice)) * 100;
            setPoolApr(newApr);
        }

    }, [rewardPerBlock, stakingPoolBalance]);


    useEffect(() => {
        if (library && stakingContract) {
            library.on("block", () => {
                getPendingReward();
            })
        }

    }, [stakingContract, library]);


    const approveStake = async () => {
        const amountToApprove = ethers.utils.parseUnits(`1000000000000000000000000.0`, stakingTokenDecimals);
        setApprovalLoading(true);
        try {
            const approvalTx = await stakingTokenContract.approve(stakingContract.address, amountToApprove);
            await approvalTx.wait();
            getAllowanceAmount();
        } catch (error) {
            if (error.message.includes('MetaMask Tx Signature: User denied transaction signature.')) {
                setErrorMessage('Transaction cancelled.');
                setTimeout(() => { setErrorMessage(null) }, 5000);
            } else {
                setErrorMessage('Error occured. Please try again.');
                setTimeout(() => { setErrorMessage(null) }, 5000);
            }
        }
        setApprovalLoading(false);
    }


    const stake = async (inputStakeAmount) => {
        const inputStakeTokenToStake = ethers.utils.parseUnits(inputStakeAmount, stakingTokenDecimals);
        try {
            const stakeTx = await stakingContract.deposit(inputStakeTokenToStake);
            await stakeTx.wait();
        } catch (error) {
            console.error(error);
            if (error.message.includes('MetaMask Tx Signature: User denied transaction signature.')) {
                setErrorMessage('Transaction cancelled.');
                setTimeout(() => { setErrorMessage(null) }, 5000);
            } else {
                setErrorMessage('Error occured. Please try again.');
                setTimeout(() => { setErrorMessage(null) }, 5000);
            }
        }
    }

    const withdraw = async (inputWithdrawAmount) => {
        const inputStakeTokenToWithdraw = ethers.utils.parseUnits(inputWithdrawAmount, stakingTokenDecimals);
        setWithdrawLoading(true);
        try {
            const withdrawTx = await stakingContract.withdraw(inputStakeTokenToWithdraw);
            await withdrawTx.wait();
            setWithdrawLoading(false);
        } catch (error) {
            console.error(error);
            if (error.message.includes('MetaMask Tx Signature: User denied transaction signature.')) {
                setErrorMessage('Transaction cancelled.');
                setTimeout(() => { setErrorMessage(null) }, 5000);
            } else {
                setErrorMessage('Error occured. Please try again.');
                setTimeout(() => { setErrorMessage(null) }, 5000);
            }
        }
    }

    return (
        <div>
            <Paper className={classes.poolContainer}>
                <a className={classes.poolLink} href={poolLink}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography className={classes.poolTitle} >{name}  {parseFloat(endBlock) < currentBlockNumber && '- Completed'}</Typography>
                    <Image
                        src={poolImage}
                        alt="Reward token logo"
                        width={'45px'}
                        height={'45px'}
                    />
                </Box>
                </a>

                <Typography>TVL: ${parseFloat(parseFloat(stakingPoolBalance) * xdittoPrice).toFixed(2)}</Typography>
                <hr style={{ borderTop: '1px solid black', backgroundColor: '#A03B79' }} />
                <Box display="flex" justifyContent="space-between">
                    <Typography>Pool APR:</Typography>
                    {!(account === undefined || account === null) ?
                        <Typography>{parseFloat(endBlock) > currentBlockNumber ? `${parseFloat(poolApr).toLocaleString()} %` : 'N/A'}</Typography> :
                        <Typography> - </Typography>
                    }
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography>Earn:</Typography>
                    {!(account === undefined || account === null) ?
                        <Typography>{rewardTokenName}</Typography>
                        :
                        <Typography> - </Typography>
                    }
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography>Staked:</Typography>
                    {!(account === undefined || account === null) ?
                        <Typography>{parseFloat(amountStaked).toFixed(4)}</Typography>
                        :
                        <Typography> - </Typography>
                    }
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography>{rewardTokenName} Earned:</Typography>
                    {!(account === undefined || account === null) ?
                        <Typography>{parseFloat(reward).toFixed(7)}</Typography>
                        :
                        <Typography> - </Typography>
                    }
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography>Remaining Reward Blocks:</Typography>
                    {!(account === undefined || account === null) ?
                        <Typography>{parseFloat(endBlock) > currentBlockNumber ? parseFloat(endBlock) - currentBlockNumber : 0}</Typography>
                        :
                        <Typography> - </Typography>
                    }
                </Box>
                <hr style={{ borderTop: '1px solid black' }} />
                {!(account === undefined || account === null) ?
                    <>
                        <Box display="flex" alignItems="center" justifyContent="space-evenly" paddingBottom={1}>
                            {parseFloat(amountStaked) > 0 &&
                                <Button
                                    className={classes.stakeButton}
                                    type="button"
                                    color="secondary"
                                    variant="contained"
                                    onClick={handleOpenStakeModal}
                                    disabled={parseFloat(endBlock) < currentBlockNumber}
                                >
                                    +
                                </Button>
                            }
                            {parseFloat(amountStaked) > 0 &&
                                <Button className={classes.stakeButton} type="button" color="secondary" variant="contained" onClick={handleOpenWithdrawModal}>
                                    -
                                </Button>
                            }
                        </Box>
                    </>
                    :
                    null
                }
                {!(account === undefined || account === null) ?
                    <>
                        {(parseFloat(stakingAllowance)) <= 0 ?
                            <Box display="flex" justifyContent="space-evenly" mt={2}>
                                {
                                    approvalLoading ?
                                        <Button type="button" color="theme.palette.primary.main" variant="contained">
                                            <CircularProgress color="textPrimary" size={20} />
                                        </Button> :
                                        <Button
                                            type="button"
                                            color="secondary"
                                            variant="contained"
                                            disabled={parseFloat(endBlock) < currentBlockNumber}
                                            onClick={async () => {
                                                setApprovalLoading(true);
                                                await approveStake();
                                                setApprovalLoading(false);
                                                window.location.reload();
                                            }}>
                                            Unlock Staking
                                        </Button>
                                }
                        </Box>
                            :
                            parseFloat(amountStaked) <= 0 ?
                                <Box display="flex" justifyContent="space-evenly" mt={2}>
                                    <Button
                                        type="button"
                                        className={classes.poolActionButton}
                                        color="secondary"
                                        variant="contained"
                                        disabled={parseFloat(endBlock) < currentBlockNumber}
                                        onClick={handleOpenStakeModal}>
                                        Stake
                                    </Button>
                            </Box>
                                :
                                <Box display="flex" justifyContent="space-evenly">
                                    {
                                        harvestLoading ?
                                            <Button type="button" color="secondary" variant="contained" className={classes.poolActionButton}>
                                                <CircularProgress color="textPrimary" size={20} />
                                            </Button> :
                                            <Button
                                                type="button"
                                                className={classes.poolActionButton}
                                                color="secondary"
                                                variant="contained"
                                                disabled={parseFloat(endBlock) < currentBlockNumber}
                                                onClick={async () => {
                                                    setHarvestLoading(true);
                                                    await stake('0');
                                                    setHarvestLoading(false);
                                                    window.location.reload();
                                                }}>
                                                Harvest
                                            </Button>
                                    }
                                    {
                                        compounding &&
                                        <>
                                            {
                                                compoundLoading ?
                                                    <Button className={classes.poolActionButton} type="button" color="secondary" variant="contained">
                                                        <CircularProgress color="textPrimary" size={20} />
                                                    </Button> :
                                                    <Button
                                                        type="button"
                                                        color="secondary"
                                                        variant="contained"
                                                        className={classes.poolActionButton}
                                                        disabled={parseFloat(endBlock) < currentBlockNumber}
                                                        onClick={async () => {
                                                            setCompoundLoading(true);
                                                            await stake(`${parseFloat(reward)}`);
                                                            setCompoundLoading(false);
                                                            window.location.reload();
                                                        }}>
                                                        Compound
                                                    </Button>
                                            }
                                    </>
                                    }
                                </Box>
                        }
                        {errorMessage && <Typography className={classes.errorMessage}>{errorMessage}</Typography>}
                    </>
                     :
                    <Box className={classes.connectToContinuePrompt}>
                        <Button type="button" >
                            Connect wallet to Bsc Mainnet to continue
                        </Button>
                    </Box>
                }
            </Paper>
            <StakingModal
                openStakeModal={openStakeModal}
                setOpenStakeModal={setOpenStakeModal}
                stakingTokenName={stakingTokenName}
                stakingTokenBalance={stakingTokenBalance}
                stakeInput={stakeInput}
                setStakeInput={setStakeInput}
                stake={stake}
                errorMessage={errorMessage}
                stakingLoading={stakingLoading}
                setStakingLoading={setStakingLoading}
            />

            <WithdrawingModal
                openWithdrawModal={openWithdrawModal}
                setOpenWithdrawModal={setOpenWithdrawModal}
                stakingTokenName={stakingTokenName}
                amountStaked={amountStaked}
                withdrawInput={withdrawInput}
                setWithdrawInput={setWithdrawInput}
                withdraw={withdraw}
                errorMessage={errorMessage}
                withdrawLoading={withdrawLoading}
                setWithdrawLoading={setWithdrawLoading}
            />
        </div>
    );
}

