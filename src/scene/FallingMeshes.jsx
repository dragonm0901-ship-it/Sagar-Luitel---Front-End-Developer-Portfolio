import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF, Clone } from '@react-three/drei';

const COUNT = 10;
const SPACING = 4;

const FallingMeshes = ({ modelPath = "/models/helmet.glb" }) => {
    const group = useRef();

    // Load the GLB model
    const { scene } = useGLTF(modelPath);

    // Animation Loop - Infinite Fall
    useFrame((state, delta) => {
        if (group.current) {
            group.current.children.forEach((child, i) => {
                child.position.y -= delta * 1.5; // Slightly faster fall
                child.rotation.x += delta * 0.5;
                child.rotation.y += delta * 0.2;

                // Reset if too low
                const threshold = -SPACING * 2;
                if (child.position.y < threshold) {
                    child.position.y += COUNT * SPACING;
                }
            });
        }
    });

    // Create instances positions
    const positions = useMemo(() => {
        return new Array(COUNT).fill(0).map((_, i) => {
            // Offsets to make it look scattered
            const x = (Math.random() - 0.5) * 4;
            const z = (Math.random() - 0.5) * 2;
            return [x, (i - 2) * SPACING, z];
        })
    }, []);

    return (
        <group ref={group}>
            {positions.map((pos, i) => (
                <group key={i} position={pos}>
                    {/* Clone the loaded scene for each instance */}
                    {/* Scale it appropriately */}
                    <Clone object={scene} scale={0.5} />
                    {/* Add a Lime Green Wireframe overlay if we want that specific aesthetic mixed with the real model */}
                    {/* Or just let the model be itself. User said "helmet 3D model is not visible" so maybe they want the real textured model + wireframe? */}
                    {/* Let's stick to the real model first as requested, maybe add a wireframe mesh around it? */}
                    {/* For now, just the model. */}
                </group>
            ))}
        </group>
    );
};

export default FallingMeshes;
