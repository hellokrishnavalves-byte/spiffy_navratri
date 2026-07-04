"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
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
  Crown,
  ShoppingBag,
  ArrowRight,
  ChevronUp,
  Diamond,
  CircleDot,
} from "lucide-react";

const PHONE = "918160159403";
const WA_BASE = `https://wa.me/${PHONE}`;
const IG_URL = "https://www.instagram.com/spiffy_clothing_and_jewellery";

/* ─── BRAND COLORS (referenced in JS for inline styles) ─── */
const BRAND = {
  bg: "#FDF6EC",
  card: "#FFFFFF",
  text: "#2C1810",
  textSec: "#7A5C4E",
  textMuted: "#A08B7E",
  magenta: "#8B2252",
  gold: "#C8A951",
  saffron: "#E8752A",
  border: "#EDE3D6",
  muted: "#F5EBDB",
  cream: "#FFF8F0",
};

/* ═══════════════════════════════════════════════════════════════
   IMAGE DATA — Curated for Spiffy brand
   ═══════════════════════════════════════════════════════════════ */

/* Hero carousel images */
const HERO_SLIDES = [
  { src: "https://sfile.chatglm.cn/images-ppt/efc074bc5101.jpg", title: "Navratri 2026 Collection", subtitle: "Handcrafted chaniya choli & jewellery" },
  { src: "https://sfile.chatglm.cn/images-ppt/d0e05449e7ba.jpg", title: "Dance in Tradition", subtitle: "Custom designs for every garba night" },
  { src: "https://sfile.chatglm.cn/images-ppt/10e0b54c1903.jpg", title: "Your Dream Outfit", subtitle: "Any size, any design, any color" },
];

/* Chaniya Choli Collection */
const CHANIYA_COLLECTION = [
  { src: "https://sfile.chatglm.cn/images-ppt/fee7ac5e2078.webp", name: "Royal Maroon Bandhani", tag: "Bestseller", price: "Custom" },
  { src: "https://sfile.chatglm.cn/images-ppt/a51b79b35d1d.jpg", name: "Mirror Work Marvel", tag: "New", price: "Custom" },
  { src: "https://sfile.chatglm.cn/images-ppt/85f31d5e163e.jpg", name: "Emerald Elegance", tag: "Trending", price: "Custom" },
  { src: "https://sfile.chatglm.cn/images-ppt/613efd9fc1c1.webp", name: "Deep Red Heritage", tag: "Popular", price: "Custom" },
  { src: "https://sfile.chatglm.cn/images-ppt/39c0c1906f26.jpg", name: "Golden Thread Work", tag: "Premium", price: "Custom" },
  { src: "https://sfile.chatglm.cn/images-ppt/e2b50f026811.jpg", name: "Green Garden Silk", tag: "New", price: "Custom" },
  { src: "https://sfile.chatglm.cn/images-ppt/5237f301192a.jpg", name: "Bridal Grandeur", tag: "Luxury", price: "Custom" },
  { src: "https://sfile.chatglm.cn/images-ppt/211ec93ff0de.webp", name: "Pastel Perfection", tag: "Trending", price: "Custom" },
  { src: "https://sfile.chatglm.cn/images-ppt/775eacae9e4d.jpeg", name: "Classic Bandhani", tag: "Classic", price: "Custom" },
  { src: "https://sfile.chatglm.cn/images-ppt/d214b62cf0e7.jpg", name: "Designer Dupatta Set", tag: "New", price: "Custom" },
];

/* Jewellery Collection */
const JEWELLERY_COLLECTION = [
  { src: "https://sfile.chatglm.cn/images-ppt/518a3cda1867.jpg", name: "Kundan Temple Set", tag: "Bestseller" },
  { src: "https://sfile.chatglm.cn/images-ppt/d741e02a6fe7.jpg", name: "Pearl Choker Necklace", tag: "Elegant" },
  { src: "https://sfile.chatglm.cn/images-ppt/0f6ab33ef366.jpg", name: "Traditional Jhumkas", tag: "Popular" },
  { src: "https://sfile.chatglm.cn/images-ppt/b399ac39cf14.jpg", name: "Maang Tikka Set", tag: "New" },
  { src: "https://sfile.chatglm.cn/images-ppt/f944c8042a90.jpg", name: "Gold Plated Set", tag: "Premium" },
  { src: "https://sfile.chatglm.cn/images-ppt/d5d76c9cc83f.jpg", name: "Bridal Jewellery Box", tag: "Luxury" },
  { src: "https://sfile.chatglm.cn/images-ppt/bf987d755d25.jpg", name: "Antique Jhumka", tag: "Classic" },
  { src: "https://sfile.chatglm.cn/images-ppt/4cfd8c77244c.jpg", name: "Kundan Earrings", tag: "Trending" },
];

