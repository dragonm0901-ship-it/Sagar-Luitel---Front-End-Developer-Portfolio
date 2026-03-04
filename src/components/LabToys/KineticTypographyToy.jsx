import React, { useRef, useEffect } from 'react';

const KineticTypographyToy = ({ themeColor = "#00ffcc" }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        let width, height;
        let particles = [];
        let mouse = { x: -1000, y: -1000, radius: 100 };

        const rgbStr = themeColor.startsWith('#') 
            ? parseInt(themeColor.slice(1), 16) 
            : 0x00ffcc;
        
        const r = (rgbStr >> 16) & 255;
        const g = (rgbStr >> 8) & 255;
        const b = rgbStr & 255;

        const init = () => {
            width = canvasRef.current.parentElement.clientWidth;
            height = canvasRef.current.parentElement.clientHeight;
            canvas.width = width;
            canvas.height = height;

            ctx.fillStyle = 'white';
            ctx.font = `bold ${Math.min(width / 4, 150)}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('CODE', width / 2, height / 2);

            const textCoordinates = ctx.getImageData(0, 0, width, height);
            ctx.clearRect(0, 0, width, height);

            particles = [];
            
            // Create particles based on pixel data
            // Step size determines density (higher = sparse)
            const gap = 6; 
            for (let y = 0, y2 = textCoordinates.height; y < y2; y += gap) {
                for (let x = 0, x2 = textCoordinates.width; x < x2; x += gap) {
                    if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                        let positionX = x;
                        let positionY = y;
                        particles.push(new Particle(positionX, positionY));
                    }
                }
            }
        };

        class Particle {
            constructor(x, y) {
                this.x = x + Math.random() * 200 - 100; // Start scattered
                this.y = y + Math.random() * 200 - 100;
                this.size = Math.random() * 2 + 1;
                this.baseX = x;
                this.baseY = y;
                this.density = (Math.random() * 30) + 1;
                this.color = `rgba(${r},${g},${b},${Math.random() * 0.5 + 0.5})`;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                // Mouse interaction physics
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                let forceDirectionX = dx / distance || 0;
                let forceDirectionY = dy / distance || 0;
                
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;

                // If mouse is near, push away
                if (distance < mouse.radius) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    // Else, spring back to base position
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                }
            }
        }

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        let animationId;
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].draw();
                particles[i].update();
            }
            
            animationId = requestAnimationFrame(animate);
        };

        init();
        animate();

        window.addEventListener('resize', init);

        return () => {
            window.removeEventListener('resize', init);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationId);
        };
    }, [themeColor]);

    return (
        <div className="w-full h-full bg-[#050508] relative flex items-center justify-center">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />
            <div className="absolute bottom-6 left-6 pointer-events-none p-4 w-full text-center">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#ffffff60] bg-black/50 p-2 px-4 rounded-full backdrop-blur inline-block border border-white/5">
                    Move cursor near text to displace particles
                </p>
            </div>
        </div>
    );
};

export const kineticCodeSnippet = `// HTML5 Canvas implementation of Kinetic Particle Text
let particles = [];

// 1. Render text to hidden canvas & extract ImageData
ctx.fillText('CODE', width / 2, height / 2);
const textCoords = ctx.getImageData(0, 0, width, height);

// 2. Iterate pixels and create particles where alpha > 0
for (let y = 0; y < textCoords.height; y += gap) {
    for (let x = 0; x < textCoords.width; x += gap) {
        if (textCoords.data[(y * 4 * textCoords.width) + (x * 4) + 3] > 128) {
            particles.push(new Particle(x, y));
        }
    }
}

// 3. Particle update loop with Spring Physics + Mouse Repulsion
update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < mouse.radius) {
        // Push particle away from mouse
        let force = (mouse.radius - distance) / mouse.radius;
        this.x -= (dx / distance) * force * this.density;
        this.y -= (dy / distance) * force * this.density;
    } else {
        // Spring back to original base position
        this.x -= (this.x - this.baseX) / 10;
        this.y -= (this.y - this.baseY) / 10;
    }
}`;

export default KineticTypographyToy;
