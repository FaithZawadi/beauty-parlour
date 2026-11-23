/*
 * Static site content (things that rarely change).
 * Branches, room types and prices come from the Laravel API / PostgreSQL.
 *
 * >>> Phone, email, WhatsApp and social links below are PLACEHOLDERS – replace them. <<<
 */

export const HOTEL = {
  name: "Tommy's Lounge",
  tagline: "Hotel & Lounge",
  greeting: "Karibu",
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
  /* Replace these two with real photos of each branch, e.g. "/images/airport.jpg" */
  "branch-airport": u("photo-1542314831-068cd1dbfeeb"),
  "branch-ikombe": u("photo-1571896349842-33c89424de2d"),
};

export function img(key?: string | null): string {
  if (!key) return IMAGES.hero;
  if (key.startsWith("http") || key.startsWith("/")) return key;
  return IMAGES[key] ?? IMAGES.hero;
}

export const NAV = [
  { href: "/branches", label: "Our Branches" },
  { href: "/rooms", label: "Rooms" },
  { href: "/dining", label: "Dining & Lounge" },
  { href: "/meetings", label: "Meetings & Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const DINING = [
  {
    name: "The Lounge",
    type: "Drinks · Music · Good company",
    image: "lounge",
    hours: "Open daily until late",
    text: "The heart of every Tommy's. Cold drinks, good music and a relaxed crowd – the place to end the day.",
  },
  {
    name: "Breakfast at Tommy's",
    type: "Included with your stay",
    image: "dining",
    hours: "Every morning",
    text: "Start the day properly. Breakfast comes with your room, whether you're catching a flight or heading for the pool.",
  },
  {
    name: "The Grill",
    type: "Nyama choma · Kenyan favourites",
    image: "pool",
    hours: "Lunch & dinner",
    text: "Freshly grilled nyama choma, sides and cold drinks, served outdoors in the sunshine.",
  },
];

export const EXPERIENCES = [
  { title: "Pool days", text: "Sunshine, a sparkling pool and space to relax – especially at Ikombe.", image: "poolside" },
  { title: "The Lounge", text: "Music, drinks and the easy, sociable atmosphere we're named after.", image: "lounge" },
  { title: "Celebrations", text: "Birthdays, family days out and group events, hosted with care.", image: "events" },
];

/* Reasons to stay – shown in the gold ticker on the home page. */
export const AMENITIES = [
  "Breakfast included",
  "Free Wi-Fi",
  "Free parking",
  "Swimming pool",
  "Near the airport",
  "Lounge & grill",
  "Events & celebrations",
  "Karibu sana",
];

export const VENUES = [
  { name: "Poolside celebrations", capacity: "Ikombe", text: "Birthdays, family days and pool parties with food and drinks from the grill." },
  { name: "Lounge hire", capacity: "All branches", text: "Private evenings and get-togethers with drinks and music." },
  { name: "Meetings & group stays", capacity: "Airport Lounge", text: "Convenient for teams and travellers passing through Nairobi." },
  { name: "Something else in mind?", capacity: "Just ask", text: "Tell us what you're planning and we'll make it work." },
];

/* Public guest ratings (Google & Booking.com, Nov 2026). Update these from time to time. */
export const RATINGS = [
  { score: "4.7", out: "5", source: "Google", detail: "18 reviews", branch: "Tommy's Lounge Ikombe" },
  { score: "4.5", out: "5", source: "Google", detail: "72 reviews", branch: "Tommy's Airport Lounge" },
  { score: "7.6", out: "10", source: "Booking.com", detail: "47 reviews · Good", branch: "Tommy's Airport Lounge" },
];
