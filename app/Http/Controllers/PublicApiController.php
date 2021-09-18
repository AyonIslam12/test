<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class PublicApiController extends Controller
{
    public function all_products(){
        $products = Product::paginate(8);
        return response()->json($products,200);
    }
}
