<template>
  <div class="flow-loader">
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
    </template>
    <!--  flow state  -->
    <div
      ref="state"
      class="flow-loader-state"
      :style="{ textAlign: 'center', minHeight: '1px' }"
    >
      <template v-if="source">
        <!--   error   -->
        <div
          v-if="source.error"
          class="flow-loader-state-error"
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
          class="flow-loader-state-loading"
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
          class="flow-loader-state-nothing"
        >
          <slot name="nothing">
            <span>这里什么都没有</span>
          </slot>
        </div>
        <!--   no-more   -->
        <div
          v-else-if="source.noMore"
          class="flow-loader-state-no-more"
        >
          <slot
            v-if="displayNoMore"
            name="no-more"
          >
            <span>没有更多了</span>
          </slot>
        </div>
        <!--   normal   -->
        <template v-else-if="!isPagination">
          <div
            v-if="isAuto"
            class="flow-loader-state-shim"
          />
          <div
            v-else
            class="flow-loader-state-load"
            @click="loadMore()"
          >
            <slot name="load">
              点击加载更多
            </slot>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import { checkInView, getObserver } from './utils'
import { utils } from '@flowlist/js-core'

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
      validator: val =>
        ~['page', 'jump', 'seenIds', 'sinceId'].indexOf(val)
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
    callback: {
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
    retryOnError: {
      type: Boolean,
      default: true
    },
    preload: {
      type: Number,
      default: 50,
      validator: val => val >= 0
    },
    cacheTimeout: {
      type: Number,
      default: 0,
      validator: val => val >= 0
    },
    debug: {
      type: Boolean,
      default: false
    },
    namespace: {
      type: String,
      default: 'flow'
    },
    uniqueKey: {
      type: String,
      default: 'id'
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
        callback: this.callback,
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
      return this.type === 'jump'
    },
    observer() {
      return getObserver
    }
  },
  watch: {
    query: {
      handler: function () {
        if (this.source) {
          return
        }
        this.$nextTick(() => {
          this._debug('query change')
          setTimeout(() => {
            this._initFlowLoader()
          }, 0)
        })
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._fireSSRCallback()
      this._initFlowLoader()
    })
    this._debug('mounted')
  },
  beforeDestroy() {
    this._debug('beforeDestroy')
    this.observer.unobserve(this.$refs && this.$refs.state)
    this.observer.disconnect()
  },
  methods: {
    push({ key, value }) {
      this._listMethod({
        key,
        value,
        method: 'push'
      })
    },
    reset({ key, value }) {
      this._listMethod({
        key,
        value,
        method: 'reset'
      })
    },
    patch({ key, value }) {
      this._itemMethod({
        id,
        key,
        value,
        method: 'patch'
      })
    },
    unshift({ key, value }) {
      this._listMethod({
        key,
        value,
        method: 'unshift'
      })
    },
    delete({ id, key }) {
      this._itemMethod({
        id,
        key,
        method: 'delete'
      })
    },
    update({ id, key, value }) {
      this._itemMethod({
        id,
        key,
        value,
        method: 'update'
      })
    },
    insertAfter({ id, key, value }) {
      this._itemMethod({
        id,
        key,
        value,
        method: 'insert-after'
      })
    },
    insertBefore({ id, key, value }) {
      this._itemMethod({
        id,
        key,
        value,
        method: 'insert-before'
      })
    },
    jump(page) {
      const query = { ...this.params.query }
      query.page = page
      return this.$store.dispatch(
        'flow/loadMore',
        {
          ...this.params,
          ...{ query }
        }
      )
    },
    refresh(reload = false) {
      return new Promise((resolve, reject) => {
        this.$nextTick(async () => {
          const query = { ...this.params.query }
          query.__refresh__ = true
          query.__reload__ = reload
          try {
            await this.$store.dispatch(
              'flow/initData',
              {
                ...this.params,
                ...{ query }
              }
            )
            this._initFlowLoader()
            resolve()
          } catch (e) {
            reject()
          }
        })
      })
    },
    initData(obj = {}) {
      return new Promise((resolve, reject) => {
        this.$nextTick(async () => {
          const query = { ...this.params.query, ...obj }
          try {
            await this.$store.dispatch(
              'flow/initData',
              {
                ...this.params,
                ...{ query }
              }
            )
            // 如果列表的数据没有撑满页面，就继续请求更多
            if (
              this.isAuth &&
              this.$refs.state &&
              checkInView(this.$refs.state, this.preload)
            ) {
              this.loadMore()
            }
            resolve()
          } catch (e) {
            reject()
          }
        })
      })
    },
    loadBefore(obj = {}, force = false) {
      if (this.isPagination) {
        return
      }
      const query = { ...this.params.query, ...obj }
      query.is_up = 1
      return this.$store.dispatch(
        'flow/loadMore',
        {
          ...this.params,
          ...{
            query,
            force
          }
        }
      )
    },
    loadMore(obj = {}, force = false) {
      if (this.isPagination) {
        return
      }
      const query = { ...this.params.query, ...obj }
      query.is_up = 0
      return this.$store.dispatch(
        'flow/loadMore',
        {
          ...this.params,
          ...{
            query,
            force
          }
        }
      )
    },
    retry() {
      if (this.source.fetched) {
        return this.loadMore()
      } else {
        return this.initData({
          __refresh__: true
        })
      }
    },
    clear() {
      if (!this.source) {
        return
      }
      this.$store.commit(`${this.namespace}/INIT_STATE`, this.params)
    },
    forceCallback() {
      this._fireSSRCallback(true)
    },
    _listMethod({ method, key, value }) {
      this.$store.commit(
        `${this.namespace}/UPDATE_DATA`,
        {
          ...this.params,
          ...{
            key,
            value,
            method
          }
        }
      )
    },
    _itemMethod({ method, id, key, value }) {
      this.$store.commit(
        `${this.namespace}/UPDATE_DATA`,
        {
          ...this.params,
          ...{
            id,
            key,
            value,
            method
          }
        }
      )
    },
    _initState() {
      if (this.source) {
        return
      }
      this.$store.commit(`${this.namespace}/INIT_STATE`, this.params)
    },
    _initFlowLoader() {
      this._initState()
      if (this.auto === 0) {
        return
      }
      const stateDom = this.$refs.state
      if (!stateDom) {
        return
      }
      // if (checkInView(stateDom, this.preload)) {
      //   this.initData()
      // }
      stateDom.__lazy_handler__ = this._fetchDataFunc.bind(this)
      this.observer.observe(stateDom)
    },
    _retryData() {
      if (!this.retryOnError) {
        return
      }
      if (this.source.fetched) {
        this.loadMore()
      } else {
        this.initData({
          __refresh__: true
        })
      }
    },
    _fireSSRCallback(force = false) {
      if (!force && (!this.firstBind || !checkInView(this.$el, this.preload))) {
        return
      }
      this.firstBind = false
      if (this.source && this.source.fetched) {
        this.callback &&
        this.callback({
          params: generateRequestParams(
            { fetched: false },
            this.params.query,
            this.type
          ),
          data: {
            result: this.source.result,
            extra: this.source.extra,
            noMore: this.source.noMore,
            total: this.source.total
          },
          refresh: false
        })
      }
    },
    _fetchDataFunc() {
      if (!this.source) {
        this._initState()
        return
      }
      if (this.source.loading || this.source.error) {
        return
      }
      if (
        !this.isAuto ||
        this.source.noMore ||
        this.source.nothing ||
        (this.isPagination && this.source.fetched)
      ) {
        const stateDom = this.$refs.state
        delete stateDom.__lazy_handler__
        this.observer.unobserve(stateDom)
        return
      }
      const fetcher = () => {
        if (this.source.fetched) {
          this.loadMore()
        } else {
          this.initData()
        }
      }
      if (this.observer) {
        fetcher()
      } else {
        if (!this.$refs.state) {
          return
        }
        if (this.isAuto && checkInView(this.$refs.state, this.preload)) {
          fetcher()
        }
      }
    },
    _debug(message) {
      if (!this.debug) {
        return
      }
      console.log('life cycle', message) // eslint-disable-line
      console.log('check in view', checkInView(this.$refs.state, this.preload)) // eslint-disable-line
    }
  }
}
</script>
