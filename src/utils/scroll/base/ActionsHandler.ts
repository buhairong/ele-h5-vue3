import { EventEmitter, EventRegister } from '../shared-utils/event'

export default class ActionsHandler {
  hooks: EventEmitter
  wrapperEventRegister!: EventRegister
  ponitX!: number
  ponitY!: number

  constructor(public wrapper: HTMLElement) {
    this.hooks = new EventEmitter(['beforeStart', 'start', 'move', 'end'])
    this.handleDOMEvents()
  }

  private handleDOMEvents() {
    const wrapperEvents = [
      {
        name: 'touchstart',
        handler: this.start.bind(this)
      },
      {
        name: 'touchmove',
        handler: this.move.bind(this)
      },
      {
        name: 'touchend',
        handler: this.end.bind(this)
      },
      {
        name: 'touchcancel',
        handler: this.end.bind(this)
      }
    ]
    this.wrapperEventRegister = new EventRegister(this.wrapper, wrapperEvents)
  }

  private start(e: TouchEvent) {
    this.hooks.emit(this.hooks.eventTypes.beforeStart, e)
    const point = e.touches[0]
    this.ponitX = point.pageX
    this.ponitY = point.pageY
    this.hooks.emit(this.hooks.eventTypes.start, e)
  }

  private move(e: TouchEvent) {
    const point = e.touches[0]
    const deltaX = point.pageX - this.ponitX
    const deltaY = point.pageY - this.ponitY
    this.ponitX = point.pageX
    this.ponitY = point.pageY
    this.hooks.emit(this.hooks.eventTypes.move, deltaX, deltaY, e)
  }

  private end(e: TouchEvent) {
    this.hooks.emit(this.hooks.eventTypes.end, e)
  }

  destroy() {
    this.hooks.destroy()
    this.wrapperEventRegister.destroy()
  }
}
