import React, { useRef, useCallback } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const MagneticButtonToy = ({ themeColor = "#00ffcc" }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const onMove = useCallback((e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.4);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
    }, [x, y]);

    const onLeave = useCallback(() => {
        x.set(0);
        y.set(0);
    }, [x, y]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0a0d] p-8">
            <motion.button
                ref={ref}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
                whileTap={{ scale: 0.9 }}
                className="relative flex items-center justify-center px-12 py-6 rounded-full font-mono text-sm uppercase tracking-widest font-bold text-black cursor-pointer"
                style={{
                    x, y,
                    backgroundColor: themeColor,
                    boxShadow: `0 10px 40px ${themeColor}60`
                }}
            >
                Hover Me
            </motion.button>
            <p className="mt-12 text-gray-500 font-mono text-xs max-w-sm text-center">
                Using Framer Motion useMotionValue to calculate the distance between the mouse coordinates and the center of the bounding rect.
            </p>
        </div>
    );
};

export const magneticCodeSnippet = `import React, { useRef, useCallback } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const MagneticButtonToy = ({ themeColor }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const onMove = useCallback((e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.4);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
    }, []);

    const onLeave = useCallback(() => { x.set(0); y.set(0); }, []);

    return (
        <motion.button
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            whileTap={{ scale: 0.9 }}
            style={{ x, y, backgroundColor: themeColor }}
        >
            Hover Me
        </motion.button>
    );
};`;

export default MagneticButtonToy;
