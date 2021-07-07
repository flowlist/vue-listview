import {
  initState,
  initData,
  loadMore,
  updateState,
  utils
} from '@flowlist/js-core'
import type { loadMoreType, initDataType, updateStateType, generateFieldProps, defaultField } from '@flowlist/js-core'
import { setter, getter, cache } from './utils'

type vueStateType = { state: any }

export default ({ api }: { api: any[] }): any => ({
  namespaced: true,
  state: () => ({}),
  actions: {
    initData(
      { state }: vueStateType,
      { func, type, query, uniqueKey, callback, cacheTimeout }: initDataType
    ): Promise<any> {
      return initData({
        getter: getter(state),
        setter: setter(state),
        cache,
        api,
        func,
        type,
        query,
        uniqueKey,
        callback,
        cacheTimeout
      })
    },
    loadMore(
      { state }: vueStateType,
      { type, func, query, uniqueKey, errorRetry, callback, cacheTimeout }: loadMoreType
    ): Promise<any> {
      return loadMore({
        getter: getter(state),
        setter: setter(state),
        cache,
        api,
        func,
        type,
        query,
        uniqueKey,
        errorRetry,
        callback,
        cacheTimeout
      })
    }
  },
  mutations: {
    INIT_STATE(state: any, { func, type, query }: generateFieldProps): void {
      initState({
        getter: getter(state),
        setter: setter(state),
        func,
        type,
        query
      })
    },
    UPDATE_DATA(
      state: any,
      {
        type,
        func,
        query,
        id,
        method,
        changeKey,
        value,
        cacheTimeout,
        uniqueKey
      }: updateStateType
    ): void {
      updateState({
        getter: getter(state),
        setter: setter(state),
        cache,
        type,
        func,
        query,
        method,
        value,
        id,
        uniqueKey,
        changeKey,
        cacheTimeout
      })
    }
  },
  getters: {
    get: (state: any) => ({ func, type, query }: generateFieldProps): defaultField =>
      state[utils.generateFieldName({ func, type, query })]
  }
})
