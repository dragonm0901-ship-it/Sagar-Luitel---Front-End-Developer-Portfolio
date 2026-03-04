import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const FloatingOrbsToy = ({ themeColor = "#00ffcc" }) => {
    const containerRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth out the mouse movement using springs
    const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            // Calculate mouse position relative to container
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        };

        const handleMouseLeave = () => {
             // Gently return to center when mouse leaves
             if (!containerRef.current) return;
             const rect = containerRef.current.getBoundingClientRect();
             mouseX.set(rect.width / 2);
             mouseY.set(rect.height / 2);
        };

        const container = containerRef.current;
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);
        
        // Initial center position
        const rect = container.getBoundingClientRect();
        mouseX.set(rect.width / 2);
        mouseY.set(rect.height / 2);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [mouseX, mouseY]);

    return (
        <div 
            ref={containerRef}
            className="w-full h-full bg-[#050508] relative overflow-hidden flex flex-col justify-end"
        >
            {/* The Glass Overlay (Provides the heavy blur for the merging effect) */}
            <div className="absolute inset-0 z-10 backdrop-blur-[100px] pointer-events-none" />

            {/* Background Base Orb */}
            <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-40 mix-blend-screen"
                style={{ backgroundColor: themeColor }}
                animate={{
                     scale: [1, 1.2, 1],
                     rotate: [0, 90, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Secondary Floating Orb */}
            <motion.div 
                className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full opacity-30 mix-blend-screen"
                style={{ backgroundColor: "#8a2be2" }} // Purple accent
                animate={{
                     x: [0, -100, 0],
                     y: [0, 100, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Mouse Tracking Orb */}
            <motion.div 
                className="absolute w-64 h-64 rounded-full mix-blend-screen z-0 opacity-60"
                style={{ 
                    x: smoothX, 
                    y: smoothY,
                    translateX: '-50%', // Offset by 50% so it centers on mouse
                    translateY: '-50%',
                    backgroundColor: themeColor
                }}
            />

            {/* Optional Overlay Text */}
            <div className="relative z-20 p-8 pointer-events-none">
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/50 bg-black/50 p-2 px-4 rounded-full backdrop-blur inline-block border border-white/5 mb-2">
                    Floating Gradient Orbs
                </p>
                <p className="block font-mono text-[10px] text-white/40 max-w-[200px]">
                    CSS & Framer Motion powered lava lamp effect. Notice how the colors blend seamlessly due to extreme layer blurring and mix-blend modes.
                </p>
            </div>
        </div>
    );
};

export const orbsCodeSnippet = `import { motion, useMotionValue, useSpring } from 'framer-motion';

// Soft, CSS-based metaballs / lava lamp effect
const FloatingOrbsToy = ({ themeColor }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    // Spring physics for buttery smooth tracking
    const smoothX = useSpring(mouseX, { damping: 25, stiffness: 150 });
    const smoothY = useSpring(mouseY, { damping: 25, stiffness: 150 });

    return (
        <div className="relative overflow-hidden bg-black" onMouseMove={...}>
            {/* Extreme blur layer creates the "Metaball" merging effect */}
            <div className="absolute inset-0 z-10 backdrop-blur-[100px]" />
            
            {/* Ambient Background Orb */}
            <motion.div 
                className="absolute top-1/2 left-1/2 rounded-full mix-blend-screen"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 10, repeat: Infinity }}
            />
            
            {/* Mouse Tracking Follower Orb */}
            <motion.div 
                className="absolute rounded-full mix-blend-screen"
                style={{ x: smoothX, y: smoothY, backgroundColor: themeColor }}
            />
        </div>
    );
};`;

export default FloatingOrbsToy;
