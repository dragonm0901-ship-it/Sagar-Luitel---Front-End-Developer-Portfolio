import React, { useRef, useState, useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import WebGLGlitchTransition from '../Effects/WebGLGlitchTransition';

import Header from './Header';
import Footer from './Footer';
import Hero from '../Sections/Hero';
import About from '../Sections/About';
import Experience from '../Sections/Experience';
import Blog from '../Sections/Blog';
import Lab from '../Sections/Lab';
import EntranceOverlay from '../Overlay/EntranceOverlay';
import ProjectCard from '../Cards/ProjectCard';
import CustomCursor from '../Overlay/CustomCursor';
import CaseStudyModal from '../Cards/CaseStudyModal';

gsap.registerPlugin(ScrollTrigger);

// cinematic transition replaced with WebGLGlitchTransition

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

    // Case study modal state
    const [activeCaseStudy, setActiveCaseStudy] = useState(null);

    // Track first-ever entry to trigger cinematic effect exactly once
    const [showCinematic, setShowCinematic] = useState(false);
    const hasEnteredRef = useRef(false);

    useEffect(() => {
        if (isEntered && !hasEnteredRef.current) {
            hasEnteredRef.current = true;
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setShowCinematic(true);
            // The unmount of the Cinematic effect is now handled internally by Framer Motion on exit, 
            // but we use a timeout to remove it from the DOM.
            const t = setTimeout(() => setShowCinematic(false), 1500);
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
            {/* Custom Difference Cursor */}
            <CustomCursor />

            {/* Scroll gating — stops Lenis while entry overlay is active */}
            <LenisController isEntered={isEntered} />

            <div
                ref={container}
                className="relative w-full min-h-screen text-white selection:bg-white selection:text-black"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
                {/* Entry overlay */}
                <EntranceOverlay />

                {/* ── Cinematic WebGL Glitch transition ── */}
                <AnimatePresence>
                    {showCinematic && <WebGLGlitchTransition key="cinematic" color={themeColor} onComplete={() => setShowCinematic(false)} />}
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
                        <ProjectCard
                            index="01"
                            title="NEON"
                            description="A cyberpunk inspired e-commerce experience featuring real-time 3D product customization."
                            tags={['React', 'WebGL']}
                            themeColor={themeColor}
                            onViewCaseStudy={setActiveCaseStudy}
                        />

                        {/* Project B — VELOCITY */}
                        <ProjectCard
                            index="02"
                            title="VELOCITY"
                            description="High-performance automotive showcase with scroll-driven car configurator."
                            tags={['Next.js', 'GSAP']}
                            themeColor={themeColor}
                            onViewCaseStudy={setActiveCaseStudy}
                        />

                        {/* Project C — AETHER */}
                        <ProjectCard
                            index="03"
                            title="AETHER"
                            description="Interactive generative art installation utilizing complex particle systems and audio reactivity."
                            tags={['Three.js', 'Physics']}
                            themeColor={themeColor}
                            onViewCaseStudy={setActiveCaseStudy}
                        />
                    </section>

                    <About />

                    <Experience />

                    <Blog />

                    <Lab />

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

            {/* Case Study Modal */}
            <CaseStudyModal
                projectTitle={activeCaseStudy}
                isOpen={!!activeCaseStudy}
                onClose={() => setActiveCaseStudy(null)}
                themeColor={themeColor}
            />
        </ReactLenis>
    );
};

export default MainLayout;
