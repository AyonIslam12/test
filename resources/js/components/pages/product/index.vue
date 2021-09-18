<template>
 <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h4>Poroduct Category</h4>
                    <router-link :to="{name:'product-create'}" class="btn btn-outline-success btn-sm ">Create Product</router-link>
                </div>

                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Sl</th>
                                <th scope="col">Title</th>
                                <th scope="col">Slug</th>
                                <th scope="col">Price</th>
                                <th scope="col">Image</th>
                                <th scope="col">Description</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="products.length">
                            <tr v-for="product in products" :key="product.id">
                                <th style="width:60px" scope="row">{{product.id}}</th>
                                <td>{{product.title }}</td>
                                <td>{{product.slug  }}</td>
                                <td>{{product.price }}</td>
                                <td><img style="width:100px; height:100px" :src="product.image"  alt="not-found"></td>
                                <td style="width:170px">{{product.description }}</td>
                                <td  style="width:160px">
                                    <router-link :to="{name:'product-edit',params:{id: product.id}}" class="btn btn-outline-primary btn-sm">Edit</router-link>
                                    <a @click="deleteProduct(product)" class="btn btn-outline-danger btn-sm">Delete</a>
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
            products:[],
        }
    },
    methods:{
        readProducts(){
        axios.get('/api/product').then(res =>{
            this.products = res.data;
        });
    },

    deleteProduct(product){
        axios.delete(`/api/product/${product.id}`).then(() =>{
             this.$toast.success({
                    title:'success',
                    message:'Product delete successfully!',
                })
        });
         let index = this.products.indexOf(product);
           this.products.splice(index,1);
    }
    },
    mounted(){
      this.readProducts();
    }
}
</script>

<style>

</style>
