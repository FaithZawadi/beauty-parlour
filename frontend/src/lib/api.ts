export type RoomType = {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
  size_sqm: number | null;
  max_guests: number;
  bed: string;
  perks: string[];
  price_from?: number | null;
  price_per_night?: number;
  branches?: { slug: string; name: string; city: string; price_per_night: number }[];
};

export type Branch = {
  id: number;
  slug: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  image: string;
  summary: string;
  description: string;
  features: string[];
  price_from?: number | null;
  room_types?: RoomType[];
};

/* Accepts "https://host/api", "https://host" or a bare "host" (as Render provides). */
function apiBase(value: string | undefined) {
  let v = (value ?? "").trim().replace(/\/+$/, "");
  if (!v) return "http://127.0.0.1:8000/api";
  if (!/^https?:\/\//.test(v)) v = `https://${v}`;
  return v.endsWith("/api") ? v : `${v}/api`;
}

const SERVER_API = apiBase(process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL);
export const CLIENT_API = apiBase(process.env.NEXT_PUBLIC_API_URL);

async function get<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${SERVER_API}${path}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as T;
  } catch {
    return null;
  }
}

export const getBranches = () => get<Branch[]>("/branches");
export const getBranch = (slug: string) => get<Branch>(`/branches/${encodeURIComponent(slug)}`);
export const getRooms = () => get<RoomType[]>("/room-types");

export function kes(amount?: number | null) {
  if (amount == null) return "";
  return "KES " + Math.round(amount).toLocaleString("en-KE");
}

/* POST helper for client components. Returns {ok, data, errors, message}. */
export async function post(path: string, body: unknown) {
  try {
    const res = await fetch(`${CLIENT_API}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => ({}));
    return {
      ok: res.ok,
      data: json.data,
      message: json.message as string | undefined,
      errors: (json.errors ?? {}) as Record<string, string[]>,
    };
  } catch {
    return {
      ok: false,
      data: null,
      message: "We couldn't reach the reservations server. Please try again or call us.",
      errors: {} as Record<string, string[]>,
    };
  }
}
