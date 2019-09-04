import Chip from './data/Chip'

export type Cell = {
  pos: Pos
  chip?: Chip
}

export type Pos = {
  row: number
  col: number
}
