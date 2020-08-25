<template>
  <div
    class="flow-loader"
    style="position:relative"
  >
    <template v-if="source">
      <!--  flow header  -->
      <slot
        :source="source"
        name="header"
      />
      <!--  flow list  -->
      <slot
        :flow="source.result"
        :total="source.total"
        :count="source.result.length"
        :extra="source.extra"
      />
      <!--  flow footer  -->
      <slot
        :source="source"
        name="footer"
      />
      <!--  flow state  -->
      <div class="flow-loader__state">
        <!--   error   -->
        <div
          v-if="source.error"
          class="flow-loader__state--error"
          @click="_retryData"
        >
          <slot
            v-if="useFirstError && !source.result.length"
            name="first-error"
            :error="source.error"
          >
            <span>出错了，点击重试</span>
          </slot>
          <slot
            v-else
            name="error"
            :error="source.error"
          >
            <span>出错了，点击重试</span>
          </slot>
        </div>
        <!--   loading   -->
        <div
          v-else-if="source.loading"
          class="flow-loader__state--loading"
        >
          <slot
            v-if="useFirstLoading && !source.result.length"
            name="first-loading"
          >
            <span>加载中…</span>
          </slot>
          <slot
            v-else
            name="loading"
          >
            <span>加载中…</span>
          </slot>
        </div>
        <!--   nothing   -->
        <div
          v-else-if="source.nothing"
          class="flow-loader__state--nothing"
        >
          <slot name="nothing">
            <span>这里什么都没有</span>
          </slot>
        </div>
        <!--   no-more   -->
        <div
          v-else-if="source.noMore"
          class="flow-loader__state--no-more"
        >
          <slot
            v-if="displayNoMore"
            name="no-more"
          >
            <span>没有更多了</span>
          </slot>
        </div>
        <!--   normal   -->
        <div
          v-else-if="!isPagination"
          class="flow-loader__state--load"
          @click="loadMore()"
        >
          <div v-if="!isAuto">
            <slot name="load">
              点击加载更多
            </slot>
          </div>
        </div>
      </div>
    </template>
    <div
      v-if="!$isServer"
      ref="shim"
      :style="shimStyle"
      class="flow-loader__shim"
    />
  </div>
</template>

<script>
import { utils, ENUM } from '@flowlist/js-core'
import { checkInView, getObserver } from './utils'
import './polyfill'

