import dns from "node:dns";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "MONGODB_URI is not defined. Add it to .env.local and Vercel environment variables."
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// ── mongodb+srv:// expansion ────────────────────────────────────────────────────
// The driver resolves `mongodb+srv://` by firing raw SRV/TXT queries through
// c-ares, which talks to whatever `dns.getServers()` lists. When that list is a
// local proxy that isn't running (VPN/Docker/Pi-hole/dnscrypt), every lookup
// fails with `querySrv ECONNREFUSED` — even though normal `getaddrinfo` lookups
// still work. Under Turbopack we can't fix the driver's resolver from here, so we
// expand the SRV URI to a plain multi-host `mongodb://` URI ourselves (host A
// records go through getaddrinfo) and hand that to the driver instead.
async function resolveMongoURI(uri) {
  if (!uri.startsWith("mongodb+srv://")) return uri;

  const m = uri.match(/^mongodb\+srv:\/\/(?:([^:@/]+)(?::([^@/]+))?@)?([^/?]+)(\/[^?]*)?(?:\?(.*))?$/);
  if (!m) return uri;
  const [, user, pass, srvHost, path = "/", search = ""] = m;

  // Use a private resolver with public DNS servers when the default ones are
  // loopback-only, so the SRV/TXT lookups below actually go somewhere.
  const resolver = new dns.promises.Resolver();
  const current = dns.getServers();
  const allLoopback =
    current.length === 0 ||
    current.every((s) => {
      const host = s.replace(/^\[/, "").replace(/\](:\d+)?$/, "").replace(/:\d+$/, "");
      return host === "::1" || host.startsWith("127.");
    });
  if (allLoopback) resolver.setServers(["1.1.1.1", "8.8.8.8", "1.0.0.1"]);

  const [srvRecords, txtRecords] = await Promise.all([
    resolver.resolveSrv(`_mongodb._tcp.${srvHost}`),
    resolver.resolveTxt(srvHost).catch(() => []),
  ]);

  const hosts = srvRecords.map((r) => `${r.name}:${r.port}`).join(",");

  const params = new URLSearchParams(search);
  for (const chunk of txtRecords.flat().join("").split("&")) {
    const [k, v] = chunk.split("=");
    if (k && !params.has(k)) params.set(k, v ?? "");
  }
  if (!params.has("tls") && !params.has("ssl")) params.set("tls", "true");

  const auth = user ? `${user}${pass ? `:${pass}` : ""}@` : "";
  return `mongodb://${auth}${hosts}${path}?${params.toString()}`;
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize:              5,
      serverSelectionTimeoutMS: 4000,  // fail fast on cold-start DB unavailability
      socketTimeoutMS:          6000,  // leaves ~4s for app logic within 10s limit
      connectTimeoutMS:         4000,
    };
    cached.promise = resolveMongoURI(MONGODB_URI)
      .catch((e) => {
        console.warn("[mongodb] SRV expansion failed, using original URI:", e.message);
        return MONGODB_URI;
      })
      .then((uri) => mongoose.connect(uri, opts));
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // reset so next request retries cleanly
    throw e;
  }

  return cached.conn;
}

export default connectDB;
