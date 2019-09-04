import React from 'react'
import styled from 'styled-components'
import Board from './Board'

const Root = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
`

const GameArea = styled.div`
  position: relative;
  display: flex;
`

type Props = {}

export const Game: React.FC<Props> = (props) => {
  return (
    <Root>
      <GameArea>
        <Board />
      </GameArea>
    </Root>
  )
}

export default Game
