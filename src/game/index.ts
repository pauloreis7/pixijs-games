import { Application, Sprite } from 'pixi.js'

import { GAME_VIEW_CONTAINER_ID } from '../utils/constants'
import { acceptedPlayerMoves } from '../utils/commands'
import { Inputs } from './inputs'

export class Game {
  private app: Application

  private player: Sprite

  public inputs: Inputs = new Inputs()

  constructor() {
    this.app = new Application({
      width: 800,
      height: 600,
      antialias: false,
      autoDensity: true,
      backgroundColor: Number('0xb3b5c6')
    })

    this.player = Sprite.from('src/game/assets/player.png')
    this.player.anchor.set(0.5)
    this.player.x = this.app.view.width / 2
    this.player.y = this.app.view.height / 2

    this.app.stage.addChild(this.player)
  }

  private gameLoop = () => {
    this.updateInputs()
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
  }
}
