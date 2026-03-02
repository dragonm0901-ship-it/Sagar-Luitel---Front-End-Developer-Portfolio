import React from 'react';

const HeroControls = ({ config, setConfig }) => {
    const sliderClass = `
        h-1 rounded-full appearance-none cursor-pointer
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:w-3
        [&::-webkit-slider-thumb]:h-3
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:cursor-grab
        [&::-webkit-slider-thumb]:active:cursor-grabbing
    `;

    return (
        <div className="bg-black/60 backdrop-blur-lg border border-white/10 rounded-xl pointer-events-auto select-none overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                <h3 className="text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                    Brain Control
                </h3>
            </div>

            {/* Controls: horizontal on mobile, vertical on sm+ */}
            <div className="flex flex-row sm:flex-col gap-3.5 p-2.5 sm:p-3.5">
                {/* Activity Level */}
                <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-[8px] sm:text-[9px] uppercase tracking-wider text-gray-600 whitespace-nowrap">
                        Activity
                    </label>
                    <input
                        type="range" min="0" max="10" step="0.1"
                        value={config.speed}
                        onChange={e => setConfig({ ...config, speed: parseFloat(e.target.value) })}
                        className={`${sliderClass} w-full sm:w-28`}
                        style={{
                            background: `linear-gradient(to right, var(--lime) 0%, var(--lime) ${config.speed * 10}%, rgba(255,255,255,0.1) ${config.speed * 10}%, rgba(255,255,255,0.1) 100%)`
                        }}
                    />
                </div>

                {/* Complexity */}
                <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-[8px] sm:text-[9px] uppercase tracking-wider text-gray-600 whitespace-nowrap">
                        Complexity
                    </label>
                    <input
                        type="range" min="0" max="1" step="0.05"
                        value={config.distort}
                        onChange={e => setConfig({ ...config, distort: parseFloat(e.target.value) })}
                        className={`${sliderClass} w-full sm:w-28`}
                        style={{
                            background: `linear-gradient(to right, var(--lime) 0%, var(--lime) ${config.distort * 100}%, rgba(255,255,255,0.1) ${config.distort * 100}%, rgba(255,255,255,0.1) 100%)`
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroControls;
