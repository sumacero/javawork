<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;

class GetUserController extends Controller
{
    public function getUser(Request $request){
        $loginUser = Auth::user();
        unset($loginUser->email);
        unset($loginUser->email_verified_at);
        unset($loginUser->created_at);
        unset($loginUser->updated_at);
        return response()->json(['loginUser' => $loginUser]);
    }
}
