import { Loader, BaseTexture, AnimatedSprite } from 'pixi.js'

import playerSpritesImg from '../assets/playerSprites.png'

import { PlayerSheetProps } from '../../utils/types'
import { PLAYER_SPRITE_LOADER_NAME, BULLET_RATE } from '../../utils/constants'
import {
  getPlayerWalkingSpriteTextures,
  getPlayerStandSpriteTextures
} from '../../utils/functions'
import { acceptedPlayerStandKeys } from '../../utils/commands'

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

    const playerStandTextures = getPlayerStandSpriteTextures(
      playerBaseTexture,
      spritesWidth,
      spritesHeight
    )

    const playerWalkingTextures = getPlayerWalkingSpriteTextures(
      playerBaseTexture,
      spritesWidth,
      spritesHeight
    )

    this.playerSheet.standSouth = playerStandTextures.standSouthTextures
    this.playerSheet.standWest = playerStandTextures.standWestTextures
    this.playerSheet.standEast = playerStandTextures.standEastTextures
    this.playerSheet.standNorth = playerStandTextures.standNorthTextures

    this.playerSheet.walkSouth = playerWalkingTextures.walkSouthTextures
    this.playerSheet.walkWest = playerWalkingTextures.walkWestTextures
    this.playerSheet.walkEast = playerWalkingTextures.walkEastTextures
    this.playerSheet.walkNorth = playerWalkingTextures.walkNorthTextures

    const playerSprite = new AnimatedSprite(this.playerSheet.standSouth)

    this.body = playerSprite
    this.body.anchor.set(0.5)
    this.body.animationSpeed = 0.5
    this.body.loop = false
    this.body.x = initialX
    this.body.y = initialY
  }

  keyUpStopPlayerAnimation = (lastPressedKey: string) => {
    this.body?.stop()

    if (this.body && !this.body?.playing) {
      const standPlayerFunction = acceptedPlayerStandKeys[lastPressedKey]

      if (standPlayerFunction) {
        standPlayerFunction(this.body, this.playerSheet)
      }
    }
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
