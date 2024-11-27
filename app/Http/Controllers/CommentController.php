<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Models\Comment;
use App\Models\Feature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(StoreCommentRequest $request, Feature $feature)
    {
        $data = $request->validated();
        $data['feature_id'] = $feature->id;
        $data['user_id'] = Auth::id();

        Comment::create($data);
        return to_route('feature.show', $feature);
    }

    public function destroy (Comment $comment) {
        $featureId = $comment->feature->id;

        $comment->delete();

        return to_route('feature.show', $featureId);
    }
}
