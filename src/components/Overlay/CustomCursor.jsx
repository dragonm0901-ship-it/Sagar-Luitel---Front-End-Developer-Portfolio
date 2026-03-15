import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            // Check if we are hovering over an interactive element
            const isInteractive = e.target.closest('a, button, input, textarea, select, .interactive-hover');
            setIsHovering(!!isInteractive);
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // Only render on desktop / non-touch devices to avoid weird behavior on mobile
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null;
    }

    return (
        <motion.div
            className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100] flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-200 bg-transparent border-2 border-white`}
            animate={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
                scale: isHovering ? 2.5 : 1,
            }}
            transition={{
                type: 'spring',
                stiffness: 500,
                damping: 28,
                mass: 0.5,
            }}
        />
    );
};

export default CustomCursor;
