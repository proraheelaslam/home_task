<?php

use App\Http\Controllers\API\Auth\LoginController;
use App\Http\Controllers\API\Auth\RegisterController;
use App\Http\Controllers\API\NewsController;

Route::controller(RegisterController::class)->group(function() {
    Route::post('register', 'register');
});

Route::controller(LoginController::class)->group(function() {
    Route::post('login', 'login');
});

Route::middleware('auth:sanctum')->prefix('news')->group(function() {
    Route::get('search', [NewsController::class, 'searchArticles']);
    Route::get('personalized-feed', [NewsController::class, 'personalizedFeed']);
});
