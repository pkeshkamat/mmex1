import {
  TransactionMeta,
  TransactionType,
} from '@metamask/transaction-controller';
import React from 'react';
import {
  AvatarNetwork,
  AvatarNetworkSize,
  Box,
  Text,
} from '../../../../../components/component-library';
import Identicon from '../../../../../components/ui/identicon';
import {
  AlignItems,
  Display,
  JustifyContent,
  TextColor,
  TextVariant,
} from '../../../../../helpers/constants/design-system';
import { getAvatarNetworkColor } from '../../../../../helpers/utils/accounts';
import { useConfirmContext } from '../../../context/confirm';
import useConfirmationNetworkInfo from '../../../hooks/useConfirmationNetworkInfo';
import useConfirmationRecipientInfo from '../../../hooks/useConfirmationRecipientInfo';
import { Confirmation } from '../../../types/confirm';
import { DAppInitiatedHeader } from './dapp-initiated-header';
import HeaderInfo from './header-info';
import { WalletInitiatedHeader } from './wallet-initiated-header';

const Header = () => {
  const { networkImageUrl, networkDisplayName } = useConfirmationNetworkInfo();
  const { senderAddress: fromAddress, senderName: fromName } =
    useConfirmationRecipientInfo();

  const { currentConfirmation } = useConfirmContext<Confirmation>();

  if (currentConfirmation?.type === TransactionType.tokenMethodTransfer) {
    const isWalletInitiated =
      (currentConfirmation as TransactionMeta).origin === 'metamask';

    if (isWalletInitiated) {
      return <WalletInitiatedHeader />;
    }
    return <DAppInitiatedHeader />;
  }

  return (
    <Box
      display={Display.Flex}
      className="confirm_header__wrapper"
      alignItems={AlignItems.center}
      justifyContent={JustifyContent.spaceBetween}
      data-testid="confirm-header"
    >
      <Box alignItems={AlignItems.flexStart} display={Display.Flex} padding={4}>
        <Box display={Display.Flex} marginTop={2}>
          <Identicon address={fromAddress} diameter={32} />
          <AvatarNetwork
            src={networkImageUrl}
            name={networkDisplayName}
            size={AvatarNetworkSize.Xs}
            backgroundColor={getAvatarNetworkColor(networkDisplayName)}
            className="confirm_header__avatar-network"
          />
        </Box>
        <Box marginInlineStart={4}>
          <Text
            color={TextColor.textDefault}
            variant={TextVariant.bodyMdMedium}
            data-testid="header-account-name"
          >
            {fromName}
          </Text>
          <Text
            color={TextColor.textAlternative}
            data-testid="header-network-display-name"
          >
            {networkDisplayName}
          </Text>
        </Box>
      </Box>
      <Box alignItems={AlignItems.flexEnd} display={Display.Flex} padding={4}>
        <HeaderInfo />
      </Box>
    </Box>
  );
};

export default Header;
