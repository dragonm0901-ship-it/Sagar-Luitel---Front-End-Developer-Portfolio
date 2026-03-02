import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';

const caseStudies = {
    'NEON': {
        title: 'NEON',
        subtitle: 'Cyberpunk E-Commerce Experience',
        tags: ['React', 'WebGL', 'Three.js', 'Stripe'],
        overview: 'A fully immersive e-commerce platform inspired by cyberpunk aesthetics, featuring real-time 3D product customization, dynamic lighting, and a seamless checkout flow.',
        problem: 'Traditional e-commerce sites feel flat and uninspired. Customers can\'t truly visualize products before purchasing, leading to high return rates and low engagement.',
        solution: 'Built an interactive 3D product viewer using Three.js and React Three Fiber. Users can rotate, zoom, and customize product colors and materials in real-time. The entire UI uses glassmorphism with neon accents.',
        results: [
            '40% increase in average session duration',
            '25% reduction in product return rates',
            'Featured on Awwwards Honorable Mention',
        ],
        liveUrl: '#',
        githubUrl: 'https://github.com/sagarluitel',
    },
    'VELOCITY': {
        title: 'VELOCITY',
        subtitle: 'Automotive Showcase Platform',
        tags: ['Next.js', 'GSAP', 'Prismic CMS', 'Vercel'],
        overview: 'A high-performance automotive showcase website with scroll-driven animations, a real-time car configurator, and buttery smooth 60fps transitions.',
        problem: 'The client\'s existing car showcase website was slow, static, and failed to convey the premium feel of their brand. Mobile experience was particularly poor.',
        solution: 'Rebuilt from scratch with Next.js for SSR performance, GSAP ScrollTrigger for cinematic scroll animations, and a custom car configurator that lets users explore color and trim options.',
        results: [
            '95+ Lighthouse performance score',
            '3x improvement in mobile load times',
            '60% increase in dealer inquiry submissions',
        ],
        liveUrl: '#',
        githubUrl: 'https://github.com/sagarluitel',
    },
    'AETHER': {
        title: 'AETHER',
        subtitle: 'Generative Art Installation',
        tags: ['Three.js', 'Web Audio API', 'GLSL Shaders', 'Physics'],
        overview: 'An interactive generative art experience that creates unique visual compositions through complex particle systems, audio reactivity, and user interaction.',
        problem: 'Digital art installations typically require expensive hardware and specialized software, making them inaccessible to most galleries and audiences.',
        solution: 'Created a browser-based installation using WebGL shaders and the Web Audio API. The visuals react to ambient sound and user input, creating one-of-a-kind compositions that can run on any modern device.',
        results: [
            'Exhibited at 2 digital art shows',
            'Over 5,000 unique compositions generated',
            'Open-sourced with 200+ GitHub stars',
        ],
        liveUrl: '#',
        githubUrl: 'https://github.com/sagarluitel',
    },
};

const CaseStudyModal = ({ projectTitle, isOpen, onClose, themeColor }) => {
    const overlayRef = useRef(null);
    const study = caseStudies[projectTitle];

    // Lock body scroll AND Lenis when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isOpen]);

    if (!study) return null;

    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) onClose();
    };

    const stopScrollLeak = (e) => {
        e.stopPropagation();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={overlayRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={handleOverlayClick}
                    className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-8"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}
                    onWheel={stopScrollLeak}
                    onTouchMove={stopScrollLeak}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-3xl h-[100dvh] md:h-auto md:max-h-[85vh] overflow-y-auto md:rounded-2xl border-0 md:border md:border-white/10 bg-zinc-950"
                        style={{ overscrollBehavior: 'contain' }}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors interactive-hover"
                        >
                            <X size={18} />
                        </button>

                        {/* Header */}
                        <div className="p-8 md:p-12 pb-0">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {study.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full border text-gray-400"
                                        style={{ borderColor: `${themeColor}40` }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-2">
                                {study.title}
                            </h2>
                            <p className="text-lg text-gray-400 font-light">{study.subtitle}</p>
                        </div>

                        {/* Content */}
                        <div className="p-8 md:p-12 space-y-8">
                            {/* Overview */}
                            <div>
                                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.3em] mb-3" style={{ color: themeColor }}>
                                    Overview
                                </h3>
                                <p className="text-gray-300 leading-relaxed">{study.overview}</p>
                            </div>

                            {/* The Problem */}
                            <div>
                                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-red-400 mb-3">
                                    The Problem
                                </h3>
                                <p className="text-gray-400 leading-relaxed">{study.problem}</p>
                            </div>

                            {/* The Solution */}
                            <div>
                                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.3em] mb-3" style={{ color: themeColor }}>
                                    The Solution
                                </h3>
                                <p className="text-gray-300 leading-relaxed">{study.solution}</p>
                            </div>

                            {/* Results */}
                            <div>
                                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.3em] mb-4" style={{ color: themeColor }}>
                                    Results
                                </h3>
                                <div className="space-y-3">
                                    {study.results.map((result, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <span
                                                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                                style={{ backgroundColor: themeColor }}
                                            />
                                            <p className="text-gray-300">{result}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Links */}
                            <div className="flex gap-3 pt-4 border-t border-white/10">
                                <a
                                    href={study.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-wider text-black rounded-sm interactive-hover"
                                    style={{ backgroundColor: themeColor }}
                                >
                                    <ExternalLink size={14} /> Live Demo
                                </a>
                                <a
                                    href={study.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-wider text-white rounded-sm border border-white/20 hover:bg-white/5 transition-colors interactive-hover"
                                >
                                    <Github size={14} /> Source Code
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export { caseStudies };
export default CaseStudyModal;
