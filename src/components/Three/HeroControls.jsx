import React from 'react';

const HeroControls = ({ config, setConfig }) => {
    return (
        <div className="absolute bottom-6 left-6 md:left-12 z-20 flex flex-col gap-4 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 pointer-events-auto select-none">
            <h3 className="text-xs uppercase tracking-widest text-lime font-bold mb-1">Brain Control</h3>

            {/* Mood / Speed */}
            <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase text-gray-400">Activity Level</label>
                <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={config.speed}
                    onChange={(e) => setConfig({ ...config, speed: parseFloat(e.target.value) })}
                    className="w-32 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-lime [&::-webkit-slider-thumb]:rounded-full"
                />
            </div>

            {/* Distort / Complexity */}
            <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase text-gray-400">Complexity</label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={config.distort}
                    onChange={(e) => setConfig({ ...config, distort: parseFloat(e.target.value) })}
                    className="w-32 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-lime [&::-webkit-slider-thumb]:rounded-full"
                />
            </div>

            {/* Colors */}
            <div className="flex gap-2 mt-1">
                {['#ccff00', '#ff0055', '#00ccff', '#ffffff'].map((color) => (
                    <button
                        key={color}
                        onClick={() => setConfig({ ...config, color })}
                        className={`w-4 h-4 rounded-full border border-white/20 hover:scale-125 transition-transform ${config.color === color ? 'ring-2 ring-white scale-110' : ''}`}
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroControls;
