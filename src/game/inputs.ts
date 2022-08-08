export class Inputs {
  public keys: { [key: string]: boolean } = {
    KeyW: false,
    KeyA: false,
    KeyS: false,
    KeyD: false
  }

  public shoot = false

  public keyUpDependencyFunction: (lastPressedKey: string) => void

  constructor(keyUpDependencyFunction: (lastPressedKey: string) => void) {
    this.keyUpDependencyFunction = keyUpDependencyFunction
  }

  public start = () => {
    window.addEventListener('blur', this.cleanPressedInputs, false)

    // keyboard event handlers
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)
    window.document.addEventListener('mousedown', this.handleMouseDown)
    window.document.addEventListener('mouseup', this.handleMouseUp)
  }

  public stop = () => {
    document.removeEventListener('keydown', this.handleKeyDown)
    document.removeEventListener('keyup', this.handleKeyUp)
    window.document.removeEventListener('mousedown', this.handleMouseDown)
    window.document.removeEventListener('mouseup', this.handleMouseUp)
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

    this.keyUpDependencyFunction(event.code)
  }

  private handleMouseDown = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    this.shoot = true
  }

  private handleMouseUp = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    this.shoot = false
  }

  private cleanPressedInputs = () => {
    this.keys.KeyW = false
    this.keys.KeyA = false
    this.keys.KeyS = false
    this.keys.KeyD = false
    this.shoot = false
  }
}
