export enum PlayerColor {
  Red = 'red',
  Blue = 'blue',
}

export const playerToChipColor = {
  [PlayerColor.Red]:
    'linear-gradient(48deg,rgba(255,14,14,1) 0%,rgb(255, 169, 62) 100%)',
  [PlayerColor.Blue]:
    'linear-gradient(48deg, rgba(55,34,255,1) 0%, rgba(71,169,255,1) 100%)',
}

export const playerToChipBoxShadow = {
  [PlayerColor.Red]: 'inset 0 0 20px 0px #fb1100',
  [PlayerColor.Blue]: 'inset 0 0 20px 0px #3b41fe',
}

export enum GameState {
  Playing = 'playing',
  RedPlayerWins = 'first player wins',
  BluePlayerWins = 'second player wins',
  Tie = 'tie',
}

export const playerWonToGameState = (player: PlayerColor) => {
  if (player === PlayerColor.Red) {
    return GameState.RedPlayerWins
  } else if (player === PlayerColor.Blue) {
    return GameState.BluePlayerWins
  }

  throw new Error('Invalid player given')
}

export enum Page {
  PlayerSelection = 'player selection',
  Game = 'game',
}
