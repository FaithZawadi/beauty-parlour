<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Branch;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'branch' => ['required', 'string', 'exists:branches,slug'],
            'room_type' => ['required', 'string', 'exists:room_types,slug'],
            'check_in' => ['required', 'date', 'after_or_equal:today'],
            'check_out' => ['required', 'date', 'after:check_in'],
            'adults' => ['required', 'integer', 'min:1', 'max:10'],
            'children' => ['nullable', 'integer', 'min:0', 'max:10'],
            'guest_name' => ['required', 'string', 'max:120'],
            'guest_email' => ['required', 'email', 'max:160'],
            'guest_phone' => ['required', 'string', 'max:40'],
            'special_requests' => ['nullable', 'string', 'max:2000'],
        ], [
            'check_in.after_or_equal' => 'Check-in cannot be in the past.',
            'check_out.after' => 'Check-out must be after check-in.',
        ]);

        $branch = Branch::where('slug', $data['branch'])->where('is_active', true)->firstOrFail();
        $room = $branch->roomTypes()->where('slug', $data['room_type'])->first();

        if (! $room) {
            throw ValidationException::withMessages([
                'room_type' => 'This room type is not available at the selected branch.',
            ]);
        }

        $guests = $data['adults'] + ($data['children'] ?? 0);
        if ($guests > $room->max_guests) {
            throw ValidationException::withMessages([
                'adults' => "The {$room->name} sleeps up to {$room->max_guests} guests.",
            ]);
        }

        $checkIn = Carbon::parse($data['check_in'])->startOfDay();
        $checkOut = Carbon::parse($data['check_out'])->startOfDay();
        $nights = (int) $checkIn->diffInDays($checkOut);

        if ($nights > 60) {
            throw ValidationException::withMessages([
                'check_out' => 'For stays longer than 60 nights please contact us directly.',
            ]);
        }

        $booking = DB::transaction(function () use ($branch, $room, $data, $checkIn, $checkOut, $nights) {
            // Lock this branch/room row so concurrent requests can't overbook.
            $inventory = DB::table('branch_room_type')
                ->where('branch_id', $branch->id)
                ->where('room_type_id', $room->id)
                ->lockForUpdate()
                ->value('inventory');

            $overlapping = Booking::where('branch_id', $branch->id)
                ->where('room_type_id', $room->id)
                ->where('status', '!=', 'cancelled')
                ->where('check_in', '<', $checkOut)
                ->where('check_out', '>', $checkIn)
                ->count();

            if ($overlapping >= $inventory) {
                throw ValidationException::withMessages([
                    'room_type' => 'Sorry, this room is fully booked for those dates. Please try other dates or another room.',
                ]);
            }

            $price = (float) $room->pivot->price_per_night;

            return Booking::create([
                'reference' => Booking::newReference(),
                'branch_id' => $branch->id,
                'room_type_id' => $room->id,
                'check_in' => $checkIn,
                'check_out' => $checkOut,
                'adults' => $data['adults'],
                'children' => $data['children'] ?? 0,
                'guest_name' => $data['guest_name'],
                'guest_email' => $data['guest_email'],
                'guest_phone' => $data['guest_phone'],
                'special_requests' => $data['special_requests'] ?? null,
                'price_per_night' => $price,
                'nights' => $nights,
                'total_amount' => $price * $nights,
                'status' => 'pending',
            ]);
        });

        return response()->json([
            'message' => 'Reservation request received.',
            'data' => [
                'reference' => $booking->reference,
                'status' => $booking->status,
                'branch' => $branch->name,
                'room' => $room->name,
                'check_in' => $booking->check_in->toDateString(),
                'check_out' => $booking->check_out->toDateString(),
                'nights' => $booking->nights,
                'total_amount' => (float) $booking->total_amount,
            ],
        ], 201);
    }
}
