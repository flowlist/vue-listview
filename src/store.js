import Vue from 'vue'
import { utils } from '@flowlist/js-core'

export default ({ api, debug, namespace }) => {
  return {
    namespaced: true,
    state: () => ({}),
    actions: {
      initData() {},
      loadMore() {}
    },
    getters: {
      getFlow: state => ({ func, type, query }) => state[utils.generateFieldName({ func, type, query })]
    }
  }
}
