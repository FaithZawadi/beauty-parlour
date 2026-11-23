<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoomTypeResource;
use App\Models\RoomType;

class RoomTypeController extends Controller
{
    public function index()
    {
        return RoomTypeResource::collection(
            RoomType::with('branches')->orderBy('sort_order')->get()
        );
    }
}
