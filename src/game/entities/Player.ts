import {
  Texture,
  Rectangle,
  Loader,
  BaseTexture,
  AnimatedSprite
} from 'pixi.js'

import playerSpritesImg from '../assets/playerSprites.png'

import { PlayerSheetProps } from '../../utils/types'
import { PLAYER_SPRITE_LOADER_NAME, BULLET_RATE } from '../../utils/constants'

export class Player {
  public body: AnimatedSprite | null = null

  public playerSpritesLoader: Loader

  public playerSheet: PlayerSheetProps = {
    standSouth: [],
    standWest: [],
    standEast: [],
    standNorth: [],
    walkSouth: [],
    walkWest: [],
    walkEast: [],
    walkNorth: []
  }

  public lastShootAt = 0

  constructor(initialX: number, initialY: number) {
    const playerSpritesLoader = new Loader()
    this.playerSpritesLoader = playerSpritesLoader

    playerSpritesLoader.add(PLAYER_SPRITE_LOADER_NAME, playerSpritesImg)
    playerSpritesLoader.load(() =>
      this.loadPlayerSprites(
        initialX,
        initialY,
        this.playerSpritesLoader.resources[PLAYER_SPRITE_LOADER_NAME].url
      )
    )
  }

  loadPlayerSprites = (
    initialX: number,
    initialY: number,
    loaderSource: string
  ) => {
    const playerBaseTexture = BaseTexture.from(loaderSource)

    playerBaseTexture.setRealSize(
      playerBaseTexture.width,
      playerBaseTexture.height
    )

    playerBaseTexture.setResolution(2)

    const spritesWidth = 60
    const spritesHeight = 61

    this.playerSheet.standSouth = [
      new Texture(
        playerBaseTexture,
        new Rectangle(
          2 * spritesWidth,
          1 * spritesHeight,
          spritesWidth,
          spritesHeight
        )
      )
    ]

    this.playerSheet.standWest = [
      new Texture(
        playerBaseTexture,
        new Rectangle(
          1 * spritesWidth,
          3 * spritesHeight,
          spritesWidth,
          spritesHeight
        )
      )
    ]

    this.playerSheet.standEast = [
      new Texture(
        playerBaseTexture,
        new Rectangle(
          1 * spritesWidth,
          2 * spritesHeight,
          spritesWidth,
          spritesHeight
        )
      )
    ]

    this.playerSheet.standNorth = [
      new Texture(
        playerBaseTexture,
        new Rectangle(2 * spritesWidth, 0, spritesWidth, spritesHeight)
      )
    ]

    this.playerSheet.walkSouth = [
      new Texture(
        playerBaseTexture,
        new Rectangle(0, 1 * spritesHeight, spritesWidth, spritesHeight)
      ),
      new Texture(
        playerBaseTexture,
        new Rectangle(
          1 * spritesWidth,
          1 * spritesHeight,
          spritesWidth,
          spritesHeight
        )
      ),
      new Texture(
        playerBaseTexture,
        new Rectangle(
          2 * spritesWidth,
          1 * spritesHeight,
          spritesWidth,
          spritesHeight
        )
      ),
      new Texture(
        playerBaseTexture,
        new Rectangle(
          3 * spritesWidth,
          1 * spritesHeight,
          spritesWidth,
          spritesHeight
        )
      ),
      new Texture(
        playerBaseTexture,
        new Rectangle(
          4 * spritesWidth,
          1 * spritesHeight,
          spritesWidth,
          spritesHeight
        )
      ),
      new Texture(
        playerBaseTexture,
        new Rectangle(
          5 * spritesWidth,
          1 * spritesHeight,
          spritesWidth,
          spritesHeight
        )
      ),
      new Texture(
        playerBaseTexture,
        new Rectangle(
          6 * spritesWidth,
          1 * spritesHeight,
          spritesWidth,
          spritesHeight
        )
      )
    ]

    this.playerSheet.walkWest = [
      new Texture(
        playerBaseTexture,
        new Rectangle(0, 3 * spritesHeight, spritesWidth, spritesHeight)
      ),
      new Texture(
        playerBaseTexture,
        new Rectangle(
          1 * spritesWidth,
          3 * spritesHeight,
          spritesWidth,
          spritesHeight
        )
      ),
      new Texture(
        playerBaseTexture,
        new Rectangle(
          2 * spritesWidth,
          3 * spritesHeight,
          spritesWidth,
          spritesHeight
        )
      ),
      new Texture(
        playerBaseTexture,
        new Rectangle(
          3 * spritesWidth,
          3 * spritesHeight,
          spritesWidth,
          spritesHeight
        )
      ),
      new Texture(
        playerBaseTexture,
        new Rectangle(
          4 * spritesWidth,
          3 * spritesHeight,
          spritesWidth,
          spritesHeight
        )
      ),
      new Texture(
        playerBaseTexture,
        new Rectangle(
          5 * spritesWidth,
          3 * spritesHeight,
          spritesWidth,
          spritesHeight
        )
      ),
      new Texture(
        playerBaseTexture,
        new Rectangle(
          6 * spritesWidth,
          3 * spritesHeight,
          spritesWidth,
          spritesHeight
        )
      )
    ]

    this.playerSheet.walkEast = [
      new Texture(
        playerBaseTexture,
        new Rectangle(0, 2 * spritesHeight, spritesWidth, spritesHeight)
      ),
      new Texture(
        playerBaseTexture,
        new Rectangle(
          1 * spritesWidth,
          2 * spritesHeight,
          spritesWidth,
          spritesHeight
        )
      ),
      new Texture(
        playerBaseTexture,
        new Rectangle(
          2 * spritesWidth,
          2 * spritesHeight,
          spritesWidth,
          spritesHeight
        )
      ),
      new Texture(
        playerBaseTexture,
        new Rectangle(
          3 * spritesWidth,
          2 * spritesHeight,
          spritesWidth,
          spritesHeight
        )
      ),
      new Texture(
        playerBaseTexture,
        new Rectangle(
          4 * spritesWidth,
          2 * spritesHeight,
          spritesWidth,
          spritesHeight
        )
      ),
      new Texture(
        playerBaseTexture,
        new Rectangle(
          5 * spritesWidth,
          2 * spritesHeight,
          spritesWidth,
          spritesHeight
        )
      ),
      new Texture(
        playerBaseTexture,
        new Rectangle(
          6 * spritesWidth,
          2 * spritesHeight,
          spritesWidth,
          spritesHeight
        )
      )
    ]

    this.playerSheet.walkNorth = [
      new Texture(
        playerBaseTexture,
        new Rectangle(0, 0, spritesWidth, spritesHeight)
      ),
      new Texture(
        playerBaseTexture,
        new Rectangle(1 * spritesWidth, 0, spritesWidth, spritesHeight)
      ),
      new Texture(
        playerBaseTexture,
        new Rectangle(2 * spritesWidth, 0, spritesWidth, spritesHeight)
      ),
      new Texture(
        playerBaseTexture,
        new Rectangle(3 * spritesWidth, 0, spritesWidth, spritesHeight)
      ),
      new Texture(
        playerBaseTexture,
        new Rectangle(4 * spritesWidth, 0, spritesWidth, spritesHeight)
      ),
      new Texture(
        playerBaseTexture,
        new Rectangle(5 * spritesWidth, 0, spritesWidth, spritesHeight)
      ),
      new Texture(
        playerBaseTexture,
        new Rectangle(6 * spritesWidth, 0, spritesWidth, spritesHeight)
      )
    ]

    const playerSprite = new AnimatedSprite(this.playerSheet.standSouth)

    this.body = playerSprite
    this.body.anchor.set(0.5)
    this.body.animationSpeed = 0.5
    this.body.loop = false
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
