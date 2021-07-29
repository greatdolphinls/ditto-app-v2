import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  Typography
} from '@material-ui/core'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts'

import { useStats } from 'contexts/stats-context'
import DittoLoading from 'components/DittoLoading'
import ChartsController from './ChartsController'
import ChartsTooltip from './ChartsTooltip'
import { toFixed } from 'utils/helpers/bigNumber'
import { isEmpty } from 'utils/helpers/utility'

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'relative',
    backgroundColor: theme.palette.background.secondary,
    minHeight: 400,
  },
  content: {
    padding: theme.spacing(1.5, 3.5),
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
  controller: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2)
  },
  chartContainer: {
    height: 400
  },
  arrow: {
    color: theme.custom.palette.pink,
  },
  tooltip: {
    borderRadius: 12,
    backgroundColor: theme.custom.palette.pink,
  },
}))

const DittoChart = ({
  title,
  data,
  yAxisLabelFormatter = (x) => x
}) => {
  const classes = useStyles()
  const { activeType } = useStats()

  const yAxisTickFormatter = (val) => {
    return !Number.isFinite(Math.abs(val))
      ? '-'
      : activeType === '%'
        ? toFixed(val, 1, 2) + '%'
        : yAxisLabelFormatter(toFixed(val, 1, 2))
  }

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography className={classes.title}>
          {title}
        </Typography>

        <div className={classes.controller}>
          <ChartsController />
        </div>

        {isEmpty(data)
          ? (
            <DittoLoading loading={true} />
          ) : (
            <div className={classes.chartContainer}>
              <ResponsiveContainer>
                <AreaChart
                  data={data.xy}
                  margin={{
                    top: 50,
                    right: 50,
                    left: 50,
                    bottom: 50,
                  }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='x' />
                  <YAxis tickFormatter={yAxisTickFormatter} domain={['dataMin', 'dataMax']} />
                  <Tooltip
                    arrow
                    classes={{
                      arrow: classes.arrow,
                      tooltip: classes.tooltip
                    }}
                    content={<ChartsTooltip {...{ yAxisTickFormatter }} />}
                  />
                  <Area type='monotone' stackOffset='expand' dataKey='y' stroke='#ED7AC0' fill='#ED7AC0' />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )
        }
      </CardContent>
    </Card>
  )
}

export default memo(DittoChart);