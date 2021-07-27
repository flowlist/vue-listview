<template>
  <template v-if="source">
    <!--  flow header  -->
    <slot :source="source" name="header" />
    <!--  flow list  -->
    <slot :result="source.result" :total="source.total" :extra="source.extra" />
    <!--  flow footer  -->
    <slot :source="source" name="footer" />
    <!--  flow listener    -->
    <div ref="shimRef" :style="shimStyle" />
    <!--  flow state： error   -->
    <template v-if="source.error">
      <slot
        v-if="useFirstError && !source.result.length"
        name="first-error"
        :error="source.error"
      >
        出错了
      </slot>
      <slot v-else name="error" :error="source.error">
        <button @click="retry">
          出错了，点击重试
        </button>
      </slot>
    </template>
    <!--  flow state： loading   -->
    <template v-else-if="source.loading">
      <slot
        v-if="useFirstLoading && !source.result.length"
        name="first-loading"
      >
        加载中…
      </slot>
      <slot v-else name="loading">
        加载中…
      </slot>
    </template>
    <!--  flow state： nothing   -->
    <template v-else-if="source.nothing">
      <slot name="nothing">这里什么都没有</slot>
    </template>
    <!--  flow state： no-more   -->
    <template v-else-if="source.noMore">
      <slot v-if="displayNoMore" name="no-more" />
    </template>
    <!--  flow state： normal   -->
    <template v-else-if="!isPagination">
      <slot v-if="!isAuto" name="load">
        <button @click="loadMore()">点击加载更多</button>
      </slot>
    </template>
  </template>
</template>

<script lang="ts">
// @ts-nocheck
import {
  defineComponent,
  ExtractPropTypes,
  ref,
  computed,
  watch,
  onBeforeUnmount,
  onMounted,
  nextTick
} from 'vue'
import { useStore } from 'vuex'
import * as jsCore from '@flowlist/js-core'
import {
  checkInView,
  getObserver,
  addEvent,
  offEvent,
  getScrollParentDom,
  isServer,
  cache
} from './utils'

const LAZY_MODE_SCROLL = 'scroll'
const STORE_DISPATCH = 'dispatch'
const STORE_COMMIT = 'commit'
const NAMESPACE = 'list'
const listViewProps = {
  func: {
    required: true,
    type: [String, Function]
  },
  type: {
    type: String,
    default: jsCore.ENUM.FETCH_TYPE.AUTO,
    validator: (val) => ~jsCore.ENUM.FETCH_TYPE_ARRAY.indexOf(val)
  },
  query: {
    type: Object,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => {}
  },
  autoload: {
    type: Number,
    default: -1,
    validator: (val: any) => val >= -1
  },
  preload: {
    type: Number,
    default: 200,
    validator: (val: any) => val >= 0
  },
  cacheTimeout: {
    type: Number,
    default: 0,
    validator: (val: any) => val >= 0
  },
  uniqueKey: {
    type: String,
    default: jsCore.ENUM.DEFAULT_UNIQUE_KEY_NAME
  },
  scrollX: {
    type: Boolean,
    default: false
  }
}

export type ListViewProps = ExtractPropTypes<typeof listViewProps>

