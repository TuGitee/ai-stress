import illness from "./illness";
import psychology from "./psychology";
import analysis from "./analysis";
import theme from "./theme";
import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        illness,
        psychology,
        analysis,
        theme
    }
});