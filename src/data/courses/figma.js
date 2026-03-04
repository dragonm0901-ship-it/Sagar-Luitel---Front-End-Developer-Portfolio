export const figma = {
    id: "figma",
    title: "Figma to Code: The 20-Phase Epic",
    description: "Bridge the gap between Designer and Developer. Master Auto Layout translation to Flexbox, Design Tokens, and replicating complex Micro-interactions via Framer Motion.",
    image: "/courses/figma.png",
    tags: ["UI/UX", "Design", "Framer Motion", "CSS", "Epic"],
    duration: "100 Chapters (Junior to Designer-Hybrid)",
    level: "All Levels",
    modules: [
        // THE DESIGNER HYBRID (PHASES 1-5)
        {
            id: "phase1",
            title: "Phase 1: The Developer Handoff",
            pages: [
                { id: "reading-figma", title: "How to actually read a Figma file", content: "# Don't guess the pixel math\n\nWhen a junior developer gets a Figma design, they often 'eyeball' the margins. This shatters the brand's design system. Every single spacing, color, and font size in a professional Figma file is mathematically deliberate (usually following an 8px grid system). Use Dev Mode to read the specific gap numbers." }
            ]
        },
        {
            id: "phase2",
            title: "Phase 2: Auto Layout is Flexbox",
            pages: [
                { id: "flexbox-translation", title: "The 1:1 CSS Mapping", content: "# Hug and Fill\n\nFigma's Auto Layout is literally built on top of the CSS Flexbox API. \n- `Fill Container` translates directly to `flex-grow: 1`.\n- `Hug Contents` translates to `width: fit-content`.\n- `Gap: 16` translates to `gap: 1rem`." }
            ]
        },
        {
            id: "phase3",
            title: "Phase 3: Design Tokens",
            pages: [
                { id: "css-variables", title: "The Single Source of Truth", content: "# Never hardcode Hex Values\n\nIf the company changes their primary brand color, you cannot be doing a Ctrl+F replace on `#2563EB` across 50 components. In Figma, Designers define 'Styles' or 'Variables'. You map these directly into your CSS `:root { --primary-color: #2563EB }` immediately upon project start." }
            ]
        },
        {
            id: "phase4",
            title: "Phase 4: Typography Mathematics",
            pages: [
                { id: "em-rem-math", title: "Rems vs Ems", content: "# Stopping the cascade\n\nNever use `px` for font size (it breaks user accessibility zooming preferences on OS level). 1 `rem` equals the root browser default (`16px`). Using `rem` scales predictably. Using `em` scales based on the parent container, which can recursively create hopelessly compounding cascades if nested too deep." }
            ]
        },
        {
            id: "phase5",
            title: "Phase 5: Fluid Interfaces",
            pages: [
                { id: "container-queries", title: "Beyond Media Queries", content: "# Component Intrinsic Design\n\nResponsive Design shouldn't rely purely on `max-width: 768px` screen sizes. What if your Card component is put in a small Sidebar instead of the Main Grid? `Container Queries` (@container) allow the Card to query its own parent's width, restyling itself intrinsically regardless of screen size." }
            ]
        },

        // ADVANCED STYLING ARCHITECTURES (PHASES 6-10)
        {
            id: "phase6",
            title: "Phase 6: Color Theory for Code",
            pages: [
                { id: "oklch-colors", title: "HSL vs OKLCH", content: "# Mathematical Gradients\n\nRGB and HEX codes are terrible for programmatic manipulation (like hovering a button to make it exactly 10% darker). HSL is better, but perceptually unequal (blue to green looks muddy). `OKLCH` represents human perceptual color natively in CSS, allowing perfect, mud-free gradient interpolations." }
            ]
        },
        {
            id: "phase7",
            title: "Phase 7: CSS Grid Architecture",
            pages: [
                { id: "two-dimensional-layout", title: "The Holy Grail Layout", content: "# Stopping Div Soup\n\nYou do not need `container > col-left, col-right`. You can define a master CSS Grid Layout: `grid-template-areas: \"header header\" \"sidebar content\" \"footer footer\"`. Then simply apply `grid-area: sidebar` to any child element to magically banish it to the correct zone." }
            ]
        },
        {
            id: "phase8",
            title: "Phase 8: Stacking Contexts",
            pages: [
                { id: "z-index-wars", title: "Why Z-Index 9999 fails", content: "# The Invisible Boundaries\n\nIf a Child has `z-index: 9999`, but its Parent has `opacity: 0.9` or `filter: blur(1px)`, the Parent creates a brand new 'Stacking Context'. No matter how high the child's z-index is, it can NEVER break out of the Parent's invisible ceiling to sit above an absolutely positioned Navbar." }
            ]
        },
        {
            id: "phase9",
            title: "Phase 9: SVGs as Code",
            pages: [
                { id: "react-svg", title: "Inline vs Img", content: "# Modifying SVGs via Props\n\nDon't use `<img src='icon.svg' />`. Because doing so prevents you from changing the icon's color on hover. Import the SVG as a React Component (`import { ReactComponent as Icon }`), allowing you to dynamically pass in `fill=\"var(--primary-color)\"` or animate its `stroke-dasharray`." }
            ]
        },
        {
            id: "phase10",
            title: "Phase 10: Tailwind Architecture",
            pages: [
                { id: "tailwind-config", title: "Synchronizing with Figma", content: "# Not just Utility Classes\n\nTailwind achieves perfection when its `tailwind.config.js` is perfectly synchronized with Figma's Design System. Overwrite the default Tailwind `theme.colors` array with the exact hex codes from the Figma Variables table to enforce draconian design consistency across massive codebases." }
            ]
        },

        // MICRO-INTERACTIONS (PHASES 11-15)
        {
            id: "phase11",
            title: "Phase 11: The Psychology of Animation",
            pages: [
                { id: "easing-functions", title: "Cubic Bezier Curves", content: "# Nothing moves linearly\n\nIf a modal opens using a linear, constant speed (`transition: all 0.3s linear`), it feels robotic and cheap. Premium UIs use Cubic Bezier Curves (`ease-out`) where the object starts fast, and mathematically decelerates smoothly into its final resting position." }
            ]
        },
        {
            id: "phase12",
            title: "Phase 12: CSS Transitions vs Keyframes",
            pages: [
                { id: "performance-metrics", title: "GPU Accelerated Properties", content: "# Dropping Frames\n\nIf you animate `height` or `margin`, the Browser must recalculate the Layout Math for the entire page 60 times a second, grinding the CPU to a halt. You must ONLY animate `transform` (scale, translate) and `opacity`, because the GPU handles these calculations instantly on a separate hardware layer." }
            ]
        },
        {
            id: "phase13",
            title: "Phase 13: Framer Motion",
            pages: [
                { id: "react-springs", title: "Physical Micro-interactions", content: "# Replicating Smart Animate\n\nFigma uses \"Smart Animate\" with Spring presets for prototypes. To match this buttery-smooth bounce in code without writing impossible CSS math, use Framer Motion's `spring` transition. `transition={{ type: \"spring\", stiffness: 300, damping: 20 }}` natively replicates Apple-tier UI bounces." }
            ]
        },
        {
            id: "phase14",
            title: "Phase 14: AnimatePresence",
            pages: [
                { id: "exit-animations", title: "The Unmounting Problem", content: "# Shrinking before disappearing\n\nIn React, if `isOpen === false`, the component is instantly destroyed and removed from the DOM. It has no time to play a CSS \"closing fade\". Wrapping a component in `<AnimatePresence>` intercepts the unmount hook, delaying termination until the `exit={{ opacity: 0 }}` animation physically finishes." }
            ]
        },
        {
            id: "phase15",
            title: "Phase 15: Scroll Animations",
            pages: [
                { id: "use-in-view", title: "Intersection Observers", content: "# Triggering on Visibility\n\nIf you want 3 cards to fade up chronologically *only* when the user scrolls down to them, you use Framer's `whileInView` or write a custom Intersection Observer hook. The observer fires an event exactly when the element crosses the 100vh viewport horizontal threshold." }
            ]
        },

        // ACCESSIBILITY & POLISH (PHASES 16-20)
        {
            id: "phase16",
            title: "Phase 16: Reduced Motion",
            pages: [
                { id: "prefers-reduced-motion", title: "Respecting the OS", content: "# Preventing Vertigo\n\nSome users configure Windows/macOS to disable animations (often due to vestibular motion sickness). Your code MUST listen to the `@media (prefers-reduced-motion: reduce)` media query. If detected, instantly override your complex Framer Motion transitions with a simple 0s fade." }
            ]
        },
        {
            id: "phase17",
            title: "Phase 17: Focus Trap Constraints",
            pages: [
                { id: "modal-accessibility", title: "The Esc Key", content: "# Trapping the Tab\n\nWhen a Modal opens, if the user presses Tab, their cursor shouldn't secretly 'click' buttons on the hidden background page. You must run Javascript to physically 'trap' their keyboard focus specifically inside the Modal's X button and Submit button until they press the physical ESC key." }
            ]
        },
        {
            id: "phase18",
            title: "Phase 18: Light & Dark Modes",
            pages: [
                { id: "css-variable-flipping", title: "The System Theme Sync", content: "# The Flash of Inaccurate Theme\n\nA perfect Dark Mode syncs automatically to the OS (`prefers-color-scheme`). Do not write `.dark-mode h1 { color: white }` across 500 files. Simply swap the value of the CSS Design Tokens on the `:root[data-theme='dark']` html tag, and the UI shifts mathematically." }
            ]
        },
        {
            id: "phase19",
            title: "Phase 19: The Retina Display Math",
            pages: [
                { id: "device-pixel-ratio", title: "Blurry Canvas Fixes", content: "# The 2x Multiplier\n\nApple Retina screens physically pack 4 pixels into the space of a standard 1080p pixel (Device Pixel Ratio = 2). If you render an HTML `<canvas>` without multiplying its base coordinate grid by `window.devicePixelRatio`, WebGL structures will look incredibly blurry and jagged on an iPhone." }
            ]
        },
        {
            id: "phase20",
            title: "Phase 20: Engineering Handoff Capstone",
            pages: [
                { id: "the-final-product", title: "Translating a Dribbble Shot", content: "# Building the Masterpiece\n\nYour final challenge: I will give you an insanely complex Dribbble shot. You will execute it pixel perfectly. You will identify the Design Tokens. You will build the Flexbox skeleton. You will extract the SVGs securely. And you will recreate the Spring micro-interactions perfectly in Framer Motion." }
            ]
        }
    ]
};
