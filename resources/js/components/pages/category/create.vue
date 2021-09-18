<template>
  <div>
     <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                    <h4>Create Category</h4>
                    <router-link :to="{name:'category-list'}" class="btn btn-outline-warning btn-sm text-dark ">Back</router-link>
                    </div>

                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6 offset-3">
                            <form @submit.prevent="createCategory">
                                <div class="form-group">
                                <label for="name">Category</label>
                                <input v-model="form.name" type="text" name="name" id="name" class="form-control" placeholder="Category Name" :class="{'is-invalid':form.errors.has('name')}">
                                 <div class="text-danger" v-if="form.errors.has('name')" v-html="form.errors.get('name')" />
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-success">Create Category</button>
                                </div>
                             </form>
                            </div>
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
export default {
    data: () => ({
      form: new Form({
      name: '',

    })
  }),
    methods:{
        createCategory(){
           this.form.post('/api/categories').then(({data}) =>{
               this.form.name ='';
               this.$toast.success({
                    title:'success',
                    message:'Category created successfully!'
                })

           });
        }
    }

}
</script>

<style>

</style>
