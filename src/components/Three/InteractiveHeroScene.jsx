import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Text, ContactShadows } from '@react-three/drei';
import { easing } from 'maath';

// ── Skill text item — bold, 3D-depth via layered text, no pill/border ─────────
const SkillItem = ({ position, text, activeColor }) => {
    const groupRef = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.lookAt(state.camera.position);
    });

    const mainColor  = hovered ? '#ffffff' : activeColor;
    const shadowBias = 0.025;

    return (
        <group
            ref={groupRef}
            position={position}
            onPointerOver={() => { setHovered(true);  document.body.style.cursor = 'pointer'; }}
            onPointerOut={() =>  { setHovered(false); document.body.style.cursor = 'auto';    }}
        >
            {/* Dark shadow layer — gives 3D depth illusion */}
            <Text
                fontSize={0.21}
                color="#000000"
                fillOpacity={0.55}
                anchorX="center"
                anchorY="middle"
                position={[shadowBias, -shadowBias, -0.03]}
                outlineWidth={0}
            >
                {text}
            </Text>

            {/* Mid glow layer — soft colored halo */}
            <Text
                fontSize={0.215}
                color={activeColor}
                fillOpacity={hovered ? 0.35 : 0.18}
                anchorX="center"
                anchorY="middle"
                position={[0, 0, -0.01]}
            >
                {text}
            </Text>

            {/* Main text — crisp, bold-looking via slightly larger size */}
            <Text
                fontSize={0.205}
                color={mainColor}
                anchorX="center"
                anchorY="middle"
                position={[0, 0, 0]}
                outlineWidth={hovered ? 0 : 0.004}
                outlineColor="#000000"
                outlineOpacity={0.4}
                letterSpacing={0.04}
            >
                {text}
            </Text>
        </group>
    );
};

// ── Orbiting ring of skill items ─────────────────────────────────────────────
const OrbitingSkills = ({ radius = 2.5, activeColor }) => {
    const groupRef = useRef();
    const skills = ['React', 'Three.js', 'Next.js', 'GSAP', 'WebGL', 'Tailwind', 'Node.js', 'Figma'];

    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.055;
        }
    });

    return (
        <group ref={groupRef} rotation={[0.18, 0, 0]}>
            {skills.map((skill, i) => {
                const angle = (i / skills.length) * Math.PI * 2;
                return (
                    <SkillItem
                        key={skill}
                        position={[
                            Math.cos(angle) * radius,
                            Math.sin(angle * 0.5) * 0.45,
                            Math.sin(angle) * radius,
                        ]}
                        text={skill}
                        activeColor={activeColor}
                    />
                );
            })}
        </group>
    );
};

// ── Central hero blob ────────────────────────────────────────────────────────
const InteractiveHeroScene = ({ config, setConfig, isDesktop = true }) => {
    const brainRef = useRef();

    useFrame((state, delta) => {
        if (!brainRef.current) return;
        const x = (state.pointer.x * Math.PI) / 8;
        const y = (state.pointer.y * Math.PI) / 8;
        easing.dampE(brainRef.current.rotation, [y, x, 0], 0.22, delta);
        const pulse = 1 + Math.sin(state.clock.elapsedTime * config.speed) * 0.04;
        brainRef.current.scale.setScalar(pulse);
    });

    return (
        <group scale={isDesktop ? 1.05 * 0.7 : 1.05}>
            <ambientLight intensity={1.2} />
            <pointLight position={[8, 8, 8]}   intensity={3}   color={config.color} />
            <pointLight position={[-8, -8, -8]} intensity={1.5} color="#2244ff"      />
            <pointLight position={[0, 8, -8]}   intensity={1}   color={config.color} />

            <Float speed={config.speed} rotationIntensity={0.8} floatIntensity={0.6}>
                <mesh
                    ref={brainRef}
                    onClick={() => setConfig({ ...config, speed: config.speed > 5 ? 2 : 8 })}
                    onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
                    onPointerOut={() =>  { document.body.style.cursor = 'auto';    }}
                >
                    <sphereGeometry args={[1.1, 80, 80]} />
                    <MeshDistortMaterial
                        color={config.color}
                        envMapIntensity={1.2}
                        clearcoat={1}
                        clearcoatRoughness={0.05}
                        metalness={0.15}
                        distort={config.distort}
                        speed={config.speed}
                    />
                </mesh>
            </Float>

            <OrbitingSkills radius={2.5} activeColor={config.color} />

            <ContactShadows resolution={512} scale={16} blur={2.5} opacity={0.6} far={8} color="#000" />
        </group>
    );
};

export default InteractiveHeroScene;
