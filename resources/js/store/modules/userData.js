import axios from "axios";
import router from '../../router/index';

//state list
const state = {
    message:'welcome to dashboard',
    user: {},
    authenticated: false,

}

//get state
const getters = {
    get_message: state=> state.message,
    get_user: state=> state.user,
    get_authenticated: state=> state.authenticated,
}
//mutation
const mutations ={
    set_user: function(state,data){
      state.user = data;
   },
    set_authenticated: function(state,data){
      state.authenticated = data;
   },

}

//action
const actions ={
    authUser ({ commit, dispatch }) {
        return axios.get('/api/user').then((response) => {
            commit('set_authenticated', true)
            commit('set_user', response.data)
            localStorage.setItem("auth", true);

            if(router.currentRoute.name !== null){
                router.push({ name: 'dashboard' })
            };

        }).catch(() => {
            commit('set_authenticated', false)
            commit('set_user', null)
            localStorage.removeItem("auth");

            if(router.currentRoute.name !== 'login'){
                router.push({ name: 'login' })
            };
        })
    },


}

export default{
    state,
    getters,
    actions,
    mutations
}
