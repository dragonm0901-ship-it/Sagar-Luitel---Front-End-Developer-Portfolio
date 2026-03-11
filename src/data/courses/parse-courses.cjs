const fs = require('fs');
const path = require('path');

const COURSE_FILES = [
    { file: 'HTML & CSS Full Course_ Beginner to Pro.txt', out: 'html-css.js', varName: 'htmlCss', title: 'HTML & CSS Full Course: Beginner to Pro', tags: '["HTML", "CSS", "Frontend"]', description: '"Master HTML & CSS from scratch. Build a complete website clone."' },
    { file: 'JavaScript_ Domination Course.txt', out: 'js-domination.js', varName: 'jsDomination', title: 'JavaScript: Domination Course', tags: '["JavaScript", "Programming", "Web"]', description: '"The ultimate JavaScript masterclass covering everything from memory to first-class functions."' },
    { file: 'React JS & MERN Stack Development.txt', out: 'react-mern.js', varName: 'reactMern', title: 'React JS & MERN Stack Development', tags: '["React", "MERN", "Fullstack"]', description: '"Complete manual for React JS and MERN stack development."' }
];

const QNA_DICTIONARY = [
    {
        keywords: ["Origins", "Environment", "Grammar", "Settings"],
        qna: [
            { q: "What is the primary difference between a Word and a Keyword in JavaScript?", h: "Think about built-in engine meaning.", a: "A keyword is reserved by the engine (like 'let', 'const') and executes a background task, while a word has no meaning until you define it." },
            { q: "Why was Mocha renamed to JavaScript?", h: "Marketing tactic.", a: "It was a marketing move by Netscape to capitalize on the popularity of Java, even though the languages are unrelated." },
            { q: "Why do we need an HTML file to run JS in a browser?", h: "Vacuum vs Host.", a: "JavaScript cannot run in a vacuum inside a browser; it needs an HTML file to act as its host, typically linked via a <script> tag." }
        ]
    },
    {
        keywords: ["Memory", "Storage", "Variables"],
        qna: [
            { q: "What are the three stages of a variable's life?", h: "Creating, Setting, Changing.", a: "Declaration, Initialization, and Reassignment (Updation)." },
            { q: "Why is the 'var' keyword considered dangerous?", h: "Window object and scoping.", a: "It pollutes the global window object, is not block-scoped, and allows silent redeclaration without throwing errors." },
            { q: "What is the difference between let and const?", h: "Mutation rules.", a: "'let' allows reassignment, while 'const' locks the variable so it can never be altered once set." }
        ]
    },
    {
        keywords: ["Dimensions", "Scope", "Global", "Block", "Functional"],
        qna: [
            { q: "What is definition of Scope?", h: "Jurisdiction.", a: "Scope refers to the 'jurisdiction' or boundary within which a variable is accessible." },
            { q: "How does Block Scope protect your data?", h: "Curly braces.", a: "Variables created with let or const inside {} are trapped inside that block, preventing them from leaking into the global scope." },
            { q: "How does var break the rules of Block Scope?", h: "Function scoped vs Block scoped.", a: "The 'var' keyword ignores {} blocks and only respects function boundaries, causing isolated variables to leak out and potentially overwrite global data." }
        ]
    },
    {
        keywords: ["Hoisting", "Temporal", "Dead", "Zone", "TDZ"],
        qna: [
            { q: "What physical action does Hoisting perform on a variable declaration?", h: "Splitting.", a: "The compiler physically splits the declaration and initialization, and moves the declaration to the absolute top of the scope." },
            { q: "Why does var return 'undefined' instead of an error when used before initialization?", h: "Default assignment.", a: "Because var is hoisted and immediately assigned a default value of undefined by the engine, hiding the developer's mistake." },
            { q: "What happens if you try to access a 'let' variable while it is in the TDZ?", h: "The Mercedes-Benz analogy.", a: "The engine throws a ReferenceError: Cannot access before initialization, because the variable is explicitly off-limits." }
        ]
    },
    {
        keywords: ["Primitives", "References", "Core Divide"],
        qna: [
            { q: "What is the ultimate cheat code to tell a Primitive from a Reference?", h: "The Game of Brackets.", a: "If the value has no brackets, it is a Primitive. If the value has brackets ([], {}, ()), it is a Reference." },
            { q: "How does copying a Primitive work?", h: "Independent clones.", a: "JavaScript makes a completely independent clone. Modifying the copy does not affect the original." },
            { q: "Why is copying a Reference called a 'Fake Copy'?", h: "Shared memory.", a: "JavaScript only copies the memory address pointing to the original data. Modifying the copy permanently mutates the original." }
        ]
    },
    {
        keywords: ["Dynamic", "Typing", "Coercion", "Natures"],
        qna: [
            { q: "What is the difference between Static and Dynamic Typing?", h: "On the fly change.", a: "Static typing requires explicit data type declarations that cannot change, while Dynamic typing allows variables to change types on the fly." },
            { q: "Why does the expression 5 + '1' result in '51'?", h: "Concatenation rule.", a: "Because the + operator sees a string, it uses Type Coercion to forcefully convert the number into a string and glues them together." },
            { q: "What are the exactly 7 Falsy values in JavaScript?", h: "Memorize the list.", a: "0, false, '' (empty string), null, undefined, NaN, and document.all." }
        ]
    },
    {
        keywords: ["Decision", "Control Flow", "Operators"],
        qna: [
            { q: "What is the difference between == and ===?", h: "Loose vs Strict.", a: "== is loose equality and ignores data types (via coercion), while === is strict equality and requires both value and type to be identical." },
            { q: "How does the Ternary Operator work?", h: "Question Mark colon.", a: "It is a one-line shortcut evaluating 'Condition ? Run if True : Run if False'." },
            { q: "What is the 'Fall-Through Bug' in a switch statement?", h: "Missing breaks.", a: "If you forget the 'break;' keyword, the switch will incorrectly execute every single case below the matched case." }
        ]
    },
    {
        keywords: ["Loops", "Repetition"],
        qna: [
            { q: "When should you use a 'for' loop instead of a 'while' loop?", h: "Map of the journey.", a: "Use a 'for' loop when you know the exact Start, End, and Change. Use 'while' when you only know the stop condition." },
            { q: "Why does an Accumulator variable need to be declared outside the loop?", h: "Resetting.", a: "If declared inside, the variable will be destroyed and reset back to 0 on every single iteration." },
            { q: "What is the difference between 'break' and 'continue'?", h: "Escape vs Skip.", a: "Break instantly destroys and escapes the entire loop, while continue only skips the current iteration and jumps to the next one." }
        ]
    },
    {
        keywords: ["Function Statements", "Expressions", "Arrows", "Heart"],
        qna: [
            { q: "What does it mean that functions are 'First-Class Citizens'?", h: "Treated like values.", a: "Functions are treated exactly like regular values. They can be stored in variables and passed as arguments." },
            { q: "What is the major difference between a Function Declaration and a Function Expression?", h: "Hoisting superpower.", a: "Function Declarations are fully hoisted and can be called before they are defined, whereas variables holding Function Expressions suffer from the TDZ." },
            { q: "How do Fat Arrow functions clean up syntax?", h: "ES6 shorthand.", a: "They remove the 'function' keyword and use '=>', allowing for cleaner and more modern code writing." }
        ]
    },
    {
        keywords: ["Parameters", "Arguments", "Defaults", "Rest"],
        qna: [
            { q: "What is the difference between Parameters and Arguments?", h: "Boxes vs Items.", a: "Parameters are the empty placeholder boxes defined in the function creation, while arguments are the actual values passed during the call." },
            { q: "How do Default Parameters protect against NaN disasters?", h: "Lazy users.", a: "They provide a fallback value so that if an argument is missing, the default is used instead of evaluating as 'undefined'." },
            { q: "What does the Rest Operator (...) do inside function parameters?", h: "Collecting extras.", a: "It gathers all remaining unassigned arguments and packs them neatly into a single Array." }
        ]
    },
    {
        keywords: ["React", "Virtual DOM", "Real DOM"],
        qna: [
            { q: "Why is direct manipulation of the Real DOM considered inefficient?", h: "Massive reloads.", a: "It forces the browser to unnecessarily re-render and repaint large portions of the page tree, which is heavy and slow." },
            { q: "What is the Virtual DOM?", h: "Lightweight invisible copy.", a: "It is an invisible, lightweight JavaScript copy of the Real DOM that React uses to prepare and optimize changes before applying them." },
            { q: "What is the purpose of React's 'Diffing Algorithm'?", h: "Comparing snapshots.", a: "It compares the updated Virtual DOM to a previous snapshot to figure out the exact surgical changes needed, preventing full page reloads." }
        ]
    },
    {
        keywords: ["Philosophy", "Components"],
        qna: [
            { q: "How do Components solve the problem of monolithic HTML files?", h: "Lego pieces.", a: "They break the UI into independent, reusable pieces (like a Product Card) that can be stamped out automatically." },
            { q: "What is the cardinal rule of JSX return statements?", h: "The Single Parent Rule.", a: "A component can only return one single parent element. Everything else must be nested inside it." },
            { q: "Why do we use camelCase in JSX instead of standard HTML attributes?", h: "Reserved keywords.", a: "JSX is actually JavaScript under the hood. For example, 'class' is a reserved JS keyword, so we must use 'className' instead." }
        ]
    },
    {
        keywords: ["HTML", "Tags", "Skeleton"],
        qna: [
            { q: "What is the primary role of HTML?", h: "Bones of the web.", a: "HTML provides the foundational structure and raw content of a webpage, before any styling or logic is applied." },
            { q: "What is a Void Element?", h: "No closing required.", a: "An element like <img> or <input> that does not wrap text content and therefore does not require a closing tag." },
            { q: "Why is it important to use semantic tags like <nav> instead of generic <div> tags?", h: "Robots and accessibility.", a: "Semantic tags provide implicit meaning to search engines and screen readers, drastically improving SEO and accessibility." }
        ]
    },
    {
        keywords: ["CSS Fundamentals", "Selectors"],
        qna: [
            { q: "What are the three ways to add CSS to an HTML file, and which is best?", h: "Inline, Internal, External.", a: "Inline, Internal, and External. External (using a <link> tag) is the best for separation of concerns and caching." },
            { q: "What is the difference between an ID selector and a Class selector?", h: "Uniqueness vs Reusability.", a: "An ID is strictly unique to one element using '#', while a Class can be reused across multiple elements using '.'." },
            { q: "How does CSS Specificity calculate priority?", h: "The point system.", a: "It uses a point system where IDs overpower Classes, and Classes overpower Element selectors, determining which style wins a conflict." }
        ]
    },
    {
        keywords: ["Box Model", "Margin", "Padding", "Border"],
        qna: [
            { q: "What are the four layers of the CSS Box Model?", h: "From inside to outside.", a: "Content, Padding, Border, and Margin." },
            { q: "What is the difference between Padding and Margin?", h: "Inside vs Outside.", a: "Padding is the internal breathing room between the content and the border. Margin is the external pushing force between elements." },
            { q: "Why do borders sometimes break layout widths, and how do we fix it?", h: "box-sizing.", a: "By default, borders add to the total width. We fix this by applying 'box-sizing: border-box;' to force padding and borders inward." }
        ]
    },
    {
        keywords: ["Flexbox", "1D Layouts"],
        qna: [
            { q: "What is the primary purpose of Flexbox?", h: "One-dimensional alignment.", a: "To establish a highly efficient 1D layout (either a row or a column) for aligning and distributing child elements." },
            { q: "What does 'justify-content: center;' do inside a flex row?", h: "Main axis.", a: "It centers the items horizontally along the main flex axis." },
            { q: "What does 'align-items: center;' do inside a flex row?", h: "Cross axis.", a: "It centers the items vertically along the cross axis." }
        ]
    },
    {
        keywords: ["Grid", "2D Layouts"],
        qna: [
            { q: "How does CSS Grid differ from Flexbox?", h: "Dimensions.", a: "Flexbox handles one dimension at a time (rows OR columns). Grid handles two dimensions simultaneously (rows AND columns)." },
            { q: "What does 'grid-template-columns: 1fr 1fr 1fr;' do?", h: "Fractions of space.", a: "It creates three equal-width columns, each taking up exactly one fraction of the available container space." },
            { q: "What is the purpose of the 'gap' property?", h: "Gutters between cells.", a: "It creates clean, uniform spacing strictly between grid items, without affecting the outside edges of the grid." }
        ]
    },
    {
        keywords: ["Positioning", "Absolute", "Relative", "Fixed"],
        qna: [
            { q: "How does 'position: fixed;' affect an element?", h: "Floating menu.", a: "The element completely breaks out of the normal document flow and locks itself to the viewport (the browser window), staying visible while scrolling." },
            { q: "What is the 'Absolute Inside Relative' structural rule?", h: "The cage system.", a: "To trap an absolutely positioned child element inside a specific parent container, that parent must be given 'position: relative;' to act as an anchor." },
            { q: "What does the z-index property control?", h: "The Z-axis.", a: "It controls the stacking order of positioned elements. Elements with a higher z-index appear on top of elements with a lower z-index." }
        ]
    }
];

