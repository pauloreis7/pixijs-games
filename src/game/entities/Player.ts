import { Sprite, Texture } from 'pixi.js'

import playerImg from '../assets/player.png'

import { BULLET_RATE } from '../../utils/constants'

export class Player {
  public body: Sprite

  public lastShootAt = 0

  constructor(initialX: number, initialY: number) {
    const playerTexture = Texture.from(playerImg)

    this.body = Sprite.from(playerTexture)
    this.body.anchor.set(0.5)
    this.body.x = initialX
    this.body.y = initialY
  }

  playerCanShoot(): boolean {
    const dateNow: number = Date.now()

    if (dateNow - this.lastShootAt < BULLET_RATE * 1.1) {
      return false
    }

    this.lastShootAt = dateNow
    return true
  }
}
