import { Texture, Rectangle, BaseTexture } from 'pixi.js'

export function getPlayerSkinTextures(
  baseTexture: BaseTexture,
  lineY: number,
  texturesCount: number,
  spritesWidth: number,
  spritesHeight: number
) {
  const spriteTextures = Array.from({ length: texturesCount }).map(
    (_, index) => {
      const texture = new Texture(
        baseTexture,
        new Rectangle(
          index * spritesWidth,
          lineY * spritesHeight,
          spritesWidth,
          spritesHeight
        )
      )

      return texture
    }
  )

  return spriteTextures
}

export function getPlayerStandTexture(
  baseTexture: BaseTexture,
  lineY: number,
  columnX: number,
  spritesWidth: number,
  spritesHeight: number
) {
  const spriteTexture = [
    new Texture(
      baseTexture,
      new Rectangle(
        columnX * spritesWidth,
        lineY * spritesHeight,
        spritesWidth,
        spritesHeight
      )
    )
  ]

  return spriteTexture
}

export function getPlayerStandSpriteTextures(
  baseTexture: BaseTexture,
  spritesWidth: number,
  spritesHeight: number
) {
  const standNorthTextures = getPlayerStandTexture(
    baseTexture,
    0,
    2,
    spritesWidth,
    spritesHeight
  )

  const standSouthTextures = getPlayerStandTexture(
    baseTexture,
    1,
    2,
    spritesWidth,
    spritesHeight
  )

  const standEastTextures = getPlayerStandTexture(
    baseTexture,
    2,
    1,
    spritesWidth,
    spritesHeight
  )

  const standWestTextures = getPlayerStandTexture(
    baseTexture,
    3,
    1,
    spritesWidth,
    spritesHeight
  )

  return {
    standSouthTextures,
    standWestTextures,
    standEastTextures,
    standNorthTextures
  }
}

export function getPlayerWalkingSpriteTextures(
  baseTexture: BaseTexture,
  spritesWidth: number,
  spritesHeight: number
) {
  const walkNorthTextures = getPlayerSkinTextures(
    baseTexture,
    0,
    7,
    spritesWidth,
    spritesHeight
  )

  const walkSouthTextures = getPlayerSkinTextures(
    baseTexture,
    1,
    7,
    spritesWidth,
    spritesHeight
  )

  const walkEastTextures = getPlayerSkinTextures(
    baseTexture,
    2,
    7,
    spritesWidth,
    spritesHeight
  )

  const walkWestTextures = getPlayerSkinTextures(
    baseTexture,
    3,
    7,
    spritesWidth,
    spritesHeight
  )

  return {
    walkSouthTextures,
    walkWestTextures,
    walkEastTextures,
    walkNorthTextures
  }
}
