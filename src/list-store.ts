import {
  initState,
  initData,
  loadMore,
  updateState,
  utils
} from '@flowlist/js-core'
import type { loadMoreType, initDataType, updateStateType, generateFieldProps, defaultField } from '@flowlist/js-core'
import { setter, getter } from './utils'

type vueStateType = { state: any }

export default ({ api }: { api: any[] }): any => ({
  namespaced: true,
  state: () => ({}),
  actions: {
    initData(
      { state }: vueStateType,
      { func, type, query, uniqueKey, callback }: initDataType
    ): Promise<any> {
      return initData({
        getter: getter(state),
        setter: setter(state),
        api,
        func,
        type,
        query,
        uniqueKey,
        callback
      })
    },
    loadMore(
      { state }: vueStateType,
      { type, func, query, uniqueKey, errorRetry, callback }: loadMoreType
    ): Promise<any> {
      return loadMore({
        getter: getter(state),
        setter: setter(state),
        api,
        func,
        type,
        query,
        uniqueKey,
        errorRetry,
        callback
      })
    }
  },
  mutations: {
    initState(state: any, { func, type, query }: generateFieldProps): void {
      initState({
        getter: getter(state),
        setter: setter(state),
        func,
        type,
        query
      })
    },
    updateState(
      state: any,
      {
        type,
        func,
        query,
        id,
        method,
        changeKey,
        value,
        uniqueKey
      }: updateStateType
    ): void {
      updateState({
        getter: getter(state),
        setter: setter(state),
        type,
        func,
        query,
        method,
        value,
        id,
        uniqueKey,
        changeKey
      })
    }
  },
  getters: {
    get: (state: any) => ({ func, type, query }: generateFieldProps): defaultField =>
      state[utils.generateFieldName({ func, type, query })]
  }
})
