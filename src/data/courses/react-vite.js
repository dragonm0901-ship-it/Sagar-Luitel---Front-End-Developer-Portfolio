export const reactViteCourse = {
    id: "react-vite",
    title: "React + Vite: Modern Stack",
    description: "Master React 19 fundamentals, hooks, custom hooks, and state management within the blazing fast Vite build tool.",
    image: "/courses/react_vite.png",
    tags: ["React", "Vite", "JavaScript", "Frontend"],
    duration: "40 Chapters",
    level: "Intermediate",
    modules: [
        {
            id: "phase1",
            title: "Phase 1: React Fundamentals & Vite",
            pages: [
                {
                    id: "why-vite",
                    title: "Vite and The Death of CRA",
                    content: `
# Sunset of Create React App

For years, \`create-react-app\` (CRA) was the absolute gold standard for bootstrapping React applications. However, modern web development demands extreme speed. 

> [!WARNING]
> CRA is officially deprecated by the React team. It relied on Webpack, which bundles the entire application codebase before serving it to the browser during development. As your app grows, this leads to massive, painful loading bottlenecks.

## Enter Vite: The Lightning Fast Build Tool

Vite (French for "quick") fundamentally changed the game for frontend tooling. It serves source files over **native ESM (ECMAScript Modules)**. 

1. **Instant Server Start:** The dev server starts in milliseconds, no matter how large the app is.
2. **Lightning Fast HMR:** Hot Module Replacement (HMR) updates instantly when you save a file. It only re-compiles the exact changed file.

\`\`\`bash
# The modern initialization command
npm create vite@latest my-react-app -- --template react
\`\`\`
                    `
                },
                {
                    id: "jsx-under-hood",
                    title: "JSX and The Virtual DOM",
                    content: `
# Demystifying JSX

JSX looks like HTML, but it is strictly JavaScript syntactic sugar. 

**What you write (JSX):**
\`\`\`jsx
const element = <h1 className="title">Hello World</h1>;
\`\`\`

**What it compiles to:**
\`\`\`javascript
const element = React.createElement(
  'h1',
  { className: 'title' },
  'Hello World'
);
\`\`\`

Because it compiles to a function call, a component can only ever return a single parent element. (Wrapping multiple elements in a Fragment \`<>\` solves this).

## The Virtual DOM

Modifying the actual browser DOM is incredibly slow and expensive. When a React component updates, React doesn't immediately destroy the standard HTML body. 

1. It builds a lightweight Javascript copy of the UI called the **Virtual DOM**.
2. It compares the *new* Virtual DOM against the *old* one (a process called **Reconciliation and Diffing**).
3. It figures out exactly what changed.
4. It patches *only* that specific node in the real browser DOM.
                    `
                },
                {
                    id: "props-components",
                    title: "Components and Props",
                    content: `
# Building Reusable Legos

Components let you split the UI into independent, reusable pieces. Props are how you pass data downwards from a Parent to a Child.

> [!IMPORTANT]
> Props are strictly immutable (read-only) in the child component. A child cannot modify the props it receives!

\`\`\`jsx
// The Child Component
function UserAvatar({ imgUrl, name, isPremium }) {
    return (
        <div className="avatar-card">
            <img src={imgUrl} alt={name} />
            <h2>{name}</h2>
            {isPremium && <span className="badge">Pro Member</span>}
        </div>
    );
}

// The Parent Component
function Dashboard() {
    return (
        <main>
            <UserAvatar 
                imgUrl="/sagar.jpg" 
                name="Sagar" 
                isPremium={true} 
            />
            <UserAvatar 
                imgUrl="/john.jpg" 
                name="John Doe" 
                isPremium={false} 
            />
        </main>
    );
}
\`\`\`
                    `
                }
            ]
        },
        {
            id: "project1",
            title: "Project: Interactive CV Builder",
            pages: [
                {
                    id: "cv-builder-spec",
                    title: "Milestone: CV Builder",
                    content: `
# Capstone 1: The CV App

Put your understanding of React Components and Props to the test by building an Interactive CV Builder.

## Requirements
1. **Component Architecture:** You must separate the application into two main views: the \`EditorForm\` and the \`ResumePreview\`.
2. **State Elevation:** The state (Name, Email, Education, Experience) must live in the Parent \`App\` component so it can be passed down as props to both the Editor and the Preview components simultaneously.
3. **Dynamic Rendering:** When a user types in the \`EditorForm\`, the \`ResumePreview\` must update in real-time.
                    `
                }
            ]
        },
        {
            id: "phase2",
            title: "Phase 2: Hooks Architecture",
            pages: [
                {
                    id: "useState-deepdive",
                    title: "The Rules of State",
                    content: `
# The Memory of a Component

State is a component's memory. When state updates, the component re-renders.

## The Asynchronous Nature of State
A massive trap for junior React developers is believing that \`setState\` happens immediately.

\`\`\`jsx
function Counter() {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1);
        // This will print 0, not 1! The state variable in this 
        // specific render closure still holds the old value.
        console.log(count); 
    }
}
\`\`\`

## Functional State Updates
If your new state depends on the previous state, you should pass an updater function to \`setCount\`.

\`\`\`jsx
const addThree = () => {
    // WRONG: React batches these, the result is only +1
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);

    // CORRECT: The function gets the guaranteed latest state value
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
}
\`\`\`
                    `
                },
                {
                    id: "useEffect-fetching",
                    title: "useEffect and Data Fetching",
                    content: `
# Synchronizing with the Outside World

\`useEffect\` is designed to let you synchronize a React component with an external system (Network APIs, Browser APIs, third-party libraries).

> [!WARNING]
> \`useEffect\` is NOT for deriving state. If you can calculate a value during the render phase based on existing state, do it. Do not use an effect to update another state variable.

## The Dependency Array

\`\`\`jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        let isActive = true;

        async function fetchUser() {
            const res = await fetch(\`/api/users/\${userId}\`);
            const data = await res.json();
            
            // Prevent setting state if component unmounted
            if (isActive) {
                setUser(data);
            }
        }

        fetchUser();

        // The Cleanup Function
        return () => {
            isActive = false;
        };

    }, [userId]); // This effect re-runs EVERY time userId changes!

    if (!user) return <p>Loading...</p>;
    return <h1>{user.name}</h1>;
}
\`\`\`
                    `
                }
            ]
        },
        {
            id: "phase3",
            title: "Phase 3: Advanced Patterns",
            pages: [
                {
                    id: "context-api",
                    title: "The Context API",
                    content: `
# Defeating Prop Drilling

"Prop Drilling" occurs when you have to pass a prop from a Grandparent -> Parent -> Child -> Grandchild, even though the middle components don't care about the data at all.

The **Context API** allows you to teleport data directly to the components that need it.

\`\`\`jsx
import { createContext, useContext, useState } from 'react';

// 1. Create the Context
const ThemeContext = createContext();

// 2. Create the Provider Component
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('dark');
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// 3. Consume the Context anywhere in the tree!
export function ThemeToggleButton() {
    const { theme, setTheme } = useContext(ThemeContext);
    
    return (
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            Turn off the lights
        </button>
    );
}
\`\`\`
                    `
                }
            ]
        },
        {
            id: "project3",
            title: "Capstone: E-Commerce Storefront",
            pages: [
                {
                    id: "store-spec",
                    title: "Project Specifications",
                    content: `
# The Final Challenge: E-Commerce Cart

Build a multi-page React application fetching data from the FakeStore API.

## Requirements
1. **React Router:** Set up routes for a Home page, a Shop page, Product Detail pages, and a Cart page.
2. **Data Fetching:** Use \`useEffect\` to fetch products from \`https://fakestoreapi.com/products\`.
3. **Context API:** Implement a \`CartProvider\` that tracks the user's cart items, and provides an \`addToCart\` and \`removeFromCart\` function across the entire app.
4. **React Testing:** Ensure your Cart icon in the navigation bar displays the accurate number of total items dynamically.
                    `
                }
            ]
        }
    ]
};
