import store from '../../src/store'
import * as api from '../api'

const flow = store({ api })

export const state = flow.state

export const mutations = flow.mutations

export const actions = flow.actions

export const getters = flow.getters
