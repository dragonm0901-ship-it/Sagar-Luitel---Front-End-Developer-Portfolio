import React, { useRef, useEffect } from 'react';

/**
 * AdvancedHeroCanvas – Dotted Grid with Connection Web
 *
 * • A perfectly even grid of small white dots.
 * • On hover: dots near the cursor spring-repel outward.
 * • Constellation lines draw between every pair of displaced
 *   dots that are within CONNECTION_DIST of each other,
 *   fading in with opacity proportional to both dots' proximity
 *   to the cursor — creating a living web / circuit effect.
 */
const AdvancedHeroCanvas = ({ themeColor = '#ccff00' }) => {
    const canvasRef = useRef(null);
    const rafRef    = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const dpr  = Math.min(window.devicePixelRatio || 1, 2);

        // ── Config ───────────────────────────────────────────────────
        const isMobile = () => window.innerWidth < 768;
        const GAP            = () => isMobile() ? 32 : 40;   // grid spacing
        const DOT_RADIUS     = 1.4;   // fixed dot size — never changes
        const REPULSE_RADIUS = () => isMobile() ? 80 : 120;  // push zone
        const CONNECTION_DIST = () => isMobile() ? 70 : 100; // max line length
        const STIFFNESS      = 0.08;
        const DAMPING        = 0.76;
        const PUSH_STRENGTH  = () => isMobile() ? 12 : 20;



        // ── State ────────────────────────────────────────────────────
        let dots = [];
        let w = 0, h = 0;

        const buildGrid = () => {
            const parent = canvas.parentElement;
            const rect   = parent.getBoundingClientRect();
            w = rect.width;
            h = rect.height;

            canvas.width  = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            canvas.style.width  = w + 'px';
            canvas.style.height = h + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const gap = GAP();
            const cols = Math.ceil(w / gap);
            const rows = Math.ceil(h / gap);
            const offX = (w % gap) / 2;
            const offY = (h % gap) / 2;

            dots = [];
            for (let r = 0; r <= rows; r++) {
                for (let c = 0; c <= cols; c++) {
                    const ox = offX + c * gap;
                    const oy = offY + r * gap;
                    dots.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0, prox: 0 });
                }
            }
        };

        // ── Pointer ──────────────────────────────────────────────────
        const mouse = { x: -9999, y: -9999, active: false };

        const toLocal = (e) => {
            const rect = canvas.getBoundingClientRect();
            const src  = e.touches ? e.touches[0] : e;
            return { x: src.clientX - rect.left, y: src.clientY - rect.top };
        };


        const onLeave = ()  => { mouse.active = false; mouse.x = -9999; mouse.y = -9999; };
        const onTouch = (e) => { const p = toLocal(e); mouse.x = p.x; mouse.y = p.y; mouse.active = true; };
        const onTEnd  = ()  => onLeave();

        // Use the window for mousemove so the web stays alive while
        // the user moves over the hero text (which sits on top of the canvas).
        const onWindowMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            // Only track when physically over the hero section
            if (
                e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top  && e.clientY <= rect.bottom
            ) {
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
                mouse.active = true;
            } else {
                mouse.active = false;
                mouse.x = -9999;
                mouse.y = -9999;
            }
        };

        window.addEventListener('mousemove', onWindowMove, { passive: true });
        canvas.addEventListener('mouseleave',  onLeave);
        canvas.addEventListener('touchmove',   onTouch, { passive: true });
        canvas.addEventListener('touchend',    onTEnd);
        canvas.addEventListener('touchcancel', onTEnd);

        // ── Draw ─────────────────────────────────────────────────────
        const draw = () => {
            ctx.clearRect(0, 0, w, h);

            const rRadius  = REPULSE_RADIUS();
            const cDist    = CONNECTION_DIST();
            const pStrength = PUSH_STRENGTH();

            // ── 1. Physics pass – update every dot ──────────────────
            for (let i = 0; i < dots.length; i++) {
                const d = dots[i];

                const dx   = d.x - mouse.x;
                const dy   = d.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (mouse.active && dist < rRadius && dist > 0) {
                    const force = (1 - dist / rRadius);
                    d.vx += (dx / dist) * force * pStrength;
                    d.vy += (dy / dist) * force * pStrength;
                }

                // Spring restore
                d.vx += (d.ox - d.x) * STIFFNESS;
                d.vy += (d.oy - d.y) * STIFFNESS;
                d.vx *= DAMPING;
                d.vy *= DAMPING;
                d.x  += d.vx;
                d.y  += d.vy;

                // Displacement-based proximity (drives line + dot colour)
                const disp = Math.sqrt((d.x - d.ox) ** 2 + (d.y - d.oy) ** 2);
                d.prox = Math.min(disp / 14, 1); // normalise; 14px disp = full activation
            }

            // ── 2. Connection Web lines ──────────────────────────────
            // Only iterate over dots that are meaningfully displaced
            const active = dots.filter(d => d.prox > 0.05);

            for (let i = 0; i < active.length; i++) {
                for (let j = i + 1; j < active.length; j++) {
                    const a = active[i];
                    const b = active[j];

                    const ldx = a.x - b.x;
                    const ldy = a.y - b.y;
                    const len = Math.sqrt(ldx * ldx + ldy * ldy);

                    if (len > cDist) continue;

                    // Line fades purely by distance + activation — always white
                    const lineFade   = 1 - len / cDist;
                    const activation = Math.min(a.prox, b.prox);
                    const lineAlpha  = lineFade * activation * 0.55;

                    if (lineAlpha < 0.01) continue;

                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(255,255,255,${lineAlpha})`;
                    ctx.lineWidth   = 0.7;
                    ctx.stroke();
                }
            }

            // ── 3. Dots (drawn on top of lines) — fixed size, pure white ──
            for (let i = 0; i < dots.length; i++) {
                const d = dots[i];
                // Slightly brighter when displaced but never change colour or size
                const alpha = 0.18 + d.prox * 0.45;

                ctx.beginPath();
                ctx.arc(d.x, d.y, DOT_RADIUS, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${alpha})`;
                ctx.fill();
            }

            rafRef.current = requestAnimationFrame(draw);
        };

        // ── Init ─────────────────────────────────────────────────────
        buildGrid();
        draw();

        const onResize = () => buildGrid();
        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('mousemove',   onWindowMove);
            window.removeEventListener('resize',      onResize);
            canvas.removeEventListener('mouseleave',  onLeave);
            canvas.removeEventListener('touchmove',   onTouch);
            canvas.removeEventListener('touchend',    onTEnd);
            canvas.removeEventListener('touchcancel', onTEnd);
        };
    }, [themeColor]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full z-[1] pointer-events-none"
            style={{ touchAction: 'none' }}
        />
    );
};

export default AdvancedHeroCanvas;
