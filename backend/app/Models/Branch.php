<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Branch extends Model
{
    protected $fillable = [
        'slug', 'name', 'city', 'address', 'phone', 'email', 'image',
        'summary', 'description', 'features', 'is_active', 'sort_order',
    ];

    protected function casts(): array
    {
        return ['features' => 'array', 'is_active' => 'boolean'];
    }

    public function roomTypes(): BelongsToMany
    {
        return $this->belongsToMany(RoomType::class)
            ->withPivot(['price_per_night', 'inventory'])
            ->withTimestamps()
            ->orderBy('sort_order');
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}
