export const threeJs = {
    id: "three-js",
    title: "Three.js & WebGL: The 20-Phase Epic",
    description: "Master the Math of 3D. Learn raw WebGL mechanics, write custom GLSL Shaders, manipulate Textures, and architect 60FPS experiences using React Three Fiber.",
    image: "/courses/three_js.png",
    tags: ["Three.js", "WebGL", "GLSL", "React Three Fiber", "Epic"],
    duration: "100 Chapters (Graphics Engineering)",
    level: "Advanced",
    modules: [
        // THE MATH AND THE CAMERA (PHASES 1-5)
        {
            id: "phase1",
            title: "Phase 1: The Geometry of 3D",
            pages: [
                {
                    id: "vertices-and-faces",
                    title: "Dots in Space",
                    content: `# There are no spheres\n\nComputers cannot draw perfect curves. A "Sphere" in 3D is actually composed of thousands of flat triangles (Faces) connected by points (Vertices).\n\n\`\`\`javascript\n// A raw BufferGeometry is literally just a mathematical array of X, Y, Z coordinates.\nconst vertices = new Float32Array([\n    -1.0, -1.0,  1.0, // Vertex 1 (X, Y, Z)\n     1.0, -1.0,  1.0, // Vertex 2\n     1.0,  1.0,  1.0  // Vertex 3\n]);\n// WebGL connects these 3 points to draw exactly 1 Flat Triangle.\n\`\`\``
                },
                {
                    id: "the-scene-graph",
                    title: "Hierarchical Space",
                    content: `# The Solar System Problem\n\nIf you want the Earth to orbit the Sun, and the Moon to orbit the Earth, doing the absolute math for the Moon's position relative to the center of the universe is a nightmare.\n\nThree.js uses a **Scene Graph**. You add the Sun to the Scene. You add the Earth as a *Child* of the Sun. You add the Moon as a *Child* of the Earth. \nIf you rotate the Sun by 1 degree, the Engine automatically calculates the matrix math to mathematically rotate the Earth and Moon perfectly along with it.`
                }
            ]
        },
        {
            id: "phase2",
            title: "Phase 2: The Camera Frustum",
            pages: [
                {
                    id: "perspective-camera",
                    title: "The Human Eye",
                    content: `# The Vanishing Point\n\nThe \`PerspectiveCamera\` mimics reality. Objects further away mathematically shrink in size. \n\nIt requires 4 parameters:\n1.  **Field of View (FOV):** 75 degrees is normal. 120 is a GoPro Fish-eye lens.\n2.  **Aspect Ratio:** Always \`window.innerWidth / window.innerHeight\`.\n3.  **Near Clipping Plane:** Anything closer than this distance (e.g., 0.1) is mathematically deleted (not rendered) to save memory.\n4.  **Far Clipping Plane:** Anything further than this distance (e.g., 1000) is deleted.`
                },
                {
                    id: "orthographic-camera",
                    title: "The Isometric Matrix",
                    content: `# Zero Perspective\n\nThe \`OrthographicCamera\` destroys the concept of depth-scaling. An object 1000 units away renders at the exact same physical pixel size on screen as an object 1 unit away.\n\nThis is entirely used for 2D UI overlays, Mini-maps, and classic Isometric Strategy games (like Age of Empires or SimCity).`
                }
            ]
        },
        {
            id: "phase3",
            title: "Phase 3: Matrices and Quaternions",
            pages: [
                {
                    id: "gimbal-lock",
                    title: "The Euler Rotation Flaw",
                    content: `# Why .rotation.x is dangerous\n\nEuler angles (` + "`" + `mesh.rotation.y = Math.PI` + "`" + `) rotate objects sequentially (X, then Y, then Z). \n\nIf you rotate an airplane 90 degrees strictly up (Pitch), its native Y-axis and native Z-axis physically overlap. If you now try to "Roll" the plane, it will physically "Yaw" instead. This catastrophic mathematical failure is called **Gimbal Lock**.`
                },
                {
                    id: "quaternions",
                    title: "4D Mathematics",
                    content: `# The Smooth Rotation\n\nProfessionals do not use Euler angles for complex 3D rotation (like a spaceship or a VR headset).\n\nThey use **Quaternions**. A Quaternion uses 4 dimensions (X, Y, Z, and W) to calculate a rotation around an arbitrary vector in space. It is immune to Gimbal Lock, calculates significantly faster on the CPU, and allows buttery-smooth interpolation (\`slerp\`) between two different rotations.`
                }
            ]
        },
        {
            id: "phase4",
            title: "Phase 4: Lighting Mathematics",
            pages: [
                {
                    id: "the-normals",
                    title: "How light knows to bounce",
                    content: `# The Invisible Arrows\n\nHow does a Point Light know which side of an asteroid needs to be bright, and which side is in shadow?\n\nEvery single triangle (Face) on an object has a **Normal Vector**—an invisible mathematical arrow pointing perfectly perpendicular (90 degrees) away from the surface. The WebGL shader calculates the angle between this Normal Arrow and the Light Source. If they point directly at each other, the pixel is drawn bright white. If they point 90 degrees away, the pixel is drawn black.`
                },
                {
                    id: "ambient-vs-directional",
                    title: "Ray Calculations",
                    content: `# The Cost of Shadows\n\n*   **Ambient Light:** Zero math. It globally adds a base color to every pixel. Casts zero shadows.\n*   **Directional Light (The Sun):** Fires mathematically perfectly parallel rays from infinite distance. Cheap to calculate shadows.\n*   **Point Light (A Lightbulb):** Fires rays mathematically in all 360 degrees radially. Very expensive (requires a 6-sided shadow map to calculate shadows accurately).`
                }
            ]
        },
        {
            id: "phase5",
            title: "Phase 5: Materials and PBR",
            pages: [
                {
                    id: "mesh-standard-material",
                    title: "Physically Based Rendering",
                    content: `# Disney's Equation\n\nIn older games (2005), "Plastic" and "Metal" were just different image textures. \n\nModern WebGL uses PBR (Physically Based Rendering), pioneered by Disney animation. You define materials using strict physics numbers between 0.0 and 1.0:\n*   **Metalness:** 0.0 is plastic/wood. 1.0 is pure chrome.\n*   **Roughness:** 0.0 is a perfect mirror. 1.0 is matte sandpaper.\nWebGL uses these inputs to calculate microscopically correct light bending (Fresnel effects).`
                },
                {
                    id: "texture-mapping",
                    title: "The UV Grid",
                    content: `# Wrapping the Present\n\nHow do you wrap a 2D JPEG flat image of a brick wall perfectly around a 3D mathematically generated Cylinder?\n\n**UV Mapping.** Every single 3D Vertex \`(X, Y, Z)\` holds an invisible 2D coordinate \`(U, V)\` between \`0.0\` and \`1.0\`. The U/V coordinates tell the GPU exactly which pixel data to pull from the 2D JPEG to paint onto the 3D triangle face.`
                }
            ]
        },

        // SHADERS & GLSL (PHASES 6-10)
        {
            id: "phase6",
            title: "Phase 6: The Graphics Pipeline",
            pages: [
                {
                    id: "what-is-a-shader",
                    title: "Escaping Javascript",
                    content: `# The limits of the CPU\n\nJavascript runs on the Main Thread (CPU). If you want an ocean wave with 10,000 vertices to dynamically bob up and down, looping over that array in Javascript 60 times a second \`for (let i=0) { vertices[i].y = Math.sin() }\` will instantly crash the browser.\n\n**Shaders** are programs written in C-like \`GLSL\` that are uploaded physically off the CPU, into the computer's GPU VRAM. The GPU has 4,000 cores. It calculates all 10,000 vertices *at the exact same millisecond* in absolute parallel.`
                }
            ]
        },
        {
            id: "phase7",
            title: "Phase 7: The Vertex Shader",
            pages: [
                {
                    id: "moving-the-points",
                    title: "Matrix Multiplication",
                    content: `# gl_Position\n\nThe goal of a Vertex Shader is exactly one thing: Outputting the final \`(X, Y, Z)\` position of the vertex on the screen.\n\n\`\`\`glsl\n// GLSL Code executing on the GPU\nvoid main() {\n  // Mutate the local Y position using a sine wave over time to create an Ocean effect\n  vec3 newPosition = position;\n  newPosition.y += sin(time * 2.0) * 0.5;\n\n  // Multiply by the Model View Projection Matrices to translate 3D space to the 2D Screen\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);\n}\n\`\`\``
                }
            ]
        },
        {
            id: "phase8",
            title: "Phase 8: The Fragment Shader",
            pages: [
                {
                    id: "coloring-the-pixels",
                    title: "The Rasterizer",
                    content: `# gl_FragColor\n\nAfter the Vertex Shader defines where the triangle is, the Rasterizer figures out exactly which pixels on your LCD monitor fall inside that triangle.\n\nThe Fragment Shader runs **once for every single pixel**.\n\n\`\`\`glsl\n// Outputting a pure Red pixel\nvoid main() {\n  // RGBA format (0.0 to 1.0)\n  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); \n}\n\`\`\``
                }
            ]
        },
        {
            id: "phase9",
            title: "Phase 9: Uniforms and Attributes",
            pages: [
                {
                    id: "bridging-the-gap",
                    title: "Passing Data to the GPU",
                    content: `# The Javascript Bridge\n\nThe GPU is isolated. It doesn't know what time it is, and it doesn't know where the mouse is.\n\n*   **Attributes:** Data that is unique for *every single vertex* (e.g., Color, Position). Passed efficiently via Float32Arrays.\n*   **Uniforms:** Data that is globally identically the same for the entire 3D mesh (e.g., global \`uTime\`, or \`uMouseX\`). Every animation frame, Javascript calculates \`Date.now()\`, and hurls that integer over the bridge to the GPU Uniform.`
                }
            ]
        },
        {
            id: "phase10",
            title: "Phase 10: Shader Patterns",
            pages: [
                {
                    id: "noise-functions",
                    title: "Perlin and Simplex Noise",
                    content: `# Mathematical Randomness\n\n\`Math.random()\` looks like television static. It is entirely uncorrelated.\n\nTo generate beautiful procedural terrain, clouds, or marble textures, you must use **Perlin Noise**. It is an algorithm that generates "smooth" randomness—if point A is a mountain, point B right next to it is mathematically guaranteed to be a slightly smaller mountain, not a sudden deep canyon.`
                }
            ]
        },

        // PERFORMANCE & OPTIMIZATION (PHASES 11-15)
        {
            id: "phase11",
            title: "Phase 11: Draw Calls",
            pages: [
                {
                    id: "the-bottleneck",
                    title: "Why framerates drop",
                    content: `# The CPU/GPU Handshake\n\nA "Draw Call" is when the Javascript Main Thread physically tells the GPU, "Hey, draw this specific mesh with this specific material."\n\nIf you have a forest with 10,000 separate tree objects, you issue 10,000 Draw Calls per frame (600,000 per second). This completely chokes the CPU, not the GPU. The CPU limits out just sending the instructions. You must keep Draw Calls below ~50.`
                }
            ]
        },
        {
            id: "phase12",
            title: "Phase 12: Instanced Meshes",
            pages: [
                {
                    id: "instancing",
                    title: "The Ultimate Optimization",
                    content: `# 10,000 Trees, 1 Draw Call\n\nIf all 10,000 trees use the exact same geometry (Oak Tree) and exact same material (Bark), you use an \`InstancedMesh\`.\n\nJavascript uploads the 10,000 \`(X,Y,Z)\` positional locations into a single Float32Array buffer. It issues exactly **ONE** Draw Call to the GPU: "Here is the Oak Tree, and here is an array of 10,000 matrices. Draw them all instantly." \nThe GPU executes this flawlessly at 144FPS.`
                }
            ]
        },
        {
            id: "phase13",
            title: "Phase 13: Buffer Geometry Optimization",
            pages: [
                {
                    id: "merging-geometries",
                    title: "Baking the Scene",
                    content: `# Static Environments\n\nIf you have a city with 500 buildings that never move, you shouldn't render them as 500 separate objects.\n\nYou mathematically merge all 500 \`BufferGeometries\` into absolutely One Giant City Geometry. It reduces 500 draw calls down to 1. The GPU doesn't care that the geometry is massive; it only cares about receiving fewer instructions from the CPU.`
                }
            ]
        },
        {
            id: "phase14",
            title: "Phase 14: Texture Compression",
            pages: [
                {
                    id: "vram-limits",
                    title: "KTX2 and Basis",
                    content: `# JPEGs are unpacked in VRAM\n\nA totally compressed 1MB \`.jpg\` file on your hard drive must be physically uncompressed back into raw pixel data (often expanding to 20MB) to be loaded into the GPU's VRAM.\n\n**Basis Universal (.ktx2)** is an advanced texture format. The asset itself is highly compressed over the network, but crucially, it stays completely compressed *inside the GPU VRAM natively*, instantly freeing up over 80% of your user's graphics card memory.`
                }
            ]
        },
        {
            id: "phase15",
            title: "Phase 15: Post-Processing",
            pages: [
                {
                    id: "render-targets",
                    title: "The Double Buffer",
                    content: `# Drawing off-screen\n\nTo create effects like Bloom (Glow), Depth-of-Field (Blur), or Glitch, you don't draw the 3D scene directly to the computer monitor.\n\n1.  Draw the entire 3D scene invisibly onto a \`WebGLRenderTarget\` (an off-screen 2D Image in memory).\n2.  Pass that 2D Image into a specialized 2D Fragment Shader.\n3.  Run a Gaussian Blur algorithm over the pixels.\n4.  Print the finalized 2D image to the user's screen.`
                }
            ]
        },

        // REACT THREE FIBER (PHASES 16-20)
        {
            id: "phase16",
            title: "Phase 16: The R3F Reconciler",
            pages: [
                {
                    id: "not-a-wrapper",
                    title: "It is React Native for WebGL",
                    content: `# A Custom Renderer\n\nReact Three Fiber is NOT a wrapper over Three.js. It is a completely custom React Reconciler.\n\nJust as standard React turns \`<div>\` JSX into \`document.createElement('div')\` HTML nodes...\nR3F evaluates \`<mesh>\` JSX and algorithmically instantiates native \`new THREE.Mesh()\` objects. It leverages React's virtual-dom diffing to manage the complex WebGL Scene Graph state completely declaratively.`
                }
            ]
        },
        {
            id: "phase17",
            title: "Phase 17: useFrame & Event Loop",
            pages: [
                {
                    id: "bypassing-react-state",
                    title: "Why useState breaks 3D",
                    content: `# 60FPS Requirements\n\nIf you want a cube to spin continuously, DO NOT put its rotation value in a React \`useState\`. \n\nCalling \`setRotation\` 60 times a second triggers React's entire component reconciliation lifecycle to fire 60 times a second, obliterating your CPU and dropping framerates to zero.\n\n\`\`\`jsx\n// PERFECT: The useFrame hook directly taps into the native RequestAnimationFrame\nconst meshRef = useRef();\nuseFrame((state, delta) => {\n  // Physically mutate the object directly outside of React's state tree\n  meshRef.current.rotation.y += 0.01;\n});\n\`\`\``
                }
            ]
        },
        {
            id: "phase18",
            title: "Phase 18: Drei & Ecosystem",
            pages: [
                {
                    id: "drei-components",
                    title: "The Helper Library",
                    content: `# Standing on shoulders\n\nWriting vanilla WebGL raycasting to implement Drag-and-Drop 3D objects takes 300 lines of complex intersection math.\n\n\`@react-three/drei\` is the essential library. It provides \`<OrbitControls>\`, \`<Text3D>\`, \`<Environment>\`, and \`<Html>\` (which seamlessly overlays a 2D DOM div that perfectly tracks the 3D position of an object).`
                }
            ]
        },
        {
            id: "phase19",
            title: "Phase 19: Suspension & Asset Loading",
            pages: [
                {
                    id: "usegltf",
                    title: "Loading 3D Models",
                    content: `# Asynchronous Decryption\n\nLoading a 5MB \`.glb\` 3D model takes 2 seconds over a network. R3F seamlessly integrates with React \`Suspense\`.\n\n\`\`\`jsx\n// The hook mathematically pauses the component's render lifecycle\n// until the network request perfectly finishes and decodes the geometries in memory.\nconst { nodes, materials } = useGLTF('/spaceship.glb')\n\n// We wrap it in a boundary to show a loading screen\n<Suspense fallback={<Loader />}>\n  <Model />\n</Suspense>\n\`\`\``
                }
            ]
        },
        {
            id: "phase20",
            title: "Phase 20: The Capstone Experience",
            pages: [
                {
                    id: "the-physics-engine",
                    title: "Building an FPS Game",
                    content: `# Reacting to Gravity\n\nTo prove your mastery, you will build a 3D First-Person Shooter.\n\nWebGL does not know what gravity is. You will integrate \`@react-three/rapier\` (a physics engine written in Rust Wasm). You will attach \`RigidBody\` colliders to the user, write custom Raycasters to detect gunshot hits, and write a custom Fragment Shader to implement the 2D blood-splatter post-processing effect on the screen.`
                }
            ]
        }
    ]
};
