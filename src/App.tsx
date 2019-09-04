import React from 'react'
import Routes from './components/Routes'

import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

const Root = styled.div`
  display: flex;
  text-align: center;
  height: 100vh;
`
const Game = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
`

const GameArea = styled.div`
  position: relative;
  display: flex;
`

const App: React.FC = () => {
  return (
    <Root>
      <GlobalStyle />
      <Game>
        <GameArea>
          <Routes />
        </GameArea>
      </Game>
    </Root>
  )
}

export default App
