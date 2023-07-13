export function addEvent(el: HTMLElement, type: string, fn: () => never, capture = false) {
  el.addEventListener(type, fn, !!capture)
}

export function removeEvent(el: HTMLElement, type: string, fn: () => never, capture = false) {
  el.removeEventListener(type, fn, !!capture)
}
