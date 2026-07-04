"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HomeIcon,
  Search,
  Heart,
  PlusSquare,
  Film,
  Instagram,
  Phone,
  MessageCircle,
  X,
  Send,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Truck,
  Globe,
  Star,
  Gem,
  Sparkles,
  Flame,
  Scissors,
  Palette,
  Ruler,
  Bookmark,
  Share2,
  Grid3X3,
} from "lucide-react";

const PHONE = "918160159403";
const WA_BASE = `https://wa.me/${PHONE}`;
const IG_URL = "https://www.instagram.com/spiffy_clothing_and_jewellery";

/* ─── PINTEREST-STYLE MASONRY DATA ─── */
const PINS: { src: string; title: string; height: string; likes: number }[] = [
  { src: "https://sfile.chatglm.cn/images-ppt/c124a55fa892.jpg", title: "Ornate Heritage Lehenga", height: "h-72", likes: 342 },
  { src: "https://sfile.chatglm.cn/images-ppt/9884bd5243b9.png", title: "Tiered Mirror Work", height: "h-56", likes: 218 },
  { src: "https://sfile.chatglm.cn/images-ppt/60a5ce0fae2e.jpg", title: "Royal Bandhani Set", height: "h-64", likes: 456 },
  { src: "https://sfile.chatglm.cn/images-ppt/4e216ba5524c.png", title: "Colorful Traditional", height: "h-80", likes: 189 },
  { src: "https://sfile.chatglm.cn/images-ppt/a4176f3608e7.jpeg", title: "Embroidered Elegance", height: "h-56", likes: 521 },
  { src: "https://sfile.chatglm.cn/images-ppt/340c03ecfbd5.jpg", title: "Yellow Festive Look", height: "h-72", likes: 307 },
  { src: "https://sfile.chatglm.cn/images-ppt/ebf7a28f119c.jpg", title: "Rich Silk Chaniya", height: "h-64", likes: 274 },
  { src: "https://sfile.chatglm.cn/images-ppt/ad05fdfa4191.jpg", title: "Teal Embroidered", height: "h-56", likes: 395 },
  { src: "https://sfile.chatglm.cn/images-ppt/027c185047a3.jpg", title: "Festive Grandeur", height: "h-80", likes: 612 },
  { src: "https://sfile.chatglm.cn/images-ppt/cb15ba3ae2b8.png", title: "Pink Blue Dupatta", height: "h-56", likes: 168 },
  { src: "https://sfile.chatglm.cn/images-ppt/5c3721b0e2c5.jpg", title: "Garba Dancer", height: "h-64", likes: 489 },
  { src: "https://sfile.chatglm.cn/images-ppt/a78be4f5bedb.jpg", title: "Green Red Combo", height: "h-72", likes: 231 },
  { src: "https://sfile.chatglm.cn/images-ppt/5cf850d3dd40.jpg", title: "Ornate Room Pose", height: "h-56", likes: 347 },
  { src: "https://sfile.chatglm.cn/images-ppt/8cb73d7a1f7b.jpg", title: "Kundan Royal Set", height: "h-64", likes: 413 },
  { src: "https://sfile.chatglm.cn/images-ppt/e524710e5df1.jpeg", title: "Pearl Choker Set", height: "h-56", likes: 285 },
  { src: "https://sfile.chatglm.cn/images-ppt/85bf6c9f384b.jpg", title: "Gemstone Jhumkas", height: "h-72", likes: 198 },
  { src: "https://sfile.chatglm.cn/images-ppt/16d7581478f1.jpg", title: "Turquoise Necklace", height: "h-56", likes: 367 },
  { src: "https://sfile.chatglm.cn/images-ppt/e8f41674c678.jpg", title: "Temple Gold Set", height: "h-64", likes: 534 },
];

/* ─── REELS DATA ─── */
const REELS: { src: string; title: string; desc: string }[] = [
  {
    src: "https://sfile.chatglm.cn/images-ppt/efc074bc5101.jpg",
    title: "Navratri Night Vibes",
    desc: "Dance the night away in our handcrafted chaniya choli ✨",
  },
  {
    src: "https://sfile.chatglm.cn/images-ppt/b231344d43ec.jpg",
    title: "Garba Queen Look",
    desc: "Traditional meets modern — scroll to explore the collection",
  },
  {
    src: "https://sfile.chatglm.cn/images-ppt/83b6435467b3.jpg",
    title: "Custom Embroidery",
    desc: "Every piece tells a story. DM us to create yours!",
  },
  {
    src: "https://sfile.chatglm.cn/images-ppt/0bfa986a39f7.webp",
    title: "Mirror Work Magic",
    desc: "Abla mirror work that sparkles under the garba lights",
  },
];

