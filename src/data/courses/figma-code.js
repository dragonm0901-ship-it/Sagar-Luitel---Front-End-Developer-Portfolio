export const figmaCode = {
    id: "figma-code",
    title: "Figma to Code: The 20-Phase Epic",
    description: "Translate visual design perfectly into mathematical code. Master Auto Layout, CSS Grid architecture, Design Tokens, and complex Framer Motion Physics.",
    image: "/courses/figma.png",
    tags: ["Figma", "CSS", "UI/UX", "Framer Motion", "Epic"],
    duration: "100 Chapters (Designer to Engineer)",
    level: "All Levels",
    modules: [
        // THE DESIGN ENGINE (PHASES 1-5)
        {
            id: "phase1",
            title: "Phase 1: The Auto Layout Algorithm",
            pages: [
                {
                    id: "flexbox-mental-model",
                    title: "Figma is Just Flexbox",
                    content: `# The Death of Absolute Positioning\n\nBeginners drag a Button to \`(X: 450, Y: 120)\` on a Figma canvas. This is 'Absolute Positioning'. If the text inside the Button gets longer, the Button doesn't physically expand to hold it.\n\n**Auto Layout** mathematically converts Figma frames into CSS Flexbox. \n*   Direction (Horizontal/Vertical) = \`flex-direction\`\n*   Spacing = \`gap\`\n*   Padding = \`padding\`\n\nIf you build your entire Figma file using strictly Auto Layout, translating it to React is a literal 1-to-1 mechanical transcription.`
                },
                {
                    id: "resizing-constraints",
                    title: "Hug vs Fill",
                    content: `# The 3 States of Geometry\n\nEvery Auto Layout frame has 3 possible sizing rules:\n1.  **Fixed:** Hardcoded \`width: 200px\`. (Rarely use this).\n2.  **Hug Contents:** The frame psychologically shrinks to tightly wrap its children. \`width: max-content\`.\n3.  **Fill Container:** The frame mathematically expands to consume 100% of the available empty space provided by its Parent. \`flex: 1\`.`
                }
            ]
        },
        {
            id: "phase2",
            title: "Phase 2: Design Tokens Architecture",
            pages: [
                {
                    id: "primitive-vs-semantic",
                    title: "Naming Colors",
                    content: `# Do not use Blue-500\n\nIf you hardcode \`color: #0000FF\` into 50 react components, and the CEO changes the brand color to Red, you have to rewrite 50 files.\n\n**1. Primitive Tokens:** (The raw variables in Figma/CSS)\n\`--blue-500: #0000FF;\`\n\n**2. Semantic Tokens:** (The logical application of those primitives)\n\`--color-primary: var(--blue-500);\`\n\nYour React components ONLY ever use Semantic Tokens. If the brand changes, you change exactly one line of code: \`--color-primary: var(--red-500)\`. The entire 50-component app updates instantly.`
                }
            ]
        },
        {
            id: "phase3",
            title: "Phase 3: Deep CSS Grid",
            pages: [
                {
                    id: "grid-vs-flex",
                    title: "2D vs 1D Mathematics",
                    content: `# When to use which\n\n*   **Flexbox (1D):** Used when you care about the *flow* of items in a single line (like a Navigation bar, or a wrapping row of tags).\n*   **Grid (2D):** Used when you need strict mathematical control over BOTH rows and columns simultaneously (like a massive Dashboard layout or a Calendar view).`
                },
                {
                    id: "fractional-units",
                    title: "The 'fr' Unit",
                    content: `# Escaping Percentages\n\n\`\`\`css\n/* Bad: Calculating percentages and subtracting gaps manually */\n.dashboard {\n   width: calc(33.33% - 20px);\n}\n\n/* Perfect: Fractional Units */\n.dashboard {\n   display: grid;\n   grid-template-columns: 1fr 3fr 1fr;\n   gap: 20px;\n}\n\`\`\`\nThe \`fr\` unit tells the browser: "Calculate all the hardcoded pixels and gaps first. Take whatever physical space is leftover, divide it into 5 equal fractions (1+3+1), and assign the middle column exactly 3 of them." It is pure, fluid mathematical responsiveness.`
                }
            ]
        },
        {
            id: "phase4",
            title: "Phase 4: Component Variants (Figma to React)",
            pages: [
                {
                    id: "property-mapping",
                    title: "The 1-to-1 Translation",
                    content: `# Synchronization\n\nIn Figma, a \`Button\` component has Variants: \`Size = Small\`, \`State = Hover\`, \`Type = Primary\`.\n\nIn React, these map DIRECTLY to your Component Props.\n\`\`\`tsx\n// If the Prop doesn't exist in Figma, it shouldn't exist in React (usually)\ntype ButtonProps = {\n  size: 'small' | 'large';\n  variant: 'primary' | 'secondary';\n  disabled?: boolean;\n}\n\`\`\``
                }
            ]
        },
        {
            id: "phase5",
            title: "Phase 5: Advanced Positioning",
            pages: [
                {
                    id: "stacking-contexts",
                    title: "The Z-Index War",
                    content: `# Why z-index: 9999 fails\n\nIf a Modal is \`z-index: 10\`, and a Header is \`z-index: 20\`, the Header sits on top. Standard.\n\nBUT if the Modal is inside a \`<div>\` that has \`position: relative; z-index: 1;\`... The entire \`<div>\` creates a newly contained "Stacking Context". Even if the Modal inside it has \`z-index: 9999999\`, it will NEVER physically render above the Header (z-index 20), because its Parent container is strictly capped at z-index 1.`
                },
                {
                    id: "absolute-centering",
                    title: "The mathematical center",
                    content: `# 3 Ways to center a div\n\n**1. Flexbox (The Standard):**\n\`display: flex; justify-content: center; align-items: center;\`\n\n**2. Grid (The Shortest):**\n\`display: grid; place-items: center;\`\n\n**3. Absolute Transform (The Hack for overlapping):**\n\`position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);\``
                }
            ]
        },

        // ANIMATION AND PHYSICS (PHASES 6-10)
        {
            id: "phase6",
            title: "Phase 6: The Math of Easing",
            pages: [
                {
                    id: "bezier-curves",
                    title: "Cubic Bezier",
                    content: `# Why 'linear' looks robotic\n\nNothing in the real world moves at a constant velocity. A car accelerates slowly, hits top speed, and decelerates slowly.\n\n\`transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1.0)\`\n\nThis CSS function physically graphs a mathematical curve representing Acceleration over Time. By tweaking the 4 control points, you can create massive "snaps" or slow, buttery "glides".`
                }
            ]
        },
        {
            id: "phase7",
            title: "Phase 7: Hardware Acceleration",
            pages: [
                {
                    id: "gpu-transitions",
                    title: "What you are allowed to animate",
                    content: `# The 60FPS Rule\n\n**NEVER animate:** \`width\`, \`height\`, \`margin\`, \`padding\`, \`top\`, \`left\`.\nChanging these forces the Browser CPU to run the 'Layout' and 'Paint' algorithms on every single frame, causing horrible stuttering.\n\n**ALWAYS animate:** \`transform\` (translate, scale, rotate) and \`opacity\`.\nThese properties completely bypass the CPU Layout engine. They are executed mathematically on the GPU Compositor thread, guaranteeing flawless 60/144 FPS.`
                }
            ]
        },
        {
            id: "phase8",
            title: "Phase 8: Introduction to Framer Motion",
            pages: [
                {
                    id: "declarative-animations",
                    title: "The <motion.div>",
                    content: `# Escaping CSS Transitions\n\nCSS is terrible for complex choreographed sequences (e.g., A fades in, then B slides up, then C scales down).\n\nFramer Motion replaces \`<div>\` with \`<motion.div>\`. You simply declare the target mathematical state, and the React Engine calculates every frame between them.\n\n\`\`\`jsx\n// Automatically animates from entirely invisible, up 50px, to fully visible.\n<motion.div\n  initial={{ opacity: 0, y: 50 }}\n  animate={{ opacity: 1, y: 0 }}\n  transition={{ duration: 0.5 }}\n/>\n\`\`\``
                }
            ]
        },
        {
            id: "phase9",
            title: "Phase 9: Spring Physics",
            pages: [
                {
                    id: "stiffness-and-damping",
                    title: "Real World Gravity",
                    content: `# Deleting 'duration'\n\nApple iOS animations feel incredible because they do not use 'time/duration'. They use strict Spring Physics.\n\n\`\`\`jsx\n<motion.div\n  animate={{ scale: 1.2 }}\n  transition={{ \n    type: \"spring\", \n    stiffness: 400, // How tightly the spring is coiled (Speed/Snap)\n    damping: 10     // How much friction is in the air (Bounciness)\n  }}\n/>\n\`\`\`\nThis mathematical algorithm perfectly simulates a physical object attached to a rubber band.`
                }
            ]
        },
        {
            id: "phase10",
            title: "Phase 10: Exit Animations",
            pages: [
                {
                    id: "animate-presence",
                    title: "The Unmounting Problem",
                    content: `# Catching the Deletion\n\nIn React, if \`showModal\` becomes false, the component is physically destroyed from the DOM in 1 millisecond. You literally cannot animate an exit because it no longer exists.\n\n**AnimatePresence** is a wrapper that artificially pauses React's physical destruction algorithm. \nIt detects the unmount, forcibly keeps the DOM node alive in memory, plays the \`exit={{ opacity: 0 }}\` mathematical animation, and ONLY destroys the node when the animation physically finishes.`
                }
            ]
        },

        // ADVANCED ORCHESTRATION (PHASES 11-15)
        {
            id: "phase11",
            title: "Phase 11: Variants & Staggering",
            pages: [
                {
                    id: "orchestrating-children",
                    title: "The Wave Effect",
                    content: `# Cascading timelines\n\nIf you have a list of 10 items, you want them to animate in one by one, 0.1 seconds apart.\n\nInstead of calculating math manually, you use Framer Motion Variants. You pass a single \`animate=\"visible\"\` string to the Parent \`<ul>\`. The state automatically propagates down to all 10 \`<li>\` children. The Parent's transition object uses \`staggerChildren: 0.1\`, which automatically coordinates the massive mathematical timeline delay for all 10 children.`
                }
            ]
        },
        {
            id: "phase12",
            title: "Phase 12: Layout Projections",
            pages: [
                {
                    id: "magic-motion",
                    title: "The FLIP Technique",
                    content: `# Animating the impossible\n\nNormally, you cannot smoothly animate \`justify-content: flex-start\` changing to \`justify-content: flex-end\`. It instantly snaps.\n\nIf you add the \`layout\` prop to a \`<motion.div>\`, Framer Motion executes the FLIP algorithm:\n1.  **F**irst: Measures exact (X,Y,W,H) bounding box of the element.\n2.  **L**ast: Lets React render the drastic CSS layout change instantly, and measures the *new* exact (X,Y,W,H).\n3.  **I**nvert: Applies an instant, invisible negative \`transform\` to force the element visually back to the First position.\n4.  **P**lay: Uses GPU hardware acceleration to fluidly animate the transform down to zero, moving the element to its new home at 60FPS.`
                }
            ]
        },
        {
            id: "phase13",
            title: "Phase 13: Shared Layouts",
            pages: [
                {
                    id: "layout-id",
                    title: "Component Morphing",
                    content: `# The Magic Apple Transition\n\nIf you have a tiny image thumbnail in an Album component, and you click it, an entirely different Fullscreen Image component mounts.\n\nBy assigning them BOTH the exact same \`layoutId=\"hero-image\"\`, Framer Motion detects the new component mounting, reads the bounding box of the old component unmounting, and perfectly morphs the old image across the screen into the new fullscreen layout without dropping a frame.`
                }
            ]
        },
        {
            id: "phase14",
            title: "Phase 14: Scroll Linked Animations",
            pages: [
                {
                    id: "use-scroll",
                    title: "Tying progress to pixels",
                    content: `# Parallax and Progress Bars\n\nThe \`useScroll()\` hook mathematically tracks the exact Y-pixel position of the user's viewport.\n\nYou feed that pixel number into a \`useTransform\` mapping function.\n\`const opacity = useTransform(scrollY, [0, 500], [1, 0]);\`\n\nAs the user scrolls from pixel 0 to 500, the opacity perfectly synchronizes down from 1 to 0, tied physically to the user's mouse wheel velocity.`
                }
            ]
        },
        {
            id: "phase15",
            title: "Phase 15: Drag Physics",
            pages: [
                {
                    id: "drag-constraints",
                    title: "Tinder Swipe Cards",
                    content: `# Interactive Gestures\n\nAdding \`drag=\"x\"\` or \`drag=\"y\"\` allows instant 60FPS dragging.\n\nYou can apply \`dragConstraints={{ left: 0, right: 300 }}\` to physically lock a slider handle to a specific mathematical boundary.\nBy reading the \`onDragEnd\` velocity vector object, you can calculate if the user "flicked" the card hard enough to the right (velocity > 500) to trigger a "Like" action, or if the card should use Spring Physics to snap back to the center.`
                }
            ]
        },

        // DEPLOYMENT AND POLISH (PHASES 16-20)
        {
            id: "phase16",
            title: "Phase 16: CSS Modules vs Tailwind",
            pages: [
                {
                    id: "utility-classes",
                    title: "The Architecture War",
                    content: `# Scalability\n\n**CSS Modules:** Generates random trailing hashes (\`.button_4kxA\`) to guarantee mathematical immunity from global CSS conflicts. Clean HTML, messy CSS files.\n\n**Tailwind CSS:** Utility-first (\`className=\"flex items-center justify-between\"\`). Discards writing CSS files entirely. Messy HTML, but guarantees absolute performance because 10,000 components all reuse the exact same 200 utility classes, resulting in a microscopic 10KB final CSS bundle.`
                }
            ]
        },
        {
            id: "phase17",
            title: "Phase 17: Container Queries",
            pages: [
                {
                    id: "cqi",
                    title: "The Death of viewports",
                    content: `# Component Level Responsiveness\n\n\`@media (max-width: 800px)\` queries the entire computer monitor. This is flawed. If you put a "News Card" inside a tiny Sidebar, it shouldn't look at the massive 1920px monitor to decide its layout.\n\n\`@container (max-width: 300px)\` allows the Component to mathematically query the exact pixel width of its *immediate physical Parent div*. A Card can now intelligently rearrange its own layout whether it's dragged into a wide Hero section or a tiny Sidebar.`
                }
            ]
        },
        {
            id: "phase18",
            title: "Phase 18: SVG Manipulation",
            pages: [
                {
                    id: "svg-paths",
                    title: "Animating the Vector",
                    content: `# The D Attribute\n\nAn SVG is just XML markup representing mathematical plot points on a graph.\nBy putting an SVG directly inline in React, you can target the \`<path d=\"M10 10...\">\` using Framer Motion's \`pathLength\` property. You can animate the exact mathematical outline of a complicated logo drawing itself onto the screen perfectly.`
                }
            ]
        },
        {
            id: "phase19",
            title: "Phase 19: Web Core Vitals",
            pages: [
                {
                    id: "lcp-cls",
                    title: "Google's SEO Metrics",
                    content: `# Objective Scoring\n\nBeautiful UI doesn't matter if Google penalizes your site.\n*   **LCP (Largest Contentful Paint):** Time for the biggest image/text to render. Must be < 2.5s. Preload Hero images!\n*   **CLS (Cumulative Layout Shift):** How much the page visually "jumps" as images load. Must be < 0.1. ALWAYS use CSS \`aspect-ratio\` for images.\n*   **INP (Interaction to Next Paint):** How fast the UI reacts to a button click before the CPU freezes to run Javascript. Must be < 200ms.`
                }
            ]
        },
        {
            id: "phase20",
            title: "Phase 20: The Capstone Portfolio",
            pages: [
                {
                    id: "pixel-perfect",
                    title: "The Proof",
                    content: `# Earning the Title\n\nYour final unguided exam. You will be provided a complex 5-page Figma design files featuring Dark Mode toggle systems, Staggered Page Entry animations using Framer Motion Layout IDs, and highly optimized Grid systems.\n\nYou must deliver a React codebase that mathematically matches the design down to the exact 1-pixel border radiuses and passes a 100/100 Google Lighthouse Core Vitals audit.`
                }
            ]
        }
    ]
};
