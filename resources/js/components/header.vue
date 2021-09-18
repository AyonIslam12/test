<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
       <div class="container">
            <router-link class="navbar-brand m-auto" :to="{ name: 'home'}">Site Logo</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto" v-if="get_authenticated">

                <li class="nav-item ">
                     <router-link class="nav-link " :to="{ name: 'category-list'}"> Product Categories </router-link>
                </li>
                <li class="nav-item ">
                     <router-link class="nav-link " :to="{ name: 'product-list'}"> All Products </router-link>
                </li>
                <li class="nav-item ">
                     <router-link class="nav-link " :to="{ name: 'dashboard'}"> Dashboard </router-link>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto" v-else >

                <li class="nav-item">
                     <router-link class="nav-link" :to="{name:'home'}">Home</router-link>
                </li>
                <li class="nav-item" >
                     <router-link class="nav-link" :to="{name: 'signup'}"> Sign Up</router-link>
                </li>
                <li class="nav-item"  >
                     <router-link class="nav-link" :to="{name: 'login'}"> Login</router-link>
                </li>

            </ul>
        </div>
       </div>
    </nav>
</div>

</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex';
export default {
    methods:{

    },
    computed:{
        ...mapGetters([
            'get_authenticated',
        ])
    },


}
</script>

<style>

</style>

