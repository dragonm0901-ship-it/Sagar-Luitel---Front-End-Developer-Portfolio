import React, { useRef, useEffect, useCallback } from 'react';

const ConstellationCanvas = ({ themeColor = '#ccff00' }) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const mouseRef = useRef({ x: -9999, y: -9999, active: false });
    const particlesRef = useRef([]);
    const dimensionsRef = useRef({ w: 0, h: 0 });
    const shockwavesRef = useRef([]);

    const PARTICLE_COUNT = 180;
    const CONNECTION_DISTANCE = 170;
    const MOUSE_RADIUS = 100;
    const MOUSE_FORCE = 0.05;

    const initParticles = useCallback((width, height) => {
        const particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 1.5 + 0.5,
                baseRadius: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.3,
                pulsePhase: Math.random() * Math.PI * 2,
            });
        }
        particlesRef.current = particles;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let dpr = window.devicePixelRatio || 1;

        const resize = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            dimensionsRef.current = { w: rect.width, h: rect.height };
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            if (particlesRef.current.length === 0) {
                initParticles(rect.width, rect.height);
            }
        };

        resize();
        window.addEventListener('resize', resize);

        // Parse theme color to RGB for drawing
        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            } : { r: 204, g: 255, b: 0 };
        };

        const rgb = hexToRgb(themeColor);

        const animate = () => {
            const { w, h } = dimensionsRef.current;
            const particles = particlesRef.current;
            const mouse = mouseRef.current;
            const shockwaves = shockwavesRef.current;

            ctx.clearRect(0, 0, w, h);

            // Update shockwaves
            for (let s = shockwaves.length - 1; s >= 0; s--) {
                const sw = shockwaves[s];
                sw.radius += sw.speed;
                sw.opacity -= 0.012;
                if (sw.opacity <= 0) {
                    shockwaves.splice(s, 1);
                    continue;
                }

                // Draw shockwave ring
                ctx.beginPath();
                ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${sw.opacity * 0.4})`;
                ctx.lineWidth = 2;
                ctx.stroke();

                // Push particles outward from shockwave ring
                for (let i = 0; i < particles.length; i++) {
                    const p = particles[i];
                    const dx = p.x - sw.x;
                    const dy = p.y - sw.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const ringDist = Math.abs(dist - sw.radius);

                    if (ringDist < 40 && dist > 0) {
                        const force = (40 - ringDist) / 40 * sw.force;
                        p.vx += (dx / dist) * force;
                        p.vy += (dy / dist) * force;
                    }
                }
            }

            // Update particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                // Gentle pulse
                p.pulsePhase += 0.02;

                // Mouse gravity
                if (mouse.active) {
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < MOUSE_RADIUS) {
                        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                        p.vx += (dx / dist) * force * MOUSE_FORCE;
                        p.vy += (dy / dist) * force * MOUSE_FORCE;
                        // Glow up near mouse
                        p.radius = p.baseRadius + force * 3;
                    } else {
                        p.radius += (p.baseRadius - p.radius) * 0.05;
                    }
                } else {
                    p.radius += (p.baseRadius - p.radius) * 0.05;
                }

                // Apply velocity with friction
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.985;
                p.vy *= 0.985;

                // Bounce off edges with soft wrap
                if (p.x < 0) { p.x = 0; p.vx *= -0.8; }
                if (p.x > w) { p.x = w; p.vx *= -0.8; }
                if (p.y < 0) { p.y = 0; p.vy *= -0.8; }
                if (p.y > h) { p.y = h; p.vy *= -0.8; }
            }

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONNECTION_DISTANCE) {
                        const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.35;

                        // Check if either particle is near mouse for colored lines
                        let isNearMouse = false;
                        if (mouse.active) {
                            const d1 = Math.sqrt((mouse.x - particles[i].x) ** 2 + (mouse.y - particles[i].y) ** 2);
                            const d2 = Math.sqrt((mouse.x - particles[j].x) ** 2 + (mouse.y - particles[j].y) ** 2);
                            isNearMouse = d1 < MOUSE_RADIUS || d2 < MOUSE_RADIUS;
                        }

                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);

                        if (isNearMouse) {
                            ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 1.5})`;
                            ctx.lineWidth = 0.8;
                        } else {
                            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
                            ctx.lineWidth = 0.4;
                        }
                        ctx.stroke();
                    }
                }
            }

            // Draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                const pulse = Math.sin(p.pulsePhase) * 0.15;

                // Check if near mouse for glow
                let mouseProximity = 0;
                if (mouse.active) {
                    const d = Math.sqrt((mouse.x - p.x) ** 2 + (mouse.y - p.y) ** 2);
                    if (d < MOUSE_RADIUS) {
                        mouseProximity = 1 - d / MOUSE_RADIUS;
                    }
                }

                const drawRadius = p.radius + pulse;

                ctx.beginPath();
                ctx.arc(p.x, p.y, drawRadius, 0, Math.PI * 2);

                if (mouseProximity > 0) {
                    // Glowing theme-colored dot near mouse
                    ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.opacity + mouseProximity * 0.5})`;
                    ctx.shadowColor = themeColor;
                    ctx.shadowBlur = 8 + mouseProximity * 16;
                } else {
                    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity + pulse * 0.3})`;
                    ctx.shadowColor = 'transparent';
                    ctx.shadowBlur = 0;
                }
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            animationRef.current = requestAnimationFrame(animate);
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
        const onClick = (e) => {
            const rect = canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;

            // Create shockwave
            shockwavesRef.current.push({
                x: mx,
                y: my,
                radius: 0,
                speed: 4,
                opacity: 1,
                force: 0.8,
            });

            // Also do the existing explosion push
            const particles = particlesRef.current;
            for (let i = 0; i < particles.length; i++) {
                const dx = particles[i].x - mx;
                const dy = particles[i].y - my;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MOUSE_RADIUS * 2 && dist > 0) {
                    const force = (MOUSE_RADIUS * 2 - dist) / (MOUSE_RADIUS * 2);
                    particles[i].vx += (dx / dist) * force * 6;
                    particles[i].vy += (dy / dist) * force * 6;
                }
            }
        };

        // Touch handlers
        const onTouchMove = (e) => {
            const touch = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top, active: true };
        };
        const onTouchEnd = () => {
            mouseRef.current = { ...mouseRef.current, active: false };
        };
        const onTouchStart = (e) => {
            // Trigger shockwave on tap
            const touch = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            const mx = touch.clientX - rect.left;
            const my = touch.clientY - rect.top;
            mouseRef.current = { x: mx, y: my, active: true };

            shockwavesRef.current.push({
                x: mx,
                y: my,
                radius: 0,
                speed: 3.5,
                opacity: 0.8,
                force: 0.6,
            });
        };

        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mouseleave', onMouseLeave);
        canvas.addEventListener('click', onClick);
        canvas.addEventListener('touchstart', onTouchStart, { passive: true });
        canvas.addEventListener('touchmove', onTouchMove, { passive: true });
        canvas.addEventListener('touchend', onTouchEnd);

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', onMouseMove);
            canvas.removeEventListener('mouseleave', onMouseLeave);
            canvas.removeEventListener('click', onClick);
            canvas.removeEventListener('touchstart', onTouchStart);
            canvas.removeEventListener('touchmove', onTouchMove);
            canvas.removeEventListener('touchend', onTouchEnd);
        };
    }, [themeColor, initParticles]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-[1]"
            style={{ touchAction: 'pan-y' }}
        />
    );
};

export default ConstellationCanvas;
