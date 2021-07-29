
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

const MenuEarnIcon = ({
  className,
  viewBox,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <SvgIcon viewBox={viewBox || '0 0 19 23'} {...rest} className={clsx(classes.root, className)}>
      <path d="M16.6598 8.95741H8.31111C8.69717 8.51365 8.93174 7.93479 8.93174 7.30181C8.93174 5.90886 7.79851 4.77563 6.40556 4.77563C5.01261 4.77563 3.87939 5.90886 3.87939 7.30181C3.87939 7.93479 4.11396 8.51365 4.49997 8.95741H2.50706C1.30277 8.95741 0.322998 9.93718 0.322998 11.1415V13.7186C0.322998 13.9599 0.518559 14.1554 0.75981 14.1554C1.00106 14.1554 1.19662 13.9599 1.19662 13.7186V11.1415C1.19662 10.4189 1.78448 9.83104 2.50706 9.83104H14.7378C15.4604 9.83104 16.0482 10.4189 16.0482 11.1415V13.5003H11.5054C10.3011 13.5003 9.32133 14.48 9.32133 15.6843C9.32133 16.8886 10.3011 17.8684 11.5054 17.8684H16.0482V20.2272C16.0482 20.9497 15.4604 21.5376 14.7378 21.5376H2.50706C1.78448 21.5376 1.19662 20.9497 1.19662 20.2272V17.6466C1.19662 17.4053 1.00106 17.2098 0.75981 17.2098C0.518559 17.2098 0.322998 17.4053 0.322998 17.6466V20.2272C0.322998 21.4315 1.30277 22.4112 2.50706 22.4112H16.6598C17.8641 22.4112 18.8438 21.4315 18.8438 20.2272V11.1415C18.8438 9.93718 17.8641 8.95741 16.6598 8.95741ZM6.40556 5.6493C7.3168 5.6493 8.05811 6.39062 8.05811 7.30185C8.05811 8.21308 7.3168 8.9544 6.40556 8.9544C5.49437 8.9544 4.75302 8.21308 4.75302 7.30185C4.75302 6.39062 5.49433 5.6493 6.40556 5.6493ZM16.4839 9.83104H16.6598C17.3823 9.83104 17.9702 10.4189 17.9702 11.1415V13.5003H16.9219V11.1415C16.9219 10.6502 16.7587 10.1963 16.4839 9.83104ZM10.195 15.6843C10.195 14.9617 10.7828 14.3739 11.5054 14.3739H17.9702V16.9948H11.5054C10.7828 16.9948 10.195 16.4069 10.195 15.6843ZM16.6598 21.5376H16.4839C16.7587 21.1723 16.9219 20.7185 16.9219 20.2272V17.8684H17.9702V20.2272C17.9702 20.9497 17.3823 21.5376 16.6598 21.5376Z" fill="white" />
      <path d="M11.3935 15.2475C11.2782 15.2475 11.1655 15.2942 11.0842 15.3755C11.003 15.4567 10.9567 15.5694 10.9567 15.6843C10.9567 15.7992 11.003 15.9119 11.0842 15.9931C11.1659 16.0744 11.2782 16.1211 11.3935 16.1211C11.5084 16.1211 11.6206 16.0744 11.7023 15.9931C11.7836 15.9119 11.8303 15.7992 11.8303 15.6843C11.8303 15.5694 11.7836 15.4567 11.7023 15.3755C11.6211 15.2942 11.5084 15.2475 11.3935 15.2475Z" fill="white" />
      <path d="M12.7613 6.01316C14.1542 6.01316 15.2875 4.87994 15.2875 3.48699C15.2875 2.09408 14.1542 0.960815 12.7613 0.960815C11.3683 0.960815 10.2351 2.09404 10.2351 3.48699C10.2351 4.87994 11.3683 6.01316 12.7613 6.01316ZM12.7613 1.83448C13.6725 1.83448 14.4138 2.5758 14.4138 3.48703C14.4138 4.39826 13.6725 5.13958 12.7613 5.13958C11.85 5.13958 11.1087 4.39826 11.1087 3.48703C11.1087 2.5758 11.85 1.83448 12.7613 1.83448Z" fill="white" />
      <path d="M8.49492 4.30614C8.73617 4.30614 8.93173 4.11058 8.93173 3.86933V0.436812C8.93173 0.195561 8.73617 0 8.49492 0C8.25367 0 8.05811 0.195561 8.05811 0.436812V3.86933C8.05811 4.11058 8.25367 4.30614 8.49492 4.30614Z" fill="white" />
      <path d="M6.39812 2.7956C6.63937 2.7956 6.83493 2.60004 6.83493 2.35879V0.436812C6.83493 0.195561 6.63937 0 6.39812 0C6.15686 0 5.9613 0.195561 5.9613 0.436812V2.35879C5.9613 2.60004 6.15686 2.7956 6.39812 2.7956Z" fill="white" />
      <path d="M0.75981 16.1211C0.874692 16.1211 0.987389 16.0744 1.06864 15.9931C1.14988 15.9119 1.19662 15.7992 1.19662 15.6843C1.19662 15.5694 1.14988 15.4567 1.06864 15.3755C0.987389 15.2942 0.875129 15.2475 0.75981 15.2475C0.644929 15.2475 0.532231 15.2942 0.450984 15.3755C0.369737 15.4567 0.322998 15.5694 0.322998 15.6843C0.322998 15.7992 0.369737 15.9119 0.450984 15.9931C0.532231 16.0744 0.644885 16.1211 0.75981 16.1211Z" fill="white" />
    </SvgIcon>
  )
}

export default memo(MenuEarnIcon);