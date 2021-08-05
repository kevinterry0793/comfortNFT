import BigNumber from 'bignumber.js'

export interface ContextValues {
  getPoolLPAddress: (poolId: string) => string,
  setConfirmTxModalIsOpen: (isOpen: boolean) => void,
  getEarnedBalances: (poolId: string) => BigNumber,
  isHarvesting?: boolean[],
  isRedeeming?: boolean[],
  isStaking?: boolean[],
  isUnstaking?: boolean[],
  onHarvest: (poolId: string) => void,
  onRedeem: (poolId: string) => void,
  onStake: (poolId: string, amount: string) => void,
  onUnstake: (poolId: string, amount: string) => void,
  getIncentivizerAddress: (poolId: string) => string,
}