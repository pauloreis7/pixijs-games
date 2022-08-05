import { Application } from 'pixi.js'

import { GAME_VIEW_CONTAINER_ID } from '../utils/constants'

export class Game {
  // PIXI application
  private app: Application

  constructor() {
    this.app = new Application({
      width: 800,
      height: 600,
      antialias: false,
      autoDensity: true,
      backgroundColor: Number('0xffffff')
    })
  }

  start() {
    const gameViewContainer = document.getElementById(GAME_VIEW_CONTAINER_ID)

    if (!gameViewContainer) {
      return
    }

    gameViewContainer.appendChild(this.app.view)
  }
}
