import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginBottom: theme.spacing(2),
      borderBottom: `2px solid ${theme.palette.danger.main}`
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      color: theme.palette.danger.main
    }
  };
});

const PageTitle = ({
  title,
  className
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Typography className={classes.title}>
        {title}
      </Typography>
    </div>
  );
}

export default memo(PageTitle)