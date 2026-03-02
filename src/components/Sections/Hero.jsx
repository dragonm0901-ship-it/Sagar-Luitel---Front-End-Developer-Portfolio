import React, { Suspense, useState, useEffect, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { ChevronDown, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import InteractiveHeroScene from '../Three/InteractiveHeroScene';
import HeroControls from '../Three/HeroControls';
import ErrorBoundary from '../ErrorBoundary';
import { useTheme } from '../../context/ThemeContext';

const ROLES = [
    'Frontend Developer',
    'Creative Coder',
    'UI / UX Architect',
    'WebGL Artist',
    '3D Experience Builder',
];

const isTouchDevice = () =>
    typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

// ── Flipping Coin ─────────────────────────────────────────────────────────────
const CoinFlip = ({ themeColor }) => {
    const [flipped, setFlipped] = useState(false);
    const [hinted, setHinted] = useState(false);

    return (
        <div
            className="relative cursor-pointer flex-shrink-0"
            style={{ width: '130px', height: '130px', perspective: '900px' }}
            onClick={() => { setFlipped(f => !f); setHinted(true); }}
        >
            {/* Pulse hint ring */}
            {!hinted && (
                <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0, 0.45] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                    style={{ border: `2px solid ${themeColor}88` }}
                />
            )}

            {/* Coin — rotates Y */}
            <motion.div
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.72, ease: [0.4, 0, 0.2, 1] }}
                style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d', position: 'relative' }}
            >
                {/* Front: Photo */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                    borderRadius: '50%', overflow: 'hidden',
                    boxShadow: `0 0 0 2.5px ${themeColor}70, 0 0 28px ${themeColor}33, 0 8px 32px rgba(0,0,0,0.6)`,
                }}>
                    {/* 
                        objectPosition: center 15% — shows the face centered
                        The portrait has forehead top cropped slightly to center the face
                    */}
                    <img
                        src="/sagar-portrait-new.jpg"
                        alt="Sagar Luitel"
                        style={{
                            width: '100%', height: '100%',
                            objectFit: 'cover',
                            // Adjusting focus to keep jaw to forehead centered
                            objectPosition: 'calc(50% + 5px) 45%',
                            display: 'block',
                            transform: 'scale(1.18)', // zoom in slightly to emphasize the face
                        }}
                        draggable={false}
                    />
                    {/* Inner vignette for natural circular look */}
                    <div style={{
                        position: 'absolute', inset: 0, borderRadius: '50%',
                        background: 'radial-gradient(circle at 50% 50%, transparent 55%, rgba(0,0,0,0.38) 100%)',
                        pointerEvents: 'none',
                    }} />
                </div>

                {/* Back: </> */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    borderRadius: '50%', overflow: 'hidden',
                    background: '#090910',
                    boxShadow: `0 0 0 2.5px ${themeColor}80, 0 0 32px ${themeColor}44, 0 8px 32px rgba(0,0,0,0.6)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <div style={{
                        position: 'absolute', inset: 0, borderRadius: '50%',
                        background: `radial-gradient(circle at 50% 50%, ${themeColor}18 0%, transparent 65%)`,
                    }} />
                    <span
                        className="relative font-black font-mono select-none"
                        style={{
                            fontSize: '2.1rem', color: themeColor, letterSpacing: '-0.05em',
                            textShadow: `0 0 22px ${themeColor}99`, lineHeight: 1,
                        }}
                    >{'</>'}</span>
                </div>
            </motion.div>
        </div>
    );
};

// ── Magnetic CTA ──────────────────────────────────────────────────────────────
const MagneticButton = ({ children, className, style }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const isTouch = isTouchDevice();
    const onMove = useCallback((e) => {
        if (isTouch || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width  / 2)) * 0.28);
        y.set((e.clientY - (r.top  + r.height / 2)) * 0.28);
    }, [isTouch, x, y]);
    const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);
    return (
        <motion.button ref={ref} style={{ x, y, ...style }}
            onMouseMove={onMove} onMouseLeave={onLeave} whileTap={{ scale: 0.96 }}
            className={className}
        >{children}</motion.button>
    );
};

// ── Role cycler ───────────────────────────────────────────────────────────────
const RoleCycler = ({ themeColor }) => {
    const [idx, setIdx] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setIdx(i => (i + 1) % ROLES.length), 2800);
        return () => clearInterval(t);
    }, []);
    return (
        <div className="relative h-[1.4em] overflow-hidden w-full" aria-live="polite">
            <AnimatePresence mode="wait">
                <motion.span key={idx}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-110%', opacity: 0 }}
                    transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute left-0 right-0 font-semibold block"
                    style={{ color: themeColor }}
                >{ROLES[idx]}</motion.span>
            </AnimatePresence>
        </div>
    );
};

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => {
    const { themeColor } = useTheme();
    const [config, setConfig] = useState({ color: themeColor || '#ccff00', speed: 2, distort: 0.5 });
    const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : true);

    useEffect(() => {
        setConfig(p => ({ ...p, color: themeColor }));
        
        const handleResize = () => setIsDesktop(window.innerWidth >= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [themeColor]);

    // Build char arrays for SAGAR + LUITEL with shared stagger index
    const LINES = ['SAGAR', 'LUITEL'];
    let ci = 0;
    const lineChars = LINES.map(word => word.split('').map(char => ({ char, idx: ci++ })));

    const charVariants = {
        hidden: { y: 90, opacity: 0, skewY: 10 },
        visible: (i) => ({
            y: 0, opacity: 1, skewY: 0,
            transition: { type: 'spring', stiffness: 200, damping: 20, delay: 0.05 * i },
        }),
    };

    const fallback = (
        <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
            <p className="text-white/30 font-mono text-sm">3D Loading…</p>
        </div>
    );

    return (
        <section
            className="relative w-full flex flex-col md:flex-row bg-black overflow-hidden"
            // On desktop exactly 100svh to eliminate empty space. On mobile, minHeight allows content to breathe if screen is short.
            style={{ 
                minHeight: '100svh', 
                height: isDesktop ? '100svh' : 'auto' 
            }}
        >
            {/* ── 3D Canvas — mobile: 40svh to 50svh, desktop: fills 100% ── */}
            <div
                className="relative w-full md:w-[48%] flex flex-col items-center order-1 flex-shrink-0 overflow-hidden min-h-[55svh] md:h-full pb-8 md:pb-0 pt-8 md:pt-0"
            >
                {/* Canvas wrapper fills parent absolutely on desktop, relatively on mobile */}
                <div className="relative md:absolute inset-0 w-full h-[40svh] md:h-full cursor-grab active:cursor-grabbing">
                    <ErrorBoundary fallback={fallback}>
                        <Canvas camera={{ position: [0, 0, 5], fov: 40 }} dpr={[1, isTouchDevice() ? 1.5 : 2]}>
                            <Suspense fallback={null}>
                                <InteractiveHeroScene config={config} setConfig={setConfig} isDesktop={isDesktop} />
                                <OrbitControls enableZoom={false} enablePan={false} />
                            </Suspense>
                        </Canvas>
                    </ErrorBoundary>
                </div>

                {/* Brain Controls — below canvas on mobile, absolute bottom-left on desktop */}
                <div className="relative mt-2 mx-auto md:absolute md:bottom-6 md:left-4 z-20 w-[92%] max-w-[300px] md:w-auto">
                    <HeroControls config={config} setConfig={setConfig} />
                </div>
            </div>

            {/* ── Text section — 38% on desktop, flows naturally on mobile ── */}
            <div
                className="relative w-full md:w-[52%] flex flex-col justify-center items-center md:items-start order-2 z-10 bg-black md:bg-transparent md:overflow-y-auto"
                style={{ 
                    padding: isDesktop 
                        ? 'clamp(1.8rem, 4vw, 3.5rem) clamp(1.5rem, 3.5vw, 3.5rem)' 
                        : '3rem 1.5rem 6rem 1.5rem', 
                    minHeight: 'auto' 
                }}
            >

                {/* ── Coin + Name block ── */}
                <div className="flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-5 mb-6 md:mb-4 w-full pt-8 md:pt-0">
                    {/* Coin */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 240, damping: 22, delay: 0.2 }}
                    >
                        <CoinFlip themeColor={themeColor} />
                    </motion.div>

                    {/* SAGAR / LUITEL — two lines, perfectly beside coin on desktop */}
                    <div className="flex flex-col items-center md:items-start" style={{ perspective: '600px' }}>
                        {lineChars.map((chars, lineIdx) => (
                            <div key={lineIdx} className="flex overflow-hidden">
                                {chars.map(({ char, idx }) => (
                                    <motion.span
                                        key={idx}
                                        custom={idx}
                                        variants={charVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="inline-block font-black tracking-tighter leading-[0.88]"
                                        style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)' }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Social */}
                <motion.div
                    initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="flex gap-5 mb-4"
                >
                    {[
                        { icon: Github,       href: 'https://github.com/sagarluitel',     label: 'GitHub'   },
                        { icon: Linkedin,     href: 'https://linkedin.com/in/sagarluitel', label: 'LinkedIn' },
                        { icon: ArrowUpRight, href: '#work',                               label: 'Work'     },
                    ].map(({ icon: Icon, href, label }) => (
                        <a key={label} href={href}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-[11px] font-mono text-gray-600 hover:text-gray-200 transition-colors"
                            style={{ touchAction: 'manipulation' }}
                        >
                            <Icon size={13} />
                            <span className="hidden sm:inline">{label}</span>
                        </a>
                    ))}
                </motion.div>

                {/* Accent bar */}
                <motion.div
                    className="mb-4 self-center md:self-start"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '60px', opacity: 1 }}
                    transition={{ delay: 0.75, duration: 0.5 }}
                    style={{ height: '2.5px', background: `linear-gradient(90deg, ${themeColor}, ${themeColor}00)`, borderRadius: '999px' }}
                />

                {/* Role cycler */}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                    className="text-sm sm:text-base font-light text-gray-400 mb-1.5 text-center md:text-left w-full"
                    style={{ maxWidth: '340px' }}
                >
                    <RoleCycler themeColor={themeColor} />
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65 }}
                    className="text-sm text-gray-500 font-light mb-6 max-w-xs leading-relaxed text-center md:text-left"
                >
                    Creating{' '}<span className="text-white font-medium">living</span>{' '}
                    digital experiences at the intersection of{' '}
                    <span style={{ color: themeColor }} className="font-semibold">design {'&'} code</span>.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.85 }}
                    className="flex flex-row gap-3 w-full sm:w-auto"
                    style={{ maxWidth: '320px' }}
                >
                    <a href="#work">
                        <MagneticButton
                            className="flex-1 md:flex-none px-6 py-3.5 font-bold text-sm uppercase tracking-wider text-black"
                            style={{ backgroundColor: themeColor, touchAction: 'manipulation', minHeight: '48px' }}
                        >Explore Work</MagneticButton>
                    </a>
                    <a href="#contact">
                        <MagneticButton
                            className="flex-1 md:flex-none px-6 py-3.5 border font-bold text-sm uppercase tracking-wider text-white"
                            style={{ borderColor: `${themeColor}55`, touchAction: 'manipulation', minHeight: '48px' }}
                        >Contact Me</MagneticButton>
                    </a>
                </motion.div>
            </div>

            {/* Scroll indicator — desktop only */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
                className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1 pointer-events-none"
            >
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-gray-700">Scroll</span>
                <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
                    <ChevronDown size={14} style={{ color: themeColor + '88' }} />
                </motion.div>
            </motion.div>

            {/* Noise grain */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.02] z-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '160px 160px',
                }}
            />
        </section>
    );
};

export default Hero;
