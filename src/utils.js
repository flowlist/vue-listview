export const isServer = typeof window === 'undefined'

export const getObserver = isServer ? null :
  window.IntersectionObserver &&
  new window.IntersectionObserver((entries) => {
    entries.forEach(({ intersectionRatio, target }) => {
      if (intersectionRatio <= 0 || !target) {
        return
      }
      target.__flow_handler__ && target.__flow_handler__()
    })
  })
