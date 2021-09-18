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
                <div class="card-header"><h4>User Informations</h4></div>

                <div class="card-body">
                    <form action="" method="" @submit.prevent=" updateUserProfile()">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="name">Your Name</label>
                                    <input type="text" v-model="userForm.name" class="form-control" id="name" placeholder="Enter Your Name" :class="{'is-invalid':userForm.errors.has('name')}">
                                     <div class="text-danger" v-if="userForm.errors.has('name')" v-html="userForm.errors.get('name')" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="email">Your Name</label>
                                    <input type="email" v-model="userForm.email" class="form-control" id="email" placeholder="Enter Your Email" :class="{'is-invalid':userForm.errors.has('email')}">
                                    <div class="text-danger" v-if="userForm.errors.has('email')" v-html="userForm.errors.get('email')" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="password">Your Password</label>
                                    <input type="password" v-model="userForm.password" class="form-control" id="password" placeholder="Enter Your Password" :class="{'is-invalid':userForm.errors.has('password')}">

                                     <div class="text-danger" v-if="userForm.errors.has('password')" v-html="userForm.errors.get('password')" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="password_confirmation">Confirm Password</label>
                                    <input type="password" v-model="userForm.password_confirmation" class="form-control" id="password_confirmation" placeholder="Enter Cinfirm Password" :class="{'is-invalid':userForm.errors.has('password_confirmation')}">

                                     <div class="text-danger" v-if="userForm.errors.has('password_confirmation')" v-html="userForm.errors.get('password_confirmation')" />
                                </div>

                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                     <button type="submit" class="btn btn-success">Update</button>
                                </div>

                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import Form from 'vform'
import { mapGetters } from 'vuex'
export default {
    data(){
        return{
           userForm: new Form({
                name: '',
                email: '',
                password: '',
                password_confirmation: '',

            })
        }
    },
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
        user(){
            let user = this.$store.getters.get_user;
            this.userForm.name = user.name;
            this.userForm.email = user.email;

        },
        updateUserProfile(){
            this.userForm.post('/api/user/profile/update').then(res =>{
                console.log(res.data);
                this.$store.commit('set_user', res.data);
                 this.$toast.success({
                    title:'success',
                    message:'User Profile Updated successfully!'
                })
            })
        }
    },
    created(){
        this.user();
    },
     computed: {
       ...mapGetters([
            'get_user',
       ])
     }


}
</script>

<style>

</style>
