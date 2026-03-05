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
                {
                    id: "vanilla-spa",
                    title: "Why Frameworks Exist",
                    content: `# Manual DOM Binding\n\nBefore you use \`useState\`, you must appreciate why it exists. Try building a dynamic 'Todo List' using \`document.createElement\`, \`appendChild\`, and manually tracking Array state variables.\n\n### The Vanilla Javascript Method\n\`\`\`javascript\nlet todos = ["Learn React"];\nconst list = document.getElementById('todo-list');\n\nfunction render() {\n    list.innerHTML = ''; // Wipe the entire DOM physically\n    todos.forEach(todo => {\n        const li = document.createElement('li');\n        li.textContent = todo;\n        list.appendChild(li);\n    });\n}\n\n// To add a new item, we must manually mutate data AND forcefully trigger a render\ntodos.push("Master WebGL");\nrender();\n\`\`\`\n\nThis is incredibly verbose, bug-prone, and slow (constantly destroying the physical HTML). UI should simply be an automatic mathematical reflection of Data. That is the core philosophy of React.`
                },
                {
                    id: "declarative-vs-imperative",
                    title: "Declarative UI",
                    content: `# Stating the Goal, Not the Steps\n\nVanilla JS is **Imperative** (Step 1: Get the element. Step 2: Change its color. Step 3: Append it). You micromanage the engine.\n\nReact is **Declarative**. You simply sketch the blueprint:\n\`\`\`jsx\n// React: "Hey Engine, I want an Array of strings to look like a list of <li> elements."\n<ul>\n   {todos.map(todo => <li>{todo}</li>)}\n</ul>\n\`\`\`\nWhen the \`todos\` array changes, React automatically figures out the most mathematically efficient way to update the screen.`
                }
            ]
        },
        {
            id: "phase2",
            title: "Phase 2: The Virtual DOM",
            pages: [
                {
                    id: "synthetic-shadow",
                    title: "Diffing Algorithms",
                    content: `# The O(n^3) Problem\n\nDirectly repainting the browser DOM is computationally heavy. If you have 10,000 rows in a table, and you delete row #2, forcing the Browser to Recalculate Layout for 9,999 rows causes horrific lag.\n\nReact creates a lightweight JavaScript object tree in memory (The Virtual DOM or V-DOM).`
                },
                {
                    id: "reconciliation",
                    title: "Reconciliation Process",
                    content: `# Calculation Before Mutation\n\nWhen a state changes:\n1. React builds a brand new Virtual DOM.\n2. It compares the New Virtual DOM against a snapshot of the Old Virtual DOM (Diffing).\n3. It isolates the exact mathematical differences.\n4. It batches those differences into a single, microscopic physical DOM mutation (Reconciliation).\n\nIf only row #2 changed, React physically alters exactly one \`<tr>\` node in the real DOM, bypassing the 9,999 other rows entirely.`
                }
            ]
        },
        {
            id: "phase3",
            title: "Phase 3: JSX Compilation",
            pages: [
                {
                    id: "react-create-element",
                    title: "Babel under the hood",
                    content: `# It's just Javascript\n\nJSX is not real HTML. It is 'Syntactic Sugar'. Browsers cannot read \`<div>Hello</div>\` inside a \`.js\` file.\n\nTools like Vite run your code through a compiler (like Babel or SWC). Look at how your JSX is permanently translated before hitting the browser:\n\n### Your Code\n\`\`\`jsx\nconst App = () => <div id=\"main\">Hello</div>\n\`\`\`\n\n### The Compiled Reality\n\`\`\`javascript\nconst App = () => React.createElement(\n  'div', \n  { id: 'main' }, \n  'Hello'\n);\n\`\`\`\n\nThis proves that JSX simply compiles down to nested javascript function calls returning objects.`
                },
                {
                    id: "jsx-rules",
                    title: "The Strict Rules of JSX",
                    content: `# Why 'class' is 'className'\n\nBecause JSX is physically Javascript under the hood, you cannot use reserved Javascript keywords as HTML attributes.\n\n*   \`class\` is a reserved JS word for building classes. So JSX uses \`className\`. \n*   \`for\` is reserved for loops. So JSX uses \`htmlFor\`.`
                }
            ]
        },
        {
            id: "phase4",
            title: "Phase 4: Component Architecture",
            pages: [
                {
                    id: "props-vs-state",
                    title: "The Immutable Core",
                    content: `# Props are Read-Only\n\nComponents are isolated mathematical functions. **Props** are the arguments passed into the function. They flow STRICTLY top-down (from Parent to Child). \n\n\`\`\`jsx\n// BAD: A child CANNOT change its own props\nfunction Child({ name }) {\n    name = \"Sagar\"; // CRASH! Props are immutable.\n}\n\`\`\`\n\n**State** (\`useState\`) is the internal memory of that specific component instance. Only the component that owns the State is allowed to change it. If a child needs to change a parent's state, the parent must pass down the \`setState\` function explicitly as a prop.`
                },
                {
                    id: "composition",
                    title: "Component Composition",
                    content: `# The 'children' Prop\n\nInstead of passing massive configuration arrays down to a component, you can pass physical JSX components *into* other components.\n\n\`\`\`jsx\n// The Wrapper\nfunction Modal({ children }) {\n    return <div className=\"modal-bg\">{children}</div>\n}\n\n// The Usage\n<Modal>\n    <h1>Delete User?</h1>\n    <button>Confirm</button>\n</Modal>\n\`\`\`\nThis completely decouples the Modal CSS layout from the business logic contained inside it.`
                }
            ]
        },
        {
            id: "phase5",
            title: "Phase 5: Key Prop Mechanics",
            pages: [
                {
                    id: "array-mapping",
                    title: "Why Index is Dangerous",
                    content: `# Array Mutation Bugs\n\nWhen \`array.map()\`-ing over data, passing \`key={index}\` is a fatal error if the array can be sorted, deleted, or filtered.\n\n\`\`\`jsx\n// DANGEROUS PATTERN\n{users.map((user, idx) => <UserCard key={idx} />)}\n\`\`\`\n\nIf you delete User #1, User #2 mathematically drops down to index #1. React's Diffing Algorithm looks at \`key=1\` and assumes the component didn't change, secretly attaching the internal State of the deleted user onto the new user. It visually scrambles your application.`
                },
                {
                    id: "unique-uuids",
                    title: "The Stable Identifier",
                    content: `# Mathematical Anchors\n\nYou MUST use a unique database UUID (` + "`" + `key={item.id}` + "`" + `).\n\n\`\`\`jsx\n// PERFECT PATTERN\n{users.map(user => <UserCard key={user.db_uuid} />)}\n\`\`\`\n\nNow, if the array order changes, React instantly detects that the \`db_uuid\` physically moved inside the V-DOM, and will flawlessly animate the DOM nodes swapping places without destroying their internal state.`
                }
            ]
        },

        // THE HOOK LIFECYCLE (PHASES 6-10)
        {
            id: "phase6",
            title: "Phase 6: The useState Queue",
            pages: [
                {
                    id: "batching-state",
                    title: "Asynchronous Batching",
                    content: `# Why State Doesn't Update Instantly\n\nIf you call \`setCount(5)\` and immediately \`console.log(count)\` on the next line, it will output \`0\`.\n\n\`setState\` does NOT change the variable. It places a *request to change the variable* in a queue. React bundles multiple state updates together during an event loop tick and applies them all at once (Batching) to prevent unnecessary re-renders.`
                },
                {
                    id: "functional-updates",
                    title: "The Updater Function",
                    content: `# Double Calling State\n\nIf you run this code:\n\`\`\`jsx\nconst incrementTwice = () => {\n  setCount(count + 1);\n  setCount(count + 1);\n}\n\`\`\`\nIf count was 0, the final output will be 1. Why? Because the second line still reads \`count\` as 0 from the current render snapshot. \n\nYou MUST use an updater callback function: \`setCount(prev => prev + 1)\`. This mathematically pulls the most recent value physically out of React's hidden queue.`
                }
            ]
        },
        {
            id: "phase7",
            title: "Phase 7: useEffect Dependencies",
            pages: [
                {
                    id: "infinite-loops",
                    title: "The Stale Closure Dilemma",
                    content: `# The Most Dangerous Hook\n\n\`useEffect\` synchronizes React with external systems (database fetches). If your function reads a state variable, that variable MUST be in the Dependency Array.\n\n\`\`\`jsx\nconst [id, setId] = useState(1);\n\nuseEffect(() => {\n  fetchData(id); // If 'id' is NOT in the dependency array below:\n}, []); // <-- React will permanently trap the value '1' in a Stale Closure.\n\`\`\`\nIf \`id\` becomes 5, the effect will still fetch ID 1 forever.`
                },
                {
                    id: "object-dependencies",
                    title: "Referential Equality Bugs",
                    content: `# Infinite Loop Traps\n\n\`\`\`jsx\nconst config = { active: true }; // This object is recreated on EVERY render\n\nuseEffect(() => {\n  doMath();\n}, [config]); // Because {} !== {}, this triggers an infinite loop.\n\`\`\`\nYou must wrap Objects/Arrays/Functions in \`useMemo\` or \`useCallback\` if you want to place them in a Dependency Array safely.`
                }
            ]
        },
        {
            id: "phase8",
            title: "Phase 8: Memory Leak Prevention",
            pages: [
                {
                    id: "cleanup-functions",
                    title: "Destroying Listeners",
                    content: `# Returning the Cleanup\n\nIf you attach a \`window.addEventListener('scroll')\` inside a \`useEffect\`, and the user navigates away to a new page, that listener keeps running in the background, permanently eating RAM.\n\n\`\`\`jsx\nuseEffect(() => {\n  const handler = () => console.log('scrolling');\n  window.addEventListener('scroll', handler);\n\n  // CRITICAL: The Cleanup Function runs when the component unmounts\n  return () => window.removeEventListener('scroll', handler);\n}, []);\n\`\`\``
                },
                {
                    id: "abort-controllers",
                    title: "Cancelling API Calls",
                    content: `# The Race Condition\n\nIf User clicks 'Profile A' (takes 5s to load) and instantly clicks 'Profile B' (takes 1s to load).\nProfile B loads immediately. 4 seconds later, Profile A's data finally arrives and overwrites Profile B on the screen. \n\nYou must catch this using the \`AbortController\` Web API inside your cleanup function to physically sever the HTTP request if the user navigates away before it finishes.`
                }
            ]
        },
        {
            id: "phase9",
            title: "Phase 9: Custom Hooks",
            pages: [
                {
                    id: "logic-extraction",
                    title: "Sharing behavior, not state",
                    content: `# Headless Logic\n\nA custom hook (\`useWindowSize\` or \`useFetch\`) extracts complex \`useState\` and \`useEffect\` spaghetti out of your UI component.\n\nCrucially, if Component A and Component B both use \`useFetch\`, they do NOT share data. They each get entirely independent, sandboxed instances of that logic.`
                },
                {
                    id: "use-local-storage",
                    title: "Building useLocalStorage",
                    content: `# Extending React\n\nYou can architect a custom hook that acts exactly like \`useState\`, but silently persists its data into the Browser's Hard Drive.\n\n\`\`\`javascript\nexport function useLocalStorage(key, initialValue) {\n  const [value, setValue] = useState(() => {\n    const item = window.localStorage.getItem(key);\n    return item ? JSON.parse(item) : initialValue;\n  });\n\n  const setter = (newValue) => {\n    setValue(newValue);\n    window.localStorage.setItem(key, JSON.stringify(newValue));\n  };\n\n  return [value, setter];\n}\n\`\`\``
                }
            ]
        },
        {
            id: "phase10",
            title: "Phase 10: useLayoutEffect",
            pages: [
                {
                    id: "render-blocking",
                    title: "Preventing Flashes",
                    content: `# Synchronous DOM Measuring\n\n\`useEffect\` runs *asynchronously after* the browser paints the screen. If you use it to calculate the \`height\` of a tooltip and move the tooltip up by 20px, the user will see a visible 'flicker'.\n\n\`useLayoutEffect\` runs synchronously *before* the browser paints. The browser is mathematically frozen until your calculations finish, eliminating the flicker entirely (at the cost of slightly lower frame rates).`
                }
            ]
        },

        // ADVANCED STATE (PHASES 11-15)
        {
            id: "phase11",
            title: "Phase 11: useRef (Mutable Boxes)",
            pages: [
                {
                    id: "bypassing-renders",
                    title: "Variables that survive",
                    content: `# Don't wake React\n\nChanges to a \`useRef.current\` value do NOT trigger a component to re-render. \n\nIt is a persistent 'box' that survives across renders. It's used for storing values (like a \`setInterval\` ID, or a Previous State snapshot) that the logic needs to remember, but shouldn't cause the UI to repaint when updated.`
                },
                {
                    id: "dom-attachment",
                    title: "Focusing Elements",
                    content: `# Bypassing document.getElementById\n\nYou should almost never write \`document.querySelector\` in React. You attach a ref directly to the JSX.\n\n\`\`\`jsx\nconst inputRef = useRef(null);\n\n// Instantly focus the input box when the page loads\nuseEffect(() => {\n  inputRef.current.focus();\n}, [])\n\nreturn <input ref={inputRef} />\n\`\`\``
                }
            ]
        },
        {
            id: "phase12",
            title: "Phase 12: Context API Boundaries",
            pages: [
                {
                    id: "prop-drilling",
                    title: "Solving Prop Drilling",
                    content: `# The Global Broadcast\n\nContext solves passing \`user={user}\` down 7 levels deep through components that don't need it. You wrap your app in \`<UserContext.Provider value={user}>\`, and any deeply nested child can instantly call \`useContext(UserContext)\` to grab the data.`
                },
                {
                    id: "render-waterfalls",
                    title: "The Performance Nightmare",
                    content: `# Why Context is Dangerous\n\nAny time a Provider's \`value\` changes, **EVERY SINGLE COMPONENT** consuming that Context instantly re-renders. \n\nIf you put \"keystrokes in a global search bar\" inside a Context, the entire application will forcefully re-render 10 times a second as you type. Context is only for incredibly slow-changing data: Themes, Auth Tokens, and Languages.`
                }
            ]
        },
        {
            id: "phase13",
            title: "Phase 13: useReducer",
            pages: [
                {
                    id: "complex-state",
                    title: "State Machines",
                    content: `# Discarding multiple useStates\n\nIf you find yourself writing \`setIsLoading(true); setError(null); setData([]);\` across 5 different files, your state logic is scattered and brittle.\n\n\`useReducer\` centralizes complex, interlocking state updates into a single predictable Javascript pure function (usually a switch statement handling 'Actions' like \`FETCH_START\` or \`FETCH_SUCCESS\`).`
                }
            ]
        },
        {
            id: "phase14",
            title: "Phase 14: Zustand & Atomic State",
            pages: [
                {
                    id: "zustand",
                    title: "Escaping React's Tree",
                    content: `# The Modern Redux\n\nZustand sits entirely *outside* the React Component Lifecycle Tree. \n\n\`\`\`javascript\nconst useStore = create((set) => ({\n  likes: 0,\n  addLike: () => set((state) => ({ likes: state.likes + 1 })),\n}))\n\`\`\`\n\nA component can 'subscribe' to exactly 1 variable: \`const likes = useStore(state => state.likes)\`. When \`likes\` changes, ONLY that specific component re-renders. Total surgical precision without Context waterfalls.`
                }
            ]
        },
        {
            id: "phase15",
            title: "Phase 15: Jotai & Recoil",
            pages: [
                {
                    id: "bottom-up-state",
                    title: "Atoms",
                    content: `# The Graph Architecture\n\nInstead of a massive object at the top of your app (Redux), Jotai breaks everything down into microscopic 'Atoms' (\`const countAtom = atom(1)\`). \n\nComponents compose these atoms together bottom-up. When \`countAtom\` changes, only components explicitly reading that exact atom will draw. It perfectly mirrors React's component mental model.`
                }
            ]
        },

        // PERFORMANCE TUNING (PHASES 16-20)
        {
            id: "phase16",
            title: "Phase 16: React.memo",
            pages: [
                {
                    id: "shallow-compare",
                    title: "Stopping the Waterfall",
                    content: `# Referential Equality\n\nIf a Parent component re-renders, ALL Children automatically re-render by default, even if their props didn't actually change!\n\nWrapping a child in \`React.memo(Child)\` tells React engine: 'Do a strict shallow comparison of my old props and new props. If they are exactly the same (` + "`" + `old === new` + "`" + `), skip recalculating my Virtual DOM entirely.'`
                }
            ]
        },
        {
            id: "phase17",
            title: "Phase 17: useMemo & useCallback",
            pages: [
                {
                    id: "caching-math",
                    title: "Caching Functions",
                    content: `# The Object Literal Trap\n\nPassing \`{ id: 1 }\` as a prop to a \`React.memo\` child fails. The Parent creates a brand new memory pointer for that Object every render, so the Child sees \`0x123 !== 0x789\` and re-renders anyway.\n\nYou must wrap the object in \`useMemo\`, or the child function in \`useCallback\`, to physically cache the RAM reference across renders.`
                }
            ]
        },
        {
            id: "phase18",
            title: "Phase 18: Code Splitting",
            pages: [
                {
                    id: "lazy-suspense",
                    title: "React.lazy",
                    content: `# Shrinking the Bundle\n\nDon't force the user to download 5MB of Admin Dashboard JavaScript if they are just on the Login screen.\n\n\`\`\`jsx\nconst AdminPanel = React.lazy(() => import('./AdminPanel'));\n\n// It will only execute the Network Request for the code when this Route renders\n<Suspense fallback={<Spinner />}>\n   <AdminPanel />\n</Suspense>\n\`\`\``
                }
            ]
        },
        {
            id: "phase19",
            title: "Phase 19: Error Boundaries",
            pages: [
                {
                    id: "catching-crashes",
                    title: "Preventing White Screens",
                    content: `# The Last Stand\n\nIf a single child component crashes (e.g., calling \`.map()\` on an API payload that unexpectedly returned \`undefined\`), the entire React application permanently unmounts, leaving a blank white screen.\n\nYou must wrap major sections of your app in \`<ErrorBoundary>\` class components to gracefully catch JS runtime errors and display a Fallback UI instead of killing the entire tree.`
                }
            ]
        },
        {
            id: "phase20",
            title: "Phase 20: Concurrent Mode",
            pages: [
                {
                    id: "use-transition",
                    title: "Prioritizing the CPU",
                    content: `# Non-blocking UI\n\nIf the user types in a search bar, and you use that string to instantly filter a list of 10,000 array items, the text input box will stutter and freeze while the CPU loops through the data.\n\n\`useTransition\` tells React: 'The visual typing update is High Priority. The 10,000 item backend filter is Low Priority. Pause the list filtering mathematically between frames so the user can keep typing smoothly.'`
                }
            ]
        },

        // REACT SERVER COMPONENTS (PHASES 21-25)
        {
            id: "phase21",
            title: "Phase 21: The SPA Problem",
            pages: [
                {
                    id: "seo-waterfalls",
                    title: "Why Next.js Exists",
                    content: `# The First Contentful Paint\n\nA standard Vite React app (Single Page Application) sends a completely blank \`<div id='root'></div>\` Document across the internet.\n\nThe browser must download the HTML, then download 1MB of React JS, boot up the engine, run the initial \`useEffect\`, and finally hit the Database. This causes extreme delays on 3G mobiles and causes Google SEO bots to index a literally blank white page.`
                }
            ]
        },
        {
            id: "phase22",
            title: "Phase 22: SSR vs SSG",
            pages: [
                {
                    id: "server-rendering",
                    title: "Server Side vs Static",
                    content: `# Pre-baking the HTML\n\n**SSG (Static Site Generation):** Your Node server builds the final React HTML files exactly *once* during deployment. When a user requests the page, the server streams the pre-baked HTML instantly (0.01s load times). Perfect for Blogs.\n**SSR (Server Side Rendering):** Your Node server builds the React HTML dynamically for *every single incoming HTTP request*. Perfect for user-specific data like E-Commerce Carts.`
                }
            ]
        },
        {
            id: "phase23",
            title: "Phase 23: Hydration",
            pages: [
                {
                    id: "hydration-mismatch",
                    title: "Attaching the Wires",
                    content: `# Making it interactive\n\nWhen a Node server sends pre-rendered HTML to the user, they see a beautiful page instantly. But the \`<button>\` tags don't do anything! They are dead text.\n\nReact must download the Javascript bundle in the background and 'Hydrate' (algorithmically attach the \`onClick\` event listeners) to the static HTML to bring the app back to life.`
                }
            ]
        },
        {
            id: "phase24",
            title: "Phase 24: React Server Components",
            pages: [
                {
                    id: "rsc-architecture",
                    title: "Zero Client Bundle Size",
                    content: `# The Next Era of React\n\nRSCs (the default in Next.js App Router) are React components that only ever execute on the pure Node Server. \n\nBecause they run on the server, you can literally run \`const data = await SQL.query()\` securely inside the component! They stream pure HTML down, and NEVER send their Javascript to the Browser, reducing the frontend bundle size by up to 90%.`
                }
            ]
        },
        {
            id: "phase25",
            title: "Phase 25: React 19 Compiler",
            pages: [
                {
                    id: "react-compiler",
                    title: "The Death of useMemo",
                    content: `# Automated Performance\n\nFor 10 years, senior developers wasted countless hours manually wiring up complex \`useMemo\` and \`React.memo\` arrays to fix stuttering UIs.\n\nThe new React 19 Compiler acts as an AOT (Ahead of Time) compiler in Vite. It analyzes your Javascript Abstract Syntax Tree mathematically and automatically memoizes the entire application at build time, permanently eliminating manual performance tuning.`
                }
            ]
        }
    ]
};
