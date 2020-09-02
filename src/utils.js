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

export const cache = {
  set({ key, value, timeout }) {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(this.key(key), JSON.stringify(value))
        localStorage.setItem(this.key(key, true), Date.now() + timeout * 1000)
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  },

  get({ key }) {
    return new Promise((resolve, reject) => {
      try {
        const expiredAt = localStorage.getItem(this.key(key, true))
        const cacheStr = localStorage.getItem(this.key(key))
        if (!expiredAt || !cacheStr || Date.now() - expiredAt > 0) {
          this.del(key)
          reject(null)
          return
        }
        resolve(JSON.parse(cacheStr))
      } catch (e) {
        this.del(key)
        reject(e)
      }
    })
  },

  del({ key }) {
    localStorage.removeItem(this.key(key))
    localStorage.removeItem(this.key(key, true))
  },

  key(key, expired = false) {
    return `listview-${key}${expired ? '-t' : ''}`
  }
}

export const getObserver = isServer ? null :
  window.IntersectionObserver &&
  new window.IntersectionObserver((entries) => {
    entries.forEach(({ intersectionRatio, target }) => {
      if (intersectionRatio <= 0 || !target) {
        return
      }
      target.__lazy_handler__ && target.__lazy_handler__()
    })
  })

export const checkInView = (dom, preload) => {
  if (!dom || isServer) {
    return false
  }
  const rect = dom.getBoundingClientRect()
  if (!rect.left && !rect.right && !rect.top && !rect.bottom) {
    return false
  }
  return (
    rect.top < window.innerHeight + preload &&
    rect.bottom + preload > 0 &&
    rect.left < window.innerWidth + preload &&
    rect.right + preload > 0
  )
}
