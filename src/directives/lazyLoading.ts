import type { App, DirectiveBinding } from 'vue'

const vLazy = (observer: IntersectionObserver) => {
  return {
    beforeMount: (el: HTMLImageElement, binding: DirectiveBinding) => {
      el.classList.add('op-lazyload')
      const { value } = binding
      el.dataset.origin = value
      observer.observe(el)
    }
  }
}

const lazyPlugin = {
  install(app: App) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((item) => {
          if (item.isIntersecting) {
            const el = item.target as HTMLImageElement
            el.src = el.dataset.origin as string
            el.classList.remove('op-lazyload')
            observer.unobserve(el)
          }
        })
      },
      {
        rootMargin: '0px 0px -100px 0px'
      }
    )
    app.directive('lazy', vLazy(observer))
  }
}

export default lazyPlugin
