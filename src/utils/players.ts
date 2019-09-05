import { PlayerColor } from './enums'

export const getNextPlayer = (player: PlayerColor) => {
  if (player === PlayerColor.Red) {
    return PlayerColor.Blue
  }

  return PlayerColor.Red
}
