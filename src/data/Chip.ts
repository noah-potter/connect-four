import { PlayerColor } from '../utils/enums'
import { getRandomGuid } from '../utils/guid'

// Colored chips the players place on the board
export default class Chip {
  id: string
  isPlacing: boolean = true
  row: number | null = null
  column: number | null = null
  player: PlayerColor

  constructor(_player: PlayerColor) {
    // The id helps keep component keys unique when rendering the chips
    this.id = getRandomGuid()
    this.player = _player
  }

  place = (_row: number, _column: number) => {
    this.isPlacing = false
    this.row = _row
    this.column = _column
  }
}
