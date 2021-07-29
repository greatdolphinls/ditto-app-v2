
import { memo } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import PageTitle from 'parts/PageTitle'
import StatsSection from './StatsSection'
import ChartsSection from './ChartsSection'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
    },
  },
}));

const Charts = () => {
  const classes = useStyles()

  return (
    <>
      <PageTitle title='Charts' />
      <Grid container spacing={4} className={classes.root}>
        <StatsSection />
        <ChartsSection />
      </Grid>
    </>
  )
}

export default memo(Charts)