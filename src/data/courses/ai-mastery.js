export const aiMastery = {
    id: "ai-mastery",
    title: "AI Mastery: The Beginner's Heaven",
    description: "From absolute zero to building autonomous AI Agents. Learn how LLMs actually work, master Prompt Engineering, and integrate the OpenAI API into real applications.",
    image: "/courses/ai_mastery.png",
    tags: ["AI", "LLM", "Prompting", "Integration", "Beginner Friendly"],
    duration: "45 Chapters (Zero to Hero)",
    level: "All Levels",
    modules: [
        {
            id: "phase1",
            title: "Phase 1: AI Intuition (The Gentle Start)",
            pages: [
                {
                    id: "what-is-an-llm",
                    title: "What exactly is an LLM?",
                    content: `
# Autocomplete on Steroids

When you talk to ChatGPT, it feels like you're talking to a sentient database. You ask it for the capital of France, and it "knows" the answer is Paris. 

This is a massive illusion. 

A Large Language Model (LLM) is not a database of facts. It is a highly advanced, mathematically complex **autocomplete engine**.

## The Prediction Game
When you type: *"The quick brown fox jumps over the lazy..."*

Your phone's autocomplete suggests the word *"dog"*. It doesn't know what a dog is; it just knows that statistically, "dog" usually follows those words.

An LLM does the exact same thing, but its statistical brain was trained on the *entire internet*. It analyzes the previous words in the conversation, calculates probabilities across billions of parameters, and attempts to predict the most likely *next word*.

By predicting the next word perfectly, millions of times in a row, it *appears* to think.
                    `
                },
                {
                    id: "hallucinations",
                    title: "The Hallucination Problem",
                    content: `
# Why AI Lies Confidently

Because an LLM is a prediction engine—not a search engine—it suffers from a catastrophic flaw called **Hallucination**.

If you ask an LLM: *"What did Abraham Lincoln say about the iPhone 15?"*

Instead of saying "I don't know", the math engine will aggressively try to predict the most likely string of words based on those two concepts. It might confidently output: *"Abraham Lincoln was deeply impressed by the titanium chassis of the iPhone 15."*

> [!WARNING]  
> If an LLM doesn't know the answer with high statistical certainty, it will invent an answer that *sounds* extremely plausible. You must never trust an LLM blindly for factual accuracy without verifying.
                    `
                },
                {
                    id: "tokens",
                    title: "Tokens vs Words",
                    content: `
# How AI Reads Text

LLMs do not read letters (\`A, B, C\`) or words (\`Apple\`). They read **Tokens**.

A token is a chunk of characters. In English, 1 token is approximately 4 characters. 
- The word "apple" = 1 token. 
- A complex word like "unprecedented" might be split into 3 separate tokens: \`un\`, \`preced\`, \`ented\`.

## The Context Window

Every time you talk to an LLM via API, it possesses **zero memory**. You must send the *entire history* of the conversation every single time you hit enter. 

The maximum amount of tokens an LLM can process in a single request (input + output) is its **Context Window**.
- \`gpt-3.5-turbo\` had a 4,000 token window (roughly 3,000 words).
- Modern \`gpt-4o\` boasts a **128,000 token window** (roughly a 300-page book!).

If you send a prompt larger than the Context Window, the API will instantly crash and throw an error.
                    `
                }
            ]
        },
        {
            id: "phase2",
            title: "Phase 2: The Art of Prompt Engineering",
            pages: [
                {
                    id: "perfect-prompt",
                    title: "The Anatomy of a Perfect Prompt",
                    content: `
# Speaking Their Language

"Prompt Engineering" is the science of bridging the context gap between your human brain and the AI's math engine.

A weak prompt yields weak, generic results. 

## The 4 Pillars of a Strong Prompt

1. **Context:** Who are they? What is the background situation?
2. **Task:** What exactly do you want them to do?
3. **Constraints:** What are the rules they cannot break?
4. **Format:** Exactly how should the final output look?

### Example of a Weak Prompt:
*"Write a blog post about healthy eating."*
(Result: A boring, generic, Wikipedia-style essay).

### Example of a Perfect Prompt:
*"[Context] You are a quirky nutritionist writing for a Gen-Z audience on Instagram. [Task] Write a short caption about the benefits of eating avocados. [Constraints] Keep it under 50 words. Do not use the word 'superfood'. [Format] Return it as a bulleted list with exactly 3 emojis."*
                    `
                },
                {
                    id: "few-shot",
                    title: "Zero-Shot vs Few-Shot",
                    content: `
# Leading by Example

## Zero-Shot Prompting
You ask the model a question with absolutely no examples or context provided.

> **Prompt:** "Classify the sentiment of this text: 'The food was terrible!'" 
> **Output:** "Negative."

This works well for basic tasks, but fails on complex formatting requests.

## Few-Shot Prompting
You provide the model with 2 or 3 examples of exactly how you want it to behave. This massively increases reliability, especially when trying to coerce the LLM to output valid JSON for your code to parse.

> **Prompt:** 
> Classify the following reviews into valid JSON.
> 
> *Example 1:*
> Text: "I loved the movie!"
> Output: { "sentiment": "positive", "confidence": 0.99 }
> 
> *Example 2:*
> Text: "It was okay, slightly boring."
> Output: { "sentiment": "neutral", "confidence": 0.65 }
> 
> *Task:*
> Text: "The UI was completely broken and frustrating."
> Output:
                    `
                },
                {
                    id: "chain-of-thought",
                    title: "Chain of Thought (CoT)",
                    content: `
# Forcing the AI to Think

LLMs are notoriously bad at basic math or deep logic puzzles. Because they just predict the next word, if they try to blurt out the final answer immediately, they often guess wrong.

**Chain of Thought (CoT) Prompting** forces the AI to break the problem down into steps. By writing out its logic *first*, the LLM is reading its own recent output to predict the final accurate answer!

## The Magic Phrase
The easiest way to trigger CoT is to simply add this phrase to the very end of your prompt:

> **"Let's think step by step."**

## Example
**Prompt:** "A farmer has 15 cows, all but 8 die. How many are left? Let's think step by step."

**Output:** 
"Step 1: The prompt states there are 15 cows initially.
Step 2: The trick phrase is 'all but 8 die'.
Step 3: This means 8 cows did NOT die.
Therefore, exactly 8 cows are left."
                    `
                }
            ]
        },
        {
            id: "phase3",
            title: "Phase 3: The Developer Toolkit (OpenAI SDK)",
            pages: [
                {
                    id: "openai-node",
                    title: "Node.js and the OpenAI API",
                    content: `
# Hooking into the Matrix

To build an AI-powered app, you need to call the AI models from your backend servers. 

> [!CAUTION]  
> Never expose your exact \`OPENAI_API_KEY\` in your React frontend code! Anyone can inspect the browser, steal your key, and rack up a $10,000 bill on your credit card. Always make the OpenAI call from a secure Node.js backend.

## The Chat Completions Endpoint

\`\`\`javascript
const OpenAI = require('openai');

// Initialize the client. It looks for process.env.OPENAI_API_KEY
const openai = new OpenAI(); 

app.post('/api/chat', async (req, res) => {
    try {
        const { userMessage } = req.body;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                // The SYSTEM message defines the core persona
                { role: "system", content: "You are a highly sarcastic pirate." },
                // The USER message is the actual question
                { role: "user", content: userMessage }
            ],
            // Temperature 0.0 = analytical/robotic
            // Temperature 1.0 = highly creative/chaotic
            temperature: 0.8, 
        });

        const reply = completion.choices[0].message.content;
        res.status(200).json({ reply });
        
    } catch (error) {
        res.status(500).json({ error: "API Failed" });
    }
});
\`\`\`
                    `
                },
                {
                    id: "streaming",
                    title: "Streaming Responses (The Typing Effect)",
                    content: `
# Instant Gratification

When you execute a standard \`.create()\` call, you must wait for the absolute final word to be generated before the API sends the string back to you. If the AI is writing a 2,000-word essay, your user will stare at a loading spinner for 15 seconds.

**Streaming** fixes this. It sends the words back to your frontend in real-time, exactly like the ChatGPT interface.

\`\`\`javascript
app.get('/api/stream', async (req, res) => {
    // 1. Tell the browser we are keeping the connection open!
    res.setHeader('Content-Type', 'text/event-stream');
    
    // 2. Set stream: true in the OpenAI config
    const stream = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: 'Write a long poem' }],
        stream: true, 
    });

    // 3. Loop through the chunks as they arrive from OpenAI!
    for await (const chunk of stream) {
        // We write each word to the active response line by line
        const word = chunk.choices[0]?.delta?.content || '';
        res.write(word);
    }
    
    // 4. Close the connection when the poem is finished
    res.end();
});
\`\`\`
                    `
                }
            ]
        },
        {
            id: "phase4",
            title: "Phase 4: Data Engineering (RAG & Embeddings)",
            pages: [
                {
                    id: "embeddings",
                    title: "The Math of Meaning (Embeddings)",
                    content: `
# Mapping Semantics to Numbers

How does a computer know that the word "King" is related to "Queen", but unrelated to "Apple"?

**Embeddings** are essentially arrays of floating-point numbers that represent the mathematical "meaning" of a piece of text within high-dimensional space. 

The OpenAI \`text-embedding-3-small\` model takes paragraphs of English and generates arrays with 1,536 dimensions.

If two blocks of text have similar meanings, their numerical arrays will sit very closely together in this 1,536-dimensional coordinate system.
                    `
                },
                {
                    id: "rag-deepdive",
                    title: "Retrieval-Augmented Generation (RAG)",
                    content: `
# The Context Injection Pattern

RAG is how we give AI custom knowledge (like private HR documents) without fine-tuning models or blowing out the token limit.

## The RAG Pipeline
1. **Document Chunking:** Break a massive 1,000-page manual into 5,000 smaller paragraphs.
2. **Embedding:** Pass those 5,000 chunks through an Embedding API. You now hold 5,000 numeric arrays.
3. **Storage:** Save those arrays into a specialized **Vector Database** (like Pinecone, Weaviate, or pgvector).
4. **User Query:** The user asks a question via your UI. You immediately embed *their question* into an array.
5. **Similarity Search:** Search your Vector DB. Find the 3 database chunks whose numbers sit mathematically closest to the question's numbers (Cosine Similarity).
6. **LLM Generation:** Inject those 3 plain-text chunks into the \`gpt-4\` system prompt, instructing it to summarize the answer using *only* that injected context.
                    `
                }
            ]
        },
        {
            id: "phase5",
            title: "Phase 5: Autonomous Tools & Agents",
            pages: [
                {
                    id: "function-calling",
                    title: "Teaching AI to Act (Function Calling)",
                    content: `
# Breaking out of the Chatbox

By default, an LLM only generates text. It cannot search the web, execute code, or press buttons in your UI.

**Function Calling** changes everything. It allows you to describe specific Javascript/TypeScript functions to the AI. If the AI believes it needs to execute your function to answer the prompt, it will pause the text generation, and instead output a strictly structured JSON payload instructing *your backend* to execute it.

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
          location: { type: "string" }
        },
        required: ["location"],
      },
    }
  }
];

// 2. The user asks: "Should I wear a jacket in Boston today?"
// 3. The AI responds with the JSON arguments! 
//    -> { "name": "get_current_weather", "arguments": { "location": "Boston" } }
// 4. Your node backend executes the actual fetch() API call.
// 5. You send the fetched weather data (42 degrees) BACK to the AI.
// 6. The AI synthesizes the final text response: "Yes, you need a jacket, it is 42 degrees in Boston."
\`\`\`
                    `
                },
                {
                    id: "agentic-spec",
                    title: "Capstone: Autonomous Agents (LangChain)",
                    content: `
# True Artificial Intelligence

Your final capstone is to build a fully autonomous AI Agent using **LangChain**.

An Agent represents the pinnacle of AI interaction. It operates in a continuous loop:
1. **Observation:** What is the goal?
2. **Reasoning:** Which tools do I have access to?
3. **Action:** Execute Tool A. Wait for result.
4. **Observation:** Parse result of Tool A. Did achieving this satisfy my main goal? If not, execute Tool B.

## Requirements
1. **LangChain Setup:** Initialize an AgentExecutor with a generic \`gpt-4o\` model.
2. **Tool Provisioning:** Write two custom tools: \`SerpAPI\` (To Google search the web) and \`Calculator\` (To perform math).
3. **The Loop:** Prompt the agent with a complex problem: *"Who is the current CEO of Microsoft, and what is their age multiplied by 4?"*
4. **Execution:** Watch the Agent autonomously Google the CEO, retrieve their birth date, calculate their age, pipe that number into the Calculator tool, multiply it by 4, and return the final accurate integer to the user—all without human intervention.
                    `
                }
            ]
        }
    ]
};