function getContextualQnA(chapterTitle, courseVarName) {
    let bestMatch = null;
    let maxMatches = 0;

    QNA_DICTIONARY.forEach(entry => {
        let matches = 0;
        entry.keywords.forEach(kw => {
            if (chapterTitle.toLowerCase().includes(kw.toLowerCase())) matches++;
        });
        if (matches > maxMatches) {
            maxMatches = matches;
            bestMatch = entry;
        }
    });

    if (bestMatch && maxMatches > 0) {
        return buildQnAMarkdown(bestMatch.qna);
    }

    if (courseVarName === 'reactMern') {
        return buildQnAMarkdown([
            { q: "What is the most critical concept to master in this module?", h: "Think about React's core philosophy.", a: "Understanding the difference between UI state and DOM manipulation is crucial for React architecture." },
            { q: "How should you practice this module's topics?", h: "Hands-on coding.", a: "Build small, isolated functional components to test each concept before integrating them into a larger app." },
            { q: "What is a common error developers make in this phase?", h: "Mutation and side effects.", a: "Directly mutating state variables or forgetting dependency arrays in hooks." }
        ]);
    } else if (courseVarName === 'htmlCss') {
        return buildQnAMarkdown([
            { q: "What is the core takeaway regarding styling here?", h: "Separation of concerns.", a: "Always ensure your styling rules do not conflict and rely on class specificity rather than !important." },
            { q: "How do you verify your layout across devices?", h: "DevTools.", a: "Use your browser's responsive design mode to test breakpoints and inspect element boxes." },
            { q: "What should you focus on when debugging CSS?", h: "The Box Model.", a: "Always check the computed dimensions of Padding, Border, and Margin inside DevTools." }
        ]);
    } else {
        return buildQnAMarkdown([
            { q: "What is the logical foundation of this JavaScript concept?", h: "Memory and execution context.", a: "JavaScript executes sequentially but compiles functionally. Understanding execution context avoids nasty bugs." },
            { q: "How can you test these theories yourself?", h: "The Console.", a: "Use the browser's developer console or a local Node runtime to extensively log the output of these operations." },
            { q: "What is the worst anti-pattern related to this topic?", h: "Implicit vs Explicit.", a: "Relying on JavaScript's implicit type coercion instead of writing strict, explicit logic checks." }
        ]);
    }
}

