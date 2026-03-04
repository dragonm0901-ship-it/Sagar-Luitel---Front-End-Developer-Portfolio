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
                { id: "nouns-not-verbs", title: "Resource Representation", content: "# The RPC Antipattern\n\nBeginners design APIs like `/getUsers` or `/createNewItem`. This is Remote Procedure Calling (RPC). REST dictates that URLs must be Nouns (Resources) like `/users`. The HTTP Verbs (`GET`, `POST`, `DELETE`) dictate the action upon that resource." }
            ]
        },
        {
            id: "phase2",
            title: "Phase 2: Idempotency",
            pages: [
                { id: "safe-retry", title: "The Double-Tap Problem", content: "# What if the network drops?\n\nIf a user clicks \"Pay Now\" and their WiFi drops instantly, their browser might retry the `POST /charge` request. If your API is not Idempotent, you just charged their credit card twice. A `PUT` request must be safely repeatable 1,000 times with exactly the same end result." }
            ]
        },
        {
            id: "phase3",
            title: "Phase 3: Rate Limiting & DDoS",
            pages: [
                { id: "leaky-bucket", title: "Protecting the Core", content: "# The Leaky Bucket Algorithm\n\nIf a hacker writes a Python script hitting your `/login` route 50,000 times a second, your Node server will run out of memory and crash instantly. You MUST implement Rate Limiting (usually via Redis) to freeze IP addresses that exceed 100 requests per minute." }
            ]
        },
        {
            id: "phase4",
            title: "Phase 4: Data Pagination",
            pages: [
                { id: "cursor-pagination", title: "Cursor vs Offset", content: "# The Offset Penalty\n\n`db.users.skip(100000).limit(10)` requires the database to physically read through 100,000 rows just to find the next 10. For massive datasets, you must use Cursor Pagination: `db.users.find({ _id: { $gt: lastId } }).limit(10)`, which utilizes the indexed B-Tree for an instant O(1) lookup." }
            ]
        },
        {
            id: "phase5",
            title: "Phase 5: HATEOAS",
            pages: [
                { id: "api-discoverability", title: "The Highest Level of REST", content: "# Self-Documenting APIs\n\nThe Richardson Maturity Model defines HATEOAS as the peak of REST. When a client requests a User, your API doesn't just return the data; it returns `_links` containing the URLs to every possible action the client is currently allowed to take on that User." }
            ]
        },

        // ADVANCED DATABASES (PHASES 6-10)
        {
            id: "phase6",
            title: "Phase 6: The NoSQL Illusion",
            pages: [
                { id: "schema-validation", title: "Why Mongoose Exists", content: "# The Danger of Schemaless\n\nMongoDB allows you to insert a String on Monday and an Array on Tuesday. This is a nightmare for data integrity. You must enforce Strict Schemas utilizing Mongoose at the application layer, ensuring regex validation and type safety before hitting the disk." }
            ]
        },
        {
            id: "phase7",
            title: "Phase 7: B-Tree Indexing",
            pages: [
                { id: "coll-scan", title: "Defeating the COLLSCAN", content: "# Reading the whole book\n\nIf you query `db.users.find({ email: 'x@x.com' })` and `email` is not indexed, Mongo physically loads every single document from the hard drive to check it (Collection Scan). An Index builds a fast, hierarchical binary tree, reducing a 10-second lookup to 2 milliseconds." }
            ]
        },
        {
            id: "phase8",
            title: "Phase 8: Aggregation Pipelines",
            pages: [
                { id: "db-math", title: "Database Compute", content: "# Never Pull and Filter\n\nIf you need the average age of 1 Million users, pulling 1 Million rows into Node's RAM to run `.reduce()` will crash the server. You MUST use `$group` and `$match` pipelines to perform the heavy math directly inside MongoDB, returning only the final integer to Node." }
            ]
        },
        {
            id: "phase9",
            title: "Phase 9: Race Conditions",
            pages: [
                { id: "atomic-increments", title: "The Double Booking Error", content: "# Two requests, one ticket\n\nIf you read `tickets=1` into Node RAM, subtract 1, then save `0` back to the DB, two users clicking \"Buy\" at the exact same millisecond will both succeed, selling an imaginary ticket. You must use `$inc: -1` to perform the entire math operation Atomically on the database disk." }
            ]
        },
        {
            id: "phase10",
            title: "Phase 10: Replica Sets & Sharding",
            pages: [
                { id: "horizontal-scale", title: "Scaling the DB", content: "# Replicas vs Shards\n\nA Replica Set copies your entire DB to 3 different servers. If the primary crashes, a secondary instantly takes over (High Availability). Sharding splits your 10-Terabyte database into 5 different 2-Terabyte databases based on a Shard Key (Horizontal Scaling)." }
            ]
        },

        // ENTERPRISE SECURITY (PHASES 11-15)
        {
            id: "phase11",
            title: "Phase 11: Cross-Site Scripting (XSS)",
            pages: [
                { id: "dangerously-set", title: "Injecting Malicious Scripts", content: "# The LocalStorage Trap\n\nIf you allow users to post raw HTML comments, a hacker can post `<script>` tags that steal `localStorage.getItem('token')`. Never store JWTs in LocalStorage, and never use `dangerouslySetInnerHTML` in React without a sanitization library like DOMPurify." }
            ]
        },
        {
            id: "phase12",
            title: "Phase 12: HttpOnly Cookies",
            pages: [
                { id: "xss-defense", title: "The Invisible Token", content: "# Defeating XSS\n\nThe only secure place for an Auth Token is a Cookie with the `HttpOnly` flag. The browser automatically attaches this cookie to every network request, but it is physically impossible for Javascript (and therefore XSS hackers) to read it." }
            ]
        },
        {
            id: "phase13",
            title: "Phase 13: CSRF Attacks",
            pages: [
                { id: "forgery", title: "Cross-Site Request Forgery", content: "# The Dark Side of Cookies\n\nBecause the browser auto-attaches cookies, a hacker can build an evil website with a hidden form pointing to `<form action='yourbank.com/transfer'>`. If the user is logged into their bank in another tab, the browser attaches the cookie, executing a forged transfer." }
            ]
        },
        {
            id: "phase14",
            title: "Phase 14: SQL/NoSQL Injections",
            pages: [
                { id: "nosql-inject", title: "Bypassing the Login", content: "# The $gt exploit\n\nIf your login code is `db.users.find({ username: req.body.username, password: req.body.password })`, a hacker can send JSON with `password: { \"$gt\": \"\" }`. Because every password is 'greater than' an empty string, MongoDB happily logs them in without knowing the password." }
            ]
        },
        {
            id: "phase15",
            title: "Phase 15: Token Rotation",
            pages: [
                { id: "refresh-tokens", title: "Access vs Refresh", content: "# Handling Compromised Tokens\n\nJWTs cannot be revoked without checking a database every request (which defeats the purpose of stateless JWTs). The solution is a short-lived Access Token (15 mins) and a long-lived Refresh Token (7 days). If an Access token is stolen, the hacker loses access in 15 minutes." }
            ]
        },

        // DISTRIBUTED ARCHITECTURE (PHASES 16-20)
        {
            id: "phase16",
            title: "Phase 16: The Monolith",
            pages: [
                { id: "monolith-scaling", title: "When to split?", content: "# Don't start with Microservices\n\nA beautifully decoupled Modular Monolith is infinitely better than a chaotic \"Distributed Monolith\" (where 50 microservices depend on each other linearly). Only split a Monolith when distinct engineering teams need independent deployment cycles." }
            ]
        },
        {
            id: "phase17",
            title: "Phase 17: Microservices",
            pages: [
                { id: "service-boundaries", title: "Domain Driven Design", content: "# The Bounded Context\n\nMicroservices must own their data. An \"Order Service\" cannot connect directly to the \"User Service\" MongoDB database. Services must communicate through strict API contracts or events, allowing them to use entirely different database technologies (Mongo vs Postgres vs Redis)." }
            ]
        },
        {
            id: "phase18",
            title: "Phase 18: API Gateways",
            pages: [
                { id: "reverse-proxy", title: "Nginx & GraphQL", content: "# The Front Door\n\nInstead of a React app memorizing 50 different microservice URLs, it hits exactly 1 URL (`api.yourcompany.com`). The API Gateway (often Nginx or AWS API Gateway) reads the URL path and invisibly routes (Reverse Proxies) the traffic to the correct internal server." }
            ]
        },
        {
            id: "phase19",
            title: "Phase 19: Event-Driven Architecture",
            pages: [
                { id: "pub-sub", title: "Kafka & RabbitMQ", content: "# Asynchronous Coupling\n\nIf the Billing Service calls the Email Service synchronously to send a receipt, and the Email Service is down, Billing fails. In Event-Driven systems, Billing simply publishes a `payment.success` event to a Message Broker (RabbitMQ) and forgets about it. The Email service consumes it whenever it comes back online." }
            ]
        },
        {
            id: "phase20",
            title: "Phase 20: CQRS Pattern",
            pages: [
                { id: "read-write-split", title: "Command Query Responsibility Segregation", content: "# Optimizing for Traffic\n\nMost apps have 100x more Reads than Writes. CQRS splits the app into two completely separate systems: The Command side (heavy validation, writing to a relational DB) and the Query side (a completely denormalized, blazing fast NoSQL view model updated via event streams)." }
            ]
        },

        // DEVOPS & INFRASTRUCTURE (PHASES 21-25)
        {
            id: "phase21",
            title: "Phase 21: Containerization",
            pages: [
                { id: "docker-intro", title: "Why Docker?", content: "# 'It works on my machine'\n\nDocker solves environment mismatches. Instead of installing Node, Mongo, and Redis manually on a Linux Server, you write a `Dockerfile`. The entire app, its OS, and its dependencies are packaged into an immutable 'Image' that runs exactly the same anywhere." }
            ]
        },
        {
            id: "phase22",
            title: "Phase 22: Docker Compose",
            pages: [
                { id: "multi-container", title: "Orchestrating the Local Stack", content: "# Spinning up the architecture\n\nA `docker-compose.yml` file allows you to define 5 different microservices, a Redis cache, and a Mongo database. Simply running `docker compose up` spins up the entire enterprise ecosystem perfectly networked together on your local machine." }
            ]
        },
        {
            id: "phase23",
            title: "Phase 23: CI/CD Pipelines",
            pages: [
                { id: "github-actions", title: "Continuous Integration", content: "# The Automated Robot\n\nWhen a developer opens a Pull Request, a GitHub Action spins up a headless Linux server, installs your dependencies, run the test suite (Jest), builds the Docker image, and blocks the merge if anything fails. Humans should never manually test code." }
            ]
        },
        {
            id: "phase24",
            title: "Phase 24: Blue-Green Deployments",
            pages: [
                { id: "zero-downtime", title: "Never take the site offline", content: "# The Router Flip\n\nIn Blue-Green, you have two full production environments. Blue is serving live traffic. You deploy your new V2 code to Green. You run tests on Green safely. If all pass, you instantly swap the API Gateway Router to point to Green. Zero downtime deployment." }
            ]
        },
        {
            id: "phase25",
            title: "Phase 25: Kubernetes (K8s)",
            pages: [
                { id: "k8s-orchestration", title: "The Self-Healing Cluster", content: "# The Final Boss\n\nKubernetes is an orchestration engine for Docker. You tell it: 'I want exactly 5 replicas of the User Service running'. If one server physically explodes/crashes, K8s detects the failure and instantly spins up a replacement container on a healthy node to maintain the perfect state." }
            ]
        }
    ]
};
