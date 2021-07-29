
import { memo } from 'react'
import { Typography } from '@material-ui/core'

import DittoDialog from 'components/DittoDialog'

const DittoConfirmDialog = ({
  text = 'Are you sure to proceed this operation?',
  ...rest
}) => {
  return (
    <DittoDialog {...rest}>
      <Typography color='primary' variant='h5' align='center'>
        {text}
      </Typography>
    </DittoDialog>
  );
}

export default memo(DittoConfirmDialog)