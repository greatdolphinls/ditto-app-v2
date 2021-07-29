
import { memo, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  TableCell,
  TableRow,
  Link
} from '@material-ui/core'
import { Alert, Pagination } from '@material-ui/lab'

import { BSC_SCAN_URL } from 'config'
import * as rebaseAPI from 'services/api-rebase'
import PageTitle from 'parts/PageTitle'
import TableContainer from 'parts/Table/TableContainer'
import { getLocaleDate } from 'utils/helpers/time'
import { toFixed } from 'utils/helpers/bigNumber'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  alert: {
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
  },
  tableContainer: {
    overflowX: 'overlay'
  }
}));

const ROWS_PER_PAGE = 10;
const columns = [
  { id: 'date', label: 'Date', minWidth: 120 },
  { id: 'adjustment', label: 'Supply Adjustment %', minWidth: 140 },
  { id: 'before', label: 'Supply Before Rebase', minWidth: 140 },
  { id: 'after', label: 'Supply After Rebase', minWidth: 140 },
  { id: 'block', label: 'Block', align: 'right', minWidth: 90 },
];

const RebaseHistory = () => {
  const classes = useStyles();

  const [rebases, setRebases] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(0)

  useEffect(() => {
    const load = async () => {
      try {
        const params = {
          page,
          count: ROWS_PER_PAGE
        }
        const { rebases = {}, totalRebases = 0 } = await rebaseAPI.getRebase(params);

        setTotalCount(totalRebases)
        setRebases(rebases)
      } catch (error) {
        console.log(error)
      }
    }
    load()
  }, [page])

  return (
    <main className={classes.root}>
      <Alert severity='info' className={classes.alert}>
        This data is obtained from a Binance Smart Chain archive node that
        may be out-of-sync at times. You can also check the supply chart on
        the dashboard page.
      </Alert>
      <PageTitle title='Rebase History' />
      <Box mb={3} className={classes.tableContainer}>
        <TableContainer columns={columns}>
          {rebases.map((rebase) => (
            <TableRow key={rebase.blockNumber}>
              <TableCell component='th' scope='row'>
                {getLocaleDate(rebase.timestamp)}
              </TableCell>
              <TableCell>
                {toFixed(rebase.supplyAdjustmentPercent, 1, 2)}%
              </TableCell>
              <TableCell>
                {toFixed(rebase.supplyBeforeRebase, 1, 2)}
              </TableCell>
              <TableCell>
                {toFixed(rebase.supplyAfterRebase, 1, 2)}
              </TableCell>
              <TableCell align='right'>
                <Link
                  href={`${BSC_SCAN_URL}${rebase.blockNumber}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={classes.small}
                >
                  {rebase.blockNumber}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableContainer>
      </Box>

      <Pagination
        variant='outlined'
        shape='rounded'
        page={page + 1}
        count={Math.ceil(totalCount / ROWS_PER_PAGE)}
        onChange={(event, page) => setPage(page - 1)}
      />
    </main>
  )
}

export default memo(RebaseHistory)