export default {
  name: 'FlowLoader',
  props: {
    func: {
      required: true,
      type: String
    },
    type: {
      required: true,
      type: String,
      validator: val => ~ENUM.FETCH_TYPE_ARRAY.indexOf(val)
    },
    query: {
      type: Object,
      default: () => {}
    },
    auto: {
      type: Number,
      default: -1,
      validator: val => val >= -1
    },
    successCallback: {
      type: Function,
      default: undefined,
      validator: val => val === undefined || typeof val === 'function'
    },
    errorCallback: {
      type: Function,
      default: undefined,
      validator: val => val === undefined || typeof val === 'function'
    },
    displayNoMore: {
      type: Boolean,
      default: false
    },
    useFirstError: {
      type: Boolean,
      default: false
    },
    useFirstLoading: {
      type: Boolean,
      default: false
    },
    errorClickRetry: {
      type: Boolean,
      default: true
    },
    preload: {
      type: Number,
      default: 200,
      validator: val => val >= 0
    },
    cacheTimeout: {
      type: Number,
      default: 0,
      validator: val => val >= 0
    },
    namespace: {
      type: String,
      default: 'flow'
    },
    uniqueKey: {
      type: String,
      default: ENUM.DEFAULT_UNIQUE_KEY_NAME
    },
    scrollX: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      firstBind: true
    }
  },
  computed: {
    source() {
      return this.$store.getters[`${this.namespace}/getFlow`](this.params)
    },
    params() {
      return {
        func: this.func,
        type: this.type,
        query: this.query,
        callback: this.successCallback,
        uniqueKey: this.uniqueKey,
        cacheTimeout: this.$isServer ? 0 : this.cacheTimeout
      }
    },
    isAuto() {
      if (!this.source) {
        return this.auto === -1
      }
      return this.auto === -1 || this.auto > this.source.page
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
    }
  },
  watch: {
    query: {
      handler: function () {
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
  beforeDestroy() {
    this.observer.unobserve(this.$refs && this.$refs.shim)
    this.observer.disconnect()
  },
  methods: {
    reset(key, value) {
      this._listMethod({ key, value, method: ENUM.CHANGE_TYPE.RESET_FIELD })
    },
    push(value) {
      this._listMethod({ value, method: ENUM.CHANGE_TYPE.RESULT_ADD_AFTER })
    },
    unshift(value) {
      this._listMethod({ value, method: ENUM.CHANGE_TYPE.RESULT_ADD_BEFORE })
    },
    insertBefore(id, value, uniqueKey) {
      this._itemMethod({ id, uniqueKey, value, method: ENUM.CHANGE_TYPE.RESULT_INSERT_TO_BEFORE })
    },
    insertAfter(id, value, uniqueKey) {
      this._itemMethod({ id, uniqueKey, value, method: ENUM.CHANGE_TYPE.RESULT_INSERT_TO_AFTER })
    },
    patch(value, uniqueKey) {
      this._itemMethod({ uniqueKey, value, method: ENUM.CHANGE_TYPE.RESULT_LIST_MERGE })
    },
    delete(id, uniqueKey) {
      this._itemMethod({ id, uniqueKey, method: ENUM.CHANGE_TYPE.RESULT_REMOVE_BY_ID })
    },
    update(id, changeKey, value) {
      this._itemMethod({ id, changeKey, value, method: ENUM.CHANGE_TYPE.UPDATE_RESULT })
    },
    jump(page) {
      return this.$store.dispatch(
        `${this.namespace}/loadMore`,
        {
          ...this.params,
          query: { ...this.query, page }
        }
      )
    },
    initData(obj = {}) {
      return new Promise(async (resolve) => {
        try {
          await this.$store.dispatch(
            `${this.namespace}/initData`,
            {
              ...this.params,
              query: { ...this.query, ...obj }
            }
          )
          this._detectLoadMore()
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
          await this.$store.dispatch(
            `${this.namespace}/loadMore`,
            {
              ...this.params,
              query
            }
          )
          this._detectLoadMore()
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
          await this.$store.dispatch(
            `${this.namespace}/initData`,
            {
              ...this.params,
              query
            }
          )
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
    _listMethod({ method, key, value }) {
      this.$store.commit(
        `${this.namespace}/UPDATE_DATA`,
        {
          ...this.params,
          value,
          method,
          changeKey: key,
          uniqueKey: this.uniqueKey
        }
      )
    },
    _itemMethod({ method, id, changeKey, uniqueKey, value }) {
      this.$store.commit(
        `${this.namespace}/UPDATE_DATA`,
        {
          ...this.params,
          id,
          value,
          method,
          changeKey,
          uniqueKey: uniqueKey || this.uniqueKey
        }
      )
    },
    _initState() {
      if (this.source) {
        return
      }
      this.$store.commit(`${this.namespace}/INIT_STATE`, this.params)
    },
    _detectLoadMore() {
      // 如果列表的数据没有撑满页面，就继续请求更多
      if (
        this.isAuto &&
        this.$refs.shim &&
        checkInView(this.$refs.shim, this.preload)
      ) {
        this.loadMore()
      }
    },
    _initFlowLoader(loop = 0) {
      if (this.auto === 0) {
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
      if (checkInView(shimDom, this.preload)) {
        this.initData()
      }
      shimDom.__lazy_handler__ = this._fetchDataFunc.bind(this)
      this.observer.observe(shimDom)
    },
    _retryData() {
      if (!this.errorClickRetry) {
        return
      }

      this.source.fetched ? this.loadMore() : this.initData({
        __refresh__: true
      })
    },
    _fireSSRCallback() {
      if (!this.firstBind) {
        return
      }

      this.firstBind = false

      if (!this.source || !this.source.fetched || !this.successCallback) {
        return
      }

      this.successCallback({
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
    _fetchDataFunc() {
      if (!this.source) {
        return
      }

      if (!this.isAuto) {
        return
      }

      if (this.source.loading || this.source.error) {
        return
      }

      if (this.source.noMore || this.source.nothing || (this.isPagination && this.source.fetched)) {
        const shimDom = this.$refs.shim
        if (!shimDom) {
          return
        }
        this.observer.unobserve(shimDom)
        shimDom.__lazy_handler__ = undefined
        return
      }

      this.source.fetched ? this.loadMore() : this.initData()
    },
    _handleAsyncError(error) {
      if (!this.errorCallback) {
        return
      }
      this.errorCallback({
        error
      })
    }
  }
}
</script>