function buildQnAMarkdown(qnaArray) {
    let output = '';
    qnaArray.forEach(item => {
        output += `\`\`\`qna\nQ: ${item.q}\nH: ${item.h}\nA: ${item.a}\n\`\`\`\n\n`;
    });
    return output.trim();
}

const isText = (str) => {
    if (/^\d+\.\d+/.test(str)) return true;
    if (/^Chapter\s+\d+:/i.test(str)) return true;
    if (/^PART\s+\d+:/i.test(str)) return true;
    if (/^[-*]\s+/.test(str)) return true;
    if (/^\d+\.\s+/.test(str)) return true;
    if (/^[A-Z][a-z]/.test(str)) {
        const firstWord = str.split(' ')[0];
        if (['Let', 'Const', 'Var', 'Function', 'Return', 'Console', 'If', 'Else', 'Import', 'Export'].includes(firstWord)) return false;
        return true;
    }
    return false;
};

for (const course of COURSE_FILES) {
    const filePath = path.join(__dirname, course.file);
    if (!fs.existsSync(filePath)) {
        console.error('File not found:', filePath);
        continue;
    }

    const text = fs.readFileSync(filePath, 'utf-8');
    const lines = text.split(/\r?\n/);

    const modules = [];
    let currentModule = null;
    let currentPage = null;

    let started = false;
    let inCodeBlock = false;

    for (let i = 0; i < lines.length; i++) {
        const originalLine = lines[i];
        const line = originalLine.trim();

        if (!started) {
            if (line.match(/^Chapter\s+1:/i)) {
                started = true;
            } else {
                continue;
            }
        }

        const chapterMatch = line.match(/^Chapter\s+(\d+):\s*(.*)/i);
        const pageMatch = line.match(/^(\d+\.\d+)\s+(.*)/);

        if (chapterMatch || pageMatch || line.match(/^PART\s+\d+:/i)) {
            if (inCodeBlock && currentPage) {
                currentPage.content += '\n```\n\n';
                inCodeBlock = false;
            }
        }

        if (chapterMatch) {
            if (currentModule) {
                currentModule.pages.push({
                    id: `knowledge-check-${currentModule.id}`,
                    title: `Knowledge Check`,
                    content: `# Module Assessment\n\nTest your understanding of the chapter with these interactive concept checks.\n\n${getContextualQnA(currentModule.title, course.varName)}`
                });
            }

            const chapterTitle = line;
            let chapterId = 'chapter' + chapterMatch[1];
            currentModule = {
                id: chapterId,
                title: chapterTitle,
                pages: []
            };
            modules.push(currentModule);
            currentPage = null;
            continue;
        }

        if (pageMatch) {
            const pageIdStr = pageMatch[1].replace(/\./g, '-');
            const pageTitle = pageMatch[2];
            currentPage = {
                id: `lesson-${pageIdStr}`,
                title: pageTitle,
                content: `# ${pageTitle}\n\n`
            };
            if (currentModule) {
                currentModule.pages.push(currentPage);
            }
            continue;
        }

        if (line.match(/^PART\s+\d+:/i)) {
            continue;
        }

        if (line === '________________') {
            continue;
        }

        if (currentPage) {
            if (['HTML', 'CSS', 'JavaScript', 'Bash', 'Plaintext'].includes(line)) {
                if (inCodeBlock) {
                    currentPage.content += '\n```\n\n';
                }
                currentPage.content += `\`\`\`${line.toLowerCase()}\n`;
                inCodeBlock = true;
                continue;
            }

            if (inCodeBlock && line === '') {
                let nextNonEmpty = '';
                for (let j = i + 1; j < lines.length; j++) {
                    if (lines[j].trim() !== '') {
                        nextNonEmpty = lines[j].trim();
                        break;
                    }
                }
                if (nextNonEmpty && isText(nextNonEmpty)) {
                    currentPage.content += '\n```\n\n';
                    inCodeBlock = false;
                    continue;
                }
            }

            currentPage.content += originalLine + '\n';
        }
    }

    if (inCodeBlock && currentPage) {
        currentPage.content += '\n```\n';
        inCodeBlock = false;
    }

    if (currentModule) {
        currentModule.pages.push({
            id: `knowledge-check-${currentModule.id}`,
            title: `Knowledge Check`,
            content: `# Module Assessment\n\nTest your understanding of the chapter with these interactive concept checks.\n\n${getContextualQnA(currentModule.title, course.varName)}`
        });
    }

    const cssImg = 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&w=800&q=80';
    const jsImg = 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=800&q=80';
    const reactImg = 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80';

    let resolvedImage = reactImg;
    if (course.varName === 'htmlCss') resolvedImage = cssImg;
    if (course.varName === 'jsDomination') resolvedImage = jsImg;

    let jsOutput = `export const ${course.varName} = {
    id: "${course.out.replace('.js', '')}",
    title: ${JSON.stringify(course.title)},
    description: ${course.description},
    image: "${resolvedImage}",
    tags: ${course.tags},
    duration: "Comprehensive",
    level: "All Levels",
    modules: [\n`;

    for (const mod of modules) {
        jsOutput += `        {
            id: "${mod.id}",
            title: ${JSON.stringify(mod.title)},
            pages: [\n`;
        for (const p of mod.pages) {
            jsOutput += `                {
                    id: "${p.id}",
                    title: ${JSON.stringify(p.title)},
                    content: ${JSON.stringify(p.content.trim())}
                },\n`;
        }
        jsOutput += `            ]
        },\n`;
    }

    jsOutput += `    ]
};\n`;

    fs.writeFileSync(path.join(__dirname, course.out), jsOutput);
    console.log('Successfully generated:', course.out);
}
