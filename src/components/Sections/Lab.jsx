import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { ExternalLink, Code2, Play, X, Code } from 'lucide-react';

import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; 

// Import Toys
import MagneticButtonToy, { magneticCodeSnippet } from '../LabToys/MagneticButtonToy';
import FloatingOrbsToy, { orbsCodeSnippet } from '../LabToys/FloatingOrbsToy';
import KineticTypographyToy, { kineticCodeSnippet } from '../LabToys/KineticTypographyToy';
import GameOfLifeToy, { gameOfLifeCodeSnippet } from '../LabToys/GameOfLifeToy';

const categories = ["All", "WebGL", "Animations", "UI Components"];

const experiments = [
    {
        id: 1,
        title: "Floating Gradient Orbs",
        description: "CSS and Framer Motion powered ambient gradient shapes that follow your cursor.",
        category: "UI Components",
        tags: ["CSS", "Framer Motion", "Minimal"],
        image: "url('/lab-particles.jpg') center/cover",
        hasDemo: true,
        DemoComponent: FloatingOrbsToy,
        codeSnippet: orbsCodeSnippet,
    },
    {
        id: 2,
        title: "Magnetic Button",
        description: "Physics-based magnetic button interaction using Framer Motion springs.",
        category: "UI Components",
        tags: ["Framer Motion", "React", "UX"],
        image: "url('/lab-magnetic.jpg') center/cover",
        hasDemo: true,
        DemoComponent: MagneticButtonToy,
        codeSnippet: magneticCodeSnippet,
    },
    {
        id: 3,
        title: "Kinetic Typography",
        description: "Interactive massive text rendering with physics-based spring constraints.",
        category: "Animations",
        tags: ["GSAP", "Canvas API"],
        image: "url('/lab-kinetic.jpg') center/cover",
        hasDemo: true,
        DemoComponent: KineticTypographyToy,
        codeSnippet: kineticCodeSnippet,
    },
    {
        id: 4,
        title: "Conway's Game of Life",
        description: "Interactive cellular automaton simulating reproduction and overpopulation.",
        category: "Animations",
        tags: ["Algorithm", "Canvas API", "Math"],
        image: "url('/lab-raymarching.jpg') center/cover",
        hasDemo: true,
        DemoComponent: GameOfLifeToy,
        codeSnippet: gameOfLifeCodeSnippet,
    }
];

