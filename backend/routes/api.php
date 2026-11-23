<?php

use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\BranchController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\NewsletterController;
use App\Http\Controllers\Api\RoomTypeController;
use Illuminate\Support\Facades\Route;

Route::get('/branches', [BranchController::class, 'index']);
Route::get('/branches/{branch:slug}', [BranchController::class, 'show']);
Route::get('/room-types', [RoomTypeController::class, 'index']);

Route::middleware('throttle:10,1')->group(function () {
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::post('/contact', [ContactController::class, 'store']);
    Route::post('/newsletter', [NewsletterController::class, 'store']);
});
