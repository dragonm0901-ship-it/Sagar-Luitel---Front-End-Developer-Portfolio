/* eslint-disable react-refresh/only-export-components */
import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';

const caseStudies = {
    'myRestro Manager': {
        title: 'myRestro Manager',
        subtitle: 'Modern Restaurant & Business SaaS',
        tags: ['React', 'Tailwind CSS', 'Supabase', 'Node.js'],
        overview: 'A comprehensive, modern Software-as-a-Service (SaaS) platform built originally to streamline restaurant management. It features robust tools for handling daily operations, staff, and orders.',
        problem: 'Many restaurants and growing businesses struggle with scattered, outdated management tools that fail to communicate with each other, leading to operational inefficiencies.',
        solution: 'Developed a unified, highly-scalable dashboard that centralizes operations. While designed for restaurants, the architecture is entirely flexible and can be adapted to manage any kind of business or organizational structure.',
        results: [
            'Fully scalable architectural design',
            'Real-time data synchronization via Supabase',
            'Sleek, zero-friction modern interface'
        ],
        liveUrl: 'https://myrestromanager.vercel.app/',
        githubUrl: 'https://github.com/dragonm0901-ship-it/my-RestroManager',
    },
    'Project Peak': {
        title: 'Project Peak',
        subtitle: 'Premium Travel & Booking Platform',
        tags: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
        overview: 'A premium, modern travel agency website designed to capture the breathtaking essence of exploration while providing a buttery-smooth browsing experience.',
        problem: 'Travel agencies often rely on cluttered, template-based websites that fail to evoke the emotion and premium feel of the destinations they are selling.',
        solution: 'Engineered a highly visual, animated experience using Next.js and modern animation libraries. The codebase is highly modular, meaning it can be easily refactored and scaled for any kind of bespoke business.',
        results: [
            'Immersive, responsive layout and animations',
            'Blazing fast Next.js SSR performance',
            'Easily adaptable for other business niches'
        ],
        liveUrl: 'https://projectpeak.vercel.app/',
        githubUrl: 'https://github.com/dragonm0901-ship-it/Project-Peak',
    },
    'Nivati': {
        title: 'Nivati',
        subtitle: 'Boutique Business Storefront',
        tags: ['React', 'Tailwind CSS', 'Vite', 'Stripe'],
        overview: 'A beautifully crafted e-commerce frontend engineered specifically for small businesses. It offers a premium digital presence at a reasonable, market-challenging price point and delivery timeline.',
        problem: 'Small businesses often have to choose between cheap, generic website builders or prohibitively expensive custom sites, leaving a gap for affordable bespoke development.',
        solution: 'Created a streamlined, highly optimized React template that delivers top-tier aesthetics and performance. The system is incredibly flexible and can be instantly refactored to suit any business model.',
        results: [
            'Rapid development and deployment timeline',
            'Market-challenging cost efficiency',
            'Fully responsive boutique aesthetic'
        ],
        liveUrl: 'https://nivati.vercel.app/',
        githubUrl: 'https://github.com/dragonm0901-ship-it/Nivati---The-Flame-Craft',
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
