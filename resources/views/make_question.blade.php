@extends('layouts.app')

@section('content')
    @if (count($errors)>0)
    <div>
        <p>サーバーバリデーションエラーが発生しました。</p>
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{$error}}</li>
            @endforeach
        </ul>
    </div>
    @endif
    <div id="make-question-page"></div>
</div>
@endsection
