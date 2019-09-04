import React, { useState, Fragment, useMemo } from 'react'
import styled from 'styled-components'

import { Cell } from '../types'
import { PlayerEnum } from '../enums'
import { columnWidth } from '../consts'

import Chip from '../data/Chip'

import ChipContainer from './ChipContainer'
import { getPlacementCell, getGameState } from '../utils/chips'
import { getNextPlayer } from '../utils/players'

const border = '2px solid #d1d1d1'
const spacing = 12
const backgroundColor = `rgb(236, 236, 236)`

const Root = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

const Columns = styled.div`
  position: relative;
  display: flex;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
`

const CellContainer = styled.div`
  display: flex;
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

const SelectionOverlay = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
`

const SelectionColumn = styled.div`
  cursor: pointer;
  flex: 1 1 auto;
  :hover {
    background: #71717154;
  }
`

// Board is built in columns from left to right and rows bottom to top
const initialBoard: Cell[][] = []

for (let col = 0; col < 7; col++) {
  initialBoard.push([])

  for (let row = 0; row < 6; row++) {
    const cell = {
      pos: {
        row: row,
        col: col,
      },
      chip: undefined,
    } as Cell

    initialBoard[col].push(cell)
  }
}

type Props = {}

export const Board: React.FC<Props> = (props) => {
  const [hoveredColumn, setHoveredColumn] = useState(3)
  const [currentPlayer, setCurrentPlayer] = useState(PlayerEnum.First)
  const [placementChip, setPlacementChip] = useState(new Chip(currentPlayer))
  const [board, setBoard] = useState(initialBoard)
  const chips = useMemo(() => {
    const chipsInBoard = board
      .flat()
      .map((cell) => cell.chip)
      .filter((chip) => chip) as Chip[]

    chipsInBoard.push(placementChip)

    return chipsInBoard
  }, [board, placementChip])

  const onRestartGame = () => {
    // Drop all pieces
  }

  const onSelectColumn = (column: number) => {
    const cell = getPlacementCell(board, column)

    if (cell) {
      placementChip.place(cell.pos.row, cell.pos.col)
      cell.chip = placementChip

      const gameOver = getGameState(board)

      if (gameOver) {
        // Show winner screen
        setTimeout(() => {
          const done = window.confirm('Someone won!')
          onRestartGame()
        }, 500)
      }

      const nextPlayer = getNextPlayer(currentPlayer)
      setPlacementChip(new Chip(nextPlayer))
      setCurrentPlayer(nextPlayer)
    }
  }

  return (
    <Root>
      <Columns>
        {board.map((column, index) => (
          <Column key={index}>
            {column.map((data, index) => (
              <Fragment key={index}>
                <CellContainer />
              </Fragment>
            ))}
          </Column>
        ))}
        {chips.map((chip, index) => (
          <ChipContainer
            key={chip.id}
            chip={chip}
            targetColumn={hoveredColumn}
          />
        ))}
        <SelectionOverlay>
          {board.map((_, index) => (
            <SelectionColumn
              key={index}
              onMouseEnter={() => setHoveredColumn(index)}
              onClick={() => onSelectColumn(index)}
            />
          ))}
        </SelectionOverlay>
      </Columns>
    </Root>
  )
}

export default Board
