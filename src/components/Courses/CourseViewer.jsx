import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { ChevronLeft, ChevronRight, Menu, X, BookOpen, AlertTriangle } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

import { courses } from '../../data/courses';

const CourseViewer = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    
    const [course, setCourse] = useState(null);
    const [activeModuleIndex, setActiveModuleIndex] = useState(0);
    const [activePageIndex, setActivePageIndex] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Initial Load & Auth handled by AuthGate
    useEffect(() => {
        const foundCourse = courses.find(c => c.id === courseId);
        if (foundCourse) {
            setCourse(foundCourse);
        } else {
            // Course not found
            navigate('/courses');
        }
    }, [courseId, navigate]);

    // Syntax Highlighting Effect
    useEffect(() => {
        Prism.highlightAll();
    }, [activeModuleIndex, activePageIndex, course]);

    if (!course) return <div className="min-h-screen bg-black" />;

    const currentModule = course.modules[activeModuleIndex];
    if (!currentModule || currentModule.pages.length === 0) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6">
                <AlertTriangle size={48} className="text-yellow-500 mb-6" />
                <h1 className="text-2xl font-bold mb-4">Course Content In Development</h1>
                <p className="text-gray-400 mb-8 max-w-md text-center">
                    The modules for "{course.title}" are currently being written. Check back soon for the full curriculum!
                </p>
                <button 
                    onClick={() => navigate('/courses')}
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-mono text-sm transition-colors"
                >
                    <ChevronLeft size={16} /> Back to Dashboard
                </button>
            </div>
        );
    }

    const currentPage = currentModule.pages[activePageIndex];

    // Navigation Logic
    const handleNext = () => {
        if (activePageIndex < currentModule.pages.length - 1) {
            setActivePageIndex(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (activeModuleIndex < course.modules.length - 1) {
            setActiveModuleIndex(prev => prev + 1);
            setActivePageIndex(0);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrev = () => {
        if (activePageIndex > 0) {
            setActivePageIndex(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (activeModuleIndex > 0) {
            setActiveModuleIndex(prev => prev - 1);
            setActivePageIndex(course.modules[activeModuleIndex - 1].pages.length - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const isFirstPage = activeModuleIndex === 0 && activePageIndex === 0;
    const isLastPage = activeModuleIndex === course.modules.length - 1 && activePageIndex === currentModule.pages.length - 1;

    // Custom CSS Markdown Component Styles
    const MarkdownComponents = {
        h1: ({node, ...props}) => <h1 className="text-4xl md:text-5xl font-black mb-8 tracking-tight text-white border-b border-white/10 pb-6" {...props} />,
        h2: ({node, ...props}) => <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-white" {...props} />,
        h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-8 mb-4 text-[#ccff00]" {...props} />,
        p: ({node, ...props}) => <p className="text-lg leading-relaxed text-gray-300 mb-6 font-light" {...props} />,
        ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 text-lg text-gray-300 font-light space-y-2 marker:text-[#ccff00]" {...props} />,
        ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-6 text-lg text-gray-300 font-light space-y-2 marker:text-[#ccff00]" {...props} />,
        li: ({node, ...props}) => <li className="pl-2" {...props} />,
        strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
        code: ({node, inline, className, children, ...props}) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <div className="relative group my-8 rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0c]">
                    <div className="flex items-center px-4 py-2 border-b border-white/5 bg-black/40">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                        </div>
                        <span className="ml-auto text-[10px] uppercase tracking-widest font-mono text-gray-500">{match[1]}</span>
                    </div>
                    <pre className="!bg-transparent !m-0 p-4 text-sm font-mono overflow-auto">
                        <code className={className} {...props}>
                            {children}
                        </code>
                    </pre>
                </div>
            ) : (
                <code className="px-1.5 py-0.5 rounded-md bg-white/10 text-[#ccff00] font-mono text-sm" {...props}>
                    {children}
                </code>
            )
        },
        blockquote: ({node, ...props}) => {
            // Check if it's an alert blockquote (github style > [!NOTE])
            const txt = props.children[1]?.props?.children?.[0] || '';
            if (typeof txt === 'string') {
                if (txt.includes('[!NOTE]') || txt.includes('[!WARNING]')) {
                    const isWarning = txt.includes('[!WARNING]');
                    const cleanTxt = txt.replace('[!NOTE]\n', '').replace('[!WARNING]\n', '').replace('[!NOTE]', '').replace('[!WARNING]', '');
                    
                    return (
                        <div className={`my-8 p-6 rounded-2xl border ${isWarning ? 'bg-red-500/10 border-red-500/20 text-red-100' : 'bg-blue-500/10 border-blue-500/20 text-blue-100'}`}>
                            <div className="flex items-center gap-2 mb-2 font-bold uppercase tracking-widest text-[10px] font-mono">
                                <AlertTriangle size={14} className={isWarning ? 'text-red-500' : 'text-blue-500'} />
                                <span className={isWarning ? 'text-red-500' : 'text-blue-500'}>{isWarning ? 'Warning' : 'Note'}</span>
                            </div>
                            <div className="text-base font-medium">{cleanTxt}</div>
                        </div>
                    );
                }
            }

            return (
                <blockquote className="border-l-2 border-[#ccff00] pl-6 py-2 my-8 italic text-gray-400 text-lg bg-gradient-to-r from-[#ccff00]/5 to-transparent rounded-r-xl" {...props} />
            );
        },
        img: ({node, ...props}) => (
            <figure className="my-10">
                <img className="w-full rounded-2xl border border-white/10" loading="lazy" {...props} />
                {props.alt && <figcaption className="mt-4 text-center text-sm font-mono text-gray-500 uppercase tracking-widest">{props.alt}</figcaption>}
            </figure>
        )
    };

    return (
        <div className="min-h-screen bg-[#050505] flex text-white selection:bg-[#ccff00] selection:text-black">
            
            {/* Mobile Sidebar Toggle Area */}
            <div className="lg:hidden fixed bottom-6 right-6 z-50">
                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="w-14 h-14 bg-[#ccff00] text-black rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Sidebar Overlay (Mobile) */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar (Syllabus) */}
            <motion.aside 
                className={`fixed lg:sticky top-0 left-0 h-[100svh] w-[300px] border-r border-white/5 bg-[#0a0a0c] z-50 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
            >
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <button 
                        onClick={() => navigate('/courses')}
                        className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors"
                    >
                        <ChevronLeft size={14} /> My Courses
                    </button>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-gray-500 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 pb-2">
                    <h2 className="text-xl font-bold tracking-tight text-white line-clamp-2">{course.title}</h2>
                    <div className="mt-4 flex gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 bg-white/5 rounded-md text-gray-400 border border-white/10">Syllabus</span>
                    </div>
                </div>

                {/* Modules List */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
                    {course.modules.map((module, mIdx) => (
                        <div key={module.id} className="space-y-2">
                            <h4 className="text-xs font-mono uppercase tracking-widest text-[#ccff00] pl-2">
                                {module.title}
                            </h4>
                            <ul className="space-y-1">
                                {module.pages.map((page, pIdx) => {
                                    const isActive = activeModuleIndex === mIdx && activePageIndex === pIdx;
                                    return (
                                        <li key={page.id}>
                                            <button
                                                onClick={() => {
                                                    setActiveModuleIndex(mIdx);
                                                    setActivePageIndex(pIdx);
                                                    setIsSidebarOpen(false);
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }}
                                                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-200 flex items-center gap-3 ${
                                                    isActive 
                                                        ? 'bg-white/10 text-white font-medium border border-white/10' 
                                                        : 'text-gray-500 hover:bg-white/5 hover:text-gray-300 border border-transparent'
                                                }`}
                                            >
                                                <BookOpen size={14} className={isActive ? 'text-[#ccff00]' : 'opacity-0'} />
                                                <span className="line-clamp-1">{page.title}</span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 bg-[#050505]">
                <div className="max-w-3xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
                    
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest mb-12">
                        <span>{course.id}</span>
                        <ChevronRight size={12} />
                        <span className="text-[#ccff00]">{currentModule.title}</span>
                    </div>
                    
                    {/* Markdown Renderer */}
                    <motion.article 
                        key={`${activeModuleIndex}-${activePageIndex}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="prose prose-invert prose-lg max-w-none"
                    >
                        <ReactMarkdown components={MarkdownComponents}>
                            {currentPage.content}
                        </ReactMarkdown>
                    </motion.article>

                    {/* Pagination Controls */}
                    <div className="mt-24 pt-8 border-t border-white/10 flex items-center justify-between">
                        <button 
                            onClick={handlePrev}
                            disabled={isFirstPage}
                            className="group flex flex-col gap-1 text-left disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] flex items-center gap-1">
                                <ChevronLeft size={12} className="transform group-hover:-translate-x-1 transition-transform" /> Previous
                            </span>
                            {!isFirstPage && (
                                <span className="text-gray-400 font-medium group-hover:text-white transition-colors">
                                    {activePageIndex > 0 
                                        ? currentModule.pages[activePageIndex - 1].title 
                                        : course.modules[activeModuleIndex - 1].pages[course.modules[activeModuleIndex - 1].pages.length - 1].title
                                    }
                                </span>
                            )}
                        </button>

                        <button 
                            onClick={handleNext}
                            disabled={isLastPage}
                            className="group flex flex-col items-end gap-1 text-right disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] flex items-center gap-1">
                                Next <ChevronRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                            </span>
                            {!isLastPage && (
                                <span className="text-gray-400 font-medium group-hover:text-white transition-colors">
                                    {activePageIndex < currentModule.pages.length - 1 
                                        ? currentModule.pages[activePageIndex + 1].title 
                                        : course.modules[activeModuleIndex + 1].pages[0].title
                                    }
                                </span>
                            )}
                        </button>
                    </div>

                </div>
            </main>

        </div>
    );
};

export default CourseViewer;
