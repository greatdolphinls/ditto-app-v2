import { memo } from 'react'

const TabPanel = ({
  children,
  value,
  index,
  ...rest
}) => {

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...rest}
    >
      {value === index && children}
    </div>
  );
}

export default memo(TabPanel)