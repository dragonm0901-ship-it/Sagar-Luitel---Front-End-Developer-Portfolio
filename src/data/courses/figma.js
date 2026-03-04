export const figmaTips = {
    id: "figma",
    title: "Figma to Code: UI/UX Tips",
    description: "Bridge the gap between design and development. Learn Auto Layout, components, tokens, and how to translate beautiful designs into pixel-perfect CSS.",
    image: "/courses/figma.png",
    tags: ["UI/UX", "Figma", "Design", "CSS"],
    duration: "20 Chapters",
    level: "All Levels",
    modules: [
        {
            id: "phase1",
            title: "Phase 1: Bridging the Gap",
            pages: [
                {
                    id: "auto-layout-flexbox",
                    title: "Auto Layout is Flexbox",
                    content: `
# Thinking in Boxes

The biggest mistake developers make when opening a Figma file is looking at the absolute X and Y coordinates of elements. 

In modern web design, absolute positioning is rare. We use CSS Flexbox. Figma's equivalent is **Auto Layout**.

## Demystifying the Inspector
When you click on a Figma frame with Auto Layout enabled, the right sidebar translates perfectly into CSS Flexbox properties:

- **Direction (Horizontal/Vertical) ->** \`flex-direction: row | column\`
- **Spacing between items ->** \`gap: 16px\`
- **Padding ->** \`padding: 24px\`
- **Alignment (Top, Center, Bottom) ->** \`align-items\` and \`justify-content\`

\`\`\`css
/* Figma: Vertical Auto Layout, 24px padding, 16px gap, centered */
.figma-card {
    display: flex;
    flex-direction: column;
    padding: 24px;
    gap: 16px;
    align-items: center;
    justify-content: center;
}
\`\`\`
                    `
                },
                {
                    id: "design-tokens",
                    title: "Design Tokens (CSS Variables)",
                    content: `
# Stop Hardcoding Hex Codes

A professional Figma file will have a **Local Variables** or **Color Styles** panel. These define the "Design Tokens" for the brand.

If the Lead Designer decides to change the primary brand color from Blue to Purple, they change *one* token in Figma. If you hardcoded \`#007BFF\` across 50 CSS files, you have a massive refactoring headache.

> [!IMPORTANT]
> Always translate Figma color styles and typography styles into CSS Custom Properties (Variables) at the root level of your CSS.

\`\`\`css
/* Translate the Figma "Styles" panel into CSS Variables */
:root {
    /* Brand Colors */
    --clr-primary-500: #4f46e5;
    --clr-primary-600: #4338ca;
    
    /* Neutrals */
    --clr-surface-dark: #111827;
    --clr-text-light: #f9fafb;
    
    /* Spacing System */
    --space-sm: 8px;
    --space-md: 16px;
    --space-lg: 32px;
}

.button-primary {
    background-color: var(--clr-primary-500);
    padding: var(--space-sm) var(--space-md);
    color: var(--clr-text-light);
}

.button-primary:hover {
    background-color: var(--clr-primary-600);
}
\`\`\`
                    `
                }
            ]
        },
        {
            id: "project1",
            title: "Project: Component Library",
            pages: [
                {
                    id: "storybook-spec",
                    title: "Milestone: UI Component Library",
                    content: `
# Pixel Perfect Translation

You will be given a massive UI Kit in Figma. You must translate the buttons, inputs, cards, and modal states into reusable React components using a tool like Storybook.

## Requirements
1. **Design Tokens:** Extract all colors, typography sizes, and drop-shadows from the Figma file into a \`theme.css\` file using Native CSS Variables.
2. **Variants:** Implement a highly reusable \`<Button>\` component in React. It must accept props for \`variant\` (primary, secondary, danger) and \`size\` (sm, md, lg), mapping exactly to the Figma Component variants.
3. **Pixel Perfection:** The final rendered React components must match the Figma designs with a < 2px margin of error visually.
                    `
                }
            ]
        }
    ]
};
