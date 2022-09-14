@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-3">
            <div class="card">
                <div class="card-header">Java演習(ランダム出題)</div>
                <a href="{{ url('/random-question') }}">
                    <img class="card-img-top" src="images/演習問題.png" alt="DB検索画像" height="200">
                </a>
                <div class="card-body">
                    Javaの問題をランダムで出題します。
                </div>
            </div>
        </div>
        @can('service') 
        <div class="col-md-3">        
            <div class="card">
                <div class="card-header">Java問題検索</div>
                <a href="{{ url('/search') }}">
                    <img class="card-img-top" src="images/searchDB.jpg" alt="DB検索画像" height="200">
                </a>
                <div class="card-body">
                    Javaの問題の一覧を検索します。
                </div>
            </div>
        </div>
        @endcan
        @can('admin') 
        <div class="col-md-3">
            <div class="card">
                <div class="card-header">Java問題作成</div>
                <a href="{{ url('/make-question') }}">
                    <img class="card-img-top" src="images/問題作成.png" alt="DB検索画像" height="200">
                </a>
                <div class="card-body">
                    Javaの問題を作成します。
                </div>
            </div>
        </div>
        @endcan
        @can('service') 
        <div class="col-md-3">        
            <div class="card">
                <div class="card-header">問題マイリスト設定</div>
                <a href="{{ url('/mylist') }}">
                    <img class="card-img-top" src="images/マイリスト.jpg" alt="DB検索画像" height="200">
                </a>
                <div class="card-body">
                    問題のマイリストを設定します。
                </div>
            </div>
        </div>
        @endcan
    </div>
</div>
@endsection
