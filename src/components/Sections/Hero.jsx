import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, ArrowUpRight, Download, BookOpen } from 'lucide-react';
// Importing a quick custom SVG icon for TikTok since Lucide doesn't have it natively in older versions
const TikTokIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);
import ConstellationCanvas from '../Effects/ConstellationCanvas';
import MorphingText from '../Effects/MorphingText';
import MonochromeBloomPortrait from '../Effects/MonochromeBloomPortrait';
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


// ── Magnetic Interactions ──────────────────────────────────────────────────────────────
const MagneticCTA = ({ href, target, rel, download, icon: Icon, children, themeColor, primary, onClick }) => {
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
        <motion.a 
            ref={ref} 
            href={href} 
            target={target} 
            rel={rel} 
            download={download}
            onClick={onClick}
            onPointerMove={onMove} 
            onPointerLeave={onLeave} 
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
            className={`group flex items-center gap-3 px-8 py-4 rounded-full font-mono text-sm uppercase tracking-widest font-bold backdrop-blur-md transition-all duration-300 border ${primary ? 'text-black bg-[var(--theme-color)] hover:bg-[var(--theme-color-hover)] border-transparent' : 'text-white bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/30'}`}
            style={{ x, y, '--theme-color': themeColor, '--theme-color-hover': themeColor + 'dd' }}
        >
            <span className="font-bold relative z-10 select-none pointer-events-none tracking-widest">{children}</span>
            {Icon && (
                <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300
                    ${primary ? 'bg-black text-[var(--theme-color)]' : 'bg-white/10 text-white'}
                    group-hover:scale-110 group-hover:rotate-12
                `}>
                    <Icon size={16} strokeWidth={2.5} />
                </div>
            )}
        </motion.a>
    );
};

const MagneticSocial = ({ href, icon: Icon, themeColor }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const isTouch = isTouchDevice();

    const onMove = useCallback((e) => {
        if (isTouch || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width  / 2)) * 0.4);
        y.set((e.clientY - (r.top  + r.height / 2)) * 0.4);
    }, [isTouch, x, y]);

    const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

    return (
        <motion.a 
            ref={ref} 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ x, y }}
            onMouseMove={onMove} 
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-white transition-all duration-300"
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = themeColor;
                e.currentTarget.style.color = themeColor;
            }}
            onMouseLeave={(e) => {
                onLeave();
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.color = 'white';
            }}
        >
            <Icon size={18} />
        </motion.a>
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
    const { themeColor, isEntered } = useTheme();
    const navigate = useNavigate();

    return (
        <section
            className="relative w-full min-h-[100svh] flex items-center justify-center bg-black overflow-hidden"
        >
            {/* ── Full-width Constellation Background ── */}
            <ConstellationCanvas themeColor={themeColor} />


            {/* ── Content overlay ── */}
            <motion.div
                className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-0 flex flex-col items-center text-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isEntered ? 1 : 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >

                {/* ── Portrait + Name block ── */}
                <div className="flex flex-col items-center gap-2 mb-2">
                    {/* Portrait bloom interactable */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        className="mb-[-2rem] z-20 pointer-events-auto"
                    >
                        <MonochromeBloomPortrait 
                            imageUrl="/sagar-portrait-transparent.png" 
                            themeColor={themeColor} 
                        />
                    </motion.div>

                    {/* SAGAR LUITEL text */}
                    <div className="flex flex-col items-center pointer-events-auto" style={{ perspective: '600px' }}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            style={{ height: 'clamp(60px, 12vw, 120px)' }}
                        >
                            <MorphingText
                                text="SAGAR"
                                color="#ffffff"
                                size={100}
                                font="Arial, Helvetica, sans-serif"
                                weight="900"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            style={{ height: 'clamp(60px, 12vw, 120px)' }}
                            className="-mt-2 sm:-mt-6"
                        >
                            <MorphingText
                                text="LUITEL"
                                color={themeColor}
                                size={100}
                                font="Arial, Helvetica, sans-serif"
                                weight="900"
                            />
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10"
                >
                    <RoleCycler themeColor={themeColor} />
                </motion.div>

                {/* ── CTAs ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center pointer-events-auto"
                >
                    <div className="flex flex-col sm:flex-row gap-4">
                        <MagneticCTA href="#work" icon={ArrowUpRight} themeColor={themeColor} primary>
                            View Projects
                        </MagneticCTA>
                        
                        <MagneticCTA href="/courses" icon={BookOpen} themeColor={themeColor} primary={false} onClick={(e) => {
                            e.preventDefault();
                            navigate('/courses');
                        }}>
                            View Courses
                        </MagneticCTA>
                    </div>

                    <div className="flex gap-4 z-50">
                        <MagneticSocial href="https://github.com/dragonm0901-ship-it" icon={Github} themeColor={themeColor} />
                        <MagneticSocial href="https://www.linkedin.com/in/sagar-luitel-4a510730a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" icon={Linkedin} themeColor={themeColor} />
                        <MagneticSocial href="https://www.tiktok.com/@sagar.luitel.tech?_r=1&_t=ZS-94UJDvX6T0D" icon={TikTokIcon} themeColor={themeColor} />
                        <MagneticSocial href="/resume.pdf" download icon={Download} themeColor={themeColor} />
                    </div>
                </motion.div>

                {/* Scope Scroll Indicator into normal flow entirely below the CTAs */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="mt-16 sm:mt-24 flex flex-col items-center gap-3 pointer-events-none w-full"
                >
                    <span 
                        className="text-[9px] font-mono text-gray-400 tracking-[0.4em] uppercase opacity-60 ml-[0.4em]"
                    >
                        Scroll
                    </span>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-white/20 to-transparent overflow-hidden relative">
                        <motion.div
                            className="absolute top-0 left-0 w-full h-[50%]"
                            style={{ 
                                background: `linear-gradient(to bottom, transparent, ${themeColor}, transparent)` 
                            }}
                            animate={{ y: ['-100%', '200%'] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                        />
                    </div>
                </motion.div>

            </motion.div>
        </section>
    );
};

export default Hero;
