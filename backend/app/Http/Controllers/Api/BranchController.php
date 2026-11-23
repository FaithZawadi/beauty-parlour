<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BranchResource;
use App\Models\Branch;

class BranchController extends Controller
{
    public function index()
    {
        $branches = Branch::where('is_active', true)
            ->with('roomTypes')
            ->orderBy('sort_order')
            ->get();

        return BranchResource::collection($branches);
    }

    public function show(Branch $branch)
    {
        abort_unless($branch->is_active, 404);

        return new BranchResource($branch->load('roomTypes'));
    }
}
