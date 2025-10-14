<?php

use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Custom route
    Route::patch('users/{user}/activate', [UserController::class, 'activate'])->name('users.activate');
    Route::patch('users/{user}/deactivate', [UserController::class, 'deactivate'])->name('users.deactivate');
    Route::patch('users/{user}/trash', [UserController::class, 'trash'])->name('users.trash');
    Route::patch('users/{user}/restore-trash', [UserController::class, 'restoreTrash'])->name('users.restore-trash');

    // User management routes
    Route::resource('users', UserController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
