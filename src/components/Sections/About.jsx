import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, ContactShadows, Image, Environment, RoundedBox, OrbitControls } from '@react-three/drei';
import { motion, useScroll } from 'framer-motion';
import * as THREE from 'three';
import { easing } from 'maath';
import gsap from 'gsap';

const IconCard = ({ url, position, isSpinning }) => {
    const group = useRef();
    const [hovered, setHover] = useState(false);

    useFrame((state, delta) => {
        if (!group.current) return;

        // Always face the camera (Billboard behavior)
        group.current.quaternion.copy(state.camera.quaternion);

        // Smoothly move to target position
        easing.damp3(group.current.position, position, 0.4, delta);

        // Hover Effect (only if not spinning fast)
        const scale = hovered && !isSpinning ? 1.2 : 1;
        easing.damp3(group.current.scale, [scale, scale, scale], 0.2, delta);
    });

    return (
        <group
            ref={group}
            onPointerOver={() => { setHover(true); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto'; }}
        >
            <Float speed={5} rotationIntensity={0} floatIntensity={1} floatingRange={[-0.1, 0.1]}>
                {/* Rounded Glass Card */}
                <RoundedBox args={[0.85, 0.85, 0.1]} radius={0.15} smoothness={4} position={[0, 0, -0.05]}>
                    <meshPhysicalMaterial
                        color="#101010"
                        roughness={0.2}
                        metalness={0.8}
                        transparent
                        opacity={0.8}
                        side={THREE.DoubleSide}
                    />
                </RoundedBox>

                {/* The Icon */}
                <Image
                    url={url}
                    transparent
                    scale={[0.6, 0.6, 1]}
                    position={[0, 0, 0.06]}
                    toneMapped={false}
                />
            </Float>
        </group>
    );
};

const InteractiveScene = ({ stack }) => {
    // State to track shuffled order of icons
    const [orderedStack, setOrderedStack] = useState(stack);
    const [isSpinning, setIsSpinning] = useState(false);
    const groupRef = useRef();

    // Constant Circular Layout
    const getCirclePos = (i, total) => {
        const theta = (i / total) * Math.PI * 2;
        return [Math.cos(theta) * 2.2, Math.sin(theta) * 2.2, 0];
    };

    const handleSpin = () => {
        if (isSpinning || !groupRef.current) return;
        setIsSpinning(true);

        // 1. Animate Rotation (Spin 2 times = 720deg + random overshoot for chaos feeling)
        gsap.to(groupRef.current.rotation, {
            z: groupRef.current.rotation.z + Math.PI * 4, // 2 full circles
            duration: 1.5,
            ease: "circ.inOut",
            onComplete: () => {
                setIsSpinning(false);
            }
        });

        // 2. Shuffle Positions Halfway through (visual trick)
        setTimeout(() => {
            const shuffled = [...orderedStack].sort(() => Math.random() - 0.5);
            setOrderedStack(shuffled);
        }, 300);
    };

    return (
        <>
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={true}
                autoRotate={!isSpinning} // Gentle rotate when idle
                autoRotateSpeed={0.5}
            />

            <group ref={groupRef} onClick={(e) => { e.stopPropagation(); handleSpin(); }}>
                {orderedStack.map((tech, i) => (
                    <IconCard
                        key={tech.name} // Use name as key to let React animate positions if desired, or index for swap
                        url={tech.url}
                        position={getCirclePos(i, orderedStack.length)}
                        isSpinning={isSpinning}
                    />
                ))}
            </group>
        </>
    );
};

const About = () => {
    const containerRef = useRef();

    // Scroll Animations
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const stack = [
        { name: 'HTML',         url: '/icons/html.svg' },
        { name: 'CSS',          url: '/icons/css.svg' },
        { name: 'React',        url: '/icons/react.svg' },
        { name: 'Three.js',     url: '/icons/threejs.svg' },
        { name: 'Node.js',      url: '/icons/nodejs.svg' },
        { name: 'Figma',        url: '/icons/figma.svg' },
        { name: 'GSAP',         url: '/icons/gsap.svg' },
        { name: 'Tailwind CSS', url: '/icons/tailwind.svg' },
        { name: 'Lenis',        url: '/icons/lenis.svg' },
    ];

    return (
        <section id="about" ref={containerRef} className="min-h-screen relative bg-zinc-950 py-20 overflow-hidden">

            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lime/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

                {/* Left: Text Content */}
                <div className="space-y-10 order-2 md:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6">
                            ABOUT <span className="text-lime text-stroke-black">ME.</span>
                        </h2>
                        <div className="space-y-6 text-xl text-gray-400 font-light leading-relaxed">
                            <p>
                                I am <span className="text-white font-bold">Sagar Luitel</span>, a Frontend Developer obsessed with the <span className="text-lime">intersection of design and code</span>.
                            </p>
                            <p>
                                My philosophy is simple: Digital experiences should feel <span className="italic text-white">alive</span>. They should respond, breathe, and captivate.
                            </p>
                        </div>

                        <div className="mt-8 flex items-center gap-2 text-lime/50 text-sm font-mono animate-pulse">
                            <span className="w-2 h-2 bg-lime rounded-full"></span>
                            Try clicking the icons to shape-shift!
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 border border-white/10 bg-white/5 rounded-2xl hover:border-lime/50 transition-colors group">
                            <h3 className="text-4xl font-bold text-white mb-2 group-hover:text-lime transition-colors">2+</h3>
                            <p className="text-sm text-gray-500 uppercase tracking-wider">Years Experience</p>
                        </div>
                        <div className="p-6 border border-white/10 bg-white/5 rounded-2xl hover:border-lime/50 transition-colors group">
                            <h3 className="text-4xl font-bold text-white mb-2 group-hover:text-lime transition-colors">20+</h3>
                            <p className="text-sm text-gray-500 uppercase tracking-wider">Projects Shipped</p>
                        </div>
                    </div>
                </div>

                {/* Right: 3D Skills Floating Scene */}
                <div className="h-[60vh] w-full relative order-1 md:order-2">
                    <Canvas camera={{ position: [0, 0, 7], fov: 50 }}> {/* Increased FOV/Camera distance to avoid cropping */}
                        <ambientLight intensity={1} />
                        <pointLight position={[10, 10, 10]} intensity={1.5} />
                        <Environment preset="city" />

                        <InteractiveScene stack={stack} />

                        <ContactShadows opacity={0.4} scale={20} blur={2.5} far={4} resolution={256} color="#000000" />
                    </Canvas>
                </div>

            </div>
        </section>
    );
};

export default About;
