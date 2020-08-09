import { initState, initData, loadMore, updateState, utils } from '@flowlist/js-core'
import { setter, getter, cache } from './utils'

export default ({ api }) => ({
  namespaced: true,
  state: () => ({}),
  actions: {
    initData({ state }, { func, type, query, uniqueKey, callback, cacheTimeout }) {
      return initData({
        getter: getter(state), setter: setter(state), cache,
        api, func, type, query, uniqueKey, callback, cacheTimeout
      })
    },
    loadMore({ state }, { type, func, query, uniqueKey, errorRetry, callback, cacheTimeout }) {
      return loadMore({
        getter: getter(state), setter: setter(state), cache,
        api, func, type, query, uniqueKey, errorRetry, callback, cacheTimeout
      })
    }
  },
  mutations: {
    INIT_STATE(state, { func, type, query }) {
      initState({
        getter: getter(state), setter: setter(state),
        func, type, query
      })
    },
    UPDATE_DATA(state, { type, func, query, id, method, changeKey, value, cacheTimeout, uniqueKey }) {
      updateState({
        getter: getter(state), setter: setter(state), cache,
        type, func, query, method, value, id, uniqueKey, changeKey, cacheTimeout
      })
    }
  },
  getters: {
    getFlow: state => ({ func, type, query }) => state[utils.generateFieldName({ func, type, query })]
  }
})
