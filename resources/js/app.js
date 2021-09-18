require('./bootstrap');
import Vue from 'vue';
import router from './router/index.js';
//window.Vue = require('vue').default;
//import vuex
const { default: store } = require('./store/index')

import CxltToastr from 'cxlt-vue2-toastr';
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css';

var toastrConfigs = {
    position: 'top center',
    showDuration: 1000,
    timeOut: 3000,
    closeButton: true,
    progressBar: true,
    showMethod: 'fadeIn',
    hideMethod:'fadeOut',
}
Vue.use(CxltToastr, toastrConfigs)

//window.Vue = require('vue').default;


Vue.component('app-header', require('./components/header.vue').default);


// Auth
function isLoggedIn() {
    return store.getters.get_authenticated;
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!isLoggedIn()) {
            next({
                name: 'login',
            })
        } else {
            next()
        }
    }else if (to.matched.some(record => record.meta.requiresVisitor)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (isLoggedIn()) {
            next({
                name: 'dashboard',
            })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
})
// check authentication
let auth = localStorage.getItem("auth");

if(auth){
    store.dispatch('authUser').then(() => {
        const app = new Vue({
            el: '#app',
            router,
            store,
        })
    });
}else {
    const app = new Vue({
        el: '#app',
        router,
        store,
    })
}


