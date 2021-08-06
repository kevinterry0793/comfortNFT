import React, { useCallback, useMemo } from 'react'

import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import numeral from 'numeral'
import {
  Box,
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
  Separator,
  Spacer
} from 'react-neu'

import FancyValue from 'components/FancyValue'
import Split from 'components/Split'

import useBalances from 'hooks/useBalances'
import { bnToDec } from 'utils'
import useStaking from 'hooks/useStaking'
import useStrainNfts from 'hooks/useStrainNfts'

const WalletModal: React.FC<ModalProps> = ({
  isOpen,
  onDismiss,
}) => {

  const { reset } = useWallet()
  const {
    strnEthLpBalance,
    strnTokenBalance,
    strnXiotLpBalance,
    stxpTokenBalance,
  } = useBalances()

  const {
    totalStaked,
    earnedStxpPoolBalance
  } = useStaking()

  const {
    earnedStrnBalance,
    strnEthLpPoolBalance,
    strnXiotLpPoolBalance,
  } = useStrainNfts()

  const getDisplayBalance = useCallback((value?: BigNumber) => {
    if (value) {
      return numeral(value).format('0.00a')
    } else {
      return '--'
    }
  }, [])

  const formattedStrnLPBalance = useMemo(() => {
    if (strnEthLpBalance) {
      return numeral(strnEthLpBalance).format('0.00a')
    } else {
      return '--'
    }
  }, [strnXiotLpBalance])

  const formattedStrnEthPoolBalance = useMemo(() => {
    if (strnEthLpPoolBalance) {
      return numeral(strnEthLpPoolBalance).format('0.00a')
    } else {
      return '--'
    }
  }, [strnEthLpPoolBalance])

  const formattedStxpPoolBalance = useMemo(() => {
    if (earnedStxpPoolBalance) {
      return numeral(bnToDec(earnedStxpPoolBalance)).format('0.00a')
    } else {
      return '--'
    }
  }, [earnedStxpPoolBalance])

  const formattedTotalStakedStrnBalance = useMemo(() => {
    if (totalStaked) {
      return numeral(bnToDec(totalStaked)).format('0.00a')
    } else {
      return '--'
    }
  }, [totalStaked])


  const formattedStrnXiotLPBalance = useMemo(() => {
    if (strnXiotLpBalance) {
      return strnXiotLpBalance.toFixed(8)
    } else {
      return '--'
    }
  }, [strnXiotLpBalance])

  const formattedStrnXiotPoolBalance = useMemo(() => {
    if (strnXiotLpPoolBalance) {
      return strnXiotLpPoolBalance.toFixed(8)
    } else {
      return '--'
    }
  }, [strnXiotLpPoolBalance])

  const formattedEarnedBalance = useMemo(() => {
    if (earnedStrnBalance) {
      const total = earnedStrnBalance
      return numeral(bnToDec(total)).format('0.00a')
    } else {
      return '--'
    }
  }, [earnedStrnBalance])

  const handleSignOut = useCallback(() => {
    reset()
  }, [reset])

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="My Wallet" />
      <ModalContent>
        <Split>
          <Box column>
            <FancyValue
              icon="🧬"
              label="COFM balance"
              value={getDisplayBalance(strnTokenBalance)}
            />
            <Spacer />
            <FancyValue
              icon="🍯"
              label="COFMP balance"
              value={getDisplayBalance(stxpTokenBalance)}
            />
          </Box>
          <Box column>
            <FancyValue
              icon={<span role="img" style={{ opacity: 0.5 }} >LP</span>}
              label="COMF/ETH balance"
              value={formattedStrnLPBalance}
            />
            <Spacer />
            <FancyValue
              icon={<span role="img" style={{ opacity: 0.5 }} >LP</span>}
              label="COMFP/XIOT balance"
              value={formattedStrnXiotLPBalance}
            />
          </Box>
        </Split>
        <Spacer />
        <Separator />
        <Spacer />
        <Split>
          <Box column>
            <FancyValue
              icon="🧬"
              label="Claimable COMF"
              value={formattedEarnedBalance}
            />
          </Box>
          <Box column>
            <FancyValue
              icon={<span role="img" style={{ opacity: 0.5 }} >LP</span>}
              label="NFT'd COMF/ETH Tokens"
              value={formattedStrnEthPoolBalance}
            />
            <Spacer />
            <FancyValue
              icon={<span role="img" style={{ opacity: 0.5 }} >LP</span>}
              label="NFT'd COMF/XIOT Tokens"
              value={formattedStrnXiotPoolBalance}
            />
          </Box>
        </Split>
        <Spacer />
        <Separator />
        <Spacer />
        <Split>
          <Box column>
            <FancyValue
              icon="🍯"
              label="Claimable STXP"
              value={formattedStxpPoolBalance}
            />
          </Box>
          <Box column>
            <FancyValue
              icon="🧬"
              label="Staked COMF Tokens"
              value={formattedTotalStakedStrnBalance}
            />
          </Box>
        </Split>
      </ModalContent>
      <Separator />
      <ModalActions>
        <Button
          onClick={onDismiss}
          text="Cancel"
          variant="secondary"
        />
        <Button
          onClick={handleSignOut}
          text="SignOut"
        />
      </ModalActions>
    </Modal>
  )
}

export default WalletModal