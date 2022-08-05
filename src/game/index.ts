import { Application, InteractionEvent, Sprite } from 'pixi.js'

import { GAME_VIEW_CONTAINER_ID } from '../utils/constants'

export class Game {
  // PIXI application
  private app: Application

  private player: Sprite

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

    this.app.stage.interactive = true
    this.app.stage.on('pointermove', (event: InteractionEvent) =>
      this.movePlayer(event)
    )
  }

  start() {
    const gameViewContainer = document.getElementById(GAME_VIEW_CONTAINER_ID)

    if (!gameViewContainer) {
      return
    }

    gameViewContainer.appendChild(this.app.view)
  }

  movePlayer(event: InteractionEvent) {
    const pointerPosition = event.data.global

    this.player.x = pointerPosition.x
    this.player.y = pointerPosition.y
  }
}
