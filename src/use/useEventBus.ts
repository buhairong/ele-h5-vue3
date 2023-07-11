import { EventEmitter } from '@/utils/event'

let eventBus: EventEmitter

export const useEventBus = () => {
  if (!eventBus) {
    eventBus = new EventEmitter()
  }

  return eventBus
}
