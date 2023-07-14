export default class Scroller {
  constructor(public wrapper: HTMLElement, public content: HTMLElement, public options: Options) {
    this.hooks = new EventEmitter(['beforeScroll', 'scrollStart', 'scroll', 'end', 'scrollEnd'])
    const { left, right, top, bottom } = options.bounce as any
    this.scrollBehaviorX = new Behavior(
      wrapper,
      content,
      createBehaviorOptions(options, 'scrollX', [left, right], {
        size: 'width'
      })
    )
    this.scrollBehaviorY = new Behavior(
      wrapper,
      content,
      createBehaviorOptions(options, 'scrollY', [top, bottom], {
        size: 'height'
      })
    )
    this.actionsHandler = new ActionsHanlder(this.wrapper)
    this.animater = createAnimater(content)
    this.actions = new ScrollerActions(
      this.scrollBehaviorX,
      this.scrollBehaviorY,
      this.actionsHandler,
      this.animater,
      this.options
    )

    // 用于处理惯性划动到边缘时，列表回弹效果
    this.registerTransitionEnd()
    this.init()
  }
}
