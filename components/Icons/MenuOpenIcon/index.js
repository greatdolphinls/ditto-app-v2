
import { memo } from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles(() => ({
  root: {
    width: 24,
    height: 24
  }
}));

const MenuOpenIcon = ({
  className,
  viewBox,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <SvgIcon viewBox={viewBox || '0 0 25 23'} {...rest} className={clsx(classes.root, className)}>
      <path d="M2.69042 5.43026C4.17603 5.43026 5.38085 4.22034 5.38085 2.73984C5.38085 1.25934 4.17603 0.0443115 2.69042 0.0443115C1.20482 0.0443115 0 1.25424 0 2.73473C0 4.21523 1.20992 5.43026 2.69042 5.43026ZM2.69042 1.29508C3.48683 1.29508 4.13008 1.94343 4.13008 2.73473C4.13008 3.52604 3.48172 4.17439 2.69042 4.17439C1.89912 4.17439 1.25077 3.52604 1.25077 2.73473C1.25077 1.94343 1.89912 1.29508 2.69042 1.29508Z" fill="#ED7AC0" />
      <path d="M2.69042 13.7415C4.17603 13.7415 5.38085 12.5315 5.38085 11.051C5.38085 9.57055 4.17603 8.36063 2.69042 8.36063C1.20482 8.36063 0 9.56545 0 11.051C0 12.5367 1.20992 13.7415 2.69042 13.7415ZM2.69042 9.61139C3.48683 9.61139 4.13008 10.2597 4.13008 11.051C4.13008 11.8423 3.48172 12.4907 2.69042 12.4907C1.89912 12.4907 1.25077 11.8475 1.25077 11.051C1.25077 10.2546 1.89912 9.61139 2.69042 9.61139Z" fill="#ED7AC0" />
      <path d="M2.69042 22.0578C4.17603 22.0578 5.38085 20.8479 5.38085 19.3674C5.38085 17.8818 4.17092 16.6769 2.69042 16.6769C1.20992 16.6769 0 17.8869 0 19.3674C0 20.8479 1.20992 22.0578 2.69042 22.0578ZM2.69042 17.9226C3.48683 17.9226 4.13008 18.571 4.13008 19.3623C4.13008 20.1587 3.48172 20.8019 2.69042 20.8019C1.89912 20.8019 1.25077 20.1536 1.25077 19.3623C1.25077 18.571 1.89912 17.9226 2.69042 17.9226Z" fill="#ED7AC0" />
      <path d="M8.98005 3.36268H24.3721C24.7193 3.36268 25.0001 3.0819 25.0001 2.73475C25.0001 2.3876 24.7193 2.10681 24.3721 2.10681H8.98005C8.6329 2.10681 8.35211 2.3876 8.35211 2.73475C8.35211 3.0819 8.6329 3.36268 8.98005 3.36268Z" fill="#ED7AC0" />
      <path d="M8.98005 11.679H24.3721C24.7193 11.679 25.0001 11.3982 25.0001 11.0511C25.0001 10.7039 24.7193 10.4232 24.3721 10.4232H8.98005C8.6329 10.4232 8.35211 10.7039 8.35211 11.0511C8.35211 11.3982 8.6329 11.679 8.98005 11.679Z" fill="#ED7AC0" />
      <path d="M8.98005 19.9902H24.3721C24.7193 19.9902 25.0001 19.7094 25.0001 19.3623C25.0001 19.0151 24.7193 18.7343 24.3721 18.7343H8.98005C8.6329 18.7343 8.35211 19.0151 8.35211 19.3623C8.35211 19.7094 8.6329 19.9902 8.98005 19.9902Z" fill="#ED7AC0" />
    </SvgIcon>
  )
}

export default memo(MenuOpenIcon);