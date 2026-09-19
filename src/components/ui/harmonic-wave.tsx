// Built using Hyperiux Vault (Harmonic Wave Edition - Fixed URLs)
"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

// Curated Royal Heritage & Palatial Wedding Imagery (Verified 200 OK)
const IMG = {
  angle1: "https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp",
  angle2: "https://rasmwed.com/wp-content/uploads/2024/08/Jagmandir-Island-Palace.webp",
  angle3: "https://rasmwed.com/wp-content/uploads/2024/07/MLVR0388-scaled.webp",
  angle4: "https://rasmwed.com/wp-content/uploads/2026/04/Romantic-Indian-Wedding-Moment.jpg",
  angle5: "https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp",
  angle6: "https://rasmwed.com/wp-content/uploads/2026/04/download-49.jpg",
  angle7: "https://rasmwed.com/wp-content/uploads/2024/07/IMG_E5208.webp",
  angle8: "https://rasmwed.com/wp-content/uploads/2024/08/The-Leela-Palace-Udaipur.webp",
} as const;

const SCALE: Partial<Record<number, number>> = {
  1: 0.88,
  2: 0.78,
  3: 0.88,
  4: 0.78,
  5: 0.78,
  6: 0.88,
  7: 0.88,
  8: 0.68,
};
const s = (i: number) => SCALE[i] ?? 1;

// Initial positions mapped along a precise sine wave layout
const CARDS: StackSpreadCard[] = [
  {
    item: { src: IMG.angle1, alt: "The Oberoi Udaivilas, Udaipur" },
    waveOffset: { x: -36, y: -12 },
    waveRotate: -6,
    target: { x: -22, y: -36, rotate: -4, scale: s(8), w: 16, h: 21 },
    targetSm: { x: -22, y: -40 },
    z: 2,
  },
  {
    item: { src: IMG.angle2, alt: "Jagmandir Island Palace" },
    waveOffset: { x: -26, y: 12 },
    waveRotate: -3,
    target: { x: 34, y: -32, rotate: 6, scale: s(7), w: 17, h: 30 },
    targetSm: { x: 22, y: -40 },
    z: 3,
  },
  {
    item: { src: IMG.angle3, alt: "Palatial Floral Mandap Architecture" },
    waveOffset: { x: -16, y: -16 },
    waveRotate: 0,
    target: { x: -38, y: -4, rotate: -2, scale: s(6), w: 14, h: 30 },
    targetSm: { x: -22, y: -19 },
    z: 4,
  },
  {
    item: { src: IMG.angle4, alt: "Sacred Lake Pichola Vows" },
    waveOffset: { x: -6, y: 14 },
    waveRotate: 3,
    target: { x: 4, y: -34, rotate: 3, scale: s(5), w: 24, h: 28 },
    targetSm: { x: 22, y: -19 },
    z: 5,
  },
  {
    item: { src: IMG.angle5, alt: "Fateh Garh Hilltop Palace" },
    waveOffset: { x: 4, y: -14 },
    waveRotate: -3,
    target: { x: 38, y: 8, rotate: -3, scale: s(4), w: 17, h: 30 },
    targetSm: { x: -22, y: 20 },
    z: 6,
  },
  {
    item: { src: IMG.angle6, alt: "Everlasting Royal Pheras" },
    waveOffset: { x: 14, y: 16 },
    waveRotate: 2,
    target: { x: -26, y: 36, rotate: 5, scale: s(3), w: 21, h: 24 },
    targetSm: { x: 22, y: 20 },
    z: 7,
  },
  {
    item: { src: IMG.angle7, alt: "Grand Royal Baraat & Procession" },
    waveOffset: { x: 24, y: -12 },
    waveRotate: 5,
    target: { x: 2, y: 38, rotate: -2, scale: s(2), w: 19, h: 25 },
    targetSm: { x: -22, y: 40 },
    z: 8,
  },
  {
    item: { src: IMG.angle8, alt: "The Leela Palace Waterfront" },
    waveOffset: { x: 34, y: 10 },
    waveRotate: 7,
    target: { x: 32, y: 36, rotate: 4, scale: s(1), w: 15, h: 19 },
    targetSm: { x: 22, y: 40 },
    z: 9,
  },
];

const SCATTER_START = 0.12;
const SCATTER_END = 0.85;
const PARALLAX_INTENSITY = 3.0;
const SPRING_CONFIG = { stiffness: 75, damping: 20, mass: 0.8 };
const PROGRESS_SPRING = { stiffness: 90, damping: 30, restDelta: 0.0001 };

const SUB = "Harmonic wave motion transforming into spatial cinematic choreography.";

