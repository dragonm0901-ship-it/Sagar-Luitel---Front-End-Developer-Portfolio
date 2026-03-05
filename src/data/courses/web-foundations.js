export const webFoundations = {
    id: "web-foundations",
    title: "Web Foundations: The 30-Phase Epic",
    description: "The absolute lowest level of the web. Master DNS, TCP/IP, the DOM, the Javascript Event Loop, Async Browser APIs, and Web Assembly.",
    image: "/courses/web_foundations.png",
    tags: ["HTML", "CSS", "Javascript", "Network", "Epic"],
    duration: "150 Chapters (Beginner to Senior)",
    level: "All Levels",
    modules: [
        // NETWORKING & INFRASTRUCTURE (PHASES 1-5)
        {
            id: "phase1",
            title: "Phase 1: DNS and the Undersea Cables",
            pages: [
                {
                    id: "literal-hardware",
                    title: "The Physical Internet",
                    content: `# Fiber Optics\n\nWhen you type \`google.com\`, data does not float in the air. A literal laser fires through a glass fiber-optic cable crossing the Pacific Ocean. The internet is physical hardware.\n\n### The ISP\nYour house has a router, which connects to your ISP (Internet Service Provider) via copper wire. Your ISP connects to massive Tier-1 network hubs.\n\nTo view a website in Japan, your request physically travels through a cable out of your town, across the country to a coastal data center, and under the ocean via intercontinental cables.`
                },
                {
                    id: "dns-resolution",
                    title: "The Telephone Book",
                    content: `# Translating Names to Numbers\n\nComputers only understand IP Addresses (e.g., \`142.250.190.46\`). Humans cannot memorize 50 IP addresses. DNS (Domain Name System) is the phonebook.\n\n### The 4-Step DNS Lookup\n1. **Browser Cache:** Have we visited \`netflix.com\` recently?\n2. **OS/Router Cache:** Ask your operating system.\n3. **ISP DNS Resolver:** Ask your internet provider.\n4. **Root & TLD Servers:** The physical backbone servers of the internet look up the \`.com\` registry and return the exact IP address to your browser.`
                }
            ]
        },
        {
            id: "phase2",
            title: "Phase 2: TCP/IP and Packets",
            pages: [
                {
                    id: "packet-switching",
                    title: "Chopping the Data",
                    content: `# Sending a 5GB Movie\n\nYou cannot push a 5-gigabyte file through a cable at once. It is chopped up into millions of microscopic 'Packets'.\n\nEach packet is placed inside an **IP Envelope**, stamped with a 'To' and 'From' IP address. These packets fly across the internet via routers, often taking entirely different geographical routes to avoid traffic.`
                },
                {
                    id: "tcp-handshake",
                    title: "The 3-Way Handshake",
                    content: `# Ensuring Delivery\n\nIP (Internet Protocol) just sends packets blindly. If a packet hits a broken router in Nevada and dies, IP doesn't care.\n\n**TCP (Transmission Control Protocol)** wraps around IP. Before sending data, it performs a 3-way Handshake:\n1. **SYN:** "Client: Hello, server! Can you hear me?"\n2. **SYN-ACK:** "Server: Yes, I hear you!"\n3. **ACK:** "Client: Great, sending data now!"\n\nIf a packet is lost, TCP mathematically calculates it and forces the sender to resend the missing piece, aggressively guaranteeing perfect data assembly on the other side.`
                }
            ]
        },
        {
            id: "phase3",
            title: "Phase 3: The HTTP Protocol",
            pages: [
                {
                    id: "stateless-text",
                    title: "Just a Text String",
                    content: `# The Standard Format\n\nUnderneath the UI, an HTTP request is literally just a raw text string separated by blank lines.\n\n\`\`\`http\nGET /users/123 HTTP/1.1\nHost: api.example.com\nAuthorization: Bearer my_token_123\nAccept: application/json\n\n\`\`\`\n\nIt is completely **stateless**. The server has amnesia; it forgets who you are the millisecond it replies. This is why Cookies and Tokens were invented—to remind the server who you are on *every single request*.`
                },
                {
                    id: "verbs-post-put-patch",
                    title: "CRU-D Operations",
                    content: `# Semantic Intent\n\nYou should NOT use a \`GET\` request to delete a user. The HTTP Verbs define the intent of the network call.\n\n*   **GET:** Read data. Must be safe and idempotent.\n*   **POST:** Create new data.\n*   **PUT:** Fully replace existing data.\n*   **PATCH:** Partially update existing data (e.g., just changing a password field).\n*   **DELETE:** Destroy data.`
                }
            ]
        },
        {
            id: "phase4",
            title: "Phase 4: Caching Architectures",
            pages: [
                {
                    id: "cache-control",
                    title: "Cache-Control Headers",
                    content: `# Saving Bandwidth\n\nIf you have a 5MB company logo, returning it on every page load will bankrupt your AWS server costs. \n\nThe server MUST return the header: \`Cache-Control: public, max-age=31536000\`. This mathematically orders the user's browser to save the image to their hard drive for exactly 1 year. They will never download it from your server again.`
                },
                {
                    id: "cdns",
                    title: "Content Delivery Networks",
                    content: `# Beating the Speed of Light\n\nIf your server is in New York, a user in Australia will experience a 300ms physical delay on every request (the speed of light through cables).\n\nA CDN (like Cloudflare) duplicates your images and videos onto 200 servers globally. The Australian user simply downloads the image from a data center in Sydney, dropping the load time from 300ms down to 10ms.`
                }
            ]
        },
        {
            id: "phase5",
            title: "Phase 5: HTTP/2 and QUIC",
            pages: [
                {
                    id: "head-of-line",
                    title: "The Multiplexing Evolution",
                    content: `# HTTP/1.1 Limitations\n\nIn old HTTP, a browser could only download 6 files at a time per domain. If your website had 50 images, the 7th image waited in line until the 1st image finished downloading (Head-of-Line Blocking).\n\n**HTTP/2 Multiplexing:** Completely shatters this limit. All 50 images are requested and downloaded simultaneously over a single, highly optimized TCP connection.`
                },
                {
                    id: "http3-udp",
                    title: "Ditching TCP",
                    content: `# HTTP/3: The Need for Speed\n\nTCP's strict "guaranteed delivery" checking acts as a speed limit on modern 5G networks. Google engineered **QUIC (HTTP/3)**, which discards TCP entirely and runs over raw UDP packets. It maintains reliability at the software code level rather than the hardware level, resulting in blindingly fast mobile connection startups.`
                }
            ]
        },

        // HTML & CSS MASTERY (PHASES 6-10)
        {
            id: "phase6",
            title: "Phase 6: The Semantic Document",
            pages: [
                {
                    id: "div-soup",
                    title: "Stop using Divs",
                    content: `# The Meaningless Box\n\nA \`<div>\` has exactly zero semantic meaning. If your entire website is built solely out of \`div\`s, Google's SEO bots cannot distinguish your Navigation Bar from your Footer from your Main Article.\n\n### The Correct Hierarchy\n\`\`\`html\n<header>\n  <nav>\n    <!-- Navigation elements -->\n  </nav>\n</header>\n<main>\n  <article>\n    <!-- The primary content for Google to read -->\n    <h1>The Importance of Semantics</h1>\n  </article>\n  <aside>\n    <!-- Sidebar / Ads -->\n  </aside>\n</main>\n<footer>\n  <!-- Legal links -->\n</footer>\n\`\`\``
                },
                {
                    id: "heading-structure",
                    title: "Multiple H1s are Illegal",
                    content: `# The Outline Algorithm\n\nYou must have exactly **ONE \`<H1>\` tag per page**. It acts as the absolute title of the document.\n\nDo not skip heading levels. You cannot jump from an \`<H2>\` to an \`<H4>\` just because you like the font size. HTML is a strict document outline. If you need a smaller font, use CSS classes (\`<h2 class=\"text-sm\">\`), but maintain the mathematical semantic hierarchy.`
                }
            ]
        },
        {
            id: "phase7",
            title: "Phase 7: Web Accessibility (a11y)",
            pages: [
                {
                    id: "screen-readers",
                    title: "Coding for the Blind",
                    content: `# The Invisible Users\n\nMillions of visually impaired users browse the web via Screen Readers (software that rapidly speaks the HTML structure out loud).\n\nIf you use a \`<div onClick={submit}>\` as a button, a Screen Reader will just say "Group". The user literally cannot know it's a button. You MUST use a native \`<button>\` tag, because the Browser tells the OS (and the Screen Reader) that the element is interactable via the Keyboard Enter key.`
                },
                {
                    id: "aria-attributes",
                    title: "Forcing States",
                    content: `# ARIA (Accessible Rich Internet Applications)\n\nWhen building complex custom React components (like a custom multi-select Dropdown), the native HTML tags aren't enough.\n\nYou must use ARIA states to manually update the Screen Reader.\n\n\`\`\`html\n<button \n  aria-expanded=\"true\" \n  aria-controls=\"dropdown-menu-123\"\n>\n  Open Settings\n</button>\n<ul id=\"dropdown-menu-123\">\n  <li aria-selected=\"true\">Dark Mode</li>\n</ul>\n\`\`\``
                }
            ]
        },
        {
            id: "phase8",
            title: "Phase 8: Fluid Typography & Math",
            pages: [
                {
                    id: "clamp-function",
                    title: "The Death of Media Queries",
                    content: `# Continuous Interpolation\n\nWriting 5 different \`@media\` breakpoints to slowly shrink an H1 on mobile is messy.\n\n### CSS Clamp()\n\`clamp(minimum, preferred variable math, maximum)\`\n\n\`\`\`css\nh1 {\n  /* \n    Min: 2rem (32px) on mobile.\n    Max: 4rem (64px) on 4K Desktop.\n    In between: Scales algorithmically based on Viewport Width (vw).\n  */\n  font-size: clamp(2rem, 5vw + 1rem, 4rem);\n}\n\`\`\`\nThis renders buttery smooth, infinitely scaling typography at every possible screen width simultaneously.`
                },
                {
                    id: "aspect-ratio",
                    title: "Stopping the Image Jump",
                    content: `# CLS (Cumulative Layout Shift)\n\nIf you load an image over relative slow WiFi, the Browser doesn't know how tall the image is until it finishes downloading. Suddenly, the image pops in, heavily pushing all the text down, causing the user to accidentally click the wrong button.\n\n\`\`\`css\n.hero-image {\n  width: 100%;\n  aspect-ratio: 16 / 9; /* CRITICAL */\n  object-fit: cover;\n}\n\`\`\`\nThis forces the Browser to reserve an empty mathematical rectangle *before* the image downloads, preventing Layout Shifts and boosting your Google SEO Score.`
                }
            ]
        },
        {
            id: "phase9",
            title: "Phase 9: Complex CSS Architectures",
            pages: [
                {
                    id: "bem-methodology",
                    title: "Block Element Modifier",
                    content: `# Stopping CSS Conflicts\n\nIn a 500-page React app, writing \`.title { color: red }\` is a timebomb. It will accidentally infect a completely unrelated component.\n\n**BEM** is a draconian naming convention:\n` + "`" + `.Block__Element--Modifier` + "`" + `\n\n\`\`\`css\n.card {}\n.card__image {}\n.card__title {}\n.card__title--featured { color: gold }\n\`\`\`\nBecause the class is highly specific (\`.card__title\`), it has mathematically zero chance of colliding with a generic \`.title\`.`
                },
                {
                    id: "css-variables-scoping",
                    title: "The Scope Ceiling",
                    content: `# Local vs Global Tokens\n\nYou define Global brand tokens on the \`:root\` (HTML tag). But you can leverage CSS Custom Properties to create locally scoped logic for complex components.\n\n\`\`\`css\n:root {\n  --brand: #blue;\n}\n\n.alert-box {\n  /* Scope a local variable */\n  --alert-color: gray;\n  border: 1px solid var(--alert-color);\n  color: var(--alert-color);\n}\n\n.alert-box.error {\n  /* Instantly overwrite the variable, changing the entire box coloring simultaneously */\n  --alert-color: red;\n}\n\`\`\``
                }
            ]
        },
        {
            id: "phase10",
            title: "Phase 10: CSS Paint & Houdini",
            pages: [
                {
                    id: "the-browser-engine",
                    title: "Accessing the CSS Render Parse",
                    content: `# Going Beyond Standard Properties\n\nWhat if you want a CSS property that doesn't exist? Like \`border-radius-squiggly: 5px\`. \n\n**CSS Houdini** is a set of low-level APIs that allow developers to literally write JavaScript code that hooks directly into the browser's C++ CSS rendering engine.\n\nYou can use the **CSS Paint API** to write a JS canvas script that dynamically paints custom background patterns, and call it directly from your CSS: \`background-image: paint(my-custom-squiggly-border)\`. It runs off the main thread, resulting in 60FPS high-performance rendering.`
                },
                {
                    id: "typed-om",
                    title: "The Typed Object Model",
                    content: `# No More Parsing Strings\n\nHistorically, to get a margin in Javascript, you got a string: \`const m = el.style.margin; // "10.5px"\`. You had to run regex or ` + "`" + `parseFloat` + "`" + ` to do math on it.\n\nThe Houdini Typed OM changes this. \n\`console.log(el.attributeStyleMap.get('margin')) // -> { value: 10.5, unit: "px" }\`\n\nIt treats CSS properties as strict Javascript Objects, massively accelerating performance during 3D scroll animations.`
                }
            ]
        },

        // CORE JAVASCRIPT & DOM (PHASES 11-15)
        {
            id: "phase11",
            title: "Phase 11: The Global Execution Context",
            pages: [
                {
                    id: "hoisting",
                    title: "Compiling before Execution",
                    content: `# Var is broken\n\nJavascript engine performs two passes over your code. \n1. **Compilation Phase:** It reads all variable declarations and physical function structures, moving them to the top of memory (Hoisting).\n2. **Execution Phase:** It physically runs the math.\n\n\`\`\`javascript\nconsole.log(age); // Outputs: undefined (No crash!)\nvar age = 25;\n\nconsole.log(name); // CRASH! ReferenceError\nlet name = "Sagar";\n\`\`\`\n\n\`var\` is hoisted generically, causing horrible logic bugs. \`let\` and \`const\` are hoisted into a \"Temporal Dead Zone\" (TDZ), strictly preventing you from accessing them before their line of code, forcing clean engineering.`
                },
                {
                    id: "this-keyword",
                    title: "The Call Site",
                    content: `# It has nothing to do with where it was written\n\nThe \`this\` keyword in Javascript is notoriously confusing because it does not refer to the object where the function was created; it refers to the object *who called the function at that exact millisecond*.\n\n\`\`\`javascript\nconst user = {\n    name: \"Sagar\",\n    print: function() { console.log(this.name) }\n};\n\nuser.print(); // Output: \"Sagar\"\n\n// WE EXTRACT THE FUNCTION\nconst detachedFunc = user.print;\ndetachedFunc(); // Output: undefined!!!\n\`\`\`\n\nBecause \`detachedFunc()\` was called globally, \`this\` defaulted to the absolute \`window\` object. You must use \`.bind()\` or use Arrow Functions (which permanently inherit \`this\` from their lexical parent) to fix this.`
                }
            ]
        },
        {
            id: "phase12",
            title: "Phase 12: Closures",
            pages: [
                {
                    id: "state-survival",
                    title: "Memory that Refuses to Die",
                    content: `# The Backpack of Variables\n\nWhen a function finishes running, its local variables are destroyed by Garbage Collection. A **Closure** is when an Inner Function survives the destruction of its Parent Function (e.g., by being returned), and physically keeps a \"backpack\" of the Parent's variables alive in RAM.\n\n### The Data Privacy Engine\n\`\`\`javascript\nfunction createBank() {\n    let balance = 1000; // This variable is locked away.\n\n    return {\n        withdraw: function(amount) {\n            balance -= amount;\n            console.log(\`New balance: \${balance}\`);\n        }\n    }\n}\n\nconst atm = createBank(); // The function runs and dies.\natm.withdraw(200); // Output: 800.\n// It still remembers 'balance'! But hackers cannot type 'atm.balance = 1000000'.\n\`\`\`\nThis is the core mechanic behind React Hooks like \`useState\`.`
                },
                {
                    id: "stale-closures",
                    title: "The Greatest React Bug",
                    content: `# The Frozen Backpack\n\nIf you attach a \`setInterval\` that reads a state variable inside a \`useEffect\`, the Interval grabs the variable inside its Closure Backpack.\n\nIf the state updates to 5, the React component redraws. But the old Interval is still ticking inside Browser memory, and its Backpack is strictly frozen in time, forever printing the number 0. You must learn to carefully manage closure dependencies.`
                }
            ]
        },
        {
            id: "phase13",
            title: "Phase 13: Prototypal Inheritance",
            pages: [
                {
                    id: "__proto__",
                    title: "The Object Chain",
                    content: `# Classes are Syntactic Sugar\n\nJavascript does not have true Object-Oriented 'Classes' like Java or C#. Under the hood, everything is essentially an Object linked to another Object via a hidden \`__proto__\` chain.\n\nWhen you call \`Array.map()\`, the engine looks at your empty array. It doesn't see \`.map\`. So it climbs the invisible ladder up to \`Array.prototype\`, finds the master C++ function there, and executes it.`
                },
                {
                    id: "prototype-pollution",
                    title: "Security Exploits",
                    content: `# Poisoning the Root\n\nBecause of this chain, if you modify the absolute base object: \`Object.prototype.isAdmin = true;\`, every single object, array, and string in the entire application will suddenly inherit \`isAdmin = true\` by default.\n\nHackers use \"Prototype Pollution\" by injecting malicious JSON payloads with hidden \`__proto__\` keys to overwrite global security settings across the entire Node.js server.`
                }
            ]
        },
        {
            id: "phase14",
            title: "Phase 14: The Document Object Model",
            pages: [
                {
                    id: "reflow-and-repaint",
                    title: "The Render Tree Math",
                    content: `# Why typical code is slow\n\nThe DOM (HTML elements) and CSSOM (Styles) are physically merged to create the Render Tree. \n\nIf you use a loop to append 1,000 blank \`<li>\` items natively: \n\`\`\`javascript\nfor(let i=0; i<1000; i++) {\n  document.body.appendChild(li);\n}\n\`\`\`\nEvery single time it loops, the Browser halts the CPU, recalculates the geometry of every pixel on screen (Reflow), and redraws it (Repaint) 1,000 times. You must use a \`DocumentFragment\` to compile all 1,000 items in invisible memory, and inject them strictly once.`
                },
                {
                    id: "event-delegation",
                    title: "Memory Saving Patterns",
                    content: `# 10,000 Event Listeners\n\nIf you have a shopping list with 5,000 items, and you add an \`onClick\` listener to every single \`Delete\` button, the Browser will consume massive RAM tracking 5,000 event objects.\n\n### The Bubble Up\nEvents "Bubble" up the DOM tree globally. You should place exactly **ONE** \`onClick\` listener on the \`<ul>\` parent wrapper.\n\`\`\`javascript\nul.addEventListener('click', (e) => {\n  if (e.target.tagName === 'BUTTON') {\n    // We caught the click dynamically as it bubbled up!\n    deleteItem(e.target.id);\n  }\n});\n\`\`\``
                }
            ]
        },
        {
            id: "phase15",
            title: "Phase 15: Mutation Observers",
            pages: [
                {
                    id: "watching-the-dom",
                    title: "Asynchronous Structural Tracking",
                    content: `# Listening to the Engine\n\nSometimes an external library (like a Google Maps widget) alters the HTML mathematically, and you need your React component to react to those changes. You cannot use normal events.\n\n\`MutationObserver\` hooks directly into the C++ Engine to watch physical changes (nodes added, attributes changed) and execute a callback silently on the Microtask Queue.`
                },
                {
                    id: "intersection-observer",
                    title: "Scroll Tracking Physics",
                    content: `# Deleting your Scroll Listeners\n\nNever use \`window.addEventListener('scroll')\` to track if an element is on screen. It fires the callback 60 times a second, grinding the CPU to a halt.\n\n\`IntersectionObserver\` calculates mathematically off the main thread. It watches an element, and fires exactly once when the element crosses the \`10%\` threshold of the viewport. This is the absolute core requirement for Infinite Scrolling and Lazy Loading Images.`
                }
            ]
        },

        // ASYNC & WEB APIS (PHASES 16-20)
        {
            id: "phase16",
            title: "Phase 16: The V8 Event Loop",
            pages: [
                {
                    id: "the-call-stack",
                    title: "Single Threaded Reality",
                    content: `# LIFO Execution\n\nJavascript has exactly ONE Call Stack (Last In, First Out). The Engine executes code synchronously line by line. If a function contains a brutal \`for\` loop counting to 5 Billion, the Stack is completely blocked. The Browser freezes. The user cannot even click a hyperlink until the loop finishes.`
                },
                {
                    id: "c-web-apis",
                    title: "Offloading the Work",
                    content: `# The Secret Background\n\nWhen you call \`fetch()\` or \`setTimeout()\`, V8 instantly pops them off the Call Stack. It passes the work to the Browser's internal C++ Web APIs (a completely different hardware thread).\n\nThe main JS Stack is instantly freed to render the UI, while the C++ thread waits 250ms for the API to download data in the background.`
                }
            ]
        },
        {
            id: "phase17",
            title: "Phase 17: Macrotasks vs Microtasks",
            pages: [
                {
                    id: "the-queues",
                    title: "The Priority Line",
                    content: `# Who runs first?\n\nWhen the C++ background work finishes, it doesn't just jam the result back into the Javascript Stack. It places the callback in a Queue. The Event Loop constantly spins, checking if the Stack is empty, pushing Queue items up to run.\n\nThere are two main queues:\n1. **Macrotask Queue:** \`setTimeout\`, \`setInterval\`, DOM Events.\n2. **Microtask Queue:** Promises (\`.then\`), \`MutationObserver\`.\n\n### The Absolute Law\nThe Event Loop will ALWAYS empty every single item in the Microtask Queue *before* it touches a single Macrotask. Promises physically jump the line ahead of \`setTimeout\`.`
                },
                {
                    id: "queue-starvation",
                    title: "Infinite Microtasks",
                    content: `# Breaking the Loop\n\nIf you write a Promise that recursively generates another Promise, the Microtask Queue will fill up instantly and infinitely. Because the Event Loop refuses to move to Macrotasks until Microtasks are empty, the UI rendering (which happens between tasks) is starved, causing a total browser crash.`
                }
            ]
        },
        {
            id: "phase18",
            title: "Phase 18: Async / Await Architecture",
            pages: [
                {
                    id: "synthetic-sugar",
                    title: "Generators underneath",
                    content: `# Unpacking the Magic\n\n\`async/await\` is not real. It is syntactic sugar built on top of ES6 Generator Functions (\`function*()\`) and \`yield\`. It mathematically pauses the execution context of the function, saves the internal variables, yields control back to the Event Loop, and physically resumes the function later once the Promise returns.`
                },
                {
                    id: "promise-all",
                    title: "Parallel Execution",
                    content: `# The Waterfall Error\n\n\`\`\`javascript\n// BAD: Takes 6 seconds total\nconst users = await fetchUsers(); // Takes 3s\nconst posts = await fetchPosts(); // Takes 3s\n\`\`\`\n\nIf the data isn't dependent on each other, you MUST fire them simultaneously in physical parallel.\n\n\`\`\`javascript\n// GOOD: Takes 3 seconds total\nconst [users, posts] = await Promise.all([\n  fetchUsers(),\n  fetchPosts()\n]);\n\`\`\``
                }
            ]
        },
        {
            id: "phase19",
            title: "Phase 19: Web Workers",
            pages: [
                {
                    id: "multithreading-browser",
                    title: "Escaping the Single Thread",
                    content: `# Heavy Computation\n\nIf you need to parse a 50MB CSV file or calculate encryption hashes on the frontend, the UI will completely lock up.\n\n**Web Workers** let you spawn entirely separate threads inside the user's CPU core. \n\n\`const worker = new Worker('heavyMath.js');\`\n\nYou send the 50MB CSV via \`postMessage({ data: massiveFile })\`. The background CPU core crunches it perfectly silently, while the user experiences a 60FPS scrolling UI.`
                },
                {
                    id: "worker-limitations",
                    title: "The Sandbox",
                    content: `# No DOM Access\n\nBecause they run on parallel CPU threads, Web Workers **cannot physically access the DOM** (` + "`" + `document.body` + "`" + `). If multiple threads tried to rapidly manipulate the ` + "`" + `<body>` + "`" + ` tag simultaneously, it would cause a C++ memory segmentation fault.\n\nWorkers are strictly for data crunching. They crunch the math, and \`postMessage\` the final string back to the Main Thread, which safely paints it to the screen.`
                }
            ]
        },
        {
            id: "phase20",
            title: "Phase 20: IndexedDB & File System API",
            pages: [
                {
                    id: "localstorage-limits",
                    title: "Escaping the 5MB string",
                    content: `# Hard Drive Architecture\n\n\`localStorage\` is terrible. It is limited to 5MB, entirely synchronous (blocking the CPU), and only supports Strings.\n\n**IndexedDB** is a fully asynchronous NoSQL database living natively *inside the browser*. It can easily store 2 Gigabytes of Blob Audio data, ArrayBuffers, and complex object indices without ever talking to a Node.js server.`
                },
                {
                    id: "opfs",
                    title: "The Origin Private File System",
                    content: `# Real File Writing\n\nThe newest browsers support OPFS. This allows Javascript to create real, hierarchical directories (` + "`" + `/app/data/videos` + "`" + `) physically on the user's SSD memory sectors. \n\nIt is entirely sandboxed to the website's Origin, but provides near-native read/write speeds, enabling browser-based video editors (like Photoshop Web) to process 4K video instantly.`
                }
            ]
        },

        // FUTURE WEB (PHASES 21-30) - CONSOLIDATED IN THIS PAYLOAD
        {
            id: "phase21",
            title: "Phase 21: Service Workers",
            pages: [
                {
                    id: "the-network-proxy",
                    title: "The Invisible Middleman",
                    content: `# Intercepting API Calls\n\nA Service Worker is a specialized Web Worker that acts as a physical proxy server sitting constantly between your Javascript and the Internet Router.\n\nWhen your React app runs \`fetch('/data')\`, the request doesn't go to the internet. It goes to the Service Worker. The worker runs: "Is the user offline? If yes, route the request instantly to IndexedDB and serve cached data."`
                },
                {
                    id: "pwa-caching",
                    title: "Progressive Web Apps",
                    content: `# Cache Strategies\n\nService Workers allow \"Stale-while-revalidate\" patterns. When a user opens your app, the worker instantly serves the CSS/JS from the hard drive (0.1s load time). Simultaneously, it pings the real internet. If a new version of the code exists, it silently downloads it in the background, ready for the *next* refresh.`
                }
            ]
        },
        {
            id: "phase22",
            title: "Phase 22: Web Sockets & SSE",
            pages: [
                {
                    id: "push-technology",
                    title: "Server-Sent Events",
                    content: `# Unidirectional Streams\n\nIf you are building a generic stock ticker, polling \`/getStock\` every 1 second destroys mobile batteries. \n\n**Server-Sent Events (SSE)** uses a single HTTP connection to keep a pipeline open indefinitely. The server physically "pushes" strings down to the Javascript \`EventSource\` API the exact millisecond a stock price changes.`
                },
                {
                    id: "tcp-bidi",
                    title: "The WebSocket Upgrade",
                    content: `# True Multiplayer Gaming\n\nSSE is one-way (Server to Client). For a multiplayer video game, you need two-way communication. WebSockets start as an HTTP request, but issue a physical \`Connection: Upgrade\` command. The HTTP protocol is violently stripped away, leaving an open, raw TCP socket where binary frames can be hurled back and forth in 5 milliseconds.`
                }
            ]
        },
        {
            id: "phase23",
            title: "Phase 23: WebRTC Architecture",
            pages: [
                {
                    id: "peer-to-peer",
                    title: "Bypassing the Server",
                    content: `# Zoom and Discord Video\n\nIf you and a friend do a video call, pumping 4K video to a central Node server and bouncing it back takes immense bandwidth cost.\n\n**WebRTC** discovers the physical IP addresses of both users natively fighting through Firewalls via STUN/TURN servers. It physically connects Browser A directly to Browser B. The 4K video data flows directly between laptops, utilizing UDP packets for zero-latency peer-to-peer transmission.`
                },
                {
                    id: "data-channels",
                    title: "P2P Data Streams",
                    content: `# BitTorrent in JS\n\nWebRTC isn't just for Video/Audio. The \`RTCDataChannel\` API allows you to send physical ArrayBuffers peer-to-peer. You can build file sharing applications where users transfer 100GB files directly device-to-device through the browser, with the server acting only as a microscopic signaling broker.`
                }
            ]
        },
        {
            id: "phase24",
            title: "Phase 24: WebAssembly (Wasm)",
            pages: [
                {
                    id: "binary-in-browser",
                    title: "The Speed of C++",
                    content: `# Translating C to the Web\n\nJavascript is dynamically typed. The V8 engine has to 'guess' object shapes to compile it. This makes it too slow to run Unreal Engine 5 inside the browser.\n\n**WebAssembly (.wasm)** is a low-level binary format. You write Rust or C++, compile it down to Wasm bytecode, and Javascript executes it natively. Because Wasm is already compiled math, the browser executes it at almost 95% native hardware speed.`
                },
                {
                    id: "rust-integration",
                    title: "JS and Wasm Interop",
                    content: `# Passing Memory\n\nWasm doesn't replace JS; it augments it. Your React app handles the DOM (because \`onClick\` is easy), but when the user uploads an image to apply an Instagram filter, React passes the ArrayBuffer physical memory pointer to a Rust Wasm function. Rust crunches the pixel math in 2ms, and returns the pointer.`
                }
            ]
        },
        {
            id: "phase25",
            title: "Phase 25: The Canvas API",
            pages: [
                {
                    id: "pixel-buffers",
                    title: "2D Rendering Logic",
                    content: `# Manipulating ImageData\n\nThe \`<canvas>\` tag represents a blank grid of pixels. Using \`ctx.getImageData()\`, you extract a colossal \`Uint8ClampedArray\`. \n\nFor a 1080p canvas, the array has exactly 8,294,400 numbers (\`[Red, Green, Blue, Alpha, Red, Green...]\`). By running mathematical algorithms over this array, you can build custom barcode scanners or facial recognition without external libraries.`
                },
                {
                    id: "hardware-acceleration",
                    title: "Canvas vs DOM",
                    content: `# Building Flappy Bird\n\nIf you build Flappy Bird by moving a \`<div>\` absolute position using State, the Browser's Repaint algorithm will drop frames.\n\nIf you build it using ` + "`" + `canvas.fillRect()` + "`" + ` wrapped inside a ` + "`" + `requestAnimationFrame` + "`" + `, the Browser offloads the raw pixel rendering completely to the GPU, yielding perfect 144FPS capability on a Macbook Pro.`
                }
            ]
        },
        {
            id: "phase26",
            title: "Phase 26: WebGL Fundamentals",
            pages: [
                {
                    id: "raw-webgl",
                    title: "The State Machine",
                    content: `# You do not want to write this\n\nBefore you use Three.js, you must understand raw WebGL. It is not an Object-Oriented language; it is a global State Machine.\n\nTo draw a colored triangle natively requires 80 lines of incredibly dense, error-prone API bindings to bind memory buffers, compile shaders on the fly, and link the GPU rendering programs manually.`
                },
                {
                    id: "webgpu",
                    title: "The Future web API",
                    content: `# WebGL is dead, long live WebGPU\n\nWebGL works purely for rendering graphics. But modern GPUs are supercomputers holding thousands of cores. **WebGPU** is the modern API that allows Javascript to write 'Compute Shaders'—programs that execute raw Machine Learning matrix multiplication natively on the user's RTX 4090 GPU hardware directly inside Google Chrome.`
                }
            ]
        },
        {
            id: "phase27",
            title: "Phase 27: Cross-Origin Security",
            pages: [
                {
                    id: "cors-mechanics",
                    title: "Cross-Origin Resource Sharing",
                    content: `# The Preflight OPTION\n\nIf \`evil.com\` executes a Javascript \`fetch('https://yourbank.com/transfer')\`, the Browser intercepts the physical network call.\n\nThe Browser first fires a ghost \`OPTIONS\` request to the bank server (The Preflight). The bank replies: "I only allow connections from \`react.yourbank.com\`". Because \`evil.com\` doesn't match the \`Access-Control-Allow-Origin\` header, the Browser violently blocks the Javascript from reading the response. CORS is a Browser protection layer.`
                }
            ]
        },
        {
            id: "phase28",
            title: "Phase 28: Content Security Policy",
            pages: [
                {
                    id: "csp-headers",
                    title: "Defeating Third-Party Scripts",
                    content: `# The Server Lockdown\n\nIf an XSS hacker injects \`<script src=\"http://hackersight.com/keylogger.js\"></script>\` into a comment box on your site, it will steal data.\n\nThe **CSP (Content Security Policy)** is an HTTP header your backend sends indicating: "I only allow scripts to load from exactly \`cloudflare.com\` and \`google-analytics.com\`". The browser reads this HTTP header, and mathematically refuses to execute the hacker's unauthorized external keylogger script.`
                }
            ]
        },
        {
            id: "phase29",
            title: "Phase 29: Web Cryptography API",
            pages: [
                {
                    id: "subtle-crypto",
                    title: "Native Hashing",
                    content: `# Bypassing external libraries\n\nYou do not need ` + "`" + `npm install crypto-js` + "`" + ` in modern browsers.\n\nThe \`crypto.subtle\` API is built natively into C++. It allows asynchronous, non-blocking generation of true mathematical UUIDs (` + "`" + `crypto.randomUUID()` + "`" + `), secure SHA-256 hashing for password arrays, and RSA public/private key generation entirely in the client's browser.`
                }
            ]
        },
        {
            id: "phase30",
            title: "Phase 30: The Capstone Foundation",
            pages: [
                {
                    id: "building-a-framework",
                    title: "Create React Yourself",
                    content: `# The Ultimate Test\n\nTo prove you understand the Web Foundations, your final unguided challenge is to build a micro-framework.\n\nYou must write vanilla Javascript to parse custom HTML-like syntax, generate a custom Component tree, build a recursive Reconciliation diffing algorithm, manage rendering using DocumentFragments, and attach Event Delegated listeners... all in under 500 lines of Code.`
                }
            ]
        }
    ]
};