const NINE_COLORS = [
  { day: 1, color: "Yellow", hex: "#FFD700", goddess: "Shailputri" },
  { day: 2, color: "Green", hex: "#228B22", goddess: "Brahmacharini" },
  { day: 3, color: "Grey", hex: "#A9A9A9", goddess: "Chandraghanta" },
  { day: 4, color: "Orange", hex: "#FF6B35", goddess: "Kushmanda" },
  { day: 5, color: "White", hex: "#F0F0F0", goddess: "Skandamata" },
  { day: 6, color: "Red", hex: "#DC143C", goddess: "Katyayani" },
  { day: 7, color: "Royal Blue", hex: "#1E3A8A", goddess: "Kaalratri" },
  { day: 8, color: "Pink", hex: "#FF69B4", goddess: "Mahagauri" },
  { day: 9, color: "Purple", hex: "#7B2D8E", goddess: "Siddhidatri" },
];

const TRENDS = [
  { icon: <Sparkles className="w-4 h-4" />, title: "Bandhani Revival", desc: "Bold tie-dye in new color combos" },
  { icon: <Scissors className="w-4 h-4" />, title: "Cape Blouses", desc: "One-shoulder & cold-shoulder cuts" },
  { icon: <Palette className="w-4 h-4" />, title: "Pastel Power", desc: "Soft pastels with mirror work" },
  { icon: <Gem className="w-4 h-4" />, title: "Kundan Layers", desc: "Layered temple jewellery sets" },
  { icon: <Ruler className="w-4 h-4" />, title: "Chinon Fabric", desc: "Lightweight with heavy embroidery" },
  { icon: <Flame className="w-4 h-4" />, title: "Mirror Magic", desc: "Abla & Gotapatti dazzle" },
];

/* ─── TAB TYPES ─── */
type Tab = "home" | "search" | "reels" | "orders" | "profile";

