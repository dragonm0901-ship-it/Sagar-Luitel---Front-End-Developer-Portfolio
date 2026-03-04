export const nodeArchitectures = {
    id: "node-js",
    title: "Node.js Microservices Architectures",
    description: "Scale from a monolith to distributed microservices. Master the event loop, Dockerization, WebSockets, and PM2 clustering.",
    image: "/courses/node.png",
    tags: ["Node.js", "Redis", "Docker", "Architecture"],
    duration: "45 Chapters",
    level: "Pro",
    modules: [
        {
            id: "phase1",
            title: "Phase 1: High Performance Node",
            pages: [
                {
                    id: "event-loop",
                    title: "Demystifying the Event Loop",
                    content: `
# Single-Threaded but Concurrent

A common misconception is that Node.js is "fast" because it magically spins up threads for every request like Java or PHP. This is false. Node.js operates on a **single main thread**. 

So how does it handle 10,000 concurrent requests without crashing? The **Event Loop** and **libuv**.

## The Execution Phases
When Node starts, it initializes the event loop, processes the provided input script, and then enters the event loop.

1. **Timers:** Executes callbacks scheduled by \`setTimeout()\` and \`setInterval()\`.
2. **Pending Callbacks:** Executes I/O callbacks deferred to the next loop iteration.
3. **Poll:** Retrieve new I/O events; execute I/O related callbacks.
4. **Check:** \`setImmediate()\` callbacks are invoked here.

> [!WARNING]
> Never block the Event Loop! If you write a massive \`while\` loop or execute synchronous file reading (\`fs.readFileSync\`) inside a request handler, you are blocking *every single other user* from getting a response until that loop finishes.
                    `
                },
                {
                    id: "streams-buffers",
                    title: "Streams and Buffers",
                    content: `
# Handling Massive Data

Imagine trying to read a 5GB video file into memory using \`fs.readFile\`. Your Node.js server (which defaults to around 1.5GB of RAM) will instantly crash with a \`Heap out of memory\` error.

**Streams** are collections of data — just like arrays or strings. The difference is that streams might not be available all at once, and they don't have to fit in memory. 

## Piping Data

The most powerful feature of streams is the ability to pipe a readable stream directly into a writable stream. 

\`\`\`javascript
const fs = require('fs');
const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
    // DO THIS (STREAMS DATA IN CHUNKS):
    const src = fs.createReadStream('./big-video.mp4');
    src.pipe(res);
});

server.listen(8000);
\`\`\`
                    `
                }
            ]
        },
        {
            id: "phase2",
            title: "Phase 2: Bidirectional WebSockets",
            pages: [
                {
                    id: "websockets-socketio",
                    title: "Real-time Events (Socket.io)",
                    content: `
# Beyond the Request/Response Cycle

Traditional HTTP is a one-way street: The client asks for data, the server responds, and the connection closes. 

If you are building a chat app, stock ticker, or multiplayer game, the server needs the ability to push data *down* to the client the instant it happens. This requires a persistent TCP connection via **WebSockets**.

## Rooms and Namespaces

Socket.io makes WebSockets simple. It also introduces \`Rooms\`. A user can join a specific room (e.g., "TradingDeskA" or "GuildChat"), and you can broadcast messages exclusively to that room without spamming the entire server.

\`\`\`javascript
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // 1. User asks to join a specific chat room
    socket.on('joinRoom', (roomID) => {
        socket.join(roomID);
        console.log(\`User \${socket.id} joined \${roomID}\`);
    });

    // 2. User sends a message to that room
    socket.on('sendMessage', (data) => {
        const { roomID, message } = data;
        
        // 3. Broadcast the message to everyone ELSE in that specific room
        socket.to(roomID).emit('receiveMessage', message);
    });
});
\`\`\`
                    `
                }
            ]
        },
        {
            id: "phase3",
            title: "Phase 3: Microservices & Docker",
            pages: [
                {
                    id: "dockerizing-node",
                    title: "Dockerizing Node.js",
                    content: `
# Immutable Containers

Docker solves the classic "it works on my machine" problem by packaging your Node application, its dependencies, and the underlying OS (like Alpine Linux) into a single, immutable **Container**.

## Writing a Dockerfile

\`\`\`dockerfile
# 1. Start from a lightweight Linux OS with Node installed
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /usr/src/app

# 3. Copy package.json BEFORE the massive node_modules/ source files
# This drastically speeds up subsequent builds due to Docker layer caching!
COPY package*.json ./

# 4. Install dependencies (Production only)
RUN npm ci --only=production

# 5. Copy the rest of the application code
COPY . .

# 6. Expose the port & start
EXPOSE 8080
CMD ["node", "server.js"]
\`\`\`
                    `
                },
                {
                    id: "redis-caching",
                    title: "Extreme Speed: Redis Caching",
                    content: `
# Bypassing the Database

Hitting MongoDB for complex aggregate queries on every single request is the fastest way to bring down a production server.

**Redis** is an in-memory data structure store. Because it reads from RAM instead of a physical hard drive, it is exponentially faster than a traditional database.

## The Cache-Aside Pattern
1. The server receives a request for \`/api/feed\`.
2. The server checks Redis: *Do we have a cached version of this feed?*
3. If **Yes** (Cache Hit): Instantly return the Redis data.
4. If **No** (Cache Miss): Run the slow MongoDB query, store the result in Redis with an Expiration Time (TTL), then return the data.

\`\`\`javascript
const redis = require('redis');
const client = redis.createClient({ url: 'redis://localhost:6379' });

app.get('/api/photos', async (req, res) => {
    const cacheKey = 'photos_feed';
    
    // 1. Cache Hit
    const cache = await client.get(cacheKey);
    if (cache) return res.json(JSON.parse(cache));
    
    // 2. Cache Miss
    const photos = await DB.query('SELECT * FROM photos');
    
    // 3. Save to Redis for 1 Hour
    await client.setEx(cacheKey, 3600, JSON.stringify(photos));
    res.json(photos);
});
\`\`\`
                    `
                }
            ]
        },
        {
            id: "project",
            title: "Capstone: Distributed Chat Cluster",
            pages: [
                {
                    id: "gateway-spec",
                    title: "The Final Challenge",
                    content: `
# Distributed Architecture

You will break apart a large monolith into distinct Microservices and route traffic using an API Gateway, while maintaining Real-time WebSocket connectivity.

## Project Scope
1. **API Gateway:** The single point of entry for your front-end (Port 8000). The frontend *only* talks to the Gateway.
2. **Auth Service:** Implements Passport.js and OAuth 2.0 (Google Login).
3. **Chat Service:** A microservice running Socket.io.
4. **Redis Adapter:** Implement the \`@socket.io/redis-adapter\`. If you scale your Chat Service to 4 CPU cores using PM2, a user on Core 1 normally cannot chat with a user on Core 2. Redis acts as a centralized Publish/Subscribe hub, ensuring the WebSockets can talk across the cluster barrier!
                    `
                }
            ]
        }
    ]
};
