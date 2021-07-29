import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import { X_DITTO_FORM_ICON_IMAGE_PATH } from 'utils/constants/image-paths'

import {
    useWeb3React,
} from "@web3-react/core";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: -50,
        padding: theme.spacing(1, 3),
        margin: theme.spacing(1, 0),
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 40,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        alignSelf: 'center',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#E5D0DD',
        borderRadius: '12px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '33%',
        display: 'flex',
        flexDirection: 'column'
    },
    modalTitle: {
        color: 'white',
        fontSize: '25px',
        textShadow: '2px 2px grey',
        fontWeight: 'bold'
    },
    textField: {
        width: '100%',
    },
    formIcon: {
        width: 180,
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginTop: 40
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
    modalActionButton: {
        fontSize: 14,
        fontWeight: 'bold',
        borderRadius: 30,
        '&:hover': {
            color: theme.palette.primary.main
        }
    },

}));


export default function StakingModal({ openStakeModal, setOpenStakeModal, stakingTokenName, stakingTokenBalance, stakeInput, setStakeInput, stake, errorMessage, stakingLoading, setStakingLoading }) {
    const context = useWeb3React();
    const {
        account,
    } = context;

    const classes = useStyles();

    const handleCloseStakeModal = () => {
        setOpenStakeModal(false);
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openStakeModal}
                onClose={handleCloseStakeModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openStakeModal}>
                    <form noValidate autoComplete="off" className={classes.paper}>
                        <Typography className={classes.modalTitle} >Deposit {stakingTokenName} Tokens</Typography>
                        <div className={classes.iconContainer}>
                            <img
                                alt='xditto-form'
                                src={X_DITTO_FORM_ICON_IMAGE_PATH}
                                className={classes.formIcon}
                            />
                        </div>
                        <div className={classes.root}>
                            <TextField
                                id="mint-amount-input"
                                className={classes.inputField}
                                label={`Amount of ${stakingTokenName} to stake`}
                                color="primary"
                                type="number"
                                disabled={
                                    (account === undefined || account === null || parseFloat(stakingTokenBalance) === 0)
                                }
                                value={stakeInput}
                                onChange={(e) => {
                                    setStakeInput(e.target.value);
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                    classes: {
                                        shrink: classes.label
                                    }
                                }}
                                inputProps={{
                                    min: 0,
                                }}
                                InputProps={{
                                    classes: {
                                        root: classes.input,
                                    },
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <Button
                                                disabled={
                                                    (account === undefined || account === null || parseFloat(stakingTokenBalance) === 0)
                                                }   
                                                onClick={() => {
                                                    setStakeInput(stakingTokenBalance);
                                                }}
                                                className={classes.maxButton}
                                            >
                                                Max
                                            </Button>
                                            <Typography>{stakingTokenName}</Typography>
                                        </InputAdornment>,
                                }} />
                        </div>

                        <Box display="flex" justifyContent="space-evenly" mt={5}>
                            <Button type="button"
                                className={classes.modalActionButton}
                                color="secondary"
                                variant="contained"
                                size="large"
                                onClick={() => handleCloseStakeModal()}
                            >
                                Cancel
                            </Button>
                            {stakingLoading ?
                                <Button type="button" color="secondary" variant="contained">
                                    <CircularProgress color="textPrimary" size={20} />
                                </Button> :
                                <Button
                                    type="button"
                                    variant="contained"
                                    className={classes.modalActionButton}
                                    color="secondary"
                                    disabled={parseFloat(stakeInput) <= 0 || stakeInput === undefined || stakeInput === ''}
                                    size="large"
                                    onClick={async () => {
                                        setStakingLoading(true);
                                        await stake(stakeInput);
                                        setStakingLoading(false);
                                        window.location.reload();
                                    }}>Confirm</Button>
                            }
                        </Box>
                        {errorMessage && <Typography className={classes.errorMessage}>{errorMessage}</Typography>}
                    </form>
                </Fade>
            </Modal>
        </div >
    );
}