import Vue from 'vue'

export const isServer = typeof window === 'undefined'

export const getter = state => name => state[name]

export const setter = state => ({ key, type, value, callback }) => {
  if (type === 0) {
    Vue.set(state, key, value)
  } else if (type === 1) {
    Vue.set(state, key, {
      ...(state[key] || {}),
      ...value
    })
  }
  callback && callback()
}

export const getObserver = isServer ? null :
  window.IntersectionObserver &&
  new window.IntersectionObserver((entries) => {
    entries.forEach(({ intersectionRatio, target, isIntersecting }) => {
      if (intersectionRatio <= 0 && !isIntersecting) {
        return
      }
      if (!target) {
        return
      }
      target.__lazy_handler__ && target.__lazy_handler__()
    })
  })

export const checkInView = dom => {
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

export const getScrollParentDom = (dom, scrollX) => {
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
    const style = window.getComputedStyle(el)[`overflow${scrollX ? 'X' : 'Y'}`]
    if (style === 'scroll' || style === 'auto') {
      if (el.tagName === 'HTML' || el.tagName === 'BODY') {
        return document
      }
      return el
    }
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
export const addEvent = (elm, type, listener) => {
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
export const offEvent = (elm, type, listener) => {
  elm.removeEventListener(type, listener, {
    capture: false,
    passive: true
  })
}
