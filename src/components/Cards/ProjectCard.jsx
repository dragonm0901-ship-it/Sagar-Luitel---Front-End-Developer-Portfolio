import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

const ProjectCard = ({ index, title, description, tags, themeColor, onViewCaseStudy }) => {
    const cardRef = useRef(null);

    // Mouse position for spotlight
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring values for magnetic tilt
    const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
    const rotateY = useSpring(0, { stiffness: 300, damping: 30 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        mouseX.set(x);
        mouseY.set(y);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const maxRotation = 8;
        
        const rX = ((y - centerY) / centerY) * -maxRotation;
        const rY = ((x - centerX) / centerX) * maxRotation;
        
        rotateX.set(rX);
        rotateY.set(rY);
    };

    const handleMouseLeave = () => {
        rotateX.set(0);
        rotateY.set(0);
    };

    return (
        <div 
            className="horizontal-slide w-full min-h-[60vh] md:w-screen md:h-full flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5 glass group p-6 md:p-0" 
            style={{ 
                perspective: 1200,
                '--primary-color': themeColor || '#ccff00' 
            }}
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                className="relative w-full md:w-[70%] h-full md:h-[60%] bg-zinc-900 border border-white/10 rounded-2xl md:rounded-xl overflow-hidden transition-[border-color] duration-500 hover:border-lime/30"
            >
                {/* Spotlight Overlay */}
                <motion.div
                    className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 md:group-hover:opacity-100 z-0"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                600px circle at ${mouseX}px ${mouseY}px,
                                var(--primary-color),
                                transparent 40%
                            )
                        `,
                    }}
                />

                {/* Inner Content */}
                <div 
                    className="relative z-10 p-6 md:p-10 flex flex-col justify-between h-full"
                    style={{ transform: "translateZ(60px)" }}
                >
                    <div className="flex justify-between items-start mb-10 md:mb-0">
                        <span className="text-6xl md:text-9xl font-black text-white/5 transition-colors duration-500" style={{ color: 'var(--primary-color)', opacity: 0.15 }}>
                            {index}
                        </span>
                        <div className="flex gap-2 flex-wrap justify-end">
                            {tags.map((tag, i) => (
                                <span key={i} className="px-3 py-1 border border-white/20 rounded-full text-[10px] md:text-xs uppercase bg-black/50 backdrop-blur-md transition-colors duration-300" 
                                      style={{ '--tw-text-opacity': 1 }} 
                                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--primary-color)'; e.currentTarget.style.borderColor = 'var(--primary-color)' }}
                                      onMouseLeave={(e) => { e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = '' }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-5xl md:text-8xl font-black transition-colors duration-300 drop-shadow-2xl hover:text-[var(--primary-color)]">
                            {title}
                        </h3>
                        <p className="text-lg md:text-2xl mt-4 text-gray-400 max-w-xl group-hover:text-white transition-colors duration-300">
                            {description}
                        </p>
                        {onViewCaseStudy && (
                            <button
                                onClick={() => onViewCaseStudy(title)}
                                className="mt-6 text-sm font-mono font-bold uppercase tracking-wider text-gray-500 hover:text-[var(--primary-color)] transition-colors interactive-hover group/btn flex items-center gap-2"
                            >
                                View Case Study
                                <span className="inline-block group-hover/btn:translate-x-1 transition-transform">→</span>
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProjectCard;