const RESPONSIVE = {
  desktop: {
    scale: null as number | null,
    small: false,
    colX: null as number | null,
    card: null as { w: number; h: number } | null,
  },
  small: {
    scale: 0.72,
    small: true,
    colX: 22,
    card: { w: 40, h: 20 },
  },
};

function useResponsive() {
  const [r, setR] = useState(RESPONSIVE.desktop);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const read = () => setR(mq.matches ? RESPONSIVE.small : RESPONSIVE.desktop);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);
  return r;
}

function usePointerParallax(active: boolean, enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  useEffect(() => {
    if (!enabled) return;
    if (!active) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const onMove = (event: PointerEvent) => {
      rawX.set((event.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((event.clientY / window.innerHeight - 0.5) * 2);
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [active, enabled, rawX, rawY]);

  return { x, y };
}

export interface StackSpreadItem {
  src: string;
  alt?: string;
}

export interface StackSpreadTarget {
  x: number;
  y: number;
  rotate: number;
  scale?: number;
  w: number;
  h: number;
}

export interface StackSpreadCard {
  item: StackSpreadItem;
  target: StackSpreadTarget;
  targetSm?: { x: number; y: number };
  waveRotate?: number;
  waveOffset?: { x: number; y: number };
  z?: number;
}

function Card({
  card,
  progress,
  reduce,
  scaleMul,
  isSmall,
  colX,
  fixedCard,
  stackScale,
  cardRadius,
  pointer,
  index,
  total,
  isSpreadActive,
}: {
  card: StackSpreadCard;
  progress: MotionValue<number>;
  reduce: boolean | null;
  scaleMul: number | null;
  isSmall: boolean;
  colX: number | null;
  fixedCard: { w: number; h: number } | null;
  stackScale: number;
  cardRadius: number;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  index: number;
  total: number;
  isSpreadActive: boolean;
}) {
  const { item, target } = card;

  const flat = reduce === true;
  const waveRotate = flat ? 0 : card.waveRotate ?? 0;
  const waveOffset = card.waveOffset ?? { x: 0, y: 0 };
  const restScale = scaleMul ?? target.scale ?? 1;

  const sm = isSmall && card.targetSm ? card.targetSm : null;
  const endX = sm ? (colX != null ? Math.sign(sm.x) * colX : sm.x) : target.x;
  const endY = sm ? sm.y : target.y;
  const endRotate = flat || isSmall ? 0 : target.rotate;

  const depthFactor = 0.5 + (index / (total - 1 || 1)) * 0.7;

  const translate = useTransform(
    [progress, pointer.x, pointer.y],
    ([p, px, py]: number[]) => {
      const easeP = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
      const tx = waveOffset.x + (endX - waveOffset.x) * easeP;
      const ty = waveOffset.y + (endY - waveOffset.y) * easeP;
      
      const dx = tx - px * PARALLAX_INTENSITY * depthFactor * p;
      const dy = ty - py * PARALLAX_INTENSITY * depthFactor * p;
      return `calc(-50% + ${dx}vw) calc(-50% + ${dy}vh)`;
    }
  );

  const rotate = useTransform(progress, [0, 1], [waveRotate, endRotate]);
  const scale = useTransform(progress, [0, 1], [stackScale, restScale]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 will-change-transform cursor-pointer"
      style={{
        width: `${fixedCard ? fixedCard.w : target.w}vw`,
        height: `${fixedCard ? fixedCard.h : target.h}vh`,
        zIndex: card.z ?? 1,
        translate,
        rotate,
        scale,
      }}
      whileHover={
        isSpreadActive && !isSmall
          ? { scale: restScale * 1.06, y: -12, zIndex: 100, transition: { type: "spring", stiffness: 300, damping: 20 } }
          : undefined
      }
    >
      <div
        className="relative h-full w-full overflow-hidden shadow-2xl shadow-black/20 dark:shadow-black/50 ring-1 ring-black/10 dark:ring-white/10 transition-shadow duration-300 hover:shadow-amber-500/20 max-md:rounded-[4vw]"
        style={{ borderRadius: `${cardRadius}px` }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-black/30 dark:from-black/50 via-transparent to-white/10 opacity-70 pointer-events-none z-10" />
        <img
          src={item.src}
          alt={item.alt ?? ""}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
    </motion.div>
  );
}

interface StackSpreadStageProps {
  cards: StackSpreadCard[];
  scrollLength?: number;
  bgColor?: string;
  stackScale?: number;
  cardRadius?: number;
  textColor?: string;
  textFadeStart?: number;
  showScrollHint?: boolean;
}

function StackSpreadStage({
  cards,
  scrollLength = 380,
  bgColor,
  stackScale = 0.72,
  cardRadius = 14,
  textColor,
  textFadeStart = 0.28,
  showScrollHint = true,
}: StackSpreadStageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scale: scaleMul, small: isSmall, colX, card: fixedCard } = useResponsive();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, PROGRESS_SPRING);

  const progress = useTransform(
    smoothProgress,
    [0, SCATTER_START, SCATTER_END, 1],
    [0, 0, 1, 1]
  );

  const [spread, setSpread] = useState(false);
  useMotionValueEvent(progress, "change", (p) => {
    setSpread((was) => (was ? p > 0.985 : p >= 0.999));
  });

  const parallaxEnabled = reduce !== true && !isSmall;
  const pointer = usePointerParallax(spread, parallaxEnabled);

  const noScale = reduce === true;
  const copyOpacity = useTransform(progress, [textFadeStart, textFadeStart + 0.3], [0, 1]);
  const copyScale = useTransform(progress, [textFadeStart, 0.88], [0.9, 1]);
  const hintOpacity = useTransform(progress, [0, SCATTER_START], [1, 0]);

  return (
    <section
      ref={wrapRef}
      className="relative w-full select-none bg-white text-neutral-900 transition-colors duration-300"
      style={{ height: `${scrollLength}vh`, ...(bgColor ? { backgroundColor: bgColor } : {}) }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Ambient Warm Gold Glow Background */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40 blur-[140px]">
          <div className="w-[45vw] h-[45vw] rounded-full bg-amber-200/50 mix-blend-multiply" />
        </div>

        {/* Centre Brand Headline */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[5] flex flex-col items-center justify-center px-6 text-center max-md:px-8"
          style={{
            opacity: copyOpacity,
            scale: noScale ? 1 : copyScale,
          }}
        >
          <h2
            className="w-full whitespace-pre-line text-[4.2vw] font-manrope font-medium tracking-tight max-md:text-[8vw] text-charcoal-900 leading-tight"
            style={textColor ? { color: textColor } : undefined}
          >
            Harmonic <span className="gold-gradient-text italic font-normal">Palatial</span> Motion.
          </h2>
          <p
            className="mt-[1.2vw] w-full max-w-[48ch] text-[1.1vw] font-manrope font-light leading-relaxed tracking-wide max-md:mt-3 max-md:text-[3.6vw] text-charcoal-600"
            style={textColor ? { color: textColor } : undefined}
          >
            Spatial cinematic choreography across India’s most iconic royal destination wedding venues.
          </p>
        </motion.div>

        {/* Cards Wave Stage */}
        <div className="absolute inset-0 z-10">
          {cards.map((card, i) => (
            <Card
              key={i}
              card={card}
              progress={progress}
              reduce={reduce}
              scaleMul={scaleMul}
              isSmall={isSmall}
              colX={colX}
              fixedCard={fixedCard}
              stackScale={stackScale}
              cardRadius={cardRadius}
              pointer={pointer}
              index={i}
              total={cards.length}
              isSpreadActive={spread}
            />
          ))}
        </div>

        {/* Scroll Instruction Hint */}
        {showScrollHint && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-[4vh] z-20 flex flex-col items-center gap-[0.8vh] text-[0.75vw] font-medium uppercase tracking-[0.25em] max-md:bottom-6 max-md:gap-1 max-md:text-[2.6vw] text-gold-dark font-manrope"
            style={{
              opacity: hintOpacity,
              ...(textColor ? { color: textColor } : {}),
            }}
          >
            <span className="opacity-80">Scroll to Explore Royal Scenography</span>
            <div className="w-[1px] h-6 bg-gold/40 relative overflow-hidden">
              <motion.div 
                className="absolute inset-x-0 top-0 bg-gold h-full"
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export interface HarmonicWaveProps {
  scrollLength?: number;
  bgColor?: string;
  stackScale?: number;
  cardRadius?: number;
  textColor?: string;
  textFadeStart?: number;
  showScrollHint?: boolean;
}

export default function HarmonicWave({
  scrollLength = 380,
  bgColor,
  stackScale = 0.72,
  cardRadius = 14,
  textColor,
  textFadeStart = 0.28,
  showScrollHint = true,
}: HarmonicWaveProps = {}) {
  return (
    <StackSpreadStage
      cards={CARDS}
      scrollLength={scrollLength}
      bgColor={bgColor}
      stackScale={stackScale}
      cardRadius={cardRadius}
      textColor={textColor}
      textFadeStart={textFadeStart}
      showScrollHint={showScrollHint}
    />
  );
}
