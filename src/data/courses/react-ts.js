export const reactTsCourse = {
    id: "react-ts",
    title: "React + TypeScript Pro",
    description: "Type-safe React applications for enterprise scale. Master generics, strictly typed hooks, and advanced component architectures.",
    image: "/courses/react_ts.png",
    tags: ["React", "TypeScript", "Enterprise", "Frontend"],
    duration: "30 Chapters",
    level: "Advanced",
    modules: [
        {
            id: "phase1",
            title: "Phase 1: Typed Components",
            pages: [
                {
                    id: "typing-props",
                    title: "Interfaces and Prop Types",
                    content: `
# Breaking the \`any\` Habit

If you use \`any\` in TypeScript, you are just writing JavaScript with extra steps. The primary goal of TypeScript in React is to enforce strict prop contracts on your components.

> [!WARNING]
> Never use \`React.FC\` or \`React.FunctionComponent\`. It implicitly adds \`children\` to your props, even if your component isn't designed to accept children, causing upstream bugs.

## Defining Prop Interfaces

Always define an \`Interface\` (or \`type\`) above your component.

\`\`\`tsx
// Define the shape of your data
interface UserCardProps {
    id: string;
    username: string;
    isActive: boolean;
    // Optional props use the ?
    avatarUrl?: string; 
    // Typing passing functions
    onBanUser: (id: string, reason: string) => void;
}

export function UserCard({ id, username, isActive, avatarUrl, onBanUser }: UserCardProps) {
    return (
        <div className={\`card \${isActive ? 'active' : 'inactive'}\`}>
            {avatarUrl ? <img src={avatarUrl} alt={username} /> : <div className="placeholder" />}
            <h2>{username}</h2>
            <button onClick={() => onBanUser(id, "TOS Violation")}>Ban</button>
        </div>
    );
}
\`\`\`
                    `
                },
                {
                    id: "typing-hooks",
                    title: "Strictly Typed Hooks",
                    content: `
# Generics in useState and useRef

Often, TypeScript is smart enough to infer the type of a hook.

\`\`\`tsx
const [count, setCount] = useState(0); // TS knows count is a number
\`\`\`

## Typing useState with Generics

We pass a Generic \`<T>\` to the \`useState\` function call to tell TypeScript: "This state will either be a User Object, or it will be null."

\`\`\`tsx
interface User {
    id: number;
    email: string;
}

export function Profile() {
    // The generic <User | null> enforces strict safety!
    const [user, setUser] = useState<User | null>(null);

    // TypeScript will throw a lint error here if you don't check for null first!
    if (!user) return <p>Loading...</p>;

    return <h1>{user.email}</h1>;
}
\`\`\`
                    `
                }
            ]
        },
        {
            id: "phase2",
            title: "Phase 2: Performance & Optimization",
            pages: [
                {
                    id: "usecallback-usememo",
                    title: "useCallback and useMemo",
                    content: `
# Preventing Wasted Renders

In React, whenever a Parent component re-renders, **all** of its Child components fundamentally re-render by default (even if their props haven't changed!). 

If a Child component contains a massive computation (like sorting 10,000 table rows), this default behavior will destroy your app's performance.

## useMemo (Caching Values)
Instead of recalculating the 10,000 rows on every single keypress in a completely unrelated input field, you memoize (cache) the result.

\`\`\`tsx
import { useMemo } from 'react';

// This expensive calculation ONLY runs if 'usersArray' physically changes
const sortedUsers = useMemo(() => {
    return usersArray.sort((a, b) => b.score - a.score);
}, [usersArray]);
\`\`\`

## useCallback (Caching Functions)
In JavaScript, an object or function created on Line 1 is strictly not equal to an identical object created on Line 2. 
\`{} === {}\` is \`false\`.

If you pass a function down as a prop, React creates a brand new function reference on every render, immediately forcing the child to re-render. Wrap it in \`useCallback\`.

\`\`\`tsx
import { useCallback } from 'react';

// This function reference is cached across renders!
const onRowDelete = useCallback((id: string) => {
    setUsers(curr => curr.filter(u => u.id !== id));
}, []); // Empty dependency array means this function never changes reference
\`\`\`
                    `
                }
            ]
        },
        {
            id: "phase3",
            title: "Phase 3: Automated Testing",
            pages: [
                {
                    id: "react-testing-lib",
                    title: "React Testing Library (RTL)",
                    content: `
# Testing Behaviors, Not Implementations

The hardest part of shipping enterprise apps is ensuring your new features don't silently break old ones. We solve this with Automated Testing.

React Testing Library (RTL) forces you to test your components exactly how a real user would interact with them—by clicking buttons and looking for text on the screen.

\`\`\`tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

describe('Counter Component', () => {
    it('increments the count when the button is clicked', async () => {
        // 1. Arrange: Render the component into a virtual JSDOM
        render(<Counter />);
        
        // 2. Act: Find the button and click it
        const incButton = screen.getByRole('button', { name: /increment/i });
        await userEvent.click(incButton);
        
        // 3. Assert: Verify the screen displays "Count: 1"
        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toHaveTextContent('Count: 1');
    });
});
\`\`\`
                    `
                }
            ]
        },
        {
            id: "project1",
            title: "Project: Enterprise Architecture",
            pages: [
                {
                    id: "table-spec",
                    title: "Milestone: Generic Sorting Table",
                    content: `
# Advanced Component Architecture

You will build a highly reusable Data Table component utilizing **TypeScript Generics (<T>)**.

## Requirements
1. **Generic Typing:** The \`<Table />\` component must not be hardcoded to accept "Users" or "Products". It must accept an array of generic type \`<T>\`.
2. **Column Definitions:** Pass a \`columns\` array that strict-types the rendering logic for any data shape.
3. **Performance:** Wrap your row sorting logic in \`useMemo\` to prevent application stutter when selecting hundreds of rows.
4. **Test Suite:** Write Vitest/RTL tests to prove that clicking a column header accurately sorts the table data in ascending/descending order.
                    `
                }
            ]
        }
    ]
};
