import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Home, User, Briefcase, Mail } from 'lucide-react';

const Header = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    // Logic: When scrolled down > 50px, the header becomes "faded" (low opacity) unless hovered.
    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    // Variants for the container width/height
    const containerVariants = {
        collapsed: {
            width: '180px', // Tighter width for collapsed state
            height: '50px',
            borderRadius: '100px',
            backgroundColor: 'rgba(24, 24, 27, 0.6)', // Less opaque when collapsed
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        expanded: {
            width: '400px',
            height: '80px',
            borderRadius: '100px',
            backgroundColor: 'rgba(24, 24, 27, 0.95)', // More opaque when active
            transition: { type: "spring", stiffness: 300, damping: 30 }
        }
    };

    return (
        <motion.header
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
            animate={{
                // If scrolled and NOT expanded, fade out. If expanded or top, full opacity.
                opacity: (isScrolled && !isExpanded) ? 0.3 : 1,
                y: 0,
                scale: (isScrolled && !isExpanded) ? 0.9 : 1
            }}
            whileHover={{ opacity: 1, scale: 1 }} // Always restore visibility on hover
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="backdrop-blur-md border border-white/10 overflow-hidden flex items-center justify-center shadow-lg shadow-lime/5"
                initial="collapsed"
                animate={isExpanded ? "expanded" : "collapsed"}
                variants={containerVariants}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
            >
                <nav className="flex items-center justify-center w-full h-full" style={{ gap: isExpanded ? '32px' : '8px' }}>
                    {/* Icons */}
                    {[
                        { icon: Home, href: "#", label: "Home" },
                        { icon: User, href: "#about", label: "About" },
                        { icon: Briefcase, href: "#work", label: "Work" },
                        { icon: Mail, href: "#contact", label: "Contact" }
                    ].map((item) => (
                        <motion.a
                            key={item.label}
                            href={item.href}
                            className="relative group p-2 flex items-center justify-center rounded-full hover:bg-white/5"
                            animate={{
                                opacity: isExpanded ? 1 : 0.7,
                            }}
                        >
                            <item.icon
                                size={isExpanded ? 24 : 18} // Smaller icons in collapsed state
                                className={`transition-colors duration-300 ${isExpanded ? 'group-hover:text-lime group-hover:scale-110' : 'text-white/80'}`}
                            />
                            {/* Glow effect on hover when expanded */}
                            {isExpanded && (
                                <span className="absolute inset-0 bg-lime/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            )}
                        </motion.a>
                    ))}
                </nav>
            </motion.div>
        </motion.header>
    );
};

export default Header;
