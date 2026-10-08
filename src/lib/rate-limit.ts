// src/lib/rate-limit.ts
type RateLimitEntry = {
  count: number;
  firstRequest: number;
};

const windowMs = 60_000; // 60 segundos
const maxRequests = 5;

const store = new Map<string, RateLimitEntry>();

function getClientIp(req: Request): string {
  // En producción, usar x‑forwarded‑for; para demo, usar una IP ficticia
  // Next.js no expone req.ip directamente; simulamos con un header
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  // Fallback: usar una IP dummy (en tests mockearemos)
  return 'unknown';
}

export function rateLimit(req: Request): { allowed: boolean; remaining: number; reset: number } {
  const ip = getClientIp(req);
  const now = Date.now();

  let entry = store.get(ip);
  if (!entry) {
    entry = { count: 1, firstRequest: now };
    store.set(ip, entry);
  }

  // Reset si la ventana ha expirado
  if (now - entry.firstRequest > windowMs) {
    entry.count = 1;
    entry.firstRequest = now;
    store.set(ip, entry);
  }

  const remaining = Math.max(0, maxRequests - entry.count);
  const reset = entry.firstRequest + windowMs;

  if (entry.count > maxRequests) {
    return { allowed: false, remaining, reset };
  }

  entry.count++;
  store.set(ip, entry);
  return { allowed: true, remaining, reset };
}

// Para tests
export function clearStore() {
  store.clear();
}