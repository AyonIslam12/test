import Vue from "vue";
import axios from "axios";


import Vuex, { Store } from "vuex";
Vue.use(Vuex);

import UserData from "./modules/userData";

const store = new Vuex.Store({
    modules: {
        UserData,


    },
    state: {},
    getters: {},
    mutations: {},
    actions: {},

});
export default store;
