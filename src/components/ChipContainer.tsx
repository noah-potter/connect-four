import React from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import Chip from '../data/Chip'
import { columnWidth, chipSize } from '../utils/consts'
import {
  PlayerColor,
  playerToChipColor,
  playerToChipBoxShadow,
} from '../utils/enums'

const Root = styled(animated.div)`
  position: absolute;
  height: ${columnWidth}px;
  width: ${columnWidth}px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Sprite = styled(animated.div)<{ player: PlayerColor }>`
  background: ${(props) => playerToChipColor[props.player]};
  height: ${chipSize}px;
  width: ${chipSize}px;
  border-radius: 100%;
`

// This takes the position the middle of the chip should be at and converts it to the origin position of the chip
const adjustForOffset = (position: number) => {
  return position - columnWidth / 2
}

// The calculates the position of the middle of the given column
const calculateLeftForColumn = (column: number) => {
  return column * columnWidth + columnWidth / 2
}

// The calculates the position of the middle of the given row
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
    // Chip is placed and will move to the correct position
    left = calculateLeftForColumn(chip.column)
    top = calculateTopForRow(chip.row)
  } else if (chip.isPlacing) {
    // Chip is in the top row waiting to be placed. It follows the column the player is hovering on
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

  // The horizontal position should be snapped to when the chip is placed so it doesn't
  // move through the columns in an unrealistic diagonal path. I'd use react-spring but it can't recalculate
  // the spring to ignore an attribute based on a dynamic flag like this. So I manually set it here
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
    <Root style={style}>
      <Sprite player={chip.player} />
    </Root>
  )
}

export default ChipContainer
