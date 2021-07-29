
import LINKS from 'utils/constants/links'
import MenuEarnIcon from 'components/Icons/MenuEarnIcon'
import MenuDashboardIcon from 'components/Icons/MenuDashboardIcon'
import MenuGovernanceIcon from 'components/Icons/MenuGovernanceIcon'
import MenuXDittoIcon from 'components/Icons/MenuXDittoIcon'
import MenuVampireIcon from 'components/Icons/MenuVampireIcon'
import MenuBuyIcon from 'components/Icons/MenuBuyIcon'
import MenuMoreIcon from 'components/Icons/MenuMoreIcon'

const SIDEBAR_MENU = [
  {
    ICON: MenuEarnIcon,
    TITLE: 'Earn',
    CHILDREN: [
      LINKS.ARENA,
      LINKS.VAULTS
    ]
  },
  {
    ICON: MenuDashboardIcon,
    TITLE: 'Dashboard',
    CHILDREN: [
      LINKS.CHARTS,
      LINKS.REBASE_HISTORY
    ]
  },
  {
    ICON: MenuGovernanceIcon,
    TITLE: 'Governance',
    CHILDREN: [
      LINKS.VOTING,
      LINKS.MULTI_SIG
    ]
  },
  {
    ICON: MenuXDittoIcon,
    ...LINKS.X_DITTO
  },
  {
    ICON: MenuVampireIcon,
    ...LINKS.VAMPIRE_SWAP
  },
  {
    ICON: MenuBuyIcon,
    ...LINKS.BUY_DITTO
  },
  {
    ICON: MenuBuyIcon,
    ...LINKS.BUY_X_DITTO
  },
  {
    ICON: MenuMoreIcon,
    TITLE: 'More',
    CHILDREN: [
      LINKS.CLASSIC_STAKING,
      LINKS.GITHUB,
      LINKS.BLOG,
      LINKS.FAQ,
    ]
  }
]

export default SIDEBAR_MENU