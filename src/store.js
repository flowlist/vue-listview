import { initState, initData, loadMore, updateState, utils } from '@flowlist/js-core'
import { setter, getter } from './utils'

export default ({ api }) => ({
  namespaced: true,
  state: () => ({}),
  actions: {
    initData({ state }, { func, type, query, uniqueKey, callback }) {
      return initData({
        getter: getter(state), setter: setter(state),
        api, func, type, query, uniqueKey, callback
      })
    },
    loadMore({ state }, { type, func, query, uniqueKey, errorRetry, callback }) {
      return loadMore({
        getter: getter(state), setter: setter(state),
        api, func, type, query, uniqueKey, errorRetry, callback
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
    UPDATE_DATA(state, { type, func, query, id, method, changeKey, value, uniqueKey }) {
      updateState({
        getter: getter(state), setter: setter(state),
        type, func, query, method, value, id, uniqueKey, changeKey
      })
    }
  },
  getters: {
    get: state => ({ func, type, query }) => state[utils.generateFieldName({ func, type, query })]
  }
})
