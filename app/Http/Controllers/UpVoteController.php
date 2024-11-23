<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpvoteRequest;
use App\Models\Feature;
use App\Models\Upvote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UpVoteController extends Controller
{
    public function store(StoreUpvoteRequest $request, Feature $feature)
    {
        $data =  $request->validated();

        Upvote::updateOrCreate(
            ['feature_id' => $feature->id, 'user_id' => Auth::id()],
            ['upvote' => $data['upvote']]
        );

        return back();
    }

    public function destroy (Feature $feature) {
        $feature->upvotes()->where('user_id', Auth::id())->delete();
        // $upvote->delete();
        // return to_route('feature.index');
        return back();
    }
}
