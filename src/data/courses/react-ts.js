export const reactTS = {
    id: "react-ts",
    title: "React + TS: The 20-Phase Epic",
    description: "Type safety at the enterprise level. Master Generics, Discriminated Unions, Utility Types, and flawlessly typing complex React Hooks.",
    image: "/courses/react_ts.png",
    tags: ["React", "TypeScript", "Generics", "Epic"],
    duration: "100 Chapters (Strict Mode)",
    level: "Advanced",
    modules: [
        // CORE TYPESCRIPT (PHASES 1-5)
        {
            id: "phase1",
            title: "Phase 1: The Compiler Architecture",
            pages: [
                {
                    id: "type-erasure",
                    title: "The Illusion of Types",
                    content: `# Types don't exist in the Browser\n\nTypeScript does absolutely nothing at runtime. It is purely an AST (Abstract Syntax Tree) analyzer that runs on your local machine during the 'Build' step.\n\n\`\`\`typescript\n// Your Code\nconst age: number = 25;\n\`\`\`\n\n\`\`\`javascript\n// The Compiler Output (What actually runs)\nconst age = 25;\n\`\`\`\nBecause of "Type Erasure", you cannot use TypeScript interfaces to validate API data coming from a Node.js server at runtime. You must use a runtime validation library like Zod.`
                },
                {
                    id: "tsconfig-strict",
                    title: "Turning on strict mode",
                    content: `# The 'any' Error\n\nIf you leave \`strict: false\` in your \`tsconfig.json\`, TypeScript allows implicit \`any\` types. This means variables default to untyped JavaScript, completely defeating the purpose of TypeScript.\n\nYou must build applications with \`strict: true\`, \`noImplicitAny: true\`, and \`strictNullChecks: true\`. This forces you to explicitly handle every mathematical edge case where a variable might accidentally be \`undefined\`.`
                }
            ]
        },
        {
            id: "phase2",
            title: "Phase 2: Types vs Interfaces",
            pages: [
                {
                    id: "interface-merging",
                    title: "Declaration Merging",
                    content: `# When to use an Interface\n\nInterfaces are strictly for defining Object shapes.\n\n\`\`\`typescript\ninterface User { name: string; }\ninterface User { age: number; }\n\n// TypeScript automatically mathematically merges them!\nconst user: User = { name: \"Sagar\", age: 25 };\n\`\`\`\nThis is incredibly useful when extending third-party libraries (` + "`" + `window` + "`" + ` object) without rewriting the core library files.`
                },
                {
                    id: "type-aliases",
                    title: "The Power of Types",
                    content: `# Primitives and Tuples\n\nYou CANNOT use an Interface to type a simple string or a Tuples.\n\n\`\`\`typescript\ntype ID = string | number; // Union Type (Impossible with Interface)\ntype Coordinates = [number, number]; // Tuple Type (Impossible with Interface)\n\`\`\`\n**General Rule:** Use \`type\` for complex mathematical unions, primitives, and React Component Props. Use \`interface\` when building OOP Class architectures.`
                }
            ]
        },
        {
            id: "phase3",
            title: "Phase 3: Literal Types & Unions",
            pages: [
                {
                    id: "string-literals",
                    title: "Restricting Values",
                    content: `# Beyond generic strings\n\nIf a Button component accepts a \`variant\` prop, typing it as \`variant: string\` allows developers to pass \`variant=\"banana\"\`, which breaks your CSS.\n\n\`\`\`typescript\ntype ButtonProps = {\n  variant: 'primary' | 'secondary' | 'danger';\n}\n\`\`\`\nThis mathematically forces the developer's IDE to autocomplete EXACTLY those three strings, preventing runtime CSS errors.`
                }
            ]
        },
        {
            id: "phase4",
            title: "Phase 4: Discriminated Unions",
            pages: [
                {
                    id: "the-discriminator",
                    title: "Flawless State Machines",
                    content: `# The 'status' pattern\n\nHow do you type an API response that can either succeed or fail?\n\n\`\`\`typescript\n// BAD: Every field is optional. The IDE can't help you.\ntype BadResponse = { status: string; data?: any; error?: string; }\n\n// PERFECT: Discriminated Union\ntype GoodResponse = \n  | { status: 'success'; data: { id: string } } \n  | { status: 'error'; error: string };\n\nfunction handle(res: GoodResponse) {\n   if (res.status === 'success') {\n       // TypeScript statically proves that 'data' strictly exists here.\n       console.log(res.data.id);\n   } else {\n       // TypeScript mathematically proves that 'error' explicitly exists here.\n       console.log(res.error);\n   }\n}\n\`\`\``
                }
            ]
        },
        {
            id: "phase5",
            title: "Phase 5: the 'any' vs 'unknown' vs 'never'",
            pages: [
                {
                    id: "the-unknown-type",
                    title: "Safer than ANY",
                    content: `# Forcing Type Guards\n\n\`any\` turns off TypeScript entirely. \n\`unknown\` means "I don't know what this is yet, but TypeScript will FORBID me from using it until I mathematically prove what it is."\n\n\`\`\`typescript\nlet input: unknown = \"hello\";\n\n// input.toUpperCase(); // ERROR! TS refuses to run string methods on unknown.\n\nif (typeof input === 'string') {\n  // Type Guard passed! TS narrows 'input' down to a string safely.\n  input.toUpperCase(); \n}\n\`\`\``
                },
                {
                    id: "the-never-type",
                    title: "Exhaustiveness Checking",
                    content: `# The Impossible State\n\n\`never\` represents a state that physically cannot happen.\n\n\`\`\`typescript\ntype Shape = 'circle' | 'square';\n\nfunction process(s: Shape) {\n  switch(s) {\n    case 'circle': return 1;\n    case 'square': return 2;\n    default:\n       // If another developer adds 'triangle' to the Shape type,\n       // TypeScript will instantly throw a compiler error here because\n       // 'triangle' is not assignable to type 'never'. It protects your switches.\n       const check: never = s; \n  }\n}\n\`\`\``
                }
            ]
        },

        // TYPING REACT (PHASES 6-10)
        {
            id: "phase6",
            title: "Phase 6: Typing Props Architecture",
            pages: [
                {
                    id: "componentprops",
                    title: "ComponentPropsWithoutRef",
                    content: `# Extending Native HTML\n\nIf you build a custom \`<Button>\`, you shouldn't manually type out \`onClick\`, \`onFocus\`, \`className\`, \`disabled\`, etc.\n\n\`\`\`typescript\nimport { ComponentPropsWithoutRef } from 'react';\n\ntype ButtonProps = {\n  variant: 'primary' | 'danger';\n} & ComponentPropsWithoutRef<'button'>; \n// Instantly inherits all 200 native HTML button attributes safely.\n\nexport const Button = ({ variant, className, ...rest }: ButtonProps) => {\n  return <button className={\`\${variant} \${className}\`} {...rest} />\n}\n\`\`\``
                }
            ]
        },
        {
            id: "phase7",
            title: "Phase 7: Typing Hooks (useState / useRef)",
            pages: [
                {
                    id: "usestate-inference",
                    title: "Implicit vs Explicit Inference",
                    content: `# Let TS do the work\n\n\`const [name, setName] = useState('Sagar')\` is perfectly fine. TS infers it as a string forever.\n\nBut for complex empty objects, you must assist the compiler:\n\`\`\`typescript\ntype User = { id: string; role: 'admin' | 'user' };\n\n// Without the Generic <User | null>, TS assumes it will be 'null' forever.\nconst [user, setUser] = useState<User | null>(null);\n\`\`\``
                },
                {
                    id: "useref-dom",
                    title: "Read-Only vs Mutable Refs",
                    content: `# The TS DOM Types\n\n\`\`\`typescript\n// 1. Read-Only DOM Ref (Requires HTML Element Type AND initial 'null')\n// TS enforces you cannot run inputRef.current = newElement\nconst inputRef = useRef<HTMLInputElement>(null);\n\n// 2. Mutable Variable Ref (Requires passing the EXACT initial type, NO 'null')\n// Perfect for tracking intervals without re-rendering.\nconst timerRef = useRef<number>(0);\n\`\`\``
                }
            ]
        },
        {
            id: "phase8",
            title: "Phase 8: Typing Context API",
            pages: [
                {
                    id: "context-assertion",
                    title: "Non-Null Assertions",
                    content: `# The undefined problem\n\n\`createContext(null)\` is standard in Javascript. But in TS, it forces you to write \`if (!context) return\` in every single component that uses it.\n\n\`\`\`typescript\ntype ThemeState = { mode: 'light' | 'dark'; toggle: () => void };\n\n// The clean workaround: Tell TS to trust you that Provider will wrap the App.\n// The 'as' keyword forces the compiler to skip the 'null' check.\nexport const ThemeContext = createContext<ThemeState>({} as ThemeState);\n\`\`\``
                }
            ]
        },
        {
            id: "phase9",
            title: "Phase 9: Typing useReducer",
            pages: [
                {
                    id: "action-discriminated",
                    title: "The Ultimate State Safe",
                    content: `# Perfectly Typed State Machines\n\n\`\`\`typescript\ntype State = { count: number };\ntype Action = \n  | { type: 'INCREMENT'; payload: number }\n  | { type: 'RESET' }; // No payload allowed!\n\nfunction reducer(state: State, action: Action): State {\n  switch (action.type) {\n    case 'INCREMENT': \n       // TS perfectly knows 'action.payload' is a Number here.\n       return { count: state.count + action.payload };\n    case 'RESET': \n       // TS perfectly throws an error if we try to access action.payload here.\n       return { count: 0 };\n    default: return state;\n  }\n}\n\`\`\``
                }
            ]
        },
        {
            id: "phase10",
            title: "Phase 10: Typing Children",
            pages: [
                {
                    id: "react-reactnode",
                    title: "ReactNode vs JSX.Element",
                    content: `# Allowing valid children\n\nIf you build a layout Wrapper:\n\n\`\`\`typescript\nimport { ReactNode } from 'react';\n\ntype WrapperProps = {\n  children: ReactNode; // The absolute best type.\n}\n\`\`\`\n\`ReactNode\` mathematically covers EVERYTHING React can render: \`<div/>\`, \`\"strings\"\`, \`123\`, \`null\`, \`undefined\`, or arrays of elements. \`JSX.Element\` ONLY covers exact JSX tags, breaking if you pass a simple string.`
                }
            ]
        },

        // ADVANCED TYPESCRIPT ARCHITECTURE (PHASES 11-15)
        {
            id: "phase11",
            title: "Phase 11: Generics (The Variable Types)",
            pages: [
                {
                    id: "generic-syntax",
                    title: "Types that take parameters",
                    content: `# The <T> Architecture\n\nA function that takes \`any\` loses its type coming out. \n\n\`\`\`typescript\n// The <T> acts as a placeholder variable for a Type.\nfunction wrapInArray<T>(value: T): T[] {\n  return [value];\n}\n\n// TS remembers that 'res' is specifically string[], not any[]!\nconst res = wrapInArray('hello'); \n\`\`\``
                },
                {
                    id: "generic-constraints",
                    title: "The 'extends' keyword",
                    content: `# Limiting the Generic\n\nWhat if you have a Generic function that requires the object to at least have an \`id\`?\n\n\`\`\`typescript\n// T MUST be an object containing at least an 'id' string\nfunction logId<T extends { id: string }>(item: T) {\n  console.log(item.id);\n  return item;\n}\n\nlogId({ id: '123', name: 'Sagar' }); // OK\n// logId({ name: 'Sagar' }); // ERROR! Missing 'id'.\n\`\`\``
                }
            ]
        },
        {
            id: "phase12",
            title: "Phase 12: Generic React Components",
            pages: [
                {
                    id: "reusable-tables",
                    title: "Prop Inference",
                    content: `# Passing <T> to JSX\n\nIf you build a flexible \`<Table>\` component, you want the \`renderItem\` prop to perfectly know the shape of the \`data\` array passed in.\n\n\`\`\`typescript\ntype TableProps<T> = {\n  data: T[];\n  renderItem: (item: T) => React.ReactNode;\n}\n\n// Provide the <T> right before the arrow function\nexport const Table = <T extends object>({ data, renderItem }: TableProps<T>) => {\n   return <ul>{data.map(renderItem)}</ul>\n}\n\n// Usage: TS flawlessly infers that 'user' has an 'age' property!\n<Table \n  data={[{ name: 'sagar', age: 25 }]} \n  renderItem={(user) => <li>{user.age}</li>} \n/>\n\`\`\``
                }
            ]
        },
        {
            id: "phase13",
            title: "Phase 13: Utility Types",
            pages: [
                {
                    id: "omit-and-pick",
                    title: "Slicing Interfaces",
                    content: `# Don't duplicate types\n\nIf your Database \`User\` type has 50 fields, and your \`UpdateUserAPI\` payload only requires 3 fields, don't write a second type.\n\n\`\`\`typescript\ntype DBUser = { id: string, name: string, age: number, hash: string };\n\ntype UpdatePayload = Pick<DBUser, 'name' | 'age'>;\n// Results in strictly { name: string; age: number; }\n\ntype PublicProfile = Omit<DBUser, 'hash'>;\n// Results in strictly { id: string, name: string, age: number };\n\`\`\``
                },
                {
                    id: "partial-and-required",
                    title: "Optionality Modifiers",
                    content: `# Mutating properties\n\n\`\`\`typescript\ntype Config = { theme: string; retries: number; }\n\n// Partial makes every single key optional (?)\ntype OptionalConfig = Partial<Config>; \n\ntype LooseParams = { id?: string; name?: string; }\n// Required mathematically destroys the '?' modifier, forcing strict compliance.\ntype StrictParams = Required<LooseParams>; \n\`\`\``
                }
            ]
        },
        {
            id: "phase14",
            title: "Phase 14: Conditional Types",
            pages: [
                {
                    id: "ternary-types",
                    title: "Types that run logic",
                    content: `# Mathematical IF statements for Types\n\n\`\`\`typescript\n// If T is a string, return boolean type. Otherwise, return number type.\ntype IsString<T> = T extends string ? boolean : number;\n\ntype A = IsString<\"Sagar\">; // A is perfectly typed as 'boolean'\ntype B = IsString<500>;     // B is perfectly typed as 'number'\n\`\`\``
                }
            ]
        },
        {
            id: "phase15",
            title: "Phase 15: Typeof & Keyof",
            pages: [
                {
                    id: "extracting-keys",
                    title: "Deriving Types from Runtime Code",
                    content: `# DRY Principles\n\n\`\`\`typescript\nconst COLORS = {\n  primary: '#000',\n  secondary: '#FFF',\n};\n\n// Automatically generates: 'primary' | 'secondary'\n// If you add a 3rd color to the object, the Type automatically updates itself!\ntype ColorKeys = keyof typeof COLORS;\n\nfunction setBrand(c: ColorKeys) {}\n\`\`\``
                }
            ]
        },

        // MASTERING ZOD & TRPC (PHASES 16-20)
        {
            id: "phase16",
            title: "Phase 16: Zod Validation",
            pages: [
                {
                    id: "runtime-safety",
                    title: "Bridging the Gap",
                    content: `# Solving Type Erasure\n\nBecause TS disappears at runtime, an API returning a broken payload will violently crash your React app without warning.\n\n**Zod** is a physical Javascript schema validator that *also* mathematically extracts perfect TypeScript types.\n\n\`\`\`typescript\nimport { z } from 'zod';\n\n// 1. The physical runtime checking machine\nconst UserSchema = z.object({\n  name: z.string().min(3),\n  age: z.number().optional()\n});\n\n// 2. The mathematical TypeScript type extracted from it!\ntype User = z.infer<typeof UserSchema>; \n\`\`\``
                }
            ]
        },
        {
            id: "phase17",
            title: "Phase 17: React Hook Form + Zod",
            pages: [
                {
                    id: "perfect-forms",
                    title: "The Ultimate Validation Stack",
                    content: `# Connecting the wires\n\nYou pass the Zod Schema into React Hook Form via the \`zodResolver\`. \n\nNow, your input boxes have strictly typed mathematical paths (\`errors.name.message\`), and the form physically refuses to submit unless the user input mathematically matches the Zod rules. Zero manual validation code required.`
                }
            ]
        },
        {
            id: "phase18",
            title: "Phase 18: End-to-End Type Safety (tRPC)",
            pages: [
                {
                    id: "trpc-mechanics",
                    title: "Killing the API Documentation",
                    content: `# The Monorepo Advantage\n\nIf you build the Node Backend and React Frontend in the same repository, you can construct a **tRPC** Router.\n\nIt mathematically glues the Backend's explicit return types directly into the Frontend's HTTP fetching hooks (\`trpc.getUser.useQuery()\`). \n\nIf a Backend engineer changes the database output from \`firstName\` to \`first_name\`, the Frontend React code will instantly, physically fail to compile. You literally cannot deploy a broken API ever again.`
                }
            ]
        },
        {
            id: "phase19",
            title: "Phase 19: Advanced Zod Parsing",
            pages: [
                {
                    id: "transform-pipelines",
                    title: "Cleaning Data on arrival",
                    content: `# Zod Transformers\n\nParse string inputs into Numbers seamlessly:\n\`\`\`typescript\nconst NumberSchema = z.string().transform((val, ctx) => {\n  const parsed = parseInt(val);\n  if (isNaN(parsed)) {\n    ctx.addIssue({ code: z.ZodIssueCode.custom, message: \"Not a number\" });\n    return z.NEVER;\n  }\n  return parsed;\n});\n\`\`\``
                }
            ]
        },
        {
            id: "phase20",
            title: "Phase 20: Event Bus Types",
            pages: [
                {
                    id: "capstone-emitter",
                    title: "The Ultimate Challenge",
                    content: `# Writing a Strictly Typed Event Emitter\n\nYour unguided Capstone is to write a central EventBus class using advanced Generics, mapped types, and overloaded functions.\n\n\`\`\`typescript\nbus.on('LOGIN', (payload) => {}) \n// TS MUST force 'payload' to be strictly { userId: string }\n\nbus.on('LOGOUT', (payload) => {})\n// TS MUST force 'payload' to be undefined/void.\n\`\`\`\nThis proves you have mastered absolute end-to-end framework engineering.`
                }
            ]
        }
    ]
};
