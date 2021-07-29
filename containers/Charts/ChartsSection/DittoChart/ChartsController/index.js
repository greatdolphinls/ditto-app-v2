import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import clsx from 'clsx'

import { TYPES_ARRAY, DURATIONS_ARRAY } from 'utils/constants/chart-info'
import { useStats } from 'contexts/stats-context'

const useStyles = makeStyles((theme) => {
  return {
    buttonsContainer: {
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    typesButtonsContainer: {
      marginLeft: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
        marginTop: 5,
      },
    },
    container: {
      display: 'flex',
      borderRadius: 35,
      background: theme.custom.palette.lightPink,
    },
    item: {
      fontSize: 13,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 80,
      height: 35,
      cursor: 'pointer',
      background: theme.custom.palette.lightPink,
      '&:first-child': {
        borderTopLeftRadius: 35,
        borderBottomLeftRadius: 35,
      },
      '&:last-child': {
        borderTopRightRadius: 35,
        borderBottomRightRadius: 35,
      },
    },
    activeItem: {
      color: theme.palette.background.default,
      background: theme.palette.text.secondary,
      borderRadius: 35
    },
  }
})

const ChartsController = () => {
  const classes = useStyles()
  const { activeDuration, activeType, setActiveDuration, setActiveType } = useStats()

  return (
    <div className={classes.buttonsContainer}>
      <div className={classes.container}>
        {DURATIONS_ARRAY.map(([duration, name]) => (
          <Typography
            key={duration}
            color='textPrimary'
            className={clsx(classes.item, { [classes.activeItem]: activeDuration === duration })}
            onClick={() => setActiveDuration(duration)}
          >
            {name}
          </Typography>
        ))}
      </div>
      <Box className={classes.typesButtonsContainer}>
        <div className={classes.container}>
          {TYPES_ARRAY.map(([type, name]) => (
            <Typography
              key={type}
              color='textPrimary'
              className={clsx(classes.item, { [classes.activeItem]: activeType === type })}
              onClick={() => setActiveType(type)}
            >
              {name}
            </Typography>
          ))}
        </div>
      </Box>
    </div>
  )
}

export default memo(ChartsController)
