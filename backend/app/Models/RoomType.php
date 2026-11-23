<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class RoomType extends Model
{
    protected $fillable = [
        'slug', 'name', 'description', 'image', 'size_sqm', 'max_guests', 'bed', 'perks', 'sort_order',
    ];

    protected function casts(): array
    {
        return ['perks' => 'array'];
    }

    public function branches(): BelongsToMany
    {
        return $this->belongsToMany(Branch::class)
            ->withPivot(['price_per_night', 'inventory'])
            ->withTimestamps()
            ->where('is_active', true)
            ->orderBy('sort_order');
    }
}
