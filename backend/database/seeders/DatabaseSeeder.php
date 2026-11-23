<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\RoomType;
use Illuminate\Database\Seeder;

/*
 * >>> SAMPLE DATA <<<
 * Branch addresses, phone numbers and prices are placeholders.
 * Replace them with Tommy's Lounge's real details, then run:
 *   php artisan migrate:fresh --seed
 */
class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $rooms = [
            'superior' => RoomType::updateOrCreate(['slug' => 'superior'], [
                'name' => 'Superior Room',
                'description' => 'Soft linens, warm wood and everything you need for a restful stay, whether you are in town for business or pleasure.',
                'image' => 'room-superior',
                'size_sqm' => 28,
                'max_guests' => 2,
                'bed' => 'Queen bed',
                'perks' => ['Rain shower', 'Smart TV', 'Work desk', 'Free Wi-Fi'],
                'sort_order' => 1,
            ]),
            'deluxe' => RoomType::updateOrCreate(['slug' => 'deluxe'], [
                'name' => 'Deluxe Room',
                'description' => 'More space to unwind, with a plush king bed, a lounge chair by the window and a generous bathroom.',
                'image' => 'room-deluxe',
                'size_sqm' => 34,
                'max_guests' => 2,
                'bed' => 'King or twin beds',
                'perks' => ['Balcony or view', 'Mini bar', 'Coffee station', 'Bathrobes & slippers'],
                'sort_order' => 2,
            ]),
            'executive' => RoomType::updateOrCreate(['slug' => 'executive'], [
                'name' => 'Executive Room',
                'description' => 'Designed for longer stays and the business traveller, with a separate seating area and lounge privileges.',
                'image' => 'room-executive',
                'size_sqm' => 40,
                'max_guests' => 3,
                'bed' => 'King bed + sofa bed',
                'perks' => ['Lounge access', 'Evening cocktails', 'Express check-in', 'Pressing service'],
                'sort_order' => 3,
            ]),
            'suite' => RoomType::updateOrCreate(['slug' => 'suite'], [
                'name' => "Tommy's Suite",
                'description' => 'Our finest accommodation: a separate living room, a deep soaking tub and a private butler on request.',
                'image' => 'room-suite',
                'size_sqm' => 65,
                'max_guests' => 4,
                'bed' => 'King bed + living room',
                'perks' => ['Separate living room', 'Soaking tub', 'Butler on request', 'Late check-out'],
                'sort_order' => 4,
            ]),
        ];

        $branches = [
            [
                'slug' => 'nairobi',
                'name' => "Tommy's Lounge Nairobi",
                'city' => 'Nairobi',
                'address' => 'Street name, Area, Nairobi',
                'phone' => '+254 700 000 001',
                'email' => 'nairobi@tommyslounge.co.ke',
                'image' => 'exterior',
                'summary' => 'Our flagship city address: a calm, polished retreat minutes from the business district, with a signature lounge that comes alive after dark.',
                'description' => "Set in a leafy part of the city, our Nairobi branch is made for travellers who want to be close to everything and still sleep in peace.\nStart the day with breakfast on the terrace, take meetings in our private boardroom, and end it in the lounge with a cocktail and live music.",
                'features' => ['Rooftop lounge', 'Signature restaurant', 'Conference rooms', 'Secure parking', 'Airport transfers', '24-hour room service'],
                'sort_order' => 1,
                'rooms' => ['superior' => [8500, 12], 'deluxe' => [12000, 10], 'executive' => [16500, 6], 'suite' => [25000, 2]],
            ],
            [
                'slug' => 'mombasa',
                'name' => "Tommy's Lounge Mombasa",
                'city' => 'Mombasa',
                'address' => 'Street name, Area, Mombasa',
                'phone' => '+254 700 000 002',
                'email' => 'mombasa@tommyslounge.co.ke',
                'image' => 'resort',
                'summary' => 'Ocean breezes, a palm-fringed pool and long, slow coastal evenings, made for unhurried holidays and weekends away.',
                'description' => "Our coastal branch is all about slowing down: mornings by the pool, afternoons on the beach and sunsets with a cold drink in hand.\nFamilies, couples and friends will find plenty of space to relax, with a poolside bar and fresh seafood every evening.",
                'features' => ['Outdoor pool', 'Poolside bar', 'Garden terrace', 'Family rooms', 'Beach shuttle', 'Free Wi-Fi'],
                'sort_order' => 2,
                'rooms' => ['superior' => [9000, 10], 'deluxe' => [13500, 10], 'suite' => [28000, 2]],
            ],
            [
                'slug' => 'nakuru',
                'name' => "Tommy's Lounge Nakuru",
                'city' => 'Nakuru',
                'address' => 'Street name, Area, Nakuru',
                'phone' => '+254 700 000 003',
                'email' => 'nakuru@tommyslounge.co.ke',
                'image' => 'poolside',
                'summary' => 'A relaxed Rift Valley base for safaris, road trips and celebrations, with spacious grounds and a lively lounge.',
                'description' => "Our Nakuru branch is a peaceful stop for travellers exploring the Rift Valley.\nSpacious gardens host weddings and family celebrations, while the lounge and grill keep things lively on weekends.",
                'features' => ['Event garden', 'Lounge & grill', 'Free Wi-Fi', 'Ample parking', 'Safari bookings'],
                'sort_order' => 3,
                'rooms' => ['superior' => [7000, 12], 'deluxe' => [10000, 8], 'executive' => [14000, 4]],
            ],
        ];

        foreach ($branches as $data) {
            $roomRates = $data['rooms'];
            unset($data['rooms']);

            $branch = Branch::updateOrCreate(['slug' => $data['slug']], $data);

            $branch->roomTypes()->sync(collect($roomRates)->mapWithKeys(fn ($rate, $slug) => [
                $rooms[$slug]->id => ['price_per_night' => $rate[0], 'inventory' => $rate[1]],
            ])->all());
        }
    }
}
