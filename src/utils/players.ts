import { PlayerEnum } from '../enums'

export const getNextPlayer = (player: PlayerEnum) => {
  if (player === PlayerEnum.First) {
    return PlayerEnum.Second
  }

  return PlayerEnum.First
}
