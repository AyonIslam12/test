<template>
  <div>
     <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                    <h4>Edit Category- {{form.name}}</h4>
                    <router-link :to="{name:'category-list'}" class="btn btn-outline-warning btn-sm text-dark ">Back</router-link>
                    </div>

                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6 offset-3">
                            <form @submit.prevent="updateCategory()" >
                                <div class="form-group">
                                <label for="name">Category</label>
                                <input v-model="form.name" type="text" name="name" id="name" class="form-control" placeholder="Category Name" :class="{'is-invalid':form.errors.has('name')}">
                                 <div class="text-danger" v-if="form.errors.has('name')" v-html="form.errors.get('name')" />
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-success">Edit Category</button>
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
import axios from 'axios';
export default {
    data: () => ({
      form: new Form({
      name: '',

    })
  }),
    methods:{
        editCategory(){
            let id = this.$route.params.id;

           axios.get(`/api/categories/${id}/edit`).then(res =>{

               this.form.name = res.data.name;
           });
        },
        updateCategory(){
           let id = this.$route.params.id;
           this.form.put(`/api/categories/${id}`).then(() =>{
               this.$toast.success({
                    title:'success',
                    message:'Category updated successfully!',
                })

           });
        }
    },
    mounted(){
        this.editCategory();
    }

}
</script>

<style>

</style>
