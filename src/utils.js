export const isServer = typeof window === 'undefined'

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
