import type { setterFuncParams, defaultField } from '@flowlist/js-core'

export const isServer: boolean = typeof window === 'undefined'

export const getter = (state: any) => (name: string): defaultField =>
  state[name]

export const setter = (state: any) => ({
  key,
  type,
  value,
  callback
}: setterFuncParams): void => {
  if (type === 0) {
    state[key] = value
  } else if (type === 1) {
    Object.keys(value).forEach((id) => {
      // eslint-disable-next-line no-prototype-builtins
      if (value.hasOwnProperty(id)) {
        state[key][id] = value[id]
      }
    })
  }
  callback && callback()
}

export const getObserver = () => isServer
  ? null
  : window.IntersectionObserver &&
    new window.IntersectionObserver((entries) => {
      entries.forEach(({ intersectionRatio, target, isIntersecting }) => {
        if (intersectionRatio <= 0 && !isIntersecting) {
          return
        }
        if (!target) {
          return
        }
        ;(target as any).__lazy_handler__ && (target as any).__lazy_handler__()
      })
    })

export const checkInView = (dom: Element): boolean => {
  if (!dom || isServer) {
    return false
  }
  const rect = dom.getBoundingClientRect()
  if (!rect.left && !rect.right && !rect.top && !rect.bottom) {
    return false
  }
  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0 &&
    rect.left < window.innerWidth &&
    rect.right > 0
  )
}

export const getScrollParentDom = (
  dom: Element,
  scrollX: boolean
): Element | Document | null => {
  let el = dom
  if (!el) {
    return null
  }
  while (
    el &&
    el.tagName !== 'HTML' &&
    el.tagName !== 'BOYD' &&
    el.nodeType === 1
  ) {
    const style = (window.getComputedStyle(el) as any)[
      `overflow${scrollX ? 'X' : 'Y'}`
    ]
    if (style === 'scroll' || style === 'auto') {
      if (el.tagName === 'HTML' || el.tagName === 'BODY') {
        return document
      }
      return el
    }
    // @ts-ignore
    el = el.parentNode
  }
  return document
}

/**
 * 事件绑定
 * @param elm
 * @param {string} type
 * @param {function} listener
 */
export const addEvent = (
  elm: Element,
  type: string,
  listener: () => {}
): void => {
  elm.addEventListener(type, listener, {
    capture: false,
    passive: true
  })
}

/**
 * 事件解绑
 * @param elm
 * @param {string} type
 * @param {function} listener
 */
export const offEvent = (
  elm: Element,
  type: string,
  listener: () => {}
): void => {
  ;(elm as any).removeEventListener(type, listener, {
    capture: false,
    passive: true
  })
}

export const requestIdleCallback = isServer
    ? null
    : (cb: any, { timeout } = { timeout: 1 }) => {
      if ((window as any).requestIdleCallback) {
        (window as any).requestIdleCallback(cb, { timeout })
      } else {
        const start = Date.now()
        setTimeout(function () {
          cb({
            didTimeout: false,
            timeRemaining: function () {
              return Math.max(0, 50 - (Date.now() - start))
            }
          })
        }, timeout)
      }
    }
