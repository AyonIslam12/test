<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
   public function user_profile_update(Request $request){
       $user = auth()->user();
       $request->validate([
        'name' => "required|string",
        'email' => "required|unique:users,email,$user->id",
        'password' => "sometimes|nullable|min:6|confirmed",
       ]);

       $user->update([
           'name' => $request->name,
           'email' => $request->email,
       ]);

       if($request->password){
           $user->update([
               'password' => bcrypt($request->password)
           ]);
       }
       return response()->json($user,200);
   }
}
