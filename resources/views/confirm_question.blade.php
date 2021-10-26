@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
    </div>
</div>
<div id="">確認画面です</div>
<p>{{$question}}</p>
<table>
@foreach($choices as $choice) 
     <tr>
        <td>{{$choice->choice_id}}</td>
        <td>{{$choice->choice_symbol}}</td>
        <td>{{$choice->choice_text}}</td>
      </tr>
@endforeach
</table>
<p>{{$answer}}</p>
@endsection