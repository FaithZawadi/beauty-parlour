<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Booking extends Model
{
    protected $fillable = [
        'reference', 'branch_id', 'room_type_id', 'check_in', 'check_out', 'adults', 'children',
        'guest_name', 'guest_email', 'guest_phone', 'special_requests',
        'price_per_night', 'nights', 'total_amount', 'status',
    ];

    protected function casts(): array
    {
        return [
            'check_in' => 'date',
            'check_out' => 'date',
            'price_per_night' => 'decimal:2',
            'total_amount' => 'decimal:2',
        ];
    }

    public static function newReference(): string
    {
        do {
            $ref = 'TL-'.strtoupper(Str::random(6));
        } while (static::where('reference', $ref)->exists());

        return $ref;
    }

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function roomType(): BelongsTo
    {
        return $this->belongsTo(RoomType::class);
    }
}
