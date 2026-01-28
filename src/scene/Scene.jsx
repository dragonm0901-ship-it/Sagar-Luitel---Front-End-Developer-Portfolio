import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import LiquidEffect from '../components/Effects/LiquidEffect';
import FallingMeshes from './FallingMeshes';

const Scene = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <Environment preset="city" />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />

                    {/* Background Fluid Effect (on a plane at z=0 or behind) */}
                    {/* <group position={[0, 0, -2]}>
                        <LiquidEffect />
                    </group> */}

                    {/* Foreground Falling Objects */}
                    <FallingMeshes />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Scene;
