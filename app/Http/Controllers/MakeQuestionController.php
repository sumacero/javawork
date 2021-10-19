<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Category;
use App\Subcategory;

class MakeQuestionController extends Controller
{
    public function index(){
        return view('make_question');
    }
    public function getCategories(){
        $categories = Category::all();
        $subcategories = Subcategory::all();
        $dbData = compact('categories', 'subcategories');
        return response()->json(['dbData' => $dbData]);
    }
}
