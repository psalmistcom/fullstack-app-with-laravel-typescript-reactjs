<?php

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\UpVoteController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::redirect('/', '/dashboard');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');

    Route::middleware(['verified', 'role:' . RolesEnum::Admin->value])
        ->group(function () {
            Route::get('/user', [UserController::class, 'index'])
                ->name('user.index');
            Route::get('/user/{user}/edit', [UserController::class, 'edit'])
                ->name('user.edit');
            Route::put('/user/{user}', [UserController::class, 'update'])
                ->name('user.update');
        });

    Route::middleware([
        'verified',
        sprintf(
            'role:%s|%s|%s',
            RolesEnum::User->value,
            RolesEnum::Commenter->value,
            RolesEnum::Admin->value,
        )
    ])
        ->group(function () {
            Route::get('/dashboard', function () {
                return Inertia::render('Dashboard');
            })->name('dashboard');

            Route::resource('feature', FeatureController::class)
                ->except(['index', 'show'])
                ->middleware('can:' . PermissionsEnum::ManageFeatures->value);

            Route::resource('feature', FeatureController::class)
                ->only(['index', 'show']);

            Route::post('/feature/{feature}/upvote', [UpVoteController::class, 'store'])
                ->name('upvote.store');
            Route::delete('/upvote/{feature}', [UpVoteController::class, 'destroy'])
                ->name('upvote.destroy');

            Route::middleware('can:' . PermissionsEnum::ManageComments->value)
                ->group(function () {
                    Route::post('/feature/{feature}/comments', [CommentController::class, 'store'])
                        ->name('comment.store');
                    Route::delete('/comment/{comment}', [CommentController::class, 'destroy'])
                        ->name('comment.destroy');
                });
            // Route::post('/feature/{feature}/comments', [CommentController::class, 'store'])
            // ->name('comment.store')
            // ->middleware('can:' . PermissionsEnum::ManageComments->value);

            // Route::delete('/comment/{comment}', [CommentController::class, 'destroy'])
            // ->name('comment.destroy')
            // ->middleware('can:' . PermissionsEnum::ManageComments->value);
        });
});

require __DIR__ . '/auth.php';
