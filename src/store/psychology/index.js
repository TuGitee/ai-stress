import axios from "axios"

const state = {
    psychologyList: [],
}
const mutations = {
    setPsychologyList(state, psychologyList) {
        state.psychologyList = psychologyList
    }
}
const actions = {
    async getPsychologyList({ commit }) {
        const { data } = await axios.get('/data/psychology.json')
        commit('setPsychologyList', data)
    }
}
const getters = {
    psychologyList(state) {
        return state.psychologyList
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}