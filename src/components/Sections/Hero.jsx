import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import InteractiveHeroScene from '../Three/InteractiveHeroScene';
import HeroControls from '../Three/HeroControls';
import ErrorBoundary from '../ErrorBoundary';

const Hero = () => {
    // Shared State for the 3D Scene
    const [config, setConfig] = useState({
        color: '#ccff00',
        speed: 2,
        distort: 0.5,
        hovering: false
    });

    const fallback = (
        <div className="w-full h-full bg-zinc-900 border border-white/10 rounded-3xl flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-lime/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <p className="text-white/30 font-mono text-sm relative z-10 flex flex-col items-center">
                <span className="text-2xl mb-2">⚡</span>
                3D Scene Temporarily Disabled <br />
                <span className="text-xs opacity-50 mt-2">(WebGL Context Stabilizing...)</span>
            </p>
        </div>
    );

    return (
        <section className="relative w-full h-screen overflow-hidden flex flex-col md:flex-row bg-black">

            {/* LEFT: Interactive 3D Scene */}
            <div className="w-full md:w-[55%] h-[45vh] md:h-full relative order-1 md:order-1 cursor-grab active:cursor-grabbing">
                <ErrorBoundary fallback={fallback}>
                    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
                        <Suspense fallback={null}>
                            <InteractiveHeroScene config={config} setConfig={setConfig} />
                            <OrbitControls enableZoom={false} enablePan={false} />
                        </Suspense>
                    </Canvas>
                </ErrorBoundary>

                {/* HUD Controls */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 w-full max-w-[300px] md:max-w-none px-4 md:px-0 z-20">
                    <HeroControls config={config} setConfig={setConfig} />
                </div>
            </div>

            {/* RIGHT: Text Content - Tighter with Right Shift */}
            <div className="w-full md:w-[45%] h-[55vh] md:h-full flex flex-col justify-center items-center md:items-start px-6 md:px-0 md:pr-16 md:pl-16 order-2 md:order-2 z-10 pointer-events-none text-center md:text-left bg-black md:bg-transparent">
                <div className="pointer-events-auto mt-[-50px] md:mt-0">
                    <h1 className="text-[12vw] md:text-[7vw] font-black leading-[0.85] tracking-tighter mb-4 md:mb-6 mix-blend-difference text-white">
                        SAGAR <br />
                        <span className="text-lime text-stroke-black">LUITEL</span>
                    </h1>

                    <p className="text-sm md:text-2xl font-light text-gray-400 mb-6 md:mb-8 max-w-[300px] md:max-w-lg mx-auto md:mx-0">
                        Senior Frontend Developer & UI/UX Designer creating
                        <span className="text-lime font-bold"> living</span> digital experiences.
                    </p>

                    <div className="flex gap-3 md:gap-4 justify-center md:justify-start">
                        <button className="px-6 py-3 md:px-8 md:py-4 text-sm md:text-base bg-lime text-black font-bold uppercase tracking-wider hover:bg-white hover:scale-105 transition-all rounded-full">
                            Explore Work
                        </button>
                        <button className="px-6 py-3 md:px-8 md:py-4 text-sm md:text-base border border-white/20 text-white font-bold uppercase tracking-wider hover:border-lime hover:text-lime transition-all rounded-full">
                            Contact Me
                        </button>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Hero;
