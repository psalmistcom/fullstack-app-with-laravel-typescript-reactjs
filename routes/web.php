<?php

use App\Http\Controllers\FeatureController;
use App\Http\Controllers\UpVoteController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::redirect('/', '/dashboard');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(['verified'])->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');
        Route::resource('feature', FeatureController::class);
        Route::post('/feature/{feature}/upvote', [UpVoteController::class, 'store'])
            ->name('upvote.store');
        Route::delete('/upvote/{feature}', [UpVoteController::class, 'destroy'])
            ->name('upvote.destroy');
    });
});

require __DIR__ . '/auth.php';
