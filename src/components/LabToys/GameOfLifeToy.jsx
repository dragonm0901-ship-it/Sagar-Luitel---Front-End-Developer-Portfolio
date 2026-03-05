import React, { useRef, useEffect, useState } from 'react';

const GameOfLifeToy = ({ themeColor = "#00ffcc" }) => {
    const canvasRef = useRef(null);
    const [isPlaying] = useState(true);
    const [cellSize] = useState(8);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: false });
        let animationFrameId;
        
        // Setup Grid
        let width = canvas.parentElement.clientWidth;
        let height = canvas.parentElement.clientHeight;
        canvas.width = width;
        canvas.height = height;

        let cols = Math.floor(width / cellSize);
        let rows = Math.floor(height / cellSize);

        // Grid Initialization (Double Buffer approach)
        let grid = new Array(cols).fill(null).map(() => new Array(rows).fill(0));
        let nextGrid = new Array(cols).fill(null).map(() => new Array(rows).fill(0));

        // Random Seed
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j] = Math.random() > 0.85 ? 1 : 0;
            }
        }

        // Interaction State
        let isDrawing = false;
        let lastInteractionTime = Date.now();

        const countNeighbors = (grid, x, y) => {
            let sum = 0;
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    // Wrap around edges (Toroidal array)
                    const col = (x + i + cols) % cols;
                    const row = (y + j + rows) % rows;
                    sum += grid[col][row];
                }
            }
            sum -= grid[x][y];
            return sum;
        };

        const updateGrid = () => {
             // Calculate Next State
             for (let i = 0; i < cols; i++) {
                 for (let j = 0; j < rows; j++) {
                     const state = grid[i][j];
                     const neighbors = countNeighbors(grid, i, j);

                     if (state === 0 && neighbors === 3) {
                         nextGrid[i][j] = 1; // Reproduction
                     } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                         nextGrid[i][j] = 0; // Overpopulation / Underpopulation
                     } else {
                         nextGrid[i][j] = state; // Stasis
                     }
                 }
             }

             // Swap buffers
             let temp = grid;
             grid = nextGrid;
             nextGrid = temp;
        };

        const drawGrid = () => {
             // Solid fast background
             ctx.fillStyle = '#050508';
             ctx.fillRect(0, 0, width, height);

             ctx.fillStyle = themeColor;
             
             for (let i = 0; i < cols; i++) {
                 for (let j = 0; j < rows; j++) {
                     if (grid[i][j] === 1) {
                         ctx.fillRect(i * cellSize, j * cellSize, cellSize - 1, cellSize - 1);
                     }
                 }
             }

             // Draw gentle overlay grid for aesthetics
             ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
             ctx.lineWidth = 1;
             ctx.beginPath();
             for(let i = 0; i <= cols; i++) {
                 ctx.moveTo(i * cellSize, 0);
                 ctx.lineTo(i * cellSize, height);
             }
             for(let j = 0; j <= rows; j++) {
                 ctx.moveTo(0, j * cellSize);
                 ctx.lineTo(width, j * cellSize);
             }
             ctx.stroke();
        };

        // Event Handlers for UI overriding the simulation
        const handleInteraction = (event) => {
             const rect = canvas.getBoundingClientRect();
             const x = Math.floor((event.clientX - rect.left) / cellSize);
             const y = Math.floor((event.clientY - rect.top) / cellSize);
             
             if (x >= 0 && x < cols && y >= 0 && y < rows) {
                 grid[x][y] = 1; // Draw life
                 
                 // Introduce some "chaos" around the brush
                 for(let i=-2; i<=2; i++){
                    for(let j=-2; j<=2; j++){
                        if (Math.random() > 0.5) {
                            const col = (x + i + cols) % cols;
                            const row = (y + j + rows) % rows;
                            grid[col][row] = 1;
                        }
                    }
                 }
             }
             lastInteractionTime = Date.now();
        };

        const handleMouseDown = (e) => { isDrawing = true; handleInteraction(e); };
        const handleMouseUp = () => { isDrawing = false; };
        const handleMouseMove = (e) => { if (isDrawing) handleInteraction(e); };
        
        canvas.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mousemove', handleMouseMove);

        let lastFrameTime = 0;
        const fpsInterval = 1000 / 15; // Limit logic updates to 15 FPS for that chunky retro feel

        const animate = (timestamp) => {
            animationFrameId = requestAnimationFrame(animate);
            
            const elapsed = timestamp - lastFrameTime;

            // Only update logic and draw at our specific tick rate unless we're actively drawing
            if (elapsed > fpsInterval || isDrawing) {
                lastFrameTime = timestamp - (elapsed % fpsInterval);
                
                // If not drawing, and the simulation is mostly dead, reseed slightly
                if(Date.now() - lastInteractionTime > 5000 && Math.random() < 0.05) {
                     const rx = Math.floor(Math.random() * cols);
                     const ry = Math.floor(Math.random() * rows);
                     grid[rx][ry] = 1;
                     grid[(rx+1)%cols][ry] = 1;
                     grid[rx][(ry+1)%rows] = 1;
                     grid[(rx+1)%cols][(ry+1)%rows] = 1;
                }

                if (isPlaying && !isDrawing) {
                     updateGrid();
                }
                
                drawGrid();
            }
        };

        // Start Loop
        animationFrameId = requestAnimationFrame(animate);

        // Handle Resizing gracefully
        const handleResize = () => {
             width = canvas.parentElement.clientWidth;
             height = canvas.parentElement.clientHeight;
             canvas.width = width;
             canvas.height = height;
             
             const oldCols = cols;
             const oldRows = rows;
             
             cols = Math.floor(width / cellSize);
             rows = Math.floor(height / cellSize);
             
             // Create new appropriately sized grids
             const newGrid = new Array(cols).fill(null).map(() => new Array(rows).fill(0));
             nextGrid = new Array(cols).fill(null).map(() => new Array(rows).fill(0));
             
             // Copy old data into new grid bounds
             for (let i = 0; i < Math.min(oldCols, cols); i++) {
                 for (let j = 0; j < Math.min(oldRows, rows); j++) {
                     newGrid[i][j] = grid[i][j];
                 }
             }
             grid = newGrid;
             drawGrid();
        };
        
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [themeColor, isPlaying, cellSize]);

    return (
        <div className="w-full h-full relative group">
            <canvas 
                ref={canvasRef} 
                className="block cursor-crosshair"
                style={{ imageRendering: 'pixelated' }}
            />
            
            <div className="absolute top-8 left-8 p-4 z-10 pointer-events-none">
                 <p className="font-mono text-[10px] uppercase tracking-widest text-white/50 bg-black/50 p-2 px-4 rounded-full backdrop-blur inline-block border border-white/5 mb-2">
                    Conway's Game of Life
                 </p>
                 <p className="block font-mono text-[10px] text-white/40 max-w-[200px]">
                    Click & drag to spray living cells. The grid evolves automatically based on overpopulation and reproduction rules.
                 </p>
            </div>
        </div>
    );
};

export const gameOfLifeCodeSnippet = `// Conway's Game of Life (Logic Sample)
const cols = Math.floor(width / cellSize);
const rows = Math.floor(height / cellSize);

const updateGrid = () => {
    // 1. Calculate Next State Buffer
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            const state = grid[x][y];
            const neighbors = countNeighbors(grid, x, y);

            // Conway's Rules
            if (state === 0 && neighbors === 3) {
                // Rule 1: Reproduction
                nextGrid[x][y] = 1; 
            } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                // Rule 2: Under/Overpopulation
                nextGrid[x][y] = 0; 
            } else {
                // Rule 3: Stasis
                nextGrid[x][y] = state; 
            }
        }
    }

    // 2. Swap buffers for next frame
    let temp = grid;
    grid = nextGrid;
    nextGrid = temp;
};`;

export default GameOfLifeToy;
