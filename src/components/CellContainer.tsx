import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring'
import { columnWidth, chipSize, cellStartAnimationDuration } from '../consts'
import { Pos } from '../types'

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
const CellOutline = styled(animated.div)`
  border: ${border};
  width: ${chipSize - 4}px;
  height: ${chipSize - 4}px;
  border-radius: 100%;
`

type Props = {
  pos: Pos
  hideOutline: boolean
}

export const CellContainer: React.FC<Props> = ({
  pos,
  hideOutline: _hideOutline,
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
      <CellOutline style={outlineProps} />
    </Root>
  )
}

export default CellContainer
