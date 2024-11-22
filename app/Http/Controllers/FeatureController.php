<?php

namespace App\Http\Controllers;

use App\Http\Requests\FeatureRequest;
use App\Http\Requests\UpdateFeatureRequest;
use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Inertia\Inertia;

class FeatureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paginated = Feature::latest()->paginate();
        return Inertia::render('Feature/Index', [
            'features' => FeatureResource::collection($paginated),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Feature/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FeatureRequest $request)
    {
        $data = $request->validated();

        //    $data['user_id'] = Auth::id();
        $data['user_id'] = auth()->id();

        Feature::create($data);
        return to_route('feature.index')
            ->with('success', 'Feature created succesfully');
    }


    /**
     * Display the specified resource.
     */
    public function show(Feature $feature)
    {
        return Inertia::render('Feature/Show', [
            'feature' => new FeatureResource($feature)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feature $feature)
    {
        return Inertia::render('Feature/Edit', [
            'feature' => new FeatureResource($feature)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFeatureRequest $request, Feature $feature)
    {
        $data = $request->validated();
        $feature->update($data);
        return to_route('feature.index')
            ->with('success', 'Feature updated succesfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feature $feature)
    {
        $feature->delete();
        return to_route('feature.index')
            ->with('success', 'Feature deleted succesfully');
    }
}
