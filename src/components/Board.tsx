import React, { Fragment, useState, useMemo, useEffect } from 'react'
import styled from 'styled-components'

import { Cell } from '../utils/types'
import { PlayerColor, GameState, Page } from '../utils/enums'
import { cellStartAnimationDuration } from '../utils/consts'
import { getPlacementCell, getGameState, resetBoard } from '../utils/chips'
import { getNextPlayer } from '../utils/players'

import Chip from '../data/Chip'

import ChipContainer from './ChipContainer'
import CellContainer from './CellContainer'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

const Columns = styled.div`
  display: flex;
`

const Column = styled.div`
  z-index: 1;
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
  border-radius: 8px;
  transition: 300ms background-color;
  :hover {
    background-color: #00000017;
  }
`

type Props = {
  firstPlayerColor: PlayerColor
  setPage: (page: Page) => void
}

export const Board: React.FC<Props> = ({ firstPlayerColor, setPage }) => {
  // Board is built in columns from left to right and rows top to bottom
  let board: Cell[][] = useMemo(() => {
    let result: Cell[][] = []

    for (let col = 0; col < 7; col++) {
      result.push([])

      for (let row = 0; row < 6; row++) {
        const cell = {
          position: {
            row: row,
            column: col,
          },
          chip: undefined,
        } as Cell

        result[col].push(cell)
      }
    }

    return result
  }, [])

  // Track which column the player is hovering for placement cell and after image
  const [hoveredColumn, setHoveredColumn] = useState(3)
  const [currentPlayer, setCurrentPlayer] = useState(firstPlayerColor)
  // The chip at the top of the board which shows which player is about to place a chip and where
  const [placementChip, setPlacementChip] = useState(new Chip(currentPlayer))
  // Control when the player can play to handle waiting for initial setup to be done and when game ends
  const [canPlay, setCanPlay] = useState(false)
  // Only show the after image when the player is mousing over the board
  const [mouseInArea, setMouseInArea] = useState(false)

  let afterImageRow: number
  let afterImageCol: number

  const afterImageCell = getPlacementCell(board, hoveredColumn)

  if (afterImageCell) {
    afterImageRow = afterImageCell.position.row
    afterImageCol = afterImageCell.position.column
  }

  // Get the chips from the board to render. This way the chip at the top of the board is the same
  // dom element that gets placed in the correct position and it has a smooth transition
  const chips = useMemo(() => {
    const chipsInBoard = board
      .flat()
      .map((cell) => cell.chip)
      .filter((chip) => chip) as Chip[]

    if (canPlay) {
      chipsInBoard.push(placementChip)
    }

    return chipsInBoard
  }, [board, placementChip, canPlay])

  // Let the initial cell animation finish showing all the cells before allowing the player to play
  useEffect(() => {
    setTimeout(() => {
      setCanPlay(true)
    }, cellStartAnimationDuration * 6 * 7)
  }, [])

  const gameEnded = (finalMessage: string) => {
    setCanPlay(false)

    // Let the piece finish fall before showing the winning player
    setTimeout(() => {
      window.confirm(finalMessage)

      // Game is over, reset and go back to allow the player to be a different color
      resetBoard(board)
      setPage(Page.PlayerSelection)
    }, 600)
  }

  const onSelectColumn = (column: number) => {
    const cell = getPlacementCell(board, column)

    // Only continue if the column isn't full
    if (cell) {
      placementChip.place(cell.position.row, cell.position.column)
      cell.chip = placementChip

      const gameState = getGameState(board)

      switch (gameState) {
        case GameState.Playing: {
          break
        }
        case GameState.RedPlayerWins: {
          gameEnded('RED won!')
          return
        }
        case GameState.BluePlayerWins: {
          gameEnded('BLUE won!')
          return
        }
        case GameState.Tie: {
          gameEnded('Game was a TIE!')
          return
        }
        default:
          break
      }

      // Let the next player go
      const nextPlayer = getNextPlayer(currentPlayer)
      setPlacementChip(new Chip(nextPlayer))
      setCurrentPlayer(nextPlayer)
    }
  }

  return (
    <Root>
      <Columns>
        {board.map((column, columnIndex) => (
          <Column key={columnIndex}>
            {column.map((cell, rowIndex) => (
              <CellContainer
                key={rowIndex}
                position={cell.position}
                hideOutline={Boolean(cell.chip && !cell.chip.isPlacing)}
                showAfterImage={
                  mouseInArea &&
                  afterImageRow === rowIndex &&
                  afterImageCol === columnIndex
                }
                afterImagePlayer={currentPlayer}
              />
            ))}
          </Column>
        ))}
      </Columns>
      {chips.map((chip) => (
        <ChipContainer key={chip.id} chip={chip} targetColumn={hoveredColumn} />
      ))}
      {canPlay && (
        <SelectionOverlay
          onMouseEnter={() => setMouseInArea(true)}
          onMouseLeave={() => setMouseInArea(false)}
        >
          {board.map((_, index) => (
            <SelectionColumn
              key={index}
              onMouseEnter={() => setHoveredColumn(index)}
              onClick={() => onSelectColumn(index)}
            />
          ))}
        </SelectionOverlay>
      )}
    </Root>
  )
}

export default Board
