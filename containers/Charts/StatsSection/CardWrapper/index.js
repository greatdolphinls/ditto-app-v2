
import { memo } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.background.secondary
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(1.5, 3.5),
    height: 120,
  },
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
  context: {
    fontWeight: 700,
    fontSize: 25,
    [theme.breakpoints.down('xs')]: {
      fontSize: 18,
    },
  },
}));

const CardWrapper = ({
  title = '',
  context = '',
  children
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography className={classes.title} >
          {title}
        </Typography>
        {context &&
          <Typography
            color='textPrimary'
            align='right'
            className={classes.context}
          >
            {context}
          </Typography>
        }
        {children}
      </CardContent>
    </Card>
  )
}

export default memo(CardWrapper);