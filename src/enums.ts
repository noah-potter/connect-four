export enum PlayerEnum {
  First = 'first',
  Second = 'second',
}

export const playerToChipColor = {
  [PlayerEnum.First]: 'red',
  [PlayerEnum.Second]: 'blue',
}

export enum GameState {
  Playing = 'playing',
  FirstPlayerWins = 'first player wins',
  SecondPlayerWins = 'second player wins',
  Tie = 'tie',
}

export const playerWonToGameState = (player: PlayerEnum) => {
  if (player === PlayerEnum.First) {
    return GameState.FirstPlayerWins
  } else if (player === PlayerEnum.Second) {
    return GameState.SecondPlayerWins
  }

  throw new Error('Invalid player given')
}
