<template>
<div>
    <div class="container">
        <div class="py-5">
            <div class="row">
                <div class="col-md-6 offset-3">
                    <div class="card card-default">
                        <div class="card-header">Sign Up</div>
                        <div class="card-body">
                            <form action="#" method="" @submit.prevent="signUp()">
                                <div class="form-group">
                                    <label for="name">Name</label>
                                    <input type="text" v-model="siginupForm.name" name="name" id="name" class="form-control" placeholder="enter-name" :class="{'is-invalid':siginupForm.errors.has('name')}" />
                                    <div class="text-danger" v-if="siginupForm.errors.has('name')" v-html="siginupForm.errors.get('name')" />
                                </div>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" v-model="siginupForm.email" name="email" id="email" class="form-control" placeholder="enter-eamil" :class="{'is-invalid':siginupForm.errors.has('email')}" />
                                    <div class="text-danger" v-if="siginupForm.errors.has('email')" v-html="siginupForm.errors.get('email')" />
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" v-model="siginupForm.password" name="password" id="password" class="form-control" placeholder="enter-password" :class="{'is-invalid':siginupForm.errors.has('password')}" />
                                  <div class="text-danger" v-if="siginupForm.errors.has('password')" v-html="siginupForm.errors.get('password')" />
                                </div>
                                <div class="form-group">
                                    <label for="password_confirmation">Password</label>
                                    <input type="password" v-model="siginupForm.password_confirmation" name="password_confirmation" id="password_confirmation" class="form-control" placeholder="password_confirmation" :class="{'is-invalid':siginupForm.errors.has('password_confirmation')}" />
                                     <div class="text-danger" v-if="siginupForm.errors.has('password_confirmation')" v-html="siginupForm.errors.get('password_confirmation')" />
                                </div>
                                <div class="form-group">
                                    <button type="submit" :disabled="siginupForm.busy" class="btn btn-success">Sign Up</button>
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
      siginupForm: new Form({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })
  }),
    methods:{
        signUp(){
            axios.get('/sanctum/csrf-cookie').then(response => {

                this.siginupForm.post('/register').then(res =>{

                    this.$toast.success({
                        title:'success',
                        message:'Your accoutn created successfully',
                    });
                    this.$router.push({name: 'login'});
               })
            });
        },
        // getUserData(){
        //     axios.get('/api/user').then(res=>{
        //        let user = res.data;
        //        this.$store.commit('set_user',user);
        //        this.$store.commit('set_authenticated',true);

        //        localStorage.setItem("auth", true);
        //     })
        // }
    },
    // mounted(){

    // }
}
</script>

<style>

</style>
