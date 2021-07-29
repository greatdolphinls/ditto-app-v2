
import { makeStyles } from '@material-ui/core/styles'

const useCommonStyles = makeStyles(theme => ({
  containerWidth: {
    width: '100%',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export {
  useCommonStyles
};
