export const aiMastery = {
    id: "ai-mastery",
    title: "AI Mastery & Integration",
    description: "Learn Prompt Engineering, RAG semantics, and how to seamlessly integrate advanced LLMs into your web applications using the OpenAI API.",
    image: "/courses/ai_mastery.png",
    tags: ["AI", "LLM", "Prompting", "Integration"],
    duration: "25 Chapters",
    level: "Intermediate",
    modules: [
        {
            id: "phase1",
            title: "Phase 1: The Core Mechanisms (LLMs & Tokens)",
            pages: [
                {
                    id: "what-is-an-llm",
                    title: "What exactly is an LLM?",
                    content: `
# Statistical Autocomplete

A Large Language Model (LLM) is not a massive database of facts. It is a highly advanced, mathematically complex autocomplete engine.

When you ask ChatGPT a question, it doesn't "look up" the answer in a database. It analyzes the previous words in the conversation, calculates probabilities across its massive neural network, and attempts to predict the most likely *next word*.

This is why LLMs suffer from **Hallucinations**. If they don't know the answer with high statistical certainty, they will simply predict a string of words that *sounds* extremely confident, but is factually incorrect.
                    `
                },
                {
                    id: "tokens-and-context",
                    title: "Tokens and Context Windows",
                    content: `
# How AI Reads Text

LLMs do not read words or characters. They read **Tokens**.

A token is approximately 4 characters of common English text. The word "apple" is 1 token. A highly complex scientific word might be split into 3 separate tokens.

## The Context Window

Every time you talk to an LLM via API, it possesses **no memory**. You must send the entire history of the conversation every single time. 

The maximum amount of tokens an LLM can process in a single request (input + output) is its **Context Window**.
- \`gpt-3.5-turbo\` had a 4,000 token window (roughly 3,000 words).
- Modern \`gpt-4-turbo\` boasts a **128,000 token window** (roughly a 300 page book!).

> [!WARNING]
> You pay per token. Shoving a 100,000 token document into every single API call will rapidly bankrupt your project. We solve this problem using RAG (Retrieval-Augmented Generation).
                    `
                }
            ]
        },
        {
            id: "phase2",
            title: "Phase 2: Advanced Prompt Engineering",
            pages: [
                {
                    id: "zero-few-shot",
                    title: "Zero-Shot vs Few-Shot Prompting",
                    content: `
# Communicating with Aliens

Large Language Models (LLMs) are incredibly smart, but they lack the implicit context of your specific problem. "Prompt Engineering" is the science of bridging that context gap.

## Zero-Shot Prompting
You ask the model a question with absolutely no examples or context provided.

> **Prompt:** "Classify the sentiment of this text: 'The food was terrible!'" 
> **Output:** "Negative."

This works well for basic tasks, but fails on complex formatting requests.

## Few-Shot Prompting
You provide the model with a few examples of exactly how you want it to behave. This massively increases reliability, especially when trying to coerce the LLM to output valid JSON.

> **Prompt:** 
> Classify the following reviews into valid JSON.
> 
> Text: "I loved the movie!"
> Output: { "sentiment": "positive", "confidence": 0.99 }
> 
> Text: "It was okay, slightly boring."
> Output: { "sentiment": "neutral", "confidence": 0.65 }
> 
> Text: "The UI was completely broken and frustrating."
> Output:
                    `
                },
                {
                    id: "system-messages",
                    title: "System Instructions and Personas",
                    content: `
# Programming the Brain

When utilizing the Chat Completions API, you don't just send a single prompt. You construct an array of messages.

The most important message is the **System Message**. This defines the core persona, the absolute rules the AI must follow, and the boundaries it cannot cross.

\`\`\`javascript
const messages = [
  {
    role: "system",
    content: "You are a senior PostgreSQL database administrator. You must ONLY answer questions regarding SQL queries. If the user asks about anything else, you must reply: 'I am a SQL bot, I cannot answer that.' You must always format your SQL queries in markdown code blocks."
  },
  {
    role: "user",
    content: "Write a query to find all users older than 30."
  }
];
\`\`\`

> [!TIP]
> Giving the AI a hyper-specific persona ("You are a Senior Security Engineer reviewing code for vulnerabilities") drastically improves the quality and focus of the responses compared to a generic "Please review this code."
                    `
                }
            ]
        },
        {
            id: "phase3",
            title: "Phase 3: RAG & Vector Databases",
            pages: [
                {
                    id: "embeddings",
                    title: "The Math of Meaning (Embeddings)",
                    content: `
# Mapping Semantics to Numbers

How does a computer know that the word "King" is related to "Queen", but unrelated to "Apple"?

**Embeddings** are essentially arrays of floating-point numbers that represent the mathematical "meaning" of a piece of text within high-dimensional space. The OpenAI \`text-embedding-3-small\` model generates arrays with 1,536 dimensions.

If two blocks of text have similar meanings, their numerical arrays will sit very closely together in this 1,536-dimensional coordinate system.
                    `
                },
                {
                    id: "rag-deepdive",
                    title: "Retrieval-Augmented Generation (RAG)",
                    content: `
# The Context Injection Pattern

RAG is how we give AI custom knowledge (like private HR documents) without fine-tuning or bankrupting ourselves on massive token counts.

## The RAG Pipeline
1. **Document Chunking:** Break a 1,000-page manual into 5,000 smaller paragraphs.
2. **Embedding:** Pass those 5,000 chunks through an Embedding API. You now hold 5,000 numeric arrays.
3. **Storage:** Save those arrays into a specialized **Vector Database** (like Pinecone, Weaviate, or pgvector).
4. **User Query:** The user asks a question via your UI. You immediately embed *their question* into an array.
5. **Similarity Search:** Search your Vector DB. Find the 3 database chunks whose numbers sit closest to the question's numbers (Cosine Similarity).
6. **LLM Generation:** Inject those 3 plain-text chunks into the \`gpt-4\` system prompt, instructing it to answer the question using *only* that context.
                    `
                }
            ]
        },
        {
            id: "phase4",
            title: "Phase 4: Function Calling & Tool Use",
            pages: [
                {
                    id: "function-calling",
                    title: "Teaching AI to Act",
                    content: `
# Breaking out of the Chatbox

By default, an LLM only generates text. It cannot search the web, execute code, or press buttons in your UI.

**Function Calling** changes everything. It allows you to describe specific Javascript/TypeScript functions to the AI. If the AI believes it needs to execute your function to answer the prompt, it will output a strictly structured JSON payload instructing *your backend* to execute it.

\`\`\`javascript
// 1. Describe the tool to OpenAI
const tools = [
  {
    type: "function",
    function: {
      name: "get_current_weather",
      description: "Get the current weather in a given location",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "The city and state, e.g. San Francisco, CA",
          }
        },
        required: ["location"],
      },
    }
  }
];

// 2. The AI responds with the JSON arguments! 
// "I need to call get_current_weather with location: 'Boston'."
// 3. Your node backend executes the actual fetch() API call.
// 4. You send the fetched weather data BACK to the AI.
// 5. The AI synthesizes the final text response to the user.
\`\`\`
                    `
                }
            ]
        },
        {
            id: "project1",
            title: "Capstone: Autonomous Agents (LangChain)",
            pages: [
                {
                    id: "agentic-spec",
                    title: "Building an Autonomous Workflow",
                    content: `
# True Artificial Intelligence

Your final capstone is to build a fully autonomous AI Agent using **LangChain**.

An Agent represents the pinnacle of AI interaction. It operates in a continuous loop:
1. **Observation:** What is the goal?
2. **Reasoning:** Which tools do I have access to?
3. **Action:** Execute Tool A. Wait for result.
4. **Observation:** Parse result of Tool A. Did achieving this satisfy my main goal? If not, execute Tool B.

## Requirements
1. **LangChain Setup:** Initialize an AgentExecutor with a generic \`gpt-4o-mini\` model.
2. **Tool Provisioning:** Write two custom tools: \`SerpAPI\` (To Google search the web) and \`Calculator\` (To perform math).
3. **The Loop:** Prompt the agent with a complex problem: *"Who is the current CEO of Microsoft, and what is their age multiplied by 4?"*
4. **Execution:** Watch the Agent autonomously Google the CEO, retrieve their birth date, calculate their age, pipe that number into the Calculator tool, multiply it by 4, and return the final accurate integer to the user—all without human intervention.
                    `
                }
            ]
        }
    ]
};