/* ═══════════════════════════════════════════════════════════════ */
/*  IMAGE MODAL                                                  */
/* ═══════════════════════════════════════════════════════════════ */
function ImageModal({ src, title, open, onClose }: { src: string; title: string; open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center z-10" aria-label="Close">
            <X className="w-5 h-5 text-white" />
          </button>
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
            className="max-w-[92vw] max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={src} alt={title} className="max-h-[80vh] w-auto rounded-2xl object-contain" />
            <p className="text-center mt-3 text-white font-medium text-sm">{title}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  TAB: HOME — Instagram-like feed                              */
/* ═══════════════════════════════════════════════════════════════ */
function HomeTab() {
  return (
    <div className="pb-safe">
      {/* Stories row */}
      <div className="bg-white border-b border-[#DBDBDB] px-4 py-3">
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {[
            { label: "9 Colors", emoji: "🎨", color: "from-[#F58529] to-[#DD2A7B]" },
            { label: "Chaniya", emoji: "💃", color: "from-[#DD2A7B] to-[#8134AF]" },
            { label: "Jewellery", emoji: "💎", color: "from-[#8134AF] to-[#515BD4]" },
            { label: "Trends", emoji: "🔥", color: "from-[#F58529] to-[#FEDA75]" },
            { label: "Custom", emoji: "✂️", color: "from-[#0095F6] to-[#00C6FF]" },
          ].map((s) => (
            <button key={s.label} className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${s.color} p-[2px]`}>
                <div className="w-full h-full rounded-full bg-white p-[2px]">
                  <div className="w-full h-full rounded-full bg-[#EFEFEF] flex items-center justify-center text-2xl">
                    {s.emoji}
                  </div>
                </div>
              </div>
              <span className="text-[10px] text-[#262626] font-medium">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Profile header card */}
      <div className="bg-white border-b border-[#DBDBDB] p-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F58529] to-[#DD2A7B] p-[2px]">
            <div className="w-full h-full rounded-full bg-white p-[2px]">
              <div className="w-full h-full rounded-full bg-[#EFEFEF] flex items-center justify-center">
                <span className="text-lg font-serif-display font-bold text-gradient-ig">S</span>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-sm text-[#262626]">spiffy_clothing_and_jewellery</h2>
            <p className="text-[#8E8E8E] text-xs">Bhoomi Panchal • Designer Wear</p>
          </div>
          <a href={`${WA_BASE}?text=Hi%20Spiffy!`} target="_blank" rel="noopener noreferrer"
            className="px-5 py-1.5 bg-[#0095F6] text-white text-xs font-semibold rounded-lg active:opacity-80 transition-opacity">
            Order
          </a>
        </div>
        <p className="text-[13px] text-[#262626] mt-3 leading-[1.5]">
          🦁 Navratri & Festive Collections<br />
          📍 Exhibitions in Ahmedabad<br />
          🚚 Worldwide Shipping<br />
          📧 DM for order<br />
          👋 Call: +91 81601 59403
        </p>
        <div className="flex gap-6 mt-3">
          <div className="text-center"><p className="font-semibold text-sm text-[#262626]">37</p><p className="text-[10px] text-[#8E8E8E]">posts</p></div>
          <div className="text-center"><p className="font-semibold text-sm text-[#262626]">7,226</p><p className="text-[10px] text-[#8E8E8E]">followers</p></div>
          <div className="text-center"><p className="font-semibold text-sm text-[#262626]">1</p><p className="text-[10px] text-[#8E8E8E]">following</p></div>
        </div>
      </div>

      {/* 9 Colors row */}
      <div className="bg-white border-b border-[#DBDBDB] p-4">
        <p className="text-xs font-semibold text-[#262626] mb-3">🌈 9 Colors of Navratri 2026</p>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {NINE_COLORS.map((c) => (
            <div key={c.day} className="flex-shrink-0 flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full border border-[#DBDBDB] flex items-center justify-center text-[11px] font-bold text-[#262626]" style={{ backgroundColor: c.hex }}>
                {c.day}
              </div>
              <span className="text-[9px] text-[#8E8E8E] w-12 text-center leading-tight">{c.color}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feed post — Hero CTA */}
      <div className="bg-white border-b border-[#DBDBDB]">
        <div className="px-4 py-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F58529] to-[#DD2A7B] p-[1.5px]">
            <div className="w-full h-full rounded-full bg-white p-[1.5px]">
              <div className="w-full h-full rounded-full bg-[#EFEFEF] flex items-center justify-center">
                <span className="text-[10px] font-bold text-gradient-ig">S</span>
              </div>
            </div>
          </div>
          <span className="text-sm font-semibold text-[#262626]">spiffy_clothing_and_jewellery</span>
          <span className="text-[10px] text-[#8E8E8E]">• Ahmedabad</span>
        </div>
        <div className="relative aspect-square">
          <img src="https://sfile.chatglm.cn/images-ppt/efc074bc5101.jpg" alt="Navratri celebration" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-serif-display text-2xl font-bold text-white drop-shadow-md">Custom Chaniya Choli</h3>
            <p className="text-white/90 text-sm mt-1">Any size. Any design. Any color.</p>
          </div>
        </div>
        <div className="px-4 py-3">
          <div className="flex items-center gap-4 mb-2">
            <Heart className="w-6 h-6 text-[#262626]" />
            <MessageCircle className="w-6 h-6 text-[#262626]" />
            <Share2 className="w-6 h-6 text-[#262626]" />
            <Bookmark className="w-6 h-6 text-[#262626] ml-auto" />
          </div>
          <p className="text-sm text-[#262626]"><span className="font-semibold">7,226 likes</span></p>
          <p className="text-sm text-[#262626] mt-1">
            <span className="font-semibold">spiffy_clothing_and_jewellery</span>{" "}
            Navratri 2026 collection is LIVE! 🎉 DM us or WhatsApp to order your custom chaniya choli & jewellery. Worldwide shipping available!
          </p>
        </div>
      </div>

      {/* Feed post — Trends */}
      <div className="bg-white border-b border-[#DBDBDB]">
        <div className="px-4 py-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F58529] to-[#DD2A7B] p-[1.5px]">
            <div className="w-full h-full rounded-full bg-white p-[1.5px]">
              <div className="w-full h-full rounded-full bg-[#EFEFEF] flex items-center justify-center">
                <span className="text-[10px] font-bold text-gradient-ig">S</span>
              </div>
            </div>
          </div>
          <span className="text-sm font-semibold text-[#262626]">spiffy_clothing_and_jewellery</span>
        </div>
        <div className="px-4 py-3">
          <p className="text-xs font-semibold text-[#262626] mb-3">🔥 2026 Navratri Trends</p>
          <div className="space-y-2.5">
            {TRENDS.map((t, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-[#FAFAFA] rounded-xl">
                <div className="w-9 h-9 rounded-full bg-[#EFEFEF] flex items-center justify-center text-[#8E8E8E] flex-shrink-0">{t.icon}</div>
                <div>
                  <h4 className="text-[13px] font-semibold text-[#262626]">{t.title}</h4>
                  <p className="text-[12px] text-[#8E8E8E]">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-4 pb-3">
          <div className="flex items-center gap-4">
            <Heart className="w-6 h-6 text-[#262626]" />
            <MessageCircle className="w-6 h-6 text-[#262626]" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  TAB: SEARCH — Pinterest-style masonry grid                   */
/* ═══════════════════════════════════════════════════════════════ */
function SearchTab() {
  const [modal, setModal] = useState<{ src: string; title: string } | null>(null);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? PINS : filter === "chaniya" ? PINS.slice(0, 12) : PINS.slice(12);

  return (
    <div className="pb-safe">
      {/* Search bar */}
      <div className="bg-white border-b border-[#DBDBDB] px-4 py-2 sticky top-0 z-20">
        <div className="flex items-center gap-2 bg-[#EFEFEF] rounded-xl px-3 py-2">
          <Search className="w-4 h-4 text-[#8E8E8E]" />
          <input
            type="text"
            placeholder="Search chaniya choli, jewellery..."
            className="bg-transparent text-sm text-[#262626] placeholder:text-[#8E8E8E] outline-none flex-1"
            readOnly
          />
        </div>
      </div>

      {/* Filter chips */}
      <div className="bg-white px-4 py-2 border-b border-[#DBDBDB] flex gap-2 overflow-x-auto no-scrollbar">
        {["all", "chaniya", "jewellery"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors flex-shrink-0 ${
              filter === f ? "bg-[#262626] text-white" : "bg-[#EFEFEF] text-[#262626]"
            }`}
          >
            {f === "all" ? "All" : f === "chaniya" ? "👗 Chaniya Choli" : "💎 Jewellery"}
          </button>
        ))}
      </div>

      {/* Pinterest masonry grid */}
      <div className="p-1.5">
        <div className="masonry-grid">
          {filtered.map((pin, i) => (
            <motion.div
              key={`${filter}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <button
                onClick={() => setModal({ src: pin.src, title: pin.title })}
                className="w-full text-left group"
              >
                <div className={`${pin.height} relative rounded-xl overflow-hidden bg-[#EFEFEF]`}>
                  <img
                    src={pin.src}
                    alt={pin.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-active:opacity-100 transition-opacity" />
                  <div className="absolute top-2 right-2 opacity-0 group-active:opacity-100 transition-opacity">
                    <Bookmark className="w-5 h-5 text-white drop-shadow" />
                  </div>
                </div>
                <p className="text-[12px] font-medium text-[#262626] mt-1.5 px-0.5 leading-tight">{pin.title}</p>
                <p className="text-[10px] text-[#8E8E8E] px-0.5 flex items-center gap-1 mt-0.5">
                  <Heart className="w-3 h-3" /> {pin.likes}
                </p>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <ImageModal src={modal?.src || ""} title={modal?.title || ""} open={!!modal} onClose={() => setModal(null)} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  TAB: REELS — Full-screen vertical swipe like IG Reels        */
/* ═══════════════════════════════════════════════════════════════ */
function ReelsTab() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="h-[calc(100dvh-60px)] overflow-y-scroll reel-snap">
      {REELS.map((reel, i) => (
        <div key={i} className="h-[calc(100dvh-60px)] relative flex-shrink-0 scroll-snap-start">
          <img src={reel.src} alt={reel.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Right side actions (like IG Reels) */}
          <div className="absolute right-3 bottom-24 flex flex-col items-center gap-5">
            <button className="flex flex-col items-center gap-0.5">
              <Heart className="w-7 h-7 text-white drop-shadow" />
              <span className="text-[10px] text-white font-medium">2.4k</span>
            </button>
            <button className="flex flex-col items-center gap-0.5">
              <MessageCircle className="w-7 h-7 text-white drop-shadow" />
              <span className="text-[10px] text-white font-medium">128</span>
            </button>
            <button className="flex flex-col items-center gap-0.5">
              <Share2 className="w-7 h-7 text-white drop-shadow" />
              <span className="text-[10px] text-white font-medium">Share</span>
            </button>
            <button className="flex flex-col items-center gap-0.5">
              <Bookmark className="w-7 h-7 text-white drop-shadow" />
              <span className="text-[10px] text-white font-medium">Save</span>
            </button>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-6 left-4 right-16">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F58529] to-[#DD2A7B] p-[1px]">
                <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">S</span>
                </div>
              </div>
              <span className="text-white font-semibold text-sm drop-shadow">spiffy_clothing_and_jewellery</span>
            </div>
            <h3 className="text-white font-semibold text-base drop-shadow-md">{reel.title}</h3>
            <p className="text-white/80 text-xs mt-1 drop-shadow">{reel.desc}</p>
            <a
              href={`${WA_BASE}?text=Hi%20Spiffy!%20I%20loved%20your%20${encodeURIComponent(reel.title)}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 px-5 py-2 bg-white/20 backdrop-blur-md rounded-lg text-white text-xs font-semibold active:bg-white/30 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" /> Order on WhatsApp
            </a>
          </div>

          {/* Swipe hint (first reel only) */}
          {i === 0 && (
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
              <span className="text-white/60 text-[10px]">Swipe up</span>
              <ChevronLeft className="w-4 h-4 text-white/60 rotate-[-90deg]" />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  TAB: ORDERS — CTA + contact                                   */
/* ═══════════════════════════════════════════════════════════════ */
function OrdersTab() {
  return (
    <div className="pb-safe">
      {/* Header */}
      <div className="bg-white border-b border-[#DBDBDB] px-4 py-4 text-center">
        <h2 className="text-lg font-bold text-[#262626]">Place Your Order</h2>
        <p className="text-xs text-[#8E8E8E] mt-0.5">Custom chaniya choli & jewellery</p>
      </div>

      {/* Contact options */}
      <div className="p-4 space-y-3">
        <a
          href={`${WA_BASE}?text=Hi%20Spiffy!%20I%20want%20to%20order%20custom%20chaniya%20choli%20for%20Navratri`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-[#DBDBDB] active:bg-[#FAFAFA] transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-6 h-6 text-[#25D366]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#262626]">WhatsApp</p>
            <p className="text-xs text-[#8E8E8E]">+91 81601 59403</p>
          </div>
          <ChevronRight className="w-4 h-4 text-[#8E8E8E]" />
        </a>

        <a href={`tel:+${PHONE}`} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-[#DBDBDB] active:bg-[#FAFAFA] transition-colors">
          <div className="w-12 h-12 rounded-full bg-[#0095F6]/10 flex items-center justify-center flex-shrink-0">
            <Phone className="w-6 h-6 text-[#0095F6]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#262626]">Call Us</p>
            <p className="text-xs text-[#8E8E8E]">+91 81601 59403</p>
          </div>
          <ChevronRight className="w-4 h-4 text-[#8E8E8E]" />
        </a>

        <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-[#DBDBDB] active:bg-[#FAFAFA] transition-colors">
          <div className="w-12 h-12 rounded-full bg-[#DD2A7B]/10 flex items-center justify-center flex-shrink-0">
            <Instagram className="w-6 h-6 text-[#DD2A7B]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#262626]">Instagram DM</p>
            <p className="text-xs text-[#8E8E8E]">@spiffy_clothing_and_jewellery</p>
          </div>
          <ChevronRight className="w-4 h-4 text-[#8E8E8E]" />
        </a>
      </div>

      {/* Quick order form info */}
      <div className="px-4 pb-4">
        <div className="bg-white rounded-2xl border border-[#DBDBDB] p-4">
          <h3 className="text-sm font-bold text-[#262626] mb-3">How to Order</h3>
          {[
            { step: "1", text: "Send us your design reference or describe your dream outfit" },
            { step: "2", text: "We'll discuss fabric, size, color & budget on WhatsApp" },
            { step: "3", text: "Your custom piece is handcrafted and shipped to you!" },
          ].map((s) => (
            <div key={s.step} className="flex gap-3 mb-3 last:mb-0">
              <div className="w-7 h-7 rounded-full bg-[#EFEFEF] flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-[#0095F6]">{s.step}</span>
              </div>
              <p className="text-[13px] text-[#262626] leading-relaxed pt-0.5">{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Info cards */}
      <div className="px-4 pb-4 grid grid-cols-2 gap-2.5">
        {[
          { icon: <MapPin className="w-4 h-4" />, label: "Exhibitions in Ahmedabad" },
          { icon: <Truck className="w-4 h-4" />, label: "Worldwide Shipping" },
          { icon: <Globe className="w-4 h-4" />, label: "7,226+ Happy Followers" },
          { icon: <Star className="w-4 h-4" />, label: "Custom Any Size / Design" },
        ].map((c, i) => (
          <div key={i} className="bg-white rounded-xl border border-[#DBDBDB] p-3 flex items-center gap-2.5">
            <div className="text-[#0095F6]">{c.icon}</div>
            <p className="text-[11px] font-medium text-[#262626] leading-tight">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Big CTA */}
      <div className="px-4 pb-6">
        <a
          href={`${WA_BASE}?text=Hi%20Spiffy!%20I%20want%20to%20order%20custom%20chaniya%20choli`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#0095F6] text-white rounded-xl text-sm font-semibold active:opacity-80 transition-opacity shadow-sm"
        >
          <MessageCircle className="w-4 h-4" />
          Start Ordering on WhatsApp
          <Send className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  TAB: PROFILE                                                  */
/* ═══════════════════════════════════════════════════════════════ */
function ProfileTab() {
  const [showGrid, setShowGrid] = useState(true);
  return (
    <div className="pb-safe">
      <div className="bg-white px-4 pt-4 pb-2">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F58529] to-[#8134AF] p-[2.5px] flex-shrink-0">
            <div className="w-full h-full rounded-full bg-white p-[2.5px]">
              <div className="w-full h-full rounded-full bg-[#EFEFEF] flex items-center justify-center">
                <span className="text-2xl font-serif-display font-bold text-gradient-ig">S</span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex gap-5 justify-center">
              <div className="text-center"><p className="font-bold text-lg text-[#262626]">37</p><p className="text-[10px] text-[#8E8E8E]">posts</p></div>
              <div className="text-center"><p className="font-bold text-lg text-[#262626]">7,226</p><p className="text-[10px] text-[#8E8E8E]">followers</p></div>
              <div className="text-center"><p className="font-bold text-lg text-[#262626]">1</p><p className="text-[10px] text-[#8E8E8E]">following</p></div>
            </div>
          </div>
        </div>
        <h2 className="font-semibold text-sm text-[#262626]">Spiffy Clothing & Jewellery</h2>
        <p className="text-[13px] text-[#262626] mt-1 leading-[1.4]">
          🦁 Navratri & Festive Collections<br />
          📍 Exhibitions in Ahmedabad<br />
          🚚 Worldwide Shipping<br />
          👋 Call: +91 81601 59403
        </p>
        <div className="flex gap-2 mt-3">
          <a href={`${WA_BASE}?text=Hi%20Spiffy!`} target="_blank" rel="noopener noreferrer"
            className="flex-1 py-1.5 bg-[#0095F6] text-white text-xs font-semibold rounded-lg text-center active:opacity-80">
            Order Now
          </a>
          <a href={IG_URL} target="_blank" rel="noopener noreferrer"
            className="flex-1 py-1.5 bg-[#EFEFEF] text-[#262626] text-xs font-semibold rounded-lg text-center active:bg-[#DBDBDB]">
            Instagram
          </a>
        </div>
      </div>

      {/* Grid/Reel toggle */}
      <div className="bg-white border-b border-[#DBDBDB] flex">
        <button onClick={() => setShowGrid(true)} className={`flex-1 py-2.5 flex justify-center ${showGrid ? "border-b-2 border-[#262626]" : ""}`}>
          <Grid3X3 className="w-5 h-5 text-[#262626]" />
        </button>
        <button onClick={() => setShowGrid(false)} className={`flex-1 py-2.5 flex justify-center ${!showGrid ? "border-b-2 border-[#262626]" : ""}`}>
          <Film className="w-5 h-5 text-[#262626]" />
        </button>
      </div>

      {/* Grid view */}
      {showGrid && (
        <div className="grid grid-cols-3 gap-0.5">
          {PINS.map((pin, i) => (
            <div key={i} className="aspect-square relative bg-[#EFEFEF]">
              <img src={pin.src} alt={pin.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      )}

      {/* Reels view */}
      {!showGrid && (
        <div className="grid grid-cols-3 gap-0.5">
          {REELS.map((reel, i) => (
            <div key={i} className="aspect-[9/16] relative bg-[#EFEFEF]">
              <img src={reel.src} alt={reel.title} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Film className="w-6 h-6 text-white drop-shadow" />
              </div>
            </div>
          ))}
          {REELS.map((reel, i) => (
            <div key={`dup-${i}`} className="aspect-[9/16] relative bg-[#EFEFEF]">
              <img src={reel.src} alt="" className="w-full h-full object-cover opacity-60" loading="lazy" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Film className="w-6 h-6 text-white drop-shadow" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  BOTTOM NAVIGATION — Instagram style                            */
/* ═══════════════════════════════════════════════════════════════ */
function BottomNav({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const items: { tab: Tab; icon: React.ReactNode; label: string }[] = [
    { tab: "home", icon: <HomeIcon className="w-6 h-6" />, label: "Home" },
    { tab: "search", icon: <Search className="w-6 h-6" />, label: "Search" },
    { tab: "reels", icon: <Film className="w-6 h-6" />, label: "Reels" },
    { tab: "orders", icon: <PlusSquare className="w-6 h-6" />, label: "Order" },
    { tab: "profile", icon: <div className="w-6 h-6 rounded-full border-2 border-[#262626] bg-gradient-to-br from-[#F58529] to-[#DD2A7B] p-[0.5px]"><div className="w-full h-full rounded-full bg-[#FAFAFA] flex items-center justify-center"><span className="text-[8px] font-bold text-[#262626]">S</span></div></div>, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#DBDBDB] h-[60px] flex items-center justify-around px-2" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      {items.map((item) => (
        <button
          key={item.tab}
          onClick={() => onChange(item.tab)}
          className="flex flex-col items-center justify-center py-1 px-3 min-w-[48px] active:opacity-60 transition-opacity"
          aria-label={item.label}
        >
          <div className={active === item.tab ? "text-[#262626]" : "text-[#8E8E8E]"}>
            {item.icon}
          </div>
        </button>
      ))}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  MAIN PAGE                                                    */
/* ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  return (
    <main className="min-h-[100dvh] bg-[#FAFAFA] font-sans-body">
      {/* Top bar — Instagram style */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#DBDBDB] h-[48px] flex items-center px-4">
        <h1 className="font-serif-display text-xl font-bold text-gradient-ig">Spiffy</h1>
        <div className="flex-1" />
        <a href={`${WA_BASE}?text=Hi%20Spiffy!`} target="_blank" rel="noopener noreferrer" className="active:opacity-60">
          <Heart className="w-6 h-6 text-[#262626]" />
        </a>
        <a href={`${WA_BASE}?text=Hi%20Spiffy!`} target="_blank" rel="noopener noreferrer" className="ml-4 active:opacity-60">
          <MessageCircle className="w-6 h-6 text-[#262626]" />
        </a>
      </header>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === "home" && <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}><HomeTab /></motion.div>}
        {activeTab === "search" && <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}><SearchTab /></motion.div>}
        {activeTab === "reels" && <motion.div key="reels" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}><ReelsTab /></motion.div>}
        {activeTab === "orders" && <motion.div key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}><OrdersTab /></motion.div>}
        {activeTab === "profile" && <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}><ProfileTab /></motion.div>}
      </AnimatePresence>

      {/* Bottom navigation */}
      <BottomNav active={activeTab} onChange={setActiveTab} />

      {/* Floating WhatsApp (only on home/orders tab) */}
      {(activeTab === "home" || activeTab === "orders") && (
        <motion.a
          href={`${WA_BASE}?text=Hi%20Spiffy!%20I%20saw%20your%20website`}
          target="_blank" rel="noopener noreferrer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-[72px] right-4 z-30 w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-5 h-5 text-white fill-white" />
        </motion.a>
      )}
    </main>
  );
}