import React from 'react'
import styled from 'styled-components'
import Chip from '../data/Chip'
import { columnWidth, chipSize } from '../consts'
import { useSpring, animated } from 'react-spring'
import { PlayerEnum, playerToChipColor } from '../enums'

const Root = styled(animated.div)`
  position: absolute;
  height: ${columnWidth}px;
  width: ${columnWidth}px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Sprite = styled(animated.div)<{ player: PlayerEnum }>`
  background: ${(props) => playerToChipColor[props.player]};
  height: ${chipSize}px;
  width: ${chipSize}px;
  border-radius: 100%;
`

const adjustForOffset = (pos: number) => {
  return pos - columnWidth / 2
}

const calculateLeftForColumn = (column: number) => {
  return column * columnWidth + columnWidth / 2
}

const calculateTopForRow = (row: number) => {
  return row * columnWidth + columnWidth / 2
}

type Props = {
  chip: Chip
  targetColumn: number
}

export const ChipContainer: React.FC<Props> = ({ chip, targetColumn }) => {
  let top = 0
  let left = 0

  if (!chip.isPlacing && chip.column !== null && chip.row !== null) {
    left = calculateLeftForColumn(chip.column)
    top = calculateTopForRow(chip.row)
  } else if (chip.isPlacing) {
    left = calculateLeftForColumn(targetColumn)
    top = calculateTopForRow(-1)
  }

  left = adjustForOffset(left)
  top = adjustForOffset(top)

  const props = useSpring({
    top,
    left,
    opacity: 1,
    from: {
      left: adjustForOffset(calculateLeftForColumn(3)),
      top: adjustForOffset(calculateTopForRow(-1)),
      opacity: 0,
    },
  })

  let style = {}

  if (!chip.isPlacing) {
    style = {
      ...props,
      left,
    }
  } else {
    style = {
      ...props,
    }
  }

  return (
    //
    <Root style={style}>
      <Sprite player={chip.player} />
    </Root>
  )
}

export default ChipContainer
