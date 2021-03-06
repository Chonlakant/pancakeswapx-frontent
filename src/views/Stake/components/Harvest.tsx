import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import { useHarvest } from '../../../hooks/useHarvest'
import useI18n from '../../../hooks/useI18n'
import { getBalanceNumber } from '../../../utils/formatBalance'

interface HarvestProps {
  pid: number
  earnings: BigNumber
}

const Harvest: React.FC<HarvestProps> = ({ pid, earnings }) => {
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>🥞</CardIcon>
            <Value value={getBalanceNumber(earnings)} />
            <Label text={TranslateString(330, 'CAKE Earned')} />
          </StyledCardHeader>
          <StyledCardActions>
            <Button
              fullWidth
              disabled={!earnings.toNumber() || pendingTx}
              onClick={async () => {
                setPendingTx(true)
                await onReward()
                setPendingTx(false)
              }}
            >
              {pendingTx ? TranslateString(548, 'Collecting CAKE') : TranslateString(562, 'Harvest')}
            </Button>
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default Harvest
