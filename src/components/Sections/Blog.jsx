import React, { useRef, useState } from 'react';
import { motion, useInView, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';
import BlogPostDetail from './BlogPostDetail';

const blogPosts = [
    {
        title: 'Building Immersive 3D Experiences with React Three Fiber',
        excerpt: 'How I combined React\'s component model with Three.js to create interactive 3D web experiences that feel native and performant.',
        date: 'Feb 2024',
        readTime: '6 min read',
        tags: ['Three.js', 'React', 'WebGL'],
        gradient: 'from-purple-500/20 to-blue-500/20',
    },
    {
        title: 'The Art of Micro-Animations: GSAP vs Framer Motion',
        excerpt: 'A deep dive into when to use GSAP vs Framer Motion for web animations, with real-world examples and performance benchmarks.',
        date: 'Jan 2024',
        readTime: '8 min read',
        tags: ['GSAP', 'Animation', 'Performance'],
        gradient: 'from-emerald-500/20 to-teal-500/20',
    },
    {
        title: 'Designing Portfolio Sites That Actually Get You Hired',
        excerpt: 'Lessons learned from building my own portfolio — what recruiters actually look at, common mistakes, and tips for standing out.',
        date: 'Dec 2023',
        readTime: '5 min read',
        tags: ['Design', 'Career', 'UI/UX'],
        gradient: 'from-orange-500/20 to-rose-500/20',
    },
];

const BlogCard = ({ post, index, themeColor, onClick }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const handleTouchStart = (e) => {
        if (!ref.current) return;
        const touch = e.touches[0];
        const rect = ref.current.getBoundingClientRect();
        mouseX.set(touch.clientX - rect.left);
        mouseY.set(touch.clientY - rect.top);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 }}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchStart}
            onClick={onClick}
            whileTap={{ scale: 0.97 }}
            className="group relative block rounded-2xl border border-white/10 overflow-hidden interactive-hover bg-white/[0.02] backdrop-blur-sm hover:border-white/20 transition-colors duration-500 cursor-pointer"
        >
            {/* Spotlight overlay — visible on hover AND touch */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 z-0 rounded-2xl"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            500px circle at ${mouseX}px ${mouseY}px,
                            rgba(204, 255, 0, 0.08),
                            transparent 40%
                        )
                    `,
                }}
            />

            {/* Gradient header strip */}
            <div className={`h-1 w-full bg-gradient-to-r ${post.gradient}`} />

            <div className="relative z-10 p-6 md:p-8">
                {/* Meta */}
                <div className="flex items-center gap-4 mb-4 text-[11px] font-mono text-gray-500">
                    <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {post.readTime}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-white transition-colors leading-snug">
                    {post.title}
                    <ArrowUpRight
                        size={16}
                        className="inline-block ml-1.5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300"
                        style={{ color: themeColor }}
                    />
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-400 leading-relaxed mb-5">{post.excerpt}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full border border-white/10 text-gray-500 group-hover:border-white/20 group-hover:text-gray-300 transition-colors"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Read more hint */}
                <p className="mt-5 text-xs font-mono font-bold uppercase tracking-wider text-gray-600 group-hover:text-lime transition-colors flex items-center gap-1.5"
                   style={{ '--tw-text-opacity': 1 }}
                >
                    Read Article
                    <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                </p>
            </div>
        </motion.div>
    );
};

const Blog = () => {
    const { themeColor } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [activePost, setActivePost] = useState(null);

    return (
        <>
            <section id="blog" className="relative py-24 md:py-32 bg-black overflow-hidden" ref={sectionRef}>
                {/* Section header */}
                <div className="max-w-6xl mx-auto px-6 md:px-12 mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7 }}
                        className="text-center"
                    >
                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-gray-500 block mb-3">
                            Writing
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
                            INSIGHTS
                        </h2>
                        <p className="text-sm text-gray-500 mt-4 max-w-md mx-auto">
                            Thoughts on frontend development, design systems, and the creative process.
                        </p>
                    </motion.div>
                </div>

                {/* Blog grid — swipeable on mobile, 3-col grid on desktop */}
                <div className="max-w-6xl mx-auto px-6 md:px-12 overflow-hidden">
                    {/* Desktop: standard grid */}
                    <div className="hidden md:grid md:grid-cols-3 gap-6">
                        {blogPosts.map((post, index) => (
                            <BlogCard
                                key={index}
                                post={post}
                                index={index}
                                themeColor={themeColor}
                                onClick={() => setActivePost(index)}
                            />
                        ))}
                    </div>

                    {/* Mobile: horizontal drag carousel */}
                    <motion.div
                        drag="x"
                        dragConstraints={{ left: -(blogPosts.length - 1) * 300, right: 0 }}
                        dragElastic={0.1}
                        dragTransition={{ bounceStiffness: 200, bounceDamping: 20 }}
                        className="flex gap-4 md:hidden cursor-grab active:cursor-grabbing"
                    >
                        {blogPosts.map((post, index) => (
                            <div key={index} className="min-w-[85vw] flex-shrink-0">
                                <BlogCard
                                    post={post}
                                    index={index}
                                    themeColor={themeColor}
                                    onClick={() => setActivePost(index)}
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Blog Post Detail Modal */}
            <BlogPostDetail
                postIndex={activePost}
                isOpen={activePost !== null}
                onClose={() => setActivePost(null)}
                themeColor={themeColor}
            />
        </>
    );
};

export default Blog;
