export const webFoundations = {
    id: "web-foundations",
    title: "Web Dev Foundations",
    description: "The absolute ground floor. Master Semantic HTML, the CSS Box Model, Flexbox/Grid architectures, modern Browser APIs, and Asynchronous JavaScript.",
    image: "/courses/web_foundations.png",
    tags: ["HTML", "CSS", "JavaScript", "Fundamentals"],
    duration: "45 Chapters",
    level: "Beginner",
    modules: [
        {
            id: "phase1",
            title: "Phase 1: Structure & Semantics",
            pages: [
                {
                    id: "semantic-html",
                    title: "Div Soup and Screen Readers",
                    content: `
# Breaking the <div> Habit

When you first learn HTML, it's tempting to build an entire website using only \`<divs>\` and \`<span>\`. This works visually, but it catastrophically fails accessibility and SEO audits.

A screen reader (software used by visually impaired users) has no idea what a \`<div>\` is. If your navigation menu is built with \`<div>\`, the screen reader can't announce it properly.

## Semantic Tags

Semantic tags tell the browser exactly *what* the content is, not just how it should look.

\`\`\`html
<!-- ❌ BAD: Meaningless structure -->
<div class="header">
  <div class="nav-links">...</div>
</div>
<div class="main-content">
  <div class="blog-post">...</div>
</div>

<!-- ✅ GOOD: Semantic, Accessible, SEO-friendly -->
<header>
  <nav>...</nav>
</header>
<main>
  <article>...</article>
</main>
\`\`\`
                    `
                },
                {
                    id: "forms-accessibility",
                    title: "Accessible Forms",
                    content: `
# Connecting the Dots

A text input without a linked label is a nightmare for accessibility. You must strictly bind your \`<label>\` tags to your \`<input>\` tags using the \`for\` and \`id\` attributes.

\`\`\`html
<form action="/submit">
  <!-- The 'for' attribute strictly ties this label to the 'id' below -->
  <label for="email_input">Email Address</label>
  <input type="email" id="email_input" name="user_email" required />
  
  <button type="submit">Subscribe</button>
</form>
\`\`\`

> [!TIP]
> Always use the correct \`type\` attribute on inputs. \`type="email"\` automatically triggers the "@" keyboard on smartphones!
                    `
                }
            ]
        },
        {
            id: "phase2",
            title: "Phase 2: CSS Architecture",
            pages: [
                {
                    id: "box-model",
                    title: "The Box Model Demystified",
                    content: `
# Everything is a Box

The fundamental rule of CSS: Every single HTML element is drawn as a rectangular box on the screen. The spacing of this box is determined by four layers.

1. **Content:** The actual text or image.
2. **Padding:** Transparent spacing *inside* the border. Pushes content inward.
3. **Border:** The physical wall surrounding the padding.
4. **Margin:** Transparent spacing *outside* the border. Pushes other elements away.

## The Box Sizing Bug
By default, adding padding or borders *increases* the total physical width of an element. This causes massive layout bugs when you set an element to \`width: 100%\` and then add \`padding: 20px\` (it becomes 100% + 40px!).

**The fix every site uses:**
\`\`\`css
* {
    /* Padding and borders carve INTO the width, not ADD to it */
    box-sizing: border-box; 
    margin: 0;
    padding: 0;
}
\`\`\`
                    `
                },
                {
                    id: "flexbox-grid",
                    title: "Flexbox vs CSS Grid",
                    content: `
# Slicing the Page

Before 2015, arranging elements side-by-side required horrifying "float hacks" and "clearfixes". Today, layout is entirely dominated by Flexbox and Grid.

## Flexbox (1-Dimensional)
Use Flexbox when you want to align items in a single row OR a single column (like a Navigation bar).

\`\`\`css
.navbar {
    display: flex;
    flex-direction: row;        /* Row is the default */
    justify-content: space-between; /* Push items apart */
    align-items: center;        /* Vertically center */
}
\`\`\`

## CSS Grid (2-Dimensional)
Use Grid when you need to align items in BOTH rows and columns simultaneously (like a Photo Gallery or a full page layout).

\`\`\`css
.gallery {
    display: grid;
    /* Create 3 equal columns */
    grid-template-columns: repeat(3, 1fr); 
    /* Automatic 16px spacing between all items */
    gap: 16px; 
}
\`\`\`
                    `
                }
            ]
        },
        {
            id: "phase3",
            title: "Phase 3: Asynchronous JavaScript",
            pages: [
                {
                    id: "promises",
                    title: "Promises & The Fetch API",
                    content: `
# Time Travel in Code

JavaScript is single-threaded. If it hits a line of code that takes 5 seconds to finish (like downloading an image), the entire browser freezes. 

To solve this, we use **Asynchronous** code. We send the long task to the background, and tell JavaScript to keep running the rest of the file. When the background task finishes, it returns a "Promise".

## The Fetch API
\`\`\`javascript
console.log("1. Requesting data...");

// Fetch runs in the background. It instantly returns a pending "Promise"
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => {
      // It takes time to parse JSON, so this also returns a Promise!
      return response.json(); 
  })
  .then(data => {
      console.log("3. Data received!", data);
  })
  .catch(error => {
      console.error("The network request failed:", error);
  });

console.log("2. This logs BEFORE the data arrives!");
\`\`\`
                    `
                },
                {
                    id: "async-await",
                    title: "Async / Await Syntax",
                    content: `
# Flattening the Pyramid of Doom

Chaining \`.then()\` blocks can get messy quickly. In ES8, JavaScript introduced \`async / await\`. It allows you to write asynchronous, non-blocking code that *looks* synchronous and easy to read.

\`\`\`javascript
// You must declare the function as 'async'
async function fetchUsers() {
    try {
        // 'await' literally pauses this specific function indefinitely 
        // until the Promise resolves, then assigns the value!
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        console.log("Users:", data);
        
    } catch (error) {
        console.error("Something went wrong:", error);
    }
}

fetchUsers();
\`\`\`
                    `
                }
            ]
        },
        {
            id: "phase4",
            title: "Phase 4: Modern Browser APIs",
            pages: [
                {
                    id: "intersection-observer",
                    title: "The Intersection Observer",
                    content: `
# Scroll Animations (Without the Lag)

Historically, to make an element "fade in" when it scrolled into view, developers would attach an Event Listener to the ` + "`" + `window.onscroll` + "`" + ` event. This executed code 60 times a second, grinding the user's phone to a halt.

**The Intersection Observer API** solves this natively. It tells you exactly when a specific DOM element enters or exits the viewport, asynchronously.

## Fade-in on Scroll

\`\`\`javascript
// 1. Create the observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add a CSS class that triggers a CSS animation
            entry.target.classList.add('fade-in');
            
            // Stop observing it once it's visible (Optional)
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 }); // Fire when 50% of the element is visible

// 2. Target your elements
const cards = document.querySelectorAll('.card');
cards.forEach(card => observer.observe(card));
\`\`\`
                    `
                },
                {
                    id: "web-storage",
                    title: "Local & Session Storage",
                    content: `
# Remembering the User

If a user switches your app to "Dark Mode", and then refreshes the page, you don't want it snapping back to Light Mode. You need to persist small amounts of state on their hard drive.

## LocalStorage vs SessionStorage
1. **LocalStorage:** Persists indefinitely. Closing the browser window or rebooting the computer does not erase it. You must clear it manually via code or browser settings.
2. **SessionStorage:** Persists only as long as the specific browser tab remains open.

\`\`\`javascript
// 1. Saving a string
localStorage.setItem('theme', 'dark');

// 2. Retrieving a string
const currentTheme = localStorage.getItem('theme'); // "dark"

// 3. Deleting a specific item
localStorage.removeItem('theme');

// 4. Nuking the entire storage
localStorage.clear();
\`\`\`

> [!WARNING]
> Web Storage can **only store strings**. You cannot save objects or arrays directly. You must use \`JSON.stringify()\` to save them, and \`JSON.parse()\` to read them.
                    `
                }
            ]
        },
        {
            id: "project1",
            title: "Project: Weather Dashboard",
            pages: [
                {
                    id: "weather-spec",
                    title: "Milestone: API Weather App",
                    content: `
# Tying it all together

You will build a dynamic, responsive Weather Dashboard that fetches live data from an external API.

## Requirements
1. **Semantic HTML:** The layout must use proper \`<header>\`, \`<main>\`, and \`<section>\` tags.
2. **CSS Grid Layout:** Create a sleek, glassmorphic layout using CSS Grid that correctly stacks into a single column on mobile devices.
3. **Async JavaScript:** Use \`async/await\` to query the OpenWeatherMap REST API, parsing the JSON data specifically for the user's inputted city.
4. **Browser APIs:** Utilize \`LocalStorage\` to save the user's previous 5 search queries, rendering them immediately when the user refreshes the page. Implement the \`IntersectionObserver\` to smoothly fade-in the 5-day forecast cards as you scroll down the page.
                    `
                }
            ]
        }
    ]
};
