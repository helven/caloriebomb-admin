<?php

use App\Http\Controllers\Api\V1\FoodController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\OauthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    // Public routes
    Route::post('login', [OauthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        // User logout
        Route::post('logout', [OauthController::class, 'logout']);

        // Users endpoints
        Route::prefix('users')->group(function () {
            // Route::get('/', [UserController::class, 'index']);
            // Route::get('/{user}', [UserController::class, 'show']);
        });

        // Food endpoints
        Route::apiResource('foods', FoodController::class);
        Route::prefix('foods')->group(function () {
            Route::get('/categories', [FoodController::class, 'categories']);
            Route::post('/submit', [FoodController::class, 'store']);
        });
    });
    //Route::prefix('foods')->group(function () {
    //    Route::get('/', [FoodController::class, 'index']);
    //    Route::get('/categories', [FoodController::class, 'categories']);
    //    Route::get('/{id}', [FoodController::class, 'show']);
    //    Route::post('/', [FoodController::class, 'store']);
    //    Route::put('/{id}', [FoodController::class, 'update']);
    //    Route::delete('/{id}', [FoodController::class, 'destroy']);
    //});
});
