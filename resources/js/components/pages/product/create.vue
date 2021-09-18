<template>
 <div>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h4>Create Product</h4>
                        <router-link :to="{name:'product-list'}" class="btn btn-outline-warning btn-sm text-dark">Back</router-link>
                    </div>

                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6 offset-3">
                                <form @submit.prevent="createProduct()">
                                    <div class="form-group">
                                        <label for="title">Product Title</label>
                                        <input v-model="productForm.title" type="text" name="title" id="title" class="form-control" placeholder="Product Title" :class="{'is-invalid':productForm.errors.has('title')}" />
                                        <div class="text-danger" v-if="productForm.errors.has('title')" v-html="productForm.errors.get('title')" />
                                    </div>
                                     <div class="form-group">
                                        <label for="image">Upload Image</label>
                                       <input type="file" name="title" id="title" class="form-control" @change="onImageChange" :class="{'is-invalid':productForm.errors.has('image')}" />
                                        <div class="text-danger" v-if="productForm.errors.has('image')" v-html="productForm.errors.get('image')" />
                                    </div>
                                    <div class="form-group">
                                        <label for="price">Product Price</label>
                                        <input v-model="productForm.price" type="number" name="price" id="price" class="form-control" placeholder="Product Price" :class="{'is-invalid':productForm.errors.has('price')}" />
                                        <div class="text-danger" v-if="productForm.errors.has('price')" v-html="productForm.errors.get('price')" />
                                    </div>
                                    <div class="form-group">
                                        <label for="description">Product Description</label>

                                        <textarea v-model="productForm.description" name="description" id="description"  class="form-control" placeholder="Product description" :class="{'is-invalid':productForm.errors.has('description')}"></textarea>
                                        <div class="text-danger" v-if="productForm.errors.has('description')" v-html="productForm.errors.get('description')" />
                                    </div>
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-success">Create Product</button>
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
import { objectToFormData } from 'object-to-formdata'
export default {
    data: () => ({
        productForm: new Form({
            title: "",
            image: "",
            price: "",
            description: "",
        }),
    }),
    methods: {
        createProduct() {
            this.productForm
                .post("/api/product", {
                    transformRequest: [
                        function (data, headers) {
                            return objectToFormData(data);
                        },
                    ],
                    onUploadProgress: (e) => {
                        // Do whatever you want with the progress event
                        console.log(e);
                    },
                })
                .then(({ data }) => {
                    this.productForm.title = "";
                    this.productForm.price = "";
                    this.productForm.description = "";
                    this.productForm.image = "";
                    this.$toast.success({
                        title: "success",
                        message: "Product created successfully!",
                    });
                });
        },
        onImageChange(e) {
            const file = e.target.files[0];
            // Do some client side validation...
            this.productForm.image = file;
        },
    },
};

</script>

<style>

</style>
