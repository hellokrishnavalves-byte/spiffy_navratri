"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Star,
  Heart,
  Instagram,
  Phone,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
  Palette,
  Ruler,
  Scissors,
  Gem,
  Flame,
  ArrowDown,
  X,
  ExternalLink,
  Send,
} from "lucide-react";

/* ─── Image Data ─── */
const CHANIYA_IMAGES = [
  {
    src: "https://sfile.chatglm.cn/images-ppt/60a5ce0fae2e.jpg",
    title: "Royal Bandhani",
    desc: "Vibrant patterned traditional outfit",
  },
  {
    src: "https://sfile.chatglm.cn/images-ppt/10cde675d093.png",
    title: "Garba Queen",
    desc: "Embroidered dress with garba sticks",
  },
  {
    src: "https://sfile.chatglm.cn/images-ppt/b5886ad09b0a.jpeg",
    title: "Tiered Elegance",
    desc: "Colorful tiered skirt with embroidered jacket",
  },
  {
    src: "https://sfile.chatglm.cn/images-ppt/c124a55fa892.jpg",
    title: "Ornate Heritage",
    desc: "Rich traditional outfit in ornate setting",
  },
  {
    src: "https://sfile.chatglm.cn/images-ppt/0bfa986a39f7.webp",
    title: "Rajasthani Dream",
    desc: "Vibrant outfit against scenic backdrop",
  },
  {
    src: "https://sfile.chatglm.cn/images-ppt/6c80b6982f1c.jpg",
    title: "Garden Princess",
    desc: "Red lehenga with patterned dupatta",
  },
  {
    src: "https://sfile.chatglm.cn/images-ppt/d4e2d0620af1.jpg",
    title: "Mirror Glow",
    desc: "Green & yellow lehenga with mirror work",
  },
  {
    src: "https://sfile.chatglm.cn/images-ppt/61a4b876cbc3.png",
    title: "Festive Glam",
    desc: "Intricate embroidery on vibrant fabric",
  },
];

const JEWELLERY_IMAGES = [
  {
    src: "https://sfile.chatglm.cn/images-ppt/8cb73d7a1f7b.jpg",
    title: "Kundan Royal Set",
    desc: "Gold with red & white gemstones",
  },
  {
    src: "https://sfile.chatglm.cn/images-ppt/e524710e5df1.jpeg",
    title: "Pearl Choker Set",
    desc: "Crystal & pearl choker with tikka",
  },
  {
    src: "https://sfile.chatglm.cn/images-ppt/e8f41674c678.jpg",
    title: "Temple Gold Set",
    desc: "Gold, pearl & white stone necklace",
  },
  {
    src: "https://sfile.chatglm.cn/images-ppt/0b320701fcdc.jpg",
    desc: "Turquoise & pink bead jewellery",
    title: "Boho Silver Set",
  },
  {
    src: "https://sfile.chatglm.cn/images-ppt/86d4a8102946.jpeg",
    title: "Heritage Kundan",
    desc: "Gold with clear gemstones & enamel",
  },
  {
    src: "https://sfile.chatglm.cn/images-ppt/7429c00ec318.png",
    title: "Bridal Gold Set",
    desc: "Heavy gold jewellery with white outfit",
  },
];

const NINE_COLORS = [
  { day: 1, name: "Day 1", color: "Yellow", hex: "#FFD700", goddess: "Shailputri", desc: "Bright & auspicious" },
  { day: 2, name: "Day 2", color: "Green", hex: "#228B22", goddess: "Brahmacharini", desc: "Nature & growth" },
  { day: 3, name: "Day 3", color: "Grey", hex: "#808080", goddess: "Chandraghanta", desc: "Balance & calm" },
  { day: 4, name: "Day 4", color: "Orange", hex: "#FF6B35", goddess: "Kushmanda", desc: "Energy & warmth" },
  { day: 5, name: "Day 5", color: "White", hex: "#F5F5F0", goddess: "Skandamata", desc: "Purity & peace" },
  { day: 6, name: "Day 6", color: "Red", hex: "#DC143C", goddess: "Katyayani", desc: "Power & passion" },
  { day: 7, name: "Day 7", color: "Royal Blue", hex: "#1E3A8A", goddess: "Kaalratri", desc: "Strength & depth" },
  { day: 8, name: "Day 8", color: "Pink", hex: "#FF69B4", goddess: "Mahagauri", desc: "Grace & beauty" },
  { day: 9, name: "Day 9", color: "Purple", hex: "#7B2D8E", goddess: "Siddhidatri", desc: "Royalty & devotion" },
];

