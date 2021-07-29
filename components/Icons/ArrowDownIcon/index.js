import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  arrowIcon: {
    fontSize: 50,
    margin: theme.spacing(2, 0)
  }
}));

const ArrowDownIcon = ({
  className
}) => {
  const classes = useStyles();

  return (
    <ArrowDownwardIcon
      color='secondary'
      className={clsx(classes.arrowIcon, className)}
    />
  );
};

export default memo(ArrowDownIcon)