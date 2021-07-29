import { memo, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'

import { injected } from 'libs/web3-connectors'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import useEagerConnect from 'utils/hooks/useEagerConnect'
import useInactiveListener from 'utils/hooks/useInactiveListener'

const ConnectWallet = ({
  className
}) => {
  const [activatingConnector, setActivatingConnector] = useState();

  const {
    connector,
    activate,
    deactivate,
    active,
    error
  } = useWeb3React();

  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || !!activatingConnector);

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const walletHandler = () => {
    if ((active || error)) {
      deactivate();
      return
    }
    setActivatingConnector(injected);
    activate(injected);
  }

  return (
    <ContainedButton
      className={className}
      onClick={walletHandler}
    >
      {(active || error) ? 'Disconnect Wallet' : 'Connect Wallet'}
    </ContainedButton>
  );
};

export default memo(ConnectWallet);
