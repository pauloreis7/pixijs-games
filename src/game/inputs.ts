export class Inputs {
  public keys: { [key: string]: boolean } = {
    KeyW: false,
    KeyA: false,
    KeyS: false,
    KeyD: false
  }

  public start = () => {
    window.addEventListener('blur', this.cleanPressedKeys, false)

    // keyboard event handlers
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)
  }

  public stop = () => {
    document.removeEventListener('keydown', this.handleKeyDown)
    document.removeEventListener('keyup', this.handleKeyUp)
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    event.preventDefault()
    event.stopPropagation()

    this.keys[event.code] = true
  }

  private handleKeyUp = (event: KeyboardEvent) => {
    event.preventDefault()
    event.stopPropagation()

    this.keys[event.code] = false
  }

  private cleanPressedKeys = () => {
    this.keys.KeyW = false
    this.keys.KeyA = false
    this.keys.KeyS = false
    this.keys.KeyD = false
  }
}
