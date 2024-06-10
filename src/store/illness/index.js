import axios from "axios"

const state = {
    illnessList: [],
    categoryDetail: {},
}
const mutations = {
    setIllnessList(state, illnessList) {
        state.illnessList = illnessList
    },
    setCategoryDetail(state, categoryDetail) {
        Object.keys(categoryDetail).forEach((key) => {
            categoryDetail[key].children = categoryDetail[key].children.map(
                (item) => {
                    return state.illnessList.find((_item) => item === _item.name);
                }
            );
        });
        state.categoryDetail = categoryDetail
    }
}
const actions = {
    async getIllnessList({ commit }) {
        const { data } = await axios.get('/data/illness.json')
        commit('setIllnessList', data)
    },
    async getCategoryDetail({ commit }) {
        const { data } = await axios.get('/data/category.json')
        commit('setCategoryDetail', data)
    }
}
const getters = {
    illnessList(state) {
        return state.illnessList
    },
    categoryDetail(state) {
        return state.categoryDetail;
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}