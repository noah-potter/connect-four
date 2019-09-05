import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring'
import { columnWidth, chipSize, cellStartAnimationDuration } from '../consts'
import { Pos } from '../types'
import { PlayerColor } from '../enums'

const backgroundColor = `white`
const border = '2px solid #d1d1d1'

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
  pos: Pos
  hideOutline: boolean
  showAfterImage: boolean
  afterImagePlayer: PlayerColor
}

export const CellContainer: React.FC<Props> = ({
  pos,
  hideOutline: _hideOutline,
  showAfterImage,
  afterImagePlayer,
}) => {
  const [hideOutline, setHideOutline] = useState(false)

  useEffect(() => {
    setHideOutline(_hideOutline)
  }, [_hideOutline])

  // Calculate row and col from bottom left for animation purpose
  const col = pos.col
  const row = 5 - pos.row
  const index = row * 7 + col
  const total = 7 * 6

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
    //
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
