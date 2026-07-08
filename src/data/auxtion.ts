export type AuctionImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type AuctionImageSection = {
  id: string;
  title: string;
  images: AuctionImage[];
};

// ── ADD SCREENSHOTS HERE WHEN READY ─────────────────────
// Device captures suggested (save into public/projects/auxtion/ then uncomment):
export const auctionImageSections: AuctionImageSection[] = [
  {
    id: "live-room",
    title: "Live Auction Room",
    images: [
      { src: "/projects/auxtion/AuxtionLogo.png", alt: "Auxtion", caption: "Auxtion" },
      // { src: "/projects/auxtion/live-room.png", alt: "Live auction room", caption: "Real-time bidding — swipe gesture, item bar, timer, chat" },
    ],
  },
  {
    id: "payments",
    title: "Payments & Orders",
    images: [
      // { src: "/projects/auxtion/paymongo-checkout.png", alt: "PayMongo checkout", caption: "Real test payment at ₱700 (checkout.paymongo.com)" },
      // { src: "/projects/auxtion/order-timeline.png", alt: "Order timeline", caption: "Payment timeline — all 5 stages completed" },
      // { src: "/projects/auxtion/send-payment.png", alt: "Manual GCash transfer", caption: "Manual GCash transfer with name-mismatch warning" },
    ],
  },
  {
    id: "admin",
    title: "Admin Console",
    images: [
      // { src: "/projects/auxtion/admin-hub.png", alt: "Admin hub", caption: "Console design with live platform stats" },
      // { src: "/projects/auxtion/admin-orders.png", alt: "Admin orders", caption: "Status filters with force-cancel action" },
      // { src: "/projects/auxtion/admin-users.png", alt: "Admin users", caption: "Role management with self-lockout guard" },
    ],
  },
  {
    id: "seller",
    title: "Seller Onboarding",
    images: [
      // { src: "/projects/auxtion/seller-application.png", alt: "Seller application", caption: "ID photo upload with Terms of Service link" },
    ],
  },
];

export const allAuctionImages: AuctionImage[] = auctionImageSections.flatMap(s => s.images);

// Real stack (Expo SDK 55 · NestJS · Neon Postgres).
export const techStack = [
  { label: "React Native / Expo", desc: "Cross-platform mobile app shell (SDK 55)" },
  { label: "Expo Router", desc: "File-based navigation + deep linking" },
  { label: "NativeWind", desc: "Tailwind-style utility classes for RN" },
  { label: "NestJS", desc: "Modular API server with guards + decorators" },
  { label: "Prisma", desc: "Type-safe ORM + migration management" },
  { label: "PostgreSQL (Neon)", desc: "Primary transactional database" },
  { label: "Socket.IO", desc: "Real-time bidding + live room events" },
  { label: "Redis", desc: "Bid cache + pub/sub for live rooms" },
  { label: "HMS / 100ms", desc: "Low-latency live video streaming" },
  { label: "PayMongo", desc: "Payment Links + webhook-confirmed checkout" },
  { label: "Cloudinary", desc: "Photo upload + CDN (items, ID verification)" },
  { label: "JWT + SecureStore", desc: "Auth tokens in secure device storage" },
  { label: "@nestjs/throttler", desc: "Rate limiting on auth + webhook routes" },
  { label: "expo-image-picker", desc: "Camera / gallery access for uploads" },
];

// Verified, measured instrumentation (pre-launch, local development).
export const metrics: [string, string][] = [
  ["Happy-path verified", "6 / 6 phases"],
  ["Security fixes", "5 crit · 4 high · 6 med"],
  ["Webhook round-trip", "~300 ms p50"],
  ["Admin surface", "6 screens · 8 endpoints"],
  ["Audit commit", "24 files · +790 / −255"],
  ["End users", "0 · pre-launch"],
];

