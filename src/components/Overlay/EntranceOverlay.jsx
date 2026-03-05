import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const COLORS = [
    { name: 'Cyber Lime',   hex: '#ccff00', varName: 'cyberLime',   tokenType: 'const' },
    { name: 'Neon Blue',    hex: '#00ccff', varName: 'neonBlue',    tokenType: 'let'   },
    { name: 'Hot Pink',     hex: '#ff0055', varName: 'hotPink',     tokenType: 'const' },
    { name: 'Pure White',   hex: '#ffffff', varName: 'pureWhite',   tokenType: 'let'   },
    { name: 'Matrix Green', hex: '#00ff41', varName: 'matrixGreen', tokenType: 'const' },
];

const CodeCard = ({ color, isActive, onSelect }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            className="code-card relative cursor-pointer select-none"
            onClick={() => onSelect(color.hex)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            whileTap={{ scale: 0.93 }}
            style={{ willChange: 'transform' }}
        >
            {/* Outer glow */}
            <div
                className="absolute -inset-px rounded-xl pointer-events-none transition-opacity duration-300"
                style={{
                    opacity: isActive ? 0.9 : hovered ? 0.5 : 0,
                    boxShadow: `0 0 24px ${color.hex}55, 0 0 60px ${color.hex}22`,
                }}
            />

            {/* Card body */}
            <div
                className="relative rounded-xl overflow-hidden w-[155px] sm:w-[178px] transition-transform duration-200"
                style={{
                    transform: hovered ? 'scale(1.06) translateY(-5px)' : 'scale(1) translateY(0)',
                    background: isActive
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(12,12,18,0.97))'
                        : 'rgba(11,11,15,0.95)',
                    border: `1px solid ${isActive ? color.hex + '88' : hovered ? color.hex + '40' : 'rgba(255,255,255,0.07)'}`,
                    backdropFilter: 'blur(20px)',
                }}
            >
                {/* Mac titlebar */}
                <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-white/5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: isActive ? color.hex : '#28c840' }} />
                    <span className="ml-2 text-[9px] font-mono text-gray-600 truncate">colors.config.ts</span>
                </div>

                {/* Code body */}
                <div className="p-3.5 font-mono text-[10px] sm:text-[11px] leading-[1.75]">
                    <div>
                        <span className="text-[#c586c0]">{color.tokenType} </span>
                        <span className="text-[#9cdcfe]">{color.varName}</span>
                        <span className="text-gray-500"> = {'{'}</span>
                    </div>
                    <div className="pl-3">
                        <span className="text-[#9cdcfe]/70">value</span>
                        <span className="text-gray-500">: </span>
                        <span style={{ color: color.hex === '#ffffff' ? '#ccc' : color.hex }}>
                            &quot;{color.hex}&quot;
                        </span>
                        <span className="text-gray-600">,</span>
                    </div>
                    <div className="pl-3 flex items-center gap-1.5">
                        <span className="text-[#9cdcfe]/70">swatch</span>
                        <span className="text-gray-500">: </span>
                        <span
                            className="inline-block w-3.5 h-3.5 rounded-[3px] border border-white/10 flex-shrink-0"
                            style={{ background: color.hex }}
                        />
                    </div>
                    <div><span className="text-gray-500">{'}'}</span></div>
                </div>

                {/* Name / check */}
                <div className="px-3.5 pb-3 flex items-center justify-between">
                    <span
                        className="text-[9px] uppercase tracking-[0.15em] font-bold transition-colors duration-300"
                        style={{ color: isActive ? color.hex : '#444' }}
                    >
                        {color.name}
                    </span>
                    {isActive && (
                        <div
                            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: color.hex }}
                        >
                            <Check size={9} color="#000" strokeWidth={3} />
                        </div>
                    )}
                </div>

                {/* Active shimmer */}
                {isActive && (
                    <div
                        className="absolute inset-0 rounded-xl pointer-events-none animate-shimmer"
                        style={{ background: `linear-gradient(135deg, ${color.hex}09 0%, transparent 70%)` }}
                    />
                )}
            </div>
        </motion.div>
    );
};

