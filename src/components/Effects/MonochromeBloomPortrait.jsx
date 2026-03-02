import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

const MonochromeBloomPortrait = ({ imageUrl, themeColor }) => {
    const containerRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    
    // We use GSAP-like springs via Framer Motion for buttery smooth mouse tracking
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);

    const smoothX = useSpring(mouseX, { damping: 40, stiffness: 200, mass: 0.5 });
    const smoothY = useSpring(mouseY, { damping: 40, stiffness: 200, mass: 0.5 });
    
    const maskSize = useSpring(0, { damping: 30, stiffness: 200 });

    useEffect(() => {
        maskSize.set(isHovered ? 180 : 0);
    }, [isHovered, maskSize]);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    // Declarative motion template that updates on the compositor thread
    const maskImage = useMotionTemplate`radial-gradient(circle ${maskSize}px at ${smoothX}px ${smoothY}px, black 10%, transparent 80%)`;

    return (
        <div 
            ref={containerRef}
            className="relative w-full h-full min-h-[400px] flex items-center justify-center interactive-hover cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ touchAction: 'none' }} // Prevent scrolling when tracking on touch devices
        >
            <div className="relative w-64 h-64 md:w-80 md:h-80 select-none pointer-events-none">
                
                {/* 1. Base Layer: Moody Monochrome */}
                <img 
                    src={imageUrl} 
                    alt="Sagar Luitel" 
                    className="absolute inset-0 w-full h-full object-contain filter grayscale contrast-125 brightness-[0.6] opacity-80"
                    draggable={false}
                />

                {/* 2. Bloom/Reveal Layer: Full Color with Masking */}
                <motion.div 
                    className="absolute inset-0 z-10 overflow-hidden"
                    style={{
                        WebkitMaskImage: maskImage,
                        maskImage: maskImage,
                    }}
                >
                    {/* The Full Color Image */}
                    <img 
                        src={imageUrl} 
                        alt="Sagar Luitel Reveal" 
                        className="absolute inset-0 w-full h-full object-contain filter contrast-110 saturate-[1.2]"
                        draggable={false}
                    />

                    {/* Subtle Overlay Glow within the mask */}
                    <div 
                        className="absolute inset-0"
                        style={{
                            background: `radial-gradient(circle 180px at 50% 50%, \${themeColor}22, transparent)`,
                            mixBlendMode: 'overlay'
                        }}
                    />
                </motion.div>

                {/* 3. Outer Ambient Tracker (Follows mouse, renders behind or slightly over to give a neon rim) */}
                <motion.div
                    className="absolute z-20 pointer-events-none rounded-full blur-[60px]"
                    style={{
                        left: smoothX,
                        top: smoothY,
                        width: 100,
                        height: 100,
                        x: '-50%',
                        y: '-50%',
                        backgroundColor: themeColor,
                        opacity: isHovered ? 0.25 : 0,
                    }}
                    transition={{ opacity: { duration: 0.8 } }}
                />
            </div>
        </div>
    );
};

export default MonochromeBloomPortrait;
