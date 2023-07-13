import { Transition } from './Transition'

export interface IPoint {
  x: number
  y: number
}

export { Transition as Animator }

export default function createAnimator(content: HTMLElement) {
  return new Transition(content)
}
