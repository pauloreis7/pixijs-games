import { Application } from 'pixi.js'

import {
  GAME_VIEW_CONTAINER_ID,
  BULLET_SPEED,
  MAP_WIDTH,
  MAP_HEIGHT
} from '../utils/constants'
import { acceptedPlayerMoves, shoot } from '../utils/commands'
import { Inputs } from './inputs'

import { Bullet } from './entities/Bullet'
import { Player } from './entities/Player'
import { Map } from './entities/Map'

export class Game {
  private app: Application

  private player: Player

  private map: Map

  private bullets: { [key: number]: Bullet } = {}

  public inputs: Inputs

  constructor() {
    this.app = new Application({
      width: MAP_WIDTH,
      height: MAP_HEIGHT,
      antialias: false,
      autoDensity: true,
      backgroundColor: Number('0xb3b5c6')
    })

    const map = new Map(MAP_WIDTH, MAP_HEIGHT)
    const player = new Player(this.app.view.width / 2, this.app.view.height / 2)

    this.player = player
    this.map = map

    this.inputs = new Inputs(this.player.keyUpStopPlayerAnimation)

    player.playerSpritesLoader.onComplete.add(() => {
      if (map.mapTilingSprite) {
        this.app.stage.addChild(map.mapTilingSprite)
      }

      if (this.player.body) {
        this.app.stage.addChild(this.player.body)
        this.player.body.play()
      }

      this.app.ticker.add(this.gameLoop)
    })
  }

  private gameLoop = () => {
    this.updateInputs()
    this.updateBullets()
    this.map.updateBackground()
  }

  start = () => {
    const gameViewContainer = document.getElementById(GAME_VIEW_CONTAINER_ID)

    if (!gameViewContainer) {
      return
    }

    this.app.view.style.borderWidth = '1rem'
    this.app.view.style.borderColor = '#616480'

    gameViewContainer.appendChild(this.app.view)

    this.app.start()
    this.inputs.start()
  }

  updateInputs() {
    const moveFunctionKeyW = acceptedPlayerMoves.KeyW
    const moveFunctionKeyA = acceptedPlayerMoves.KeyA
    const moveFunctionKeyS = acceptedPlayerMoves.KeyS
    const moveFunctionKeyD = acceptedPlayerMoves.KeyD

    moveFunctionKeyW(this.inputs.keys.KeyW, this.player)
    moveFunctionKeyA(this.inputs.keys.KeyA, this.player)
    moveFunctionKeyS(this.inputs.keys.KeyS, this.player, this.app.view.height)
    moveFunctionKeyD(this.inputs.keys.KeyD, this.player, this.app.view.width)

    shoot(
      this.inputs.shoot,
      this.player,
      this.player.body?.x,
      this.player.body?.y,
      this.addBullet
    )
  }

  updateBullets() {
    for (const bulletId in this.bullets) {
      const currentBullet = this.bullets[bulletId]

      currentBullet.body.position.y -= BULLET_SPEED

      if (currentBullet.body.position.y < 0) {
        this.app.stage.removeChild(currentBullet.body)

        delete this.bullets[bulletId]
      }
    }
  }

  private addBullet = (bullet: Bullet, bulletId: number) => {
    this.app.stage.addChild(bullet.body)

    this.bullets[bulletId] = bullet
  }
}
