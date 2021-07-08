<template>
  <div ref="elRef" class="list-view" style="position:relative">
    <template v-if="source">
      <!--  flow header  -->
      <slot :source="source" name="header" />
      <!--  flow list  -->
      <slot
        :list="source.result"
        :total="source.total"
        :count="source.result.length"
        :extra="source.extra"
      />
      <!--  flow footer  -->
      <slot :source="source" name="footer" />
      <!--  flow state  -->
      <div class="list-view__state">
        <!--   error   -->
        <template v-if="source.error">
          <div
            v-if="useFirstError && !source.result.length"
            class="list-view__state--first-error"
          >
            <slot name="first-error" :error="source.error">
              出错了
            </slot>
          </div>
          <div v-else class="list-view__state--error" @click="retry">
            <slot name="error" :error="source.error">
              出错了，点击重试
            </slot>
          </div>
        </template>
        <!--   loading   -->
        <template v-else-if="source.loading">
          <div
            v-if="useFirstLoading && !source.result.length"
            class="list-view__state--first-loading"
          >
            <slot name="first-loading">
              加载中…
            </slot>
          </div>
          <div v-else class="list-view__state--loading">
            <slot name="loading">
              加载中…
            </slot>
          </div>
        </template>
        <!--   nothing   -->
        <div v-else-if="source.nothing" class="list-view__state--nothing">
          <slot name="nothing">
            这里什么都没有
          </slot>
        </div>
        <!--   no-more   -->
        <div v-else-if="source.noMore" class="list-view__state--no-more">
          <slot v-if="displayNoMore" name="no-more" />
        </div>
        <!--   normal   -->
        <div
          v-else-if="!isPagination"
          class="list-view__state--load"
          @click="loadMore()"
        >
          <slot v-if="!isAuto" name="load">
            点击加载更多
          </slot>
        </div>
      </div>
    </template>
    <div ref="shimRef" :style="shimStyle" class="list-view__shim" />
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import {
  defineComponent,
  ExtractPropTypes,
  ref,
  reactive,
  computed,
  watch,
  onBeforeUnmount,
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
  },
  useLocal: {
    type: Boolean,
    default: false
  }
}

export type ListViewProps = ExtractPropTypes<typeof listViewProps>

export default defineComponent({
  name: 'ListView',
  props: listViewProps,
  emits: ['success', 'error'],
  setup(props: ListViewProps, ctx) {
    const store = useStore()
    const throttle = ref(false)
    const shimRef = ref(null)
    const elRef = ref(null)
    const params = computed(() => ({
      func: props.func,
      type: props.type,
      query: props.query,
      callback: _successCallback,
      uniqueKey: props.uniqueKey,
      cacheTimeout: isServer ? 0 : props.cacheTimeout
    }))

    const source = props.useLocal
      ? reactive(jsCore.utils.generateDefaultField())
      : store.getters[`${NAMESPACE}/get`](params)

    const isAuto = computed(() => {
      if (!source) {
        return props.autoload === -1
      }
      return props.autoload === -1 || props.autoload > source.page
    })

    const isPagination = computed(
      () => props.type === jsCore.ENUM.FETCH_TYPE.PAGINATION
    )

    const observer = getObserver()

    const shimStyle = computed(() => {
      const result = {
        zIndex: -1,
        userSelect: 'none',
        position: 'absolute',
        pointerEvents: 'none',
        background: 'transparent'
      }
      if (props.scrollX) {
        result.right = 0
        result.top = 0
        result.width = `${props.preload}px`
        result.height = '100%'
      } else {
        result.left = 0
        result.bottom = 0
        result.width = '100%'
        result.height = `${props.preload}px`
      }
      return result
    })

    const useFirstLoading = computed(() => !!ctx.slots['first-loading'])

    const useFirstError = computed(() => !!ctx.slots['first-error'])

    const displayNoMore = computed(() => !!ctx.slots['no-more'])

    const _initState = () => {
      if (source) {
        return
      }
      _dataReducer(STORE_COMMIT, 'initState', params)
    }

    const _initFlowLoader = (loop = 0) => {
      if (props.autoload === 0) {
        return
      }
      if (isServer) {
        initData()
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
        getScrollParentDom(elRef, props.scrollX),
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
      if (props.useLocal) {
        return jsCore[name]({
          getter: () => source,
          setter: ({ value, callback }) => {
            Object.keys(value).forEach((key) => {
              source[key] = value[key]
            })
            callback && callback()
          },
          cache,
          ...data
        })
      }
      return store[type](`${NAMESPACE}/${name}`, data)
    }

    const _detectLoadMore = () => {
      if (!source || source.nothing || source.noMore || source.error) {
        return
      }
      // 如果列表的数据没有撑满页面，就继续请求更多
      if (isAuto.value && shimRef.value && checkInView(shimRef.value)) {
        loadMore()
      }
    }

    const _fetchDataFn = () => {
      if (!source) {
        return
      }
      if (!isAuto.value) {
        return
      }
      if (source.loading || source.error) {
        return
      }
      if (
        source.fetched &&
        (source.noMore || source.nothing || isPagination.value)
      ) {
        if (observer) {
          if (!shimRef.value) {
            return
          }
          observer.unobserve(shimRef.value)
          shimRef.value.__lazy_handler__ = undefined
        }
        offEvent(
          getScrollParentDom(elRef.value, props.scrollX),
          LAZY_MODE_SCROLL,
          _scrollFn
        )
        return
      }
      source.fetched ? loadMore() : initData()
    }

    const _handleAsyncError = (error) => {
      ctx.emit('error', { error })
    }

    const _successCallback = (data) => {
      ctx.emit('success', data)
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
      if (!source) {
        return undefined
      }
      return jsCore.utils.searchValueByKey(source.result, id, props.uniqueKey)
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
      return new Promise(async (resolve) => {
        const query = { ...props.query }
        query.__refresh__ = true
        query.__reload__ = !showLoading
        try {
          await _dataReducer(STORE_DISPATCH, 'initData', {
            ...params.value,
            query
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
      if (source.fetched) {
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
        if (source) {
          return
        }
        await nextTick()
        _initState()
        _initFlowLoader()
      },
      { deep: true }
    )

    onBeforeUnmount(() => {
      if (observer) {
        observer.unobserve(shimRef.value)
        observer.disconnect()
      }
      offEvent(
        getScrollParentDom(elRef.value, props.scrollX),
        LAZY_MODE_SCROLL,
        _scrollFn
      )
    })

    _initState()
    _initFlowLoader()

    return {
      elRef,
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
