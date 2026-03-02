import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const timelineData = [
    {
        year: '2024 — Present',
        role: 'Frontend Developer',
        company: 'Freelance',
        description: 'Building interactive web experiences with React, Three.js, and GSAP for international clients. Specializing in 3D product configurators and immersive landing pages.',
        tags: ['React', 'Three.js', 'GSAP', 'Tailwind'],
    },
    {
        year: '2023 — 2024',
        role: 'UI / UX Developer',
        company: 'Self-Employed',
        description: 'Designed and developed responsive web applications with a focus on motion design, micro-interactions, and pixel-perfect implementation from Figma mockups.',
        tags: ['Figma', 'Framer Motion', 'CSS', 'Node.js'],
    },
    {
        year: '2022 — 2023',
        role: 'Junior Web Developer',
        company: 'Learning & Projects',
        description: 'Mastered modern JavaScript, React ecosystem, and responsive design through hands-on building of 20+ projects ranging from e-commerce to interactive dashboards.',
        tags: ['JavaScript', 'React', 'HTML/CSS', 'Git'],
    },
];

// Single timeline entry with staggered reveal
const TimelineEntry = ({ item, index, themeColor }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const isEven = index % 2 === 0;

    return (
        <div ref={ref} className="relative flex w-full mb-16 md:mb-24 last:mb-0">
            {/* Desktop: alternating left/right layout */}
            <div className={`hidden md:flex w-full items-start ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Content card */}
                <motion.div
                    initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="w-[45%] group"
                >
                    <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-white/20 transition-all duration-500 hover:bg-white/[0.04]">
                        <span
                            className="text-xs font-mono font-bold uppercase tracking-[0.2em] mb-2 block"
                            style={{ color: themeColor }}
                        >
                            {item.year}
                        </span>
                        <h3 className="text-xl font-black mb-1 text-white">{item.role}</h3>
                        <p className="text-sm text-gray-500 font-medium mb-3">{item.company}</p>
                        <p className="text-sm text-gray-400 leading-relaxed mb-4">{item.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full border border-white/10 text-gray-400 group-hover:border-white/20 transition-colors"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Center dot on the timeline */}
                <div className="w-[10%] flex justify-center relative">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 300 }}
                        className="w-4 h-4 rounded-full border-2 mt-6 z-10 relative"
                        style={{ borderColor: themeColor, backgroundColor: '#0a0a0a', boxShadow: `0 0 12px ${themeColor}55` }}
                    />
                </div>

                {/* Empty space for the other side */}
                <div className="w-[45%]" />
            </div>

            {/* Mobile: single column layout */}
            <div className="flex md:hidden w-full items-start gap-4">
                {/* Dot */}
                <div className="flex flex-col items-center pt-1.5 flex-shrink-0">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 300 }}
                        className="w-3 h-3 rounded-full border-2 z-10"
                        style={{ borderColor: themeColor, backgroundColor: '#0a0a0a', boxShadow: `0 0 12px ${themeColor}55` }}
                    />
                    <div className="w-[1px] flex-1 bg-white/10 mt-2" />
                </div>

                {/* Content card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="flex-1 group pb-8"
                >
                    <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                        <span
                            className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-2 block"
                            style={{ color: themeColor }}
                        >
                            {item.year}
                        </span>
                        <h3 className="text-lg font-black mb-1 text-white">{item.role}</h3>
                        <p className="text-xs text-gray-500 font-medium mb-2">{item.company}</p>
                        <p className="text-xs text-gray-400 leading-relaxed mb-3">{item.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                            {item.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider rounded-full border border-white/10 text-gray-400"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const Experience = () => {
    const { themeColor } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section id="experience" className="relative py-24 md:py-32 bg-black overflow-hidden" ref={sectionRef}>
            {/* Section header */}
            <div className="max-w-6xl mx-auto px-6 md:px-12 mb-16 md:mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center"
                >
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-gray-500 block mb-3">
                        Journey
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
                        EXPERIENCE
                    </h2>
                </motion.div>
            </div>

            {/* Timeline */}
            <div className="relative max-w-5xl mx-auto px-6 md:px-12">
                {/* Vertical center line (desktop only) */}
                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                    className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] origin-top"
                    style={{ backgroundColor: `${themeColor}30` }}
                />

                {timelineData.map((item, index) => (
                    <TimelineEntry key={index} item={item} index={index} themeColor={themeColor} />
                ))}
            </div>
        </section>
    );
};

export default Experience;
