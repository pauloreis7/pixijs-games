import { Sprite } from 'pixi.js'

import { PLAYER_SPEED } from './constants'

export const acceptedPlayerMoves = {
  KeyW(keyIsPressed: boolean, player: Sprite) {
    if (keyIsPressed) {
      player.y = Math.max(player.y - PLAYER_SPEED, 18)
    }
  },
  KeyA(keyIsPressed: boolean, player: Sprite) {
    if (keyIsPressed) {
      player.x = Math.max(player.x - PLAYER_SPEED, 12)
    }
  },
  KeyS(keyIsPressed: boolean, player: Sprite, screenHeight: number) {
    if (keyIsPressed) {
      player.y = Math.min(player.y + PLAYER_SPEED, screenHeight - 19)
    }
  },
  KeyD(keyIsPressed: boolean, player: Sprite, screenWidth: number) {
    if (keyIsPressed) {
      player.x = Math.min(player.x + PLAYER_SPEED, screenWidth - 12)
    }
  }
}
