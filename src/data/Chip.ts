import { Cell } from '../types'
import { PlayerEnum } from '../enums'
import { getRandomGuid } from '../utils/guid'

export default class Chip {
  id: string
  isPlacing: boolean = true
  row: number | null = null
  column: number | null = null
  player: PlayerEnum

  constructor(_player: PlayerEnum) {
    this.id = getRandomGuid()
    this.player = _player
  }

  place = (_row: number, _column: number) => {
    this.isPlacing = false
    this.row = _row
    this.column = _column
  }
}
