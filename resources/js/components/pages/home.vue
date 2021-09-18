<template>
    <div class="container">
        <div class="row">
            <div class="col-3"  v-for="product in products" :key="product.id">
                <div class="card" style="width: 18rem;" >
                    <img style="max-height:150px" class="card-img-top" :src="product.image" alt="Card image cap" />

                    <div class="card-body">
                          <h5 class="card-title">{{product.title}}</h5>
                        <!-- <div class="d-flex justify-content-between">
                            <h5 class="card-title">{{product.title}}</h5>
                            <p class="card-text">Price: <span class="font-weight-bold">{{product.price }} BDT</span></p>
                        </div>
                        <p class="card-text">Slug: <span class="font-weight-bold">{{product.slug }}</span></p>

                        <p class="card-text">{{product.description}}</p> -->
                        <a href="#" class="btn btn-primary">View Product</a>
                    </div>
                </div>
            </div>
            <a href="#" @click.prevent="loadMore()"></a>
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
           async loadProducts(){
               let {data} = await axios.get('/api/all-products');
               this.products = data.data;
               console.log(data.data);
            }
        },
        mounted(){
            this.loadProducts();
        }


    }
</script>
