import React, { useRef, useState, useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

import Header from './Header';
import Footer from './Footer';
import Hero from '../Sections/Hero';
import About from '../Sections/About';
import EntranceOverlay from '../Overlay/EntranceOverlay';

gsap.registerPlugin(ScrollTrigger);

// ── Cinematic iris-close transition overlay ───────────────────────────────────
// Fires once when isEntered transitions false → true.
// A filled circle (theme color) shrinks from full-screen to nothing,
// revealing the hero like a camera iris pulling open.
const CinematicTransition = ({ color }) => (
    <motion.div
        className="fixed inset-0 pointer-events-none z-[45]"
        initial={{ clipPath: 'circle(120% at 50% 50%)', opacity: 1 }}
        animate={{ clipPath: 'circle(0% at 50% 50%)',   opacity: 0.85 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
        style={{
            background: `radial-gradient(circle, ${color}ee 0%, ${color}aa 35%, #08080a 100%)`,
        }}
    />
);

// Stop/start Lenis scroll based on overlay state
const LenisController = ({ isEntered }) => {
    const lenis = useLenis();
    useEffect(() => {
        if (!lenis) return;
        if (!isEntered) {
            lenis.stop();
        } else {
            lenis.start();
        }
    }, [lenis, isEntered]);
    return null;
};

const MainLayout = () => {
    const { isEntered, themeColor } = useTheme();
    const container    = useRef();
    const horizontalSection = useRef();

    // Track first-ever entry to trigger cinematic effect exactly once
    const [showCinematic, setShowCinematic] = useState(false);
    const hasEnteredRef = useRef(false);

    useEffect(() => {
        if (isEntered && !hasEnteredRef.current) {
            hasEnteredRef.current = true;
            setShowCinematic(true);
            const t = setTimeout(() => setShowCinematic(false), 1100);
            return () => clearTimeout(t);
        }
    }, [isEntered]);

    useGSAP(() => {
        const slides = gsap.utils.toArray('.horizontal-slide');
        if (slides.length === 0) return;

        let mm = gsap.matchMedia();
        mm.add('(min-width: 768px)', () => {
            gsap.to(slides, {
                xPercent: -100 * (slides.length - 1),
                ease: 'none',
                scrollTrigger: {
                    trigger: horizontalSection.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (slides.length - 1),
                    end: () => '+=' + horizontalSection.current.offsetWidth,
                },
            });
        });
    }, { scope: container });

    return (
        <ReactLenis root>
            {/* Scroll gating — stops Lenis while entry overlay is active */}
            <LenisController isEntered={isEntered} />

            <div
                ref={container}
                className="relative w-full min-h-screen text-white selection:bg-white selection:text-black"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
                {/* Entry overlay */}
                <EntranceOverlay />


                {/* ── Cinematic iris-close transition ── */}
                <AnimatePresence>
                    {showCinematic && <CinematicTransition key="cinematic" color={themeColor} />}
                </AnimatePresence>

                {/* Navbar */}
                {isEntered && <Header />}

                <main className="w-full relative z-0 pb-20 sm:pb-0">
                    <Hero />

                    {/* Work section */}
                    <section
                        id="work"
                        ref={horizontalSection}
                        className="relative z-10 bg-transparent flex flex-col md:flex-row md:w-[400vw] md:h-screen w-full min-h-screen"
                    >
                        {/* Intro slide */}
                        <div className="horizontal-slide w-full h-[50vh] md:w-screen md:h-full flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5 glass">
                            <h2 className="text-[15vw] md:text-[12vw] font-black text-transparent stroke-text hover:text-lime transition-all duration-700 select-none">
                                WORK
                            </h2>
                            <div className="flex gap-4 mt-4 md:mt-8">
                                <span className="w-2 h-2 md:w-3 md:h-3 bg-lime rounded-full animate-pulse" />
                                <p className="text-sm md:text-xl uppercase tracking-[0.3em] md:tracking-[0.5em] opacity-60">
                                    Selected Projects
                                </p>
                            </div>
                        </div>

                        {/* Project A — NEON */}
                        <div className="horizontal-slide w-full min-h-[60vh] md:w-screen md:h-full flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5 glass relative group p-6 md:p-0">
                            <div className="w-full md:w-[70%] h-full md:h-[60%] bg-zinc-900 border border-white/10 p-6 md:p-10 flex flex-col justify-between hover:border-lime/50 transition-colors duration-500 rounded-2xl md:rounded-none">
                                <div className="flex justify-between items-start mb-10 md:mb-0">
                                    <span className="text-6xl md:text-9xl font-black text-white/5 group-hover:text-lime/10 transition-colors">01</span>
                                    <div className="flex gap-2 flex-wrap justify-end">
                                        <span className="px-3 py-1 border border-white/20 rounded-full text-[10px] md:text-xs uppercase">React</span>
                                        <span className="px-3 py-1 border border-white/20 rounded-full text-[10px] md:text-xs uppercase">WebGL</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-5xl md:text-8xl font-black group-hover:text-lime transition-colors duration-300">NEON</h3>
                                    <p className="text-lg md:text-2xl mt-4 text-gray-400 max-w-xl group-hover:text-white transition-colors">
                                        A cyberpunk inspired e-commerce experience featuring real-time 3D product customization.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Project B — VELOCITY */}
                        <div className="horizontal-slide w-full min-h-[60vh] md:w-screen md:h-full flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5 glass group p-6 md:p-0">
                            <div className="w-full md:w-[70%] h-full md:h-[60%] bg-zinc-900 border border-white/10 p-6 md:p-10 flex flex-col justify-between hover:border-lime/50 transition-colors duration-500 rounded-2xl md:rounded-none">
                                <div className="flex justify-between items-start mb-10 md:mb-0">
                                    <span className="text-6xl md:text-9xl font-black text-white/5 group-hover:text-lime/10 transition-colors">02</span>
                                    <div className="flex gap-2 flex-wrap justify-end">
                                        <span className="px-3 py-1 border border-white/20 rounded-full text-[10px] md:text-xs uppercase">Next.js</span>
                                        <span className="px-3 py-1 border border-white/20 rounded-full text-[10px] md:text-xs uppercase">GSAP</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-5xl md:text-8xl font-black group-hover:text-lime transition-colors duration-300">VELOCITY</h3>
                                    <p className="text-lg md:text-2xl mt-4 text-gray-400 max-w-xl group-hover:text-white transition-colors">
                                        High-performance automotive showcase with scroll-driven car configurator.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Project C — AETHER */}
                        <div className="horizontal-slide w-full min-h-[60vh] md:w-screen md:h-full flex items-center justify-center glass group p-6 md:p-0">
                            <div className="w-full md:w-[70%] h-full md:h-[60%] bg-zinc-900 border border-white/10 p-6 md:p-10 flex flex-col justify-between hover:border-lime/50 transition-colors duration-500 rounded-2xl md:rounded-none">
                                <div className="flex justify-between items-start mb-10 md:mb-0">
                                    <span className="text-6xl md:text-9xl font-black text-white/5 group-hover:text-lime/10 transition-colors">03</span>
                                    <div className="flex gap-2 flex-wrap justify-end">
                                        <span className="px-3 py-1 border border-white/20 rounded-full text-[10px] md:text-xs uppercase">Three.js</span>
                                        <span className="px-3 py-1 border border-white/20 rounded-full text-[10px] md:text-xs uppercase">Physics</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-5xl md:text-8xl font-black group-hover:text-lime transition-colors duration-300">AETHER</h3>
                                    <p className="text-lg md:text-2xl mt-4 text-gray-400 max-w-xl group-hover:text-white transition-colors">
                                        Interactive generative art installation utilizing complex particle systems and audio reactivity.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <About />

                    <section id="contact" className="min-h-[50vh] flex flex-col items-center justify-center bg-lime text-black relative z-10 py-16 md:py-20">
                        <h2 className="text-5xl md:text-[8rem] font-black mb-6 md:mb-8 tracking-tighter text-center leading-none">
                            START A<br />PROJECT
                        </h2>
                        <a
                            href="mailto:sagar.luitel.0909@gmail.com"
                            className="text-xl md:text-4xl font-black border-b-2 md:border-b-4 border-black hover:text-white hover:border-white transition-all"
                        >
                            sagar.luitel.0909@gmail.com
                        </a>
                        <div className="flex gap-6 md:gap-8 mt-10 md:mt-12">
                            {[
                                { name: 'Twitter',   href: 'https://x.com/sagarluitel' },
                                { name: 'LinkedIn',  href: 'https://linkedin.com/in/sagarluitel' },
                                { name: 'GitHub',    href: 'https://github.com/sagarluitel' },
                            ].map(s => (
                                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm md:text-lg font-bold uppercase tracking-wider hover:opacity-50 transition-opacity">
                                    {s.name}
                                </a>
                            ))}
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </ReactLenis>
    );
};

export default MainLayout;