/* All pins for search/explore */
const ALL_PINS: { src: string; title: string; height: string; likes: number; cat: "chaniya" | "jewellery" }[] = [
  { src: "https://sfile.chatglm.cn/images-ppt/fee7ac5e2078.webp", title: "Royal Maroon Bandhani Set", height: "h-72", likes: 342, cat: "chaniya" },
  { src: "https://sfile.chatglm.cn/images-ppt/518a3cda1867.jpg", title: "Kundan Temple Set", height: "h-56", likes: 521, cat: "jewellery" },
  { src: "https://sfile.chatglm.cn/images-ppt/a51b79b35d1d.jpg", title: "Mirror Work Chaniya", height: "h-64", likes: 456, cat: "chaniya" },
  { src: "https://sfile.chatglm.cn/images-ppt/d741e02a6fe7.jpg", title: "Pearl Choker", height: "h-80", likes: 189, cat: "jewellery" },
  { src: "https://sfile.chatglm.cn/images-ppt/85f31d5e163e.jpg", title: "Emerald Green Silk", height: "h-56", likes: 395, cat: "chaniya" },
  { src: "https://sfile.chatglm.cn/images-ppt/0f6ab33ef366.jpg", title: "Traditional Jhumkas", height: "h-72", likes: 307, cat: "jewellery" },
  { src: "https://sfile.chatglm.cn/images-ppt/613efd9fc1c1.webp", title: "Deep Red Garba Look", height: "h-64", likes: 274, cat: "chaniya" },
  { src: "https://sfile.chatglm.cn/images-ppt/b399ac39cf14.jpg", title: "Maang Tikka Gold", height: "h-56", likes: 413, cat: "jewellery" },
  { src: "https://sfile.chatglm.cn/images-ppt/39c0c1906f26.jpg", title: "Golden Thread Chaniya", height: "h-72", likes: 285, cat: "chaniya" },
  { src: "https://sfile.chatglm.cn/images-ppt/f944c8042a90.jpg", title: "Gold Plated Necklace", height: "h-64", likes: 367, cat: "jewellery" },
  { src: "https://sfile.chatglm.cn/images-ppt/e2b50f026811.jpg", title: "Green Garden Lehenga", height: "h-80", likes: 534, cat: "chaniya" },
  { src: "https://sfile.chatglm.cn/images-ppt/d5d76c9cc83f.jpg", title: "Bridal Jewellery Box", height: "h-56", likes: 198, cat: "jewellery" },
  { src: "https://sfile.chatglm.cn/images-ppt/5237f301192a.jpg", title: "Bridal Grandeur Set", height: "h-64", likes: 489, cat: "chaniya" },
  { src: "https://sfile.chatglm.cn/images-ppt/bf987d755d25.jpg", title: "Antique Jhumka Pair", height: "h-72", likes: 231, cat: "jewellery" },
  { src: "https://sfile.chatglm.cn/images-ppt/211ec93ff0de.webp", title: "Pastel Perfection", height: "h-56", likes: 347, cat: "chaniya" },
  { src: "https://sfile.chatglm.cn/images-ppt/4cfd8c77244c.jpg", title: "Kundan Earrings", height: "h-64", likes: 445, cat: "jewellery" },
  { src: "https://sfile.chatglm.cn/images-ppt/775eacae9e4d.jpeg", title: "Classic Bandhani", height: "h-56", likes: 312, cat: "chaniya" },
  { src: "https://sfile.chatglm.cn/images-ppt/d214b62cf0e7.jpg", title: "Designer Dupatta", height: "h-72", likes: 268, cat: "chaniya" },
  { src: "https://sfile.chatglm.cn/images-ppt/ab77c91a98e4.jpg", title: "Garba Night Vibes", height: "h-64", likes: 587, cat: "chaniya" },
  { src: "https://sfile.chatglm.cn/images-ppt/37db2c15c4a4.png", title: "Temple Gold Set", height: "h-56", likes: 423, cat: "jewellery" },
  { src: "https://sfile.chatglm.cn/images-ppt/ca3fbb9659ad.jpg", title: "Abla Mirror Magic", height: "h-72", likes: 356, cat: "chaniya" },
  { src: "https://sfile.chatglm.cn/images-ppt/d75142b1e48e.jpg", title: "Choker Necklace Set", height: "h-64", likes: 291, cat: "jewellery" },
  { src: "https://sfile.chatglm.cn/images-ppt/4ba588c00e97.webp", title: "Silk Chaniya Red", height: "h-56", likes: 478, cat: "chaniya" },
  { src: "https://sfile.chatglm.cn/images-ppt/df3b24b6567d.jpg", title: "Heavy Kundan Set", height: "h-80", likes: 543, cat: "jewellery" },
];

/* Reels / Lookbook images */
const LOOKBOOK = [
  { src: "https://sfile.chatglm.cn/images-ppt/efc074bc5101.jpg", title: "Navratri Night 1: Yellow", desc: "Start Navratri in style with our custom Yellow Bandhani chaniya choli. Perfect for Shailputri day.", day: "Day 1" },
  { src: "https://sfile.chatglm.cn/images-ppt/10e0b54c1903.jpg", title: "Navratri Night 2: Green", desc: "Our bestselling Green Chinon silk with heavy embroidery and mirror work. Garba-ready!", day: "Day 2" },
  { src: "https://sfile.chatglm.cn/images-ppt/d0e05449e7ba.jpg", title: "Navratri Night 3: Grey Glam", desc: "Grey never looked this festive. Silver thread work with pearl detailing.", day: "Day 3" },
  { src: "https://sfile.chatglm.cn/images-ppt/fee7ac5e2078.webp", title: "Navratri Night 4: Orange Fire", desc: "Burn the dance floor in our signature saffron mirror-work chaniya choli.", day: "Day 4" },
  { src: "https://sfile.chatglm.cn/images-ppt/85f31d5e163e.jpg", title: "Navratri Night 5: White Elegance", desc: "Ivory white with golden gotta-patti. Minimal yet majestic.", day: "Day 5" },
  { src: "https://sfile.chatglm.cn/images-ppt/5237f301192a.jpg", title: "Navratri Night 6: Royal Red", desc: "Nothing beats red for Katyayani day. Heavy Kundan jewellery sets available.", day: "Day 6" },
  { src: "https://sfile.chatglm.cn/images-ppt/e2b50f026811.jpg", title: "Navratri Night 7: Royal Blue", desc: "Deep royal blue with silver zari work. Make a statement at garba.", day: "Day 7" },
  { src: "https://sfile.chatglm.cn/images-ppt/211ec93ff0de.webp", title: "Navratri Night 8: Pretty Pink", desc: "Pastel pink Chinon with delicate embroidery. Feminine and festive.", day: "Day 8" },
  { src: "https://sfile.chatglm.cn/images-ppt/bf4fb092b9cf.jpg", title: "Navratri Night 9: Purple Grandeur", desc: "Final night, maximum impact. Purple with heavy antique gold work.", day: "Day 9" },
];

