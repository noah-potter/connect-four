import { Cell } from '../types'
import { PlayerColor } from '../enums'
import { getRandomGuid } from '../utils/guid'

export default class Chip {
  id: string
  isPlacing: boolean = true
  row: number | null = null
  column: number | null = null
  player: PlayerColor

  constructor(_player: PlayerColor) {
    this.id = getRandomGuid()
    this.player = _player
  }

  place = (_row: number, _column: number) => {
    this.isPlacing = false
    this.row = _row
    this.column = _column
  }
}