const LabCard = ({ experiment, themeColor, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="group relative flex flex-col w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#0a0a0d] border border-white/5 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onClick(experiment)}
        >
            {/* Background Image/Gradient */}
            <div 
                className="absolute inset-0 w-full h-full opacity-40 group-hover:opacity-80 transition-opacity duration-700 blur-sm group-hover:blur-none group-hover:scale-105 transform-gpu"
                style={{ background: experiment.image }}
            />
            
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none mix-blend-overlay" />
            
            {/* Content Overlay */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl md:text-2xl font-bold font-mono text-white tracking-tight">
                            {experiment.title}
                        </h3>
                        <div 
                            className="p-3 rounded-full opacity-0 group-hover:opacity-100 transform -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500"
                            style={{ backgroundColor: themeColor, color: '#000' }}
                        >
                            {experiment.hasDemo ? <Play size={16} fill="#000" /> : <ExternalLink size={16} strokeWidth={2.5} />}
                        </div>
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed h-10">
                        {experiment.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                        {experiment.tags.map((tag, i) => (
                            <span 
                                key={i}
                                className="text-[10px] sm:text-xs font-mono px-2 py-1 rounded-full border border-white/10 text-gray-300 bg-white/5 backdrop-blur-md"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hover Glow Edge */}
            <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: `inset 0 0 0 1px ${themeColor}60` }}
            />
        </motion.div>
    );
};

const InteractiveModal = ({ experiment, onClose, themeColor }) => {
    const [viewMode, setViewMode] = useState('demo'); // 'demo' or 'code'

    // Syntax highlighting when switching to code view
    useEffect(() => {
        if (viewMode === 'code') {
            Prism.highlightAll();
        }
    }, [viewMode]);

    if (!experiment) return null;

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-md cursor-auto"
            onClick={onClose}
        >
            <motion.div 
                initial={{ y: 50, scale: 0.95 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 20, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl h-[80vh] bg-[#0a0a0e] rounded-2xl overflow-hidden border flex flex-col"
                style={{ borderColor: `${themeColor}40`, boxShadow: `0 20px 60px ${themeColor}15` }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/5 bg-black/40">
                    <div className="flex items-center gap-4">
                        <h3 className="font-mono text-lg text-white font-bold">{experiment.title}</h3>
                        
                        {/* Toggles */}
                        <div className="flex bg-white/5 p-1 rounded-lg">
                            <button 
                                className={`px-4 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-colors ${viewMode === 'demo' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                                onClick={() => setViewMode('demo')}
                            >
                                <Play size={12} className="inline mr-1 -mt-0.5" /> Demo
                            </button>
                            <button 
                                className={`px-4 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-colors ${viewMode === 'code' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                                onClick={() => setViewMode('code')}
                            >
                                <Code size={12} className="inline mr-1 -mt-0.5" /> Source
                            </button>
                        </div>
                    </div>
                    
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 relative overflow-hidden bg-black/20">
                    <AnimatePresence mode="wait">
                        {viewMode === 'demo' && experiment.DemoComponent ? (
                            <motion.div 
                                key="demo"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full h-full relative cursor-crosshair"
                            >
                                <experiment.DemoComponent themeColor={themeColor} />
                            </motion.div>
                        ) : viewMode === 'code' && experiment.codeSnippet ? (
                            <motion.div 
                                key="code"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full h-full overflow-y-auto p-6 bg-[#0d0d12]"
                            >
                                <pre className="text-sm font-mono overflow-x-auto rounded-lg !bg-transparent !m-0">
                                    <code className="language-javascript">
                                        {experiment.codeSnippet}
                                    </code>
                                </pre>
                            </motion.div>
                        ) : (
                            <motion.div key="none" className="w-full h-full flex items-center justify-center text-gray-500 font-mono">
                                Content not available.
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Lab = () => {
    const { themeColor } = useTheme();
    const [filter, setFilter] = useState('All');
    const [selectedExperiment, setSelectedExperiment] = useState(null);

    const filteredExperiments = filter === 'All' 
        ? experiments 
        : experiments.filter(e => e.category === filter);

    const handleCardClick = (exp) => {
        if (exp.hasDemo) {
            setSelectedExperiment(exp);
        } else if (exp.link) {
            window.open(exp.link, '_blank');
        }
    };

    return (
        <section id="lab" className="relative w-full min-h-screen bg-black py-32 px-6 md:px-12 z-20">
            {/* Section Header */}
            <div className="max-w-7xl mx-auto mb-16">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex items-center gap-4 mb-6"
                >
                    <div className="w-12 h-[2px] bg-white/20" />
                    <h2 className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-gray-400 flex items-center gap-2">
                        <Code2 size={16} style={{ color: themeColor }} /> 
                        The Lab
                    </h2>
                </motion.div>
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <motion.h3 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter"
                        >
                            Interactive <span className="italic font-light opacity-50 text-transparent" style={{ WebkitTextStroke: `1px ${themeColor}` }}>Playground</span>
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="mt-6 text-gray-400 max-w-2xl text-lg md:text-xl font-light"
                        >
                            A collection of creative coding sketches, unreleased concepts, and raw WebGL shaders exploring the intersection of design and mathematics.
                        </motion.p>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex justify-start md:justify-end w-full md:w-auto mt-4 md:mt-0">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap gap-2 p-1 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md w-full sm:w-auto"
                        >
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`relative px-3 py-2 sm:px-4 text-[10px] sm:text-xs font-mono uppercase tracking-widest rounded-lg transition-colors flex-1 sm:flex-none text-center ${filter === cat ? 'text-black font-bold' : 'text-gray-400 hover:text-white'}`}
                                >
                                    {filter === cat && (
                                        <motion.div
                                            layoutId="activeFilter"
                                            className="absolute inset-0 rounded-lg"
                                            style={{ backgroundColor: themeColor }}
                                        />
                                    )}
                                    <span className="relative z-10 whitespace-nowrap">{cat}</span>
                                </button>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <motion.div layout className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredExperiments.map(exp => (
                        <LabCard 
                            key={exp.id} 
                            experiment={exp} 
                            themeColor={themeColor} 
                            onClick={handleCardClick}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>
            


            {/* Modal */}
            <AnimatePresence>
                {selectedExperiment && (
                    <InteractiveModal 
                        experiment={selectedExperiment} 
                        onClose={() => setSelectedExperiment(null)} 
                        themeColor={themeColor}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Lab;
