
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

const MenuBuyIcon = ({
  className,
  viewBox,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <SvgIcon viewBox={viewBox || '0 0 19 21'} {...rest} className={clsx(classes.root, className)}>
      <path d="M5.80982 13.8538C6.51542 13.6884 7.05054 13.1653 7.26703 12.5206H14.9466C15.864 12.5206 16.6829 11.9051 16.9381 11.0239L18.7796 4.66375C18.9208 4.1762 18.8268 3.66382 18.5219 3.25806C18.2169 2.85227 17.7509 2.61956 17.2433 2.61956H12.776C12.5657 2.61956 12.3952 2.79009 12.3952 3.00037C12.3952 3.21065 12.5657 3.38118 12.776 3.38118H17.2433C17.5092 3.38118 17.7533 3.50308 17.913 3.71564C18.0727 3.92817 18.122 4.19657 18.048 4.45194L16.2065 10.8121C16.0451 11.3696 15.527 11.759 14.9466 11.759H7.36825C7.36193 11.6538 7.34749 11.5478 7.32392 11.4419L5.52753 3.38118H9.34949C9.55981 3.38118 9.7303 3.21065 9.7303 3.00037C9.7303 2.79009 9.55981 2.61956 9.34949 2.61956H5.3578L5.30353 2.37611C5.09561 1.4432 4.28289 0.791672 3.32713 0.791672H0.703808C0.493487 0.791672 0.322998 0.962198 0.322998 1.17248V2.84804C0.322998 3.05833 0.493487 3.22885 0.703808 3.22885H2.99666L4.8629 11.6032C3.82039 12.016 3.11974 13.0255 3.11974 14.173C3.11974 15.6976 4.36012 16.938 5.88473 16.938H6.9077C6.46641 17.2808 6.18168 17.816 6.18168 18.4168C6.18168 19.4491 7.0216 20.2891 8.05401 20.2891C9.08642 20.2891 9.9263 19.4491 9.9263 18.4168C9.9263 17.816 9.64157 17.2808 9.20028 16.938H13.3992C12.958 17.2808 12.6732 17.816 12.6732 18.4168C12.6732 19.4491 13.5131 20.2891 14.5456 20.2891C15.5779 20.2891 16.4179 19.4491 16.4179 18.4168C16.4179 17.816 16.1332 17.2808 15.6919 16.938H17.688C17.8983 16.938 18.0688 16.7674 18.0688 16.5572V14.8816C18.0688 14.6713 17.8983 14.5008 17.688 14.5008H5.88476C5.70399 14.5008 5.55696 14.3538 5.55696 14.173C5.55689 14.02 5.66089 13.8888 5.80982 13.8538ZM8.05401 19.5275C7.44155 19.5275 6.9433 19.0293 6.9433 18.4168C6.9433 17.8044 7.44155 17.3061 8.05401 17.3061C8.66647 17.3061 9.16472 17.8044 9.16472 18.4168C9.16468 19.0293 8.66643 19.5275 8.05401 19.5275ZM14.5456 19.5275C13.9331 19.5275 13.4349 19.0293 13.4349 18.4168C13.4349 17.8044 13.9331 17.3061 14.5456 17.3061C15.158 17.3061 15.6563 17.8044 15.6563 18.4168C15.6562 19.0293 15.158 19.5275 14.5456 19.5275ZM4.79527 14.173C4.79527 14.7737 5.28396 15.2624 5.88469 15.2624H17.3071V16.1764H5.88469C4.78003 16.1764 3.88132 15.2777 3.88132 14.173C3.88132 13.2502 4.5065 12.4507 5.40167 12.2287C5.60239 12.1789 5.72669 11.9781 5.68172 11.7762L3.67363 2.76522C3.63483 2.59107 3.48033 2.46723 3.30196 2.46723H1.08462V1.55329H3.32713C3.9234 1.55329 4.43045 1.95981 4.56019 2.5418L6.58054 11.6075C6.73039 12.28 6.30663 12.955 5.63594 13.1123C5.14097 13.2284 4.79527 13.6646 4.79527 14.173Z" fill="white" />
      <path d="M11.0623 3.38117C11.1625 3.38117 11.2607 3.34043 11.3316 3.26956C11.4024 3.19876 11.4431 3.10052 11.4431 3.00036C11.4431 2.90021 11.4024 2.80196 11.3316 2.73113C11.2607 2.6603 11.1625 2.61955 11.0623 2.61955C10.9622 2.61955 10.8639 2.66026 10.7931 2.73113C10.7223 2.80196 10.6815 2.90021 10.6815 3.00036C10.6815 3.10052 10.7223 3.19876 10.7931 3.26956C10.8639 3.34043 10.9622 3.38117 11.0623 3.38117Z" fill="white" />
    </SvgIcon>
  )
}

export default memo(MenuBuyIcon);