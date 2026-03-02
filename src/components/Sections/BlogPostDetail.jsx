import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Calendar, ArrowLeft, Share2 } from 'lucide-react';

// ── Full blog post content for all 3 articles ────────────────────────────────
const blogContent = {
    0: {
        title: 'Building Immersive 3D Experiences with React Three Fiber',
        date: 'Feb 2024',
        readTime: '6 min read',
        heroImage: '/blog-r3f-architecture.png',
        sections: [
            {
                type: 'text',
                heading: 'Why 3D on the Web Matters',
                body: `The web is no longer flat. Users expect immersive, interactive experiences that go beyond scrolling through static pages. Whether it's a 3D product configurator for an e-commerce store, an interactive data visualization, or a creative portfolio piece, WebGL-powered 3D is becoming the new standard for premium web experiences.

But building 3D on the web has traditionally been painful. Three.js is incredibly powerful, but its imperative API doesn't play well with React's declarative component model. That's where React Three Fiber (R3F) changes everything.`
            },
            {
                type: 'text',
                heading: 'The Architecture: How R3F Bridges React and Three.js',
                body: `React Three Fiber acts as a reconciler between React and Three.js. Instead of manually creating scenes, cameras, and render loops, you write JSX that R3F translates into Three.js objects. This means you get all of React's benefits — component reuse, state management, hooks, context — while working with 3D.

The architecture is elegantly simple: your React components describe the scene graph, R3F handles the translation layer, and Three.js does the actual WebGL rendering. The result? You can build complex 3D scenes with the same mental model you use for building UIs.`
            },
            {
                type: 'infographic',
                src: '/blog-r3f-architecture.png',
                caption: 'The three-layer architecture: React Components → R3F Bridge → Three.js/WebGL'
            },
            {
                type: 'code',
                heading: 'A Real-World Example: Interactive Terrain',
                language: 'jsx',
                body: `Here's a simplified version of the interactive terrain I built for my portfolio's hero section. Notice how natural it feels to compose 3D scenes with JSX:`,
                code: `import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function Terrain({ color }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const positions = meshRef.current.geometry
      .attributes.position.array
    
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 2] = Math.sin(
        positions[i] + time
      ) * 0.5
    }
    meshRef.current.geometry
      .attributes.position.needsUpdate = true
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 10, 32, 32]} />
      <meshStandardMaterial
        color={color}
        flatShading
      />
    </mesh>
  )
}`
            },
            {
                type: 'text',
                heading: 'Performance Considerations',
                body: `3D on the web comes with performance challenges. Here's what I've learned from building production R3F applications:

• **Geometry Instancing** — When rendering many similar objects (like particles or trees), use InstancedMesh instead of individual meshes. This can reduce draw calls from thousands to just one.

• **Level of Detail (LOD)** — Show high-poly models up close and swap to low-poly versions at distance. R3F makes this easy with the Drei library's LOD component.

• **Texture Optimization** — Compress textures with KTX2 format and use appropriate resolutions. A 4K texture on a small object is wasted GPU memory.

• **Frame Budget** — Target 16ms per frame for 60fps. Use React Three Fiber's built-in performance monitoring to identify bottlenecks.

• **Suspense Boundaries** — Wrap heavy 3D components in React Suspense to show loading states while assets download.`
            },
            {
                type: 'text',
                heading: 'The Ecosystem: Essential Libraries',
                body: `The R3F ecosystem has matured significantly. Here are my go-to libraries:

**Drei** — A collection of useful helpers. Think of it as a utility belt for R3F. It includes pre-built components for text, environment maps, camera controls, and dozens more.

**React Spring / Framer Motion 3D** — For animating 3D properties with physics-based springs. Makes transitions feel natural and fluid.

**Rapier / Cannon** — Physics engines for React Three Fiber. Need objects to fall, bounce, and collide? These have you covered.

**Postprocessing** — Bloom, depth of field, chromatic aberration — all the cinematic effects that make 3D scenes look stunning, easily composable as React components.`
            },
            {
                type: 'text',
                heading: 'Conclusion: The Future is Immersive',
                body: `React Three Fiber has democratized 3D web development. What used to require deep WebGL knowledge and hundreds of lines of boilerplate can now be expressed in clean, composable React components.

If you're a React developer curious about 3D, now is the perfect time to start. The learning curve is gentler than you'd expect, the ecosystem is robust, and the results are genuinely impressive. Your portfolio — and your users — will thank you.`
            }
        ]
    },
    1: {
        title: 'The Art of Micro-Animations: GSAP vs Framer Motion',
        date: 'Jan 2024',
        readTime: '8 min read',
        heroImage: '/blog-animation-comparison.png',
        sections: [
            {
                type: 'text',
                heading: 'Why Animations Matter More Than You Think',
                body: `Animations aren't decorations — they're communication tools. A well-timed fade-in tells the user "this content just appeared." A smooth slide transition says "you're moving to a new context." A bouncy button click confirms "your action was received."

Studies show that interfaces with thoughtful micro-animations feel 40% more intuitive to users. They reduce cognitive load, guide attention, and create emotional connections. The question isn't whether to animate, but how.

In the React ecosystem, two libraries dominate the animation landscape: GSAP (GreenSock Animation Platform) and Framer Motion. Each has distinct strengths, and choosing the right one depends on your use case.`
            },
            {
                type: 'infographic',
                src: '/blog-animation-comparison.png',
                caption: 'GSAP vs Framer Motion: A side-by-side comparison across key metrics'
            },
            {
                type: 'text',
                heading: 'GSAP: The Performance Powerhouse',
                body: `GSAP has been the gold standard for web animation since the Flash era. It's framework-agnostic, battle-tested, and obsessively optimized for performance.

**When to use GSAP:**
• Scroll-triggered animations (ScrollTrigger is best-in-class)
• Complex timelines with precise sequencing
• Animating SVG paths and morph effects
• When you need the absolute best performance
• Canvas and WebGL animations

GSAP shines when you need surgical control over timing. Its timeline API lets you choreograph dozens of animations with frame-perfect precision. The ScrollTrigger plugin is particularly powerful — it can pin elements, trigger animations based on scroll position, and create parallax effects with minimal code.

The trade-off? GSAP is imperative. You're telling the animation engine exactly what to do, step by step. This can feel foreign in a React codebase where everything else is declarative.`
            },
            {
                type: 'code',
                heading: 'GSAP ScrollTrigger Example',
                language: 'jsx',
                body: 'Here\'s how I use GSAP ScrollTrigger for the horizontal scroll section in my portfolio:',
                code: `import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

function HorizontalScroll({ children }) {
  const containerRef = useRef()
  
  useGSAP(() => {
    const slides = gsap.utils.toArray('.slide')
    
    gsap.to(slides, {
      xPercent: -100 * (slides.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (slides.length - 1),
        end: () => '+=' + 
          containerRef.current.offsetWidth,
      },
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef}>
      {children}
    </div>
  )
}`
            },
            {
                type: 'text',
                heading: 'Framer Motion: The React-Native Choice',
                body: `Framer Motion was built specifically for React. Its API is declarative — you describe the desired state, and the library figures out how to get there. This makes it feel incredibly natural in a React codebase.

**When to use Framer Motion:**
• Component mount/unmount animations (AnimatePresence)
• Gesture-driven interactions (drag, hover, tap)
• Layout animations (when elements reflow)
• Shared layout transitions between routes
• When you want spring physics without thinking about durations

Framer Motion's killer feature is AnimatePresence — it can animate components as they mount and unmount from the DOM. This is notoriously difficult to do well, and Framer Motion makes it effortless. Just wrap your conditional renders and specify exit animations.

The spring-based animation model also deserves praise. Instead of specifying durations and easing curves, you define physical properties like stiffness and damping. The result feels more natural because it mimics real-world physics.`
            },
            {
                type: 'code',
                heading: 'Framer Motion AnimatePresence',
                language: 'jsx',
                body: 'Here\'s the role cycler animation from my hero section, using AnimatePresence for smooth text transitions:',
                code: `import { motion, AnimatePresence } from 'framer-motion'

function RoleCycler({ roles }) {
  const [index, setIndex] = useState(0)
  
  useEffect(() => {
    const timer = setInterval(
      () => setIndex(i => (i + 1) % roles.length),
      2800
    )
    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        initial={{ y: '110%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '-110%', opacity: 0 }}
        transition={{
          duration: 0.42,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        {roles[index]}
      </motion.span>
    </AnimatePresence>
  )
}`
            },
            {
                type: 'text',
                heading: 'My Recommendation: Use Both',
                body: `After years of building animated interfaces, here's my honest take: **use both libraries together.**

I use **GSAP** for:
• All scroll-triggered animations and parallax effects
• Complex multi-step timelines (like entrance sequences)
• SVG animations and path morphing
• Anything that needs to be frame-perfect

I use **Framer Motion** for:
• Component-level animations (hover, tap, entrance/exit)
• Spring-based micro-interactions
• Layout transitions when elements reorder
• Drag and gesture handling

This isn't a compromise — it's the optimal strategy. Each library does certain things better than the other. Using both gives you the best possible animation toolkit for your React applications.

The key is consistency: define your animation language (timing, easing, spring config) once, and use it across both libraries so the entire interface feels cohesive.`
            }
        ]
    },
    2: {
        title: 'Designing Portfolio Sites That Actually Get You Hired',
        date: 'Dec 2023',
        readTime: '5 min read',
        heroImage: '/blog-portfolio-checklist.png',
        sections: [
            {
                type: 'text',
                heading: 'The Hard Truth About Developer Portfolios',
                body: `I've reviewed hundreds of developer portfolios — my own included — and I've noticed a pattern: most of them are beautiful but ineffective. They showcase technical skill but fail at their primary job: convincing someone to hire you.

The best portfolios aren't the most technically impressive ones. They're the ones that clearly communicate who you are, what you can do, and why someone should work with you. Everything else — the animations, the 3D effects, the creative interactions — should serve this goal.

Here's what I've learned about building portfolios that actually work.`
            },
            {
                type: 'text',
                heading: 'Rule 1: First Impressions Are Everything',
                body: `Recruiters spend an average of 6–10 seconds on a portfolio before deciding whether to explore further. Your hero section needs to communicate three things instantly:

**1. Your name** — Sounds obvious, but I've seen portfolios where the developer's name is hidden behind an animation or buried in small text.

**2. What you do** — "Frontend Developer" or "Full-Stack Engineer" — make it immediately clear. Don't use clever titles like "Digital Craftsman" if a recruiter won't understand what that means.

**3. Social proof** — A company name, a client logo, or even a project count. Something that says "I'm credible" within those first 6 seconds.

Everything else in the hero — the gradient backgrounds, the 3D scenes, the particle effects — exists to create an emotional reaction. They should make the visitor think "this person clearly knows what they're doing." But they should never come at the expense of clarity.`
            },
            {
                type: 'infographic',
                src: '/blog-portfolio-checklist.png',
                caption: 'The essential checklist for portfolio design: responsiveness, performance, interactivity, typography, color, and accessibility'
            },
            {
                type: 'text',
                heading: 'Rule 2: Projects > Features',
                body: `The biggest mistake developers make is listing features instead of telling stories. Don't say "Built with React and Node.js." Say "Reduced page load times by 60% by implementing server-side rendering and lazy loading, resulting in a 25% increase in user engagement."

For each project, answer these questions:
• **What was the problem?** — Context the viewer can relate to
• **What did you build?** — Your specific contribution, not just the tech stack
• **What was the outcome?** — Metrics, user feedback, or business impact
• **What did you learn?** — Shows growth mindset and self-awareness

This is exactly why I added case study modals to my own portfolio. Clicking "View Case Study" on any project reveals the full story — the problem, the approach, and the measurable results. This format is borrowed from design agencies, and it works incredibly well for developers too.`
            },
            {
                type: 'text',
                heading: 'Rule 3: Performance IS the Portfolio',
                body: `If your portfolio site takes 5 seconds to load, you've already lost. A slow portfolio tells recruiters two things: you don't optimize your code, and you don't respect their time. Both are red flags.

Here's my performance checklist:

• **Lighthouse Score > 90** on all four metrics (Performance, Accessibility, Best Practices, SEO)
• **First Contentful Paint < 1.5s** — Use code splitting, lazy loading, and optimized assets
• **Largest Contentful Paint < 2.5s** — Compress images, use modern formats (WebP, AVIF)
• **Cumulative Layout Shift < 0.1** — Define explicit dimensions for images and dynamic content
• **Total Bundle Size < 500KB** (gzipped) — This is the single most impactful optimization

For my own portfolio, I use Vite's manual chunk splitting to separate vendor libraries (Three.js, Framer Motion) from application code. This means returning visitors only re-download the code that changed, not the entire bundle.`
            },
            {
                type: 'code',
                heading: 'Vite Chunk Splitting Strategy',
                language: 'javascript',
                body: 'Here\'s the exact Vite config I use to keep my portfolio\'s bundle lean:',
                code: `// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-three': [
            'three',
            '@react-three/fiber',
            '@react-three/drei'
          ],
          'vendor-motion': [
            'framer-motion'
          ],
          'vendor-ui': [
            'lucide-react',
            'gsap'
          ],
        },
      },
    },
  },
})`
            },
            {
                type: 'text',
                heading: 'Rule 4: Mobile is Non-Negotiable',
                body: `Over 50% of web traffic is mobile. If your portfolio breaks on a phone, half your audience sees a broken product. That's unacceptable for someone claiming to be a frontend developer.

Mobile optimization isn't just about responsive layouts. It's about:

• **Touch targets** — Buttons should be at least 48px tall
• **Font sizes** — Never smaller than 14px for body text
• **Hover alternatives** — Touch devices don't have hover states; design for tap interactions
• **Performance** — Mobile devices have less processing power; reduce particle counts and disable heavy animations
• **Orientation** — Test both portrait and landscape modes

I test my portfolio on at least 3 real devices before every deploy: an iPhone (Safari), an Android phone (Chrome), and a tablet (rotation testing).`
            },
            {
                type: 'text',
                heading: 'The Bottom Line',
                body: `Your portfolio is your strongest interview tool. It's the one thing you have complete creative control over, and it works for you 24/7.

Invest in it. Not with the most complex code or the flashiest effects, but with clarity, performance, and genuine craft. Build something you're proud of, something that tells your story, and something that works flawlessly on every device.

That's what gets you hired.`
            }
        ]
    }
};

