import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree, createPortal } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture, useFBO } from '@react-three/drei';

import simVertex from '../../shaders/fluid/simVertex.glsl?raw';
import simFragment from '../../shaders/fluid/simFragment.glsl?raw';
import renderVertex from '../../shaders/liquid/vertex.glsl?raw';
import renderFragment from '../../shaders/liquid/fragment.glsl?raw';

const LiquidEffect = () => {
    const { size, gl, pointer } = useThree();
    const mesh = useRef();

    // Simulation Render Targets (Ping-Pong)
    // We need FloatType for precision if possible, or HalfFloat
    const simProps = useMemo(() => ({
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.HalfFloatType,
    }), []);

    const targetA = useFBO(128, 128, simProps); // Lower res for simulation is often fine/faster
    const targetB = useFBO(128, 128, simProps);

    // Simulation Material
    const simMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: null },
                uMouse: { value: new THREE.Vector2(0.5, 0.5) },
                uAspect: { value: size.width / size.height },
                uVelocity: { value: 0.5 },
                uViscosity: { value: 0.98 }
            },
            vertexShader: simVertex,
            fragmentShader: simFragment
        });
    }, [size]);

    // Scene for Simulation (Just a full-screen quad)
    const simScene = useMemo(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const geometry = new THREE.PlaneGeometry(2, 2);
        const quad = new THREE.Mesh(geometry, simMaterial);
        scene.add(quad);
        return { scene, camera, quad };
    }, [simMaterial]);

    // Render Material (The main visible quad)
    // Needs a dummy texture for now or load the background
    // Let's assume we pass no texture and just show the fluid debug for now, 
    // OR we load a noise/image. Let's load the Sagar Image or a dark gradient.
    const renderMaterial = useRef();

    useFrame((state, delta) => {
        // Swap targets
        const currentTarget = targetA;
        const nextTarget = targetB;

        // Update Mouse Uniforms
        // Pointer is -1 to 1. Convert to 0 to 1.
        const uvMouse = new THREE.Vector2(
            (pointer.x + 1) / 2,
            (pointer.y + 1) / 2
        );
        simMaterial.uniforms.uMouse.value.copy(uvMouse);
        simMaterial.uniforms.uTexture.value = currentTarget.texture;

        // Render Simulation
        gl.setRenderTarget(nextTarget);
        gl.render(simScene.scene, simScene.camera);
        gl.setRenderTarget(null);

        // Update Render Material
        if (renderMaterial.current) {
            renderMaterial.current.uniforms.uDataTexture.value = nextTarget.texture;
        }

        // Swap logic for next frame (manual swap not needed if we just use A and B logic, 
        // wait, we need to feed B back into A? 
        // We need to keep a ref to "input" and "output".
    });

    // Improved Ping-Pong Logic with Refs
    const targets = useRef({ in: targetA, out: targetB });
    useFrame(() => {
        // Swap
        const temp = targets.current.in;
        targets.current.in = targets.current.out;
        targets.current.out = temp;

        // Update inputs
        simMaterial.uniforms.uTexture.value = targets.current.in.texture;
        const uvMouse = new THREE.Vector2((pointer.x + 1) / 2, (pointer.y + 1) / 2);
        simMaterial.uniforms.uMouse.value.copy(uvMouse);

        // Render to Output
        gl.setRenderTarget(targets.current.out);
        gl.render(simScene.scene, simScene.camera);
        gl.setRenderTarget(null);

        // Feed Output to Visual Mesh
        if (renderMaterial.current) {
            renderMaterial.current.uniforms.uDataTexture.value = targets.current.out.texture;
        }
    });

    // Load background texture
    const bgTexture = useTexture('/images/sagar.png'); // Assuming public path

    // Fix aspect ratio
    const imageAspect = 16 / 9; // Placeholder aspect
    const scale = useMemo(() => {
        const screenAspect = size.width / size.height;
        if (screenAspect > imageAspect) {
            return [size.width, size.width / imageAspect, 1];
        } else {
            return [size.height * imageAspect, size.height, 1];
        }
    }, [size, imageAspect]);

    return (
        <mesh scale={scale}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                ref={renderMaterial}
                vertexShader={renderVertex}
                fragmentShader={renderFragment}
                uniforms={{
                    uTexture: { value: bgTexture },
                    uDataTexture: { value: null },
                    uAberrationIntensity: { value: 0.02 }
                }}
                transparent={true}
                blending={THREE.NormalBlending}
            />
        </mesh>
    );
};

export default LiquidEffect;
