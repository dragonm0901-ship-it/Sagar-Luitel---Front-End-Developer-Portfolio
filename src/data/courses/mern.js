export const mernMastery = {
    id: "mern",
    title: "Fullstack MERN Mastery",
    description: "Build scalable, production-ready backend architectures with MongoDB, Express, and Node.js. Learn JWT Auth and RESTful APIs.",
    image: "/courses/mern.png",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    duration: "55 Chapters",
    level: "Pro",
    modules: [
        {
            id: "phase1",
            title: "Phase 1: Database & API Design",
            pages: [
                {
                    id: "express-routing",
                    title: "Express & RESTful Routing",
                    content: `
# The Express.js Backbone

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

> [!NOTE]
> REST (Representational State Transfer) is an architectural style for providing standards between computer systems on the web. It uses standard HTTP verbs (\`GET\`, \`POST\`, \`PUT\`, \`DELETE\`).

## The Request-Response Cycle
When a user visits a URL or makes an API call, your Express server listens for the request, processes the data, and sends a response.

\`\`\`javascript
const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// A RESTful GET Route
app.get('/api/users', (req, res) => {
    // 1. Fetch from Database (MongoDB)
    const users = [{ name: 'Sagar' }, { name: 'John' }];
    
    // 2. Send Response
    res.status(200).json({ success: true, data: users });
});

app.listen(3000, () => console.log('Server running on port 3000'));
\`\`\`
                    `
                },
                {
                    id: "mongodb-mongoose",
                    title: "MongoDB & Mongoose Schemas",
                    content: `
# NoSQL Document Storage

Unlike traditional SQL databases (PostgreSQL, MySQL) which use strict tables and rows, MongoDB is a NoSQL database that stores data in flexible, JSON-like documents.

To interact with MongoDB cleanly in Node.js, we use an Object Data Modeling (ODM) library called **Mongoose**.

### Creating a Mongoose Schema

Schemas enforce strict validation on your flexible NoSQL documents. If a frontend sends bad data, Mongoose will block it before it touches your database.

\`\`\`javascript
const mongoose = require('mongoose');

// Define the blueprint for a User
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: 3,
        unique: true
    },
    email: {
        type: String,
        required: true,
        match: [/^\\S+@\\S+\\.\\S+$/, 'Please use a valid email']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true }); // Automatically adds createdAt & updatedAt

module.exports = mongoose.model('User', userSchema);
\`\`\`
                    `
                }
            ]
        },
        {
            id: "phase2",
            title: "Phase 2: Authentication & Security",
            pages: [
                {
                    id: "jwt-auth",
                    title: "Stateless JWT Authentication",
                    content: `
# Securing the Perimeter

In modern MERN apps, we use **JSON Web Tokens (JWT)** for stateless authentication.

## The JWT Flow
1. User sends \`email\` and \`password\` to \`/api/login\`.
2. Server verifies the hashed password using \`bcrypt.compare()\`.
3. Server generates a signed JWT string using a hidden secret key.
4. Server sends the JWT back to the client as an \`HttpOnly\` secure cookie.
5. The client includes this cookie on future requests. The server verifies the signature to confirm the user's identity!

\`\`\`javascript
const jwt = require('jsonwebtoken');

// Generating a token payload
const token = jwt.sign(
    { id: user._id, role: user.role }, 
    process.env.JWT_SECRET, 
    { expiresIn: '30d' } // Token expires in 30 days
);
\`\`\`
                    `
                }
            ]
        },
        {
            id: "phase3",
            title: "Phase 3: Deep MongoDB (Aggregation)",
            pages: [
                {
                    id: "aggregation-pipelines",
                    title: "Advanced Aggregation Pipelines",
                    content: `
# Data Analytics at Scale

Querying documents is easy. But what if you need to calculate the *average total revenue* for all products in the "Electronics" category, instantly? 

If you use \`find()\` to pull 10,000 orders into Node.js and run a \`forEach\` loop to calculate the average, your server will freeze and crash. 

You must push the heavy lifting to the Database. This is done via **Aggregation Pipelines**.

## The Analytics Pipeline

\`\`\`javascript
// models/Order.js
Order.aggregate([
  // Stage 1: Filter ONLY for delivered orders
  { $match: { status: 'Delivered' } },
  
  // Stage 2: Group the remaining documents by category, and sum the prices
  { 
    $group: {
      _id: '$productCategory',
      totalRevenue: { $sum: '$price' },
      averageOrderValue: { $avg: '$price' }
    }
  },
  
  // Stage 3: Sort the result array by totalRevenue descending
  { $sort: { totalRevenue: -1 } }
]);
\`\`\`

The query above processes millions of rows in milliseconds, entirely bypassing your Node.js RAM limitations.
                    `
                }
            ]
        },
        {
            id: "phase4",
            title: "Phase 4: Production CI/CD",
            pages: [
                {
                    id: "github-actions",
                    title: "CI/CD with GitHub Actions",
                    content: `
# Shipping to Production

A professional engineer does not drag-and-drop folders into cPanel or FTP. They use **Continuous Integration and Continuous Deployment (CI/CD)**.

With GitHub Actions, every time you \`git push\` to the \`main\` branch, GitHub spins up a temporary Ubuntu server, runs all your Jest tests, builds your React app, and securely pushes the final artifact to your cloud host (like Render, Vercel, or AWS EC2).

## The Workflow File (.github/workflows/deploy.yml)

\`\`\`yaml
name: Node.js CI

on:
  push:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js 18.x
      uses: actions/setup-node@v3
      with:
        node-version: 18.x
    - run: npm ci
    - run: npm run build
    - run: npm test
\`\`\`
                    `
                }
            ]
        },
        {
            id: "project2",
            title: "Capstone: Fullstack E-Commerce",
            pages: [
                {
                    id: "ecommerce-spec",
                    title: "The Ultimate Challenge",
                    content: `
# The MERN Masterpiece

You are going to build a production-ready E-commerce platform.

## Requirements
1. **Admin Pipeline:** Use advanced MongoDB Aggregations to display a chart of "Total Sales Data By Month" in the Admin dashboard.
2. **Authentication:** Implement Passport.js for OAuth 2.0 (Google Login) alongside traditional JWT.
3. **Payments:** Integrate the Stripe Node.js SDK for secure checkout.
4. **DevOps:** Setup a GitHub Action that automatically deploys the backend to Render.com anytime a Pull Request is merged.
                    `
                }
            ]
        }
    ]
};