// ── Blog Post Detail Modal ──────────────────────────────────────────────────
const BlogPostDetail = ({ postIndex, isOpen, onClose, themeColor }) => {
    const overlayRef = useRef(null);
    const scrollRef = useRef(null);
    const post = blogContent[postIndex];

    // Lock body scroll AND Lenis when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isOpen]);

    // Scroll to top when opening
    useEffect(() => {
        if (isOpen && scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [isOpen, postIndex]);

    if (!post) return null;

    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) onClose();
    };

    // Stop scroll events from reaching Lenis / main page
    const stopScrollLeak = (e) => {
        e.stopPropagation();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={overlayRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={handleOverlayClick}
                    className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-6"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.92)', backdropFilter: 'blur(12px)' }}
                    onWheel={stopScrollLeak}
                    onTouchMove={stopScrollLeak}
                >
                    <motion.div
                        ref={scrollRef}
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-3xl h-[100dvh] md:h-[90dvh] md:rounded-2xl overflow-y-auto bg-zinc-950 border-0 md:border md:border-white/10"
                        style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
                    >
                        {/* Top bar */}
                        <div className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-12 py-4 bg-zinc-950/90 backdrop-blur-md border-b border-white/5">
                            <button
                                onClick={onClose}
                                className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors interactive-hover"
                            >
                                <ArrowLeft size={16} /> Back
                            </button>
                            <div className="flex items-center gap-3 text-[11px] font-mono text-gray-600">
                                <span className="flex items-center gap-1"><Calendar size={11} />{post.date}</span>
                                <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                            </div>
                        </div>

                        {/* Hero image */}
                        <div className="relative w-full aspect-[16/9] bg-zinc-900 overflow-hidden">
                            <img
                                src={post.heroImage}
                                alt={post.title}
                                className="w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                        </div>

                        {/* Title */}
                        <div className="px-6 md:px-12 -mt-16 relative z-10 mb-10">
                            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-white">
                                {post.title}
                            </h1>
                        </div>

                        {/* Content sections */}
                        <div className="px-6 md:px-12 pb-16 space-y-10">
                            {post.sections.map((section, i) => {
                                if (section.type === 'text') {
                                    return (
                                        <div key={i}>
                                            <h2
                                                className="text-lg md:text-xl font-bold mb-4"
                                                style={{ color: themeColor }}
                                            >
                                                {section.heading}
                                            </h2>
                                            <div className="text-gray-400 leading-[1.8] text-sm md:text-base whitespace-pre-line">
                                                {section.body.split('**').map((part, j) =>
                                                    j % 2 === 0
                                                        ? <span key={j}>{part}</span>
                                                        : <strong key={j} className="text-white font-semibold">{part}</strong>
                                                )}
                                            </div>
                                        </div>
                                    );
                                }

                                if (section.type === 'infographic') {
                                    return (
                                        <figure key={i} className="my-8">
                                            <div className="rounded-xl overflow-hidden border border-white/10">
                                                <img
                                                    src={section.src}
                                                    alt={section.caption}
                                                    className="w-full"
                                                />
                                            </div>
                                            <figcaption className="text-xs text-gray-600 text-center mt-3 font-mono">
                                                {section.caption}
                                            </figcaption>
                                        </figure>
                                    );
                                }

                                if (section.type === 'code') {
                                    return (
                                        <div key={i}>
                                            <h2
                                                className="text-lg md:text-xl font-bold mb-3"
                                                style={{ color: themeColor }}
                                            >
                                                {section.heading}
                                            </h2>
                                            <p className="text-gray-400 text-sm md:text-base mb-4 leading-relaxed">{section.body}</p>
                                            <div className="rounded-xl overflow-hidden border border-white/10 bg-zinc-900">
                                                <div className="flex items-center gap-1.5 px-4 py-2.5 bg-zinc-800/50 border-b border-white/5">
                                                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                                                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                                                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                                                    <span className="ml-3 text-[10px] font-mono text-gray-600">{section.language}</span>
                                                </div>
                                                <pre className="p-4 md:p-6 overflow-x-auto text-xs md:text-sm leading-relaxed">
                                                    <code className="text-gray-300 font-mono">{section.code}</code>
                                                </pre>
                                            </div>
                                        </div>
                                    );
                                }

                                return null;
                            })}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BlogPostDetail;
