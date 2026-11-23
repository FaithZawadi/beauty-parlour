/*
 * Static site content (things that rarely change).
 * Branches, room types and prices come from the Laravel API / PostgreSQL.
 *
 * >>> Contact details and reviews below are SAMPLE DATA – replace them. <<<
 */

export const HOTEL = {
  name: "Tommy's Lounge",
  tagline: "Hotel & Lounge",
  phone: "+254 700 000 000",
  email: "reservations@tommyslounge.co.ke",
  whatsapp: "254700000000",
  social: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "TikTok", href: "#" },
  ],
};

/*
 * Image library. To use your own photo, put it in /public/images and change
 * the value, e.g. hero: "/images/hero.jpg". Branch and room images in the
 * database can use any key below, a /images/... path or a full URL.
 */
const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=80`;
export const IMAGES: Record<string, string> = {
  hero: u("photo-1566073771259-6a8506099945"),
  lobby: u("photo-1551882547-ff40c63fe5fa"),
  exterior: u("photo-1542314831-068cd1dbfeeb"),
  pool: u("photo-1571896349842-33c89424de2d"),
  resort: u("photo-1520250497591-112f2f40a3f4"),
  poolside: u("photo-1540541338287-41700207dee6"),
  "room-deluxe": u("photo-1582719478250-c89cae4dc85b"),
  "room-superior": u("photo-1590490360182-c33d57733427"),
  "room-executive": u("photo-1611892440504-42a792e24d32"),
  "room-suite": u("photo-1578683010236-d716f9a3f461"),
  dining: u("photo-1414235077428-338989a2e8c0"),
  lounge: u("photo-1514933651103-005eec06c04b"),
  spa: u("photo-1544161515-4ab6ce6db874"),
  events: u("photo-1519167758481-83f550bb49b3"),
};

export function img(key?: string | null): string {
  if (!key) return IMAGES.hero;
  if (key.startsWith("http") || key.startsWith("/")) return key;
  return IMAGES[key] ?? IMAGES.hero;
}

export const NAV = [
  { href: "/branches", label: "Our Branches" },
  { href: "/rooms", label: "Rooms & Suites" },
  { href: "/dining", label: "Dining & Lounge" },
  { href: "/meetings", label: "Meetings & Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const DINING = [
  {
    name: "The Lounge",
    type: "Cocktails · Live music",
    image: "lounge",
    hours: "4:00 pm – late",
    text: "Our namesake. Low lights, crafted cocktails, a considered wine list and live sets every weekend.",
  },
  {
    name: "The Dining Room",
    type: "All-day dining",
    image: "dining",
    hours: "6:30 am – 11:00 pm",
    text: "Generous breakfasts, relaxed lunches and candle-lit dinners celebrating Kenyan produce and global classics.",
  },
  {
    name: "Poolside Grill",
    type: "Grill · Light bites",
    image: "pool",
    hours: "11:00 am – 7:00 pm",
    text: "Nyama choma, fresh juices and wood-fired favourites, served in the sun by the water.",
  },
];

export const EXPERIENCES = [
  { title: "Spa & Wellness", text: "Massages, facials and steam rooms to restore body and mind.", image: "spa" },
  { title: "Pool & Gardens", text: "Sun loungers, shaded cabanas and quiet green spaces.", image: "poolside" },
  { title: "Meetings & Events", text: "Boardrooms to garden weddings, planned to the last detail.", image: "events" },
];

export const VENUES = [
  { name: "The Boardroom", capacity: "Up to 12 guests", text: "Private, quiet and fully equipped for executive meetings." },
  { name: "The Grand Hall", capacity: "Up to 250 guests", text: "Conferences, launches and gala dinners with full AV support." },
  { name: "The Garden", capacity: "Up to 400 guests", text: "Weddings, birthdays and celebrations under the open sky." },
  { name: "The Lounge – private hire", capacity: "Up to 80 guests", text: "Cocktail receptions and after-parties with a dedicated bar team." },
];

export const REVIEWS = [
  { quote: "Beautiful rooms, warm staff and the best cocktails in town. We will be back.", name: "Sample guest", from: "Nairobi" },
  { quote: "Spotless, quiet and so comfortable. Breakfast was excellent.", name: "Sample guest", from: "Kampala" },
  { quote: "Perfect for our company retreat – every detail was taken care of.", name: "Sample guest", from: "Mombasa" },
];
