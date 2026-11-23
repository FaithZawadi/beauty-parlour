<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomTypeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'description' => $this->description,
            'image' => $this->image,
            'size_sqm' => $this->size_sqm,
            'max_guests' => $this->max_guests,
            'bed' => $this->bed,
            'perks' => $this->perks ?? [],
            // Present when loaded through a branch.
            'price_per_night' => $this->whenPivotLoaded('branch_room_type', fn () => (float) $this->pivot->price_per_night),
            // Present when listing room types across all branches.
            'price_from' => $this->when(
                $this->relationLoaded('branches'),
                fn () => $this->branches->min(fn ($b) => (float) $b->pivot->price_per_night),
            ),
            'branches' => $this->when($this->relationLoaded('branches'), fn () => $this->branches->map(fn ($b) => [
                'slug' => $b->slug,
                'name' => $b->name,
                'city' => $b->city,
                'price_per_night' => (float) $b->pivot->price_per_night,
            ])->values()),
        ];
    }
}
