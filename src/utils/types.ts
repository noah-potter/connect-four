import Chip from '../data/Chip'

// Each cell on the 7x6 board, has a position and can hold a chip
export type Cell = {
  position: Position
  chip?: Chip
}

export type Position = {
  row: number
  column: number
}
