<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate(['email' => ['required', 'email', 'max:160']]);

        NewsletterSubscriber::firstOrCreate(['email' => strtolower($data['email'])]);

        return response()->json(['message' => 'Subscribed.'], 201);
    }
}
