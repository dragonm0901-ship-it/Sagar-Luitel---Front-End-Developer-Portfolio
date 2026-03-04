export const threeJs = {
    id: "three-js",
    title: "Three.js Creative Coding: The 20-Phase Epic",
    description: "Build immersive, GPU-accelerated 3D worlds. Master the WebGL renderer, Quaternion math for complex rotations, React Three Fiber, and custom GLSL Shaders.",
    image: "/courses/three_js.png",
    tags: ["WebGL", "Three.js", "React Three Fiber", "Shaders", "Epic"],
    duration: "100 Chapters (Creative Director Level)",
    level: "Advanced",
    modules: [
        // THE 3D ENGINE (PHASES 1-5)
        {
            id: "phase1",
            title: "Phase 1: The Geometry Pipeline",
            pages: [
                { id: "vertices-faces", title: "Connecting the Dots", content: "# What is a 3D Model?\n\nThe GPU only understands Triangles. A `BufferGeometry` is essentially a massive Float32Array containing `[x, y, z]` coordinates (Vertices). Every 3 vertices are connected to form a single Face (a Triangle). A high-poly character model is simply 100,000 tiny triangles." }
            ]
        },
        {
            id: "phase2",
            title: "Phase 2: Vectors & Matrices",
            pages: [
                { id: "matrix-math", title: "Translation, Rotation, Scale", content: "# The Master Equation\n\nA Vector3 holds position `x,y,z`. But when you rotate and scale an object simultaneously, you must multiply Matrices (4x4 grids of numbers). You don't write the math yourself, but you must understand that `object.updateMatrix()` is mathematically heavy." }
            ]
        },
        {
            id: "phase3",
            title: "Phase 3: Quaternions",
            pages: [
                { id: "gimbal-lock", title: "Solving Gimbal Lock", content: "# Why Euler Angles Fail\n\nRotating a spaceship using standard `rotation.x += 10` (Euler Angles) will eventually cause two axes to align perfectly, causing the ship to violently flip out of control (Gimbal Lock). Quaternions use 4-dimensional complex math to calculate rotation immutably and perfectly." }
            ]
        },
        {
            id: "phase4",
            title: "Phase 4: The Render Loop",
            pages: [
                { id: "request-animation-frame", title: "Delta Time Multipliers", content: "# Physics independent of Framerate\n\nIf you move a cube `10px` every frame, a 144Hz monitor user will see the cube fly across the screen 2.5x faster than a 60Hz user. You must use `requestAnimationFrame` to calculate `deltaTime` (time since last frame), and multiply all physics by `deltaTime`." }
            ]
        },
        {
            id: "phase5",
            title: "Phase 5: Cameras & Projections",
            pages: [
                { id: "perspective-orthographic", title: "FOV and Frustum", content: "# How we see the world\n\nA `PerspectiveCamera` mimics the human eye (objects shrink as they get further away, based on a Field of View angle). An `OrthographicCamera` ignores depth entirely (objects stay the exact same size regardless of distance), used heavily for 2D isometric games like SimCity." }
            ]
        },

        // REALISM & PERFORMANCE (PHASES 6-10)
        {
            id: "phase6",
            title: "Phase 6: Lighting Architectures",
            pages: [
                { id: "pbr-materials", title: "Physically Based Rendering", content: "# Bouncing Photons\n\n`MeshStandardMaterial` uses an industry-standard PBR algorithm. Instead of just picking a color, you define `metalness` (how much the light reflects cleanly) and `roughness` (how much the microscopic surface diffuses the light). Together, they can mathematically simulate anything from plastic to gold." }
            ]
        },
        {
            id: "phase7",
            title: "Phase 7: Shadow Mapping",
            pages: [
                { id: "shadow-cameras", title: "The Hidden Render", content: "# Shadows are Expensive\n\nTo cast a shadow, Three.js secretly places a camera at the light source, renders the entire scene from the light's perspective to see what is blocked, creates an image (Shadow Map), and overlays it. High-resolution shadows murder framerates. You must bake them when possible." }
            ]
        },
        {
            id: "phase8",
            title: "Phase 8: Raycasting",
            pages: [
                { id: "mouse-picking", title: "Clicking a 3D Object", content: "# The Invisible Laser\n\nYou cannot add an `onClick` listener to a 3D mesh. You must project an invisible 3D laser out of the camera, tracking exactly where your 2D mouse coordinates lie, and mathematically calculate if that invisible line intersects with any triangles in the scene." }
            ]
        },
        {
            id: "phase9",
            title: "Phase 9: Loading Assets",
            pages: [
                { id: "gltf-draco", title: "The JPEG of 3D", content: "# GLTF and Draco Compression\n\nNever use `.obj` or `.fbx` on the web (their filesize is massive). Google dictates the `.gltf` format (JSON based 3D). If the model is over 5MB, you must run it through Draco Compression, physically reconstructing the binary geometry on the user's CPU upon load." }
            ]
        },
        {
            id: "phase10",
            title: "Phase 10: Performance Optimization",
            pages: [
                { id: "instanced-mesh", title: "100,000 Cubes", content: "# Draw Calls\n\nTelling the GPU to draw a cube takes 1 'Draw Call'. Doing this 100,000 times natively drops the game to 1 FPS. `InstancedMesh` sends the geometry to the GPU exactly ONE time, and simply sends a cheap Float32Array of 100,000 positions, effortlessly holding 60 FPS." }
            ]
        },

        // REACT THREE FIBER (PHASES 11-15)
        {
            id: "phase11",
            title: "Phase 11: Declarative 3D",
            pages: [
                { id: "r3f-benefits", title: "Why R3F saves time", content: "# Killing the Boilerplate\n\nVanilla Three.js requires 50 lines of code just to show a box on screen. React Three Fiber (R3F) treats 3D objects as standard React JSX Components. It auto-magically manages the WebGL Context, the Resize Observer, the Render Loop, and the Canvas unmounting." }
            ]
        },
        {
            id: "phase12",
            title: "Phase 12: The 'useFrame' Hook",
            pages: [
                { id: "component-loops", title: "Injecting into the Render Loop", content: "# Distributed Physics\n\nIn Vanilla JS, you have one massive animation loop at the bottom of the file handling 50 different objects. In R3F, a tiny `<Asteroid>` component uses `useFrame((state, delta) => {})` to manage its own rotation internally. It subscribes itself to the master loop automatically." }
            ]
        },
        {
            id: "phase13",
            title: "Phase 13: R3F Events",
            pages: [
                { id: "declarative-raycasting", title: "onClick on a Sphere", content: "# Built-in Interactivity\n\nR3F abstracts the brutal math of Raycasting away entirely. You simply attach `<mesh onClick={() => hit()} onPointerOver={() => hover()} />` as if it were a standard HTML `<div>`." }
            ]
        },
        {
            id: "phase14",
            title: "Phase 14: The Drei Ecosystem",
            pages: [
                { id: "pmndrs-drei", title: "Incredible Helpers", content: "# Advanced Features for Free\n\nThe `@react-three/drei` library provides components like `<Environment>` (which instantly lights your scene using HDRI global illumination), `<OrbitControls>`, and `<Html>` (which perfectly maps flat CSS DOM elements over 3D coordinates)." }
            ]
        },
        {
            id: "phase15",
            title: "Phase 15: Post-Processing",
            pages: [
                { id: "bloom-dof", title: "Making it Cinematic", content: "# The Final Polish\n\nOnce the scene is rendered perfectly, Post-Processing grabs that final image and runs 2D filters over it right before the user sees it. This gives you access to ultra-realistic Bloom, Depth of Field (Background Blur), Vignette, and Chromatic Aberration." }
            ]
        },

        // RAW GLSL SHADERS (PHASES 16-20)
        {
            id: "phase16",
            title: "Phase 16: The Shader Pipeline",
            pages: [
                { id: "vertex-fragment", title: "C is for Compute", content: "# Talking to the GPU\n\nTo build fire or water, Javascript is too slow. You must write **GLSL** (Graphics Library Shader Language). You write two 'Shader' programs: A Vertex Shader (manipulating exactly *where* the triangle corners are) and a Fragment Shader (calculating exactly *what color* the pixels are)." }
            ]
        },
        {
            id: "phase17",
            title: "Phase 17: Uniforms and Attributes",
            pages: [
                { id: "passing-data", title: "Bridging the CPU and GPU", content: "# Sending variables across\n\nA `Uniform` is a global variable you send from JS to the GPU (like `uTime` to animate waves continuously). An `Attribute` is local data specific to a single Vertex (like a UV coordinate used for texture wrapping)." }
            ]
        },
        {
            id: "phase18",
            title: "Phase 18: Shader Material in R3F",
            pages: [
                { id: "custom-materials", title: "Injecting the Code", content: "# React meets C\n\nYou inject your GLSL code using the `<shaderMaterial />` component. You pass your uniforms in as a React prop, allowing you to use `useFrame` to constantly update `material.current.uniforms.uTime.value`, causing your shader to dance perfectly in sync with React." }
            ]
        },
        {
            id: "phase19",
            title: "Phase 19: Noise Algorithms",
            pages: [
                { id: "simplex-perlin", title: "Organic Randomness", content: "# Controlling the Chaos\n\nStandard `Math.random()` generates TV static (useless). Simplex/Perlin Noise generates smooth, continuous, organic waves perfectly suited for simulating Mountain Ranges, Ocean swells, or Wood grains mathematically without requiring image textures." }
            ]
        },
        {
            id: "phase20",
            title: "Phase 20: Frame Buffer Objects (FBO)",
            pages: [
                { id: "gpgpu-compute", title: "Using the GPU for Math", content: "# Ping-Ponging State\n\nIf you want to simulate 1 Million particles with gravity and wind, the GPU cannot 'remember' where a particle was on the previous frame. FBO Ping-Ponging renders the mathematical output of the GPU *to a hidden texture*, and feeds it back into the GPU on the next frame as input." }
            ]
        }
    ]
};
