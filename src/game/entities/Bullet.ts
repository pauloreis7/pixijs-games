import { Sprite, Texture } from 'pixi.js'

import bulletImg from '../assets/bullet.png'

export class Bullet {
  public body: Sprite

  public direction = 0

  constructor(initialX: number, initialY: number) {
    const bulletTexture = Texture.from(bulletImg, { resolution: 2.5 })

    this.body = Sprite.from(bulletTexture)
    this.body.anchor.set(0.5)
    this.body.x = initialX
    this.body.y = initialY
  }
}
