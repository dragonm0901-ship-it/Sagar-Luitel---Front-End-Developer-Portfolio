export const reactTs = {
    id: "react-ts",
    title: "React + TypeScript Pro: The 20-Phase Epic",
    description: "The definitive guide to the TS Compiler. Migrate from sloppy JavaScript to strict TypeScript. Master Generic components, complex Discriminated Unions, and utility types.",
    image: "/courses/react_ts.png",
    tags: ["React", "TypeScript", "Pro", "Generics", "Epic"],
    duration: "100 Chapters (Intermediate to Senior)",
    level: "Intermediate",
    modules: [
        // THE FOUNDATIONAL TYPES (PHASES 1-5)
        {
            id: "phase1",
            title: "Phase 1: The 'Any' Virus",
            pages: [
                { id: "strict-mode", title: "Why type 'any' defeats the purpose", content: "# The Illusion of Safety\n\nWhen developers are forced to learn TypeScript, they often get frustrated by the compiler screaming at them. To bypass the errors, they use the `any` type (`const fetchUser = (id: any): any => {}`). This is a virus that spreads. Production apps must enforce `\"strict\": true`." }
            ]
        },
        {
            id: "phase2",
            title: "Phase 2: Primitives vs Objects",
            pages: [
                { id: "typing-arrays", title: "Tuples and Arrays", content: "# Beyond Strings and Numbers\n\nTyping `let counts: number[] = [1, 2]` is easy. But what if you have a CSV row containing exactly one string and one number? You use a Tuple: `let row: [string, number] = ['sagar', 25]`. If you push a third item into this tuple, the compiler will fail." }
            ]
        },
        {
            id: "phase3",
            title: "Phase 3: Interfaces vs Type Aliases",
            pages: [
                { id: "interface-merging", title: "Declaration Merging", content: "# The Subtle Difference\n\n`interface` and `type` act identically 99% of the time. However, Interfaces can be redefined later in the file and TypeScript will smoothly merge their properties together (Declaration Merging). `type` aliases cannot be reopened, making them safer for strict functional programming." }
            ]
        },
        {
            id: "phase4",
            title: "Phase 4: Union & Intersection Types",
            pages: [
                { id: "discriminated-unions", title: "The Pipe and the Ampersand", content: "# Restricting Data\n\nA Union Type (`type Status = 'success' | 'error' | 'loading'`) ensures a developer can never accidentally type `'sucess'`. You can intersect two entire interfaces together using `&`, forcing an object to satisfy both contracts simultaneously." }
            ]
        },
        {
            id: "phase5",
            title: "Phase 5: The Unknown Type",
            pages: [
                { id: "unknown-vs-any", title: "The Safe Any", content: "# Forcing Type Checks\n\nIf you fetch data from an external API, you don't know the type. Never use `any`. Use `unknown`. If a variable is `unknown`, TypeScript physically forbids you from using it (like calling `.map()` on it) until you explicitly write a Javascript `if` statement to prove it's an Array." }
            ]
        },

        // REACT INTEGRATION (PHASES 6-10)
        {
            id: "phase6",
            title: "Phase 6: Typing React Props",
            pages: [
                { id: "react-fc", title: "React.FC is dead", content: "# Standard Functions\n\nHistorically, developers used `const Button: React.FC<Props> = () => {}`. This automatically allowed `children` props implicitly, causing bugs when a component wasn't supposed to have children. Modern TS simply types the arguments directly: `function Button({ label }: Props) {}`." }
            ]
        },
        {
            id: "phase7",
            title: "Phase 7: Typing Hooks",
            pages: [
                { id: "usestate-generics", title: "useState and Generics", content: "# Initializing Null State\n\nIf you write `useState('hello')`, TS infers a string. But if you initialize state before fetching: `useState(null)`, TS assumes the state will live and die as `null`. You must explicitly supply a Generic: `useState<User | null>(null)`." }
            ]
        },
        {
            id: "phase8",
            title: "Phase 8: Typing Events",
            pages: [
                { id: "html-events", title: "ChangeEvent and MouseEvent", content: "# Reading the DOM\n\nWhen a user types into an input, what type is the `onChange` event object? `const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {}`. Typing this correctly gives you instant autocomplete for `e.target.value`." }
            ]
        },
        {
            id: "phase9",
            title: "Phase 9: Typing useRef",
            pages: [
                { id: "useref-dom", title: "Read-only vs Mutable Refs", content: "# The Two Faces of Ref\n\nIf you attach a Ref to a DOM element (`<input ref={inputRef}>`), you must type it as `useRef<HTMLInputElement>(null)`. The `.current` property becomes read-only (Managed by React). If you use it to store a Timeout ID, it becomes a mutable variable." }
            ]
        },
        {
            id: "phase10",
            title: "Phase 10: Typing Context",
            pages: [
                { id: "context-initial", title: "The undefined problem", content: "# Bootstrapping State\n\nWhen creating a `ThemeContext`, you must provide a default value. If you don't have the user data until the App boots, the default value must be `undefined`. This forces you to write defensive `if (!context) throw new Error(...)` checks in every child component." }
            ]
        },

        // ADVANCED GENERICS (PHASES 11-15)
        {
            id: "phase11",
            title: "Phase 11: Introduction to Generics",
            pages: [
                { id: "type-variables", title: "The <T> Placeholder", content: "# Reusable Logic\n\nA function that reverses an array shouldn't care if the array holds Strings or Numbers. `function reverse<T>(arr: T[]): T[] {}`. The `<T>` acts as a variable *for the Type itself*, locking the output to match whatever input type was provided." }
            ]
        },
        {
            id: "phase12",
            title: "Phase 12: Generic React Components",
            pages: [
                { id: "generic-tables", title: "The Dynamic List", content: "# Typing a Table\n\nHow do you build a `<Table>` component that receives an array of `Users` on page 1, and an array of `Orders` on page 2? You make the component itself Generic: `interface TableProps<T> { items: T[] }`. The parent component dictate the type." }
            ]
        },
        {
            id: "phase13",
            title: "Phase 13: Generic Constraints",
            pages: [
                { id: "extends-keyword", title: "Limiting the generic", content: "# Must have an ID\n\nIf you write a generic function that searches an array for a specific item, that item MUST have an `.id` property. You can constraint the allowed generics: `function findItem<T extends { id: string }>(items: T[])`. Now, passing an array of Strings will throw a compiler error." }
            ]
        },
        {
            id: "phase14",
            title: "Phase 14: Conditional Types",
            pages: [
                { id: "ternary-types", title: "If/Else at Compile Time", content: "# Dynamic Type Resolution\n\nYou can write math *inside the types itself*. `type IdLabel = T extends number ? { id: number } : { name: string }`. If the Generic passed in is a number, the returned Interface is locked to an ID. If it's a string, it's locked to a Name." }
            ]
        },
        {
            id: "phase15",
            title: "Phase 15: The 'infer' Keyword",
            pages: [
                { id: "infer-return", title: "Extracting hidden types", content: "# Stealing the Promise\n\nIf an external library gives you a function that returns a complex `Promise<Array<LargeObject>>`, and you want to extract just the `LargeObject` interface without having to re-type it manually, you use the `infer` keyword inside a conditional type to surgically extract it." }
            ]
        },

        // UTILITY TYPES & ARCHITECTURE (PHASES 16-20)
        {
            id: "phase16",
            title: "Phase 16: Partial & Required",
            pages: [
                { id: "partial-updates", title: "Modifying the Contract", content: "# The Update API\n\nIf your `User` interface has 50 mandatory fields, and you build a `patchUser` function, the frontend shouldn't have to provide all 50 fields to update a single username. `Partial<User>` instantly returns a new Interface where every single field is optional." }
            ]
        },
        {
            id: "phase17",
            title: "Phase 17: Omit & Pick",
            pages: [
                { id: "omit-fields", title: "Surgical Interfaces", content: "# The Creation DTO\n\nWhen a user completely fills out a registration form, the data matches the `User` interface exactly—except for the `.id` and `.role`, because the Database generates those. You can cleanly type this form data payload as `Omit<User, 'id' | 'role'>`." }
            ]
        },
        {
            id: "phase18",
            title: "Phase 18: Record & Tuples",
            pages: [
                { id: "record-mapping", title: "Dictionaries", content: "# Typing unstructured objects\n\nIf you need an object map representing role permissions, `Record<string, boolean>` is too loose (it allows any random string). You should lock it using a Union: `Record<'admin' | 'user', boolean>`, instantly forcing you to define both roles." }
            ]
        },
        {
            id: "phase19",
            title: "Phase 19: Template Literal Types",
            pages: [
                { id: "string-math", title: "Combining Strings at Compile Time", content: "# Massive Permutations\n\nIf you have a UI component that supports alignments (`left`, `center`, `right`) and colors (`red`, `blue`), you can combine them algorithmically: `type ClassName = \`bg-\${Color}-align-\${Alignment}\``. TS will instantly generate all 6 possible classnames as a strict union." }
            ]
        },
        {
            id: "phase20",
            title: "Phase 20: The Compiler Architecture",
            pages: [
                { id: "tsconfig-deepdive", title: "Mastering TSConfig", content: "# Nominal vs Structural\n\nTypeScript is a 'Structural' typing language (Duck Typing). If Interface A and Interface B have the exact same shape, TS considers them interchangeable. This phase explores `tsconfig.json` paths, strict null checks, and integrating TS cleanly with Vite/Babel compilers." }
            ]
        }
    ]
};