const EntranceOverlay = () => {
    const { themeColor, setThemeColor, isEntered, enterSite } = useTheme();
    const wrapperRef = useRef(null);

    // ── Lock scroll on html element (most reliable) ─────────────────────────
    useEffect(() => {
        const html = document.documentElement;
        html.style.overflow   = 'hidden';
        html.style.touchAction = 'none';
        return () => {
            html.style.overflow    = '';
            html.style.touchAction = '';
        };
    }, []);

    useEffect(() => {
        if (isEntered) {
            document.documentElement.style.overflow    = '';
            document.documentElement.style.touchAction = '';
        }
    }, [isEntered]);

    // ── GSAP ENTRANCE TIMELINE ───────────────────────────────────────────────
    useGSAP(() => {
        if (isEntered) return;

        // Set initial hidden state instantly (no flash)
        gsap.set('.bracket-corner', { scale: 0, opacity: 0 });
        gsap.set('.boot-line',      { x: -18, opacity: 0 });
        gsap.set('.title-char',     { y: 85, opacity: 0, rotateX: -65 });
        gsap.set('.sub-char',       { y: 40, opacity: 0 });
        gsap.set('.select-hint',    { opacity: 0, y: 8 });
        gsap.set('.code-card',      { y: 75, opacity: 0, scale: 0.83 });
        gsap.set('.enter-btn',      { y: 22, opacity: 0 });
        gsap.set('.status-line',    { opacity: 0 });

        const tl = gsap.timeline({ delay: 0.05 });

        // Corners snap in
        tl.to('.bracket-corner', {
            scale: 1, opacity: 1, duration: 0.4,
            stagger: 0.06, ease: 'back.out(2)',
        });

        // Boot lines slide in
        tl.to('.boot-line', {
            x: 0, opacity: 1, duration: 0.45,
            stagger: 0.18, ease: 'power3.out',
        }, '-=0.15');

        // Title chars drop in with perspective
        tl.to('.title-char', {
            y: 0, opacity: 1, rotateX: 0,
            duration: 0.75, stagger: 0.045, ease: 'power4.out',
        }, '-=0.2');

        // Subtitle chars slide up
        tl.to('.sub-char', {
            y: 0, opacity: 1, duration: 0.55,
            stagger: 0.025, ease: 'power3.out',
        }, '-=0.55');

        // Hint label
        tl.to('.select-hint', {
            opacity: 1, y: 0, duration: 0.45, ease: 'power2.out',
        }, '-=0.3');

        // Cards stagger up with slight scale
        tl.to('.code-card', {
            y: 0, opacity: 1, scale: 1,
            duration: 0.8, stagger: { each: 0.1, from: 'start' },
            ease: 'power3.out',
        }, '-=0.4');

        // Enter button
        tl.to('.enter-btn', {
            y: 0, opacity: 1, duration: 0.55, ease: 'power3.out',
        }, '-=0.45');

        // Status line
        tl.to('.status-line', {
            opacity: 1, duration: 0.4, ease: 'power2.out',
        }, '-=0.3');

        // ── Floating idle (after entrance) ─────────────────────────────────
        tl.add(() => {
            gsap.utils.toArray('.code-card').forEach((card, i) => {
                gsap.to(card, {
                    y: -(6 + i * 2),
                    rotation: i % 2 === 0 ? 0.9 : -0.9,
                    duration: 3.4 + i * 0.45,
                    ease: 'sine.inOut',
                    repeat: -1,
                    yoyo: true,
                    delay: i * 0.38,
                });
            });
        });

    }, { scope: wrapperRef });

    const title1 = 'SYSTEM';
    const title2 = 'INITIALIZED';

    return (
        <>
            <AnimatePresence>
                {!isEntered && (
                    <motion.div
                        ref={wrapperRef}
                        initial={{ opacity: 1 }}
                        exit={{
                            opacity: 0, scale: 0.95, filter: 'blur(18px)',
                            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
                        }}
                        className="fixed inset-0 z-50 flex flex-col items-center overflow-y-auto overflow-x-hidden"
                        style={{ background: '#080809', minHeight: '100svh' }}
                    >
                        {/* Grid background */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                backgroundImage: `linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),
                                                  linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)`,
                                backgroundSize: '40px 40px',
                            }}
                        />

                        {/* Radial theme glow */}
                        <div
                            className="absolute inset-0 pointer-events-none transition-all duration-700"
                            style={{ background: `radial-gradient(ellipse 75% 55% at 50% 48%, ${themeColor}09 0%, transparent 70%)` }}
                        />

                        {/* Corner brackets */}
                        {[
                            'top-4 left-4 border-t border-l',
                            'top-4 right-4 border-t border-r',
                            'bottom-4 left-4 border-b border-l',
                            'bottom-4 right-4 border-b border-r',
                        ].map((cls, i) => (
                            <div
                                key={i}
                                className={`bracket-corner absolute ${cls} w-5 h-5 pointer-events-none`}
                                style={{ borderColor: `${themeColor}40` }}
                            />
                        ))}

                        {/* ── TOP: Title ── */}
                        <div className="relative z-10 w-full flex flex-col items-center pt-12 sm:pt-16 px-4 pointer-events-none select-none">
                            {/* Boot lines */}
                            <div className="flex flex-col items-center gap-0.5 mb-5">
                                {['portfolio.exe --mode=interactive', 'loading modules... [████████████] done'].map((t, i) => (
                                    <div key={i} className="boot-line flex items-center gap-2 font-mono text-[10px] sm:text-xs text-gray-600">
                                        <span style={{ color: themeColor + '88' }}>▶</span>
                                        <span>{t}</span>
                                    </div>
                                ))}
                            </div>

                            {/* SYSTEM */}
                            <div className="flex overflow-hidden" style={{ perspective: '600px' }}>
                                {title1.split('').map((char, i) => (
                                    <span
                                        key={i}
                                        className="title-char inline-block font-black tracking-tighter leading-[0.9]"
                                        style={{ fontSize: 'clamp(3rem, 12vw, 7.5rem)' }}
                                    >
                                        {char}
                                    </span>
                                ))}
                            </div>

                            {/* INITIALIZED */}
                            <div className="flex overflow-hidden mt-[-0.08em]" style={{ perspective: '600px' }}>
                                {title2.split('').map((char, i) => (
                                    <span
                                        key={i}
                                        className="sub-char inline-block font-black tracking-tighter leading-none text-transparent"
                                        style={{
                                            fontSize: 'clamp(1.6rem, 5.5vw, 4rem)',
                                            WebkitTextStroke: `1.5px ${themeColor}45`,
                                        }}
                                    >
                                        {char}
                                    </span>
                                ))}
                            </div>

                            <p className="select-hint text-[10px] sm:text-xs text-gray-600 font-mono tracking-[0.22em] uppercase mt-4">
                                ─── Select Interface Accent ───
                            </p>
                        </div>

                        {/* ── MIDDLE: Cards ── */}
                        <div className="relative z-10 w-full flex items-center justify-center px-4 py-8 sm:py-6 pb-20 sm:pb-24 min-h-[300px]">
                            {/* Flex layout enables a perfect 3-top, 2-bottom split when max-width forces wrapping, 
                                and degrades beautifully to 2-top, 2-middle, 1-bottom on narrow mobile screens */}
                            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full max-w-[560px] md:max-w-[700px]">
                                {COLORS.map((color) => (
                                    <div key={color.name} className="flex-shrink-0">
                                        <CodeCard
                                            color={color}
                                            isActive={themeColor === color.hex}
                                            onSelect={setThemeColor}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── BOTTOM: Enter + Status ── */}
                        <div className="relative z-10 w-full flex flex-col items-center justify-end gap-5 pb-8 sm:pb-12 px-4 mt-auto">
                            <motion.button
                                className="enter-btn group relative overflow-hidden font-black text-sm sm:text-base uppercase tracking-widest text-black"
                                onClick={enterSite}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    backgroundColor: themeColor,
                                    padding: '14px 44px',
                                    minWidth: '200px',
                                    touchAction: 'manipulation',
                                    transition: 'background-color 0.4s ease',
                                }}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Enter System
                                    <ArrowRight size={17} className="group-hover:translate-x-1.5 transition-transform duration-200" />
                                </span>
                                <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-400 ease-in-out" />
                            </motion.button>

                            <div className="status-line flex gap-6 sm:gap-10 text-[9px] sm:text-[10px] text-gray-700 font-mono">
                                <span>v2.0.26</span>
                                <span>STATUS: ONLINE</span>
                                <span style={{ color: themeColor + '99' }} className="animate-pulse">● CONNECTED</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default EntranceOverlay;
