<template>
  <div class="list-view" style="position:relative">
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
    <div ref="shim" :style="shimStyle" class="list-view__shim" />
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { defineComponent, ExtractPropTypes } from 'vue'
import { utils, ENUM } from '@flowlist/js-core'
import {
  checkInView,
  getObserver,
  addEvent,
  offEvent,
  getScrollParentDom,
  isServer
} from './utils'

const LAZY_MODE_SCROLL = 'scroll'
const NAMESPACE = 'list'
const listViewProps = {
  func: {
    required: true,
    type: [String, Function]
  },
  type: {
    type: String,
    default: ENUM.FETCH_TYPE.AUTO,
    validator: (val) => ~ENUM.FETCH_TYPE_ARRAY.indexOf(val)
  },
  query: {
    type: Object,
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
    default: ENUM.DEFAULT_UNIQUE_KEY_NAME
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
  data() {
    return {
      firstBind: true,
      throttle: false
    }
  },
  computed: {
    source() {
      return this.$store.getters[`${NAMESPACE}/get`](this.params)
    },
    params() {
      return {
        func: this.func,
        type: this.type,
        query: this.query,
        callback: this._successCallback,
        uniqueKey: this.uniqueKey,
        cacheTimeout: isServer ? 0 : this.cacheTimeout
      }
    },
    isAuto() {
      if (!this.source) {
        return this.autoload === -1
      }
      return this.autoload === -1 || this.autoload > this.source.page
    },
    isPagination() {
      return this.type === ENUM.FETCH_TYPE.PAGINATION
    },
    observer() {
      return getObserver
    },
    shimStyle() {
      const result = {
        zIndex: -1,
        userSelect: 'none',
        position: 'absolute',
        pointerEvents: 'none',
        background: 'transparent'
      }
      if (this.scrollX) {
        result.right = 0
        result.top = 0
        result.width = `${this.preload}px`
        result.height = '100%'
      } else {
        result.left = 0
        result.bottom = 0
        result.width = '100%'
        result.height = `${this.preload}px`
      }
      return result
    },
    useFirstLoading() {
      return !!this.$slots['first-loading']
    },
    useFirstError() {
      return !!this.$slots['first-error']
    },
    displayNoMore() {
      return !!this.$slots['no-more']
    }
  },
  watch: {
    query: {
      handler: function() {
        if (this.source) {
          return
        }
        this.$nextTick(() => {
          setTimeout(() => {
            this._initState()
            this._initFlowLoader()
          }, 0)
        })
      },
      deep: true
    }
  },
  mounted() {
    this._fireSSRCallback()
    this._initState()
    this._initFlowLoader()
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.unobserve(this.$refs && this.$refs.shim)
      this.observer.disconnect()
    }
    offEvent(
      getScrollParentDom(this.$el, this.scrollX),
      LAZY_MODE_SCROLL,
      this._scrollFn
    )
  },
  methods: {
    reset(key, value) {
      this._callMethod({ key, value, method: ENUM.CHANGE_TYPE.RESET_FIELD })
    },
    push(value) {
      this._callMethod({ value, method: ENUM.CHANGE_TYPE.RESULT_ADD_AFTER })
    },
    unshift(value) {
      this._callMethod({ value, method: ENUM.CHANGE_TYPE.RESULT_ADD_BEFORE })
    },
    patch(value) {
      this._callMethod({ value, method: ENUM.CHANGE_TYPE.RESULT_LIST_MERGE })
    },
    insertBefore(id, value) {
      this._callMethod({
        id,
        value,
        method: ENUM.CHANGE_TYPE.RESULT_INSERT_TO_BEFORE
      })
    },
    insertAfter(id, value) {
      this._callMethod({
        id,
        value,
        method: ENUM.CHANGE_TYPE.RESULT_INSERT_TO_AFTER
      })
    },
    delete(id) {
      this._callMethod({ id, method: ENUM.CHANGE_TYPE.RESULT_REMOVE_BY_ID })
    },
    search(id) {
      if (!this.source) {
        return undefined
      }
      return utils.searchValueByKey(this.source.result, id, this.uniqueKey)
    },
    update(id, key, value) {
      this._callMethod({
        id,
        key,
        value,
        method: ENUM.CHANGE_TYPE.RESULT_UPDATE_KV
      })
    },
    merge(id, value) {
      this._callMethod({
        id,
        value,
        method: ENUM.CHANGE_TYPE.RESULT_ITEM_MERGE
      })
    },
    jump(page) {
      return this.$store.dispatch(`${NAMESPACE}/loadMore`, {
        ...this.params,
        query: { ...this.query, page }
      })
    },
    initData(obj = {}) {
      return new Promise(async (resolve) => {
        try {
          await this.$store.dispatch(`${NAMESPACE}/initData`, {
            ...this.params,
            query: { ...this.query, ...obj }
          })
          this.$nextTick(() => {
            this._detectLoadMore()
          })
          resolve()
        } catch (e) {
          this._handleAsyncError(e)
          resolve()
        }
      })
    },
    loadMore(obj = {}) {
      return new Promise(async (resolve) => {
        const query = { ...this.query, is_up: 0, ...obj }
        try {
          await this.$store.dispatch(`${NAMESPACE}/loadMore`, {
            ...this.params,
            query
          })
          resolve()
        } catch (e) {
          this._handleAsyncError(e)
          resolve()
        }
      })
    },
    loadBefore(obj = {}) {
      return this.loadMore({ ...obj, is_up: 1 })
    },
    refresh(showLoading = true) {
      return new Promise(async (resolve) => {
        const query = { ...this.query }
        query.__refresh__ = true
        query.__reload__ = !showLoading
        try {
          await this.$store.dispatch(`${NAMESPACE}/initData`, {
            ...this.params,
            query
          })
          this._initFlowLoader()
          resolve()
        } catch (e) {
          this._handleAsyncError(e)
          resolve()
        }
      })
    },
    retry(showLoading = true) {
      if (this.source.fetched) {
        return this.loadMore()
      } else {
        return this.initData({
          __refresh__: true,
          __reload__: !showLoading
        })
      }
    },
    _callMethod({ method, id, key, value }) {
      this.$store.commit(`${NAMESPACE}/UPDATE_DATA`, {
        ...this.params,
        id,
        value,
        method,
        changeKey: key,
        uniqueKey: this.uniqueKey
      })
    },
    _initState() {
      if (this.source) {
        return
      }
      this.$store.commit(`${NAMESPACE}/INIT_STATE`, this.params)
    },
    _detectLoadMore() {
      if (
        !this.source ||
        this.source.nothing ||
        this.source.noMore ||
        this.source.error
      ) {
        return
      }
      // 如果列表的数据没有撑满页面，就继续请求更多
      if (this.isAuto && this.$refs.shim && checkInView(this.$refs.shim)) {
        this.loadMore()
      }
    },
    _initFlowLoader(loop = 0) {
      if (this.autoload === 0) {
        return
      }
      const shimDom = this.$refs.shim
      if (!shimDom) {
        if (loop < 10) {
          setTimeout(() => {
            this._initFlowLoader(loop + 1)
          }, 100)
        }
        return
      }
      if (checkInView(shimDom)) {
        this.initData()
      }
      if (this.observer) {
        shimDom.__lazy_handler__ = this._fetchDataFn.bind(this)
        this.observer.observe(shimDom)
      }
      addEvent(
        getScrollParentDom(this.$el, this.scrollX),
        LAZY_MODE_SCROLL,
        this._scrollFn
      )
    },
    _fireSSRCallback() {
      if (!this.firstBind) {
        return
      }
      this.firstBind = false
      if (!this.source || !this.source.fetched) {
        return
      }
      this._successCallback({
        params: utils.generateRequestParams({
          field: { fetched: false },
          uniqueKey: this.uniqueKey,
          query: this.query,
          type: this.type
        }),
        data: {
          result: this.source.result,
          extra: this.source.extra,
          noMore: this.source.noMore,
          total: this.source.total
        },
        refresh: false
      })
    },
    _fetchDataFn() {
      if (!this.source) {
        return
      }
      if (!this.isAuto) {
        return
      }
      if (this.source.loading || this.source.error) {
        return
      }
      if (
        this.source.fetched &&
        (this.source.noMore || this.source.nothing || this.isPagination)
      ) {
        if (this.observer) {
          const shimDom = this.$refs.shim
          if (!shimDom) {
            return
          }
          this.observer.unobserve(shimDom)
          shimDom.__lazy_handler__ = undefined
        }
        offEvent(
          getScrollParentDom(this.$el, this.scrollX),
          LAZY_MODE_SCROLL,
          this._scrollFn
        )
        return
      }
      this.source.fetched ? this.loadMore() : this.initData()
    },
    _scrollFn(event, force = false) {
      if (!force) {
        if (this.throttle) {
          return
        }
        this.throttle = true
        setTimeout(() => {
          this.throttle = false
          this._scrollFn(null, true)
        }, 500)
        return
      }
      const shimDom = this.$refs.shim
      if (!shimDom) {
        return
      }
      if (!checkInView(shimDom)) {
        return
      }
      this._fetchDataFn()
    },
    _handleAsyncError(error) {
      this.$emit('error', { error })
    },
    _successCallback(data) {
      this.$emit('success', data)
    }
  }
})
</script>
