import React, { Fragment, useState, useMemo, useEffect } from 'react'
import styled from 'styled-components'

import { Cell } from '../types'
import { PlayerColor, GameState } from '../enums'
import { cellStartAnimationDuration } from '../consts'
import { getPlacementCell, getGameState } from '../utils/chips'
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
  position: relative;
  display: flex;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
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

type Props = {
  firstPlayerColor: PlayerColor
}

export const Board: React.FC<Props> = ({ firstPlayerColor }) => {
  const [hoveredColumn, setHoveredColumn] = useState(3)
  const [currentPlayer, setCurrentPlayer] = useState(firstPlayerColor)
  const [placementChip, setPlacementChip] = useState(new Chip(currentPlayer))
  const [canPlay, setCanPlay] = useState(false)
  const [board, setBoard] = useState(initialBoard)
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

  useEffect(() => {
    setTimeout(() => {
      setCanPlay(true)
    }, cellStartAnimationDuration * 6 * 7)
  }, [])

  const onRestartGame = () => {
    // Drop all pieces
    chips.forEach((chip) => {
      chip.remove()
    })

    setCanPlay(true)
  }

  const gameEnded = (finalMessage: string) => {
    setCanPlay(false)

    setTimeout(() => {
      const done = window.confirm(finalMessage)
      onRestartGame()
    }, 600)
  }

  const onSelectColumn = (column: number) => {
    const cell = getPlacementCell(board, column)

    if (cell) {
      placementChip.place(cell.pos.row, cell.pos.col)
      cell.chip = placementChip

      const gameState = getGameState(board)

      switch (gameState) {
        case GameState.Playing: {
          break
        }
        case GameState.RedPlayerWins: {
          gameEnded('RED won!')
          break
        }
        case GameState.BluePlayerWins: {
          gameEnded('BLUE won!')
          break
        }
        case GameState.Tie: {
          gameEnded('Game was a TIE!')
          break
        }
        default:
          break
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
                <CellContainer
                  pos={data.pos}
                  hideOutline={Boolean(
                    data.chip && !data.chip.isPlacing && !data.chip.isRemoving
                  )}
                />
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
        {canPlay && (
          <SelectionOverlay>
            {board.map((_, index) => (
              <SelectionColumn
                key={index}
                onMouseEnter={() => setHoveredColumn(index)}
                onClick={() => onSelectColumn(index)}
              />
            ))}
          </SelectionOverlay>
        )}
      </Columns>
    </Root>
  )
}

export default Board
