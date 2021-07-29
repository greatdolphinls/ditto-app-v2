
import { memo } from 'react'
import { Typography, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 1,
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    color: theme.custom.palette.white,
    [theme.breakpoints.down('xs')]: {
      fontSize: 23,
    },
  },
  border: {
    width: 120,
    height: 4,
    borderRadius: 4,
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1, 0)
  },
  divider: {
    height: 1,
    backgroundColor: theme.palette.text.primary,
    margin: theme.spacing(2, 0)
  },
}));

const VampireTitle = () => {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.title} >
        Vampire Swap
      </Typography>
      <div className={classes.border} />
      <Divider
        flexItem
        orientation='horizontal'
        className={classes.divider}
      />
    </>
  )
}

export default memo(VampireTitle);