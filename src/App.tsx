import React from 'react'
import Game from './components/Game'

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

const App: React.FC = () => {
  return (
    <Root>
      <GlobalStyle />
      <Game />
    </Root>
  )
}

export default App
