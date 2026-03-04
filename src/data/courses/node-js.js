export const nodeJs = {
    id: "node-js",
    title: "Node.js Architectures: The 20-Phase Epic",
    description: "Master the V8 engine API. Learn how to serve a million users concurrently using the Event Loop, Streams, Redis caching, and Docker orchestration.",
    image: "/courses/node.png",
    tags: ["Node.js", "Backend", "Performance", "Docker", "Redis"],
    duration: "100 Chapters (Architect Level)",
    level: "Advanced",
    modules: [
        // THE ENGINE (PHASES 1-5)
        {
            id: "phase1",
            title: "Phase 1: Chrome's V8 Engine",
            pages: [
                { id: "cplusplus-bindings", title: "Javascript is an Illusion", content: "# The C++ Reality\n\nJavascript cannot talk to a computer's hard drive or network card. `fs.readFile()` is not Javascript. It is a C++ binding. When you call it, Node's V8 engine translates your JS into C++ to execute the actual physical hardware operation." }
            ]
        },
        {
            id: "phase2",
            title: "Phase 2: The Libuv Thread Pool",
            pages: [
                { id: "background-threads", title: "Escaping the Single Thread", content: "# The Secret Workers\n\nNode.js is famously 'Single Threaded' for your Javascript code. But the underlying C++ library (`Libuv`) maintains a pool of 4 background threads by default. When you request a heavy file read, Node kicks it to the Libuv threads, instantly freeing the main thread to serve the next user." }
            ]
        },
        {
            id: "phase3",
            title: "Phase 3: The Event Loop Phases",
            pages: [
                { id: "timers-poll-check", title: "Timers, Poll, and Check", content: "# The Infinite Carousel\n\nThe Event Loop spins in strictly defined phases. \n1. **Timers:** Executes `setTimeout` callbacks.\n2. **Poll:** Retrieves new incoming HTTP requests and I/O callbacks.\n3. **Check:** Executes `setImmediate` callbacks.\nUnderstanding this order determines exactly when your code runs under massive server load." }
            ]
        },
        {
            id: "phase4",
            title: "Phase 4: Garbage Collection",
            pages: [
                { id: "mark-and-sweep", title: "The Mark and Sweep Algorithm", content: "# Finding Memory Leaks\n\nJavascript automatically frees RAM. Periodically, the V8 engine stops the world and 'Marks' all objects currently accessible from the global root. Everything unmarked is 'Swept' (deleted). If you accidentally leave objects inside unexpected global Arrays, they are Marked as alive forever, causing a fatal Memory Leak." }
            ]
        },
        {
            id: "phase5",
            title: "Phase 5: Worker Threads",
            pages: [
                { id: "cpu-bound", title: "Solving the CPU Problem", content: "# Don't Block the Loop\n\nIf you need to process a massive 4K Video file or perform complex AI math, you cannot use the main Event Loop (it will freeze the entire server). You must use the `worker_threads` module to spin up a completely independent V8 Engine on a different CPU core, passing data via `postMessage()`." }
            ]
        },

        // MEMORY AND I/O (PHASES 6-10)
        {
            id: "phase6",
            title: "Phase 6: Buffers",
            pages: [
                { id: "raw-binary", title: "0s and 1s", content: "# Native Binary Data\n\nJavascript was historically terrible at handling raw binary (it was built for Strings). V8 introduced `Buffer`, a class representing a fixed-length sequence of bytes in RAM. This allows Node to natively handle TCP streams, Image files, and Zipped archives without coercing them into memory-crashing Strings." }
            ]
        },
        {
            id: "phase7",
            title: "Phase 7: Readable & Writable Streams",
            pages: [
                { id: "data-chunks", title: "The Netflix Architecture", content: "# Bypassing the RAM limit\n\nYou have a 10GB video and 512MB of server RAM. You cannot `fs.readFile()` it (instant crash). Streams allow you to read a tiny 64kb Buffer chunk, pipe it to the user's browser (Writable Stream), and immediately discard it from RAM. You stream 10GB using almost zero memory." }
            ]
        },
        {
            id: "phase8",
            title: "Phase 8: Transform Streams",
            pages: [
                { id: "stream-mutation", title: "Zlib Compression on the fly", content: "# Modifying the Pipeline\n\nA Transform Stream sits between the Readable (File) and Writable (Network) stream. You can `pipe()` the file through a `zlib.createGzip()` transform stream, shrinking the 10GB video into a 2GB zip file IN TRANSIT, without ever saving the zip file to the hard drive." }
            ]
        },
        {
            id: "phase9",
            title: "Phase 9: Backpressure",
            pages: [
                { id: "water-pipe", title: "When the client is too slow", content: "# The Bursting Pipe\n\nIf your SSD can read data at 500MB/s, but the user is on a 3G mobile network (1MB/s), your Node server will buffer 499MB every second into RAM until it crashes. This is Backpressure. `pipe()` automatically handles this by pausing the Read stream whenever the Write stream is overwhelmed." }
            ]
        },
        {
            id: "phase10",
            title: "Phase 10: Event Emitters",
            pages: [
                { id: "pub-sub-node", title: "The core of Node architecture", content: "# Everything is an Event\n\nThe built-in `EventEmitter` class is the backbone of Node. Almost every core module (HTTP, Streams, File System) inherits from it. It allows completely decoupled architecture: `server.on('request', callback)`." }
            ]
        },

        // NETWORKING (PHASES 11-15)
        {
            id: "phase11",
            title: "Phase 11: TCP vs UDP",
            pages: [
                { id: "layer-4", title: "The Transport Layer", content: "# Beyond HTTP\n\nHTTP is just text formatting sitting on top of TCP. In Node, you can bypass HTTP entirely and use the `net` module to create raw TCP sockets for blazing-fast custom gaming protocols, or `dgram` for UDP packets (where speed is prioritized over guaranteed delivery)." }
            ]
        },
        {
            id: "phase12",
            title: "Phase 12: gRPC",
            pages: [
                { id: "protocol-buffers", title: "Microservice Communication", content: "# Moving past JSON\n\nWhen Microservice A talks to Microservice B 10,000 times a second, parsing JSON strings is a massive CPU bottleneck. gRPC uses Protocol Buffers. It compiles the payload down to raw binary before sending it over HTTP/2, resulting in a 10x speed increase over standard REST APIs." }
            ]
        },
        {
            id: "phase13",
            title: "Phase 13: WebSockets & socket.io",
            pages: [
                { id: "real-time-bidi", title: "Persistent Connections", content: "# Chat Apps and Trading\n\nHTTP requires the Client to initiate every request. WebSockets keep a permanent TCP connection open, allowing the Node server to forcefully push price updates down to 50,000 connected React clients simultaneously. `socket.io` provides fallback polling and automatic reconnections." }
            ]
        },
        {
            id: "phase14",
            title: "Phase 14: GraphQL",
            pages: [
                { id: "overfetching-fix", title: "The Client dictates the data", content: "# The REST Killer (Sometimes)\n\nIn REST, a `/user` endpoint might return 300 fields. If the Mobile UI only needs the `avatar` field, it wastes massive data downloading the other 299 fields (Over-fetching). GraphQL allows the client to send a Query requesting exactly `avatar` and nothing else, aggregating entirely different DB tables in one hit." }
            ]
        },
        {
            id: "phase15",
            title: "Phase 15: Security (Helmet & CORS)",
            pages: [
                { id: "http-headers", title: "Patching the defaults", content: "# Information Leakage\n\nBy default, Express advertises `X-Powered-By: Express`. Hackers use this to identify target vulnerabilities. The `Helmet` middleware securely patches 12 different HTTP headers instantly. Also, mastering CORS (Cross-Origin Resource Sharing) prevents unauthorized domains from `fetch()`-ing your API directly." }
            ]
        },

        // SCALING & PRODUCTION (PHASES 16-20)
        {
            id: "phase16",
            title: "Phase 16: The Cluster Module",
            pages: [
                { id: "multi-core", title: "Utilizing 16-Core CPUs", content: "# Wasting 15 Cores\n\nIf you deploy a single Node.js app to an AWS EC2 instance with 16 CPU cores, your app will use exactly 1 core. The other 15 sit idle at 0%. The `cluster` module forks your Node process 16 times, sharing the same Port 80, instantly giving you a 1600% traffic capacity boost." }
            ]
        },
        {
            id: "phase17",
            title: "Phase 17: PM2 Orchestration",
            pages: [
                { id: "process-manager", title: "Auto-restarts and Profiling", content: "# The Production Requirement\n\nIf your bare Node app suffers an Uncaught Exception, it crashes and never comes back online. PM2 runs your app as a daemon, auto-restarts it on failure, handles the Cluster load balancing, and provides a real-time terminal dashboard of your CPU/RAM metrics." }
            ]
        },
        {
            id: "phase18",
            title: "Phase 18: Redis Cache-Aside",
            pages: [
                { id: "in-memory-db", title: "Bypassing the Hard Drive", content: "# Surviving 100k Concurrent Users\n\nMongoDB is an SSD database (slow). Redis is an In-Memory RAM database (blazing fast). Before querying Mongo, ask Redis `client.get('home_data')`. If it exists (Cache Hit), return it instantly. If not (Miss), query Mongo, and save `client.setex('home_data', 300, data)` so the next 10,000 users get the fast response." }
            ]
        },
        {
            id: "phase19",
            title: "Phase 19: Message Queues (RabbitMQ)",
            pages: [
                { id: "decoupling-tasks", title: "Asynchronous Workers", content: "# Background Processing\n\nIf a user uploads a video, you cannot wait 5 minutes to compress it while they stare at a spinning loader. The API must instantly return 'Video Uploaded!'. Behind the scenes, the API pushes a `compress_video` job onto a RabbitMQ queue, and a separate Fleet of background worker servers slowly process the queue." }
            ]
        },
        {
            id: "phase20",
            title: "Phase 20: Serverless Architectures",
            pages: [
                { id: "aws-lambda", title: "Cold Starts vs Infinite Scale", content: "# The End of Servers\n\nAWS Lambda spins up a brand new micro-server the exact millisecond a user hits your endpoint, runs your function, and destroys the server 2 seconds later. You pay $0 when traffic is zero, and it scales infinitely when you get featured on Hacker News. (The tradeoff: The 'Cold Start' boot time delay)." }
            ]
        }
    ]
};
