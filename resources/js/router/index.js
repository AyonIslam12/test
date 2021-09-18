import Vue from "vue";

import VueRouter from "vue-router";

import Home from "../components/pages/home";

import Category from '../components/pages/category/index';
import CreateCategory from '../components/pages/category/create';
import Edit from '../components/pages/category/edit';
//products
import Product from '../components/pages/product/index';
import createProduct from '../components/pages/product/create';
import editProduct from '../components/pages/product/edit';
//authendication
import Login from '../components/pages/auth/login';
import Signup from '../components/pages/auth/signup';

import Dashboard from '../components/pages/dashboard/index';

//profile
import  Profile from '../components/pages/dashboard/profile/index';

Vue.use(VueRouter);



const routes = new VueRouter({
    mode:'history',
    linkActiveClass: 'active',
    routes:[

        {
            path:'/',
            component: Home,
            name: 'home',
        },
        //category
        {
            path:'/categories',
            component: Category,
            name: 'category-list',
            meta: {requiresAuth: true}
        },
        {
            path:'/create-categories',
            component: CreateCategory,
            name: 'create-category',
            meta: {requiresAuth: true}
        },
        {
            path:'/categories/edit/:id',
            component: Edit,
            name: 'edit-category',
            meta: {requiresAuth: true}
        },
        //products
        {
            path:'/products',
            component: Product,
            name: 'product-list',
            meta: {requiresAuth: true}
        },
        {
            path:'/product/create',
            component: createProduct,
            name: 'product-create',
            meta: {requiresAuth: true}
        },
        {
            path:'/product/edit/:id',
            component: editProduct,
            name: 'product-edit',
            meta: {requiresAuth: true}
        },
        //auth routes
        {
            path:'/login',
            component: Login,
            name: 'login',
            meta: {requiresVisitor: true},
        },
        {
            path:'/signup',
            component: Signup,
            name: 'signup',
            meta: {requiresVisitor: true},
        },
        {
            path:'/dashboard',
            component: Dashboard,
            name: 'dashboard',
            meta: {requiresAuth: true},

        },
        //user profiles
        {
            path:'/user-profile',
            component: Profile,
            name: 'profile',
            meta: {requiresAuth: true},

        },


    ]

});

export default routes;
