import { Loader, TilingSprite, AnimatedSprite, Texture } from 'pixi.js'

import mapBackgroundImg from '../assets/gameBackground.jpg'

import { MAP_LOADER_NAME } from '../../utils/constants'

export class Map {
  public body: AnimatedSprite | null = null

  public mapLoader: Loader

  public mapTilingSprite?: TilingSprite

  public backgroundX = 0

  public backgroundSpeed = 1

  constructor(width: number, height: number) {
    const mapLoader = new Loader()
    this.mapLoader = mapLoader

    mapLoader.add(MAP_LOADER_NAME, mapBackgroundImg)
    mapLoader.onComplete.add(() => {
      const mapTexture = this.mapLoader.resources[MAP_LOADER_NAME].texture

      if (mapTexture) {
        const mapTilingSprite = this.createBackground(mapTexture, width, height)

        this.mapTilingSprite = mapTilingSprite
      }
    })

    mapLoader.load()
  }

  createBackground(texture: Texture, width: number, height: number) {
    const tilling = new TilingSprite(texture, width, height)

    return tilling
  }

  updateBackground() {
    if (this.mapTilingSprite?.tilePosition?.x === undefined) {
      return
    }

    this.backgroundX = this.backgroundX + this.backgroundSpeed

    this.mapTilingSprite.tilePosition.x = this.backgroundX
  }
}
