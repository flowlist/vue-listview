import store from '../../src/store'
import * as api from '../api'

const list = store({ api })

export const state = list.state

export const mutations = list.mutations

export const actions = list.actions

export const getters = list.getters
