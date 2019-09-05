import React, { useState } from 'react'
import styled from 'styled-components'
import Board from './Board'
import { animated, useSpring } from 'react-spring'
import { Page, PlayerColor } from '../utils/enums'

const PageContainer = styled(animated.div)`
  display: flex;
  flex-direction: column;
`

const PlayerSelection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.div`
  font-size: 72px;
  font-weight: 600;
  margin-bottom: 70px;
  background: linear-gradient(
    48deg,
    rgba(255, 16, 16, 1) 0%,
    rgba(59, 1, 255, 1) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Buttons = styled.div`
  display: flex;
  margin-top: 20px;
`

const ColorButton = styled.button`
  background: transparent;
  border: 1px solid #bebebe;
  border-radius: 4px;
  cursor: pointer;
  padding: 12px 24px;
  transition: 200ms background-color;
  :hover {
    background-color: #efefef;
  }
  :not(:first-child) {
    margin-left: 12px;
  }
`

type Props = {}

// Rudimentary switch-based pathing
export const Routes: React.FC<Props> = (props) => {
  const [page, setPage] = useState(Page.PlayerSelection)
  const [firstPlayerColor, setFirstPlayerColor] = useState<PlayerColor | null>(
    null
  )

  // Fade in the title screen
  const playerSelectionProps = useSpring({
    to: {
      opacity: 1,
    },
    from: {
      opacity: 0,
    },
  })

  let pageComponent = null

  const onSelectColor = (color: PlayerColor) => {
    setFirstPlayerColor(color)
    setPage(Page.Game)
  }

  switch (page) {
    case Page.PlayerSelection: {
      pageComponent = (
        <PageContainer style={playerSelectionProps}>
          <Title>Connect Four</Title>
          <PlayerSelection>
            Player 1 - Please choose your color
            <Buttons>
              <ColorButton onClick={() => onSelectColor(PlayerColor.Red)}>
                Red
              </ColorButton>
              <ColorButton onClick={() => onSelectColor(PlayerColor.Blue)}>
                Blue
              </ColorButton>
            </Buttons>
          </PlayerSelection>
        </PageContainer>
      )
      break
    }
    case Page.Game: {
      if (firstPlayerColor) {
        pageComponent = (
          <Board firstPlayerColor={firstPlayerColor} setPage={setPage} />
        )
      }
      break
    }
  }

  return pageComponent
}

export default Routes