/* Navratri 9 Colors */
const NINE_COLORS = [
  { day: 1, color: "Yellow", hex: "#FFD700", goddess: "Shailputri", emoji: "☀️" },
  { day: 2, color: "Green", hex: "#228B22", goddess: "Brahmacharini", emoji: "🌿" },
  { day: 3, color: "Grey", hex: "#A9A9A9", goddess: "Chandraghanta", emoji: "🌙" },
  { day: 4, color: "Orange", hex: "#FF6B35", goddess: "Kushmanda", emoji: "🔥" },
  { day: 5, color: "White", hex: "#F0EDE8", goddess: "Skandamata", emoji: "🤍" },
  { day: 6, color: "Red", hex: "#DC143C", goddess: "Katyayani", emoji: "❤️" },
  { day: 7, color: "Royal Blue", hex: "#1E3A8A", goddess: "Kaalratri", emoji: "💙" },
  { day: 8, color: "Pink", hex: "#FF69B4", goddess: "Mahagauri", emoji: "🌸" },
  { day: 9, color: "Purple", hex: "#7B2D8E", goddess: "Siddhidatri", emoji: "💜" },
];

/* 2026 Trends */
const TRENDS = [
  { icon: <Sparkles className="w-4 h-4" />, title: "Bandhani Revival", desc: "Bold tie-dye in modern color combos — the hottest trend this Navratri season" },
  { icon: <Scissors className="w-4 h-4" />, title: "Cape Blouses", desc: "One-shoulder & cold-shoulder cape blouses that make heads turn at garba" },
  { icon: <Palette className="w-4 h-4" />, title: "Pastel Power", desc: "Soft pastels with intricate mirror work — elegance meets tradition" },
  { icon: <Gem className="w-4 h-4" />, title: "Kundan Layers", desc: "Layered temple jewellery sets that complete your Navratri look" },
  { icon: <Ruler className="w-4 h-4" />, title: "Chinon Fabric", desc: "Lightweight Chinon silk with heavy embroidery — comfortable all night" },
  { icon: <Flame className="w-4 h-4" />, title: "Mirror Magic", desc: "Abla & Gotapatti work that sparkles under garba lights" },
  { icon: <Crown className="w-4 h-4" />, title: "Heavy Dupattas", desc: "Contrast dupattas with four-sided border work and tassels" },
  { icon: <Diamond className="w-4 h-4" />, title: "Antique Jewellery", desc: "Vintage-inspired oxidised silver and gold-toned statement pieces" },
];

/* Testimonials */
const TESTIMONIALS = [
  { name: "Priya M.", location: "Ahmedabad", text: "Got my Navratri chaniya choli from Spiffy last year and it was the most stunning outfit at garba! The mirror work was incredible.", rating: 5 },
  { name: "Meera R.", location: "Surat", text: "Bhoomi understood exactly what I wanted. The custom fit was perfect and the jewellery matched perfectly. Will order again!", rating: 5 },
  { name: "Aarti P.", location: "Mumbai", text: "Shipping was fast and the quality exceeded expectations. The bandhani work was authentic and beautiful. Highly recommend!", rating: 5 },
  { name: "Kavita S.", location: "Rajkot", text: "Ordered matching sets for my daughter and me. Both outfits were gorgeous and we got so many compliments!", rating: 5 },
];

/* Tab type */
type Tab = "home" | "explore" | "looks" | "order" | "about";

/* ═══════════════════════════════════════════════════════════════
   IMAGE MODAL
   ═══════════════════════════════════════════════════════════════ */
