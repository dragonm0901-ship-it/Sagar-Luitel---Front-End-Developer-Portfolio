import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const WebGLGlitchTransition = ({ color, onComplete }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // Parse color
        const baseColor = new THREE.Color(color);

        // Uniforms for shaders
        const uniforms = {
            u_time: { value: 0 },
            u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            u_progress: { value: 0 }, // 0 to 1
            u_color: { value: new THREE.Vector3(baseColor.r, baseColor.g, baseColor.b) },
            u_texture: { value: null } // We could pass a screenshot here, but procedural is faster
        };

        // Screen filling quad
        const geometry = new THREE.PlaneGeometry(2, 2);
        
        // --- Glitch Displacement Shader ---
        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float u_time;
                uniform vec2 u_resolution;
                uniform float u_progress;
                uniform vec3 u_color;
                
                varying vec2 vUv;

                // Value Noise by Inigo Quilez
                float hash(vec2 p) {
                    p = fract(p * vec2(111.34, 435.145));
                    p += dot(p, p + 34.23);
                    return fract(p.x * p.y);
                }

                float noise(in vec2 x) {
                    vec2 p = floor(x);
                    vec2 f = fract(x);
                    f = f * f * (3.0 - 2.0 * f);
                    float res = mix(mix(hash(p + vec2(0.0, 0.0)), hash(p + vec2(1.0, 0.0)), f.x),
                                    mix(hash(p + vec2(0.0, 1.0)), hash(p + vec2(1.0, 1.0)), f.x), f.y);
                    return res;
                }

                void main() {
                    vec2 uv = vUv;
                    
                    // Base background (dark)
                    vec3 col = vec3(0.03, 0.03, 0.04);
                    
                    // Create digital blocky sections for glitch
                    vec2 block = floor(uv * vec2(20.0, 30.0));
                    vec2 block_uv = fract(uv * vec2(20.0, 30.0));
                    
                    // Fast changing noise based on time
                    float n = noise(block * 2.5 + u_time * 5.0);
                    
                    // Calculate intensity based on progress (peaks at 0.5)
                    float intensity = sin(u_progress * 3.14159);
                    
                    // Glitch displacement logic
                    float threshold = 0.8 - (intensity * 0.5);
                    if (n > threshold && u_progress > 0.0 && u_progress < 1.0) {
                        // Glitch activated in this block
                        
                        // Shift UVs
                        vec2 shift = vec2(noise(vec2(u_time, block.y)) - 0.5, 0.0) * intensity * 0.2;
                        uv += shift;
                        
                        // Add chromatic aberration / theme color flashes
                        if (hash(block + u_time) > 0.5) {
                            col = u_color * (0.5 + intensity * 0.5);
                        } else {
                            col = vec3(1.0) * intensity * 0.3; // white flash
                        }
                    }

                    // Iris/Circle close effect mapped to progress
                    // u_progress goes 0 -> 1.
                    // Radius goes from 1.5 (fully open) to 0.0 (closed)
                    float radius = mix(1.5, 0.0, u_progress);
                    
                    // Aspect ratio correction for perfect circle
                    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
                    vec2 centerUv = (uv - 0.5) * aspect;
                    
                    float dist = length(centerUv);
                    
                    // Sharp circle math
                    float circleEdge = smoothstep(radius, radius - 0.01, dist);
                    
                    // Combine glitch background with the closing circle
                    // If we are outside the circle, it is solid bg color (from MainLayout transition)
                    // If inside, we might see the glitches
                    
                    // Actually, let's reverse it: The transition IS the overlay closing in.
                    // The old CinematicTransition scaled from circle 120% to 0%.
                    // Here: circleEdge = 1 if inside the radius to KEEP visible, 0 if outside.
                    // Since it's an overlay covering the screen, we want it to START invisible (radius 0),
                    // and GROW to cover everything (radius 1.5)? 
                    // Wait, CinematicTransition was initial radius 120% (fully covering), then animates to 0% (revealing the site).
                    // So u_progress 0 -> 1 should scale radius from 1.5 -> 0.
                    
                    float alpha = 1.0 - circleEdge; // Inside the circle is transparent, outside is opaque
                    
                    // Apply theme color gradient to the opaque part
                    if (alpha > 0.0) {
                         // A radial gradient from theme color to dark
                         float ringDist = dist - radius;
                         float glow = exp(-ringDist * 4.0);
                         vec3 finishCol = mix(vec3(0.03, 0.03, 0.04), u_color * 0.8, glow);
                         
                         // Add the glitch blocks onto the covering solid part
                         finishCol = mix(finishCol, col, intensity * 0.5);
                         
                         gl_FragColor = vec4(finishCol, alpha);
                    } else {
                         // Apply slight glitch chromatic to the transparent part too when intense
                         gl_FragColor = vec4(col * intensity * 0.2, intensity * 0.1); 
                    }
                }
            `,
            transparent: true,
            depthWrite: false
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Animation loop
        let animationFrameId;
        const startTime = performance.now();
        const duration = 1200; // 1.2s transition

        const render = () => {
            const currentTime = performance.now();
            const elapsed = currentTime - startTime;
            
            uniforms.u_time.value = elapsed / 1000.0;
            
            // Calculate progress (0 to 1) with slight easing
            let progress = Math.min(elapsed / duration, 1.0);
            
            // Easing function (cubicOut mapping roughly)
            const f = progress - 1.0;
            const easedProgress = f * f * f + 1.0;
            
            uniforms.u_progress.value = easedProgress;

            renderer.render(scene, camera);

            if (progress < 1.0) {
                animationFrameId = requestAnimationFrame(render);
            } else {
                // Done
                if(onComplete) onComplete();
                // Keep rendering final state just in case it takes a tick to unmount
                renderer.render(scene, camera);
            }
        };

        render();

        // Handle resize
        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            if (containerRef.current && renderer.domElement) {
                 containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    }, [color, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.9 }} // Fade out the canvas at the very end
            className="fixed inset-0 pointer-events-none z-[45]"
            ref={containerRef}
        />
    );
};

export default WebGLGlitchTransition;
