<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class SearchController extends Controller
{
    public function index(){
        return view('search');
    }
    public function getuser(){
        $users = User::all();
        return response()->json(['users' => $users]);
    }
}
