import React, { useRef, useEffect, useCallback } from 'react';

const MorphingText = ({ text = 'SAGAR\nLUITEL', color = '#ffffff' }) => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const animFrameRef = useRef(null);
    const mouseRef = useRef({ x: -9999, y: -9999, active: false });

    const SCATTER_RADIUS = 100;
    const SCATTER_FORCE = 12;

    // Sample text pixels to create particles
    const createParticles = useCallback((canvas) => {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const w = canvas.width / dpr;
        const h = canvas.height / dpr;
        
        // Clear and render text to sample
        ctx.save();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        
        // Compute font size from the CSS clamp
        // Parse clamp manually: clamp(48px, 7vw, 88px)
        // Compute font size based on container height AND width
        // Assume maximum 6 characters (LUITEL), Space Grotesk 900 is wide (~0.8 aspect)
        const maxFontByHeight = h * 0.8;
        const maxFontByWidth = (w * 0.9) / 5.5; 
        const actualFontSize = Math.min(maxFontByHeight, maxFontByWidth, 120);
        
        ctx.font = `900 ${actualFontSize}px 'Space Grotesk', sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const lines = text.split('\n');
        const lineHeight = actualFontSize * 0.95;
        const totalHeight = lines.length * lineHeight;
        const startY = h / 2 - totalHeight / 2 + lineHeight / 2;
        
        lines.forEach((line, i) => {
            ctx.fillText(line, w / 2, startY + i * lineHeight);
        });
        
        // Sample pixels
        const imageData = ctx.getImageData(0, 0, w * dpr, h * dpr);
        const pixels = imageData.data;
        const particles = [];
        const gap = 3; // Sample every 3 pixels for performance

        for (let y = 0; y < h * dpr; y += gap) {
            for (let x = 0; x < w * dpr; x += gap) {
                const idx = (y * w * dpr + x) * 4;
                if (pixels[idx + 3] > 128) { // If pixel is visible
                    particles.push({
                        x: x / dpr,
                        y: y / dpr,
                        originX: x / dpr,
                        originY: y / dpr,
                        vx: 0,
                        vy: 0,
                        size: Math.random() * 1.2 + 0.8,
                        color: 'white',
                    });
                }
            }
        }
        
        ctx.restore();
        particlesRef.current = particles;
    }, [text]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;

        const resize = () => {
            const parent = canvas.parentElement;
            const rect = parent.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;
            

            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            
            createParticles(canvas);
        };

        resize();
        window.addEventListener('resize', resize);

        // Parse color for resting state
        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            } : { r: 255, g: 255, b: 255 };
        };
        const restingRgb = hexToRgb(color);

        const animate = () => {
            const particles = particlesRef.current;
            const mouse = mouseRef.current;
            const w = canvas.width / dpr;
            const h = canvas.height / dpr;

            ctx.clearRect(0, 0, w, h);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Check mouse distance
                if (mouse.active) {
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < SCATTER_RADIUS) {
                         const forceDirectionX = dx / dist || 0;
                         const forceDirectionY = dy / dist || 0;
                         const force = (SCATTER_RADIUS - dist) / SCATTER_RADIUS;
                         const directionX = forceDirectionX * force * SCATTER_FORCE;
                         const directionY = forceDirectionY * force * SCATTER_FORCE;
                         
                         p.vx -= directionX;
                         p.vy -= directionY;
                    }
                }

                // Spring back to origin continuously
                const dx = p.originX - p.x;
                const dy = p.originY - p.y;
                p.vx += dx * 0.1; // Spring stiffness
                p.vy += dy * 0.1;

                // Apply velocity and friction
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.82; // Friction damping
                p.vy *= 0.82;

                // Draw particle
                const distFromOrigin = Math.sqrt((p.x - p.originX) ** 2 + (p.y - p.originY) ** 2);
                
                if (distFromOrigin > 2) {
                    // Scattered glow
                    const intensity = Math.min(distFromOrigin / 30, 1);
                    ctx.fillStyle = `rgba(${restingRgb.r}, ${restingRgb.g}, ${restingRgb.b}, ${0.6 + intensity * 0.4})`;
                } else {
                    ctx.fillStyle = `rgba(${restingRgb.r}, ${restingRgb.g}, ${restingRgb.b}, 0.95)`;
                }

                ctx.fillRect(p.x, p.y, p.size, p.size);
            }

            animFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Mouse handlers
        const onMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
        };
        const onMouseLeave = () => {
            mouseRef.current = { ...mouseRef.current, active: false };
        };
        const onTouchMove = (e) => {
            const touch = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top, active: true };
        };
        const onTouchEnd = () => {
            mouseRef.current = { ...mouseRef.current, active: false };
        };

        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mouseleave', onMouseLeave);
        canvas.addEventListener('touchmove', onTouchMove, { passive: true });
        canvas.addEventListener('touchend', onTouchEnd);

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', onMouseMove);
            canvas.removeEventListener('mouseleave', onMouseLeave);
            canvas.removeEventListener('touchmove', onTouchMove);
            canvas.removeEventListener('touchend', onTouchEnd);
        };
    }, [color, createParticles]);

    return (
        <div className="relative w-full h-full">
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ touchAction: 'none' }}
            />
        </div>
    );
};

export default MorphingText;
