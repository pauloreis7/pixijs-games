import { Application, Sprite } from 'pixi.js'

import { GAME_VIEW_CONTAINER_ID, PLAYER_SPEED } from '../utils/constants'
import { Inputs } from './inputs'

export class Game {
  // PIXI application
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
    if (this.inputs.keys.KeyW && this.player.y - 18 >= 0) {
      this.player.y -= PLAYER_SPEED
    }

    if (this.inputs.keys.KeyA && this.player.x - 14 >= 0) {
      this.player.x -= PLAYER_SPEED
    }

    if (this.inputs.keys.KeyS && this.player.y + 19 < this.app.view.height) {
      this.player.y += PLAYER_SPEED
    }

    if (this.inputs.keys.KeyD && this.player.x + 14 < this.app.view.width) {
      this.player.x += PLAYER_SPEED
    }
  }
}
