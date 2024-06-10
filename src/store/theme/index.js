export default {
    state: {
        theme: 'vintage'
    },
    mutations: {
        changeTheme(state) {
            if (state.theme === 'chalk') {
                state.theme = 'vintage'
            } else {
                state.theme = 'chalk'
            }
        }
    },
    actions: {
    },
    getters: {
        theme(state) {
            return state.theme
        }
    }
}