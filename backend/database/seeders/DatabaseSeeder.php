<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\RoomType;
use Illuminate\Database\Seeder;

/*
 * Tommy's Lounge branches and rooms.
 *
 * Taken from the public Google / Booking.com listings (Nov 2026):
 *   - Tommy's Airport Lounge, Nairobi: 3-star, ~13 km from the city centre,
 *     Deluxe Double Room with Bath (2 single beds, breakfast) ~KES 5,700.
 *   - Tommy's Lounge Ikombe, Machakos County (near Matuu): pool, from ~KES 3,200.
 *
 * >>> STILL TO CONFIRM (marked "TODO") <<<
 * phone numbers, emails, exact addresses, the Deluxe Single price, room sizes
 * and room counts. After editing run:  php artisan migrate:fresh --seed
 */
class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $rooms = [
            'deluxe-double' => RoomType::updateOrCreate(['slug' => 'deluxe-double'], [
                'name' => 'Deluxe Double Room',
                'description' => 'A bright, airy room with two single beds, a private en-suite bathroom and breakfast included – ideal for colleagues, friends or an early flight.',
                'image' => 'room-deluxe',
                'size_sqm' => null,
                'max_guests' => 2,
                'bed' => '2 single beds',
                'perks' => ['Breakfast included', 'En-suite bathroom', 'Free Wi-Fi', 'Free parking'],
                'sort_order' => 1,
            ]),
            'deluxe-single' => RoomType::updateOrCreate(['slug' => 'deluxe-single'], [
                'name' => 'Deluxe Single Room',
                'description' => 'A calm, well-kept room for the solo traveller – crisp linens, a comfortable bed and everything you need to rest before the next leg of your journey.',
                'image' => 'room-superior',
                'size_sqm' => null,
                'max_guests' => 1,
                'bed' => 'Single bed',
                'perks' => ['Breakfast included', 'Free Wi-Fi', 'Free parking', 'Pool access'],
                'sort_order' => 2,
            ]),
            'standard' => RoomType::updateOrCreate(['slug' => 'standard'], [
                'name' => 'Standard Room',
                'description' => 'Comfortable, great-value rooms steps from the pool and lounge – perfect for weekend getaways, family visits and celebrations.',
                'image' => 'room-executive',
                'size_sqm' => null,
                'max_guests' => 2,
                'bed' => 'Double bed',
                'perks' => ['Pool access', 'Free parking', 'Free Wi-Fi', 'Lounge & grill'],
                'sort_order' => 3,
            ]),
        ];

        // Remove branches / room types from the earlier sample data.
        Branch::whereNotIn('slug', ['airport', 'ikombe'])->delete();
        RoomType::whereNotIn('slug', array_keys($rooms))->delete();

        $branches = [
            [
                'slug' => 'airport',
                'name' => "Tommy's Airport Lounge",
                'city' => 'Nairobi',
                'address' => 'Nairobi National Park area, Nairobi – about 13 km from the city centre', // TODO exact address
                'phone' => '+254 700 000 001',                     // TODO
                'email' => 'airport@tommyslounge.co.ke',           // TODO
                'image' => 'branch-airport',
                'summary' => 'A quiet, leafy 3-star stay on the airport side of Nairobi – breakfast included, free parking and an easy ride to JKIA.',
                'description' => "Tommy's Airport Lounge is made for travellers who want calm and convenience: about 13 km from the city centre, close to Nairobi National Park and an easy drive to the airport.\nRooms come with breakfast, free Wi-Fi and secure parking, so you can arrive late, sleep well and leave rested.",
                'features' => ['3-star hotel', 'Breakfast included', 'Free Wi-Fi', 'Free parking', 'Near the airport', 'Lounge & bar'],
                'sort_order' => 1,
                // room slug => [price per night KES, rooms of this type]
                'rooms' => [
                    'deluxe-double' => [5700, 6],  // price from listing; TODO room count
                    'deluxe-single' => [4500, 4],  // TODO confirm price & count
                ],
            ],
            [
                'slug' => 'ikombe',
                'name' => "Tommy's Lounge Ikombe",
                'city' => 'Ikombe',
                'address' => 'Ikombe, Machakos County – near Matuu', // TODO exact address
                'phone' => '+254 700 000 002',                       // TODO
                'email' => 'ikombe@tommyslounge.co.ke',              // TODO
                'image' => 'branch-ikombe',
                'summary' => 'Sunshine, a sparkling pool and a lively lounge in the Machakos countryside – our favourite place for weekends and celebrations.',
                'description' => "Out in the open country of Machakos County, Tommy's Lounge Ikombe is where guests come to unwind: long days by the pool, nyama choma from the grill and easy evenings in the lounge.\nWith plenty of space outdoors, it is a natural choice for family days out, birthdays and group celebrations.",
                'features' => ['Swimming pool', 'Lounge & grill', 'Free parking', 'Outdoor events', 'Free Wi-Fi'],
                'sort_order' => 2,
                'rooms' => [
                    'standard' => [3200, 8], // price from listing; TODO room count
                ],
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
