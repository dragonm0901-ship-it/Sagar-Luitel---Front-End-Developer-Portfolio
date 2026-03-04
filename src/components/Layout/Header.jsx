import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Mail, Menu, X, Clock, BookOpen, Code2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const NAV_ITEMS = [
    { icon: Home,      href: '#',            label: 'Home'       },
    { icon: Briefcase, href: '#work',        label: 'Work'       },
    { icon: User,      href: '#about',       label: 'About'      },
    { icon: Clock,     href: '#experience',  label: 'Experience' },
    { icon: BookOpen,  href: '#blog',        label: 'Blog'       },
    { icon: Code2,     href: '#lab',         label: 'Lab'        },
    { icon: Mail,      href: '#contact',     label: 'Contact'    },
];

    const Header = () => {
    const { themeColor } = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHoveringZone, setIsHoveringZone] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, 'change', (v) => setIsScrolled(v > 50));

    // Should the nav be visible?
    const isNavVisible = !isScrolled || isHoveringZone || isExpanded;

    return (
        <>
            {/* ── DESKTOP: floating pill (sm and up, hidden on mobile) ── */}

            {/* Invisible hover trigger zone — always present at top */}
            <div
                className="fixed top-0 left-0 right-0 z-50 hidden sm:block"
                style={{ height: '80px', pointerEvents: isScrolled ? 'auto' : 'none' }}
                onMouseEnter={() => setIsHoveringZone(true)}
                onMouseLeave={() => setIsHoveringZone(false)}
            />

            <div
                className="fixed top-0 left-0 right-0 z-50 hidden sm:flex justify-center pointer-events-none"
                style={{ paddingTop: '28px' }}
                onMouseEnter={() => setIsHoveringZone(true)}
                onMouseLeave={() => setIsHoveringZone(false)}
            >
                <motion.div
                    className="pointer-events-auto"
                    animate={{
                        y: isNavVisible ? 0 : -80,
                        opacity: isNavVisible ? 1 : 0,
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                    <motion.div
                        className="backdrop-blur-xl border border-white/10 overflow-hidden flex items-center justify-center"
                        animate={{
                            width:           isExpanded ? '580px' : '280px',
                            height:          isExpanded ? '76px'  : '48px',
                            borderRadius:    '100px',
                            backgroundColor: isExpanded ? 'rgba(16,16,20,0.97)' : 'rgba(16,16,20,0.65)',
                        }}
                        transition={{ type: 'spring', stiffness: 340, damping: 32 }}
                        onMouseEnter={() => setIsExpanded(true)}
                        onMouseLeave={() => setIsExpanded(false)}
                        style={{ boxShadow: `0 4px 40px ${themeColor}0d` }}
                    >
                        <nav className="flex items-center justify-center" style={{ gap: isExpanded ? '28px' : '6px' }}>
                            {NAV_ITEMS.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="relative group flex flex-col items-center justify-center rounded-full hover:bg-white/5 transition-colors"
                                    style={{
                                        padding: '6px 8px',
                                        touchAction: 'manipulation',
                                        textDecoration: 'none',
                                    }}
                                    onMouseEnter={e => {
                                        if (isExpanded) e.currentTarget.querySelector('svg').style.color = themeColor;
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.querySelector('svg').style.color = '';
                                    }}
                                >
                                    <item.icon
                                        size={isExpanded ? 20 : 16}
                                        style={{ transition: 'color 0.2s, width 0.2s, height 0.2s', color: 'rgba(255,255,255,0.72)' }}
                                    />
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.span
                                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                                animate={{ opacity: 0.55, height: 'auto', marginTop: 3 }}
                                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                                transition={{ duration: 0.18 }}
                                                className="text-[9px] font-mono uppercase tracking-widest text-gray-400 leading-none block overflow-hidden"
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>

                                    {/* hover glow */}
                                    <span
                                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none blur-lg"
                                        style={{ backgroundColor: `${themeColor}18` }}
                                    />
                                </a>
                            ))}
                        </nav>
                    </motion.div>
                </motion.div>
            </div>

            {/* ── MOBILE: Dynamic Island Navigation (Option A) ── */}
            <div className="fixed bottom-6 left-0 right-0 z-50 sm:hidden flex justify-center pointer-events-none">
                <MobileDynamicIsland navItems={NAV_ITEMS} themeColor={themeColor} />
            </div>
        </>
    );
};

// Extracted Mobile Dynamic Island Component
const MobileDynamicIsland = ({ navItems, themeColor }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <motion.div
            ref={containerRef}
            className="pointer-events-auto overflow-hidden flex flex-col items-center justify-center p-2"
            animate={{
                width: isOpen ? '88vw' : '64px',
                height: isOpen ? '72px' : '44px',
                borderRadius: isOpen ? '24px' : '32px',
                backgroundColor: isOpen ? 'rgba(12, 12, 16, 0.95)' : 'rgba(12, 12, 16, 0.8)',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            style={{
                backdropFilter: 'blur(20px)',
                border: `1px solid ${isOpen ? themeColor + '60' : 'rgba(255,255,255,0.1)'}`,
                boxShadow: isOpen
                    ? `0 12px 40px ${themeColor}15, 0 4px 12px rgba(0,0,0,0.5)`
                    : `0 4px 20px rgba(0,0,0,0.5)`,
            }}
            onClick={() => { if (!isOpen) setIsOpen(true); }}
        >
            <AnimatePresence mode="popLayout" initial={false}>
                {!isOpen ? (
                    // Closed State: Just a menu icon
                    <motion.div
                        key="closed"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center justify-center w-full h-full cursor-pointer"
                        style={{ color: 'rgba(255,255,255,0.8)' }}
                    >
                        <Menu size={18} aria-label="Open navigation menu" />
                    </motion.div>
                ) : (
                    // Open State: Flex row of icons
                    <motion.div
                        key="open"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }} // wait slightly for expansion
                        className="flex justify-around items-center w-full h-full relative"
                    >
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => {
                                    setIsOpen(false);
                                }}
                                className="flex flex-col items-center justify-center flex-1 h-full pt-1"
                                style={{
                                    WebkitTapHighlightColor: 'transparent',
                                    touchAction: 'manipulation',
                                }}
                            >
                                <item.icon size={20} style={{ color: 'rgba(255,255,255,0.85)' }} />
                                <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400 mt-1">
                                    {item.label}
                                </span>
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Header;
