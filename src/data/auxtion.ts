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
export const auctionImageSections: AuctionImageSection[] = [
  {
    id: "live-room",
    title: "Live Auction Room",
    images: [
       { src: "/projects/auxtion/AuxtionLogo.png", alt: "Auxtion Logo", caption: "Auxtion Logo" },
      // { src: "/projects/auxtion/live-room-2.png", alt: "Live auction room chat mode", caption: "Chat bid mode" },
    ],
  },
  {
    id: "bidding",
    title: "Bidding & Proxy System",
    images: [
      // { src: "/projects/auxtion/proxy-bid.png", alt: "Max bid proxy system", caption: "eBay-style proxy bidding" },
    ],
  },
  {
    id: "seller",
    title: "Seller Dashboard",
    images: [
      // { src: "/projects/auxtion/seller-queue.png", alt: "Seller queue management", caption: "Live queue management" },
    ],
  },
  {
    id: "explore",
    title: "Explore & Profiles",
    images: [
      // { src: "/projects/auxtion/explore.png", alt: "Explore screen", caption: "Discover auctions" },
    ],
  },
];

export const allAuctionImages: AuctionImage[] = auctionImageSections.flatMap(s => s.images);

export const techStack = [
  { label: "React Native", desc: "Mobile-first iOS & Android (Expo)" },
  { label: "NestJS", desc: "Backend API on Railway" },
  { label: "Socket.IO", desc: "Real-time bidding gateway" },
  { label: "PostgreSQL", desc: "Persistent auction & bid data" },
  { label: "Prisma", desc: "ORM + row-level locking for bid atomicity" },
  { label: "Redis", desc: "Pub/sub, bid fan-out under 10ms" },
  { label: "JWT", desc: "Auth with refresh token rotation" },
  { label: "PayMongo", desc: "Payment integration (in progress)" },
  { label: "Cloudinary", desc: "Photo uploads (in progress)" },
];

export const challenges = [
  {
    num: "01",
    title: "Bid Race Conditions",
    problem: "Two buyers placing a bid at the exact same millisecond — both reading the same currentPrice, both passing validation, both winning.",
    solution: "Prisma transactions + PostgreSQL row-level locking on ShopItem. The server reads currentPrice inside a transaction and writes atomically — any concurrent bid reading stale price is rejected. Max bids use an upsert with a unique constraint (itemId + userId) to prevent duplicate proxy bids firing simultaneously.",
    tag: "core problem",
    tagColor: "var(--pink)",
  },
  {
    num: "02",
    title: "Stale Socket Closures",
    problem: "All socket callbacks are registered once on mount. State values go stale inside them — a bid handler reading currentPrice sees the value from when it was registered, not the latest.",
    solution: "A ref-mirror pattern: every value read inside socket handlers is mirrored to a useRef via useEffect. Handlers read from the ref, not state — so they always see the latest value without re-registering.",
    tag: "react native",
    tagColor: "var(--cyan)",
  },
  {
    num: "03",
    title: "Proxy Bid Engine",
    problem: "eBay-style proxy bidding: two buyers with max bids battle invisibly, winner pays loser's max + increment. The client should never see the ceiling price.",
    solution: "Entire proxy resolution runs server-side. When a bid lands, the server checks the MaxBid table, resolves the battle in order (highest max wins, price = loser max + increment), and emits only the resolved price to clients — never the ceiling.",
    tag: "bidding logic",
    tagColor: "var(--a2)",
  },
  {
    num: "04",
    title: "Timer Synchronization",
    problem: "Countdown timer running on multiple clients drifts over time. Seller disconnect mid-auction leaves the timer in an undefined state.",
    solution: "Timer lives exclusively on the server as a Node interval. Each tick is emitted via Socket.IO to all clients — clients only display, never compute. Seller disconnect pauses the interval; reconnect resumes from the exact remaining time.",
    tag: "real-time",
    tagColor: "var(--green)",
  },
  {
    num: "05",
    title: "iOS Live Room Layout",
    problem: "Dynamic bottom bar height across iPhone models + keyboard appearance breaks the auction room UI — bid input gets obscured or layout jumps.",
    solution: "Bottom bar height derived from useSafeAreaInsets + a keyboard height listener. All layout values computed dynamically per device — no hardcoded insets.",
    tag: "mobile",
    tagColor: "var(--a2)",
  },
];

export const bidFlow = [
  { num: "01", title: "Buyer Swipes / Taps", desc: "Swipe-up or tap triggers a Socket.IO emit (place-bid) from the client.", icon: "👆" },
  { num: "02", title: "Gateway Validates", desc: "Server validates bid is strictly greater than currentPrice before touching the database.", icon: "🔍" },
  { num: "03", title: "Atomic Write", desc: "Prisma transaction locks the ShopItem row, updates currentPrice and winnerId atomically. Concurrent bids on stale price are rejected.", icon: "🔒" },
  { num: "04", title: "Proxy Resolution", desc: "Server checks MaxBid table for active proxy bids. If two proxies compete, the battle resolves server-side — loser's max + increment wins.", icon: "⚡" },
  { num: "05", title: "Room Broadcast", desc: "bid-update emitted to the entire auction room. All clients update UI simultaneously.", icon: "📡" },
  { num: "06", title: "Timer Reset", desc: "Counterbid window resets. Server interval continues ticking and emitting to all clients.", icon: "⏱" },
  { num: "07", title: "Item Ends", desc: "Timer hits 0 → server auto-sells, emits item-ended. Winner and seller both notified.", icon: "🏆" },
];

export const builtFeatures = [
  "Live auction rooms (swipe + chat bid modes)",
  "Live buy now",
  "Real-time bidding with proxy / max bid system",
  "Offer system (buyer offers → seller accepts / declines)",
  "Seller queue management",
  "Auction scheduling",
  "Explore & search",
  "User profiles",
  "JWT auth with refresh token rotation",
  "Seller rejoin on disconnect",
];

export const inProgressFeatures = [
  "PayMongo payment flow",
  "Photo uploads (Cloudinary)",
  "Order system post-sale",
  "Push notifications (expo-notifications)",
  "Reaction emojis",
  "Viewer count deduplication",
  "Seller queue reordering",
  "Winner announced in chat",
];