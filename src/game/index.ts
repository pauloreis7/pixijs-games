import { Application, Sprite } from 'pixi.js'

import { GAME_VIEW_CONTAINER_ID, BULLET_SPEED } from '../utils/constants'
import { acceptedPlayerMoves, shoot } from '../utils/commands'
import { Inputs } from './inputs'

import { Player } from './entities/Player'

export class Game {
  private app: Application

  private player: Player

  private bullets: { [key: number]: Sprite } = {}

  public inputs: Inputs = new Inputs()

  constructor() {
    this.app = new Application({
      width: 800,
      height: 600,
      antialias: false,
      autoDensity: true,
      backgroundColor: Number('0xb3b5c6')
    })

    const player = new Player(this.app.view.width / 2, this.app.view.height / 2)

    this.player = player

    this.app.stage.addChild(player.body)
  }

  private gameLoop = () => {
    this.updateInputs()
    this.updateBullets()
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
    this.app.ticker.add(this.gameLoop)
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
      this.player.body.x,
      this.player.body.y,
      this.player,
      this.addShoot
    )
  }

  updateBullets() {
    for (const bulletId in this.bullets) {
      const currentBullet = this.bullets[bulletId]

      currentBullet.position.y -= BULLET_SPEED

      if (currentBullet.position.y < 0) {
        this.app.stage.removeChild(currentBullet)

        delete this.bullets[bulletId]
      }
    }
  }

  private addShoot = (bullet: Sprite, bulletId: number) => {
    this.app.stage.addChild(bullet)

    this.bullets[bulletId] = bullet
  }
}
