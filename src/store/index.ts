/* eslint no-shadow: ["error", { "allow": ["state"] }] */
// https://stackoverflow.com/questions/43843180/eslint-state-already-declared-vuex
import { createStore, MutationTree, ActionTree, GetterTree } from 'vuex'
import { getUser } from '../ajax/apis'

interface defaultState {
    token: string
}
interface Response {
    [key: string]: any
}

function initialState(): defaultState {
    return {
        token: ''
    }
}
const state: defaultState = initialState()

const mutations: MutationTree<defaultState> = {
    SET_TOKEN(state, payload) {
        state.token = payload
    }
}

const actions: ActionTree<defaultState, defaultState> = {
    async getUser({ commit }) {
        const res = (await getUser()) as Response
        commit('SET_TOKEN', res.token)
    }
}
const getters: GetterTree<defaultState, defaultState> = {
    hasUser(state) {
        return state.token
    }
}
export default createStore({
    state,
    mutations,
    actions,
    getters,
    modules: {}
})
