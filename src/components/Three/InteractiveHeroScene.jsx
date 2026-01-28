import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Text, Environment, Lightformer, ContactShadows } from '@react-three/drei';
import { easing } from 'maath';

const SkillItem = ({ position, text, color }) => {
    const mesh = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.lookAt(state.camera.position);
        }
    });

    return (
        <group position={position} ref={mesh}>
            <Text
                fontSize={0.2}
                color={hovered ? color : "white"}
                anchorX="center"
                anchorY="middle"
                onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
                onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
            >
                {text}
            </Text>
        </group>
    );
};

const OrbitingSkills = ({ radius = 2.0, activeColor }) => {
    const group = useRef();
    const skills = ['React', 'Three.js', 'Next.js', 'GSAP', 'WebGL', 'Tailwind', 'Node.js', 'Figma'];

    useFrame((state, delta) => {
        if (group.current) {
            group.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <group ref={group}>
            {skills.map((skill, i) => {
                const angle = (i / skills.length) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                return <SkillItem key={skill} position={[x, 0, z]} text={skill} color={activeColor} />;
            })}
        </group>
    );
};

const InteractiveHeroScene = ({ config, setConfig }) => {
    const brainRef = useRef();

    useFrame((state, delta) => {
        if (brainRef.current) {
            // Smooth look-at mouse
            const x = (state.pointer.x * Math.PI) / 10;
            const y = (state.pointer.y * Math.PI) / 10;
            easing.dampE(brainRef.current.rotation, [y, x, 0], 0.25, delta);

            // Simple scale pulse
            const pulse = 1 + Math.sin(state.clock.elapsedTime * config.speed) * 0.05;
            brainRef.current.scale.setScalar(pulse);
        }
    });

    return (
        <group scale={0.8}>
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={2.5} color={config.color} />
            <pointLight position={[-10, -10, -10]} intensity={1.5} color="blue" />

            {/* Real 3D Blob with Distortion */}
            <Float speed={config.speed} rotationIntensity={1} floatIntensity={1}>
                <mesh
                    ref={brainRef}
                    onClick={() => setConfig({ ...config, speed: config.speed > 5 ? 2 : 8 })}
                    onPointerOver={() => document.body.style.cursor = 'pointer'}
                    onPointerOut={() => document.body.style.cursor = 'auto'}
                >
                    <sphereGeometry args={[1, 64, 64]} />
                    <MeshDistortMaterial
                        color={config.color}
                        envMapIntensity={1}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                        metalness={0.1}
                        distort={config.distort}
                        speed={config.speed}
                    />
                </mesh>
            </Float>

            <OrbitingSkills radius={2.2} activeColor={config.color} />
            <ContactShadows resolution={512} scale={20} blur={2} opacity={0.8} far={10} color="#000000" />
        </group>
    );
};

export default InteractiveHeroScene;
