export const nodeArchitectures = {
    id: "node-architectures",
    title: "Node.js Architectures: The 20-Phase Epic",
    description: "Go beyond Express. Master the V8 Engine, libuv, raw TCP Streams, Memory Leak profiling, and writing custom C++ Addons for Node.js.",
    image: "/courses/node.png",
    tags: ["Node.js", "C++", "V8", "Streams", "Epic"],
    duration: "100 Chapters (Systems Engineering)",
    level: "Expert",
    modules: [
        // CORE ENGINE INTERNALS (PHASES 1-5)
        {
            id: "phase1",
            title: "Phase 1: The V8 & Libuv Marriage",
            pages: [
                {
                    id: "v8-compilation",
                    title: "JIT Compilation",
                    content: `# Chrome's Engine Server-Side\n\nNode.js is not a language. It is a C++ wrapper. V8 (Google Chrome's engine) takes your JavaScript and uses Just-In-Time (JIT) compilation to convert it into raw Assembly code locally on the server.\n\n### The Ignition Interpreter & TurboFan\nV8 initially runs your code cleanly but slowly via the Ignition interpreter. If it notices a function is "hot" (called 10,000 times), it passes it to the TurboFan optimizer. TurboFan locks in the data types mathematically and compiles it to hyper-fast hardware machine code.`
                },
                {
                    id: "breaking-v8",
                    title: "De-optimization Traps",
                    content: `# Destroying Performance\n\n\`\`\`javascript\nfunction add(a, b) { return a + b; }\n\n// V8 TurboFan optimizes this for Integers after 5000 calls\nfor (let i = 0; i < 10000; i++) add(i, i);\n\n// YOU JUST BROKE THE ENGINE\nadd(\"Hello\", \"World\"); \n\`\`\`\n\nBecause you passed Strings into an Integer-optimized function, TurboFan panics. It throws away the optimized machine code and forcefully downgrades back to the slow Ignition interpreter (a "Deopt"). This is why TypeScript makes Node.js faster—predictable types prevent V8 de-optimizations.`
                }
            ]
        },
        {
            id: "phase2",
            title: "Phase 2: The Libuv Thread Pool",
            pages: [
                {
                    id: "not-single-threaded",
                    title: "The C++ Background",
                    content: `# The Asynchronous Lie\n\nPeople say "Node is completely single-threaded." This is false. Your JavaScript code executes on a single thread. But when you call \`fs.readFile()\`, Node instantly offloads the heavy lifting to **Libuv**.\n\nLibuv is a C library that maintains a hidden pre-warmed pool of 4 native operating system level threads. It handles the brutal hardware networking mathematics while the JS thread keeps serving HTTP requests.`
                },
                {
                    id: "threadpool-exhaustion",
                    title: "The UV_THREADPOOL_SIZE Crash",
                    content: `# Starving the Pool\n\nBy default, Libuv only has 4 threads.\nIf 5 users simultaneously request a massive \`bcrypt.hash()\` (which takes 2 seconds and uses the Libuv pool), the first 4 users get a thread. The 5th user must sit in a queue completely paused for 2 full seconds until a thread frees up.\n\n**The Fix:** You must scale the server dynamically.\n\`process.env.UV_THREADPOOL_SIZE = os.cpus().length;\`\nThis explicitly forces Libuv to boot up exactly one thread per physical CPU core on your AWS machine.`
                }
            ]
        },
        {
            id: "phase3",
            title: "Phase 3: The Event Loop Phases",
            pages: [
                {
                    id: "event-loop-architecture",
                    title: "The 6 Phases of Node",
                    content: `# Not quite the Browser\n\nThe Browser event loop is simple (Micro vs Macro). Node.js is a complex C program with 6 distinct execution phases that rotate endlessly:\n\n1.  **Timers:** Executes \`setTimeout\`.\n2.  **Pending Callbacks:** Executes OS system errors.\n3.  **Idle/Prepare:** Internal engine use.\n4.  **Poll:** The most important phase. Retrieves incoming HTTP requests and file data.\n5.  **Check:** Executes \`setImmediate\`.\n6.  **Close Callbacks:** Executes socket closure \`socket.on('close')\`.\n\nBetween *every single phase*, Node stops and completely drains the Microtask Queue (Promises).`
                },
                {
                    id: "setimmediate-vs-settimeout",
                    title: "Tick vs Immediate vs Timeout",
                    content: `# Absolute Order\n\nWhat happens if you run these together?\n\n\`\`\`javascript\nsetTimeout(() => console.log('timeout'), 0);\nsetImmediate(() => console.log('immediate'));\nprocess.nextTick(() => console.log('nextTick'));\n\`\`\`\n\n1.  **\`process.nextTick\`**: Runs instantly *before any phase transitions*. It is a priority override that can starve the Event Loop if used recursively.\n2.  **\`setTimeout(0)\` vs \`setImmediate\`**: The order is non-deterministic based on OS lag outside an I/O cycle. BUT inside an \`fs.readFile\` callback (The Poll Phase), \`setImmediate\` is mathematically guaranteed to execute *before* \`setTimeout(0)\` because the Loop flows sequentially from Poll -> Check -> Timers.`
                }
            ]
        },
        {
            id: "phase4",
            title: "Phase 4: Buffers & Raw Memory",
            pages: [
                {
                    id: "binary-allocation",
                    title: "V8 Heap Bypassing",
                    content: `# Handling Binary Data\n\nJavascript Strings are UTF-16 text. If you read a \`.jpg\` file via \`fs.readFile('image.jpg', 'utf8')\`, V8 tries to encode raw pixel hex-codes into text characters, permanently corrupting the image.\n\nYou MUST use **Buffers**. Buffers are raw physical allocations of RAM mathematically bypassing the strict V8 V-DOM Memory Heap. They operate directly on the machine's RAM.`
                },
                {
                    id: "buffer-security",
                    title: "Buffer.alloc vs allocUnsafe",
                    content: `# Memory Leaks\n\n\`\`\`javascript\n// Secure: Asks the OS for 10KB of RAM, and fills it with zeroes instantly.\nconst buf1 = Buffer.alloc(10000); \n\n// Fast but Dangerous: Asks the OS for 10KB, but does NOT clear it.\nconst buf2 = Buffer.allocUnsafe(10000); \n\`\`\`\nIf you use \`allocUnsafe\` and immediately send that Buffer to a user via HTTP, you might accidentally send them the previous memory contents of that RAM stick... which could be another user's password.`
                }
            ]
        },
        {
            id: "phase5",
            title: "Phase 5: Streams Architecture",
            pages: [
                {
                    id: "memory-crashing",
                    title: "The 2GB Limit",
                    content: `# Why fs.readFile is lethal\n\n\`fs.readFile('heavy_movie.mp4')\` physically attempts to load the entire 5 Gigabyte movie directly into Node's RAM simultaneously. Because default V8 instances crash at ~1.5GB of RAM, your entire server will explode with a \`FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed\` message.`
                },
                {
                    id: "piping-streams",
                    title: "Chunking the Data",
                    content: `# The 64KB Pipeline\n\nStreams process data sequentially in microscopic chunks (usually 64KB).\n\n\`\`\`javascript\nimport fs from 'fs';\nimport http from 'http';\n\nhttp.createServer((req, res) => {\n  // Creates a Read Stream from the Hard Drive\n  const readStream = fs.createReadStream('heavy_movie.mp4');\n  \n  // Pipes it directly into the Network socket Write Stream\n  readStream.pipe(res);\n}).listen(3000);\n\`\`\`\nNode.js reads 64KB, flushes it to the user's browser, then clears it from memory, and grabs the next 64KB. This allows a 500MB RAM server to flawlessly serve 100 GB files.`
                }
            ]
        },

        // NETWORKING AT THE METAL (PHASES 6-10)
        {
            id: "phase6",
            title: "Phase 6: Custom Streams & Backpressure",
            pages: [
                {
                    id: "implementing-transform",
                    title: "The Transform Stream",
                    content: `# On-the-fly Data Manipulation\n\nYou can pipe a ReadStream into a Custom Transform Stream to encrypt data mathematically before writing it to a file, without ever holding the full file in memory.\n\n\`\`\`javascript\nimport { Transform } from 'stream';\n\nconst upperCaseStream = new Transform({\n  transform(chunk, encoding, callback) {\n    // We receive the 64KB binary chunk, turn it to string, uppercase it, \n    // and push the binary back into the pipeline.\n    this.push(chunk.toString().toUpperCase());\n    callback();\n  }\n});\n\nfs.createReadStream('file.txt').pipe(upperCaseStream).pipe(res);\n\`\`\``
                },
                {
                    id: "backpressure",
                    title: "Controlling the Valve",
                    content: `# The Fast Reader, Slow Writer Problem\n\nIf \`fs.createReadStream\` pulls data from a fast SSD at 500MB/s, but the user's mobile \`res\` internet connection can only download at 1MB/s, the Node.js RAM will rapidly overflow with the 499MB/s of intermediate 'waiting' data.\n\nWhen you use \`.pipe()\`, Node automatically detects this. The \`Writable\` stream emits a \`drain\` event, mathematically forcing the \`Readable\` stream to pause the Hard Drive until the network catches up. This is **Backpressure**.`
                }
            ]
        },
        {
            id: "phase7",
            title: "Phase 7: Raw TCP Sockets",
            pages: [
                {
                    id: "the-net-module",
                    title: "Bypassing HTTP",
                    content: `# Building your own Redis\n\nExpress is an HTTP framework. HTTP is heavy. It requires analyzing massive headers (\`User-Agent\`, \`Cookies\`). \n\nIf you want to build a hyper-low-latency multiplayer game backend, you ditch HTTP entirely and use Node's native \`net\` module to open a raw TCP socket. There are no headers. Just raw binary frames flying back and forth in 1 millisecond.\n\n\`\`\`javascript\nimport net from 'net';\n\nconst server = net.createServer((socket) => {\n  socket.write('Hello! This is purely raw TCP.');\n  socket.on('data', (data) => console.log(data.toString()));\n});\nserver.listen(8080);\n\`\`\``
                }
            ]
        },
        {
            id: "phase8",
            title: "Phase 8: UDP Datagrams",
            pages: [
                {
                    id: "dgram-module",
                    title: "Fire and Forget",
                    content: `# Building VoIP Applications\n\nTCP guarantees delivery. If you drop a packet, the game freezes until the packet is resent. In a high-speed FPS game or a Skype call, you don't care about a lost frame from 3 seconds ago.\n\nThe \`dgram\` module allows direct transmission of UDP packets. It has zero handshake, zero guaranteed delivery, and blinding speed. You literally hurl binary at an IP address and hope they catch it.`
                }
            ]
        },
        {
            id: "phase9",
            title: "Phase 9: Child Processes",
            pages: [
                {
                    id: "spawn-vs-exec",
                    title: "Spawning Python from Node",
                    content: `# Leveraging the OS\n\nNode is bad at heavy math. What if you need to run an Artificial Intelligence Python script from your Express route?\n\n\`\`\`javascript\nimport { spawn } from 'child_process';\n\napp.post('/ai', (req, res) => {\n  // Spawns a physical separate OS process\n  const pythonTask = spawn('python3', ['script.py']);\n  \n  // Stream data INTO the python script\n  pythonTask.stdin.write(req.body.data);\n  pythonTask.stdin.end();\n  \n  // Stream calculated data OUT of the python script back to the user\n  pythonTask.stdout.pipe(res);\n});\n\`\`\`\nThis completely isolates the CPU-heavy AI algorithm from blocking the Node.js Event Loop.`
                }
            ]
        },
        {
            id: "phase10",
            title: "Phase 10: Cluster Module",
            pages: [
                {
                    id: "multi-core-scaling",
                    title: "Maxing the Output",
                    content: `# Why default Node wastes money\n\nIf you deploy a basic Node.js \`server.js\` to an AWS EC2 instance with 16 CPU cores, Node will only mathematically run on EXACTLY 1 Core. You are renting 15 cores that are sitting at 0% usage.\n\nThe \`cluster\` module allows the Primary Node instance to fork 15 identical Clone instances of itself. All 16 clones bind perfectly to port \`80\`. The OS load-balances incoming HTTP requests flawlessly across all 16 cores natively.`
                }
            ]
        },

        // SYSTEMS & PERFORMANCE (PHASES 11-15)
        {
            id: "phase11",
            title: "Phase 11: Worker Threads",
            pages: [
                {
                    id: "shared-memory",
                    title: "True Multithreading",
                    content: `# Bypassing Cluster Memory Limits\n\nThe \`cluster\` module creates 16 physically isolated V8 engines. They cannot share Javascript variables. \n\n**Worker Threads** (\`worker_threads\`) run *inside* the single Node process. They can physically transfer mathematical objects using \`SharedArrayBuffer\`. Two separate CPU cores can simultaneously execute mathematical operations on the exact same contiguous block of RAM without copying data overhead.`
                }
            ]
        },
        {
            id: "phase12",
            title: "Phase 12: Memory Leak Profiling",
            pages: [
                {
                    id: "heap-snapshots",
                    title: "Finding the Stray Closures",
                    content: `# Inspecting V8 RAM\n\nIf your server RAM usage jumps from 200MB to 1.5GB over 3 days, you have a leak.\n\nYou run Node with the \`--inspect\` flag. You open Google Chrome Inspector, connect to the Node server, and click "Take Heap Snapshot".\n\nIt algorithmically graphs millions of variables. By taking two snapshots 10 minutes apart, Chrome highlights precisely which variables (or lingering Closure Arrays) survived Garbage Collection due to a lingering event listener.`
                }
            ]
        },
        {
            id: "phase13",
            title: "Phase 13: Garbage Collection Tuning",
            pages: [
                {
                    id: "scavenge-vs-mark",
                    title: "The Old and New Space",
                    content: `# V8 Memory Architecture\n\nV8 splits RAM into New Space (Small, frequently cleared) and Old Space (Large, rarely cleared).\n\nIf you create a temporary variable, it dies in the New Space instantly (Minor GC - Scavenge). If a variable survives 2 garbage cycles, it is mathematically migrated to the Old Space. \n\nIf the Old Space fills up, V8 runs a "Major GC (Mark-Sweep)", physically halting the Event Loop for up to 500ms to reorganize RAM. You can tune these thresholds via Node CLI flags: \`--max-old-space-size=4096\`.`
                }
            ]
        },
        {
            id: "phase14",
            title: "Phase 14: C++ Addons (N-API)",
            pages: [
                {
                    id: "node-gyp",
                    title: "Writing native C++ functions",
                    content: `# Absolute Maximum Performance\n\nIf Worker Threads aren't fast enough, you bypass V8 Javascript execution entirely.\n\nUsing \`node-addon-api\` (N-API), you write a strictly-typed C++ program. You compile it to a \`.node\` binary using \`node-gyp\`. You can then strictly \`require('./my_c_math.node')\` directly into your JS file. It executes the C++ machine code at hardware level.`
                }
            ]
        },
        {
            id: "phase15",
            title: "Phase 15: Event Emitter Patterns",
            pages: [
                {
                    id: "custom-emitters",
                    title: "Extending the Brain",
                    content: `# The core of Node Architecture\n\nThe \`EventEmitter\` class is the absolute backbone of Node. Streams, HTTP routes, Sockets—they all inherit from this single class.\n\n\`\`\`javascript\nimport { EventEmitter } from 'events';\n\nclass DataProcessor extends EventEmitter {\n   process(data) {\n      if (!data) this.emit('error', new Error('Fail'));\n      else this.emit('success', data.trim());\n   }\n}\n\`\`\`\nThis pattern allows deeply decoupled architecture. The \`process()\` function never needs to know what happens to the data afterward. It just mathematically emits the signal.`
                }
            ]
        },

        // FRAMEWORKS & THE FUTURE (PHASES 16-20)
        {
            id: "phase16",
            title: "Phase 16: NestJS Architecture",
            pages: [
                {
                    id: "dependency-injection",
                    title: "Enterprise Standardization",
                    content: `# The Express Chaos\n\nExpress has no rules. In a 50-developer team, 10 developers will write Express code 10 different ways.\n\n**NestJS** forces Angular-style architecture onto Node.js. It strictly enforces Dependency Injection (DI) Containers, Controllers decorators, Services injected via Constructors, and explicit Module boundaries. It guarantees enterprise uniformity.`
                }
            ]
        },
        {
            id: "phase17",
            title: "Phase 17: Middleware & Interceptors",
            pages: [
                {
                    id: "nestjs-lifecycle",
                    title: "The Execution Sequence",
                    content: `# Granular Control\n\nIn NestJS, an HTTP request passes through a mathematically rigid gauntlet:\n1.  **Middlewares:** Base logging.\n2.  **Guards:** Explicitly checks JWT Roles.\n3.  **Interceptors:** Can mutate incoming request data BEFORE the controller.\n4.  **Pipes:** Strict mathematical validation (e.g., forcing a String into an Integer).\n5.  **Controller:** The business logic.\n6.  **Interceptors:** Mutate outgoing response before returning to user.`
                }
            ]
        },
        {
            id: "phase18",
            title: "Phase 18: GraphQL with Apollo",
            pages: [
                {
                    id: "overfetching-elimination",
                    title: "The Single Endpoint",
                    content: `# Discarding REST\n\nREST APIs return fixed data. If \`/users\` returns ID, Name, and Biography, and the frontend Mobile App only needs the ID, the Biography bytes are wasted bandwidth.\n\n**GraphQL** uses exactly ONE endpoint: \`POST /graphql\`. The frontend physically sends a string dictating exactly what fields to return:\n\`query { user(id: 1) { id, name } }\`\nThe Node server uses specialized "Resolvers" to mathematically fetch exactly those two data points and nothing more.`
                }
            ]
        },
        {
            id: "phase19",
            title: "Phase 19: Deno & Bun",
            pages: [
                {
                    id: "the-node-killers",
                    title: "Modern Runtimes",
                    content: `# Solving Node's Legacy\n\nNode.js was created in 2009. It relies heavily on CommonJS (\`require\`) and \`node_modules\`.\n\n*   **Deno:** Built by Ryan Dahl (creator of Node.js) in Rust. Enforces absolute security (sandbox by default), native TypeScript, and ditches \`package.json\` entirely for URL imports.\n*   **Bun:** Built in Zig using Apple's incredibly fast JavaScriptCore engine instead of V8. It installs NPM packages 30x faster than Node and acts as a bundler, test runner, and server natively.`
                }
            ]
        },
        {
            id: "phase20",
            title: "Phase 20: The Capstone Backend",
            pages: [
                {
                    id: "custom-tcp-redis",
                    title: "Building a Database",
                    content: `# Proving Your Knowledge\n\nYour final project is not an Express app. You will use the \`net\` module to build a raw TCP server that implements the physical Redis protocol. You will handle byte arrays, manage memory using B-Tree index structures natively, handle simultaneous connection scaling via \`cluster\`, and benchmark it to handle 50,000 transactions per second.`
                }
            ]
        }
    ]
};
