<template>
<div class="container">
    <div class="row mt-5">
         <div class="col-md-4">
            <div class="card">
                <div class="card-header bg-primary">
                    <router-link class="text-light" :to="{name:'dashboard'}">Dashboard</router-link>
                </div>
                <div class="card-body">
                    <router-link class="nav-link" :to="{name:'profile'}">Profile</router-link>
                    <a href="#" class="nav-link" @click.prevent="logout()"> Logout</a>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard Component</div>

                <div class="card-body">
                    {{ get_message }} {{get_user.name }}
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import { mapGetters} from "vuex";
    export default {
         methods:{
        logout(){
            axios.post('/logout').then(res=>{
                 this.$toast.success({
                    title:'success',
                    message:'Logout successfully!'
                });
                  localStorage.removeItem("auth");
                 this.$store.commit('set_authenticated',false);

                  this.$router.push({name: 'login'});
            })
        },


    },
        computed: {
        ...mapGetters([
            'get_message',
            'get_user',
        ]),
    }


    }
</script>
