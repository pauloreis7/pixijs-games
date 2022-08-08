import { Bullet } from '../game/entities/Bullet'
import { Player } from '../game/entities/Player'

import { PLAYER_SPEED } from './constants'

export const acceptedPlayerMoves = {
  KeyW(keyIsPressed: boolean, player: Player) {
    if (keyIsPressed && player.body) {
      if (!player.body.playing) {
        player.body.textures = player.playerSheet.walkNorth
        player.body.play()
      }

      player.body.y = Math.max(player.body.y - PLAYER_SPEED, 30)
    }
  },
  KeyA(keyIsPressed: boolean, player: Player) {
    if (keyIsPressed && player.body) {
      if (!player.body.playing) {
        player.body.textures = player.playerSheet.walkWest
        player.body.play()
      }

      player.body.x = Math.max(player.body.x - PLAYER_SPEED, 30)
    }
  },
  KeyS(keyIsPressed: boolean, player: Player, screenHeight: number) {
    if (keyIsPressed && player.body) {
      if (!player.body.playing) {
        player.body.textures = player.playerSheet.walkSouth
        player.body.play()
      }

      player.body.y = Math.min(player.body.y + PLAYER_SPEED, screenHeight - 30)
    }
  },
  KeyD(keyIsPressed: boolean, player: Player, screenWidth: number) {
    if (keyIsPressed && player.body) {
      if (!player.body.playing) {
        player.body.textures = player.playerSheet.walkEast
        player.body.play()
      }

      player.body.x = Math.min(player.body.x + PLAYER_SPEED, screenWidth - 30)
    }
  }
}

export function shoot(
  shootIsPressed: boolean,
  player: Player,
  initialX = 0,
  initialY = 0,
  addBullet: (bullet: Bullet, bulletId: number) => void
) {
  if (shootIsPressed && player.playerCanShoot()) {
    player.lastShootAt = Date.now()

    const bulletId = Math.floor(Math.random() * 10000)

    const bullet = new Bullet(initialX, initialY)

    addBullet(bullet, bulletId)
  }
}
