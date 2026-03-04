export const threeJsCourse = {
    id: "three-js",
    title: "Creative Coding with Three.js",
    description: "Bring the web to life in 3D. Learn Scenes, Cameras, React Three Fiber (R3F), and custom GLSL Vertex & Fragment Shaders.",
    image: "/courses/three_js.png",
    tags: ["Three.js", "WebGL", "GLSL", "React Three Fiber"],
    duration: "40 Chapters",
    level: "Advanced",
    modules: [
        {
            id: "phase1",
            title: "Phase 1: Getting Started in 3D",
            pages: [
                {
                    id: "scene-camera-renderer",
                    title: "The Holy Trinity of 3D",
                    content: `
# Welcome to WebGL

Three.js is a library that drastically simplifies the process of writing raw WebGL (a JavaScript API for rendering high-performance interactive 3D and 2D graphics). 

To render anything in Three.js, you absolutely must have three foundational pillars: **A Scene, a Camera, and a Renderer.**

## 1. The Scene
Think of the scene as an empty universe. It's the container where you will place your objects, lights, and cameras.

\`\`\`javascript
import * as THREE from 'three';
const scene = new THREE.Scene();
\`\`\`

## 2. The Camera
The camera is the "eye". What the camera sees is what gets drawn to the screen. 

\`\`\`javascript
// Parameters: Field of View, Aspect Ratio, Near Clipping, Far Clipping
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Move the camera back 5 units on the Z axis so we can see the center (0,0,0)
camera.position.z = 5; 
\`\`\`

## 3. The Renderer
The renderer acts as the film projector. It calculates everything and paints it onto an HTML \`<canvas>\` element.

\`\`\`javascript
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// Inject the magical canvas into the web page
document.body.appendChild(renderer.domElement);
\`\`\`
                    `
                },
                {
                    id: "meshes-materials",
                    title: "Meshes, Geometries, and Materials",
                    content: `
# Building Objects

An object in Three.js is called a **Mesh**. A Mesh is composed of two things:
1. **Geometry:** The mathematical skeleton/shape (e.g., a sphere, a box).
2. **Material:** The skin that wraps the skeleton (e.g., color, texture, reflectiveness).

## Creating a Spinning Cube

\`\`\`javascript
// 1. Create the Skeleton (Width, Height, Depth)
const geometry = new THREE.BoxGeometry(1, 1, 1);

// 2. Create the Skin (MeshBasicMaterial doesn't require lighting)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// 3. Combine them into a Mesh
const cube = new THREE.Mesh(geometry, material);

// 4. Add the Cube to our Scene
scene.add(cube);
\`\`\`

If we stopped here, we would just see a static green square. To make it a true 3D experience, we need an Animation Loop.

\`\`\`javascript
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube on every frame
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Finally, render the scene through the camera
    renderer.render(scene, camera);
}
// Start the loop!
animate();
\`\`\`
                    `
                }
            ]
        },
        {
            id: "phase2",
            title: "Phase 2: React Three Fiber (R3F)",
            pages: [
                {
                    id: "declarative-3d",
                    title: "Declarative WebGL in React",
                    content: `
# Wrapping Three.js in Components

Writing raw Three.js involves hundreds of lines of imperative setup code. **React Three Fiber (R3F)** is a custom React renderer that allows you to write Three.js using declarative JSX.

Because it is natively React, you get all the benefits of component state, props, hooks, and lifecycle management applied *directly* to 3D meshes!

## The Canvas Element

Instead of manually creating a \`Scene\`, \`Camera\`, and \`Renderer\`, R3F provides a \`<Canvas>\` component that does it all automatically.

\`\`\`tsx
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';

// A Reusable 3D Component!
function InteractiveBox(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef();
  
  // Set up local React state for hover and click events
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // useFrame executes roughly 60 times per second (Replaces requestAnimationFrame)
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta;
  });

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}>
      
      {/* Declarative Geometry & Material */}
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
        <!-- The Canvas automatically builds the WebGL Environment -->
        <Canvas>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <InteractiveBox position={[-1.2, 0, 0]} />
            <InteractiveBox position={[1.2, 0, 0]} />
        </Canvas>
    </div>
  )
}
\`\`\`
                    `
                }
            ]
        },
        {
            id: "phase3",
            title: "Phase 3: The Dark Arts (GLSL Shaders)",
            pages: [
                {
                    id: "intro-shaders",
                    title: "Vertex & Fragment Shaders",
                    content: `
# Taking Control of the GPU

Eventually, standard materials won't be enough. You will want to create a flowing ocean, a liquid lava lamp, or a black hole distortion effect. To do this, you must write **Shaders**.

Shaders are tiny C-like programs written in **GLSL** (Graphics Library Shader Language) that run directly on the user's Graphics Card (GPU), allowing them to calculate millions of pixels in parallel.

## 1. The Vertex Shader
The Vertex Shader's only job is to calculate the final X, Y, Z position of every single vertice in your geometry on the screen.

If you pass a \`time\` uniform variable into the Vertex shader and apply a \`sin()\` wave to the Y coordinates, your mesh will appear to "breathe" or undulate like a flag in the wind.

## 2. The Fragment Shader
Once the vertices are positioned, the Fragment Shader's only job is to determine the exact **color** (R, G, B, A) of every single pixel caught *between* those vertices.

\`\`\`glsl
// A beautiful, glowing Fragment Shader
uniform float uTime;
varying vec2 vUv;

void main() {
    // Generate a color based on the pixel's coordinate and the passing of time
    vec3 color = vec3(
        abs(sin(vUv.x + uTime * 2.0)),
        abs(cos(vUv.y + uTime)),
        0.5
    );
    
    // gl_FragColor is the final output to the screen
    gl_FragColor = vec4(color, 1.0);
}
\`\`\`
                    `
                }
            ]
        },
        {
            id: "project",
            title: "Capstone: The Shader Portfolio",
            pages: [
                {
                    id: "shader-spec",
                    title: "Milestone: Raymarching Engine",
                    content: `
# Raw Mathematics

You will build a full-screen, high-performance visual experience using a \`ShaderMaterial\`.

## Requirements
1. **React Three Fiber:** Setup an R3F \`<Canvas>\` with a single, massive \`<planeGeometry>\` that stretches across the entire screen.
2. **Uniforms Integration:** Write a \`useFrame\` loop that passes the \`mouse\` coordinates and a constantly incrementing \`time\` delta straight into your Custom Shader Material's \`uniforms\` object.
3. **The Fragment Shader:** Write a complex Fragment shader that utilizes Perlin Noise to generate a dynamic, glowing, liquid-like background that reacts and ripples when the user moves their mouse.
                    `
                }
            ]
        }
    ]
};
