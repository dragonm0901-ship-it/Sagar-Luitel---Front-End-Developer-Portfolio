export const webFoundations = {
    id: "web-foundations",
    title: "Web Foundations: The 30-Phase Epic",
    description: "From the physical undersea cables to compiling WebAssembly. The most exhaustive, microscopic breakdown of the internet, HTML, CSS, and vanilla JS ever created.",
    image: "/courses/web_foundations.png",
    tags: ["HTML", "CSS", "JavaScript", "Network", "Epic"],
    duration: "150 Chapters (Absolute Zero to Master)",
    level: "All Levels",
    modules: [
        // NETWORK BACKBONE (PHASES 1-5)
        {
            id: "phase1",
            title: "Phase 1: The Undersea Cables",
            pages: [
                { id: "cables-data-centers", title: "Where the Internet Lives", content: "# The Internet is Physical\n\nThere is no 'Cloud'. There are only massive warehouses of computers connected by fiber-optic cables running across the bottom of the ocean. When you access a website, pulses of light bounce between continents to deliver your HTML." }
            ]
        },
        {
            id: "phase2",
            title: "Phase 2: IP & DNS Routing",
            pages: [
                { id: "ip-addresses", title: "TCP/IP & The Phonebook", content: "# Translating Domains to Numbers\n\nComputers only understand IP addresses layout out over TCP protocols. We use the **Domain Name System (DNS)** to translate human-readable names like `google.com` into routing numbers like `142.250.190.46`." }
            ]
        },
        {
            id: "phase3",
            title: "Phase 3: The HTTP Protocol",
            pages: [
                { id: "http-verbs-headers", title: "Verbs, Headers, and Bodies", content: "# The Language of the Web\n\nYour browser sends an HTTP Request (GET, POST, PUT, DELETE) containing metadata via Headers (like your Cookie), and the server responds with an HTTP Status Code (200 OK, 404 NOT FOUND, 500 SERVER ERROR) and the Body (the actual HTML response payload)." }
            ]
        },
        {
            id: "phase4",
            title: "Phase 4: HTTP/1.1 vs HTTP/2",
            pages: [
                { id: "http2-multiplexing", title: "Solving the Waterfall", content: "# Multiplexing\n\nHTTP/1.1 suffered from 'Head of Line Blocking'—it could only download 6 files at a time over a single connection. HTTP/2 introduced Multiplexing, allowing a single TCP connection to download 100 images simultaneously." }
            ]
        },
        {
            id: "phase5",
            title: "Phase 5: HTTP/3 & QUIC",
            pages: [
                { id: "http3-quic", title: "Abandoning TCP for UDP", content: "# The Need for Speed\n\nHTTP/3 throws away the mathematically rigid (but slow) TCP protocol in favor of QUIC (running over UDP), cutting connection handshake times in half for mobile users physically moving between cell towers." }
            ]
        },

        // HTML & ACCESSIBILITY (PHASES 6-10)
        {
            id: "phase6",
            title: "Phase 6: The Document Object Model",
            pages: [
                { id: "dom-tree", title: "Parsing the Tree", content: "# The Browser Engine\n\nWhen standard text HTML hits your browser, the internal engine (like Google's V8) immediately parses it into a massive, C++ object tree called the DOM (Document Object Model). Every `<div>` becomes a node." }
            ]
        },
        {
            id: "phase7",
            title: "Phase 7: Semantic Hierarchy",
            pages: [
                { id: "seo-semantics", title: "Div Soup vs Meaning", content: "# Tell the Browser What it Is\n\nA screen-reader has no idea what `<div class='header'>` means. You must use Semantic Tags (`<header>`, `<main>`, `<article>`, `<nav>`) to define structure for SEO bots and visually impaired users." }
            ]
        },
        {
            id: "phase8",
            title: "Phase 8: Forms & Validation",
            pages: [
                { id: "native-validation", title: "Input Types and Patterns", content: "# Trusting the Browser\n\nBefore writing massive Javascript validation functions, leverage HTML5. Setting `type='email'` triggers the specific `@` keyboard on mobile phones, and the `pattern` attribute allows raw Regex validation before the form even submits." }
            ]
        },
        {
            id: "phase9",
            title: "Phase 9: ARIA States",
            pages: [
                { id: "aria-labels", title: "Accessible Rich Internet Apps", content: "# The Override\n\nIf you build a custom dropdown menu out of `<div>` tags, you must use ARIA states (`aria-expanded='true'`, `aria-hidden='false'`, `role='menu'`) to map its current Javascript state to the screen reader." }
            ]
        },
        {
            id: "phase10",
            title: "Phase 10: WCAG 2.1 Compliance",
            pages: [
                { id: "contrast-tabbing", title: "Contrast and Tab Index", content: "# The Law of the Web\n\nWCAG guidelines dictate that text must have a 4.5:1 contrast ratio against its background. Furthermore, a user must be able to navigate your entire website using ONLY the `TAB` key, never requiring a mouse." }
            ]
        },

        // CSS ARCHITECTURE (PHASES 11-15)
        {
            id: "phase11",
            title: "Phase 11: The CSS Object Model",
            pages: [
                { id: "cssom-parsing", title: "The Render Tree", content: "# Blocking the Paint\n\nCSS is 'Render Blocking'. The browser cannot draw a single pixel until the DOM and the CSSOM (CSS Object Model) are combined into the Render Tree. A massively bloated CSS file will create a blank white screen." }
            ]
        },
        {
            id: "phase12",
            title: "Phase 12: BEM Methodology",
            pages: [
                { id: "bem-naming", title: "Block, Element, Modifier", content: "# Preventing Global Scope Leaks\n\nCSS has global scope. To prevent `.button` in your header from breaking `.button` in your footer, we use BEM (`.block__element--modifier`). Example: `.card__title--large`." }
            ]
        },
        {
            id: "phase13",
            title: "Phase 13: Layout Algorithms",
            pages: [
                { id: "flex-vs-grid", title: "Flexbox & Grid Interactions", content: "# 1D vs 2D Mathematics\n\nFlexbox is designed for 1-dimensional content distribution (aligning items inside a NavBar). CSS Grid is a 2-dimensional architectural tool (defining the overarching page layout of Header, Sidebar, Main, Footer)." }
            ]
        },
        {
            id: "phase14",
            title: "Phase 14: Fluid Typography",
            pages: [
                { id: "css-clamp", title: "The Clamp Math", content: "# Media Queries are Dead\n\nInstead of writing 5 different media queries to shrink text on mobile, use `font-size: clamp(1rem, 5vw, 3rem);`. This smoothly interpolation the font size between a minimum and maximum floor dynamically." }
            ]
        },
        {
            id: "phase15",
            title: "Phase 15: CSS Houdini",
            pages: [
                { id: "css-paint-api", title: "Extending the CSS Engine", content: "# The Future of CSS\n\nThe CSS Paint API (part of Houdini) allows developers to write raw Javascript functions that hook directly into the browser's CSS rendering engine, allowing for mathematically complex, performant, dynamic backgrounds that CSS natively cannot achieve." }
            ]
        },

        // CORE ECMASCRIPT (PHASES 16-20)
        {
            id: "phase16",
            title: "Phase 16: The Execution Context",
            pages: [
                { id: "hoisting-stack", title: "Hoisting and the Call Stack", content: "# Compiling Javascript\n\nJavascript is heavily compiled milliseconds before execution. The engine sweeps through the file and 'Hoists' variable declarations and function signatures to the top of their scope, allowing you to invoke a function before you define it." }
            ]
        },
        {
            id: "phase17",
            title: "Phase 17: Lexical Scoping",
            pages: [
                { id: "closures", title: "The Magic of Closures", content: "# Remembering lexical environments\n\nA Closure is created when a child function 'remembers' the variable scope of its parent function, even after the parent function has finished executing and been popped off the Call Stack. This is the foundation of data privacy in JS." }
            ]
        },
        {
            id: "phase18",
            title: "Phase 18: The 'this' Keyword",
            pages: [
                { id: "binding-context", title: "Call, Apply, and Bind", content: "# The Shifting Context\n\nIn arrow functions, `this` is lexically bound (it equals exactly what it did when you wrote it). In standard `function()` declarations, `this` changes dynamically based on *how* the function was invoked. You can forcefully override `this` using `.bind()`." }
            ]
        },
        {
            id: "phase19",
            title: "Phase 19: Prototypal Inheritance",
            pages: [
                { id: "prototype-chain", title: "The hidden '__proto__'", content: "# There are no Classes\n\nJavascript does not have true classes like Java. `class User {}` is 'Syntactic Sugar' placed over the Prototype Chain. When you call an array method like `.map()`, JS searches up the `__proto__` chain until it finds the `Array.prototype` object containing that mathematical formula." }
            ]
        },
        {
            id: "phase20",
            title: "Phase 20: Event Delegation",
            pages: [
                { id: "bubble-capture", title: "Bubbling and Capturing", content: "# Saving RAM\n\nNever attach 1,000 event listeners to a list of 1,000 items. Attach exactly 1 listener to the Parent `<ul>`. When a child runs, the event 'Bubbles' up to the parent, where you inspect the `e.target` to run the logic. This saves massive amounts of memory." }
            ]
        },

        // THE ASYNC BROWSER (PHASES 21-25)
        {
            id: "phase21",
            title: "Phase 21: The Event Loop",
            pages: [
                { id: "macrotask-microtask", title: "Macrotasks vs Microtasks", content: "# Orchestrating the Main Thread\n\nThe JS Event Loop contains two queues. Promises always go to the Microtask Queue, which executes *before* the Macrotask Queue (`setTimeout`). A resolved Promise will always run before a `setTimeout(0)`!" }
            ]
        },
        {
            id: "phase22",
            title: "Phase 22: Async Error Handling",
            pages: [
                { id: "catch-500s", title: "The Truth about fetch()", content: "# fetch() lies to you\n\nA Promise only rejects on sudden network failures (like dropping WiFi). `fetch()` will happily 'resolve' a 500 Internal Server error or a 404 Route Not Found. You must manually throw a programmatic error by checking `if (!res.ok)`." }
            ]
        },
        {
            id: "phase23",
            title: "Phase 23: Web Workers",
            pages: [
                { id: "offloading-threads", title: "Escaping the Single Thread", content: "# Multi-threading Javascript\n\nIf you need to process a massive 50MB CSV file, doing so on the main thread will lock the UI and crash the browser tab. You must spin up a dedicated `Web Worker` to offload the heavy CPU math to a separate background thread on the user's processor." }
            ]
        },
        {
            id: "phase24",
            title: "Phase 24: Service Workers",
            pages: [
                { id: "pwa-offline", title: "The Offline Web (PWA)", content: "# Intercepting Network Requests\n\nA Service Worker is a specialized script running in the background. It acts as a proxy. If the user loses WiFi on an airplane, the Service Worker catches the network request, intercepts it, and instantly returns the cached HTML file, allowing the app to run completely offline." }
            ]
        },
        {
            id: "phase25",
            title: "Phase 25: IndexedDB",
            pages: [
                { id: "client-database", title: "The Browser NoSQL DB", content: "# Beyond LocalStorage\n\nLocalStorage has a 5MB rigid limit and operates exclusively on synchronous strings. If your offline app needs to store massive arrays of data offline, you must query the asynchronous `IndexedDB`, a true NoSQL transactional database hidden inside the Chrome browser." }
            ]
        },

        // THE BARE METAL (PHASES 26-30)
        {
            id: "phase26",
            title: "Phase 26: Web Sockets",
            pages: [
                { id: "persistent-tcp", title: "Bi-directional TCP", content: "# Never Poll the Server\n\nStandard HTTP requires the client to beg the server for data. If you are building a live chat app or a cryptocurrency ticker, you must upgrade the HTTP handshake to a Web Socket (ws://). This holds a TCP pipeline completely open, allowing the server to push raw binary data to the client." }
            ]
        },
        {
            id: "phase27",
            title: "Phase 27: WebRTC",
            pages: [
                { id: "peer-to-peer", title: "Peer-to-Peer Video", content: "# Bypassing the Backend\n\nIf you are building Zoom or Discord, routing 4K video through your Node.js server will bandwidth-strangle your backend. WebRTC allows Browser A to connect and stream video directly to Browser B, completely bypassing the server topology." }
            ]
        },
        {
            id: "phase28",
            title: "Phase 28: Canvas and WebGL Contexts",
            pages: [
                { id: "gpu-acceleration", title: "Unlocking the Graphics Card", content: "# 60FPS Painting\n\nThe DOM is slow. To render 10,000 moving particles or build a Game Engine, you must escape the DOM and interact with an HTML `<canvas>`, requesting a `2d` or `webgl` context to directly instruct the user's dedicated GPU to execute C-based shaders." }
            ]
        },
        {
            id: "phase29",
            title: "Phase 29: Assembly Languages",
            pages: [
                { id: "wasm-intro", title: "Compiling WebAssembly", content: "# Writing C++ for the Browser\n\nJavascript is interpreted and compiled at runtime, meaning it has a mathematical speed ceiling. WebAssembly (Wasm) allows you to write C, C++, or Rust algorithms, compile them into a dense binary (`.wasm`), and execute them in the browser at near-native CPU speeds. Essential for video editors like Figma." }
            ]
        },
        {
            id: "phase30",
            title: "Phase 30: Capstone Architectures",
            pages: [
                { id: "architecture-capstone", title: "Engineering the PWA", content: "# Tying It All Together\n\nYour final capstone: Build a high-performance offline Markdown Editor. \n1. HTML/CSS semantic skeleton.\n2. IndexedDB to cache documents asynchronously.\n3. Service Workers to allow offline PWA installation.\n4. A Web Worker to offload the heavy markdown regex parsing off the main UI thread." }
            ]
        }
    ]
};
