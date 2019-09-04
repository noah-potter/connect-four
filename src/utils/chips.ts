import { Pos, Cell } from '../types'
import { PlayerColor, GameState, playerWonToGameState } from '../enums'

export const getPlacementCell = (
  board: Cell[][],
  column: number
): Cell | null => {
  const cellsInColumn = board[column]

  let emptyCell = null

  // column is top down, and I want to do a bottom up search for an empty cell
  for (var i = cellsInColumn.length - 1; i >= 0; i--) {
    const cell = cellsInColumn[i]

    if (!cell.chip) {
      emptyCell = cell
      break
    }
  }

  return emptyCell
}

const cellHasPlayerChip = (cell: Cell, player: PlayerColor) => {
  return cell.chip && cell.chip.player === player
}

export const getGameState = (board: Cell[][]): GameState => {
  // Look for a top left, bottom right diagonal win
  for (let col = 0; col <= 3; col++) {
    for (let row = 0; row <= 2; row++) {
      let cell = board[col][row]

      if (cell.chip) {
        let player = cell.chip.player

        if (
          cellHasPlayerChip(board[col + 1][row + 1], player) &&
          cellHasPlayerChip(board[col + 2][row + 2], player) &&
          cellHasPlayerChip(board[col + 3][row + 3], player)
        ) {
          return playerWonToGameState(player)
        }
      }
    }
  }

  // Look for a top right, bottom left diagonal win
  for (let col = 3; col <= 6; col++) {
    for (let row = 0; row <= 2; row++) {
      let cell = board[col][row]

      if (cell.chip) {
        let player = cell.chip.player

        if (
          cellHasPlayerChip(board[col - 1][row + 1], player) &&
          cellHasPlayerChip(board[col - 2][row + 2], player) &&
          cellHasPlayerChip(board[col - 3][row + 3], player)
        ) {
          return playerWonToGameState(player)
        }
      }
    }
  }

  // Look for a vertical win
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row <= 2; row++) {
      let cell = board[col][row]

      if (cell.chip) {
        let player = cell.chip.player

        if (
          cellHasPlayerChip(board[col][row + 1], player) &&
          cellHasPlayerChip(board[col][row + 2], player) &&
          cellHasPlayerChip(board[col][row + 3], player)
        ) {
          return playerWonToGameState(player)
        }
      }
    }
  }

  // Look for a horizontal win
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col <= 3; col++) {
      let cell = board[col][row]

      if (cell.chip) {
        let player = cell.chip.player

        if (
          cellHasPlayerChip(board[col + 1][row], player) &&
          cellHasPlayerChip(board[col + 2][row], player) &&
          cellHasPlayerChip(board[col + 3][row], player)
        ) {
          return playerWonToGameState(player)
        }
      }
    }
  }

  // Check if game board full for tie
  let hasTied = true

  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 6; row++) {
      let cell = board[col][row]

      if (!cell.chip) {
        hasTied = false
      }
    }
  }

  if (hasTied) {
    return GameState.Tie
  }

  return GameState.Playing
}
