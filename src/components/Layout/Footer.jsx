import React from 'react';
import { ArrowUpRight, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full bg-zinc-950 py-8 px-6 md:px-12 border-t border-white/10 relative overflow-hidden">
            {/* Subtle Glow */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-lime/5 rounded-full blur-[50px] pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">

                {/* Left: Contact CTA */}
                <div className="flex items-center gap-4 order-2 md:order-1">
                    <a href="mailto:contact@sagar.dev" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white hover:text-lime transition-colors">
                        <span className="w-2 h-2 rounded-full bg-lime group-hover:animate-pulse" />
                        Start a Project <ArrowUpRight size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                </div>

                {/* Center: Socials */}
                <div className="flex gap-3 order-1 md:order-2">
                    {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                        <a key={i} href="#" className="p-2 bg-zinc-900 rounded-full border border-white/10 text-white/70 hover:bg-lime hover:text-black hover:border-lime transition-all duration-300 hover:scale-110">
                            <Icon size={16} />
                        </a>
                    ))}
                </div>

                {/* Right: Copyright */}
                <div className="flex flex-col items-center md:items-end order-3 text-xs text-gray-500 font-mono">
                    <p>© 2026 Sagar Luitel.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