const TRENDS = [
  { icon: <Sparkles className="w-5 h-5" />, title: "Bandhani Revival", desc: "Traditional tie-dye patterns in bold new color combos are the rage this season." },
  { icon: <Scissors className="w-5 h-5" />, title: "Cape Blouses", desc: "One-shoulder cuts, cape overlays & cold-shoulder styles redefine the choli." },
  { icon: <Palette className="w-5 h-5" />, title: "Pastel Power", desc: "Soft pastels meet mirror work for a dreamy, modern Garba look." },
  { icon: <Gem className="w-5 h-5" />, title: "Kundan Layers", desc: "Layered kundan necklaces & temple jewellery dominate 2026 festive styling." },
  { icon: <Ruler className="w-5 h-5" />, title: "Chinon Fabric", desc: "Lightweight Chinon with heavy embroidery — comfort meets grandeur." },
  { icon: <Flame className="w-5 h-5" />, title: "Mirror Magic", desc: "Abla mirror work & Gotapatti create dazzling dance-ready outfits." },
];

/* ─── Reusable: Section wrapper ─── */
function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`px-5 py-6 ${className}`}
    >
      {children}
    </motion.section>
  );
}

/* ─── Horizontal scroll with arrow buttons ─── */
function HorizontalScroll({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative group">
      <button
        onClick={() => scroll("left")}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/60 border border-[var(--border)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm active:scale-90"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-4 h-4 text-[var(--primary)]" />
      </button>
      <div
        ref={scrollRef}
        className={`flex gap-3 overflow-x-auto no-scrollbar scroll-snap-x pb-2 ${className}`}
      >
        {children}
      </div>
      <button
        onClick={() => scroll("right")}
        className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/60 border border-[var(--border)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm active:scale-90"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-4 h-4 text-[var(--primary)]" />
      </button>
    </div>
  );
}

/* ─── Image Modal ─── */
function ImageModal({
  src,
  title,
  open,
  onClose,
}: {
  src: string;
  title: string;
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
            className="max-w-[90vw] max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={title}
              className="max-h-[80vh] w-auto rounded-2xl object-contain"
            />
            <p className="text-center mt-3 text-[var(--primary)] font-serif-display text-lg font-semibold">
              {title}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const [modal, setModal] = useState<{ src: string; title: string } | null>(null);
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const colorScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!colorScrollRef.current) return;
    const container = colorScrollRef.current;
    const cardWidth = container.firstElementChild?.getBoundingClientRect().width || 120;
    container.scrollTo({ left: activeColorIdx * (cardWidth + 12) - 20, behavior: "smooth" });
  }, [activeColorIdx]);

  return (
    <main className="min-h-screen font-sans-body relative overflow-x-hidden">
      {/* ═══ Decorative background ═══ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#1a0505] via-[#0a0505] to-[#0a0505]" />
        <div className="absolute top-20 right-0 w-72 h-72 bg-[#d4a017]/5 rounded-full blur-[100px]" />
        <div className="absolute top-96 -left-20 w-60 h-60 bg-[#8B1A1A]/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-40 right-10 w-48 h-48 bg-[#e8632b]/5 rounded-full blur-[80px]" />
      </div>

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative min-h-[100dvh] flex flex-col justify-end pb-8 px-5 pt-16 z-10">
        {/* Hero background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://sfile.chatglm.cn/images-ppt/efc074bc5101.jpg"
            alt="Navratri dancer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0505] via-[#0a0505]/70 to-[#0a0505]/30" />
        </div>

        <div className="relative z-10">
          {/* Floating decorative element */}
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mb-6"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d4a017] to-[#e8632b] flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7 text-[#0a0505]" />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[var(--muted-foreground)] text-xs tracking-[0.3em] uppercase mb-3 font-medium"
          >
            Navratri 2026 Collection
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-serif-display text-5xl font-bold leading-[1.1] mb-2"
          >
            <span className="text-gradient-gold">Spiffy</span>
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-serif-display text-3xl font-semibold text-[var(--foreground)] mb-4"
          >
            by Bhoomi Panchal
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-[var(--muted-foreground)] text-sm leading-relaxed max-w-xs mb-6"
          >
            Custom designer chaniya choli & jewellery for the perfect Garba night. 
            Any size. Any design. Any color.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="flex gap-3"
          >
            <a
              href="https://wa.me/919876543210?text=Hi%20Bhoomi!%20I%20want%20to%20order%20custom%20chaniya%20choli"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d4a017] to-[#e8a820] text-[#0a0505] rounded-full text-sm font-semibold active:scale-95 transition-transform shadow-lg shadow-[#d4a017]/20"
            >
              <MessageCircle className="w-4 h-4" />
              Order on WhatsApp
            </a>
            <a
              href="https://www.instagram.com/spiffy_clothing_and_jewellery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 border border-[var(--border)] text-[var(--foreground)] rounded-full text-sm font-medium active:scale-95 transition-transform backdrop-blur-sm"
            >
              <Instagram className="w-4 h-4" />
              <span className="hidden sm:inline">Follow</span>
            </a>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-10 flex justify-center"
          >
            <ArrowDown className="w-5 h-5 text-[var(--muted-foreground)]" />
          </motion.div>
        </div>
      </section>

      {/* ═══ 9 COLORS OF NAVRATRI ═══ */}
      <Section id="colors">
        <div className="mb-5">
          <p className="text-[var(--accent)] text-xs tracking-[0.25em] uppercase mb-1 font-medium">
            Navratri 2026 &bull; Oct 11 – 19
          </p>
          <h2 className="font-serif-display text-2xl font-bold">
            9 Nights, 9 <span className="text-gradient-festive">Colors</span>
          </h2>
        </div>

        {/* Color selector strip */}
        <div ref={colorScrollRef} className="flex gap-3 overflow-x-auto no-scrollbar mb-4 pb-1">
          {NINE_COLORS.map((c, i) => (
            <button
              key={c.day}
              onClick={() => setActiveColorIdx(i)}
              className={`flex-shrink-0 flex flex-col items-center gap-1.5 transition-all duration-300 ${
                activeColorIdx === i ? "scale-110" : "opacity-50 hover:opacity-80"
              }`}
              aria-label={`Day ${c.day} - ${c.color}`}
            >
              <div
                className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  activeColorIdx === i
                    ? "border-[var(--primary)] shadow-lg scale-110"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: c.hex }}
              />
              <span className="text-[10px] text-[var(--muted-foreground)] font-medium">
                {c.day}
              </span>
            </button>
          ))}
        </div>

        {/* Active color detail card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeColorIdx}
            initial={{ opacity: 0, y: 15, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.35 }}
            className="bg-card-glass rounded-2xl p-5 glow-gold"
          >
            <div className="flex items-start gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-inner"
                style={{ backgroundColor: NINE_COLORS[activeColorIdx].hex }}
              >
                <span className="text-[#0a0505] font-bold text-lg font-serif-display">
                  {NINE_COLORS[activeColorIdx].day}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-serif-display text-xl font-bold text-[var(--foreground)]">
                    {NINE_COLORS[activeColorIdx].color}
                  </h3>
                  <span className="text-[var(--muted-foreground)] text-xs">
                    &bull; {NINE_COLORS[activeColorIdx].name}
                  </span>
                </div>
                <p className="text-[var(--primary)] text-xs tracking-wider uppercase mb-2 font-medium">
                  Maa {NINE_COLORS[activeColorIdx].goddess}
                </p>
                <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                  {NINE_COLORS[activeColorIdx].desc}
                </p>
                <p className="text-xs text-[var(--muted-foreground)] mt-2 opacity-70">
                  We design matching chaniya choli & jewellery in every color!
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Section>

      {/* ═══ ABOUT BHOOMI ═══ */}
      <Section>
        <div className="bg-card-glass rounded-2xl overflow-hidden glow-red">
          <div className="relative h-48">
            <img
              src="https://sfile.chatglm.cn/images-ppt/6fe4652a12a8.png"
              alt="Festive marigold and diyas"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a0e0e] to-transparent" />
            <div className="absolute bottom-4 left-5 right-5">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-3.5 h-3.5 text-[var(--primary)] fill-[var(--primary)]" />
                <span className="text-[var(--primary)] text-xs tracking-[0.2em] uppercase font-medium">
                  The Designer
                </span>
              </div>
              <h2 className="font-serif-display text-2xl font-bold">Bhoomi Panchal</h2>
            </div>
          </div>
          <div className="p-5 pt-3">
            <p className="text-[var(--muted-foreground)] text-sm leading-[1.8]">
              Fashion designer specializing in custom Navratri chaniya choli & jewellery. 
              Every piece is handcrafted with love — from intricate Bandhani and mirror work 
              to stunning Kundan and temple jewellery sets. I believe every woman deserves to 
              feel like a queen on the Garba dance floor.
            </p>
            <div className="flex gap-3 mt-4">
              <div className="flex-1 bg-[var(--muted)] rounded-xl p-3 text-center">
                <p className="text-[var(--primary)] font-serif-display text-xl font-bold">Any</p>
                <p className="text-[var(--muted-foreground)] text-[10px] uppercase tracking-wider mt-0.5">Size</p>
              </div>
              <div className="flex-1 bg-[var(--muted)] rounded-xl p-3 text-center">
                <p className="text-[var(--primary)] font-serif-display text-xl font-bold">Any</p>
                <p className="text-[var(--muted-foreground)] text-[10px] uppercase tracking-wider mt-0.5">Design</p>
              </div>
              <div className="flex-1 bg-[var(--muted)] rounded-xl p-3 text-center">
                <p className="text-[var(--primary)] font-serif-display text-xl font-bold">Any</p>
                <p className="text-[var(--muted-foreground)] text-[10px] uppercase tracking-wider mt-0.5">Color</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ CHANIYA CHOLI COLLECTION ═══ */}
      <Section>
        <div className="mb-5">
          <p className="text-[var(--accent)] text-xs tracking-[0.25em] uppercase mb-1 font-medium">
            Handcrafted with Love
          </p>
          <h2 className="font-serif-display text-2xl font-bold">
            Chaniya Choli <span className="text-gradient-gold">Collection</span>
          </h2>
          <p className="text-[var(--muted-foreground)] text-sm mt-1.5">
            Swipe to explore our Navratri 2026 designs
          </p>
        </div>

        <HorizontalScroll>
          {CHANIYA_IMAGES.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex-shrink-0 w-[200px] scroll-snap-start"
            >
              <button
                onClick={() => setModal({ src: item.src, title: item.title })}
                className="w-full text-left group"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-2.5 bg-card-glass">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-active:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-serif-display text-sm font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-[10px] mt-0.5">{item.desc}</p>
                  </div>
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <ExternalLink className="w-3 h-3 text-white/80" />
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </HorizontalScroll>
      </Section>

      {/* ═══ JEWELLERY COLLECTION ═══ */}
      <Section>
        <div className="mb-5">
          <p className="text-[var(--accent)] text-xs tracking-[0.25em] uppercase mb-1 font-medium">
            Complete Your Look
          </p>
          <h2 className="font-serif-display text-2xl font-bold">
            Jewellery <span className="text-gradient-gold">Collection</span>
          </h2>
          <p className="text-[var(--muted-foreground)] text-sm mt-1.5">
            Kundan, Temple, Oxidised & more
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {JEWELLERY_IMAGES.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <button
                onClick={() => setModal({ src: item.src, title: item.title })}
                className="w-full text-left group"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-card-glass">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-active:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <h3 className="font-serif-display text-xs font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-[9px] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ═══ 2026 TRENDS ═══ */}
      <Section>
        <div className="mb-5">
          <p className="text-[var(--accent)] text-xs tracking-[0.25em] uppercase mb-1 font-medium">
            What&apos;s Hot This Season
          </p>
          <h2 className="font-serif-display text-2xl font-bold">
            2026 <span className="text-gradient-festive">Trends</span>
          </h2>
        </div>

        <div className="space-y-3">
          {TRENDS.map((trend, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card-glass-light rounded-xl p-4 flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4a017]/20 to-[#e8632b]/20 flex items-center justify-center flex-shrink-0 text-[var(--primary)]">
                {trend.icon}
              </div>
              <div className="min-w-0">
                <h3 className="font-serif-display text-sm font-semibold text-[var(--foreground)] mb-0.5">
                  {trend.title}
                </h3>
                <p className="text-[var(--muted-foreground)] text-xs leading-relaxed">
                  {trend.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ═══ FESTIVAL VIBES ═══ */}
      <Section>
        <div className="mb-5">
          <p className="text-[var(--accent)] text-xs tracking-[0.25em] uppercase mb-1 font-medium">
            Feel the Rhythm
          </p>
          <h2 className="font-serif-display text-2xl font-bold">
            Navratri <span className="text-gradient-gold">Vibes</span>
          </h2>
        </div>

        <HorizontalScroll>
          {[
            {
              src: "https://sfile.chatglm.cn/images-ppt/b231344d43ec.jpg",
              title: "Garba Night Magic",
              desc: "Traditional dance celebration",
            },
            {
              src: "https://sfile.chatglm.cn/images-ppt/83b6435467b3.jpg",
              title: "Festive Elegance",
              desc: "Traditional lehenga in festive decor",
            },
            {
              src: "https://sfile.chatglm.cn/images-ppt/a0ef83710e42.jpg",
              title: "Ethnic Charm",
              desc: "Black outfit with colorful embroidery",
            },
            {
              src: "https://sfile.chatglm.cn/images-ppt/e1110d9d6ec7.jpg",
              title: "Pink Dream",
              desc: "Colorful lehenga with pink dupatta",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex-shrink-0 w-[260px] scroll-snap-start"
            >
              <button
                onClick={() => setModal({ src: item.src, title: item.title })}
                className="w-full text-left group"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-card-glass">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-active:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <h3 className="font-serif-display text-sm font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-[10px] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </HorizontalScroll>
      </Section>

      {/* ═══ CUSTOM ORDER CTA ═══ */}
      <Section>
        <div className="relative overflow-hidden rounded-2xl">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B1A1A] via-[#5a1010] to-[#1a0505]" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-8 w-24 h-24 rounded-full border border-[#d4a017]/40" />
            <div className="absolute bottom-6 left-6 w-32 h-32 rounded-full border border-[#d4a017]/20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-[#d4a017]/15" />
          </div>

          <div className="relative z-10 p-6 text-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="inline-block mb-4"
            >
              <Heart className="w-8 h-8 text-[var(--primary)] fill-[var(--primary)]" />
            </motion.div>

            <h2 className="font-serif-display text-2xl font-bold mb-2">
              Your Dream Chaniya, <span className="text-gradient-gold">Made to Order</span>
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-5 max-w-xs mx-auto">
              Tell me your vision — I&apos;ll bring it to life. Custom sizing, 
              handpicked fabrics, and embroidery that tells your story.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/919876543210?text=Hi%20Bhoomi!%20I%20want%20to%20order%20custom%20chaniya%20choli%20for%20Navratri"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#d4a017] to-[#e8a820] text-[#0a0505] rounded-full text-sm font-bold active:scale-95 transition-transform shadow-lg shadow-[#d4a017]/30"
              >
                <MessageCircle className="w-4.5 h-4.5" />
                WhatsApp to Order
                <Send className="w-3.5 h-3.5" />
              </a>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white rounded-full text-sm font-medium active:scale-95 transition-transform backdrop-blur-sm"
              >
                <Phone className="w-4 h-4" />
                Call to Discuss
              </a>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10">
              <p className="text-white/40 text-[10px] tracking-wider uppercase">
                Delivery across India &bull; Rush orders available
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ WHY CHOOSE US ═══ */}
      <Section>
        <div className="mb-5">
          <p className="text-[var(--accent)] text-xs tracking-[0.25em] uppercase mb-1 font-medium">
            The Spiffy Promise
          </p>
          <h2 className="font-serif-display text-2xl font-bold">
            Why <span className="text-gradient-gold">Spiffy</span>?
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { emoji: "🪡", title: "Handcrafted", desc: "Every stitch tells a story of tradition & love" },
            { emoji: "📐", title: "Perfect Fit", desc: "Custom tailoring for every body type & size" },
            { emoji: "💎", title: "Premium Quality", desc: "Finest fabrics, kundan, mirrors & embellishments" },
            { emoji: "🎨", title: "Your Design", desc: "Bring your Pinterest board — we make it real" },
            { emoji: "📦", title: "Pan-India Delivery", desc: "Safe packaging & delivery to your doorstep" },
            { emoji: "⚡", title: "Rush Orders", desc: "Need it fast? We've got you covered" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card-glass-light rounded-xl p-4"
            >
              <span className="text-2xl mb-2 block">{item.emoji}</span>
              <h3 className="font-serif-display text-sm font-semibold text-[var(--foreground)] mb-1">
                {item.title}
              </h3>
              <p className="text-[var(--muted-foreground)] text-[11px] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ═══ INSTAGRAM FEED CTA ═══ */}
      <Section>
        <div className="bg-card-glass rounded-2xl p-5 glow-gold text-center">
          <Instagram className="w-8 h-8 text-[var(--primary)] mx-auto mb-3" />
          <h2 className="font-serif-display text-xl font-bold mb-2">
            Follow on Instagram
          </h2>
          <p className="text-[var(--muted-foreground)] text-sm mb-4 max-w-xs mx-auto">
            Daily inspiration, behind-the-scenes, new designs & customer showcases. 
            Join the Spiffy family!
          </p>
          <a
            href="https://www.instagram.com/spiffy_clothing_and_jewellery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] text-white rounded-full text-sm font-semibold active:scale-95 transition-transform shadow-lg"
          >
            <Instagram className="w-4 h-4" />
            @spiffy_clothing_and_jewellery
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </Section>

      {/* ═══ FOOTER ═══ */}
      <footer className="px-5 pb-10 pt-6 mt-4 border-t border-[var(--border)]">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 mb-3">
            <Sparkles className="w-4 h-4 text-[var(--primary)]" />
            <span className="font-serif-display text-lg font-bold text-gradient-gold">
              Spiffy
            </span>
          </div>
          <p className="text-[var(--muted-foreground)] text-xs mb-4">
            Custom Chaniya Choli & Jewellery by Bhoomi Panchal
          </p>

          <div className="flex justify-center gap-4 mb-4">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-card-glass flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors active:scale-90"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4.5 h-4.5" />
            </a>
            <a
              href="https://www.instagram.com/spiffy_clothing_and_jewellery"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-card-glass flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors active:scale-90"
              aria-label="Instagram"
            >
              <Instagram className="w-4.5 h-4.5" />
            </a>
            <a
              href="tel:+919876543210"
              className="w-10 h-10 rounded-full bg-card-glass flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors active:scale-90"
              aria-label="Phone"
            >
              <Phone className="w-4.5 h-4.5" />
            </a>
          </div>

          <p className="text-[var(--muted-foreground)] text-[10px] opacity-50">
            Made with love for Navratri 2026
          </p>
        </div>
      </footer>

      {/* ═══ IMAGE MODAL ═══ */}
      <ImageModal
        src={modal?.src || ""}
        title={modal?.title || ""}
        open={!!modal}
        onClose={() => setModal(null)}
      />

      {/* ═══ FLOATING WHATSAPP BUTTON ═══ */}
      <motion.a
        href="https://wa.me/919876543210?text=Hi%20Bhoomi!%20I%20saw%20your%20website%20and%20want%20to%20know%20more%20about%20custom%20chaniya%20choli"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        className="fixed bottom-6 right-4 z-40 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 active:scale-90 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white fill-white" />
      </motion.a>
    </main>
  );
}