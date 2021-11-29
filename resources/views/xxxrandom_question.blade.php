@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
    </div>
</div>
@foreach ($subcategoryIds as $test)
    <p>{{$test}}</p>
    <hr>
@endforeach
<span id="tmp" data-subcategory_ids="{{$subcategoryIds[0]}}"></span>
<div id="random-question-page"></div>
@endsection
