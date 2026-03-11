export const htmlCss = {
    id: "html-css",
    title: "HTML & CSS Full Course: Beginner to Pro",
    description: "Master HTML & CSS from scratch. Build a complete website clone.",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&w=800&q=80",
    tags: ["HTML", "CSS", "Frontend"],
    duration: "Comprehensive",
    level: "All Levels",
    modules: [
        {
            id: "chapter1",
            title: "Chapter 1: Getting Started with HTML",
            pages: [
                {
                    id: "lesson-1-1",
                    title: "Welcome to the Course",
                    content: "# Welcome to the Course\n\nWelcome to the complete HTML and CSS course. In this course, we are going to learn how to build websites from a beginner to a professional level. By the end of this journey, we are going to build a clone of YouTube.com. You don't need any previous coding or technical experience; this is designed to be your first step to becoming a software engineer."
                },
                {
                    id: "lesson-1-2",
                    title: "Setting Up Your Tools",
                    content: "# Setting Up Your Tools\n\nBefore we begin, we need two pieces of software:\n1. A Web Browser: This lets us view websites on the internet and view the websites we create. We will be using Google Chrome.\n2. A Code Editor: This helps us write our HTML and CSS code efficiently. The most popular code editor for web development is Visual Studio Code (VS Code).\nAction Step: Go to google.com, search for Google Chrome and VS Code, and install them on your computer."
                },
                {
                    id: "lesson-1-3",
                    title: "What is HTML?",
                    content: "# What is HTML?\n\nHTML stands for Hypertext Markup Language. You don't have to worry about the exact definition right now. Just know that it is a tool we use to create websites. Every website, from YouTube to Amazon, uses a combination of HTML and CSS.\nThe easiest way to understand HTML is that we are simply giving instructions to a computer. We are telling the computer what to do step-by-step, and the computer follows those instructions to create our website."
                },
                {
                    id: "lesson-1-4",
                    title: "Your First HTML File",
                    content: "# Your First HTML File\n\nLet's jump in.\n1. Create a new folder on your computer named HTML-CSS-course.\n2. Open VS Code, click File > Open, and select the folder you just created.\n3. Click the \"New File\" icon and name your file website.html.\nNote: The file must end with .html. This tells the computer that this file contains HTML code, not just plain text.\nInside website.html, type your first instruction:\n```html\n<button>hello</button>\n\n```\n\n\nTo view this, go to your folder on your computer, right-click website.html, and select Open with > Google Chrome. You will see a physical button on a white page with the word \"hello\" inside it. The computer followed your exact instruction!\nLet's add another instruction on a new line:\n```html\n<p>paragraph of text</p>\n\n```\n\n\nSave your file, go to Chrome, and click Refresh. You will now see your text beneath the button. The computer reads HTML from top to bottom. If you put the <p> code above the <button> code, the paragraph will appear on top."
                },
                {
                    id: "lesson-1-5",
                    title: "HTML Terminology and Syntax",
                    content: "# HTML Terminology and Syntax\n\n* Elements: Each of the things we display on the page (a button, a paragraph) is called an HTML Element.\n* Syntax: Syntax represents the rules for how a coding language should be written. It is like grammar in English. However, if you have bad English grammar, people can still understand you. If you break HTML syntax, the computer will not understand you.\nThe Anatomy of an HTML Tag: Elements consist of tags.\n* Opening Tag: <button> (Tells the computer what we are starting to create).\n* Content: hello (The text inside).\n* Closing Tag: </button> (The exact same as the opening tag, but with a forward slash / in front of the name to tell the computer the element has ended).\nExperiment: If you delete the closing > on your opening button tag and refresh your browser, your button will disappear. You broke the rules of syntax!"
                },
                {
                    id: "lesson-1-6",
                    title: "Links and Attributes",
                    content: "# Links and Attributes\n\nLet's learn a new element: the Anchor element (<a>), which creates a link to another website.\n```html\n<a>Link to YouTube</a>\n\n\nIf you save and click this on your webpage, nothing happens. It is a link without a destination. We must add an Attribute.\nAttributes modify how an element behaves. To add a destination, we use the href attribute inside the opening tag, separated by a space:\n\n```\n\n```html\n<a href=\"https://www.youtube.com/\">Link to YouTube</a>\n\n```\n\n\n* Attribute Name: href (Tells the computer what we are modifying).\n* Attribute Value: \"https://www.youtube.com/\" (Tells the computer what we are modifying it to. It must be inside double quotes).\nLet's add a second attribute, separated by a space, to make the link open in a new tab:\n```html\n<a href=\"https://www.youtube.com/\" target=\"_blank\">Link to YouTube</a>\n\n```"
                },
                {
                    id: "lesson-1-7",
                    title: "The Quirks of HTML Spacing",
                    content: "# The Quirks of HTML Spacing\n\nIn HTML, extra spaces and new lines are ignored by the browser. If you type: <button>hello</button> <a>Link</a> The browser will display them with only one space between them.\nThis quirk is actually helpful! It means we can use new lines and spaces (indentation) to cleanly organize our code without messing up how the website looks. In HTML and CSS, the standard is to use 2 spaces per indent. (You can change this in VS Code by clicking \"Indent using spaces\" in the bottom right toolbar and changing it from 4 to 2)."
                },
                {
                    id: "knowledge-check-chapter1",
                    title: "Knowledge Check",
                    content: "# Module Assessment\n\nTest your understanding of the chapter with these interactive concept checks.\n\n```qna\nQ: What is the primary role of HTML?\nH: Bones of the web.\nA: HTML provides the foundational structure and raw content of a webpage, before any styling or logic is applied.\n```\n\n```qna\nQ: What is a Void Element?\nH: No closing required.\nA: An element like <img> or <input> that does not wrap text content and therefore does not require a closing tag.\n```\n\n```qna\nQ: Why is it important to use semantic tags like <nav> instead of generic <div> tags?\nH: Robots and accessibility.\nA: Semantic tags provide implicit meaning to search engines and screen readers, drastically improving SEO and accessibility.\n```"
                },
            ]
        },
        {
            id: "chapter2",
            title: "Chapter 2: Styling Basics with CSS",
            pages: [
                {
                    id: "lesson-2-1",
                    title: "What is CSS?",
                    content: "# What is CSS?\n\nCSS stands for Cascading Style Sheets. While HTML creates the elements, CSS changes their appearance.\nCreate a new file called buttons.html. Let's create a standard HTML button:\n```html\n<button>SUBSCRIBE</button>\n\n```\n\n\nTo write CSS, we must create a special HTML element called the <style> element. This element doesn't visibly appear on the page; its sole purpose is to hold our CSS instructions.\n```html\n<style>\n  button {\n    background-color: red;\n    color: white;\n    border: none;\n  }\n</style>\n\n```"
                },
                {
                    id: "lesson-2-2",
                    title: "CSS Syntax Rules",
                    content: "# CSS Syntax Rules\n\nLet's break down the CSS code above:\n* Selector (button): Tells the computer which HTML elements on the page we are targeting. Here, we are targeting all <button> elements.\n* Curly Braces { }: Contain the styling rules.\n* Property (background-color): Tells the computer what feature we are changing.\n* Value (red): Tells the computer what we are changing it to.\n* Punctuation: Properties and values are separated by a colon (:). Every CSS instruction must end with a semicolon (;), just like ending an English sentence with a period."
                },
                {
                    id: "lesson-2-3",
                    title: "Sizing and Trial & Error",
                    content: "# Sizing and Trial & Error\n\nLet's make our button look like the official YouTube subscribe button.\n```css\n height: 36px;\n  width: 105px;\n\n```\n\n\nPixels (px) are the standard unit of measurement in the digital world. You don't need to inherently know exactly how big 36px is. CSS involves a lot of trial and error. You try 50px, see it's too big, shrink it to 30px, see it's too small, and settle on 36px."
                },
                {
                    id: "lesson-2-4",
                    title: "RGB Colors and Border Radius",
                    content: "# RGB Colors and Border Radius\n\n\"Red\" is not a precise color. To match YouTube perfectly, we use RGB (Red, Green, Blue) values. Every digital color is a mix of Red, Green, and Blue, with values ranging from 0 to 255.\n* rgb(255, 255, 255) is pure white.\n* rgb(0, 0, 0) is pure black.\n* rgb(200, 0, 0) is a specific shade of red. (In VS Code, hover over the color to bring up a color picker!)\nLet's finish the YouTube button by rounding the corners and changing our mouse to a pointer hand when we hover over it:\n```css\n border-radius: 2px;\n  cursor: pointer;\n\n```"
                },
                {
                    id: "lesson-2-5",
                    title: "The Class Attribute (Labeling Elements)",
                    content: "# The Class Attribute (Labeling Elements)\n\nWhat if we add a second button for \"JOIN\"?\n```html\n<button>JOIN</button>\n\n```\n\n\nBecause our CSS selector is button, both buttons turn red! To style them differently, we must label them using the class attribute.\n```html\n<button class=\"subscribe-button\">SUBSCRIBE</button>\n<button class=\"join-button\">JOIN</button>\n\n```\n\n\nNow, in our CSS, instead of typing button, we type a period (.) followed by the class name to target only elements with that specific label:\n```css\n.subscribe-button {\n  background-color: rgb(200, 0, 0);\n  /* other styles... */\n}\n\n\n.join-button {\n  background-color: white;\n  border-color: rgb(41, 98, 255);\n  border-style: solid;\n  border-width: 1px;\n  color: rgb(41, 98, 255);\n  /* ... */\n}\n\n```\n\n\nBy creating elements in HTML and carefully targeting them with CSS classes, we can perfectly recreate the visual style of any famous website.\nHere is the continuation of your comprehensive manual, picking up right where we left off."
                },
                {
                    id: "knowledge-check-chapter2",
                    title: "Knowledge Check",
                    content: "# Module Assessment\n\nTest your understanding of the chapter with these interactive concept checks.\n\n```qna\nQ: What is the core takeaway regarding styling here?\nH: Separation of concerns.\nA: Always ensure your styling rules do not conflict and rely on class specificity rather than !important.\n```\n\n```qna\nQ: How do you verify your layout across devices?\nH: DevTools.\nA: Use your browser's responsive design mode to test breakpoints and inspect element boxes.\n```\n\n```qna\nQ: What should you focus on when debugging CSS?\nH: The Box Model.\nA: Always check the computed dimensions of Padding, Border, and Margin inside DevTools.\n```"
                },
            ]
        },
        {
            id: "chapter3",
            title: "Chapter 3: Intermediate CSS",
            pages: [
                {
                    id: "lesson-3-1",
                    title: "Pseudo-Classes: :hover and :active",
                    content: "# Pseudo-Classes: :hover and :active\n\nFor most buttons you see on the internet, their style changes slightly when you hover over them with a mouse—some get darker, some get lighter. To recreate this, we need to learn about pseudo-classes, which add extra styles in specific situations.\nLet's go back to our .subscribe-button class from Chapter 2. We can create a new block of CSS right below it using the :hover pseudo-class:\n```css\n.subscribe-button:hover {\n  background-color: green;\n}\n\n\nIf we are not hovering, the base styles apply (the button is red). If we are hovering, the computer applies the base styles plus the :hover styles, turning the button green.\nAnother useful pseudo-class is :active, which activates only while you are actively clicking down on the element:\n\n```\n\n```css\n.subscribe-button:active {\n  background-color: blue;\n}\n\n```"
                },
                {
                    id: "lesson-3-2",
                    title: "Opacity",
                    content: "# Opacity\n\nInstead of changing the background color to green, professional websites often just make the button slightly faded when hovered. We achieve this with the opacity property.\nOpacity tells the computer how \"see-through\" an element is. It takes a value between 0 and 1:\n* 1 is completely solid (the default).\n* 0.8 is slightly see-through.\n* 0 is completely invisible.\nLet's update our hover and active states to use opacity:\n```css\n.subscribe-button:hover {\n  opacity: 0.8;\n}\n\n\n.subscribe-button:active {\n  opacity: 0.5;\n}\n\n```\n\n\nNow, hovering makes the button slightly lighter, and clicking makes it even lighter!"
                },
                {
                    id: "lesson-3-3",
                    title: "Transitions",
                    content: "# Transitions\n\nIf you look at modern websites, hover effects do not happen instantly; they fade in smoothly. We can achieve this using the transition property.\nThe transition property requires two values:\n1. What we want to transition (e.g., opacity).\n2. How long the transition should take (e.g., 0.15s for 0.15 seconds).\nCrucial Rule: You must put the transition property in the base CSS block, not the :hover block. If you put it in the hover block, the transition only works when your mouse goes on the button, but it will snap back instantly when your mouse leaves.\n```css\n.subscribe-button {\n  background-color: rgb(200, 0, 0);\n  color: white;\n  border: none;\n  border-radius: 2px;\n  cursor: pointer;\n  transition: opacity 0.15s; /* Smoothly transitions the opacity */\n}\n\n```\n\n\nYou can transition multiple properties at once by separating them with a comma. For our .join-button, we might want to invert the background and text colors when hovered:\n```css\n.join-button {\n  /* ...base styles... */\n  transition: background-color 0.15s, color 0.15s;\n}\n\n```"
                },
                {
                    id: "lesson-3-4",
                    title: "Box Shadows and RGBA",
                    content: "# Box Shadows and RGBA\n\nLet's add a realistic drop shadow to a button. The box-shadow property takes four distinct values:\n1. Horizontal Position: How far right the shadow moves (e.g., 5px).\n2. Vertical Position: How far down the shadow moves (e.g., 5px).\n3. Blur: How fuzzy the shadow looks (e.g., 10px).\n4. Color: The color of the shadow.\nTo make a shadow look natural, it needs to be very faint. Pure black is too harsh. We will use a new color measurement called RGBA. It works exactly like RGB, but the 'A' stands for \"Alpha\"—which is simply the opacity of that specific color!\n```css\n.tweet-button {\n  /* ...base styles... */\n  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);\n}\n\n```\n\n\nThis creates a shadow pushed 5px right, 5px down, with a 10px blur, using pure black (0, 0, 0) that is incredibly faint (0.15 opacity)."
                },
                {
                    id: "knowledge-check-chapter3",
                    title: "Knowledge Check",
                    content: "# Module Assessment\n\nTest your understanding of the chapter with these interactive concept checks.\n\n```qna\nQ: What is the core takeaway regarding styling here?\nH: Separation of concerns.\nA: Always ensure your styling rules do not conflict and rely on class specificity rather than !important.\n```\n\n```qna\nQ: How do you verify your layout across devices?\nH: DevTools.\nA: Use your browser's responsive design mode to test breakpoints and inspect element boxes.\n```\n\n```qna\nQ: What should you focus on when debugging CSS?\nH: The Box Model.\nA: Always check the computed dimensions of Padding, Border, and Margin inside DevTools.\n```"
                },
            ]
        },
        {
            id: "chapter4",
            title: "Chapter 4: The CSS Box Model",
            pages: [
                {
                    id: "lesson-4-1",
                    title: "Chrome DevTools and Hex Colors",
                    content: "# Chrome DevTools and Hex Colors\n\nBefore learning the Box Model, we need to learn how to steal exact styles from professional websites. Open any website in Google Chrome, right-click an empty area, and click Inspect. This opens the Chrome DevTools.\n1. Click the small \"Pointer/Arrow\" icon in the top left of the DevTools window.\n2. Hover over any element on the website (like a button) and click it.\n3. Look at the \"Computed\" tab in the DevTools menu.\nThis reveals every final CSS style applied to that element! You might notice background colors written like #FF0000. This is a Hex Code, which is just another way to write RGB values. You can copy these hex codes directly into your CSS or use a Google \"Hex to RGB converter\" to keep your code consistent."
                },
                {
                    id: "lesson-4-2",
                    title: "Introducing the Box Model",
                    content: "# Introducing the Box Model\n\nEvery single element in HTML is treated as a rectangular box. The CSS Box Model dictates how much physical space an element takes up on the page. It consists of four layers:\n1. Content: The actual text or image (the innermost core).\n2. Padding: The empty space inside the element, between the content and the border.\n3. Border: The physical line wrapping around the padding and content.\n4. Margin: The invisible empty space outside the element, separating it from other elements."
                },
                {
                    id: "lesson-4-3",
                    title: "The Problem with Fixed Widths",
                    content: "# The Problem with Fixed Widths\n\nIn Chapter 2, we forced our button to be exactly 36px tall and 105px wide. This is actually a bad practice!\nExperiment: If you change the text inside your HTML from <button>JOIN</button> to <button>JOIN MY CHANNEL</button>, the text will overflow right out of the physical button boundaries because you rigidly locked the width."
                },
                {
                    id: "lesson-4-4",
                    title: "Fixing Overflow with Padding",
                    content: "# Fixing Overflow with Padding\n\nBy default, a button automatically adjusts its size based on the text inside it. Instead of forcing a rigid height and width, we should add Padding to organically pad the inside of the button.\nDelete height and width from your CSS, and replace them with this:\n```css\n.subscribe-button {\n  padding-top: 10px;\n  padding-bottom: 10px;\n  padding-left: 16px;\n  padding-right: 16px;\n}\n\n```\n\n\nNow, if you change the text to \"SUBSCRIBE TO MY CHANNEL\", the button will organically grow to fit the text while maintaining that perfect 16px of breathing room on the sides!"
                },
                {
                    id: "lesson-4-5",
                    title: "Margins and Vertical Alignment",
                    content: "# Margins and Vertical Alignment\n\nTo push two buttons apart, we add space to the outside using margin:\n```css\n.subscribe-button {\n  margin-right: 8px; /* Adds 8px of invisible space to the right */\n}\n\n```\n\n\nThe Vertical Alignment Quirk: When you put buttons next to each other, you might notice one sits slightly lower than the other. Browsers historically align elements based on their text baseline. To force buttons to perfectly align at their physical top edges, add this to their CSS:\n```css\n vertical-align: top;\n\n```\n\n\nThe Border Math Quirk: If your .join-button has a 1px solid border, but your .subscribe-button has no border, the Join button will actually be 2px taller overall (1px top border + 1px bottom border). To make them identical heights, you must reduce the padding on the bordered button by exactly 1px:\n```css\n.join-button {\n  padding-top: 9px; /* Reduced from 10px to account for the 1px border */\n  padding-bottom: 9px;\n  /* ... */\n}\n\n```\n\n\nHere is the next installment of your course manual. We are now moving into formatting text like a professional and setting up the invisible structure that powers every modern website."
                },
                {
                    id: "knowledge-check-chapter4",
                    title: "Knowledge Check",
                    content: "# Module Assessment\n\nTest your understanding of the chapter with these interactive concept checks.\n\n```qna\nQ: What are the four layers of the CSS Box Model?\nH: From inside to outside.\nA: Content, Padding, Border, and Margin.\n```\n\n```qna\nQ: What is the difference between Padding and Margin?\nH: Inside vs Outside.\nA: Padding is the internal breathing room between the content and the border. Margin is the external pushing force between elements.\n```\n\n```qna\nQ: Why do borders sometimes break layout widths, and how do we fix it?\nH: box-sizing.\nA: By default, borders add to the total width. We fix this by applying 'box-sizing: border-box;' to force padding and borders inward.\n```"
                },
            ]
        },
        {
            id: "chapter5",
            title: "Chapter 5: Text Styling and Specificity",
            pages: [
                {
                    id: "lesson-5-1",
                    title: "Basic Text Properties",
                    content: "# Basic Text Properties\n\nFor most of the course so far, we have worked with buttons. Now, let's learn how to style text using the paragraph element (<p>). By default, web browsers display text in a font called Times New Roman. We can change this and much more using CSS.\nFont Family: Changes the typeface.\n```css\n.video-title {\n  font-family: Arial;\n}\n* * Font Size: Changes how large the text is (e.g., font-size: 18px;).\n* Font Weight: Changes the thickness. font-weight: bold; makes text bold.\n* Font Style: Changes the slant. font-style: italic; makes text italicized.\n* Text Align: Centers text or aligns it to the left/right (e.g., text-align: center;).\n\n```"
                },
                {
                    id: "lesson-5-2",
                    title: "Line Height and Text Wrapping",
                    content: "# Line Height and Text Wrapping\n\nIf you have a long title, it will normally stretch all the way across the page. If you want the text to wrap around to a second line, you must set a rigid width on the paragraph:\n```css\n.video-title {\n  width: 300px;\n}\n\n```\n\n\nOnce your text drops to a second line, you might notice the lines feel too close together. You can adjust the vertical breathing room between lines of text using the line-height property (e.g., line-height: 24px;)."
                },
                {
                    id: "lesson-5-3",
                    title: "HTML Entities",
                    content: "# HTML Entities\n\nSometimes you need to type special characters, like a middle dot (·), a checkmark (✓), or a greater-than symbol (>). If you just type a > symbol in your HTML, the browser might confuse it with a closing tag and break your code.\nTo safely display these, we use HTML Entities—special codes that the browser translates into symbols.\n* Middle Dot: &#183;\n* Checkmark: &#10003;\nAction Step: Whenever you need a special symbol, just search Google for \"HTML entity [symbol name]\" and paste the code into your text."
                },
                {
                    id: "lesson-5-4",
                    title: "The Default Margin Trap",
                    content: "# The Default Margin Trap\n\nIf you put two <p> elements on top of each other, you will notice a large gap between them, even if you haven't written any CSS margin rules.\nWhy? Paragraph elements come with invisible default margins baked into the browser. To gain total control over your design, you must first reset these defaults to zero, and then apply your own precise spacing:\n```css\n.video-stats {\n  margin-top: 0;\n  margin-bottom: 20px; /* Setting our exact desired spacing */\n}\n\n```"
                },
                {
                    id: "lesson-5-5",
                    title: "Inline Text Elements (<span>)",
                    content: "# Inline Text Elements (<span>)\n\nWhat if you want to make just one single word inside a paragraph red, or underline a specific phrase when hovered? You cannot target the whole <p> element. You must wrap the specific word in a Text Element.\nText elements exist inside a line of text without breaking it onto a new line.\n* <strong>: Automatically makes the wrapped text bold.\n* <u>: Automatically underlines the wrapped text.\n* <span>: The most powerful text element. It comes with zero default styles. It is a blank canvas that you can label with a class and style perfectly in your CSS.\n```html\n<p>Shop early for the <span class=\"shop-link\">best selection</span></p>\n\n\n\n```\n\n```css\n.shop-link:hover {\n  text-decoration: underline;\n  cursor: pointer;\n}\n\n```"
                },
                {
                    id: "lesson-5-6",
                    title: "CSS Specificity (The Priority Rule)",
                    content: "# CSS Specificity (The Priority Rule)\n\nImagine you have two CSS rules fighting each other:\n1. A rule targeting all paragraphs (p { font-family: Arial; })\n2. A rule targeting a specific class (.video-title { font-family: Roboto; })\nWhich one wins? The browser uses a priority system called Specificity. A class selector (like .video-title) is considered more specific than a broad element selector (like p). Therefore, the class rule overrides the element rule, regardless of what order they are written in your CSS file."
                },
                {
                    id: "knowledge-check-chapter5",
                    title: "Knowledge Check",
                    content: "# Module Assessment\n\nTest your understanding of the chapter with these interactive concept checks.\n\n```qna\nQ: What is the core takeaway regarding styling here?\nH: Separation of concerns.\nA: Always ensure your styling rules do not conflict and rely on class specificity rather than !important.\n```\n\n```qna\nQ: How do you verify your layout across devices?\nH: DevTools.\nA: Use your browser's responsive design mode to test breakpoints and inspect element boxes.\n```\n\n```qna\nQ: What should you focus on when debugging CSS?\nH: The Box Model.\nA: Always check the computed dimensions of Padding, Border, and Margin inside DevTools.\n```"
                },
            ]
        },
        {
            id: "chapter6",
            title: "Chapter 6: Proper HTML Structure",
            pages: [
                {
                    id: "lesson-6-1",
                    title: "The Invisible Skeleton",
                    content: "# The Invisible Skeleton\n\nUp until now, we have just been throwing <button> and <p> tags directly into a blank file. The browser is smart enough to guess what we mean, but we are missing out on powerful features. Every professional HTML file must have a strict, nested structure.\nDelete your old code and type exactly this:\n```html\n<!DOCTYPE html>\n<html>\n  <head>\n    <title>My First Website</title>\n  </head>\n  <body>\n    </body>\n</html>\n\n```\n\n\n* <!DOCTYPE html>: Not technically an element. It is a special declaration telling the browser to use the modern HTML5 standard.\n* <html>: The root container for the entire webpage.\n* <head>: Contains all the \"invisible\" elements, such as the <title> (which changes the text in your browser tab) and links to your CSS.\n* <body>: Contains absolutely everything that is visibly displayed on the page."
                },
                {
                    id: "lesson-6-2",
                    title: "Live Server",
                    content: "# Live Server\n\nNow that we have the proper structure, we can install a magical VS Code extension called Live Server. Instead of constantly clicking \"Refresh\" in Chrome every time you change your code, you can right-click your HTML file and select \"Open with Live Server\". Every time you hit save in your code editor, the browser will instantly and automatically update."
                },
                {
                    id: "lesson-6-3",
                    title: "Separating HTML and CSS",
                    content: "# Separating HTML and CSS\n\nMixing HTML and CSS in one file gets messy very fast. The professional standard is to separate them.\n1. Create a new file called text.css.\n2. Cut all your CSS code from inside the <style> tags and paste it into text.css.\n3. Delete the empty <style> tags from your HTML.\nNow, your HTML file is broken because it doesn't know where the styles went. We must link them back together inside the <head> element using a Void Element."
                },
                {
                    id: "lesson-6-4",
                    title: "Void Elements and File Paths",
                    content: "# Void Elements and File Paths\n\nA void element is an HTML element that does not have a closing tag. The <link> element is a void element used to connect files.\n```html\n<head>\n  <link rel=\"stylesheet\" href=\"text.css\">\n</head>\n\n```\n\n\n* rel=\"stylesheet\": Tells the browser the relationship of the file (it's a style sheet).\n* href=\"text.css\": Tells the browser the path to find the file.\nFile Paths: If your CSS file is sitting right next to your HTML file, you just type its name. But what if you put your CSS inside a folder named styles to stay organized? You must update the path to navigate into that folder using a forward slash: href=\"styles/text.css\"."
                },
                {
                    id: "lesson-6-5",
                    title: "Loading Google Fonts",
                    content: "# Loading Google Fonts\n\nThe final benefit of a proper <head> structure is the ability to load beautiful, custom fonts from the internet instead of relying on boring default fonts like Arial.\n1. Go to fonts.google.com.\n2. Search for a font (e.g., \"Roboto\").\n3. Select the weights you need (e.g., Regular 400, Medium 500, Bold 700).\n4. Copy the block of <link> tags provided by Google.\n5. Paste those tags directly into your HTML <head>.\n6. In your CSS, you can now write font-family: Roboto; and the browser will beautifully render the new font!"
                },
                {
                    id: "knowledge-check-chapter6",
                    title: "Knowledge Check",
                    content: "# Module Assessment\n\nTest your understanding of the chapter with these interactive concept checks.\n\n```qna\nQ: What is the primary role of HTML?\nH: Bones of the web.\nA: HTML provides the foundational structure and raw content of a webpage, before any styling or logic is applied.\n```\n\n```qna\nQ: What is a Void Element?\nH: No closing required.\nA: An element like <img> or <input> that does not wrap text content and therefore does not require a closing tag.\n```\n\n```qna\nQ: Why is it important to use semantic tags like <nav> instead of generic <div> tags?\nH: Robots and accessibility.\nA: Semantic tags provide implicit meaning to search engines and screen readers, drastically improving SEO and accessibility.\n```"
                },
            ]
        },
        {
            id: "chapter7",
            title: "Chapter 7: Images and Text Boxes",
            pages: [
                {
                    id: "lesson-7-1",
                    title: "Setting Up the Final Project",
                    content: "# Setting Up the Final Project\n\nIt is time to start building our final project: a professional clone of YouTube.com.\n1. Create a new folder on your computer named intro-to-html.\n2. Move all your previous practice files into a separate folder to keep things clean.\n3. Inside intro-to-html, create a new file named youtube.html.\n4. Set up the proper HTML structure (<!DOCTYPE html>, <html>, <head>, <body>).\n5. Open it with Live Server."
                },
                {
                    id: "lesson-7-2",
                    title: "The Image Element (<img>)",
                    content: "# The Image Element (<img>)\n\nTo build YouTube, we need video thumbnails. You can download sample thumbnails from the instructor's reference site by right-clicking them, selecting \"Inspect,\" and finding the image URL in the Chrome DevTools. Save them into a new folder named thumbnails inside your project folder.\nTo display an image on your website, you use the Image Element. Like the <link> element, the <img> element is a Void Element—it does not have a closing tag.\n```html\n<img src=\"thumbnails/thumbnail-1.webp\">\n\n```\n\n\n* The src Attribute: Short for \"source.\" This tells the computer exactly where to find the image file. It uses the exact same file path rules we learned when linking CSS files."
                },
                {
                    id: "lesson-7-3",
                    title: "Image Sizing and object-fit",
                    content: "# Image Sizing and object-fit\n\nWhen you load an image, it will display at its original, massive resolution. We need to resize it using CSS.\n```css\n.thumbnail {\n  width: 300px;\n}\n\n```\n\n\nThe Aspect Ratio Quirk: You might notice we only set the width. When you set the width of an image, the browser automatically calculates and adjusts the height to maintain the image's original dimensions (its aspect ratio). It prevents the image from looking squished or stretched.\nIf you force both a width and a height (e.g., width: 300px; height: 600px;), the image will lose its shape and stretch terribly. To fix a forced shape, CSS provides image-specific properties:\n* object-fit: cover;: Tells the image to completely cover the 300x600 area, even if it has to chop off the edges of the image to keep its shape.\n* object-fit: contain;: Tells the image to shrink itself until the entire picture is fully contained and visible within the 300x600 area, leaving empty space if the aspect ratios don't match.\n* object-position:: Lets you shift which part of the image is visible (e.g., object-position: left; or bottom).\nFor our YouTube clone, we will simply set width: 300px; and let the height auto-adjust."
                },
                {
                    id: "lesson-7-4",
                    title: "Text Boxes (<input>)",
                    content: "# Text Boxes (<input>)\n\nAt the top of YouTube, there is a search bar. We create text boxes using the Input element (<input>), which is another void element.\n```html\n<input type=\"text\" placeholder=\"Search\">\n\n```\n\n\n* type=\"text\": Tells the browser to render a standard text-entry box. (If you change this to type=\"checkbox\", it literally transforms into a clickable checkbox!)\n* placeholder=\"Search\": This attribute puts a faint gray label inside the text box that automatically disappears the moment the user starts typing.\nYou can style the <input> element exactly like a button. You can give it a class (like .search-bar) and use CSS to change its font-size, margin, padding, and border-radius."
                },
                {
                    id: "knowledge-check-chapter7",
                    title: "Knowledge Check",
                    content: "# Module Assessment\n\nTest your understanding of the chapter with these interactive concept checks.\n\n```qna\nQ: What is the core takeaway regarding styling here?\nH: Separation of concerns.\nA: Always ensure your styling rules do not conflict and rely on class specificity rather than !important.\n```\n\n```qna\nQ: How do you verify your layout across devices?\nH: DevTools.\nA: Use your browser's responsive design mode to test breakpoints and inspect element boxes.\n```\n\n```qna\nQ: What should you focus on when debugging CSS?\nH: The Box Model.\nA: Always check the computed dimensions of Padding, Border, and Margin inside DevTools.\n```"
                },
            ]
        },
        {
            id: "chapter8",
            title: "Chapter 8: The Display Property",
            pages: [
                {
                    id: "lesson-8-1",
                    title: "The Layout Mystery",
                    content: "# The Layout Mystery\n\nIf you put your <input> search bar and your <img> thumbnail into your HTML, you will notice something strange: they sit side-by-side on the same line. However, if you add three <p> elements below them for the video title, channel name, and view count, those paragraphs will rigidly stack on top of each other, one per line. Why do images and text boxes sit side-by-side, but paragraphs stack?\nThis happens because of the CSS display property."
                },
                {
                    id: "lesson-8-2",
                    title: "The Three Types of Elements",
                    content: "# The Three Types of Elements\n\nIn HTML, elements fundamentally behave in one of three ways:\n1. Block Elements: By default, elements like <p>, <div>, and <header> are Block elements. A block element fiercely claims the entire horizontal line on the webpage. Even if you use CSS to make a paragraph's width only 300px, it will still physically block any other element from sitting next to it.\n2. Inline-Block Elements: Elements like <img>, <button>, and <input> are Inline-Block elements. They only take up exactly as much width as they physically need. Because they don't claim the whole line, other Inline-Block elements can comfortably sit right next to them.\n3. Inline Elements: Elements like <strong>, <u>, and <span>. These are strictly text-level elements that exist inside a line of text."
                },
                {
                    id: "lesson-8-3",
                    title: "Controlling the Display Property",
                    content: "# Controlling the Display Property\n\nWe are not stuck with these defaults. We can use CSS to manipulate how elements behave, forcing them to sit side-by-side or forcing them to take up their own lines.\nIf we want our video author and video stats paragraphs to sit side-by-side, we simply change their display property:\n```css\n.video-author,\n.video-stats {\n  display: inline-block;\n}\n\n\n(Note the comma syntax above! By placing a comma between .video-author and .video-stats, we can apply the exact same CSS rule to multiple classes at once, saving us from writing duplicate code).\nNow, instead of taking up the whole line, those paragraphs only take up as much space as their text requires, allowing them to sit next to each other.\nConversely, if we want our YouTube search bar to have its own dedicated row at the very top of the screen, we can force it to behave like a block:\n\n```\n\n```css\n.search-bar {\n  display: block;\n}\n\n```\n\n\nBy mastering the display property, you gain the power to manually control whether elements stack vertically or align horizontally!"
                },
                {
                    id: "knowledge-check-chapter8",
                    title: "Knowledge Check",
                    content: "# Module Assessment\n\nTest your understanding of the chapter with these interactive concept checks.\n\n```qna\nQ: What is the core takeaway regarding styling here?\nH: Separation of concerns.\nA: Always ensure your styling rules do not conflict and rely on class specificity rather than !important.\n```\n\n```qna\nQ: How do you verify your layout across devices?\nH: DevTools.\nA: Use your browser's responsive design mode to test breakpoints and inspect element boxes.\n```\n\n```qna\nQ: What should you focus on when debugging CSS?\nH: The Box Model.\nA: Always check the computed dimensions of Padding, Border, and Margin inside DevTools.\n```"
                },
            ]
        },
        {
            id: "chapter9",
            title: "Chapter 9: The Div Element & Nested Layouts",
            pages: [
                {
                    id: "lesson-9-1",
                    title: "The Most Important Element: The Div",
                    content: "# The Most Important Element: The Div\n\nIf you inspect the code of professional websites like Twitter or Instagram, you will notice they are built almost entirely out of an element called <div>.\nWhat is a <div>? It stands for \"Division,\" but the easiest way to understand it is that a div is just a box.\nBy itself, a <div> does absolutely nothing visually. If you type <div>This is a div</div>, it behaves exactly like a paragraph. It is a Block element by default, meaning it takes up the entire horizontal line. However, its true power is that it acts as a container. You can put paragraphs, buttons, images, and even other divs inside of a div."
                },
                {
                    id: "lesson-9-2",
                    title: "The Power of Containers",
                    content: "# The Power of Containers\n\nWhy do we need containers? In Chapter 8, we learned that block elements take up the entire line on the page. However, the exact rule is that block elements take up the entire line in their container.\nIf you put a title, an author name, and a view count inside a <div> container, and then use CSS to restrict that container's width to 300px, those block elements are now forced to stay within that 300px box. They will stack neatly on top of each other inside the box, leaving the rest of the webpage empty.\nBecause the <div> itself is a block element, we can use CSS to change its display property:\n```css\n.video-preview {\n  display: inline-block;\n}\n\n```\n\n\nNow, you can put two entire 300px <div> containers side-by-side! This is the secret to building the grid of videos on YouTube."
                },
                {
                    id: "lesson-9-3",
                    title: "The Nested Layouts Technique",
                    content: "# The Nested Layouts Technique\n\nThis is arguably the most important lesson in web development. Professional web design boils down to a technique called Nested Layouts. You can recreate almost any website in the world by breaking it down into a combination of two layouts:\n1. Vertical Layouts: Elements stacked on top of each other.\n2. Horizontal Layouts: Elements placed side-by-side.\nLet's break down a YouTube video preview card using this technique:\n* Layer 1 (Vertical): The entire card is a vertical layout consisting of two parts: the thumbnail image on top, and the video info row on the bottom.\n* Layer 2 (Horizontal): Look closer at the video info row on the bottom. It is a horizontal layout consisting of two parts: the channel profile picture on the left, and the text data on the right.\n* Layer 3 (Vertical): Look closer at the text data on the right. It is a vertical layout consisting of the video title on top, the author in the middle, and the stats on the bottom.\nWe have layouts inside of layouts inside of layouts."
                },
                {
                    id: "lesson-9-4",
                    title: "Coding the Nested Layout",
                    content: "# Coding the Nested Layout\n\nTo build this in HTML, every layout becomes a <div>:\n```html\n<div class=\"video-preview\">\n  \n  <img src=\"thumbnails/thumbnail-1.webp\"> <div class=\"video-info-grid\">\n    \n    <div class=\"channel-picture\">\n      <img src=\"profile.jpg\">\n    </div>\n\n\n    <div class=\"video-info\">\n      <p class=\"video-title\">My Video Title</p>\n      <p class=\"video-author\">Channel Name</p>\n      <p class=\"video-stats\">19M views</p>\n    </div>\n\n\n  </div>\n</div>\n\n```\n\n\nTo make Layer 2 horizontal, you could set the .channel-picture and .video-info divs to display: inline-block; and use vertical-align: top; to line them up. However, inline-block has some nasty alignment quirks and HTML spacing issues. There is a much better, modern way to do this."
                },
                {
                    id: "knowledge-check-chapter9",
                    title: "Knowledge Check",
                    content: "# Module Assessment\n\nTest your understanding of the chapter with these interactive concept checks.\n\n```qna\nQ: What is the core takeaway regarding styling here?\nH: Separation of concerns.\nA: Always ensure your styling rules do not conflict and rely on class specificity rather than !important.\n```\n\n```qna\nQ: How do you verify your layout across devices?\nH: DevTools.\nA: Use your browser's responsive design mode to test breakpoints and inspect element boxes.\n```\n\n```qna\nQ: What should you focus on when debugging CSS?\nH: The Box Model.\nA: Always check the computed dimensions of Padding, Border, and Margin inside DevTools.\n```"
                },
            ]
        },
        {
            id: "chapter10",
            title: "Chapter 10: CSS Grid",
            pages: [
                {
                    id: "lesson-10-1",
                    title: "Introduction to Grid",
                    content: "# Introduction to Grid\n\nWhile inline-block works for putting things side-by-side, it is a rigid and easily broken method. A much better tool for creating horizontal layouts and full page grids is CSS Grid.\nGrid completely transforms how elements are placed. Instead of elements dictating their own space, Grid allows you to define strict columns and rows on the container, and the elements simply snap into those columns.\nTo create a grid, you need two steps applied to the container <div>:\n1. display: grid; (This activates the grid system).\n2. grid-template-columns: (This defines how many columns exist and how wide they are)."
                },
                {
                    id: "lesson-10-2",
                    title: "Creating Columns and Rows",
                    content: "# Creating Columns and Rows\n\nLet's look at the syntax:\n```css\n.my-grid {\n  display: grid;\n  grid-template-columns: 100px 100px 200px;\n}\n\n```\n\n\nThis single line of code dictates that the container has exactly three columns. The first is 100px wide, the second is 100px wide, and the third is 200px wide.\nIf you put five <div> elements inside .my-grid, the first three will fill the top row. Because there are only three columns, Grid will automatically wrap the fourth and fifth elements onto a brand new row beneath them."
                },
                {
                    id: "lesson-10-3",
                    title: "The Magic of the fr Unit",
                    content: "# The Magic of the fr Unit\n\nIf you want to create a layout where elements stretch perfectly to fill the screen, pixel measurements won't work. We need the Fractional Unit (fr), which stands for \"free space.\"\nLook at our YouTube video info row (Layer 2 from the previous chapter). We have a profile picture on the left that needs to be exactly 50px wide, but we want the text on the right to stretch and fill all the remaining space.\n```css\n.video-info-grid {\n  display: grid;\n  grid-template-columns: 50px 1fr;\n}\n\n```\n\n\nThe 1fr unit tells the browser: \"Calculate whatever space is left over in the container, and give 100% of it to this column.\"\nIf we want to build the main YouTube homepage, where we have three videos sitting side-by-side taking up equal amounts of space, we use fr for all of them:\n```css\n.video-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n}\n\n```\n\n\nThis creates three perfectly equal columns that will dynamically grow and shrink as the user resizes their web browser! (Note: If you write 1fr 2fr, the second column will take up twice as much free space as the first)."
                },
                {
                    id: "lesson-10-4",
                    title: "Column and Row Gaps",
                    content: "# Column and Row Gaps\n\nWith inline-block, you had to use CSS margin to push elements away from each other. With CSS Grid, you don't need margins. Grid has built-in properties to create precise gutters between your rows and columns:\n```css\n.video-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  column-gap: 16px;\n  row-gap: 40px;\n}\n\n```\n\n\n* column-gap: 16px; perfectly spaces out the horizontal distance between our videos.\n* row-gap: 40px; perfectly spaces out the vertical distance between rows of videos.\nWith just a few lines of code, CSS Grid solves some of the most frustrating layout problems in web development!"
                },
                {
                    id: "knowledge-check-chapter10",
                    title: "Knowledge Check",
                    content: "# Module Assessment\n\nTest your understanding of the chapter with these interactive concept checks.\n\n```qna\nQ: How does CSS Grid differ from Flexbox?\nH: Dimensions.\nA: Flexbox handles one dimension at a time (rows OR columns). Grid handles two dimensions simultaneously (rows AND columns).\n```\n\n```qna\nQ: What does 'grid-template-columns: 1fr 1fr 1fr;' do?\nH: Fractions of space.\nA: It creates three equal-width columns, each taking up exactly one fraction of the available container space.\n```\n\n```qna\nQ: What is the purpose of the 'gap' property?\nH: Gutters between cells.\nA: It creates clean, uniform spacing strictly between grid items, without affecting the outside edges of the grid.\n```"
                },
            ]
        },
        {
            id: "chapter11",
            title: "Chapter 11: Flexbox",
            pages: [
                {
                    id: "lesson-11-1",
                    title: "Introduction to Flexbox vs. CSS Grid",
                    content: "# Introduction to Flexbox vs. CSS Grid\n\nWhile CSS Grid is incredible for laying out rigid, 2-dimensional structures (like a wall of video thumbnails), there is another layout system built for 1-dimensional, fluid structures (like a website's top navigation bar). This is called Flexbox.\nTo turn a <div> into a flexbox container, you simply apply one property:\n```css\n.header {\n  display: flex;\n}\n\n```\n\n\nThe Key Difference: In CSS Grid, you define the columns first, and elements snap into those rigid columns. In Flexbox, the layout is driven by the content. Elements will shrink, grow, and align themselves fluidly based on the space available. If you remove an element from a Flexbox, the remaining elements will organically shift to fill the void. This makes Flexbox the perfect tool for responsive navigation bars."
                },
                {
                    id: "lesson-11-2",
                    title: "The flex-direction Property",
                    content: "# The flex-direction Property\n\nBy default, activating Flexbox places all child elements side-by-side in a row. You can manually control this direction:\n* flex-direction: row; (The default horizontal layout).\n* flex-direction: column; (Stacks elements vertically, one on top of the other)."
                },
                {
                    id: "lesson-11-3",
                    title: "The flex Property (Flexbox's version of fr)",
                    content: "# The flex Property (Flexbox's version of fr)\n\nJust like Grid uses 1fr to take up remaining free space, Flexbox uses the flex property.\nImagine a YouTube header divided into three sections: a Left Section (logo), a Middle Section (search bar), and a Right Section (user icons). We want the left and right sections to have fixed widths, but we want the middle search bar to stretch and fill whatever space is left.\n```css\n.left-section {\n  width: 150px;\n}\n.middle-section {\n  flex: 1; /* Stretches to fill the remaining free space */\n}\n.right-section {\n  width: 200px;\n}\n\n\nIf you resize your browser window, the 150px and 200px sections will stay perfectly frozen in size, while the .middle-section dynamically stretches and shrinks like a rubber band.\n\n```"
                },
                {
                    id: "lesson-11-4",
                    title: "Alignment with justify-content and align-items",
                    content: "# Alignment with justify-content and align-items\n\nFlexbox gives you incredible, effortless control over aligning elements horizontally and vertically.\nHorizontal Alignment (justify-content): If you have three buttons inside a flexbox, you dictate where they sit horizontally:\n* justify-content: start; (Packs everything to the left).\n* justify-content: end; (Packs everything to the right).\n* justify-content: center; (Packs everything into the exact center).\n* justify-content: space-between; (Spreads elements out evenly, pushing the first item to the far left edge and the last item to the far right edge).\nVertical Alignment (align-items): By default, elements stretch from the top of a flexbox to the bottom (align-items: stretch). But if you have a 55px tall header and you want a small 24px icon to sit perfectly in the vertical middle, you use:\n* align-items: center; (Perfectly centers elements vertically)."
                },
                {
                    id: "lesson-11-5",
                    title: "The flex-shrink Trick",
                    content: "# The flex-shrink Trick\n\nFlexbox is sometimes too flexible. If you make your browser window extremely narrow, Flexbox will eventually start squishing the icons in your Right Section to make room.\nTo forcefully prevent a specific element from shrinking, you use flex-shrink: 0;.\n```css\n.right-section {\n  width: 200px;\n  flex-shrink: 0; /* Tells the browser: \"Never shrink this, no matter what!\" */\n}\n\n\n\n```"
                },
                {
                    id: "knowledge-check-chapter11",
                    title: "Knowledge Check",
                    content: "# Module Assessment\n\nTest your understanding of the chapter with these interactive concept checks.\n\n```qna\nQ: What is the primary purpose of Flexbox?\nH: One-dimensional alignment.\nA: To establish a highly efficient 1D layout (either a row or a column) for aligning and distributing child elements.\n```\n\n```qna\nQ: What does 'justify-content: center;' do inside a flex row?\nH: Main axis.\nA: It centers the items horizontally along the main flex axis.\n```\n\n```qna\nQ: What does 'align-items: center;' do inside a flex row?\nH: Cross axis.\nA: It centers the items vertically along the cross axis.\n```"
                },
            ]
        },
        {
            id: "chapter12",
            title: "Chapter 12: CSS Position",
            pages: [
                {
                    id: "lesson-12-1",
                    title: "The Normal Flow (position: static)",
                    content: "# The Normal Flow (position: static)\n\nBy default, every HTML element has position: static;. This means they follow the normal rules of the page: they stack up, push each other down, and scroll away when you scroll down the page. To build professional UI elements—like a header that follows you as you scroll, or a tooltip that hovers over a button—we must break elements out of this normal flow."
                },
                {
                    id: "lesson-12-2",
                    title: "Sticking to the Screen (position: fixed)",
                    content: "# Sticking to the Screen (position: fixed)\n\nWhen you give an element position: fixed;, it completely detaches from the normal webpage and floats directly on your browser window.\n```css\n.header {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 55px;\n  background-color: white;\n}\n\n```\n\n\n* The Coordinates: We pin the header 0 pixels from the top, 0 pixels from the left, and 0 pixels from the right.\n* The Background Color: Because the header is now floating above the page, it becomes transparent. You must manually add background-color: white; so the scrolling videos don't bleed through the header text.\n* The Body Padding Fix: Because the header detached and floated upwards, the video grid below it instantly slammed up to the top of the page, hiding behind the header. To fix this, you must add padding-top: 80px; to your <body> to push your normal content safely below the fixed header.\n(Note: We use this exact same position: fixed; trick to pin the sidebar to the left, bottom, and top of the screen!)"
                },
                {
                    id: "lesson-12-3",
                    title: "Stacking Order (z-index)",
                    content: "# Stacking Order (z-index)\n\nIf you scroll down your YouTube clone, you might notice your video thumbnails overlapping and hiding your fixed header!\nWhen elements detach from the normal flow, the browser has to guess which one belongs in front. By default, whichever element is written lowest in your HTML file appears in front. To manually override this, we use the z-index property.\n```css\n.header {\n  z-index: 100;\n}\n\n```\n\n\nElements with a higher z-index will always overlap elements with a lower z-index. Giving the header 100 guarantees it will securely glide over the top of the video grid."
                },
                {
                    id: "lesson-12-4",
                    title: "The Golden Rule: Absolute Inside Relative",
                    content: "# The Golden Rule: Absolute Inside Relative\n\nHow do we place a small \"14:20\" timestamp badge precisely into the bottom-right corner of a video thumbnail? We use position: absolute;.\nposition: absolute; detaches an element and positions it based on coordinates, just like fixed. But instead of sticking to the browser window, it sticks to the page (meaning it will scroll away naturally).\nHowever, there is a golden rule in CSS: If you place an absolute element inside a relative container, the absolute element will position itself based on the corners of that container, not the corners of the whole webpage!\n```html\n<div class=\"thumbnail-container\"> <img src=\"thumbnail.webp\">\n  <div class=\"video-time\">14:20</div> </div>\n\n\n\n```\n\n```css\n.thumbnail-container {\n  position: relative; /* Acts as the anchor */\n}\n.video-time {\n  position: absolute;\n  bottom: 8px; /* 8px from the bottom of the thumbnail */\n  right: 8px;  /* 8px from the right of the thumbnail */\n}\n\n```\n\n\nThis is how we overlay text onto images, create notification badges (like a tiny \"3\" hovering over a bell icon), and create tooltips."
                },
                {
                    id: "lesson-12-5",
                    title: "Creating Hover Tooltips",
                    content: "# Creating Hover Tooltips\n\nTo create a tooltip that says \"Search\" when you hover over the magnifying glass button, we use the \"Absolute inside Relative\" trick to anchor a black text box directly beneath the button.\nTo hide it and make it appear only on hover, we manipulate the opacity:\n```css\n/* The hidden tooltip */\n.tooltip {\n  position: absolute;\n  bottom: -30px;\n  opacity: 0; /* Invisible by default */\n  transition: opacity 0.15s;\n  pointer-events: none; /* Prevents the tooltip itself from triggering hover glitches */\n}\n\n\n/* When the button is hovered, change the tooltip's opacity to 1 */\n.search-button:hover .tooltip {\n  opacity: 1; \n}\n\n```\n\n\nUsing an advanced CSS selector like .search-button:hover .tooltip, we tell the browser: \"Only target the .tooltip class when my mouse is hovering over the .search-button container.\""
                },
                {
                    id: "knowledge-check-chapter12",
                    title: "Knowledge Check",
                    content: "# Module Assessment\n\nTest your understanding of the chapter with these interactive concept checks.\n\n```qna\nQ: What is the core takeaway regarding styling here?\nH: Separation of concerns.\nA: Always ensure your styling rules do not conflict and rely on class specificity rather than !important.\n```\n\n```qna\nQ: How do you verify your layout across devices?\nH: DevTools.\nA: Use your browser's responsive design mode to test breakpoints and inspect element boxes.\n```\n\n```qna\nQ: What should you focus on when debugging CSS?\nH: The Box Model.\nA: Always check the computed dimensions of Padding, Border, and Margin inside DevTools.\n```"
                },
            ]
        },
        {
            id: "chapter13",
            title: "Chapter 13: Responsive Design & Final Polish",
            pages: [
                {
                    id: "lesson-13-1",
                    title: "Responsive Design (Media Queries)",
                    content: "# Responsive Design (Media Queries)\n\nIf you look at the real YouTube on a large desktop monitor, you might see four or five videos in a single row. If you look at it on a smaller laptop, you might see three. On a mobile phone, you will likely only see one or two. The layout adjusts to ensure the website always looks good, regardless of the screen size. This is called Responsive Design.\nTo implement responsive design, we use a CSS feature called a Media Query. A media query tells the browser to only activate a specific block of CSS code if the screen size matches a certain condition.\n```css\n/* Default grid for standard screens (3 columns) */\n.video-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n}\n\n\n/* For smaller screens: activate 2 columns */\n@media (max-width: 750px) {\n  .video-grid {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n\n\n/* For large screens: activate 4 columns */\n@media (min-width: 1000px) {\n  .video-grid {\n    grid-template-columns: 1fr 1fr 1fr 1fr;\n  }\n}\n\n```\n\n\n* max-width: 750px: This means the styles inside the curly braces will only apply if the screen is 750 pixels wide or smaller.\n* min-width: 1000px: This means the styles will only apply if the screen is 1000 pixels wide or larger.\n(Note: You can find your exact screen width in pixels by opening the Chrome DevTools and resizing your browser window; the dimensions will appear in the top right corner)."
                },
                {
                    id: "lesson-13-2",
                    title: "CSS Shorthand Properties",
                    content: "# CSS Shorthand Properties\n\nAs your CSS file grows, you want to write less code. Instead of writing out every direction for padding or margins, you can use Shorthand Properties.\nInstead of writing this:\n```css\npadding-top: 10px;\npadding-bottom: 10px;\npadding-left: 20px;\npadding-right: 20px;\n\n```\n\n\nYou can write exactly the same thing in one line:\n```css\npadding: 10px 20px;\n\n```\n\n\n* One value (padding: 4px;): Applies 4px to all four sides equally.\n* Two values (padding: 10px 20px;): The first value is the vertical padding (top and bottom). The second value is the horizontal padding (left and right).\n* Four values (padding: 10px 20px 30px 40px;): Applies padding in a clockwise circle starting from the top: Top, Right, Bottom, Left.\nThis also works for borders! Instead of writing border-width, border-style, and border-color on three separate lines, you can combine them:\n```css\nborder: 1px solid gray;\n\n```"
                },
                {
                    id: "lesson-13-3",
                    title: "CSS Inheritance",
                    content: "# CSS Inheritance\n\nInheritance is a powerful feature where certain CSS properties applied to an outer container are automatically \"passed down\" to all the elements inside it.\nInstead of setting font-family: Roboto, Arial; on the video title, the video author, the sidebar links, and the header, you can set it once on the very top-level element of your page: the <body> element.\n```css\nbody {\n  font-family: Roboto, Arial;\n  background-color: rgb(248, 248, 248);\n}\n\n```\n\n\nBecause every single visible element on your webpage lives inside the <body>, they will all inherit the Roboto font.\nThe Specificity Override: What if you set color: red; on the <body>, but you want your video author text to be gray? Inheritance will make everything red, but remember the rule of CSS Specificity from Chapter 5. A specific class selector (.video-author) has higher priority than a broad element selector (body).\n```css\n.video-author {\n  color: rgb(96, 96, 96); /* This overrides the inherited red color! */\n}\n\n```"
                },
                {
                    id: "lesson-13-4",
                    title: "Semantic HTML",
                    content: "# Semantic HTML\n\nThroughout the course, we used the <div> element as a generic container. While <div> works perfectly for layout and styling, it doesn't tell the browser what the content actually is.\nTo help search engines (like Google) and screen readers (for visually impaired users) understand your website, you should replace generic <div> tags with Semantic Elements where appropriate. They behave exactly like a <div>, but they have special meaning to robots:\n* <header>: Used for the top navigation bar instead of <div class=\"header\">.\n* <nav>: Used for the sidebar instead of <div class=\"sidebar\"> (stands for navigation).\n* <main>: Wraps around the primary content of your webpage (the video grid).\n* <section>: Used to group related content inside your main area."
                },
                {
                    id: "lesson-13-5",
                    title: "Leaving Comments",
                    content: "# Leaving Comments\n\nWhen working on large projects or collaborating with a team, it is essential to leave notes in your code explaining why you did something. The computer completely ignores comments, meaning they won't affect your website.\nHTML Comments: Enclose your text with ``.\n```html\n<div class=\"left-section\">...</div>\n\n\nCSS Comments: Enclose your text with /* and */.\n\n```\n\n```css\n.tooltip {\n  /* We use absolute positioning inside a relative container to overlay the tooltip */\n  position: absolute; \n}\n\n```\n\n\nConclusion & Next Steps\nCongratulations! You have taken a massive step into the world of web development. You have learned how to structure pages with HTML, style them with CSS, build complex layouts using Grid and Flexbox, and polish them with absolute positioning and responsive media queries.\nRemember, no developer memorizes every single CSS property. When you forget how to round a corner or stop text from wrapping, the best skill you have is Googling (e.g., \"CSS text don't wrap\" -> white-space: nowrap;).\nWhere to go from here? HTML and CSS build the visual structure of a website. The next logical step is to learn how to make it do things—like fetching real video data, making the search bar functional, or updating the page when a user clicks a button. For that, your next journey is learning the JavaScript programming language."
                },
                {
                    id: "knowledge-check-chapter13",
                    title: "Knowledge Check",
                    content: "# Module Assessment\n\nTest your understanding of the chapter with these interactive concept checks.\n\n```qna\nQ: What is the core takeaway regarding styling here?\nH: Separation of concerns.\nA: Always ensure your styling rules do not conflict and rely on class specificity rather than !important.\n```\n\n```qna\nQ: How do you verify your layout across devices?\nH: DevTools.\nA: Use your browser's responsive design mode to test breakpoints and inspect element boxes.\n```\n\n```qna\nQ: What should you focus on when debugging CSS?\nH: The Box Model.\nA: Always check the computed dimensions of Padding, Border, and Margin inside DevTools.\n```"
                },
            ]
        },
    ]
};
