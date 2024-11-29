<?php

namespace App\Http\Controllers;

use App\Enum\RolesEnum;
use App\Http\Resources\AuthUserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('User/Index', [
            'users' => AuthUserResource::collection(User::all())->collection->toArray(),
            // 'users' => User::all()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('User/Edit', [
            'user' => $user,
            'roles' => Role::all(),
            'rolesLabels' => RolesEnum::labels(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }
}
