import { Player } from '../game/entities/Player'

import { PLAYER_SPEED } from './constants'

export const acceptedPlayerMoves = {
  KeyW(keyIsPressed: boolean, player: Player) {
    if (keyIsPressed) {
      player.body.y = Math.max(player.body.y - PLAYER_SPEED, 18)
    }
  },
  KeyA(keyIsPressed: boolean, player: Player) {
    if (keyIsPressed) {
      player.body.x = Math.max(player.body.x - PLAYER_SPEED, 12)
    }
  },
  KeyS(keyIsPressed: boolean, player: Player, screenHeight: number) {
    if (keyIsPressed) {
      player.body.y = Math.min(player.body.y + PLAYER_SPEED, screenHeight - 19)
    }
  },
  KeyD(keyIsPressed: boolean, player: Player, screenWidth: number) {
    if (keyIsPressed) {
      player.body.x = Math.min(player.body.x + PLAYER_SPEED, screenWidth - 12)
    }
  }
}
