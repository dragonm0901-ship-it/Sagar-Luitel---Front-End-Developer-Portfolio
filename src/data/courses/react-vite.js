export const reactVite = {
    id: "react-vite",
    title: "React + Vite: The 25-Phase Epic",
    description: "The definitive guide to component architecture. From basic JSX mapping to engineering React Server Components (RSC) and manipulating the Fiber reconciliation tree.",
    image: "/courses/react_vite.png",
    tags: ["React", "Vite", "Performance", "RSC", "Epic"],
    duration: "125 Chapters (React 19 Ready)",
    level: "All Levels",
    modules: [
        // THE FOUNDATIONAL DOM (PHASES 1-5)
        {
            id: "phase1",
            title: "Phase 1: React Without React",
            pages: [
                { id: "vanilla-spa", title: "Why Frameworks Exist", content: "# Manual DOM Binding\n\nBefore you use `useState`, you must appreciate why it exists. Try building a dynamic 'Todo List' using `document.createElement`, `appendChild`, and manually tracking Array state variables. It's incredibly verbose and bug-prone." }
            ]
        },
        {
            id: "phase2",
            title: "Phase 2: The Virtual DOM",
            pages: [
                { id: "synthetic-shadow", title: "Diffing Algorithms", content: "# The O(n^3) Problem\n\nDirectly repainting the browser DOM is computationally heavy. React creates a lightweight JavaScript object tree (The V-DOM). Upon a state change, it compares the old V-DOM to the new V-DOM (Diffing), calculating the absolute minimum number of real DOM mutations required (Reconciliation)." }
            ]
        },
        {
            id: "phase3",
            title: "Phase 3: JSX Compilation",
            pages: [
                { id: "react-create-element", title: "Babel under the hood", content: "# It's just Javascript\n\nJSX is not real. It is 'Syntactic Sugar'. Browsers cannot read `<div>Hello</div>` inside a `.js` file. Tools like Vite/Babel compile that JSX into `React.createElement('div', null, 'Hello')` before serving it." }
            ]
        },
        {
            id: "phase4",
            title: "Phase 4: Component Architecture",
            pages: [
                { id: "props-vs-state", title: "The Immutable Core", content: "# Props vs State\n\nComponents are mathematical functions. `Props` are the arguments passed into the function (they are strictly read-only and immutable). `State` is the internal memory of that specific component instance (which triggers a destructive re-render when changed)." }
            ]
        },
        {
            id: "phase5",
            title: "Phase 5: Key Prop Mechanics",
            pages: [
                { id: "array-mapping", title: "Why Index is Dangerous", content: "# Array Mutation Bugs\n\nWhen `array.map()`-ing over data, passing `key={index}` is a fatal error if the array can be sorted or filtered. If 'Item C' moves from Index 2 to Index 0, React's Diffing Algorithm gets confused and attaches the wrong state internally. You must always use a unique database UUID (`key={item.id}`)." }
            ]
        },

        // THE HOOK LIFECYCLE (PHASES 6-10)
        {
            id: "phase6",
            title: "Phase 6: The useState Queue",
            pages: [
                { id: "batching-state", title: "Asynchronous Batching", content: "# Why State Doesn't Update Instantly\n\nIf you call `setCount(5)` and immediately `console.log(count)` on the next line, it will output `0`. React bundles multiple setStates together during an event loop tick and applies them all at once (Batching) to prevent unnecessary re-renders." }
            ]
        },
        {
            id: "phase7",
            title: "Phase 7: useEffect Dependencies",
            pages: [
                { id: "infinite-loops", title: "The Stale Closure Dilemma", content: "# The Most Dangerous Hook\n\n`useEffect` is an escape hatch to synchronize React with external systems (like fetching a database or attaching a `window.addEventListener`). If your function inside the hook 'reads' a state variable, that variable MUST be in the Dependency Array, otherwise the hook will trap an old 'ghost' version of that variable." }
            ]
        },
        {
            id: "phase8",
            title: "Phase 8: Memory Leak Prevention",
            pages: [
                { id: "cleanup-functions", title: "Destroying Listeners", content: "# Returning the Cleanup\n\nIf you attach a `setInterval` or `window.addEventListener('scroll')` inside a `useEffect`, and the user navigates away to a new page, that listener keeps running in the background, permanently eating RAM. You must `return () => clearInterval(id)` to destroy it when the component unmounts." }
            ]
        },
        {
            id: "phase9",
            title: "Phase 9: Custom Hooks",
            pages: [
                { id: "logic-extraction", title: "Sharing behavior, not state", content: "# Headless Logic\n\nA custom hook (e.g., `useWindowSize` or `useFetch`) extracts complex logic. Crucially, if Component A and Component B both use `useFetch`, they do NOT share data. They each get entirely independent, sandboxed instances of that logic." }
            ]
        },
        {
            id: "phase10",
            title: "Phase 10: useLayoutEffect",
            pages: [
                { id: "render-blocking", title: "Preventing Flashes", content: "# Synchronous DOM Measuring\n\n`useEffect` runs *after* the browser paints the screen. If you use it to calculate the `height` of a tooltip and move the tooltip up by 20px, the user will see a visible 'flicker'. `useLayoutEffect` runs synchronously *before* the browser paints, eliminating the flicker (at the cost of blocking the render)." }
            ]
        },

        // ADVANCED STATE (PHASES 11-15)
        {
            id: "phase11",
            title: "Phase 11: useRef (Mutable Boxes)",
            pages: [
                { id: "bypassing-renders", title: "Variables that survive", content: "# Don't wake React\n\nChanges to a `useRef.current` value do NOT trigger a re-render. It is a persistent 'box' that survives across renders. It's used for attaching directly to an HTML element (`inputRef.current.focus()`) or storing values (like a timer ID) that shouldn't cause the UI to repaint." }
            ]
        },
        {
            id: "phase12",
            title: "Phase 12: Context API Boundaries",
            pages: [
                { id: "prop-drilling", title: "Solving Prop Drilling", content: "# The Global Broadcast\n\nContext solves passing `user={user}` down 7 levels deep. However, any time a Context value changes, EVERY single component consuming that Context immediately re-renders. It is terrible for rapidly changing data (like text input keystrokes), but perfect for 'Theme' or 'User Session'." }
            ]
        },
        {
            id: "phase13",
            title: "Phase 13: useReducer",
            pages: [
                { id: "complex-state", title: "State Machines", content: "# Discarding multiple useStates\n\nIf you find yourself writing `setIsLoading(true); setError(null); setData([]);` across 5 different files, your state logic is scattered and brittle. `useReducer` centralizes complex, interlocking state updates into a single predictable Javascript switch statement." }
            ]
        },
        {
            id: "phase14",
            title: "Phase 14: Zustand & Atomic State",
            pages: [
                { id: "zustand", title: "Escaping React's Tree", content: "# The Modern Redux\n\nContext causes massive re-renders. Zustand sits *outside* the React Component Tree. A component can 'subscribe' to exactly 1 variable (`const likes = useStore(state => state.likes)`). When `likes` changes, ONLY that specific component re-renders. Total surgical precision." }
            ]
        },
        {
            id: "phase15",
            title: "Phase 15: Jotai & Recoil",
            pages: [
                { id: "bottom-up-state", title: "Atoms", content: "# The Graph Architecture\n\nInstead of a massive object at the top of your app (Redux), Jotai breaks everything down into microscopic 'Atoms' (`const countAtom = atom(1)`). Components compose these atoms together bottom-up, perfectly mirroring React's component mental model." }
            ]
        },

        // PERFORMANCE TUNING (PHASES 16-20)
        {
            id: "phase16",
            title: "Phase 16: React.memo",
            pages: [
                { id: "shallow-compare", title: "Stopping the Waterfall", content: "# Referential Equality\n\nIf a Parent parent re-renders, ALL Children automatically re-render by default, even if their props didn't change! Wrapping a child in `React.memo(Child)` tells React: 'Do a shallow comparison of my old props and new props. If they are exactly the same, skip rendering me.'" }
            ]
        },
        {
            id: "phase17",
            title: "Phase 17: useMemo & useCallback",
            pages: [
                { id: "caching-math", title: "Caching Functions", content: "# The Object Literal Trap\n\nPassing `{ id: 1 }` as a prop creates a brand new object in RAM every standard render, causing `React.memo` to fail because `{id:1} !== {id:1}`. You must wrap the object in `useMemo`, or the function in `useCallback`, to cache the exact RAM reference across renders." }
            ]
        },
        {
            id: "phase18",
            title: "Phase 18: Code Splitting",
            pages: [
                { id: "lazy-suspense", title: "React.lazy", content: "# Shrinking the Bundle\n\nDon't force the user to download 5MB of Admin Dashboard JavaScript if they are just on the Login screen. Use `React.lazy(() => import('./Admin'))` paired with `<Suspense>` to dynamically download chunks of the app ONLY when the user clicks that specific route." }
            ]
        },
        {
            id: "phase19",
            title: "Phase 19: Error Boundaries",
            pages: [
                { id: "catching-crashes", title: "Preventing White Screens", content: "# The Last Stand\n\nIf a single child component crashes (e.g., calling `.map()` on `undefined`), the entire React tree dies, leaving a blank white screen. You must wrap major sections of your app in `<ErrorBoundary>` class components to gracefully catch JS errors and show a Fallback UI." }
            ]
        },
        {
            id: "phase20",
            title: "Phase 20: Concurrent Mode",
            pages: [
                { id: "use-transition", title: "Prioritizing the CPU", content: "# Non-blocking UI\n\nIf the user types in a search bar, and you use that string to instantly filter a list of 10,000 items, the typing will stutter heavily. `useTransition` tells React: 'The visual search bar update is High Priority. The 10,000 item list filter is Low Priority. Pause the list filtering mathematically so the user can keep typing smoothly.'" }
            ]
        },

        // REACT SERVER COMPONENTS (PHASES 21-25)
        {
            id: "phase21",
            title: "Phase 21: The SPA Problem",
            pages: [
                { id: "seo-waterfalls", title: "Why Next.js Exists", content: "# The First Contentful Paint\n\nA standard Vite React app sends a completely blank `div id='root'` Document to the browser. The browser downloads the JS, boots up React, and finally requests the database. This is terrible for SEO (bots see blank pages) and slow for mobile networks." }
            ]
        },
        {
            id: "phase22",
            title: "Phase 22: SSR vs SSG",
            pages: [
                { id: "server-rendering", title: "Server Side vs Static", content: "# Pre-baking the HTML\n\n**SSG (Static Site Generation):** Build the HTML exactly once during deployment (perfect for Blogs).\n**SSR (Server Side Rendering):** Build the HTML dynamically on the server for *every single incoming request* (perfect for E-Commerce)." }
            ]
        },
        {
            id: "phase23",
            title: "Phase 23: Hydration",
            pages: [
                { id: "hydration-mismatch", title: "Attaching the Wires", content: "# Making it interactive\n\nWhen a server sends pre-rendered HTML to the user, they see a beautiful page instantly, but the buttons don't do anything yet! React must download the Javascript bundle in the background and 'Hydrate' (attach event listeners to) the static HTML." }
            ]
        },
        {
            id: "phase24",
            title: "Phase 24: React Server Components",
            pages: [
                { id: "rsc-architecture", title: "Zero Client Bundle Size", content: "# The Next Era of React\n\nRSCs (the default in Next.js App Router) are components that only execute on the Node Server and stream pure HTML down. They NEVER send their Javascript to the Browser, reducing the bundle size by 90% and allowing secure direct SQL Database queries from right inside the component." }
            ]
        },
        {
            id: "phase25",
            title: "Phase 25: React 19 Compiler",
            pages: [
                { id: "react-compiler", title: "The Death of useMemo", content: "# Automated Performance\n\nFor 10 years, developers had to manually wire up `useMemo` and `React.memo` arrays. The new React 19 Compiler analyzes your code perfectly and auto-memoizes the entire application at build time, eliminating manual performance tuning." }
            ]
        }
    ]
};
