import { EventEmitter as BaseEvent } from '@/utils/event'
import { addEvent, removeEvent } from './dom'

interface EventData {
  name: string
  handler(e: UIEvent): void
  capture?: boolean
}

type Fn = (...args: any[]) => void

export class EventEmitter extends BaseEvent {
  eventTypes: Record<string, string>

  constructor(names?: string[]) {
    super()
    this.eventTypes = {}
    if (names) {
      this.registerTypes(names)
    }
  }

  private registerTypes(names: string[]) {
    names.forEach((type) => {
      this.eventTypes[type] = type
    })
  }

  destroy() {
    super.destroy()
    this.eventTypes = {}
  }
}

export class EventRegister {
  constructor(public wrapper: HTMLElement, public events: EventData[]) {
    this.addDOMEvents()
  }

  private addDOMEvents() {
    this.handlerDOMEvents(addEvent)
  }

  private removeDOMEvents() {
    this.handlerDOMEvents(removeEvent)
  }

  private handlerDOMEvents(eventOpration: Fn) {
    this.events.forEach((event: EventData) => {
      eventOpration(this.wrapper, event.name, event.handler, event.capture)
    })
  }

  destroy() {
    this.removeDOMEvents()
    this.events = []
  }
}