export default defineComponent({
  name: 'ListView',
  props: listViewProps,
  emits: ['success', 'error'],
  async setup(props: ListViewProps, { slots, emit }) {
    const store = useStore()
    const throttle = ref(false)
    const shimRef = ref(null)
    const params = computed(() => ({
      func: props.func,
      type: props.type,
      query: props.query,
      callback: _successCallback,
      uniqueKey: props.uniqueKey,
      cacheTimeout: isServer ? 0 : props.cacheTimeout
    }))
    const useLocal = typeof store?.getters?.[`${NAMESPACE}/get`] !== 'function'

    const source = useLocal
      ? ref(null)
      : store.getters[`${NAMESPACE}/get`](params)

    const isAuto = computed(() => {
      if (!source.value) {
        return props.autoload === -1
      }
      return props.autoload === -1 || props.autoload > source.value.page
    })

    const isPagination = computed(
      () => props.type === jsCore.ENUM.FETCH_TYPE.PAGINATION
    )

    const observer = getObserver()

    const shimStyle = computed(() => {
      const result = {
        zIndex: -1,
        display: 'block !important',
        userSelect: 'none',
        position: 'absolute',
        pointerEvents: 'none',
        background: 'transparent'
      }
      if (props.scrollX) {
        result.right = '0px'
        result.top = '0px'
        result.width = `${props.preload}px`
        result.height = '100%'
      } else {
        result.left = '0px'
        result.bottom = '0px'
        result.width = '100%'
        result.height = `${props.preload}px`
      }
      return result
    })

    const useFirstLoading = computed(() => !!slots['first-loading'])

    const useFirstError = computed(() => !!slots['first-error'])

    const displayNoMore = computed(() => !!slots['no-more'])

    const _initState = () => {
      if (useLocal) {
        source.value = null
      }
      _dataReducer(STORE_COMMIT, 'initState', params)
    }

    const _initFlowLoader = (loop = 0) => {
      if (props.autoload === 0) {
        return
      }
      if (!shimRef.value) {
        if (loop < 10) {
          setTimeout(() => {
            _initFlowLoader(loop + 1)
          }, 100)
        }
        return
      }
      if (checkInView(shimRef.value)) {
        initData()
      }
      if (observer) {
        shimRef.value.__lazy_handler__ = _fetchDataFn
        observer.observe(shimRef.value)
      }
      addEvent(
        getScrollParentDom(shimRef.value, props.scrollX),
        LAZY_MODE_SCROLL,
        _scrollFn
      )
    }

    const _scrollFn = (event, force = false) => {
      if (!force) {
        if (throttle.value) {
          return
        }
        throttle.value = true
        setTimeout(() => {
          throttle.value = false
          _scrollFn(null, true)
        }, 500)
        return
      }
      if (!shimRef.value) {
        return
      }
      if (!checkInView(shimRef.value)) {
        return
      }
      _fetchDataFn()
    }

    const _callMethod = ({ method, id, key, value }) => {
      _dataReducer(STORE_COMMIT, 'updateState', {
        ...params.value,
        id,
        value,
        method,
        changeKey: key,
        uniqueKey: props.uniqueKey
      })
    }

    const _dataReducer = (type, name, data) => {
      if (useLocal) {
        return jsCore[name]({
          getter: () => source.value,
          setter: ({ value, callback }) => {
            if (source.value) {
              Object.keys(value).forEach((key) => {
                source.value[key] = value[key]
              })
            } else {
              source.value = value
            }
            callback && callback()
          },
          cache,
          ...data
        })
      }
      return store[type](`${NAMESPACE}/${name}`, data)
    }

    const _detectLoadMore = () => {
      if (
        !source.value ||
        source.value.nothing ||
        source.value.noMore ||
        source.value.error
      ) {
        return
      }
      // 如果列表的数据没有撑满页面，就继续请求更多
      if (isAuto.value && shimRef.value && checkInView(shimRef.value)) {
        loadMore()
      }
    }

    const _fetchDataFn = () => {
      if (!source.value) {
        return
      }
      if (!isAuto.value) {
        return
      }
      if (source.value.loading || source.value.error) {
        return
      }
      if (
        source.value.fetched &&
        (source.value.noMore || source.value.nothing || isPagination.value)
      ) {
        if (observer) {
          if (!shimRef.value) {
            return
          }
          observer.unobserve(shimRef.value)
          shimRef.value.__lazy_handler__ = undefined
        }
        offEvent(
          getScrollParentDom(shimRef.value, props.scrollX),
          LAZY_MODE_SCROLL,
          _scrollFn
        )
        return
      }
      source.value.fetched ? loadMore() : initData()
    }

    const _successCallback = (data) => {
      if (isServer) {
        return
      }
      emit('success', data)
    }

    const _handleAsyncError = (data) => {
      if (isServer) {
        return
      }
      emit('error', data)
    }

    const reset = (key, value) => {
      _callMethod({ key, value, method: jsCore.ENUM.CHANGE_TYPE.RESET_FIELD })
    }

    const push = (value) => {
      _callMethod({ value, method: jsCore.ENUM.CHANGE_TYPE.RESULT_ADD_AFTER })
    }

    const unshift = (value) => {
      _callMethod({ value, method: jsCore.ENUM.CHANGE_TYPE.RESULT_ADD_BEFORE })
    }

    const patch = (value) => {
      _callMethod({ value, method: jsCore.ENUM.CHANGE_TYPE.RESULT_LIST_MERGE })
    }

    const insertBefore = (id, value) => {
      _callMethod({
        id,
        value,
        method: jsCore.ENUM.CHANGE_TYPE.RESULT_INSERT_TO_BEFORE
      })
    }

    const insertAfter = (id, value) => {
      _callMethod({
        id,
        value,
        method: jsCore.ENUM.CHANGE_TYPE.RESULT_INSERT_TO_AFTER
      })
    }

    const remove = (id) => {
      _callMethod({ id, method: jsCore.ENUM.CHANGE_TYPE.RESULT_REMOVE_BY_ID })
    }

    const search = (id) => {
      if (!source.value) {
        return undefined
      }
      return jsCore.utils.searchValueByKey(
        source.value.result,
        id,
        props.uniqueKey
      )
    }

    const update = (id, key, value) => {
      _callMethod({
        id,
        key,
        value,
        method: jsCore.ENUM.CHANGE_TYPE.RESULT_UPDATE_KV
      })
    }

    const merge = (id, value) => {
      _callMethod({
        id,
        value,
        method: jsCore.ENUM.CHANGE_TYPE.RESULT_ITEM_MERGE
      })
    }

    const jump = (page) => {
      return _dataReducer(STORE_DISPATCH, 'loadMore', {
        ...params.value,
        query: { ...props.query, page }
      })
    }

    const initData = (obj = {}) => {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        try {
          await _dataReducer(STORE_DISPATCH, 'initData', {
            ...params.value,
            query: { ...props.query, ...obj }
          })

          if (isServer) {
            resolve()
            return
          }

          await nextTick()
          _detectLoadMore()

          resolve()
        } catch (e) {
          _handleAsyncError(e)
          resolve()
        }
      })
    }

    const loadMore = (obj = {}) => {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        try {
          await _dataReducer(STORE_DISPATCH, 'loadMore', {
            ...params.value,
            query: { ...props.query, is_up: 0, ...obj }
          })
          resolve()
        } catch (e) {
          _handleAsyncError(e)
          resolve()
        }
      })
    }

    const loadBefore = (obj = {}) => {
      return loadMore({ ...obj, is_up: 1 })
    }

    const refresh = (showLoading = true) => {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        try {
          await _dataReducer(STORE_DISPATCH, 'initData', {
            ...params.value,
            query: {
              ...props.query,
              __refresh__: true,
              __reload__: !showLoading
            }
          })
          _initFlowLoader()
          resolve()
        } catch (e) {
          _handleAsyncError(e)
          resolve()
        }
      })
    }

    const retry = (showLoading = true) => {
      if (source.value && source.value.fetched) {
        return loadMore()
      } else {
        return initData({
          __refresh__: true,
          __reload__: !showLoading
        })
      }
    }

    watch(
      () => props.query,
      async () => {
        await nextTick()
        _initState()
        _initFlowLoader()
      },
      { deep: true }
    )

    _initState()
    onMounted(() => {
      _initFlowLoader()
    })

    onBeforeUnmount(() => {
      if (observer) {
        observer.unobserve(shimRef.value)
        observer.disconnect()
      }
      offEvent(
        getScrollParentDom(shimRef.value, props.scrollX),
        LAZY_MODE_SCROLL,
        _scrollFn
      )
    })

    if (isServer) {
      await initData()
    }

    return {
      shimRef,
      source,
      useFirstLoading,
      useFirstError,
      displayNoMore,
      shimStyle,
      isAuto,
      isPagination,
      reset,
      push,
      unshift,
      patch,
      insertBefore,
      insertAfter,
      remove,
      search,
      update,
      merge,
      jump,
      initData,
      loadMore,
      loadBefore,
      refresh,
      retry
    }
  }
})
</script>
