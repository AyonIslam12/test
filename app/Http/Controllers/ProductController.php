<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::latest()->get();
        return \response()->json($products,200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       $request->validate([
           'title' => 'required|unique:products',
           'price' => 'required',
           'description' => 'required|string',

       ]);
       $products = Product::create([
        'title' => $request->title,
        'slug' =>Str::slug($request->title),
        'price' => $request->price,
        'description' => $request->description,
    ]);
    if($request->image){
        $imageName = time().'_'. uniqid() .'.'.$request->image->getClientOriginalExtension();
        $request->image->move(public_path('/storage/products'), $imageName);
        $products->image = '/storage/products/' . $imageName;
        $products->save();
    }

    return \response()->json('success',200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        if($product){
            return \response()->json($product);
        }else{
            return \response()->json('something is worng',404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {

        $request->validate([
            'title' => "required|max:255|unique:products,title, $product->id",
            'price' => 'required',
            'description' => 'required|string',
        ]);

        $product->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'price' => $request->price,
            'description' => $request->description,

        ]);
         if ($request->image) {
             $imageName = time().'_'. uniqid() .'.'.$request->image->getClientOriginalExtension();
             $request->image->move(public_path('/storage/products'), $imageName);
             $product->image = '/storage/products/' . $imageName;
             $product->save();


         }

        return response()->json($product, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        if($product){
            if (file_exists(public_path('/'.$product->image))) {
                unlink(public_path('/'.$product->image));
            }
            $product->delete();
            return \response()->json('deleted success',200);
        }else{
            return \response()->json('delete failed',404);
        }
    }
}
