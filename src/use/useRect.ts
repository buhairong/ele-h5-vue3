import type { Ref } from 'vue'
import { unref } from 'vue'

const isWindow = (val: unknown) => val === window

export const useRect = (elementOrRef: Element | Window | Ref<Element | Window>) => {
  const element = unref(elementOrRef)

  if (isWindow(element)) {
    const { innerWidth, innerHeight } = element as Window
    return makeDOMRect(innerWidth, innerHeight)
  }
}