export const challenges = [
  {
    num: "01",
    title: "Bid Impersonation via WebSocket",
    problem: "The Socket.IO gateway trusted a client-supplied bidderId in event payloads — any connected socket could bid as any user.",
    solution: "JWT is now verified during the socket handshake (handleConnection). Every mutating handler (place-bid, declare-chat-winner, end-auction) derives identity from client.data.userId — cryptographically verified, never from the payload — mirroring the REST API's @CurrentUser() pattern.",
    tag: "socket auth",
  },
  {
    num: "02",
    title: "Double-Sell Race Condition",
    problem: "Two simultaneous place-bid events on the same item could both read the current price, both pass validation, and both create winning bids — selling the item twice.",
    solution: "SELECT ... FOR UPDATE row lock on the shop item inside a Postgres transaction. The second bid blocks until the first commits, then re-reads the updated price. Combined with a conditional compare-and-set (updateMany) for buy-now claims, exactly one buyer wins.",
    tag: "concurrency",
  },
  {
    num: "03",
    title: "Redis as Source of Truth",
    problem: "The winner was read from a Redis key with a 3600s TTL. If the auction ran longer than an hour, Redis restarted on a Railway redeploy, or the key was evicted, the winner was silently lost — no order created.",
    solution: "The winner is now sourced from the bids table in Postgres (highest amount, earliest timestamp for ties), inside the same transaction that creates the order. Redis stays a read-through cache for real-time UI speed, but the DB is authoritative.",
    tag: "data integrity",
  },
  {
    num: "04",
    title: "Hooks-Order Violation on Role Change",
    problem: "The admin early-return gate (if isAdmin return <AdminView>) sat before useState calls. Logging out of an admin account into a non-admin one changed the hook count between renders and crashed React.",
    solution: "All early-return role gates now sit after every hook declaration. The gate behaves identically — it just renders after hooks are registered, which React requires for consistent hook ordering.",
    tag: "react native",
  },
  {
    num: "05",
    title: "Coordinated API + Mobile Deploy",
    problem: "The socket-auth change (JWT in the handshake) needs API and mobile to ship together — old clients without the token would be rejected, and the old API would accept any connection.",
    solution: "The backend gracefully handles a missing token (falls back to anonymous / view-only instead of rejecting), so the rollout is backward-compatible. Old clients can still watch auctions but can't bid until updated.",
    tag: "rollout",
  },
];

export const bidFlow = [
  { num: "01", title: "Seller Queues Items", desc: "NestJS persists the auction and shop items to Postgres, each with a starting price and auction mode." },
  { num: "02", title: "Seller Goes Live", desc: "HMS/100ms issues an ownership-verified broadcaster token; a Socket.IO room is created and viewers join with realtime viewer tokens." },
  { num: "03", title: "Item Starts", desc: "Server emits item-started over Socket.IO; the countdown timer begins on all connected clients simultaneously." },
  { num: "04", title: "Buyer Swipes to Bid", desc: "Client sends place-bid with JWT-verified identity; the server acquires a Postgres row lock (FOR UPDATE), validates atomically, and broadcasts the new price to the room." },
  { num: "05", title: "Item Sold", desc: "On timer expiry the server reads the winner from the bids table (DB, not Redis) and creates an order with PENDING_PAYMENT status, emitting the sale to both parties." },
  { num: "06", title: "Buyer Pays", desc: "App opens PayMongo hosted checkout (card / GCash / QR Ph); PayMongo webhooks the API and the order transitions to PAID." },
  { num: "07", title: "Seller Ships", desc: "Seller enters courier + tracking number; order transitions to SHIPPED and the buyer sees tracking plus a Confirm Receipt action." },
  { num: "08", title: "Buyer Confirms", desc: "Order transitions to COMPLETED, seller payout is RELEASED, and the seller's totalSales is incremented atomically in a transaction." },
];

export const builtFeatures = [
  "Live auction room (Swipe Auction + Chat Bid modes)",
  "Real-time bidding via Socket.IO (JWT-authenticated)",
  "Live video streaming (HMS/100ms broadcaster/viewer)",
  "Buy Now + Offers (accept / decline / counter)",
  "PayMongo payments (Payment Links + webhook)",
  "Manual payment path (GCash/bank screenshot + ref)",
  "Full order lifecycle (pending → completed)",
  "Seller application with ID upload + admin review",
  "Admin panel (stats, users, orders, disputes, applications)",
  "Admin console design system + shared components",
  "Admin-account UI gating (profile, Go Live, activity)",
  "Security audit (socket auth, atomic bids, payout guards)",
  "Terms of Service + Privacy / Seller policies",
  "Profile completion gate before bidding",
  "Auto-cancel unpaid orders (10-minute timer)",
  "AfterShip courier tracking (J&T, LBC deep links)",
];

export const inProgressFeatures = [
  "Production deployment (Railway — TestFlight blocker)",
  "Push notifications (tokens wired, sending not built)",
  "PayMongo live mode (currently test mode)",
  "Winner announcement in live chat",
  "Buy Now shop-tab purchase button (placeholder)",
  "GCash / bank account picker (both forms shown)",
  "Buyer reporting system",
  "Consignment selling (analyzed, deferred)",
];
