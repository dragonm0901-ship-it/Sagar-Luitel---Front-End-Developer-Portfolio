import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, BarChart, ArrowRight, Home } from 'lucide-react';
import { courses } from '../../data/courses';

const CourseCard = ({ course }) => {
    const navigate = useNavigate();

    return (
        <motion.div 
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.97 }}
            className="group flex flex-col bg-[#0a0a0c] border border-white/5 hover:border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-colors"
            onClick={() => navigate(`/courses/${course.id}`)}
        >
            {/* Thumbnail */}
            <div className="relative w-full aspect-video overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 blur-[2px] group-hover:blur-none"
                    loading="lazy"
                />
                
                {/* Overlay Tags */}
                <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] font-mono text-white border border-white/10">
                        {course.level}
                    </span>
                </div>
            </div>

            {/* Content Details */}
            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#ccff00] transition-colors">{course.title}</h3>
                <p className="text-sm text-gray-400 mb-6 line-clamp-2 leading-relaxed flex-1">
                    {course.description}
                </p>

                {/* Meta stats */}
                <div className="flex items-center gap-4 text-xs font-mono text-gray-500 mb-6">
                    <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-[#ccff00]" />
                        {course.duration}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <BarChart size={14} className="text-[#ccff00]" />
                        {course.level}
                    </div>
                </div>

                {/* Start Button */}
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex gap-2">
                        {course.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[9px] uppercase tracking-wider text-gray-500 font-bold px-2 py-1 bg-white/5 rounded-md">
                                {tag}
                            </span>
                        ))}
                    </div>
                    
                    <button className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-[#ccff00] transition-colors">
                        Enter
                        <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const CourseDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white selection:bg-[#ccff00] selection:text-black">
            {/* Top Navigation */}
            <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#ccff00] flex items-center justify-center">
                            <BookOpen size={16} className="text-black" />
                        </div>
                        <span className="font-bold tracking-tight text-lg">Pro Courses</span>
                    </div>

                    <button 
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors p-2"
                    >
                        <Home size={14} /> Back to Hub
                    </button>
                </div>
            </nav>

            {/* Dashboard Header */}
            <header className="max-w-7xl mx-auto px-6 pt-20 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl"
                >
                    <span className="text-[#ccff00] text-xs font-mono tracking-widest uppercase mb-4 block">Student Portal</span>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">Select your curriculum.</h1>
                    <p className="text-gray-400 text-lg font-light leading-relaxed">
                        Welcome to the exclusive learning center. Choose a track below to begin mastering modern web development.
                    </p>
                </motion.div>
            </header>

            {/* Course Grid */}
            <section className="max-w-7xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course, idx) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <CourseCard course={course} />
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CourseDashboard;
