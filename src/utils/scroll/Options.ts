interface BaseOptions {
  scrollX: boolean
  scrollY: boolean
  momentum: boolean
  momentumLimitTime: number
  momentumLimitDistance: number
  swipeTime: number
  swipeBounceTime: number
  deceleration: number
  outOfBoundaryDampingFactor: number
}

export interface Options extends BaseOptions {
  [key: string]: unknown
  startX: number
  startY: number
}

export type BehaviorOptions = BaseOptions

export class OptionsConstructor implements Options {
  [key: string]: unknown
  startX: number
  startY: number
  scrollX: boolean
  scrollY: boolean
  momentum: boolean
  momentumLimitTime: number
  momentumLimitDistance: number
  swipeTime: number
  swipeBounceTime: number
  deceleration: number
  outOfBoundaryDampingFactor: number

  constructor() {
    // Behavior
    this.bounce = {
      top: true,
      bottom: true,
      left: true,
      right: true
    }
    this.scrollX = true
    this.scrollY = true
    this.momentum = true
    this.momentumLimitTime = 300
    this.momentumLimitDistance = 15
    this.swipeTime = 2500
    this.swipeBounceTime = 500
    this.deceleration = 0.0015
    this.outOfBoundaryDampingFactor = 1 / 3

    this.startX = 0
    this.startY = 0
    this.bounceTime = 800
  }

  merge(options?: Options) {
    for (const key in options) {
      this[key] = options[key]
    }
    return this
  }
}
