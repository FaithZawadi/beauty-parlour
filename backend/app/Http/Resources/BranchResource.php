<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BranchResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'city' => $this->city,
            'address' => $this->address,
            'phone' => $this->phone,
            'email' => $this->email,
            'image' => $this->image,
            'summary' => $this->summary,
            'description' => $this->description,
            'features' => $this->features ?? [],
            'price_from' => $this->whenLoaded(
                'roomTypes',
                fn () => $this->roomTypes->min(fn ($r) => (float) $r->pivot->price_per_night),
            ),
            'room_types' => RoomTypeResource::collection($this->whenLoaded('roomTypes')),
        ];
    }
}