function ImageModal({ src, title, open, onClose }: { src: string; title: string; open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(44, 24, 16, 0.85)" }}
          onClick={onClose}
        >
          <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} aria-label="Close">
            <X className="w-5 h-5 text-white" />
          </button>
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
            className="max-w-[92vw] max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={src} alt={title} className="max-h-[80vh] w-auto rounded-2xl object-contain" style={{ boxShadow: "0 20px 60px rgba(139, 34, 82, 0.3)" }} />
            <p className="text-center mt-3 text-white font-medium text-sm font-sans-body">{title}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOME TAB — Spiffy Boutique Experience
   ═══════════════════════════════════════════════════════════════ */
function HomeTab({ onExplore }: { onExplore: () => void }) {
  const [heroIdx, setHeroIdx] = useState(0);
  const [modal, setModal] = useState<{ src: string; title: string } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="pb-safe">
      {/* ── HERO CAROUSEL ── */}
      <div className="relative overflow-hidden" style={{ height: "52vh" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <img src={HERO_SLIDES[heroIdx].src} alt={HERO_SLIDES[heroIdx].title} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(139,34,82,0.15) 0%, rgba(44,24,16,0.7) 70%, rgba(44,24,16,0.92) 100%)" }} />
          </motion.div>
        </AnimatePresence>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: BRAND.gold }}>By Bhoomi Panchal</p>
          <h2 className="font-serif-display text-2xl font-bold text-white leading-tight">{HERO_SLIDES[heroIdx].title}</h2>
          <p className="text-white/80 text-sm mt-1 font-sans-body">{HERO_SLIDES[heroIdx].subtitle}</p>
          <div className="flex gap-3 mt-4">
            <a
              href={`${WA_BASE}?text=Hi%20Spiffy!%20I%20want%20to%20order%20custom%20chaniya%20choli%20for%20Navratri%202026`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-semibold active:scale-95 transition-transform pulse-spiffy"
              style={{ backgroundColor: BRAND.magenta }}
            >
              <ShoppingBag className="w-4 h-4" /> Order Now
            </a>
            <a
              href={IG_URL}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold active:scale-95 transition-transform"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff", backdropFilter: "blur(8px)" }}
            >
              <Instagram className="w-4 h-4" /> View IG
            </a>
          </div>
        </div>

        {/* Carousel dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setHeroIdx(i)} className="rounded-full transition-all duration-300" style={{ width: i === heroIdx ? 20 : 6, height: 6, backgroundColor: i === heroIdx ? BRAND.gold : "rgba(255,255,255,0.4)" }} />
          ))}
        </div>
      </div>

      {/* ── 9 COLORS OF NAVRATRI ── */}
      <div className="p-4" style={{ backgroundColor: BRAND.card }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-serif-display text-base font-bold" style={{ color: BRAND.text }}>9 Colors of Navratri 2026</h3>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: BRAND.muted, color: BRAND.magenta }}>Oct 11-19</span>
        </div>
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar">
          {NINE_COLORS.map((c) => (
            <button key={c.day} className="flex-shrink-0 flex flex-col items-center gap-1.5 active:scale-95 transition-transform" onClick={() => onExplore()}>
              <div className="relative">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-[13px] font-bold text-white shadow-md" style={{ backgroundColor: c.hex, boxShadow: `0 2px 8px ${c.hex}44` }}>
                  {c.day}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 text-xs">{c.emoji}</span>
              </div>
              <span className="text-[9px] font-medium w-12 text-center leading-tight" style={{ color: BRAND.textSec }}>{c.color}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── CHANIYA CHOLI COLLECTION ── */}
      <div className="mt-2.5">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h3 className="font-serif-display text-base font-bold" style={{ color: BRAND.text }}>Chaniya Choli Collection</h3>
            <p className="text-[11px] mt-0.5" style={{ color: BRAND.textMuted }}>Handcrafted designs • Custom sizing</p>
          </div>
          <button onClick={() => onExplore()} className="flex items-center gap-1 text-xs font-semibold active:opacity-70" style={{ color: BRAND.magenta }}>
            See All <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div ref={scrollRef} className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-3">
          {CHANIYA_COLLECTION.map((item, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setModal({ src: item.src, title: item.name })}
              className="flex-shrink-0 w-[160px] active:scale-[0.97] transition-transform"
            >
              <div className="relative h-[210px] rounded-2xl overflow-hidden" style={{ backgroundColor: BRAND.muted }}>
                <img src={item.src} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute top-2 left-2">
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: BRAND.magenta }}>{item.tag}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2.5" style={{ background: "linear-gradient(transparent, rgba(44,24,16,0.8))" }}>
                  <p className="text-white text-xs font-semibold leading-tight">{item.name}</p>
                  <p className="text-white/70 text-[10px] mt-0.5">{item.price} • WhatsApp to order</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── TRENDING NOW ── */}
      <div className="p-4 mt-2.5" style={{ backgroundColor: BRAND.card }}>
        <div className="flex items-center gap-2 mb-3">
          <Flame className="w-4 h-4" style={{ color: BRAND.saffron }} />
          <h3 className="font-serif-display text-base font-bold" style={{ color: BRAND.text }}>2026 Navratri Trends</h3>
        </div>
        <div className="space-y-2.5">
          {TRENDS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 p-3 rounded-xl"
              style={{ backgroundColor: BRAND.muted }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: BRAND.card, color: BRAND.magenta }}>
                {t.icon}
              </div>
              <div>
                <h4 className="text-[13px] font-semibold" style={{ color: BRAND.text }}>{t.title}</h4>
                <p className="text-[11px] leading-relaxed mt-0.5" style={{ color: BRAND.textSec }}>{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── JEWELLERY COLLECTION ── */}
      <div className="mt-2.5">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h3 className="font-serif-display text-base font-bold" style={{ color: BRAND.text }}>Jewellery Collection</h3>
            <p className="text-[11px] mt-0.5" style={{ color: BRAND.textMuted }}>Kundan • Temple • Jhumkas • Maang Tikka</p>
          </div>
          <button onClick={() => onExplore()} className="flex items-center gap-1 text-xs font-semibold active:opacity-70" style={{ color: BRAND.gold }}>
            See All <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2.5 px-4 pb-3">
          {JEWELLERY_COLLECTION.slice(0, 6).map((item, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setModal({ src: item.src, title: item.name })}
              className="active:scale-[0.97] transition-transform text-left"
            >
              <div className="relative h-[200px] rounded-2xl overflow-hidden" style={{ backgroundColor: BRAND.muted }}>
                <img src={item.src} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute top-2 left-2">
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: BRAND.gold, color: BRAND.text }}>{item.tag}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2.5" style={{ background: "linear-gradient(transparent, rgba(44,24,16,0.8))" }}>
                  <p className="text-white text-xs font-semibold">{item.name}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── WHY CHOOSE SPIFFY ── */}
      <div className="p-4 mt-2.5" style={{ backgroundColor: BRAND.card }}>
        <h3 className="font-serif-display text-base font-bold mb-3" style={{ color: BRAND.text }}>Why Choose Spiffy?</h3>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { icon: <Ruler className="w-5 h-5" />, title: "Any Size", desc: "S to 5XL, perfect fit guaranteed" },
            { icon: <Palette className="w-5 h-5" />, title: "Any Color", desc: "Match all 9 Navratri colors" },
            { icon: <Scissors className="w-5 h-5" />, title: "Any Design", desc: "Send reference or describe your dream" },
            { icon: <Truck className="w-5 h-5" />, title: "Pan India Delivery", desc: "Ahmedabad to worldwide shipping" },
            { icon: <Gem className="w-5 h-5" />, title: "Matching Jewellery", desc: "Complete look with coordinated sets" },
            { icon: <Star className="w-5 h-5" />, title: "Exhibition Quality", desc: "Exhibition pieces at your doorstep" },
          ].map((f, i) => (
            <div key={i} className="p-3 rounded-xl" style={{ backgroundColor: BRAND.muted }}>
              <div style={{ color: BRAND.magenta }}>{f.icon}</div>
              <p className="text-xs font-bold mt-1.5" style={{ color: BRAND.text }}>{f.title}</p>
              <p className="text-[10px] mt-0.5 leading-relaxed" style={{ color: BRAND.textSec }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <div className="p-4 mt-2.5" style={{ backgroundColor: BRAND.card }}>
        <h3 className="font-serif-display text-base font-bold mb-3" style={{ color: BRAND.text }}>Happy Customers</h3>
        <div className="space-y-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-3.5 rounded-xl"
              style={{ backgroundColor: BRAND.muted, borderLeft: `3px solid ${BRAND.gold}` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: BRAND.magenta }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: BRAND.text }}>{t.name}</p>
                  <p className="text-[10px]" style={{ color: BRAND.textMuted }}>{t.location}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} className="w-3 h-3 fill-current" style={{ color: BRAND.gold }} />
                  ))}
                </div>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: BRAND.textSec }}>"{t.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── BIG CTA SECTION ── */}
      <div className="mx-4 mt-4 mb-4 rounded-2xl p-5 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${BRAND.magenta}, ${BRAND.saffron})` }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full" style={{ backgroundColor: "rgba(200, 169, 81, 0.2)", filter: "blur(30px)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.1)", filter: "blur(20px)", transform: "translate(-30%, 30%)" }} />
        <div className="relative z-10">
          <Crown className="w-8 h-8 text-white/80 mb-2" />
          <h3 className="font-serif-display text-xl font-bold text-white leading-tight">Ready to Shine This Navratri?</h3>
          <p className="text-white/80 text-sm mt-2 leading-relaxed">Get your custom chaniya choli & matching jewellery. WhatsApp us your design idea and we will bring it to life!</p>
          <a
            href={`${WA_BASE}?text=Hi%20Bhoomi!%20I%20want%20to%20order%20custom%20chaniya%20choli%20%26%20jewellery%20for%20Navratri%202026`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-white rounded-xl text-sm font-bold active:scale-95 transition-transform shadow-lg"
            style={{ color: BRAND.magenta }}
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp Bhoomi
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      <ImageModal src={modal?.src || ""} title={modal?.title || ""} open={!!modal} onClose={() => setModal(null)} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EXPLORE TAB — Branded masonry search
   ═══════════════════════════════════════════════════════════════ */
function ExploreTab() {
  const [modal, setModal] = useState<{ src: string; title: string } | null>(null);
  const [filter, setFilter] = useState<"all" | "chaniya" | "jewellery">("all");

  const filtered = filter === "all" ? ALL_PINS : ALL_PINS.filter((p) => p.cat === filter);

  return (
    <div className="pb-safe">
      {/* Search bar */}
      <div className="px-4 pt-3 pb-2 sticky top-0 z-20" style={{ backgroundColor: BRAND.bg }}>
        <div className="flex items-center gap-2 rounded-xl px-3.5 py-2.5" style={{ backgroundColor: BRAND.card, border: `1.5px solid ${BRAND.border}` }}>
          <Search className="w-4 h-4" style={{ color: BRAND.textMuted }} />
          <input
            type="text"
            placeholder="Search chaniya, jewellery, designs..."
            className="bg-transparent text-sm outline-none flex-1 font-sans-body"
            style={{ color: BRAND.text }}
            readOnly
          />
        </div>
      </div>

      {/* Filter chips */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar">
        {[
          { key: "all" as const, label: "All Designs", icon: <Grid3X3 className="w-3 h-3" /> },
          { key: "chaniya" as const, label: "Chaniya Choli", icon: <Sparkles className="w-3 h-3" /> },
          { key: "jewellery" as const, label: "Jewellery", icon: <Gem className="w-3 h-3" /> },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all flex-shrink-0 active:scale-95"
            style={{
              backgroundColor: filter === f.key ? BRAND.magenta : BRAND.card,
              color: filter === f.key ? "#fff" : BRAND.textSec,
              border: filter === f.key ? "none" : `1.5px solid ${BRAND.border}`,
            }}
          >
            {f.icon} {f.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="px-4 py-1.5">
        <p className="text-[11px] font-medium" style={{ color: BRAND.textMuted }}>{filtered.length} designs found</p>
      </div>

      {/* Masonry grid */}
      <div className="px-3">
        <div className="masonry-grid">
          {filtered.map((pin, i) => (
            <motion.button
              key={`${filter}-${i}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setModal({ src: pin.src, title: pin.title })}
              className="w-full text-left group active:scale-[0.98] transition-transform"
            >
              <div className={`${pin.height} relative rounded-2xl overflow-hidden`} style={{ backgroundColor: BRAND.muted }}>
                <img src={pin.src} alt={pin.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity" style={{ background: "linear-gradient(transparent, rgba(139,34,82,0.3))" }} />
                <div className="absolute top-2 right-2 opacity-0 group-active:opacity-100 transition-opacity">
                  <Heart className="w-5 h-5 text-white drop-shadow" />
                </div>
                {/* Tag */}
                <div className="absolute bottom-0 left-0 right-0 p-2" style={{ background: "linear-gradient(transparent, rgba(44,24,16,0.75))" }}>
                  <p className="text-white text-[11px] font-semibold leading-tight">{pin.title}</p>
                  <p className="text-white/60 text-[9px] mt-0.5 flex items-center gap-1"><Heart className="w-2.5 h-2.5" fill="white" /> {pin.likes}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bottom CTA in explore */}
      <div className="mx-4 my-4 p-4 rounded-2xl text-center" style={{ backgroundColor: BRAND.muted, border: `1.5px dashed ${BRAND.gold}` }}>
        <p className="text-xs font-semibold" style={{ color: BRAND.text }}>Don't see what you want?</p>
        <p className="text-[11px] mt-1" style={{ color: BRAND.textSec }}>We can custom-make ANY design you have in mind!</p>
        <a
          href={`${WA_BASE}?text=Hi%20Bhoomi!%20I%20have%20a%20custom%20design%20in%20mind`}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-2.5 px-4 py-2 rounded-lg text-[11px] font-semibold text-white active:scale-95 transition-transform"
          style={{ backgroundColor: BRAND.magenta }}
        >
          <MessageCircle className="w-3.5 h-3.5" /> Send Your Design
        </a>
      </div>

      <ImageModal src={modal?.src || ""} title={modal?.title || ""} open={!!modal} onClose={() => setModal(null)} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LOOKS TAB — Full-screen lookbook (reel-style vertical swipe)
   ═══════════════════════════════════════════════════════════════ */
function LooksTab() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="h-[calc(100dvh-76px)] overflow-y-scroll reel-snap">
      {LOOKBOOK.map((look, i) => (
        <div key={i} className="h-[calc(100dvh-76px)] relative flex-shrink-0 scroll-snap-start">
          <img src={look.src} alt={look.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(44,24,16,0.1) 0%, transparent 30%, transparent 40%, rgba(44,24,16,0.75) 100%)" }} />

          {/* Day badge */}
          <div className="absolute top-5 left-4 z-10">
            <span className="text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: "rgba(139, 34, 82, 0.8)", backdropFilter: "blur(8px)" }}>
              {look.day}
            </span>
          </div>

          {/* Right side actions */}
          <div className="absolute right-3 bottom-28 flex flex-col items-center gap-5">
            <button className="flex flex-col items-center gap-0.5">
              <Heart className="w-7 h-7 text-white drop-shadow" />
              <span className="text-[10px] text-white font-medium">2.4k</span>
            </button>
            <button className="flex flex-col items-center gap-0.5">
              <Bookmark className="w-7 h-7 text-white drop-shadow" />
              <span className="text-[10px] text-white font-medium">Save</span>
            </button>
            <a
              href={`${WA_BASE}?text=Hi%20Bhoomi!%20I%20loved%20your%20${encodeURIComponent(look.title)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-0.5"
            >
              <MessageCircle className="w-7 h-7 text-white drop-shadow" />
              <span className="text-[10px] text-white font-medium">Order</span>
            </a>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-6 left-4 right-16 z-10">
            <h3 className="text-white font-serif-display text-lg font-bold drop-shadow-md leading-tight">{look.title}</h3>
            <p className="text-white/80 text-xs mt-1.5 drop-shadow leading-relaxed font-sans-body">{look.desc}</p>
            <a
              href={`${WA_BASE}?text=Hi%20Bhoomi!%20I%20want%20to%20order%20${encodeURIComponent(look.title)}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 px-5 py-2 rounded-xl text-white text-xs font-semibold active:scale-95 transition-transform"
              style={{ backgroundColor: BRAND.magenta, boxShadow: "0 4px 15px rgba(139, 34, 82, 0.5)" }}
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Get This Look
            </a>
          </div>

          {/* Swipe hint (first look only) */}
          {i === 0 && (
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-16 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
            >
              <span className="text-white/50 text-[10px]">Swipe for 9 looks</span>
              <ChevronUp className="w-4 h-4 text-white/50" />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ORDER TAB — Contact & order process
   ═══════════════════════════════════════════════════════════════ */
function OrderTab() {
  return (
    <div className="pb-safe">
      {/* Header */}
      <div className="px-4 pt-5 pb-4 text-center" style={{ backgroundColor: BRAND.card }}>
        <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-2" style={{ backgroundColor: BRAND.muted }}>
          <ShoppingBag className="w-7 h-7" style={{ color: BRAND.magenta }} />
        </div>
        <h2 className="font-serif-display text-lg font-bold" style={{ color: BRAND.text }}>Place Your Custom Order</h2>
        <p className="text-xs mt-1" style={{ color: BRAND.textSec }}>Chaniya choli & jewellery — made just for you</p>
      </div>

      {/* Contact options */}
      <div className="p-4 space-y-3">
        <a
          href={`${WA_BASE}?text=Hi%20Bhoomi!%20I%20want%20to%20order%20custom%20chaniya%20choli%20for%20Navratri%202026`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 rounded-2xl active:scale-[0.98] transition-transform"
          style={{ backgroundColor: BRAND.card, border: `1.5px solid ${BRAND.border}` }}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#25D36615" }}>
            <MessageCircle className="w-6 h-6" style={{ color: "#25D366" }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: BRAND.text }}>WhatsApp</p>
            <p className="text-xs" style={{ color: BRAND.textMuted }}>+91 81601 59403 • Fastest reply</p>
          </div>
          <ChevronRight className="w-4 h-4" style={{ color: BRAND.textMuted }} />
        </a>

        <a
          href={`tel:+${PHONE}`}
          className="flex items-center gap-3 p-4 rounded-2xl active:scale-[0.98] transition-transform"
          style={{ backgroundColor: BRAND.card, border: `1.5px solid ${BRAND.border}` }}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${BRAND.magenta}15` }}>
            <Phone className="w-6 h-6" style={{ color: BRAND.magenta }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: BRAND.text }}>Call Us</p>
            <p className="text-xs" style={{ color: BRAND.textMuted }}>+91 81601 59403</p>
          </div>
          <ChevronRight className="w-4 h-4" style={{ color: BRAND.textMuted }} />
        </a>

        <a
          href={IG_URL}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 rounded-2xl active:scale-[0.98] transition-transform"
          style={{ backgroundColor: BRAND.card, border: `1.5px solid ${BRAND.border}` }}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${BRAND.saffron}15` }}>
            <Instagram className="w-6 h-6" style={{ color: BRAND.saffron }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: BRAND.text }}>Instagram DM</p>
            <p className="text-xs" style={{ color: BRAND.textMuted }}>@spiffy_clothing_and_jewellery</p>
          </div>
          <ChevronRight className="w-4 h-4" style={{ color: BRAND.textMuted }} />
        </a>
      </div>

      {/* How to Order */}
      <div className="px-4 pb-4">
        <div className="rounded-2xl p-4" style={{ backgroundColor: BRAND.card, border: `1.5px solid ${BRAND.border}` }}>
          <h3 className="font-serif-display text-sm font-bold mb-3" style={{ color: BRAND.text }}>How It Works</h3>
          {[
            { step: "1", title: "Share Your Idea", text: "Send us a design reference photo or describe your dream outfit on WhatsApp" },
            { step: "2", title: "We Discuss Details", text: "Fabric, color, size, embroidery style, and budget — all finalized together" },
            { step: "3", title: "Handcrafted For You", text: "Your custom piece is carefully made with love and shipped to your doorstep" },
          ].map((s) => (
            <div key={s.step} className="flex gap-3 mb-3 last:mb-0">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white" style={{ backgroundColor: BRAND.magenta }}>
                {s.step}
              </div>
              <div>
                <p className="text-[12px] font-semibold" style={{ color: BRAND.text }}>{s.title}</p>
                <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color: BRAND.textSec }}>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick info grid */}
      <div className="px-4 pb-4 grid grid-cols-2 gap-2.5">
        {[
          { icon: <MapPin className="w-4 h-4" />, label: "Exhibitions in Ahmedabad", color: BRAND.magenta },
          { icon: <Truck className="w-4 h-4" />, label: "Worldwide Shipping", color: BRAND.saffron },
          { icon: <Globe className="w-4 h-4" />, label: "7,226+ Happy Followers", color: BRAND.gold },
          { icon: <Star className="w-4 h-4" />, label: "Custom Any Size / Design", color: BRAND.magenta },
        ].map((c, i) => (
          <div key={i} className="rounded-xl p-3 flex items-center gap-2.5" style={{ backgroundColor: BRAND.card, border: `1px solid ${BRAND.border}` }}>
            <div style={{ color: c.color }}>{c.icon}</div>
            <p className="text-[10px] font-medium leading-tight" style={{ color: BRAND.text }}>{c.label}</p>
          </div>
        ))}
      </div>

      {/* What you can order */}
      <div className="px-4 pb-4">
        <div className="rounded-2xl p-4" style={{ backgroundColor: BRAND.muted }}>
          <h3 className="font-serif-display text-sm font-bold mb-3" style={{ color: BRAND.text }}>What You Can Order</h3>
          <div className="space-y-2">
            {[
              "Custom Chaniya Choli (any design, any color)",
              "Matching Jewellery Sets (Kundan, Temple, Antique)",
              "Dupattas with heavy border work",
              "Complete Garba Look (outfit + jewellery + accessories)",
              "Matching Mother-Daughter / Sister sets",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CircleDot className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: BRAND.magenta }} />
                <p className="text-[11px] leading-relaxed" style={{ color: BRAND.textSec }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Big CTA */}
      <div className="px-4 pb-6">
        <a
          href={`${WA_BASE}?text=Hi%20Bhoomi!%20I%20want%20to%20order%20custom%20chaniya%20choli%20%26%20jewellery`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-sm font-bold text-white active:scale-[0.98] transition-transform pulse-spiffy"
          style={{ backgroundColor: BRAND.magenta, boxShadow: `0 4px 20px ${BRAND.magenta}40` }}
        >
          <MessageCircle className="w-4 h-4" />
          Start Ordering on WhatsApp
          <Send className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT TAB — Brand story & gallery
   ═══════════════════════════════════════════════════════════════ */
function AboutTab() {
  const [showGrid, setShowGrid] = useState(true);

  return (
    <div className="pb-safe">
      {/* Profile header */}
      <div className="px-4 pt-5 pb-4 text-center" style={{ backgroundColor: BRAND.card }}>
        <div className="w-24 h-24 rounded-full mx-auto p-[3px] mb-3" style={{ background: `linear-gradient(135deg, ${BRAND.magenta}, ${BRAND.gold}, ${BRAND.saffron})` }}>
          <div className="w-full h-full rounded-full p-[3px]" style={{ backgroundColor: BRAND.card }}>
            <div className="w-full h-full rounded-full flex items-center justify-center" style={{ backgroundColor: BRAND.muted }}>
              <span className="text-3xl font-serif-display font-bold text-white">S</span>
            </div>
          </div>
        </div>
        <h2 className="font-serif-display text-lg font-bold" style={{ color: BRAND.text }}>Spiffy Clothing & Jewellery</h2>
        <p className="text-xs mt-1" style={{ color: BRAND.textMuted }}>By Bhoomi Panchal • Fashion Designer</p>

        {/* Stats */}
        <div className="flex gap-6 justify-center mt-4">
          <div className="text-center">
            <p className="font-bold text-lg" style={{ color: BRAND.text }}>37</p>
            <p className="text-[10px]" style={{ color: BRAND.textMuted }}>Designs</p>
          </div>
          <div style={{ width: 1, backgroundColor: BRAND.border }} />
          <div className="text-center">
            <p className="font-bold text-lg" style={{ color: BRAND.text }}>7,226</p>
            <p className="text-[10px]" style={{ color: BRAND.textMuted }}>Followers</p>
          </div>
          <div style={{ width: 1, backgroundColor: BRAND.border }} />
          <div className="text-center">
            <p className="font-bold text-lg" style={{ color: BRAND.text }}>4.9</p>
            <p className="text-[10px]" style={{ color: BRAND.textMuted }}>Rating</p>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4 text-left p-3.5 rounded-xl" style={{ backgroundColor: BRAND.muted }}>
          <p className="text-[12px] leading-relaxed" style={{ color: BRAND.textSec }}>
            <span className="font-semibold" style={{ color: BRAND.text }}>Bhoomi Panchal</span> is a passionate fashion designer based in Ahmedabad, specializing in custom Navratri chaniya choli and traditional Indian jewellery. Every piece is handcrafted with love, ensuring you look your best during the festive season.
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {["Navratri Expert", "Custom Designs", "Ahmedabad", "Worldwide Shipping"].map((tag) => (
              <span key={tag} className="text-[9px] font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: BRAND.card, color: BRAND.magenta, border: `1px solid ${BRAND.border}` }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2.5 mt-4">
          <a
            href={`${WA_BASE}?text=Hi%20Bhoomi!`}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white text-center active:scale-95 transition-transform"
            style={{ backgroundColor: BRAND.magenta }}
          >
            Order Now
          </a>
          <a
            href={IG_URL}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 py-2.5 rounded-xl text-xs font-bold text-center active:scale-95 transition-transform"
            style={{ backgroundColor: BRAND.muted, color: BRAND.magenta }}
          >
            Follow on IG
          </a>
        </div>
      </div>

      {/* Grid/Reels toggle */}
      <div className="flex" style={{ backgroundColor: BRAND.card, borderBottom: `1.5px solid ${BRAND.border}` }}>
        <button onClick={() => setShowGrid(true)} className="flex-1 py-3 flex justify-center" style={{ borderBottom: showGrid ? `2px solid ${BRAND.magenta}` : "2px solid transparent" }}>
          <Grid3X3 className="w-5 h-5" style={{ color: showGrid ? BRAND.magenta : BRAND.textMuted }} />
        </button>
        <button onClick={() => setShowGrid(false)} className="flex-1 py-3 flex justify-center" style={{ borderBottom: !showGrid ? `2px solid ${BRAND.magenta}` : "2px solid transparent" }}>
          <Film className="w-5 h-5" style={{ color: !showGrid ? BRAND.magenta : BRAND.textMuted }} />
        </button>
      </div>

      {/* Grid view */}
      {showGrid && (
        <div className="grid grid-cols-3 gap-[2px]">
          {ALL_PINS.map((pin, i) => (
            <div key={i} className="aspect-square relative" style={{ backgroundColor: BRAND.muted }}>
              <img src={pin.src} alt={pin.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      )}

      {/* Reels view */}
      {!showGrid && (
        <div className="grid grid-cols-3 gap-[2px]">
          {LOOKBOOK.map((look, i) => (
            <div key={i} className="aspect-[9/16] relative" style={{ backgroundColor: BRAND.muted }}>
              <img src={look.src} alt={look.title} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Film className="w-6 h-6 text-white drop-shadow" />
              </div>
              <div className="absolute bottom-1 left-1">
                <span className="text-[8px] font-bold text-white bg-black/40 px-1.5 py-0.5 rounded">{look.day}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer info */}
      <div className="p-4 mt-2 text-center" style={{ backgroundColor: BRAND.card }}>
        <p className="text-[11px]" style={{ color: BRAND.textMuted }}>Made with love in Ahmedabad</p>
        <p className="text-[10px] mt-1" style={{ color: BRAND.textMuted }}>© 2026 Spiffy Clothing & Jewellery</p>
        <div className="flex justify-center gap-3 mt-3">
          <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="active:opacity-60">
            <Instagram className="w-5 h-5" style={{ color: BRAND.magenta }} />
          </a>
          <a href={`tel:+${PHONE}`} className="active:opacity-60">
            <Phone className="w-5 h-5" style={{ color: BRAND.magenta }} />
          </a>
          <a href={WA_BASE} target="_blank" rel="noopener noreferrer" className="active:opacity-60">
            <MessageCircle className="w-5 h-5" style={{ color: BRAND.magenta }} />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BOTTOM NAVIGATION — Spiffy branded (NOT Instagram)
   ═══════════════════════════════════════════════════════════════ */
function BottomNav({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const items: { tab: Tab; icon: React.ReactNode; label: string }[] = [
    { tab: "home", icon: <Crown className="w-[22px] h-[22px]" />, label: "Home" },
    { tab: "explore", icon: <Search className="w-[22px] h-[22px]" />, label: "Explore" },
    { tab: "looks", icon: <Film className="w-[22px] h-[22px]" />, label: "Looks" },
    { tab: "order", icon: <ShoppingBag className="w-[22px] h-[22px]" />, label: "Order" },
    { tab: "about", icon: <Gem className="w-[22px] h-[22px]" />, label: "About" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex items-end justify-around px-2"
      style={{
        height: 76,
        backgroundColor: BRAND.card,
        borderTop: `1.5px solid ${BRAND.border}`,
        paddingBottom: "env(safe-area-inset-bottom, 8px)",
      }}
    >
      {items.map((item) => {
        const isActive = active === item.tab;
        return (
          <button
            key={item.tab}
            onClick={() => onChange(item.tab)}
            className="flex flex-col items-center justify-center py-1.5 px-3 min-w-[52px] active:scale-90 transition-all"
            aria-label={item.label}
          >
            <div
              className="transition-all duration-200"
              style={{
                color: isActive ? BRAND.magenta : BRAND.textMuted,
                transform: isActive ? "scale(1.1)" : "scale(1)",
              }}
            >
              {item.icon}
            </div>
            <span
              className="text-[9px] mt-0.5 font-semibold transition-colors duration-200"
              style={{
                color: isActive ? BRAND.magenta : BRAND.textMuted,
              }}
            >
              {item.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="nav-indicator"
                className="w-1 h-1 rounded-full mt-0.5"
                style={{ backgroundColor: BRAND.magenta }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const handleExplore = () => setActiveTab("explore");

  return (
    <main className="min-h-[100dvh] font-sans-body" style={{ backgroundColor: BRAND.bg, color: BRAND.text }}>
      {/* Top bar — Spiffy branded header */}
      <header
        className="sticky top-0 z-30 h-[52px] flex items-center px-4"
        style={{
          backgroundColor: BRAND.card,
          borderBottom: `1.5px solid ${BRAND.border}`,
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${BRAND.magenta}, ${BRAND.gold})` }}>
            <span className="text-xs font-serif-display font-bold text-white">S</span>
          </div>
          <div>
            <h1 className="font-serif-display text-base font-bold leading-none text-gradient-spiffy">Spiffy</h1>
            <p className="text-[8px] font-medium tracking-wider uppercase" style={{ color: BRAND.textMuted }}>Clothing & Jewellery</p>
          </div>
        </div>
        <div className="flex-1" />
        <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="active:opacity-60 mr-3">
          <Instagram className="w-5 h-5" style={{ color: BRAND.textSec }} />
        </a>
        <a href={`${WA_BASE}?text=Hi%20Bhoomi!`} target="_blank" rel="noopener noreferrer" className="active:opacity-60">
          <MessageCircle className="w-5 h-5" style={{ color: BRAND.textSec }} />
        </a>
      </header>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === "home" && <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}><HomeTab onExplore={handleExplore} /></motion.div>}
        {activeTab === "explore" && <motion.div key="explore" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}><ExploreTab /></motion.div>}
        {activeTab === "looks" && <motion.div key="looks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}><LooksTab /></motion.div>}
        {activeTab === "order" && <motion.div key="order" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}><OrderTab /></motion.div>}
        {activeTab === "about" && <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}><AboutTab /></motion.div>}
      </AnimatePresence>

      {/* Bottom navigation */}
      <BottomNav active={activeTab} onChange={setActiveTab} />

      {/* Floating WhatsApp */}
      {activeTab !== "looks" && (
        <motion.a
          href={`${WA_BASE}?text=Hi%20Bhoomi!%20I%20saw%20your%20website%20and%20want%20to%20order`}
          target="_blank" rel="noopener noreferrer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-20 right-4 z-30 w-13 h-13 rounded-full flex items-center justify-center active:scale-90 transition-transform"
          style={{
            backgroundColor: "#25D366",
            width: 52,
            height: 52,
            boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
          }}
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-6 h-6 text-white fill-white" />
        </motion.a>
      )}
    </main>
  );
}