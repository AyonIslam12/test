<template>
<div>
    <div class="container">
        <div class="py-5">
            <div class="row">
                <div class="col-md-6 offset-3">
                    <div class="card card-default">
                        <div class="card-header">Login</div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-10 offset-">
                                    <div class="ul" v-if="loginForm.errors.has('email')">
                                        <ul>
                                            <li>
                                                <a href="#"> <span class="text-danger" v-html="loginForm.errors.get('email')"></span></a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="ul" v-if="loginForm.errors.has('password')">
                                        <ul>
                                            <li>
                                                <a href="#"> <span class="text-danger" v-html="loginForm.errors.get('password')"></span></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <form action="#" method="" @submit.prevent="Login()">
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" v-model="loginForm.email" name="email" id="email" class="form-control" placeholder="enter-eamil" :class="{'is-invalid':loginForm.errors.has('email')}" />
                                    <!-- <div class="text-danger" v-if="loginForm.errors.has('email')" v-html="loginForm.errors.get('email')" /> -->
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" v-model="loginForm.password" name="password" id="password" class="form-control" placeholder="enter-password" :class="{'is-invalid':loginForm.errors.has('password')}" />
                                    <!-- <div class="text-danger" v-if="loginForm.errors.has('password')" v-html="loginForm.errors.get('password')" /> -->
                                </div>
                                <div class="form-group">
                                    <button type="submit" :disabled="loginForm.busy" class="btn btn-success">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import Form from 'vform'
import axios from 'axios';
export default {
    data: () => ({
      loginForm: new Form({
        email: 'ayon@gmail.com',
        password: '',
    })
  }),
    methods:{
       async Login(){
           await axios.get('/sanctum/csrf-cookie');

              await this.loginForm.post('/login');
                   await this.getUserData()
                    this.$toast.success({
                        title:'success',
                        message:'Welcom to dashboard',
                    });
                    this.$router.push({name: 'dashboard'});
                   //this.$router.push({name: 'dashboard'}).catch(() => {console.log('test');})

        },
       async getUserData(){
           await axios.get('/api/user').then(res=>{
               let user = res.data;
               this.$store.commit('set_user',user);
               this.$store.commit('set_authenticated',true);

               localStorage.setItem("auth", true);
            })
        }
    },
    mounted(){

    }
}
</script>

<style>

</style>
