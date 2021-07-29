import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import BlueDittoIcon from 'components/Icons/BlueDittoIcon'
import PinkDittoIcon from 'components/Icons/PinkDittoIcon'
import { StyledTab, StyledTabs } from '../Shared/StyledTabs'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3)
  }
}));

const XDittoTabs = ({
  selectedTab,
  setSelectedTab
}) => {
  const classes = useStyles();

  const tabHandler = (event, value) => {
    setSelectedTab(value);
  };

  return (
    <div className={classes.root}>
      <StyledTabs
        centered={true}
        value={selectedTab}
        onChange={tabHandler}
        aria-label='Navigation tabs'
      >
        <StyledTab label='Mint xDITTO' icon={<BlueDittoIcon />} />
        <StyledTab label='Redeem DITTO' icon={<PinkDittoIcon />} />
      </StyledTabs>
    </div>
  );
}

export default memo(XDittoTabs)