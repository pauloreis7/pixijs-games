import { Sprite } from 'pixi.js'

import bulletImg from '../game/assets/bullet.png'

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

export function shoot(
  shootIsPressed: boolean,
  initialX: number,
  initialY: number,
  player: Player,
  addShoot: (bullet: Sprite, bulletId: number) => void
) {
  if (shootIsPressed && player.playerCanShoot()) {
    player.lastShootAt = Date.now()

    const bullet = Sprite.from(bulletImg, { resolution: 2.5 })

    bullet.anchor.set(0.5)
    bullet.x = initialX
    bullet.y = initialY

    const bulletId = Math.floor(Math.random() * 10000)

    addShoot(bullet, bulletId)
  }
}
