import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring'
import {
  columnWidth,
  chipSize,
  cellStartAnimationDuration,
} from '../utils/consts'
import { Position } from '../utils/types'
import { PlayerColor } from '../utils/enums'

const backgroundColor = `white`
const border = '2px solid #d1d1d1'

// The board is specifically styled to hide the cell as it falls through the board
// similar to a read connect four board
const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${columnWidth}px;
  width: ${columnWidth}px;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 0) 0px,
    rgba(0, 0, 0, 0) 32px,
    ${backgroundColor} 33px,
    ${backgroundColor} 100%
  );
`

interface CellOutlineProps {
  showAfterImage: boolean
  afterImagePlayer: PlayerColor
}

const CellOutline = styled(animated.div)<CellOutlineProps>`
  border: ${border};
  width: ${chipSize - 4}px;
  height: ${chipSize - 4}px;
  border-radius: 100%;
  transition: 300ms background-color;
  background-color: ${({ showAfterImage, afterImagePlayer }) => {
    if (showAfterImage) {
      if (afterImagePlayer === PlayerColor.Red) {
        return '#ff4a2073'
      } else {
        return '#3d5aff52'
      }
    }
  }};
`

type Props = {
  position: Position
  hideOutline: boolean
  showAfterImage: boolean
  afterImagePlayer: PlayerColor
}

export const CellContainer: React.FC<Props> = ({
  position,
  hideOutline,
  showAfterImage,
  afterImagePlayer,
}) => {
  // Calculate row and column from bottom left for animation purpose
  const column = position.column
  const row = 5 - position.row
  const index = row * 7 + column
  const total = 7 * 6

  // The cells fade into view in order from bottom left to top right
  // The cells also remove the outline if a piece is placed, it just looks better to me that way
  const outlineProps = useSpring({
    opacity: hideOutline ? 0 : 1 - Math.min(1, index / total - 0.5),
    transform: 'translateY(0px)',
    from: {
      opacity: 0,
      transform: 'translateY(-20px)',
    },
    delay: index * cellStartAnimationDuration,
  })

  return (
    <Root>
      <CellOutline
        style={outlineProps}
        showAfterImage={showAfterImage}
        afterImagePlayer={afterImagePlayer}
      />
    </Root>
  )
}

export default CellContainer
