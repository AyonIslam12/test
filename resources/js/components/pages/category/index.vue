<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h4>Poroduct Category</h4>
                    <router-link :to="{name:'create-category'}" class="btn btn-outline-success btn-sm ">Create Category</router-link>
                </div>

                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Sl</th>
                                <th scope="col">Name</th>
                                <th scope="col">Slug</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="categories.length">
                            <tr v-for="category in categories" :key="category.id">
                                <th scope="row">{{category.id}}</th>
                                <td>{{category.name}}</td>
                                <td>{{category.slug}}</td>
                                <td >
                                    <router-link :to="{name:'edit-category',params:{id: category.id}}" class="btn btn-outline-primary btn-sm">Edit</router-link>
                                    <a @click.prevent="deleteCategory(category)" class="btn btn-outline-danger btn-sm">Delete</a>
                                </td>
                            </tr>
                        </tbody>
                         <tbody v-else>
                            <tr>
                                <td colspan="7">
                                    <h3 class="text-center text-danger">No data found!</h3>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            categories:[],
        }
    },
    methods:{
        readCategories(){
            axios.get('/api/categories').then(res=>{
               this.categories = res.data;
            });
        },
         deleteCategory(category){
           axios.delete(`/api/categories/${category.id}`).then(() =>{
               this.$toast.success({
                    title:'success',
                    message:'Category delete successfully!',
                })

           });

           let index = this.categories.indexOf(category);
           this.categories.splice(index,1);
        }
    },
    mounted(){
        this.readCategories();
    }

}
</script>

<style>

</style>
