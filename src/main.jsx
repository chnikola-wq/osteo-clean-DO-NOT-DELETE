// Entry point built by Vite. The original app was authored as a single
// inline <script type="text/babel"> block in index.html, using global
// React / ReactDOM / katex / marked from CDN <script> tags. We re-expose
// those as window globals here so the original JSX body keeps working
// unchanged after pre-compilation by Vite/esbuild.
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as katex from 'katex';
import 'katex/dist/katex.min.css';
import { marked } from 'marked';
import './index.css';

if (typeof window !== 'undefined') {
    window.React = React;
    // The original code calls ReactDOM.createRoot, which lives on
    // react-dom/client in React 18+. The UMD build it used to load
    // exposed createRoot directly on ReactDOM, so mirror that.
    window.ReactDOM = ReactDOM;
    window.katex = katex.default ?? katex;
    window.marked = marked;
}

        const { useState, useEffect, useMemo, useRef } = React;

        // --- ICONS (Inline SVGs) ---
        const IconSettings = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1-1-1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
        const IconSun = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>;
        const IconMoon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>;
        const IconActivity = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
        const IconShield = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
        const IconGitMerge = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></svg>;
        const IconTrendingUp = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
        const IconBookOpen = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
        const IconLayers = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
        const IconCpu = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>;

        // --- COMPONENTS ---
        const Latex = ({ math }) => {
            const html = useMemo(() => {
                try { return window.katex ? window.katex.renderToString(math, { throwOnError: false }) : math; } 
                catch (e) { return e.message; }
            }, [math]);
            return <span dangerouslySetInnerHTML={{ __html: html }} className="inline-block font-serif text-[1.05em] leading-normal" />;
        };

        // Renders a chat message with full Markdown formatting AND LaTeX math.
        // Strategy:
        //   1. Replace all $$...$$ and $...$ spans with unique placeholder tokens
        //      so the Markdown parser cannot mangle the LaTeX.
        //   2. Parse the remaining text through marked.js to get an HTML string.
        //   3. Replace each placeholder token with KaTeX-rendered HTML.
        //   4. Set the result as dangerouslySetInnerHTML inside a prose wrapper.
        const MathMessage = ({ content, isUser }) => {
            const html = useMemo(() => {
                if (!content) return '';

                // Step 1 — extract LaTeX tokens
                const tokens = [];
                const tokenize = (src) => {
                    let s = src;
                    // Display math $$...$$
                    s = s.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
                        const idx = tokens.length;
                        tokens.push({ math, display: true });
                        return `\x00MATH${idx}\x00`;
                    });
                    // Inline math $...$
                    s = s.replace(/\$((?:[^$\n]|\\\$)+?)\$/g, (_, math) => {
                        const idx = tokens.length;
                        tokens.push({ math, display: false });
                        return `\x00MATH${idx}\x00`;
                    });
                    return s;
                };

                let processed = tokenize(content);

                // Step 2 — Markdown → HTML
                let rendered = processed;
                if (window.marked) {
                    try {
                        rendered = window.marked.parse(processed, { breaks: true, gfm: true });
                    } catch (e) {
                        rendered = processed;
                    }
                } else {
                    // Fallback: wrap in a paragraph
                    rendered = `<p>${processed.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`;
                }

                // Step 3 — restore KaTeX
                rendered = rendered.replace(/\x00MATH(\d+)\x00/g, (_, idxStr) => {
                    const { math, display } = tokens[Number(idxStr)];
                    if (!window.katex) return math;
                    try {
                        return window.katex.renderToString(math, { throwOnError: false, displayMode: display });
                    } catch (e) {
                        return math;
                    }
                });

                return rendered;
            }, [content]);

            return (
                <div
                    className={isUser ? '' : 'chat-prose'}
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            );
        };

        // Dynamic Bound Helper for scaling axes neatly
        const getDynamicBounds = (min, max) => {
            const range = max - min;
            const pad = range === 0 ? max * 0.1 : range * 0.15;
            let lower = min - pad;
            let upper = max + pad;
            
            if (min >= 0 && range / max > 0.4) {
                lower = 0;
                upper = max * 1.1;
            }
            return { lower, upper };
        };

        // --- MATH TOGGLE HELPER ---
        const MathToggle = ({ children, label }) => {
            const [open, setOpen] = React.useState(false);
            const showText = label || 'See the math';
            const hideText = label ? `Hide ${label.replace(/^see\s+/i, '').replace(/^show\s+/i, '')}` : 'Hide the math';
            return (
                <div>
                    <button
                        onClick={() => setOpen(o => !o)}
                        className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 px-3 py-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors mt-2"
                    >
                        {open ? `▲ ${hideText}` : `▼ ${showText}`}
                    </button>
                    {open && <div className="fade-in mt-2">{children}</div>}
                </div>
            );
        };

        // --- WIDGET 1: THE MATERIAL PARADOX (Changing 'n') ---
        const ParadoxInteractiveGraph = () => {
            const boneE = 18.0;
            const tiE = 114.5;
            const steelE = 187.5;
            
            const nTi = tiE / boneE; // ~6.36
            const nSteel = steelE / boneE; // ~10.42

            const [nValue, setNValue] = useState(nTi); 
            const [isDragging, setIsDragging] = useState(false);
            const [showMath, setShowMath] = useState(false);
            const [showParams, setShowParams] = useState(false);
            
            const sliderRef = useRef(null);
            const svgRef = useRef(null);
            
            // Physical constants for the model (Scaled down to realistic medium dog)
            const D = 10; 
            const A_p = 30; const I_p = 25; 
            const A_b = 150; const I_b = 10000; 
            const Moment = 10000; 
            const plateHalfWidth = 1.5; 
            
            const minN = 5.0; 
            const maxN = 12.0;

            // Physics Functions
            const getDPlate = (n) => (A_b * D) / (n * A_p + A_b);

            const getAMI = (n) => {
                const dp = getDPlate(n);
                const db = D - dp;
                return n * (I_p + A_p * Math.pow(dp, 2)) + (I_b + A_b * Math.pow(db, 2));
            };

            const getStress = (n) => {
                const dp = getDPlate(n);
                const y = dp + plateHalfWidth; 
                return (n * Moment * y) / getAMI(n);
            };

            // Interactive Drag Handlers
            const handlePointerDown = (e, ref, isSvgContext) => {
                setIsDragging(true);
                e.currentTarget.setPointerCapture(e.pointerId);
                updateNFromEvent(e, ref, isSvgContext);
            };

            const handlePointerMove = (e, ref, isSvgContext) => {
                if (!isDragging) return;
                updateNFromEvent(e, ref, isSvgContext);
            };

            const handlePointerUp = (e) => {
                setIsDragging(false);
                e.currentTarget.releasePointerCapture(e.pointerId);
            };

            const updateNFromEvent = (e, ref, isSvgContext) => {
                if (!ref.current) return;
                const rect = ref.current.getBoundingClientRect();
                let x = e.clientX - rect.left;
                let percent;

                if (isSvgContext) {
                    const scaleX = 500 / rect.width; 
                    let svgX = x * scaleX;
                    if (svgX < 50) svgX = 50;
                    if (svgX > 450) svgX = 450;
                    percent = (svgX - 50) / 400;
                } else {
                    percent = x / rect.width;
                    if (percent < 0) percent = 0;
                    if (percent > 1) percent = 1;
                }

                let newN = minN + (maxN - minN) * percent; 
                setNValue(Math.round(newN * 100) / 100);
            };

            // Pre-calculate path data and dynamically scale Y-axes
            const pointsData = [];
            for (let n = minN; n <= maxN; n += 0.2) {
                pointsData.push({ n, ami: getAMI(n), stress: getStress(n) });
            }

            const amiBounds = getDynamicBounds(Math.min(...pointsData.map(p => p.ami)), Math.max(...pointsData.map(p => p.ami)));
            const stressBounds = getDynamicBounds(Math.min(...pointsData.map(p => p.stress)), Math.max(...pointsData.map(p => p.stress)));

            // SVG Mapping
            const mapX = (n) => 50 + ((n - minN) / (maxN - minN)) * 400; 
            const mapAMI_Y = (ami) => 460 - ((ami - amiBounds.lower) / (amiBounds.upper - amiBounds.lower)) * 150; 
            const mapStress_Y = (stress) => 740 - ((stress - stressBounds.lower) / (stressBounds.upper - stressBounds.lower)) * 150; 

            const pathAMI = pointsData.map(p => `${mapX(p.n)},${mapAMI_Y(p.ami)}`).join(" L ");
            const pathStress = pointsData.map(p => `${mapX(p.n)},${mapStress_Y(p.stress)}`).join(" L ");

            const currentDp = getDPlate(nValue);
            const currentDb = D - currentDp;
            const currentAMI = getAMI(nValue);
            const currentStress = getStress(nValue);
            
            const crossSectionX_dp = 50 + (currentDp / D) * 400;

            const formatNum = (num) => Math.round(num).toLocaleString();
            const dp_str = currentDp.toFixed(1);
            const db_str = currentDb.toFixed(1);
            const y_str = (currentDp + plateHalfWidth).toFixed(1);
            
            const plateTerm = I_p + A_p * Math.pow(currentDp, 2);
            const boneTerm = I_b + A_b * Math.pow(currentDb, 2);
            
            const mathAMI = `\\text{AMI} = \\underbrace{\\textcolor{#d97706}{\\mathbf{n(${nValue.toFixed(1)})}} \\cdot [${I_p} + ${A_p}(${dp_str})^2]}_{\\text{Plate: } ${formatNum(nValue * plateTerm)}} + \\underbrace{[${formatNum(I_b)} + ${A_b}(${db_str})^2]}_{\\text{Bone: } ${formatNum(boneTerm)}} = \\mathbf{${formatNum(currentAMI)}\\,\\mathrm{mm}^4}`;
            const mathStress = `\\sigma = \\frac{\\textcolor{#d97706}{\\mathbf{n(${nValue.toFixed(1)})}} \\cdot 10,000 \\cdot ${y_str}}{${formatNum(currentAMI)}} = \\mathbf{${currentStress.toFixed(1)}\\,\\mathrm{MPa}}`;

            const xTi = mapX(nTi);
            const xSteel = mapX(nSteel);

            return (
                <div className="bg-slate-50 dark:bg-slate-900 p-4 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm fade-in mt-6">
                    <div className="flex justify-start mb-3">
                        <button
                            onClick={() => setShowParams(o => !o)}
                            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                        >
                            <span className={`inline-block transition-transform duration-200 ${showParams ? 'rotate-90' : ''}`}>▶</span>
                            {showParams ? 'See less' : 'See more (change material)'}
                        </button>
                    </div>
                    {showParams && <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                        <div><strong className="block text-slate-800 dark:text-slate-100 mb-1 border-b border-slate-200 dark:border-slate-700 pb-1">Plate Geometry</strong> A_p = {A_p} mm²<br/>I_p = {I_p} mm⁴<br/>Half-width = {plateHalfWidth} mm</div>
                        <div><strong className="block text-slate-800 dark:text-slate-100 mb-1 border-b border-slate-200 dark:border-slate-700 pb-1">Bone Geometry</strong> A_b = {A_b} mm²<br/>I_b = {formatNum(I_b)} mm⁴</div>
                        <div><strong className="block text-slate-800 dark:text-slate-100 mb-1 border-b border-slate-200 dark:border-slate-700 pb-1">System Parameters</strong> Moment (M) = 10,000 N·mm<br/>Total Dist (D) = {D} mm</div>
                        <div><strong className="block text-slate-800 dark:text-slate-100 mb-1 border-b border-slate-200 dark:border-slate-700 pb-1">Transformed Base</strong> <span className="text-[10px]">n = E_implant / E_bone</span><br/>Ti Alloy (114.5 GPa) → n ≈ {nTi.toFixed(1)}<br/>Steel (187.5 GPa) → n ≈ {nSteel.toFixed(1)}</div>
                    </div>}

                    <div className="mb-8 border-b border-slate-200 dark:border-slate-700 pb-8">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                Set Modular Ratio (<Latex math={'n = E_{implant} / E_{bone}'} />)
                            </label>
                            <div className="flex space-x-2">
                                <button onClick={() => setNValue(nTi)} className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm border ${Math.abs(nValue - nTi) < 0.1 ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                                    Ti Alloy (n≈{nTi.toFixed(1)})
                                </button>
                                <button onClick={() => setNValue(nSteel)} className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm border ${Math.abs(nValue - nSteel) < 0.1 ? 'bg-rose-500 text-white border-rose-600' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                                    Steel (n≈{nSteel.toFixed(1)})
                                </button>
                            </div>
                        </div>
                        
                        <div className="relative w-full flex flex-col items-center justify-center pt-2 select-none">
                            <div 
                                className="relative w-full h-10 flex items-center cursor-ew-resize z-10"
                                style={{ touchAction: 'none' }}
                                ref={sliderRef}
                                onPointerDown={(e) => handlePointerDown(e, sliderRef, false)}
                                onPointerMove={(e) => handlePointerMove(e, sliderRef, false)}
                                onPointerUp={handlePointerUp}
                                onPointerCancel={handlePointerUp}
                            >
                                <div className="w-full h-2.5 bg-slate-300 dark:bg-slate-700 rounded-full shadow-inner relative overflow-hidden pointer-events-none">
                                    <div className="absolute top-0 left-0 h-full bg-blue-500" style={{ width: `${((nValue - minN) / (maxN - minN)) * 100}%` }}></div>
                                </div>
                                <div 
                                    className="absolute h-6 w-6 bg-amber-500 rounded-full border-[3px] border-white shadow-md pointer-events-none flex items-center justify-center"
                                    style={{ 
                                        left: `calc(${((nValue - minN) / (maxN - minN)) * 100}% - 12px)`,
                                        transform: isDragging ? 'scale(1.2)' : 'scale(1)',
                                        transition: isDragging ? 'none' : 'transform 0.15s ease-out'
                                    }}
                                >
                                    <div className="h-2 w-0.5 bg-white opacity-50 rounded"></div>
                                </div>
                            </div>
                            <div className="w-full flex justify-between text-[10px] font-bold text-slate-400 px-1 mt-1">
                                <span>Compliant (n={minN.toFixed(1)})</span>
                                <span>Stiff (n={maxN.toFixed(1)})</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative w-full max-w-3xl mx-auto select-none">
                        <div className="flex justify-end mb-2">
                            <button
                                onClick={() => setShowMath(o => !o)}
                                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 px-3 py-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                            >
                                {showMath ? '▲ Hide the math' : '▼ See the math'}
                            </button>
                        </div>
                        <svg viewBox="0 0 500 790" className="w-full h-auto font-sans bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner overflow-visible" style={{ touchAction: 'pan-y' }} ref={svgRef}>
                            
                            <text x="25" y="30" className="fill-slate-800 dark:fill-slate-100 font-bold text-sm">Physical Cross-Section (Axis Shift)</text>
                            
                            <rect x={50 - 15} y="50" width="30" height="60" rx="3" className={`stroke-2 transition-colors duration-300 ${nValue < 8 ? 'fill-emerald-100 stroke-emerald-500 dark:fill-emerald-900/50' : 'fill-rose-100 stroke-rose-500 dark:fill-rose-900/50'}`} />
                            <text x="50" y="130" className="fill-slate-500 text-[8px] font-bold" textAnchor="middle">Plate Axis</text>
                            <line x1="50" y1="40" x2="50" y2="150" className="stroke-slate-300 dark:stroke-slate-600 stroke-dasharray-4 stroke-2" />

                            <ellipse cx="450" cy="80" rx="30" ry="40" className="fill-transparent stroke-slate-300 dark:stroke-slate-700 stroke-dasharray-4 stroke-1" />
                            <ellipse cx="450" cy="80" rx={30 * Math.sqrt(nTi/nValue)} ry={40 * Math.sqrt(nTi/nValue)} className="fill-slate-200 dark:fill-slate-800 stroke-slate-400 stroke-2 transition-all duration-75" />
                            <text x="450" y="140" className="fill-slate-500 text-[8px] font-bold" textAnchor="middle">Bone Axis</text>
                            <line x1="450" y1="40" x2="450" y2="150" className="stroke-slate-300 dark:stroke-slate-600 stroke-dasharray-4 stroke-2" />

                            <line x1="50" y1="150" x2="450" y2="150" className="stroke-slate-300 dark:stroke-slate-700 stroke-1" />
                            <text x="250" y="165" className="fill-slate-400 dark:fill-slate-500 text-[8px] font-bold" textAnchor="middle">Constraint: d_plate + d_bone = Constant Distance ({D}mm)</text>

                            <g className="transition-all duration-75 pointer-events-none">
                                <line x1={crossSectionX_dp} y1="40" x2={crossSectionX_dp} y2="150" className="stroke-amber-500 stroke-2" />
                                <line x1="50" y1="80" x2={crossSectionX_dp} y2="80" className="stroke-blue-500 stroke-2" markerEnd="url(#arrow-blue)" markerStart="url(#arrow-blue-start)" />
                                <text x={50 + (crossSectionX_dp - 50)/2} y="75" className="fill-blue-600 dark:fill-blue-400 text-[8px] font-bold" textAnchor="middle">d_plate</text>
                                <line x1={crossSectionX_dp} y1="80" x2="450" y2="80" className="stroke-indigo-500 stroke-2" markerEnd="url(#arrow-indigo)" markerStart="url(#arrow-indigo-start)" />
                                <text x={crossSectionX_dp + (450 - crossSectionX_dp)/2} y="75" className="fill-indigo-600 dark:fill-indigo-400 text-[8px] font-bold" textAnchor="middle">d_bone</text>
                            </g>

                            <text x="25" y="210" className="fill-slate-800 dark:fill-slate-100 font-bold text-sm">Composite AMI Curve</text>
                            
                            {showMath && <foreignObject x="0" y="220" width="500" height="90">
                                <div className="w-full h-full flex justify-center text-[8.5px] md:text-[10px] text-slate-800 dark:text-slate-200 px-2">
                                    <Latex math={mathAMI} />
                                </div>
                            </foreignObject>}
                            
                            {/* Gridlines & Limits for AMI */}
                            <line x1="50" y1="310" x2="450" y2="310" className="stroke-slate-200 dark:stroke-slate-700 stroke-dasharray-2 stroke-1" />
                            <text x="45" y="313" className="fill-slate-400 dark:fill-slate-500 text-[8px] font-mono" textAnchor="end">{formatNum(amiBounds.upper)}</text>
                            
                            <line x1="50" y1="460" x2="450" y2="460" className="stroke-slate-200 dark:stroke-slate-700 stroke-dasharray-2 stroke-1" />
                            <text x="45" y="463" className="fill-slate-400 dark:fill-slate-500 text-[8px] font-mono" textAnchor="end">{formatNum(amiBounds.lower)}</text>

                            {/* Material Domain Markers */}
                            <line x1={xTi} y1="310" x2={xTi} y2="460" className="stroke-emerald-300 dark:stroke-emerald-800/50 stroke-dasharray-4 stroke-[3px]" />
                            <text x={xTi} y="305" className="fill-emerald-600 dark:fill-emerald-500 text-[8px] font-bold" textAnchor="middle">Ti Alloy (~6.4)</text>

                            <line x1={xSteel} y1="310" x2={xSteel} y2="460" className="stroke-rose-300 dark:stroke-rose-800/50 stroke-dasharray-4 stroke-[3px]" />
                            <text x={xSteel} y="305" className="fill-rose-600 dark:fill-rose-500 text-[8px] font-bold" textAnchor="middle">Steel (~10.4)</text>

                            <line x1="50" y1="310" x2="50" y2="460" className="stroke-slate-300 dark:stroke-slate-700 stroke-2" />
                            <text x="35" y="385" className="fill-blue-600 dark:fill-blue-400 text-[8px] font-bold uppercase tracking-widest" transform="rotate(-90 35 385)" textAnchor="middle">Composite AMI (mm⁴)</text>
                            
                            <line x1="50" y1="460" x2="450" y2="460" className="stroke-slate-400 stroke-2" />
                            <text x="250" y="475" className="fill-slate-500 text-[8px] font-bold" textAnchor="middle">Modular Ratio, n (Dimensionless)</text>

                            <path d={`M ${pathAMI}`} fill="none" className="stroke-blue-500 stroke-[3px]" />

                            {/* Banner & Dot Tooltip for Graph 1 */}
                            <g transform={`translate(${mapX(nValue)}, 0)`} className="transition-all duration-75 pointer-events-none">
                                <line x1="0" y1="310" x2="0" y2="460" className="stroke-amber-500 dark:stroke-amber-500 stroke-[2px] stroke-dasharray-4 opacity-80" />
                                <g transform="translate(-25, 294)">
                                    <rect x="0" y="0" width="50" height="16" rx="3" className="fill-amber-100 dark:fill-amber-900/90 border border-amber-400 dark:border-amber-600 shadow-sm" />
                                    <text x="25" y="11" className="fill-amber-800 dark:fill-amber-200 text-[8px] font-bold" textAnchor="middle">n = {nValue.toFixed(1)}</text>
                                </g>
                                <g transform={`translate(0, ${mapAMI_Y(currentAMI)})`}>
                                    <circle cx="0" cy="0" r="5" className="fill-blue-600 dark:fill-blue-400 stroke-white stroke-2 shadow-lg" />
                                    <rect x="8" y="-10" width="50" height="20" rx="3" className="fill-white dark:fill-slate-800 border border-slate-200 dark:border-slate-600 shadow-sm" />
                                    <text x="12" y="3" className="fill-blue-700 dark:fill-blue-300 text-[8px] font-bold">{formatNum(currentAMI)}</text>
                                </g>
                            </g>

                            <text x="25" y="510" className="fill-slate-800 dark:fill-slate-100 font-bold text-sm">Plate Stress Curve</text>
                            
                            {showMath && <foreignObject x="0" y="525" width="500" height="50">
                                <div className="w-full h-full flex justify-center text-[10px] md:text-xs text-slate-800 dark:text-slate-200 px-2">
                                    <Latex math={mathStress} />
                                </div>
                            </foreignObject>}

                            {/* Gridlines & Limits for Stress */}
                            <line x1="50" y1="590" x2="450" y2="590" className="stroke-slate-200 dark:stroke-slate-700 stroke-dasharray-2 stroke-1" />
                            <text x="45" y="593" className="fill-slate-400 dark:fill-slate-500 text-[8px] font-mono" textAnchor="end">{Math.round(stressBounds.upper)}</text>
                            
                            <line x1="50" y1="740" x2="450" y2="740" className="stroke-slate-200 dark:stroke-slate-700 stroke-dasharray-2 stroke-1" />
                            <text x="45" y="743" className="fill-slate-400 dark:fill-slate-500 text-[8px] font-mono" textAnchor="end">{Math.round(stressBounds.lower)}</text>

                            {/* Material Domain Markers */}
                            <line x1={xTi} y1="590" x2={xTi} y2="740" className="stroke-emerald-300 dark:stroke-emerald-800/50 stroke-dasharray-4 stroke-[3px]" />
                            <text x={xTi} y="585" className="fill-emerald-600 dark:fill-emerald-500 text-[8px] font-bold" textAnchor="middle">Ti Alloy (~6.4)</text>

                            <line x1={xSteel} y1="590" x2={xSteel} y2="740" className="stroke-rose-300 dark:stroke-rose-800/50 stroke-dasharray-4 stroke-[3px]" />
                            <text x={xSteel} y="585" className="fill-rose-600 dark:fill-rose-500 text-[8px] font-bold" textAnchor="middle">Steel (~10.4)</text>

                            <line x1="50" y1="590" x2="50" y2="740" className="stroke-slate-300 dark:stroke-slate-700 stroke-2" />
                            <text x="35" y="665" className="fill-rose-600 dark:fill-rose-400 text-[8px] font-bold uppercase tracking-widest" transform="rotate(-90 35 665)" textAnchor="middle">Plate Stress (MPa = N/mm²)</text>
                            
                            <line x1="50" y1="740" x2="450" y2="740" className="stroke-slate-400 stroke-2" />
                            <text x="250" y="755" className="fill-slate-500 text-[8px] font-bold" textAnchor="middle">Modular Ratio, n (Dimensionless)</text>

                            <path d={`M ${pathStress}`} fill="none" className="stroke-rose-500 stroke-[3px]" />

                            {/* Banner & Dot Tooltip for Graph 2 */}
                            <g transform={`translate(${mapX(nValue)}, 0)`} className="transition-all duration-75 pointer-events-none">
                                <line x1="0" y1="590" x2="0" y2="740" className="stroke-amber-500 dark:stroke-amber-500 stroke-[2px] stroke-dasharray-4 opacity-80" />
                                <g transform="translate(-25, 574)">
                                    <rect x="0" y="0" width="50" height="16" rx="3" className="fill-amber-100 dark:fill-amber-900/90 border border-amber-400 dark:border-amber-600 shadow-sm" />
                                    <text x="25" y="11" className="fill-amber-800 dark:fill-amber-200 text-[8px] font-bold" textAnchor="middle">n = {nValue.toFixed(1)}</text>
                                </g>
                                <g transform={`translate(0, ${mapStress_Y(currentStress)})`}>
                                    <circle cx="0" cy="0" r="5" className="fill-rose-600 dark:fill-rose-400 stroke-white stroke-2 shadow-lg" />
                                    <rect x="8" y="-10" width="45" height="20" rx="3" className="fill-white dark:fill-slate-800 border border-slate-200 dark:border-slate-600 shadow-sm" />
                                    <text x="12" y="3" className="fill-rose-700 dark:fill-rose-300 text-[8px] font-bold">{currentStress.toFixed(1)} MPa</text>
                                </g>
                            </g>

                            <rect 
                                x="50" y="280" width="400" height="470" 
                                fill="transparent" 
                                className="cursor-ew-resize"
                                onPointerDown={(e) => handlePointerDown(e, svgRef, true)}
                                onPointerMove={(e) => handlePointerMove(e, svgRef, true)}
                                onPointerUp={handlePointerUp}
                                onPointerCancel={handlePointerUp}
                            />

                            <defs>
                                <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" className="fill-blue-500" /></marker>
                                <marker id="arrow-blue-start" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" className="fill-blue-500" /></marker>
                                <marker id="arrow-indigo" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" className="fill-indigo-500" /></marker>
                                <marker id="arrow-indigo-start" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" className="fill-indigo-500" /></marker>
                            </defs>
                        </svg>
                    </div>
                </div>
            );
        };

        // --- WIDGET 2: THE GEOMETRIC CONTRAST (Changing Plate Size) ---
        // Vi plate library (name, width w in mm, thickness t in mm)
        // Source: chnikola-wq/osteo-v3.8-DO-NOT-DELETE (viPlatePresets), based on Vi specs & AO standards.
        const viPlateLibraryRaw = [
            { system: "1.0mm / 1.5mm Systems", name: "Vi 1.0mm DCP",                          w: 3.0,  t: 1.0 },
            { system: "1.0mm / 1.5mm Systems", name: "Vi 1.0mm Cuttable",                     w: 3.5,  t: 1.0 },
            { system: "1.0mm / 1.5mm Systems", name: "Vi 1.5mm DCP",                          w: 4.5,  t: 1.0 },
            { system: "1.0mm / 1.5mm Systems", name: "Vi 1.5mm Locking (DLP)",                w: 4.5,  t: 1.2 },
            { system: "1.0mm / 1.5mm Systems", name: "Vi 1.5mm Cuttable (Standard)",          w: 4.0,  t: 1.1 },
            { system: "1.0mm / 1.5mm Systems", name: "Vi 1.5mm Cuttable (Malleable)",         w: 4.3,  t: 1.0 },
            { system: "2.0mm System",          name: "Vi 2.0mm DCP",                          w: 5.0,  t: 1.5 },
            { system: "2.0mm System",          name: "Vi 2.0mm Locking (DLP/Stacked)",        w: 5.0,  t: 1.5 },
            { system: "2.0mm System",          name: "Vi 2.0mm Mini Compression",             w: 5.0,  t: 1.5 },
            { system: "2.0mm System",          name: "Vi 2.0mm Cuttable Broad",               w: 5.5,  t: 1.5 },
            { system: "2.0mm System",          name: "Vi 2.0mm Supracondylar",                w: 5.5,  t: 2.0 },
            { system: "2.4mm System",          name: "Vi 2.4mm LC-DCP",                       w: 6.5,  t: 2.0 },
            { system: "2.4mm System",          name: "Vi 2.4mm Locking (Standard DLP)",       w: 6.5,  t: 2.0 },
            { system: "2.4mm System",          name: "Vi 2.4mm Locking (Thin DLP)",           w: 6.5,  t: 1.7 },
            { system: "2.4mm System",          name: "Vi 2.4mm Cuttable",                     w: 5.5,  t: 1.8 },
            { system: "2.4mm System",          name: "Vi 2.4mm Double Compression Cuttable",  w: 6.5,  t: 1.8 },
            { system: "2.4mm System",          name: "Vi 2.4mm Supracondylar",                w: 6.5,  t: 2.0 },
            { system: "2.7mm System",          name: "Vi 2.7mm DCP / LC-DCP",                 w: 8.0,  t: 2.5 },
            { system: "2.7mm System",          name: "Vi 2.7mm Locking (DLP/Stacked)",        w: 8.0,  t: 2.5 },
            { system: "2.7mm System",          name: "Vi 2.7mm Cuttable",                     w: 6.0,  t: 2.0 },
            { system: "2.7mm System",          name: "Vi 2.0/2.4/2.7mm VCP",                  w: 7.1,  t: 1.2 },
            { system: "2.7mm System",          name: "Vi 2.0/2.4/2.7mm VCP Broad",            w: 7.1,  t: 2.0 },
            { system: "3.5mm System",          name: "Vi 3.5mm Narrow DCP",                   w: 10.5, t: 3.2 },
            { system: "3.5mm System",          name: "Vi 3.5mm Broad DCP",                    w: 12.0, t: 4.2 },
            { system: "3.5mm System",          name: "Vi 3.5mm Locking Narrow",               w: 10.5, t: 3.2 },
            { system: "3.5mm System",          name: "Vi 3.5mm Locking Broad",                w: 12.0, t: 4.2 },
            { system: "3.5mm System",          name: "Vi 2.7/3.5mm Hybrid T-Plate",           w: 9.5,  t: 2.0 },
            { system: "4.5mm System",          name: "Vi 4.5mm Narrow DCP",                   w: 14.0, t: 4.6 },
            { system: "4.5mm System",          name: "Vi 4.5mm Broad DCP",                    w: 16.0, t: 5.2 }
        ];
        // Pre-compute geometry and sort by I_p so the slider sweeps stiffness monotonically.
        const viPlateLibrary = viPlateLibraryRaw
            .map(p => ({ ...p, A_p: p.w * p.t, I_p: (p.w * Math.pow(p.t, 3)) / 12 }))
            .sort((a, b) => a.I_p - b.I_p);

        const PlateSizeInteractiveGraph = () => {
            // Default: pick the implant whose I_p is closest to the original demo value (~25 mm⁴).
            const defaultIdx = (() => {
                let best = 0, bestErr = Infinity;
                viPlateLibrary.forEach((p, i) => {
                    const err = Math.abs(p.I_p - 25);
                    if (err < bestErr) { bestErr = err; best = i; }
                });
                return best;
            })();
            const [implantIdx, setImplantIdx] = useState(defaultIdx);
            const [material, setMaterial] = useState('Ti');
            const [isDragging, setIsDragging] = useState(false);
            const [showMath, setShowMath] = useState(false);
            const [showParams, setShowParams] = useState(false);
            
            const sliderRef = useRef(null);
            const svgRef = useRef(null);
            
            // Constants
            // Bone is modelled as a "medium dog" diaphysis. r_bone is the distance from the bone's
            // centroidal axis to its outer cortex; the plate sits on that surface so its centroid
            // lies at (r_bone + t/2) from the bone axis. r_bone = 8.5 mm matches the original
            // Tab 1 setting (D = 10 mm with a 3 mm thick fixed plate).
            const r_bone = 8.5;
            const A_b = 150; const I_b = 10000; 
            const Moment = 10000; 
            
            const N = viPlateLibrary.length;
            const minIdx = 0;
            const maxIdx = N - 1;
            
            const boneE = 18.0;
            const nTi = 114.5 / boneE; 
            const nSteel = 187.5 / boneE; 
            const n = material === 'Ti' ? nTi : nSteel;

            // Physics Functions driven by the selected implant.
            // D is now per-implant: the centroid-to-centroid distance grows with plate thickness.
            const getD     = (impl) => r_bone + impl.t / 2;
            const getDPlate = (impl) => (A_b * getD(impl)) / (n * impl.A_p + A_b);

            const getAMI = (impl) => {
                const D_i = getD(impl);
                const dp  = getDPlate(impl);
                const db  = D_i - dp;
                return n * (impl.I_p + impl.A_p * Math.pow(dp, 2)) + (I_b + A_b * Math.pow(db, 2));
            };

            const getStress = (impl) => {
                const dp = getDPlate(impl);
                const y  = dp + (impl.t / 2); 
                return (n * Moment * y) / getAMI(impl);
            };

            const getPlateExample      = (impl) => impl.name + ` (${impl.w.toFixed(1)}mm wide × ${impl.t.toFixed(1)}mm thick)`;
            const getShortPlateExample = (impl) => impl.name.replace(/^Vi /, "");

            // Interactive Drag Handlers
            const handlePointerDown = (e, ref, isSvgContext) => {
                setIsDragging(true);
                e.currentTarget.setPointerCapture(e.pointerId);
                updateIpFromEvent(e, ref, isSvgContext);
            };

            const handlePointerMove = (e, ref, isSvgContext) => {
                if (!isDragging) return;
                updateIpFromEvent(e, ref, isSvgContext);
            };

            const handlePointerUp = (e) => {
                setIsDragging(false);
                e.currentTarget.releasePointerCapture(e.pointerId);
            };

            const updateIpFromEvent = (e, ref, isSvgContext) => {
                if (!ref.current) return;
                const rect = ref.current.getBoundingClientRect();
                let x = e.clientX - rect.left;
                let percent;

                if (isSvgContext) {
                    const scaleX = 500 / rect.width; 
                    let svgX = x * scaleX;
                    if (svgX < 50) svgX = 50;
                    if (svgX > 450) svgX = 450;
                    percent = (svgX - 50) / 400;
                } else {
                    percent = x / rect.width;
                    if (percent < 0) percent = 0;
                    if (percent > 1) percent = 1;
                }

                const newIdx = Math.round(minIdx + (maxIdx - minIdx) * percent);
                setImplantIdx(Math.max(minIdx, Math.min(maxIdx, newIdx)));
            };

            // Pre-calculate path data and dynamically scale Y-axes
            const pointsData = viPlateLibrary.map((impl, i) => ({
                idx: i,
                impl,
                ip: impl.I_p,
                ami: getAMI(impl),
                stress: getStress(impl)
            }));

            const amiBounds    = getDynamicBounds(Math.min(...pointsData.map(p => p.ami)),    Math.max(...pointsData.map(p => p.ami)));
            const stressBounds = getDynamicBounds(Math.min(...pointsData.map(p => p.stress)), Math.max(...pointsData.map(p => p.stress)));

            // SVG Mapping (X axis is now implant index, not raw I_p, so plates are evenly spaced)
            const mapX        = (idx)    => 50 + ((idx - minIdx) / (maxIdx - minIdx)) * 400; 
            const mapAMI_Y    = (ami)    => 460 - ((ami - amiBounds.lower) / (amiBounds.upper - amiBounds.lower)) * 150; 
            const mapStress_Y = (stress) => 740 - ((stress - stressBounds.lower) / (stressBounds.upper - stressBounds.lower)) * 150; 

            const pathAMI    = pointsData.map(p => `${mapX(p.idx)},${mapAMI_Y(p.ami)}`).join(" L ");
            const pathStress = pointsData.map(p => `${mapX(p.idx)},${mapStress_Y(p.stress)}`).join(" L ");

            const currentImplant = viPlateLibrary[implantIdx];
            const ipValue        = currentImplant.I_p;
            const W              = currentImplant.w;
            const currentTp      = currentImplant.t;
            const currentAp      = currentImplant.A_p;
            const D              = getD(currentImplant);
            const currentDp      = getDPlate(currentImplant);
            const currentDb      = D - currentDp;
            const currentAMI     = getAMI(currentImplant);
            const currentStress  = getStress(currentImplant);
            
            const crossSectionX_dp = 50 + (currentDp / D) * 400;

            const formatNum = (num) => Math.round(num).toLocaleString();
            const dp_str = currentDp.toFixed(1);
            const db_str = currentDb.toFixed(1);
            const y_str = (currentDp + currentTp / 2).toFixed(1);
            
            const plateTerm = ipValue + currentAp * Math.pow(currentDp, 2);
            const boneTerm = I_b + A_b * Math.pow(currentDb, 2);
            
            const mathAMI = `\\text{AMI} = \\underbrace{${n.toFixed(1)} \\times [\\textcolor{#d97706}{\\mathbf{${formatNum(ipValue)}}} + ${currentAp.toFixed(1)}(${dp_str})^2]}_{\\text{Plate: } ${formatNum(n * plateTerm)}} + \\underbrace{[${formatNum(I_b)} + ${A_b}(${db_str})^2]}_{\\text{Bone: } ${formatNum(boneTerm)}} = \\mathbf{${formatNum(currentAMI)}\\,\\mathrm{mm}^4}`;
            const mathStress = `\\sigma = \\frac{${n.toFixed(1)} \\times 10,000 \\times ${y_str}}{${formatNum(currentAMI)}} = \\mathbf{${currentStress.toFixed(1)}\\,\\mathrm{MPa}}`;

            return (
                <div className="bg-slate-50 dark:bg-slate-900 p-4 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm fade-in mt-6">
                    
                    <div className="flex justify-start mb-3">
                        <button
                            onClick={() => setShowParams(o => !o)}
                            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                        >
                            <span className={`inline-block transition-transform duration-200 ${showParams ? 'rotate-90' : ''}`}>▶</span>
                            {showParams ? 'See less' : 'See more (change material)'}
                        </button>
                    </div>
                    {showParams && <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                        <div><strong className="block text-slate-800 dark:text-slate-100 mb-1 border-b border-slate-200 dark:border-slate-700 pb-1">Plate Geometry</strong> Width = {W.toFixed(1)} mm<br/>Thickness = {currentTp.toFixed(1)} mm<br/>A_p = {currentAp.toFixed(1)} mm²<br/>I_p = {formatNum(ipValue)} mm⁴</div>
                        <div><strong className="block text-slate-800 dark:text-slate-100 mb-1 border-b border-slate-200 dark:border-slate-700 pb-1">Bone Geometry</strong> A_b = {A_b} mm²<br/>I_b = {formatNum(I_b)} mm⁴<br/>r_bone ≈ {r_bone.toFixed(1)} mm</div>
                        <div><strong className="block text-slate-800 dark:text-slate-100 mb-1 border-b border-slate-200 dark:border-slate-700 pb-1">System Parameters</strong> Moment (M) = 10,000 N·mm<br/>Total Dist (D) = {D.toFixed(2)} mm<br/><span className="text-[10px] text-slate-500">D = r_bone + t/2 (per implant)</span></div>
                        <div><strong className="block text-slate-800 dark:text-slate-100 mb-1 border-b border-slate-200 dark:border-slate-700 pb-1">Fixed Material</strong> <span className="text-[10px]">n = E_implant / E_bone</span><br/>Ti Alloy (114.5) → n ≈ {nTi.toFixed(1)}<br/>Steel (187.5) → n ≈ {nSteel.toFixed(1)}</div>
                    </div>}

                    <div className="mb-4 border-b border-slate-200 dark:border-slate-700 pb-8">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                Select Implant (Vi catalogue)
                            </label>
                            <div className="flex space-x-2">
                                <button onClick={() => setMaterial('Ti')} className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm border ${material === 'Ti' ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                                    Titanium Plate (n≈6.4)
                                </button>
                                <button onClick={() => setMaterial('Steel')} className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm border ${material === 'Steel' ? 'bg-rose-500 text-white border-rose-600' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                                    Steel Plate (n≈10.4)
                                </button>
                            </div>
                        </div>
                        
                        <div className="relative w-full flex flex-col items-center justify-center pt-2 select-none">
                            <div 
                                className="relative w-full h-10 flex items-center cursor-ew-resize z-10"
                                style={{ touchAction: 'none' }}
                                ref={sliderRef}
                                onPointerDown={(e) => handlePointerDown(e, sliderRef, false)}
                                onPointerMove={(e) => handlePointerMove(e, sliderRef, false)}
                                onPointerUp={handlePointerUp}
                                onPointerCancel={handlePointerUp}
                            >
                                <div className="w-full h-2.5 bg-slate-300 dark:bg-slate-700 rounded-full shadow-inner relative overflow-hidden pointer-events-none">
                                    <div className="absolute top-0 left-0 h-full bg-blue-500" style={{ width: `${((implantIdx - minIdx) / (maxIdx - minIdx)) * 100}%` }}></div>
                                </div>
                                <div 
                                    className="absolute h-6 w-6 bg-amber-500 rounded-full border-[3px] border-white shadow-md pointer-events-none flex items-center justify-center"
                                    style={{ 
                                        left: `calc(${((implantIdx - minIdx) / (maxIdx - minIdx)) * 100}% - 12px)`,
                                        transform: isDragging ? 'scale(1.2)' : 'scale(1)',
                                        transition: isDragging ? 'none' : 'transform 0.15s ease-out'
                                    }}
                                >
                                    <div className="h-2 w-0.5 bg-white opacity-50 rounded"></div>
                                </div>
                            </div>
                            <div className="w-full flex justify-between text-[10px] font-bold text-slate-400 px-1 mt-1">
                                <span>Smallest plate ({viPlateLibrary[minIdx].name})</span>
                                <span>Largest plate ({viPlateLibrary[maxIdx].name})</span>
                            </div>
                        </div>

                        {/* Dynamic Implant Profiler Box */}
                        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl flex flex-col md:flex-row items-center justify-between gap-3 fade-in">
                            <div className="flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300 font-bold text-xs">i</span>
                                <span className="text-xs font-bold text-blue-800 dark:text-blue-300">Selected Vi Plate (<Latex math={`I_p \\approx ${formatNum(ipValue)}`} /> mm⁴, D = {D.toFixed(2)} mm):</span>
                            </div>
                            <span className="text-xs font-mono font-bold bg-white dark:bg-slate-800 px-3 py-1.5 rounded shadow-sm text-blue-700 dark:text-blue-400 text-center w-full md:w-auto">
                                {getPlateExample(currentImplant)}
                            </span>
                        </div>
                    </div>

                    <div className="relative w-full max-w-3xl mx-auto select-none">
                        <div className="flex justify-end mb-2">
                            <button
                                onClick={() => setShowMath(o => !o)}
                                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 px-3 py-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                            >
                                {showMath ? '▲ Hide the math' : '▼ See the math'}
                            </button>
                        </div>
                        <svg viewBox="0 0 500 790" className="w-full h-auto font-sans bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner overflow-visible" style={{ touchAction: 'pan-y' }} ref={svgRef}>
                            
                            <text x="25" y="30" className="fill-slate-800 dark:fill-slate-100 font-bold text-sm">Physical Cross-Section (Growing Geometry)</text>
                            
                            {/* Plate visually grows in both width (rect height in SVG) and thickness (rect width in SVG) */}
                            <rect x={50 - (currentTp * 5)/2} y={80 - (W * 4)/2} width={currentTp * 5} height={W * 4} rx="3" className={`stroke-2 transition-all duration-75 ${material === 'Ti' ? 'fill-emerald-100 stroke-emerald-500 dark:fill-emerald-900/50' : 'fill-rose-100 stroke-rose-500 dark:fill-rose-900/50'}`} />
                            <text x="50" y="130" className="fill-slate-500 text-[8px] font-bold" textAnchor="middle">Plate Axis</text>
                            <line x1="50" y1="40" x2="50" y2="150" className="stroke-slate-300 dark:stroke-slate-600 stroke-dasharray-4 stroke-2" />

                            {/* Static Bone */}
                            <ellipse cx="450" cy="80" rx="30" ry="40" className="fill-slate-200 dark:fill-slate-800 stroke-slate-400 stroke-2" />
                            <text x="450" y="140" className="fill-slate-500 text-[8px] font-bold" textAnchor="middle">Bone Axis</text>
                            <line x1="450" y1="40" x2="450" y2="150" className="stroke-slate-300 dark:stroke-slate-600 stroke-dasharray-4 stroke-2" />

                            <line x1="50" y1="150" x2="450" y2="150" className="stroke-slate-300 dark:stroke-slate-700 stroke-1" />
                            <text x="250" y="165" className="fill-slate-400 dark:fill-slate-500 text-[8px] font-bold" textAnchor="middle">Constraint: d_plate + d_bone = D = {D.toFixed(2)} mm (per implant: r_bone + t/2)</text>

                            <g className="transition-all duration-75 pointer-events-none">
                                <line x1={crossSectionX_dp} y1="40" x2={crossSectionX_dp} y2="150" className="stroke-amber-500 stroke-2" />
                                <line x1="50" y1="80" x2={crossSectionX_dp} y2="80" className="stroke-blue-500 stroke-2" markerEnd="url(#arrow-blue)" markerStart="url(#arrow-blue-start)" />
                                <text x={50 + (crossSectionX_dp - 50)/2} y="75" className="fill-blue-600 dark:fill-blue-400 text-[8px] font-bold" textAnchor="middle">d_plate</text>
                                <line x1={crossSectionX_dp} y1="80" x2="450" y2="80" className="stroke-indigo-500 stroke-2" markerEnd="url(#arrow-indigo)" markerStart="url(#arrow-indigo-start)" />
                                <text x={crossSectionX_dp + (450 - crossSectionX_dp)/2} y="75" className="fill-indigo-600 dark:fill-indigo-400 text-[8px] font-bold" textAnchor="middle">d_bone</text>
                            </g>

                            <text x="25" y="210" className="fill-slate-800 dark:fill-slate-100 font-bold text-sm">Composite AMI Curve</text>
                            
                            {showMath && <foreignObject x="0" y="220" width="500" height="90">
                                <div className="w-full h-full flex justify-center text-[8.5px] md:text-[10px] text-slate-800 dark:text-slate-200 px-2">
                                    <Latex math={mathAMI} />
                                </div>
                            </foreignObject>}
                            
                            {/* Gridlines & Limits for AMI */}
                            <line x1="50" y1="310" x2="450" y2="310" className="stroke-slate-200 dark:stroke-slate-700 stroke-dasharray-2 stroke-1" />
                            <text x="45" y="313" className="fill-slate-400 dark:fill-slate-500 text-[8px] font-mono" textAnchor="end">{formatNum(amiBounds.upper)}</text>
                            
                            <line x1="50" y1="460" x2="450" y2="460" className="stroke-slate-200 dark:stroke-slate-700 stroke-dasharray-2 stroke-1" />
                            <text x="45" y="463" className="fill-slate-400 dark:fill-slate-500 text-[8px] font-mono" textAnchor="end">{formatNum(amiBounds.lower)}</text>

                            <line x1="50" y1="310" x2="50" y2="460" className="stroke-slate-300 dark:stroke-slate-700 stroke-2" />
                            <text x="35" y="385" className="fill-blue-600 dark:fill-blue-400 text-[8px] font-bold uppercase tracking-widest" transform="rotate(-90 35 385)" textAnchor="middle">Composite AMI (mm⁴)</text>
                            
                            <line x1="50" y1="460" x2="450" y2="460" className="stroke-slate-400 stroke-2" />
                            <text x="250" y="475" className="fill-slate-500 text-[8px] font-bold" textAnchor="middle">Implant (small → large by I_p)</text>

                            <path d={`M ${pathAMI}`} fill="none" className="stroke-blue-500 stroke-[3px]" />

                            {/* Banner & Dot Tooltip for Graph 1 */}
                            <g transform={`translate(${mapX(implantIdx)}, 0)`} className="transition-all duration-75 pointer-events-none">
                                <line x1="0" y1="310" x2="0" y2="460" className="stroke-amber-500 dark:stroke-amber-500 stroke-[2px] stroke-dasharray-4 opacity-80" />
                                <g transform="translate(-45, 282)">
                                    <rect x="0" y="0" width="90" height="26" rx="3" className="fill-amber-100 dark:fill-amber-900/90 border border-amber-400 dark:border-amber-600 shadow-sm" />
                                    <text x="45" y="11" className="fill-amber-800 dark:fill-amber-200 text-[8px] font-bold" textAnchor="middle">I_p = {formatNum(ipValue)} mm⁴</text>
                                    <text x="45" y="21" className="fill-amber-700 dark:fill-amber-300 text-[7px] font-medium" textAnchor="middle">{getShortPlateExample(currentImplant)}</text>
                                </g>
                                <g transform={`translate(0, ${mapAMI_Y(currentAMI)})`}>
                                    <circle cx="0" cy="0" r="5" className="fill-blue-600 dark:fill-blue-400 stroke-white stroke-2 shadow-lg" />
                                    <rect x="8" y="-10" width="55" height="20" rx="3" className="fill-white dark:fill-slate-800 border border-slate-200 dark:border-slate-600 shadow-sm" />
                                    <text x="12" y="3" className="fill-blue-700 dark:fill-blue-300 text-[8px] font-bold">{formatNum(currentAMI)}</text>
                                </g>
                            </g>

                            <text x="25" y="510" className="fill-slate-800 dark:fill-slate-100 font-bold text-sm">Plate Stress Curve</text>
                            
                            {showMath && <foreignObject x="0" y="525" width="500" height="50">
                                <div className="w-full h-full flex justify-center text-[10px] md:text-xs text-slate-800 dark:text-slate-200 px-2">
                                    <Latex math={mathStress} />
                                </div>
                            </foreignObject>}

                            {/* Gridlines & Limits for Stress */}
                            <line x1="50" y1="590" x2="450" y2="590" className="stroke-slate-200 dark:stroke-slate-700 stroke-dasharray-2 stroke-1" />
                            <text x="45" y="593" className="fill-slate-400 dark:fill-slate-500 text-[8px] font-mono" textAnchor="end">{Math.round(stressBounds.upper)}</text>
                            
                            <line x1="50" y1="740" x2="450" y2="740" className="stroke-slate-200 dark:stroke-slate-700 stroke-dasharray-2 stroke-1" />
                            <text x="45" y="743" className="fill-slate-400 dark:fill-slate-500 text-[8px] font-mono" textAnchor="end">{Math.round(stressBounds.lower)}</text>

                            <line x1="50" y1="590" x2="50" y2="740" className="stroke-slate-300 dark:stroke-slate-700 stroke-2" />
                            <text x="35" y="665" className="fill-rose-600 dark:fill-rose-400 text-[8px] font-bold uppercase tracking-widest" transform="rotate(-90 35 665)" textAnchor="middle">Plate Stress (MPa = N/mm²)</text>
                            
                            <line x1="50" y1="740" x2="450" y2="740" className="stroke-slate-400 stroke-2" />
                            <text x="250" y="755" className="fill-slate-500 text-[8px] font-bold" textAnchor="middle">Implant (small → large by I_p)</text>

                            <path d={`M ${pathStress}`} fill="none" className="stroke-rose-500 stroke-[3px]" />

                            {/* Banner & Dot Tooltip for Graph 2 */}
                            <g transform={`translate(${mapX(implantIdx)}, 0)`} className="transition-all duration-75 pointer-events-none">
                                <line x1="0" y1="590" x2="0" y2="740" className="stroke-amber-500 dark:stroke-amber-500 stroke-[2px] stroke-dasharray-4 opacity-80" />
                                <g transform="translate(-45, 562)">
                                    <rect x="0" y="0" width="90" height="26" rx="3" className="fill-amber-100 dark:fill-amber-900/90 border border-amber-400 dark:border-amber-600 shadow-sm" />
                                    <text x="45" y="11" className="fill-amber-800 dark:fill-amber-200 text-[8px] font-bold" textAnchor="middle">I_p = {formatNum(ipValue)} mm⁴</text>
                                    <text x="45" y="21" className="fill-amber-700 dark:fill-amber-300 text-[7px] font-medium" textAnchor="middle">{getShortPlateExample(currentImplant)}</text>
                                </g>
                                <g transform={`translate(0, ${mapStress_Y(currentStress)})`}>
                                    <circle cx="0" cy="0" r="5" className="fill-rose-600 dark:fill-rose-400 stroke-white stroke-2 shadow-lg" />
                                    <rect x="8" y="-10" width="45" height="20" rx="3" className="fill-white dark:fill-slate-800 border border-slate-200 dark:border-slate-600 shadow-sm" />
                                    <text x="12" y="3" className="fill-rose-700 dark:fill-rose-300 text-[8px] font-bold">{currentStress.toFixed(1)} MPa</text>
                                </g>
                            </g>

                            <rect 
                                x="50" y="280" width="400" height="470" 
                                fill="transparent" 
                                className="cursor-ew-resize"
                                onPointerDown={(e) => handlePointerDown(e, svgRef, true)}
                                onPointerMove={(e) => handlePointerMove(e, svgRef, true)}
                                onPointerUp={handlePointerUp}
                                onPointerCancel={handlePointerUp}
                            />
                        </svg>
                    </div>
                </div>
            );
        };

        // --- WIDGET 3: WORKING LENGTH & P-DELTA EFFECT ---
        const WorkingLengthInteractiveGraph = ({ showFormulas = false }) => {
            const [wlValue, setWlValue] = useState(60); 
            const [isDragging, setIsDragging] = useState(false);
            const [showParams, setShowParams] = useState(false);
            
            const sliderRef = useRef(null);
            const svgRef = useRef(null);
            
            // Constants
            const P = 1000; // Axial Load (N)
            const e_init = 5; // Initial Eccentricity (mm)
            const E = 114500; // Modulus for Titanium (MPa)
            const I_p = 25; // Plate AMI (mm^4)
            const EI = E * I_p; // Flexural Rigidity
            const y = 1.5; // distance to neutral axis (mm)
            
            const minWL = 20; 
            const maxWL = 120;

            // Physics Functions (P-Delta Effect via Secant Formula for Beam-Column)
            const getDeflection = (L) => {
                const k = Math.sqrt(P / EI);
                const angle = (L / 2) * k;
                // Secant formula: sec(theta) = 1 / cos(theta)
                const secant = 1 / Math.cos(angle);
                return e_init * (secant - 1);
            };

            const getMoment = (L) => {
                const delta = getDeflection(L);
                return P * (e_init + delta);
            };

            const getStress = (L) => {
                const M = getMoment(L);
                return (M * y) / I_p;
            };

            // Interactive Drag Handlers
            const handlePointerDown = (e, ref, isSvgContext) => {
                setIsDragging(true);
                e.currentTarget.setPointerCapture(e.pointerId);
                updateWLFromEvent(e, ref, isSvgContext);
            };

            const handlePointerMove = (e, ref, isSvgContext) => {
                if (!isDragging) return;
                updateWLFromEvent(e, ref, isSvgContext);
            };

            const handlePointerUp = (e) => {
                setIsDragging(false);
                e.currentTarget.releasePointerCapture(e.pointerId);
            };

            const updateWLFromEvent = (e, ref, isSvgContext) => {
                if (!ref.current) return;
                const rect = ref.current.getBoundingClientRect();
                let x = e.clientX - rect.left;
                let percent;

                if (isSvgContext) {
                    const scaleX = 500 / rect.width; 
                    let svgX = x * scaleX;
                    if (svgX < 50) svgX = 450;
                    if (svgX > 450) svgX = 450;
                    percent = (svgX - 50) / 400;
                } else {
                    percent = x / rect.width;
                    if (percent < 0) percent = 0;
                    if (percent > 1) percent = 1;
                }

                let newWL = minWL + (maxWL - minWL) * percent; 
                setWlValue(Math.round(newWL));
            };

            // Pre-calculate path data and dynamically scale Y-axes
            const pointsData = [];
            for (let l = minWL; l <= maxWL; l += 2) {
                pointsData.push({ l, stress: getStress(l) });
            }

            const stressBounds = getDynamicBounds(Math.min(...pointsData.map(p => p.stress)), Math.max(...pointsData.map(p => p.stress)));

            // SVG Mapping
            const mapX = (l) => 50 + ((l - minWL) / (maxWL - minWL)) * 400; 
            const mapStress_Y = (stress) => 250 - ((stress - stressBounds.lower) / (stressBounds.upper - stressBounds.lower)) * 200; 

            const pathStress = pointsData.map(p => `${mapX(p.l)},${mapStress_Y(p.stress)}`).join(" L ");

            const currentDelta = getDeflection(wlValue);
            const currentM = getMoment(wlValue);
            const currentStress = getStress(wlValue);
            
            const formatNum = (num) => Math.round(num).toLocaleString();
            
            // Render Math equations
            const mathDelta = `\\delta = e \\left[ \\sec\\left(\\frac{L}{2} \\sqrt{\\frac{P}{EI}}\\right) - 1 \\right] = \\mathbf{${currentDelta.toFixed(2)}\\,\\mathrm{mm}}`;
            const mathM = `M_{total} = P \\times (e + \\delta) = 1,000 \\times (5 + ${currentDelta.toFixed(2)}) = \\mathbf{${formatNum(currentM)}\\,\\mathrm{N{\\cdot}mm}}`;
            const mathSigma = `\\sigma = \\frac{M_{total} \\cdot y}{I} = \\frac{${formatNum(currentM)} \\cdot 1.5}{25} = \\mathbf{${Math.round(currentStress)}\\,\\mathrm{MPa}}`;

            return (
                <div className="bg-slate-50 dark:bg-slate-900 p-4 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm fade-in mt-6">
                    
                    <div className="flex justify-start mb-3">
                        <button
                            onClick={() => setShowParams(o => !o)}
                            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                        >
                            <span className={`inline-block transition-transform duration-200 ${showParams ? 'rotate-90' : ''}`}>▶</span>
                            {showParams ? 'See less' : 'See more'}
                        </button>
                    </div>
                    {showParams && <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                        <div><strong className="block text-slate-800 dark:text-slate-100 mb-1 border-b border-slate-200 dark:border-slate-700 pb-1">Load Parameters</strong> Axial Load (P) = 1000 N<br/>Bone-axis→plate eccentricity (e) = 5 mm</div>
                        <div><strong className="block text-slate-800 dark:text-slate-100 mb-1 border-b border-slate-200 dark:border-slate-700 pb-1">Plate Material</strong> Titanium Alloy<br/>E = 114,500 MPa</div>
                        <div><strong className="block text-slate-800 dark:text-slate-100 mb-1 border-b border-slate-200 dark:border-slate-700 pb-1">Plate Geometry</strong> AMI (I) = 25 mm⁴<br/>Distance to N.A. (y) = 1.5 mm</div>
                        <div><strong className="block text-slate-800 dark:text-slate-100 mb-1 border-b border-slate-200 dark:border-slate-700 pb-1">Flexural Rigidity</strong> <span className="text-[10px]">EI = E × I</span><br/>EI = 2,862,500 N·mm²</div>
                    </div>}

                    <div className="mb-4 border-b border-slate-200 dark:border-slate-700 pb-8">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                Set Plate Working Length (L)
                            </label>
                        </div>
                        
                        <div className="relative w-full flex flex-col items-center justify-center pt-2 select-none">
                            <div 
                                className="relative w-full h-10 flex items-center cursor-ew-resize z-10"
                                style={{ touchAction: 'none' }}
                                ref={sliderRef}
                                onPointerDown={(e) => handlePointerDown(e, sliderRef, false)}
                                onPointerMove={(e) => handlePointerMove(e, sliderRef, false)}
                                onPointerUp={handlePointerUp}
                                onPointerCancel={handlePointerUp}
                            >
                                <div className="w-full h-2.5 bg-slate-300 dark:bg-slate-700 rounded-full shadow-inner relative overflow-hidden pointer-events-none">
                                    <div className="absolute top-0 left-0 h-full bg-rose-500" style={{ width: `${((wlValue - minWL) / (maxWL - minWL)) * 100}%` }}></div>
                                </div>
                                <div 
                                    className="absolute h-6 w-6 bg-amber-500 rounded-full border-[3px] border-white shadow-md pointer-events-none flex items-center justify-center"
                                    style={{ 
                                        left: `calc(${((wlValue - minWL) / (maxWL - minWL)) * 100}% - 12px)`,
                                        transform: isDragging ? 'scale(1.2)' : 'scale(1)',
                                        transition: isDragging ? 'none' : 'transform 0.15s ease-out'
                                    }}
                                >
                                    <div className="h-2 w-0.5 bg-white opacity-50 rounded"></div>
                                </div>
                            </div>
                            <div className="w-full flex justify-between text-[10px] font-bold text-slate-400 px-1 mt-1">
                                <span>Short WL (L = {minWL} mm)</span>
                                <span>Long WL (L = {maxWL} mm)</span>
                            </div>
                        </div>

                        {/* Math Output Box */}
                        {showFormulas && (
                        <div className="mt-6 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex flex-col gap-2 shadow-sm">
                            <div className="flex flex-col gap-1 items-center w-full overflow-x-auto pb-2">
                                <div className="text-xs md:text-sm text-slate-800 dark:text-slate-200 w-full text-center py-1"><Latex math={mathDelta} /></div>
                                <div className="text-xs md:text-sm text-slate-800 dark:text-slate-200 w-full text-center py-1"><Latex math={mathM} /></div>
                                <div className="text-[11px] md:text-[13px] text-rose-700 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-900/20 px-4 py-2 rounded-lg mt-2 shadow-sm border border-rose-100 dark:border-rose-800/50 w-full text-center"><Latex math={mathSigma} /></div>
                            </div>
                        </div>
                        )}
                    </div>

                    <div className="relative w-full max-w-3xl mx-auto select-none">
                        <svg viewBox="0 0 500 320" className="w-full h-auto font-sans bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner overflow-visible" style={{ touchAction: 'pan-y' }} ref={svgRef}>
                            
                            <text x="25" y="30" className="fill-slate-800 dark:fill-slate-100 font-bold text-sm">Plate Stress vs. Working Length (Exponential Growth)</text>

                            {/* Gridlines & Limits for Stress */}
                            <line x1="50" y1="50" x2="450" y2="50" className="stroke-slate-200 dark:stroke-slate-700 stroke-dasharray-2 stroke-1" />
                            <text x="45" y="53" className="fill-slate-400 dark:fill-slate-500 text-[8px] font-mono" textAnchor="end">{Math.round(stressBounds.upper)}</text>
                            
                            <line x1="50" y1="250" x2="450" y2="250" className="stroke-slate-200 dark:stroke-slate-700 stroke-dasharray-2 stroke-1" />
                            <text x="45" y="253" className="fill-slate-400 dark:fill-slate-500 text-[8px] font-mono" textAnchor="end">{Math.round(stressBounds.lower)}</text>

                            <line x1="50" y1="50" x2="50" y2="250" className="stroke-slate-300 dark:stroke-slate-700 stroke-2" />
                            <text x="35" y="150" className="fill-rose-600 dark:fill-rose-400 text-[8px] font-bold uppercase tracking-widest" transform="rotate(-90 35 150)" textAnchor="middle">Plate Stress (MPa = N/mm²)</text>
                            
                            <line x1="50" y1="250" x2="450" y2="250" className="stroke-slate-400 stroke-2" />
                            <text x="250" y="265" className="fill-slate-500 text-[8px] font-bold" textAnchor="middle">Working Length, L (mm)</text>

                            {/* Warning Zone (Yield Limit roughly 750MPa for some Ti alloys) */}
                            <rect x="50" y="50" width="400" height={mapStress_Y(750) - 50} className="fill-rose-500/10 dark:fill-rose-900/10" />
                            <line x1="50" y1={mapStress_Y(750)} x2="450" y2={mapStress_Y(750)} className="stroke-rose-400 dark:stroke-rose-600 stroke-dasharray-4 stroke-2" />
                            <text x="445" y={mapStress_Y(750) - 5} className="fill-rose-500 dark:fill-rose-400 text-[8px] font-bold" textAnchor="end">Approx. Titanium Yield Strength (~750 MPa)</text>

                            <path d={`M ${pathStress}`} fill="none" className="stroke-rose-500 stroke-[3px]" />

                            {/* Banner & Dot Tooltip for Graph */}
                            <g transform={`translate(${mapX(wlValue)}, 0)`} className="transition-all duration-75 pointer-events-none">
                                <line x1="0" y1="50" x2="0" y2="250" className="stroke-amber-500 dark:stroke-amber-500 stroke-[2px] stroke-dasharray-4 opacity-80" />
                                <g transform="translate(-25, 234)">
                                    <rect x="0" y="0" width="50" height="16" rx="3" className="fill-amber-100 dark:fill-amber-900/90 border border-amber-400 dark:border-amber-600 shadow-sm" />
                                    <text x="25" y="11" className="fill-amber-800 dark:fill-amber-200 text-[8px] font-bold" textAnchor="middle">L = {wlValue}</text>
                                </g>
                                <g transform={`translate(0, ${mapStress_Y(currentStress)})`}>
                                    <circle cx="0" cy="0" r="5" className="fill-rose-600 dark:fill-rose-400 stroke-white stroke-2 shadow-lg" />
                                    <rect x="8" y="-10" width="45" height="20" rx="3" className="fill-white dark:fill-slate-800 border border-slate-200 dark:border-slate-600 shadow-sm" />
                                    <text x="12" y="3" className="fill-rose-700 dark:fill-rose-300 text-[8px] font-bold">{Math.round(currentStress)} MPa</text>
                                </g>
                            </g>

                            <rect 
                                x="50" y="50" width="400" height="200" 
                                fill="transparent" 
                                className="cursor-ew-resize"
                                onPointerDown={(e) => handlePointerDown(e, svgRef, true)}
                                onPointerMove={(e) => handlePointerMove(e, svgRef, true)}
                                onPointerUp={handlePointerUp}
                                onPointerCancel={handlePointerUp}
                            />
                        </svg>
                    </div>
                </div>
            );
        };

        // --- WIDGET 3: LOAD SHARING MODEL (Parallel Springs in Compression) ---
        const LoadSharingInteractiveGraph = ({ controlledWL, onWLChange } = {}) => {
            const [internalWL, setInternalWL] = useState(60);
            const isControlled = controlledWL !== undefined;
            const wlValue = isControlled ? controlledWL : internalWL;
            const setWlValue = isControlled
                ? (v) => { if (onWLChange) onWLChange(v); }
                : setInternalWL;
            const [material, setMaterial] = useState('Ti');
            const [isDragging, setIsDragging] = useState(false);
            const [showMath, setShowMath] = useState(false);
            const [showParams, setShowParams] = useState(false);
            
            const sliderRef = useRef(null);
            const svgRef = useRef(null);
            
            // Constants
            const M_total = 10000; // Total applied external bending moment (N*mm)
            const E_Ti = 114500; // Modulus for Titanium (MPa)
            const E_St = 187500; // Modulus for Steel (MPa)
            const I_p = 25; // Plate AMI (mm^4)
            const y = 1.5; // distance to neutral axis (mm)
            
            const E_current = material === 'Ti' ? E_Ti : E_St;
            
            // Fracture interface stiffness: K_bone is an empirical contact property at the
            // fracture plane — NOT EI_bone/L. The bone has a discontinuity; its rotational
            // resistance comes from local cortical contact, which is independent of L.
            const K_bone = 50000; 
            
            const minWL = 2; 
            const maxWL = 100;

            // Physics Functions
            const getKPlate = (E, L) => (E * I_p) / L;
            
            const getMPlate = (E, L) => {
                const K_p = getKPlate(E, L);
                // Plate takes a fraction of the moment based on its relative stiffness to the bone
                return M_total * (K_p / (K_p + K_bone));
            };

            const getStress = (E, L) => {
                const M_p = getMPlate(E, L);
                return (M_p * y) / I_p;
            };

            // Interactive Drag Handlers
            const handlePointerDown = (e, ref, isSvgContext) => {
                setIsDragging(true);
                e.currentTarget.setPointerCapture(e.pointerId);
                updateWLFromEvent(e, ref, isSvgContext);
            };

            const handlePointerMove = (e, ref, isSvgContext) => {
                if (!isDragging) return;
                updateWLFromEvent(e, ref, isSvgContext);
            };

            const handlePointerUp = (e) => {
                setIsDragging(false);
                e.currentTarget.releasePointerCapture(e.pointerId);
            };

            const updateWLFromEvent = (e, ref, isSvgContext) => {
                if (!ref.current) return;
                const rect = ref.current.getBoundingClientRect();
                let x = e.clientX - rect.left;
                let percent;

                if (isSvgContext) {
                    const scaleX = 500 / rect.width; 
                    let svgX = x * scaleX;
                    if (svgX < 50) svgX = 50;
                    if (svgX > 450) svgX = 450;
                    percent = (svgX - 50) / 400;
                } else {
                    percent = x / rect.width;
                    if (percent < 0) percent = 0;
                    if (percent > 1) percent = 1;
                }

                let newWL = minWL + (maxWL - minWL) * percent; 
                setWlValue(Math.round(newWL));
            };

            // Pre-calculate path data for both materials for comparison
            const pointsDataTi = [];
            const pointsDataSteel = [];
            for (let l = minWL; l <= maxWL; l += 2) {
                pointsDataTi.push({ l, stress: getStress(E_Ti, l) });
                pointsDataSteel.push({ l, stress: getStress(E_St, l) });
            }

            // Fixed bounds to fit both curves across full range L=2 to 100 mm
            const stressBounds = { lower: 150, upper: 650 };

            // SVG Mapping
            const mapX = (l) => 50 + ((l - minWL) / (maxWL - minWL)) * 400; 
            const mapStress_Y = (stress) => 250 - ((stress - stressBounds.lower) / (stressBounds.upper - stressBounds.lower)) * 200; 

            const pathStressTi = pointsDataTi.map(p => `${mapX(p.l)},${mapStress_Y(p.stress)}`).join(" L ");
            const pathStressSteel = pointsDataSteel.map(p => `${mapX(p.l)},${mapStress_Y(p.stress)}`).join(" L ");

            const currentKp = getKPlate(E_current, wlValue);
            const currentMp = getMPlate(E_current, wlValue);
            
            const currentStressTi = getStress(E_Ti, wlValue);
            const currentStressSteel = getStress(E_St, wlValue);
            const activeStress = material === 'Ti' ? currentStressTi : currentStressSteel;
            
            const formatNum = (num) => Math.round(num).toLocaleString();
            
            const mathK = `K_{plate} = \\frac{E \\times I_p}{L} = \\frac{${formatNum(E_current)} \\times 25}{\\mathbf{${wlValue}}} = \\mathbf{${formatNum(currentKp)}\\,\\mathrm{N{\\cdot}mm/rad}}`;
            const mathM = `M_{plate} = M_{total} \\times \\left( \\frac{K_{plate}}{K_{plate} + K_{bone}} \\right) = 10,000 \\times \\left( \\frac{${formatNum(currentKp)}}{${formatNum(currentKp)} + ${formatNum(K_bone)}} \\right) = \\mathbf{${formatNum(currentMp)}\\,\\mathrm{N{\\cdot}mm}}`;
            const mathSigma = `\\sigma_{plate} = \\frac{M_{plate} \\times y}{I_p} = \\frac{${formatNum(currentMp)} \\times 1.5}{25} = \\mathbf{${Math.round(activeStress)}\\,\\mathrm{MPa}}`;

            return (
                <div className="bg-slate-50 dark:bg-slate-900 p-4 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm fade-in mt-6">
                    <div className="flex justify-start mb-3">
                        <button
                            onClick={() => setShowParams(o => !o)}
                            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                        >
                            <span className={`inline-block transition-transform duration-200 ${showParams ? 'rotate-90' : ''}`}>▶</span>
                            {showParams ? 'See less' : 'See more (change material)'}
                        </button>
                    </div>
                    {showParams && <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                        <div><strong className="block text-slate-800 dark:text-slate-100 mb-1 border-b border-slate-200 dark:border-slate-700 pb-1">Global Load</strong> Total Moment = 10,000 N·mm<br/>(Shared across fracture)</div>
                        <div><strong className="block text-slate-800 dark:text-slate-100 mb-1 border-b border-slate-200 dark:border-slate-700 pb-1">Bone/Callus Stiffness</strong> K_bone = {formatNum(K_bone)}<br/>(Compressed Interface)</div>
                        <div><strong className="block text-slate-800 dark:text-slate-100 mb-1 border-b border-slate-200 dark:border-slate-700 pb-1">Active Plate Material</strong> <span className={material === 'Ti' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-rose-600 dark:text-rose-400 font-bold'}>{material === 'Ti' ? 'Titanium (~114.5 GPa)' : '316L Steel (~187.5 GPa)'}</span><br/>E = {formatNum(E_current)} MPa</div>
                        <div><strong className="block text-slate-800 dark:text-slate-100 mb-1 border-b border-slate-200 dark:border-slate-700 pb-1">Plate Geometry</strong> AMI (I_p) = 25 mm⁴<br/>Half-Thickness (y) = 1.5 mm</div>
                    </div>}

                    <div className="mb-4 border-b border-slate-200 dark:border-slate-700 pb-8">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                {isControlled
                                    ? `Working Length: L = ${wlValue} mm (controlled by section banner above)`
                                    : 'Set Plate Working Length (L)'}
                            </label>
                            <div className="flex space-x-2">
                                <button onClick={() => setMaterial('Ti')} className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm border ${material === 'Ti' ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                                    Titanium Plate
                                </button>
                                <button onClick={() => setMaterial('Steel')} className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm border ${material === 'Steel' ? 'bg-rose-500 text-white border-rose-600' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                                    316L Steel Plate
                                </button>
                            </div>
                        </div>
                        
                        {!isControlled && (
                        <div className="relative w-full flex flex-col items-center justify-center pt-2 select-none">
                            <div 
                                className="relative w-full h-10 flex items-center cursor-ew-resize z-10"
                                style={{ touchAction: 'none' }}
                                ref={sliderRef}
                                onPointerDown={(e) => handlePointerDown(e, sliderRef, false)}
                                onPointerMove={(e) => handlePointerMove(e, sliderRef, false)}
                                onPointerUp={handlePointerUp}
                                onPointerCancel={handlePointerUp}
                            >
                                <div className="w-full h-2.5 bg-slate-300 dark:bg-slate-700 rounded-full shadow-inner relative overflow-hidden pointer-events-none">
                                    <div className={`absolute top-0 left-0 h-full ${material === 'Ti' ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${((wlValue - minWL) / (maxWL - minWL)) * 100}%` }}></div>
                                </div>
                                <div 
                                    className="absolute h-6 w-6 bg-amber-500 rounded-full border-[3px] border-white shadow-md pointer-events-none flex items-center justify-center"
                                    style={{ 
                                        left: `calc(${((wlValue - minWL) / (maxWL - minWL)) * 100}% - 12px)`,
                                        transform: isDragging ? 'scale(1.2)' : 'scale(1)',
                                        transition: isDragging ? 'none' : 'transform 0.15s ease-out'
                                    }}
                                >
                                    <div className="h-2 w-0.5 bg-white opacity-50 rounded"></div>
                                </div>
                            </div>
                            <div className="w-full flex justify-between text-[10px] font-bold text-slate-400 px-1 mt-1">
                                <span>Short WL (L = {minWL} mm)</span>
                                <span>Long WL (L = {maxWL} mm)</span>
                            </div>
                        </div>
                        )}

                        <div className="flex items-center justify-between mt-6 mb-2">
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Live Calculation</span>
                            <button
                                onClick={() => setShowMath(o => !o)}
                                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 px-3 py-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                            >
                                {showMath ? '▲ Hide the math' : '▼ See the math'}
                            </button>
                        </div>

                        {showMath && (
                        <div className="mt-2 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex flex-col gap-2 shadow-sm fade-in">
                            <div className="flex flex-col gap-1 items-center w-full overflow-x-auto pb-2">
                                <div className="text-xs md:text-sm text-slate-800 dark:text-slate-200 w-full text-center py-1"><Latex math={mathK} /></div>
                                <div className="text-xs md:text-sm text-slate-800 dark:text-slate-200 w-full text-center py-1"><Latex math={mathM} /></div>
                                <div className={`text-[11px] md:text-[13px] font-bold px-4 py-2 rounded-lg mt-2 shadow-sm w-full text-center ${material === 'Ti' ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50' : 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800/50'}`}><Latex math={mathSigma} /></div>
                            </div>
                        </div>
                        )}
                    </div>

                    <div className="relative w-full max-w-3xl mx-auto select-none">
                        <svg viewBox="0 0 500 320" className="w-full h-auto font-sans bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner overflow-visible" style={{ touchAction: 'pan-y' }} ref={svgRef}>
                            
                            <text x="25" y="30" className="fill-slate-800 dark:fill-slate-100 font-bold text-sm">Load Sharing Stress vs. Working Length</text>

                            {/* Gridlines & Limits */}
                            <line x1="50" y1="50" x2="450" y2="50" className="stroke-slate-200 dark:stroke-slate-700 stroke-dasharray-2 stroke-1" />
                            <text x="45" y="53" className="fill-slate-400 dark:fill-slate-500 text-[8px] font-mono" textAnchor="end">{Math.round(stressBounds.upper)}</text>
                            
                            <line x1="50" y1="250" x2="450" y2="250" className="stroke-slate-200 dark:stroke-slate-700 stroke-dasharray-2 stroke-1" />
                            <text x="45" y="253" className="fill-slate-400 dark:fill-slate-500 text-[8px] font-mono" textAnchor="end">{Math.round(stressBounds.lower)}</text>

                            <line x1="50" y1="50" x2="50" y2="250" className="stroke-slate-300 dark:stroke-slate-700 stroke-2" />
                            <text x="35" y="150" className="fill-slate-600 dark:fill-slate-400 text-[8px] font-bold uppercase tracking-widest" transform="rotate(-90 35 150)" textAnchor="middle">Apportioned Plate Stress (MPa)</text>
                            
                            <line x1="50" y1="250" x2="450" y2="250" className="stroke-slate-400 stroke-2" />
                            <text x="250" y="265" className="fill-slate-500 text-[8px] font-bold" textAnchor="middle">Working Length, L (mm)</text>

                            {/* Both Material Paths (For visual comparison) */}
                            <path d={`M ${pathStressSteel}`} fill="none" className={`stroke-[3px] transition-all duration-300 ${material === 'Steel' ? 'stroke-rose-500' : 'stroke-rose-300 dark:stroke-rose-800 stroke-dasharray-4 opacity-50'}`} />
                            <path d={`M ${pathStressTi}`} fill="none" className={`stroke-[3px] transition-all duration-300 ${material === 'Ti' ? 'stroke-emerald-500' : 'stroke-emerald-300 dark:stroke-emerald-800 stroke-dasharray-4 opacity-50'}`} />

                            {/* Banner & Dot Tooltip */}
                            <g transform={`translate(${mapX(wlValue)}, 0)`} className="transition-all duration-75 pointer-events-none">
                                <line x1="0" y1="50" x2="0" y2="250" className="stroke-amber-500 dark:stroke-amber-500 stroke-[2px] stroke-dasharray-4 opacity-80" />
                                <g transform="translate(-25, 234)">
                                    <rect x="0" y="0" width="50" height="16" rx="3" className="fill-amber-100 dark:fill-amber-900/90 border border-amber-400 dark:border-amber-600 shadow-sm" />
                                    <text x="25" y="11" className="fill-amber-800 dark:fill-amber-200 text-[8px] font-bold" textAnchor="middle">L = {wlValue}</text>
                                </g>

                                {/* Steel Dot */}
                                <g transform={`translate(0, ${mapStress_Y(currentStressSteel)})`}>
                                    <circle cx="0" cy="0" r="5" className="fill-rose-600 dark:fill-rose-400 stroke-white stroke-2 shadow-lg" />
                                    <rect x="8" y="-10" width="75" height="20" rx="3" className="fill-white dark:fill-slate-800 border border-slate-200 dark:border-slate-600 shadow-sm" />
                                    <text x="12" y="3" className="fill-rose-700 dark:fill-rose-300 text-[8px] font-bold">Steel: {Math.round(currentStressSteel)} MPa</text>
                                </g>

                                {/* Ti Dot */}
                                <g transform={`translate(0, ${mapStress_Y(currentStressTi)})`}>
                                    <circle cx="0" cy="0" r="5" className="fill-emerald-600 dark:fill-emerald-400 stroke-white stroke-2 shadow-lg" />
                                    <rect x="8" y="-10" width="75" height="20" rx="3" className="fill-white dark:fill-slate-800 border border-slate-200 dark:border-slate-600 shadow-sm" />
                                    <text x="12" y="3" className="fill-emerald-700 dark:fill-emerald-300 text-[8px] font-bold">Ti: {Math.round(currentStressTi)} MPa</text>
                                </g>
                            </g>

                            <rect 
                                x="50" y="50" width="400" height="200" 
                                fill="transparent" 
                                className="cursor-ew-resize"
                                onPointerDown={(e) => handlePointerDown(e, svgRef, true)}
                                onPointerMove={(e) => handlePointerMove(e, svgRef, true)}
                                onPointerUp={handlePointerUp}
                                onPointerCancel={handlePointerUp}
                            />
                        </svg>
                    </div>
                </div>
            );
        };

        // Note on Materials expandable component
        const NoteOnMaterials = () => {
            const [open, setOpen] = React.useState(false);
            return (
                <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-2xl border border-amber-100 dark:border-amber-800/50 shadow-inner">
                    <div className="flex items-center justify-between gap-4">
                        <h4 className="text-sm font-bold text-amber-800 dark:text-amber-300 flex items-center gap-2">
                            <span>📌</span> Note on Materials
                        </h4>
                        <button
                            onClick={() => setOpen(o => !o)}
                            className="flex-shrink-0 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700/60 px-3 py-1.5 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900/60 transition-colors"
                        >
                            {open ? '▲ Hide' : '▼ Expand'}
                        </button>
                    </div>
                    {open && (
                        <div className="fade-in mt-4 pt-4 border-t border-amber-200 dark:border-amber-800/50">
                            <p className="text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                                <strong>Note on Materials:</strong> In all mathematical models below, 'Steel' refers strictly to cold-worked 316L Stainless Steel (<Latex math="E = 187.5 \text{ GPa}" />) and 'Titanium' refers to Ti-6Al-4V Alloy (<Latex math="E = 114.5 \text{ GPa}" />).<br/><br/>
                                <em>Formula Note:</em> <Latex math="1 \text{ GPa} = 1,000 \text{ MPa}" />. To balance standard metric units (Newtons and mm) so the formulas output stress exactly in MPa (<Latex math="\text{N/mm}^2" />), the modulus <Latex math="E" /> must be inputted into the formulas as <Latex math="187,500" /> and <Latex math="114,500" /> respectively.
                            </p>
                        </div>
                    )}
                </div>
            );
        };

        const AiTutorWidget = () => {
            const [isOpen, setIsOpen] = useState(false);
            const [isExpanded, setIsExpanded] = useState(false);
            const [messages, setMessages] = useState([{ role: "assistant", content: "Hello! I am your biomechanics assistant. Ask me how working length or offset affects construct stability." }]);
            const [input, setInput] = useState("");
            const [isLoading, setIsLoading] = useState(false);
            const messagesEndRef = useRef(null);

            const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            useEffect(() => { scrollToBottom(); }, [messages]);

            const sendMessage = async () => {
                if (!input.trim()) return;
                const userMsg = { role: "user", content: input };
                const newMessages = [...messages, userMsg];
                setMessages(newMessages);
                setInput("");
                setIsLoading(true);

                try {
                    // Send message to our secure Netlify Function. The
                    // function streams its reply back as Server-Sent
                    // Events so the user sees tokens arrive in real time
                    // (and so we are no longer bound by Netlify's 26 s
                    // synchronous-function cap — streaming responses
                    // fall under the much longer streaming cap as long
                    // as bytes keep flowing).
                    const apiMessages = newMessages.filter(m => m.role !== 'system');
                    // Anthropic requires the first message to be from 'user'.
                    // Drop any leading assistant messages (e.g. the display-only greeting).
                    const firstUserIdx = apiMessages.findIndex(m => m.role === 'user');
                    const trimmedMessages = firstUserIdx > 0 ? apiMessages.slice(firstUserIdx) : apiMessages;
                    const response = await fetch('/.netlify/functions/chat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ messages: trimmedMessages })
                    });

                    // Pre-stream errors (e.g. missing API key, malformed
                    // body) still come back as a regular JSON response.
                    // Platform-level failures (Netlify 502, 504, function
                    // crash) come back as HTML — we surface BOTH the HTTP
                    // status and a short body excerpt in the toast so the
                    // user sees something actionable instead of a bare
                    // "Sorry, I encountered an error" with no clue why.
                    const contentType = response.headers.get('content-type') || '';
                    if (!response.ok || !contentType.includes('text/event-stream')) {
                        let detail = `\n\n*(HTTP ${response.status}${response.statusText ? ' ' + response.statusText : ''})*`;
                        try {
                            const raw = await response.text();
                            // Prefer JSON `error` field when the body is
                            // structured. Otherwise fall back to the raw
                            // body (trimmed + truncated) so platform
                            // errors like a 502 HTML page are still visible.
                            let parsed = null;
                            try { parsed = JSON.parse(raw); } catch (_) {}
                            if (parsed && parsed.error) {
                                detail = `\n\n*(HTTP ${response.status}: ${parsed.error})*`;
                            } else if (raw && raw.trim()) {
                                // Strip HTML tags for readability and
                                // cap length so a full HTML error page
                                // doesn't blow up the chat bubble.
                                const cleaned = raw.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
                                const excerpt = cleaned.length > 200 ? cleaned.slice(0, 200) + '…' : cleaned;
                                if (excerpt) detail = `\n\n*(HTTP ${response.status}: ${excerpt})*`;
                            }
                            // Always log the raw body to the console so
                            // the user can grab the full text from
                            // devtools when reporting issues.
                            console.error('[chat] non-stream response', response.status, raw);
                        } catch (_) {}
                        setMessages([...newMessages, { role: "assistant", content: `Sorry, I encountered an error. Please try again.${detail}` }]);
                        return;
                    }

                    // Append a placeholder assistant message that we
                    // mutate as deltas arrive. We track its index so
                    // 'reset' events can clear just this bubble.
                    let assistantText = '';
                    const assistantIdx = newMessages.length;
                    setMessages([...newMessages, { role: "assistant", content: '' }]);

                    const updateAssistant = (next) => {
                        assistantText = next;
                        setMessages(prev => {
                            const copy = prev.slice();
                            copy[assistantIdx] = { role: "assistant", content: assistantText };
                            return copy;
                        });
                    };

                    // SSE reader. Frames are delimited by a blank line;
                    // a frame may span multiple network chunks, so we
                    // buffer until we see the delimiter.
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder();
                    let buffer = '';
                    let streamErrorMessage = null;
                    let sawDone = false;

                    outer: while (true) {
                        const { value, done } = await reader.read();
                        if (done) break;
                        buffer += decoder.decode(value, { stream: true });

                        let frameEnd;
                        while ((frameEnd = buffer.indexOf('\n\n')) !== -1) {
                            const rawFrame = buffer.slice(0, frameEnd);
                            buffer = buffer.slice(frameEnd + 2);

                            let dataPayload = '';
                            for (const line of rawFrame.split('\n')) {
                                if (line.startsWith('data: ')) dataPayload += line.slice(6);
                                else if (line.startsWith('data:')) dataPayload += line.slice(5);
                            }
                            if (!dataPayload) continue;

                            let evt;
                            try { evt = JSON.parse(dataPayload); } catch { continue; }

                            if (evt.type === 'text' && typeof evt.text === 'string') {
                                updateAssistant(assistantText + evt.text);
                            } else if (evt.type === 'reset') {
                                // Pre-tool-call reasoning we just streamed
                                // wasn't the final answer — clear the bubble
                                // and wait for the next streamed turn.
                                updateAssistant('');
                            } else if (evt.type === 'error') {
                                streamErrorMessage = evt.error || 'unknown error';
                                break outer;
                            } else if (evt.type === 'done') {
                                sawDone = true;
                                break outer;
                            }
                        }
                    }

                    if (streamErrorMessage) {
                        const detail = `\n\n*(${streamErrorMessage})*`;
                        // Replace the in-flight bubble with the error message.
                        setMessages(prev => {
                            const copy = prev.slice();
                            copy[assistantIdx] = { role: "assistant", content: `Sorry, I encountered an error. Please try again.${detail}` };
                            return copy;
                        });
                    } else if (!sawDone && !assistantText) {
                        // Stream ended without either a 'done' event or any
                        // text — surface as an error so the user isn't left
                        // staring at an empty bubble.
                        setMessages(prev => {
                            const copy = prev.slice();
                            copy[assistantIdx] = { role: "assistant", content: "Sorry, I encountered an error. Please try again.\n\n*(empty response)*" };
                            return copy;
                        });
                    }
                } catch (error) {
                    setMessages(prev => {
                        // Either we hadn't appended the placeholder yet
                        // (early failure) or we had — handle both.
                        const baseLen = newMessages.length;
                        const copy = prev.slice();
                        if (copy.length > baseLen) {
                            copy[baseLen] = { role: "assistant", content: "Network error. Please try again." };
                        } else {
                            copy.push({ role: "assistant", content: "Network error. Please try again." });
                        }
                        return copy;
                    });
                }
                setIsLoading(false);
            };

            return (
                <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
                    {isOpen && (
                        <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 mb-4 flex flex-col overflow-hidden fade-in transition-all duration-300 ${isExpanded ? 'w-[min(680px,90vw)] h-[min(75vh,700px)]' : 'w-80 md:w-96 h-[450px]'}`}>
                            <div className="bg-blue-600 p-4 text-white font-bold flex justify-between items-center gap-2 flex-shrink-0">
                                <span>Biomechanics Tutor</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsExpanded(e => !e)}
                                        title={isExpanded ? 'Collapse' : 'Expand'}
                                        className="hover:text-blue-200 text-white/80 leading-none"
                                    >
                                        {isExpanded ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="10" y1="14" x2="3" y2="21"/><line x1="21" y1="3" x2="14" y2="10"/></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
                                        )}
                                    </button>
                                    <button onClick={() => setIsOpen(false)} className="hover:text-blue-200">✕</button>
                                </div>
                            </div>
                            <div className="flex-1 p-4 overflow-y-auto bg-slate-50 dark:bg-slate-900 space-y-3 min-h-0">
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`text-sm p-3 rounded-xl max-w-[90%] ${msg.role === 'user' ? 'bg-blue-600 text-white ml-auto rounded-br-none' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 mr-auto rounded-bl-none'}`}>
                                        <MathMessage content={msg.content} isUser={msg.role === 'user'} />
                                    </div>
                                ))}
                                {isLoading && <div className="text-xs text-slate-500 italic">Thinking and calculating...</div>}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex gap-2 flex-shrink-0">
                                <input 
                                    type="text" 
                                    value={input} 
                                    onChange={(e) => setInput(e.target.value)} 
                                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                    placeholder="Ask a question..." 
                                    className="flex-1 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-blue-500"
                                />
                                <button onClick={sendMessage} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                                    Send
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {!isOpen && (
                        <button
                            onClick={() => setIsOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white pl-5 pr-6 py-3.5 rounded-full shadow-xl ring-4 ring-blue-500/30 hover:ring-blue-500/40 transition-all hover:scale-105 flex items-center gap-2.5 font-bold text-sm md:text-base tracking-wide animate-pulse-slow"
                        >
                            <IconActivity />
                            <span>Biomechanics Tutor</span>
                        </button>
                    )}
                </div>
            );
        };

        // --- TAB 1: CORE BIOMECHANICS ---
        const CoreMechanicsTab = () => {
            const [bannerWL, setBannerWL] = useState(60);
            const [bannerDragging, setBannerDragging] = useState(false);
            const [sec10AboveMcomp, setSec10AboveMcomp] = useState(false);
            const bannerSliderRef = React.useRef(null);

            // K-model shared constants used across Sections 7, 8, 9
            const CM_E_Ti  = 114500;
            const CM_E_St  = 187500;
            const CM_Kbone = 50000;
            const CM_M     = 10000;
            const CM_gap   = 1;      // interfragmentary gap (mm)
            const CM_Dbone = 17;     // bone outer diameter (mm) = 2 × r_bone

            const cm_kp = (E, I_p, L) => (E * I_p) / L;
            const cm_stress = (E, I_p, y, L) => {
                const K = cm_kp(E, I_p, L);
                return CM_M * (K / (K + CM_Kbone)) * y / I_p;
            };
            const cm_rate = (E, I_p, y, L) => {
                const K    = cm_kp(E, I_p, L);
                const dKdL = -(E * I_p) / (L * L);
                return CM_M * (y / I_p) * CM_Kbone * dKdL / Math.pow(K + CM_Kbone, 2);
            };
            const cm_mclose = (E, I_p, L) =>
                (E * I_p * CM_gap) / (L * CM_Dbone);

            // Representative Vi plates for Sections 8 & 9 cards
            const cm_plates = [
                { name: "Vi 2.7mm DCP",    I_p: 10.42,  y: 1.25 },
                { name: "Vi 3.5mm Narrow", I_p: 28.67,  y: 1.60 },
                { name: "Vi 3.5mm Broad",  I_p: 74.09,  y: 2.10 },
                { name: "Vi 4.5mm Broad",  I_p: 187.48, y: 2.60 },
            ];

            const handleBannerPointerDown = (e) => {
                setBannerDragging(true);
                e.currentTarget.setPointerCapture(e.pointerId);
                updateBannerFromEvent(e);
            };
            const handleBannerPointerMove = (e) => {
                if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
                updateBannerFromEvent(e);
            };
            const handleBannerPointerUp = (e) => {
                setBannerDragging(false);
                e.currentTarget.releasePointerCapture(e.pointerId);
            };
            const updateBannerFromEvent = (e) => {
                if (!bannerSliderRef.current) return;
                const rect = bannerSliderRef.current.getBoundingClientRect();
                let p = (e.clientX - rect.left) / rect.width;
                p = Math.max(0, Math.min(1, p));
                setBannerWL(Math.round(2 + p * 98));
            };

            const WLBanner = () => (
                <div className="bg-slate-50 dark:bg-slate-900 p-4 md:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm mb-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                            Set Working Length (<Latex math={`L = ${bannerWL}\\,\\mathrm{mm}`} />)
                        </label>
                        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 italic">
                            Shared across Sections 7, 8, 9 &amp; 10
                        </span>
                    </div>
                    <div className="relative w-full flex flex-col items-center justify-center pt-1 select-none">
                        <div
                            className="relative w-full h-10 flex items-center cursor-ew-resize z-10"
                            style={{ touchAction: 'none' }}
                            ref={bannerSliderRef}
                            onPointerDown={handleBannerPointerDown}
                            onPointerMove={handleBannerPointerMove}
                            onPointerUp={handleBannerPointerUp}
                            onPointerCancel={handleBannerPointerUp}
                        >
                            <div className="w-full h-2.5 bg-slate-300 dark:bg-slate-700 rounded-full shadow-inner relative overflow-hidden pointer-events-none">
                                <div className="absolute top-0 left-0 h-full bg-blue-500" style={{ width: `${((bannerWL - 2) / 98) * 100}%` }}></div>
                            </div>
                            <div
                                className="absolute h-6 w-6 bg-amber-500 rounded-full border-[3px] border-white shadow-md pointer-events-none flex items-center justify-center"
                                style={{
                                    left: `calc(${((bannerWL - 2) / 98) * 100}% - 12px)`,
                                    transform: bannerDragging ? 'scale(1.2)' : 'scale(1)',
                                    transition: bannerDragging ? 'none' : 'transform 0.15s ease-out'
                                }}
                            >
                                <div className="h-2 w-0.5 bg-white opacity-50 rounded"></div>
                            </div>
                        </div>
                        <div className="w-full flex justify-between text-[10px] font-bold text-slate-400 px-1 mt-1">
                            <span>L = 2 mm</span>
                            <span>L = 100 mm</span>
                        </div>
                    </div>
                </div>
            );

            return (
            <div className="fade-in space-y-8">
                {/* Introduction */}
                <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner">
                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-3">Introduction</h3>
                    <p className="text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                        This tab analyses the plate–bone construct as a beam in <strong>four-point bending</strong>, the standard model for diaphyseal bone under physiological load. The construct does not behave as a single mechanical object: it transitions between <strong>three distinct regimes</strong> depending on how well the fracture interface can transmit compression at any given instant.
                    </p>
                    <p className="text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-300 mt-3">
                        Sections 1 and 2 establish the bending-stress and composite-AMI fundamentals. <strong>Section 3</strong> then sets out the three-model framework (composite beam, parallel-spring discontinuous beam, small-gap model), states the bending-moment range over which each model is valid, and lists the limitations of each. The remaining sections apply those models in sequence: Sections 4, 5 &amp; 6 use the composite-beam model; Sections 7 &amp; 8 use the parallel-spring discontinuous-beam model; Section 9 uses the small-gap model. <strong>Section 10</strong> brings all three models together in a direct comparison, showing how much compressive reduction actually protects the implant.
                    </p>
                </div>

                <NoteOnMaterials />

                {/* Concept 1: Bending Stress & AMI */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 flex items-center border-b border-slate-200 dark:border-slate-700 pb-2">
                            1. Non-Uniform Stress & AMI
                        </h3>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            The bending moment acts about a <strong>Bending Axis</strong> (which is perpendicular to the stress vectors and always passes through the centroid, which coincides with the centre of gravity in homogeneous materials). This generates a stress gradient within the implant. The stress is <strong>not uniform</strong>: it is zero along the <strong>Neutral Axis</strong> (the plane where compression transitions to tension) and increases linearly the further away you move from it (<Latex math="y" />).
                        </p>
                        <div>
                            <MathToggle>
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-400 text-sm text-slate-700 dark:text-slate-300 flex items-center justify-between">
                                    <span className="font-semibold">Stress Formula:</span>
                                    <Latex math={`\\sigma = \\frac{M \\cdot y}{\\text{AMI}}`} />
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic">
                                    *Note: Stress (<Latex math="\sigma" />) is measured in Megapascals (MPa), which is mathematically equivalent to Newtons per square millimetre (N/mm²).
                                </p>
                            </MathToggle>
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            To fight this stress, we rely on the <strong>Area Moment of Inertia (AMI)</strong>. This is purely a <em>geometric</em> property—it does not depend on the material. It measures the implant's geometric resistance to bending about the bending axis. The less the structure is prone to bend under a certain moment (M), the less the stress it will experience. So, AMI fights stress, and it depends on the distribution of the structure's cross-sectional area about the bending axis. The further away the structure is from the axis, the greater the AMI.
                        </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700 min-h-[250px]">
                        <svg viewBox="0 0 300 200" className="w-full max-w-[280px] h-auto overflow-visible">
                            {/* Beam Longitudinal Section */}
                            <rect x="120" y="40" width="60" height="120" className="fill-slate-200 dark:fill-slate-700 stroke-slate-400" rx="2" />
                            
                            {/* Neutral Axis (Horizontal Plane in side view) */}
                            <line x1="50" y1="100" x2="250" y2="100" className="stroke-red-500 stroke-2 stroke-dasharray-4" />
                            <text x="255" y="103" className="fill-red-500 text-[10px] font-bold">Neutral Axis</text>
                            
                            {/* Bending Axis Marker (Pointing into page) */}
                            <circle cx="150" cy="100" r="4" className="fill-none stroke-red-600 stroke-2" />
                            <line x1="147" y1="97" x2="153" y2="103" className="stroke-red-600 stroke-2" />
                            <line x1="153" y1="97" x2="147" y2="103" className="stroke-red-600 stroke-2" />
                            <text x="160" y="96" className="fill-red-600 dark:fill-red-400 text-[9px] font-bold">Bending Axis (Into page ⊗)</text>
                            
                            {/* Stress Gradient Arrows (Top - Compression) */}
                            <line x1="120" y1="40" x2="70" y2="40" className="stroke-blue-500 stroke-2" markerEnd="url(#arrow-blue)" />
                            <line x1="120" y1="60" x2="85" y2="60" className="stroke-blue-500 stroke-2" markerEnd="url(#arrow-blue)" />
                            <line x1="120" y1="80" x2="105" y2="80" className="stroke-blue-500 stroke-2" markerEnd="url(#arrow-blue)" />
                            
                            {/* Stress Gradient Arrows (Bottom - Tension) */}
                            <line x1="180" y1="120" x2="195" y2="120" className="stroke-amber-500 stroke-2" markerEnd="url(#arrow-amber)" />
                            <line x1="180" y1="140" x2="215" y2="140" className="stroke-amber-500 stroke-2" markerEnd="url(#arrow-amber)" />
                            <line x1="180" y1="160" x2="230" y2="160" className="stroke-amber-500 stroke-2" markerEnd="url(#arrow-amber)" />

                            {/* Distance y */}
                            <line x1="130" y1="100" x2="130" y2="40" className="stroke-slate-800 dark:stroke-white stroke-1" />
                            <text x="122" y="75" className="fill-slate-800 dark:fill-white text-[12px] font-bold italic">y</text>
                            
                            <text x="80" y="30" className="fill-blue-600 dark:fill-blue-400 text-[10px] font-bold" textAnchor="middle">Max Stress</text>
                            <text x="220" y="175" className="fill-amber-600 dark:fill-amber-400 text-[10px] font-bold" textAnchor="middle">Max Stress</text>

                            <defs>
                                <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                                    <path d="M 0 0 L 10 5 L 0 10 z" className="fill-blue-500" />
                                </marker>
                                <marker id="arrow-amber" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                                    <path d="M 0 0 L 10 5 L 0 10 z" className="fill-amber-500" />
                                </marker>
                            </defs>
                        </svg>
                    </div>
                </div>

                {/* Concept 2: The Composite Construct */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700 min-h-[250px] order-last lg:order-first">
                        <svg viewBox="0 0 300 200" className="w-full max-w-[280px] h-auto overflow-visible">
                            {/* Bone Cross Section */}
                            <ellipse cx="150" cy="100" rx="50" ry="60" className="fill-slate-100 dark:fill-slate-800 stroke-slate-400 stroke-2" />
                            <ellipse cx="150" cy="100" rx="25" ry="30" className="fill-white dark:fill-slate-900 stroke-slate-300 stroke-dasharray-2" />
                            
                            {/* Isolated Bone Neutral Axis */}
                            <line x1="150" y1="20" x2="150" y2="180" className="stroke-slate-400 stroke-1 stroke-dasharray-2" />
                            <text x="145" y="20" className="fill-slate-500 text-[8px] font-bold" textAnchor="end">Isolated Bone N.A.</text>

                            {/* Plate */}
                            <rect x="200" y="60" width="15" height="80" className="fill-blue-500 dark:fill-blue-600" rx="2" />
                            
                            {/* Plate Isolated Neutral Axis */}
                            <line x1="207" y1="20" x2="207" y2="180" className="stroke-blue-400 dark:stroke-blue-500 stroke-1 stroke-dasharray-2" />
                            <text x="212" y="20" className="fill-blue-600 dark:fill-blue-400 text-[8px] font-bold" textAnchor="start">Isolated Plate N.A.</text>

                            {/* Shifted Composite Neutral Axis */}
                            <line x1="180" y1="10" x2="180" y2="190" className="stroke-red-500 stroke-2" />
                            <text x="180" y="8" className="fill-red-500 text-[10px] font-bold" textAnchor="middle">Composite Neutral Axis</text>

                            {/* Shift Distance 'd' */}
                            <path d="M 180 160 L 207 160" className="stroke-amber-500 stroke-2" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
                            <text x="193" y="155" className="fill-amber-600 dark:fill-amber-400 text-xs font-bold" textAnchor="middle">d_plate</text>
                            
                            <path d="M 150 140 L 180 140" className="stroke-blue-500 stroke-2" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
                            <text x="165" y="135" className="fill-blue-600 dark:fill-blue-400 text-xs font-bold" textAnchor="middle">d_bone</text>
                        </svg>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-rose-700 dark:text-rose-400 flex items-center border-b border-slate-200 dark:border-slate-700 pb-2">
                            2. Modulus & The Composite AMI
                        </h3>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            In compression osteosynthesis, the bone and plate act together. To calculate the stress specifically <em>in the plate</em>, engineers use the bone as the baseline material and mathematically transform the plate into an equivalent piece of bone using the Modular Ratio (<Latex math={'n = E_{implant} / E_{bone}'} />).
                        </p>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            Because the neutral axis rests between them, the <strong>Parallel Axis Theorem</strong> governs stability. We transform the plate into an equivalent piece of bone by multiplying its geometric contribution by <Latex math="n" />. The Composite AMI equals the local AMIs plus the geometric spread of their areas:
                        </p>
                        <MathToggle>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-rose-50/50 dark:bg-rose-900/10 p-3 rounded-lg border border-rose-200 dark:border-rose-800/50">
                                <Latex math={'\\text{Composite AMI} = n(I_{plate} + A_{plate} d_{plate}^2) + (I_{bone} + A_{bone} d_{bone}^2)'} />
                            </p>
                        </MathToggle>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            Because we transformed the plate into bone, we must multiply the numerator of the stress formula by <Latex math="n" /> to convert the stress back into the stiffer plate material:
                        </p>
                        <MathToggle>
                            <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-lg border-l-4 border-rose-400 text-sm text-slate-700 dark:text-slate-300 flex items-center justify-between">
                                <span className="font-semibold text-xs md:text-sm">Composite Plate Stress:</span>
                                <Latex math={`\\sigma_{\\text{plate}} = n \\cdot \\frac{M \\cdot y}{\\text{Composite AMI}}`} />
                            </div>
                        </MathToggle>
                    </div>
                </div>

                {/* Concept 3: Three-Model Framework — when each model is valid */}
                <div className="grid grid-cols-1 gap-6 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400 flex items-center border-b border-slate-200 dark:border-slate-700 pb-2">
                            3. When Is the Composite-Beam Assumption Valid? Three Models for Three Regimes
                        </h3>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            Section 2 wrote the plate stress as <Latex math={'\\sigma_{plate} = n \\cdot M\\,y / \\text{AMI}_{composite}'} />. That formula treats the plate and the underlying bone as <em>physically locked into a single composite beam</em>. But the bone is fractured — it has zero tensile strength across the fracture line. A fractured bone can carry compression where the cortices touch, but it cannot carry tension across a gap. So how can a discontinuous structure ever behave like a continuous composite beam?
                        </p>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            The resolution is the <strong>inter-fragmentary compression</strong> applied by the surgeon (lag screw, DCP ramp, or pre-bent plate). That compression provides a <em>baseline</em> compressive stress across the entire fracture cross-section. By the principle of superposition, that baseline can absorb a finite amount of bending-induced tensile stress before the net stress on the would-be tension side ever turns positive. As long as the bending moment stays below this absorption ceiling, the cortices never separate, the construct is mechanically continuous, and the composite-beam analysis is exact.
                        </p>

                        {/* Validity-range derivation */}
                        <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-xl border border-amber-200 dark:border-amber-800/50 space-y-3">
                            <strong className="text-amber-800 dark:text-amber-300 text-sm block">Validity range of the composite-beam assumption</strong>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                Let the surgeon-applied axial pre-load be <Latex math="P" />, the bone cross-sectional area <Latex math="A_b" />, the bone area moment of inertia <Latex math="I_b" />, and the distance from the neutral axis to the extreme cortical fibre <Latex math="c" />. The compressive pre-stress is <Latex math={'\\sigma_{pre} = P / A_b'} />, applied uniformly across the section. A bending moment <Latex math="M" /> superimposes a stress <Latex math={'\\pm M\\,c / I_b'} /> at the extreme fibres. The net stress on the tension side stays compressive (i.e. the gap never opens) provided:
                            </p>
                            <p className="text-xs text-center"><Latex math={'M \\;\\le\\; M_{decomp} \\;=\\; \\dfrac{\\sigma_{pre}\\,I_b}{c} \\;=\\; \\dfrac{P\\,I_b}{A_b\\,c}'} /></p>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                Below <Latex math="M_{decomp}" /> the cortices stay locked, the construct behaves as a continuous composite beam, and the transformed-section formula <Latex math={'\\sigma_{plate} = n\\,M\\,y / \\text{AMI}_{composite}'} /> applies. Above <Latex math="M_{decomp}" /> the tension-side cortex decompresses, the gap opens, and the composite assumption breaks down — the construct must be re-modelled as two fragments connected only by the plate and the contacting (compression-side) cortex.
                            </p>
                        </div>

                        {/* Three model cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                            <div className="bg-rose-50 dark:bg-rose-900/10 p-4 rounded-xl border border-rose-200 dark:border-rose-800/50 space-y-2">
                                <strong className="text-rose-700 dark:text-rose-400 text-sm block">Model A — Composite Beam (Transformed Section)</strong>
                                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed"><strong>Used by:</strong> Sections 4 &amp; 5.</p>
                                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed"><strong>Formula:</strong> <Latex math={'\\sigma_{plate} = n\\,M\\,y / \\text{AMI}_{composite}'} />.</p>
                                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed"><strong>Valid when:</strong> the fracture is well-reduced and inter-fragmentarily compressed, full bone-to-bone cortical contact across the fracture line, and the applied bending moment satisfies <Latex math="M \\le M_{decomp}" />.</p>
                                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed"><strong>Limitations:</strong> assumes the pre-load <Latex math="P" /> is preserved in vivo (no screw loosening, no peri-fracture bone resorption), assumes loading stays in the elastic range, and is invalidated immediately if any moment exceeds <Latex math="M_{decomp}" /> (the gap opens and the cortices stop transmitting force).</p>
                            </div>
                            <div className="bg-indigo-50 dark:bg-indigo-900/10 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800/50 space-y-2">
                                <strong className="text-indigo-700 dark:text-indigo-400 text-sm block">Model B — Parallel-Spring (Discontinuous Beam)</strong>
                                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed"><strong>Used by:</strong> Sections 7 &amp; 8.</p>
                                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed"><strong>Formula:</strong> <Latex math={'M_{plate} = M\\,K_{plate}/(K_{plate}+K_{bone})'} />, then <Latex math={'\\sigma_{plate} = M_{plate}\\,y / I_p'} />, with <Latex math={'K_{plate}=E_p I_p / L'} /> and <Latex math={'K_{bone}\\approx 50{,}000\\,\\mathrm{N\\!\\cdot\\!mm/rad}'} /> (cortical contact stiffness, L-independent).</p>
                                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed"><strong>Valid when:</strong> the bending moment exceeds <Latex math="M_{decomp}" /> (so the gap opens) <em>but</em> the compression-side cortex still touches, so the bone behaves as a discontinuous beam joined by a rotational spring at the fracture interface.</p>
                                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed"><strong>Limitations:</strong> assumes immediate cortical contact on the compression side (no residual gap), neglects the geometric coupling between plate bending and the contacting cortex (slightly over-estimates plate stress), and uses an empirical <Latex math="K_{bone}" /> that is patient- and reduction-specific.</p>
                            </div>
                            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/50 space-y-2">
                                <strong className="text-emerald-700 dark:text-emerald-400 text-sm block">Model C — Small-Gap (<Latex math="M_{close}" />)</strong>
                                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed"><strong>Used by:</strong> Section 9.</p>
                                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed"><strong>Formula:</strong> below the closure moment <Latex math={'M_{close} = E_p I_p\\,g/(L\\,D_{bone})'} /> the plate carries 100% of the load (<Latex math={'\\sigma_{plate}=M\\,y/I_p'} />); above <Latex math="M_{close}" /> Model B takes over.</p>
                                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed"><strong>Valid when:</strong> a residual interfragmentary gap <Latex math="g" /> persists. This includes the case where the fracture was perfectly reduced and compressed but <strong>peri-fracture bone resorption</strong> subsequently created a small gap — the pre-load is then lost and the construct enters this regime even though it began life as a Model A construct.</p>
                                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed"><strong>Limitations:</strong> assumes pure bending (no axial load), assumes the gap is small enough that contact <em>can</em> be regained at clinically realistic moments, and uses a step-change to load-sharing at <Latex math="M_{close}" /> that real cortices reach more gradually (slightly optimistic on plate stress at the moment of first contact).</p>
                            </div>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-400 italic leading-relaxed pt-1">
                            <strong>How to choose:</strong> the same construct can sit in different regimes at different instants. A perfectly reduced and compressed long-bone osteotomy lives in <em>Model A</em> for moderate physiological loads, transiently visits <em>Model B</em> during high-impact gait events that exceed <Latex math="M_{decomp}" />, and migrates into <em>Model C</em> if peri-implant resorption ever opens a gap. The remaining sections of this tab analyse each regime in turn.
                        </p>
                    </div>
                </div>

                {/* Concept 4 (was 3): The Material Paradox — Composite Beam Model */}
                <div className="grid grid-cols-1 gap-6 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 flex items-center border-b border-slate-200 dark:border-slate-700 pb-2">
                            4. The Material Compliance Paradox <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-2">(Composite-Beam Model)</span>
                        </h3>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            Looking at <Latex math={`\\sigma = n \\cdot \\frac{M \\cdot y}{\\text{AMI}}`} />, you might assume a stiffer plate is safer because it pulls the axis closer (smaller <Latex math="y" />). So why does Steel actually experience <span className="text-rose-600 dark:text-rose-400 font-bold">more</span> stress? The interactive graphs below reveal the mechanical Tug-of-War:
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/50">
                                <strong className="text-emerald-700 dark:text-emerald-400 text-sm block mb-1">Titanium balances the Axis</strong>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Titanium has a moderate multiplier (<Latex math="n \approx 6.4" />). The mathematically transformed plate is similar in size to the bone, keeping the neutral axis safely balanced. The stress multiplier (<Latex math="n" />) is low, so the final stress remains low.
                                </p>
                            </div>
                            <div className="bg-rose-50 dark:bg-rose-900/10 p-4 rounded-xl border border-rose-200 dark:border-rose-800/50">
                                <strong className="text-rose-700 dark:text-rose-400 text-sm block mb-1">Steel crushes the geometry</strong>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Steel is extremely stiff (<Latex math="n \approx 10.4" />). This mathematically transforms the plate into a massive structure, pulling the neutral axis very close to the plate, drastically crushing <Latex math="d_{plate}" />. While this technically <em>increases</em> the total Composite AMI, the plate stress is multiplied by <Latex math="n" />. This massive multiplier in the numerator vastly overpowers the increased AMI denominator, causing the stress to spike!
                                </p>
                            </div>
                        </div>
                        
                        <div className="pt-2">
                            <ParadoxInteractiveGraph />
                        </div>

                    </div>
                </div>

                {/* Concept 5 (was 4): The Geometric Contrast — Composite Beam Model */}
                <div className="grid grid-cols-1 gap-6 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 flex items-center border-b border-slate-200 dark:border-slate-700 pb-2">
                            5. The Geometric Contrast — Changing Plate Size <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-2">(Composite-Beam Model)</span>
                        </h3>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            It is crucial not to confuse changing a plate's <em>Material</em> with changing a plate's <em>Geometry</em>. As we just proved above, increasing stiffness by swapping to Steel spikes the plate stress. But what happens if we use the exact same material and just make the plate physically thicker?
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800/50">
                                <strong className="text-blue-700 dark:text-blue-400 text-sm block mb-1">More Geometry = Less Stress</strong>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Making the plate thicker physically increases the implant's geometric contribution (<Latex math="I_p" /> and <Latex math="A_p" />). Because the material hasn't changed, there is no new <Latex math="n" /> multiplier penalising the equation. The growing Plate AMI rapidly drives the total Composite AMI upwards, naturally reducing the stress.
                                </p>
                            </div>
                            <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                                <strong className="text-slate-700 dark:text-slate-300 text-sm block mb-1">Steady Returns, Falling Rate</strong>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    You might assume that because Plate AMI grows cubically with thickness (<Latex math="t^3" />), it should easily overpower the linear growth of <Latex math="y" />. Look closely at the live formula! As the plate gets thicker, it pulls the neutral axis towards itself, so the Plate's lever arm (<Latex math="d_{plate}" />) shrinks while the Bone's lever arm (<Latex math="d_{bone}" />) grows — and the bone term <Latex math="A_b \cdot d_{bone}^2" /> rises sharply. Across the full Vi catalogue (2.7 → 4.5 Broad), the Total Composite AMI grows by roughly <strong>~54%</strong>, and the stress curve falls almost linearly with each upsize step — a meaningful drop per step rather than a true plateau. The <em>rate per unit <Latex math="I_p" /></em> does fall steeply, but the <em>absolute</em> stress reduction at each successive size step does not flatten.
                                </p>
                            </div>
                        </div>
                        
                        <div className="pt-2">
                            <PlateSizeInteractiveGraph />
                        </div>

                    </div>
                </div>

                {/* Concept 6: The Verdict — Composite-Beam Model */}
                <div className="grid grid-cols-1 gap-6 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="space-y-5">
                        <h3 className="text-xl font-bold text-teal-700 dark:text-teal-400 flex items-center border-b border-slate-200 dark:border-slate-700 pb-2">
                            6. The Verdict: Material vs. Geometry <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-2">(Composite-Beam Model — Compressive Construct)</span>
                        </h3>

                        <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 mb-2">
                            <strong className="text-slate-800 dark:text-slate-200 text-sm block mb-1">The Fixed Bone Constraint</strong>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                To scientifically compare these variables, the models above lock the bone geometry to a medium-sized canine bone (<Latex math="I_b = 10{,}000\,\mathrm{mm}^4" />). Clinically, applying a 4.5mm Broad plate to a bone of this size is unrealistic, but isolating bone size is mathematically necessary to calculate the exact <strong>rate of change</strong> of stress as the implant is varied.
                            </p>
                        </div>

                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800/50 mb-2">
                            <strong className="text-indigo-800 dark:text-indigo-300 text-sm block mb-1">Why there is no Span (Working Length) card here</strong>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                In the composite-beam model, plate stress is <Latex math={'\\ \\sigma_{plate} = n \\cdot M \\cdot y\\,/\\,\\text{AMI}_{composite}'} />. Working length <Latex math="L" /> does not appear anywhere in this formula. Provided the construct remains compressively loaded (no gap opens), extending the plate span has <strong>zero</strong> first-order effect on plate stress in this regime. The Span lever only becomes relevant in the spring-model regime (Section 7), where <Latex math="K_{plate} = EI_{plate}/L" /> introduces an L-dependence. <em>This contrast is precisely why the two models are complementary rather than interchangeable.</em>
                            </p>
                        </div>

                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            With Span removed, the composite-beam verdict reduces to two levers: <em>Material</em> (the modular ratio <Latex math="n" />) and <em>Geometry</em> (the physical plate dimensions). The comparison below uses the same reference bone as Sections 4 &amp; 5.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* MATERIAL CARD — composite model */}
                            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800/50 h-auto flex flex-col">
                                {(() => {
                                    // Section 4 / ParadoxInteractiveGraph constants
                                    const boneE = 18.0;
                                    const n_Ti = 114.5 / boneE;
                                    const n_St = 187.5 / boneE;
                                    const D = 10; const A_p = 30; const I_p = 25;
                                    const A_b = 150; const I_b = 10000;
                                    const Moment = 10000; const plateHalf = 1.5;
                                    const getDP = (n) => (A_b * D) / (n * A_p + A_b);
                                    const getAMI = (n) => { const dp = getDP(n); const db = D - dp; return n * (I_p + A_p * dp * dp) + (I_b + A_b * db * db); };
                                    const getStress = (n) => { const dp = getDP(n); const y = dp + plateHalf; return (n * Moment * y) / getAMI(n); };
                                    const sTi = getStress(n_Ti);
                                    const sSt = getStress(n_St);
                                    const dSig = sSt - sTi;
                                    return (
                                        <>
                                        <strong className="text-emerald-700 dark:text-emerald-400 text-sm block mb-2">1. Material Compliance (Composite-Beam Model)</strong>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                                            Using the composite-beam model (Sections 4 &amp; 5) with the reference plate (I_p = 25 mm⁴, t = 3 mm), swapping from 316L Steel to Ti-6Al-4V gives:
                                        </p>
                                        <div className="bg-white dark:bg-slate-800 p-2 rounded border border-emerald-200 dark:border-emerald-700 text-center font-mono text-[10px] text-emerald-600 dark:text-emerald-400 mb-1 shadow-sm flex flex-col gap-0.5">
                                            <span>Steel: <strong>{sSt.toFixed(1)} MPa</strong> → Titanium: <strong>{sTi.toFixed(1)} MPa</strong></span>
                                            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Δ −{dSig.toFixed(1)} MPa total</span>
                                            <span className="text-[9px] text-slate-500 dark:text-slate-400">n_Steel ≈ {n_St.toFixed(1)} vs. n_Ti ≈ {n_Ti.toFixed(1)} — steel's high modular ratio spikes plate stress</span>
                                        </div>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-auto">
                                            <strong>Conclusion:</strong> Switching to Titanium reduces composite-model plate stress by ~{Math.round(dSig)} MPa. Unlike the spring model, this reduction comes entirely from the lower <Latex math="n" /> ratio — not from load-shifting through the fracture interface. The stresses (~{Math.round(sTi)}–{Math.round(sSt)} MPa) are far lower than spring-model values because the intact composite AMI carries most of the moment.
                                        </p>
                                        </>
                                    );
                                })()}
                            </div>

                            {/* GEOMETRY CARD — composite model, using same cm_plates as Sections 8 & 9 */}
                            <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-200 dark:border-blue-800/50 h-auto flex flex-col">
                                {(() => {
                                    // Composite-beam model — Ti material, same bone geometry as Sections 4 & 5.
                                    // A_p derived from the rectangular-section identity A_p = 3·I_p / y²
                                    // (exact for any rectangular plate where y = t/2 and I_p = w·t³/12).
                                    const n = 114.5 / 18.0; // Ti modular ratio
                                    const r_bone = 8.5; const A_b = 150; const I_b = 10000; const Moment = 10000;
                                    const getCompStress = (p) => {
                                        const A_p = 3 * p.I_p / (p.y * p.y);
                                        const D_i = r_bone + p.y;
                                        const dp  = A_b * D_i / (n * A_p + A_b);
                                        const db  = D_i - dp;
                                        const AMI = n * (p.I_p + A_p * dp * dp) + (I_b + A_b * db * db);
                                        return (n * Moment * (dp + p.y)) / AMI;
                                    };
                                    // cm_plates = same four plates used in Sections 8 & 9
                                    const steps = [
                                        { from: cm_plates[0], to: cm_plates[1] },
                                        { from: cm_plates[1], to: cm_plates[2] },
                                        { from: cm_plates[2], to: cm_plates[3] },
                                    ];
                                    const stepColors = [
                                        'text-emerald-600 dark:text-emerald-400',
                                        'text-amber-600 dark:text-amber-400',
                                        'text-rose-600 dark:text-rose-400',
                                    ];
                                    return (
                                        <>
                                        <strong className="text-blue-700 dark:text-blue-400 text-sm block mb-2">2. Changing Geometry (Composite-Beam Model)</strong>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 italic mb-2 border-l-2 border-blue-300 dark:border-blue-700 pl-2">
                                            *Note: Composite-beam model (Section 5), <strong>Ti-6Al-4V plate</strong>. Same four plates as Sections 8 &amp; 9 (Vi 2.7mm DCP → Vi 3.5mm Narrow → Vi 3.5mm Broad → Vi 4.5mm Broad).
                                        </p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                                            As plate size (<Latex math="I_p" />) increases, the composite AMI grows and plate stress falls — with <strong>no working-length dependence</strong>:
                                        </p>
                                        <ul className="space-y-2 text-[10px] font-mono text-slate-700 dark:text-slate-300 mb-4 bg-white dark:bg-slate-800 p-3 rounded border border-blue-200 dark:border-blue-700 shadow-sm">
                                        {steps.map((s, i) => {
                                            const sFrom = getCompStress(s.from);
                                            const sTo   = getCompStress(s.to);
                                            const delta = sFrom - sTo;
                                            return (
                                                <li key={i} className={`flex justify-between items-center ${i < 2 ? 'border-b border-slate-100 dark:border-slate-700 pb-2' : ''} ${i > 0 ? 'pt-2' : ''}`}>
                                                    <span className="text-[9px]">{s.from.name} → {s.to.name}:</span>
                                                    <span className={`${stepColors[i]} font-bold`}>Δ −{delta.toFixed(1)} MPa</span>
                                                </li>
                                            );
                                        })}
                                        </ul>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-auto">
                                            <strong>Conclusion:</strong> Upsizing the plate reduces stress at every step in the composite-beam model, entirely independent of working length. The absolute reductions are modest because the composite AMI is already large. <em>Critically, this analysis assumes compressive contact is maintained throughout. If a gap exists or opens, the composite assumption breaks down and the spring-model analysis (Sections 7 &amp; 8) applies instead.</em>
                                        </p>
                                        </>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Concept 7 (was 6): Span-Material Equivalence — Spring Model (Discontinuous Beam) */}
                <div className="grid grid-cols-1 gap-6 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="space-y-4">
                        {WLBanner()}
                        <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 flex items-center border-b border-slate-200 dark:border-slate-700 pb-2">
                            7. Span–Material Equivalence <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-2">(Spring Model — Discontinuous Beam)</span>
                        </h3>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            You are entirely correct to wonder: if the pure bending stress formula is <Latex math="\sigma = \frac{M \cdot y}{I}" />, and Working Length (<Latex math="L" />) is nowhere in that equation, how does increasing <Latex math="L" /> actually decrease plate stress in a compressive (closed-gap) construct? The answer requires understanding why the plate and the fractured bone have fundamentally different stiffness characters.
                        </p>

                        <div className="bg-indigo-50 dark:bg-indigo-900/10 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800/50 space-y-3">
                            <p className="text-indigo-800 dark:text-indigo-300 text-sm font-semibold">Why <Latex math="K_{plate} = EI_{plate}/L" /> (plate has no discontinuity)</p>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                The plate spans the working length as a <strong>continuous elastic beam</strong>. There is no fracture in the plate, no discontinuity in its material or cross-section. Its rotational stiffness is exactly the beam-bending stiffness of a uniform elastic beam of length <Latex math="L" />:
                            </p>
                            <p className="text-xs text-center">
                                <Latex math={'K_{plate} = \\dfrac{E_{plate} \\, I_{plate}}{L}'} />
                            </p>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                Doubling <Latex math="L" /> halves <Latex math="K_{plate}" />. The plate becomes mechanically softer in direct proportion to its span. This is a first-principles result for a simple elastic beam.
                            </p>
                        </div>

                        <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-xl border border-amber-200 dark:border-amber-800/50 space-y-3">
                            <p className="text-amber-800 dark:text-amber-300 text-sm font-semibold">Why <Latex math="K_{bone} \neq EI_{bone}/L" /> — the fracture discontinuity</p>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                The bone has a fracture. There is a <strong>geometric discontinuity</strong> at the fracture plane. You cannot model the bone across that discontinuity as a continuous elastic beam — the formula <Latex math="K = EI/L" /> assumes material continuity over the full span, which the fractured bone does not have.
                            </p>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                Instead, the bone's rotational resistance comes entirely from the <strong>local mechanics of cortical-to-cortical contact at the fracture interface</strong>. This interface contact stiffness (<Latex math="K_{bone} \approx 50{,}000\\,\\mathrm{N{\\cdot}mm/rad}" />) is an empirical property of the bone surface geometry, contact area, and bone quality. It is <strong>independent of working length L</strong>. Extending the plate span does not change how rigidly bone fragments resist rotation at the point where they touch — it only changes the plate's own bending stiffness.
                            </p>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                            <strong className="text-slate-800 dark:text-slate-200 text-sm block">The result: Load Sharing via the Fracture Discontinuity</strong>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                Because the plate and the fractured bone act as rotational springs at the fracture plane, they share the total bending moment proportional to their relative stiffnesses:
                            </p>
                            <MathToggle>
                                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-indigo-50/50 dark:bg-indigo-900/10 p-3 rounded-lg border border-indigo-200 dark:border-indigo-800/50 text-center font-serif overflow-x-auto">
                                    <Latex math={'M_{plate} = M_{total} \\times \\frac{K_{plate}}{K_{plate} + K_{bone}} = M_{total} \\times \\frac{E_p I_p / L}{E_p I_p / L + K_{bone}}'} />
                                </p>
                            </MathToggle>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                As <Latex math="L" /> increases, <Latex math="K_{plate}" /> falls (∝ 1/L) while <Latex math="K_{bone}" /> stays constant. The fraction <Latex math="K_{plate}/(K_{plate}+K_{bone})" /> falls, so the plate carries less of the moment and plate stress drops. This benefit exists <em>only</em> because the fracture discontinuity makes <Latex math="K_{bone}" /> an interface property rather than a beam property. If the bone were continuous (no fracture), both stiffnesses would scale with 1/L equally, and changing L would shift no load at all.
                            </p>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mt-1">
                                At the reference L = 60 mm: switching from Steel to Titanium drops plate stress by <strong>~73 MPa</strong>. To achieve the same reduction with a Steel plate by increasing L instead, you would need to extend L by <strong>~38 mm</strong> (from 60 → 98 mm). Use the banner above and the graph below to verify this equivalence.
                            </p>
                        </div>

                        <div className="bg-rose-50 dark:bg-rose-900/10 p-4 rounded-xl border border-rose-200 dark:border-rose-800/50 space-y-3">
                            <strong className="text-rose-800 dark:text-rose-300 text-sm block">Important: Stress uses only <Latex math="I_p" /> here — not the composite AMI</strong>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                In Sections 4 &amp; 5 we computed plate stress using the <em>composite</em> Area Moment of Inertia of the bonded plate-bone cross-section: <Latex math={'\\sigma_{plate} = n \\cdot \\dfrac{M \\cdot y}{\\text{AMI}_{composite}}'} />. That formula assumes the plate and the underlying bone bend together as a single fused beam — valid only while the bending moment stays below <Latex math="M_{decomp}" /> (Section 3).
                            </p>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                In the load-sharing K model used here, the bone is no longer continuous across the fracture, so we cannot treat plate + bone as a single composite cross-section any more. Instead, we split the total moment between the plate and the fracture interface (via <Latex math="K_{plate}" /> and <Latex math="K_{bone}" />), and we then compute plate stress as a <strong>solo beam</strong> bending under its share of the moment, using only the plate's own cross-section:
                            </p>
                            <p className="text-xs text-center"><Latex math={'\\sigma_{plate} = \\dfrac{M_{plate} \\cdot y}{I_p}'} /></p>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                <strong>Limitation of this assumption.</strong> Using only <Latex math="I_p" /> ignores the geometric constraint that the cortical-to-cortical contact at the far fragment imposes on plate bending. In reality, the bone fragment remains bonded to the plate on each side of the fracture, and the contact at the far cortex acts as a hinge that partially constrains how the plate is allowed to bow. A full model would couple plate bending to that constraint, raising the effective bending stiffness of the plate slightly. The pure K model neglects this coupling — a fair simplification that lets us isolate the load-sharing effect cleanly, but a known limitation of the model. Real plate stress will be slightly lower than what this model predicts.
                            </p>
                        </div>

                        <div className="pt-4">
                            <LoadSharingInteractiveGraph controlledWL={bannerWL} onWLChange={setBannerWL} />
                        </div>
                        <p className="text-xs text-slate-500 italic mt-2">
                            *Note: While increasing <Latex math="L" /> limits initial stress in load-sharing, it exponentially increases plate stress in load-bearing (bridging) scenarios — see the "Closing-gap" tab. These load-sharing conclusions assume post-closure cortical contact. Section 9 below extends the analysis to a realistic 1 mm gap (the small-gap model), showing how M_close determines when load-sharing begins and why upsizing can be paradoxically harmful.
                        </p>
                    </div>
                </div>

                {/* Concept 8 (was 7): The Mathematical Verdict — Spring Model */}
                <div className="grid grid-cols-1 gap-6 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="space-y-4">
                        {WLBanner()}
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center border-b border-slate-200 dark:border-slate-700 pb-2">
                            8. The Verdict: Material vs. Span vs. Geometry <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-2">(Spring Model — Discontinuous Beam)</span>
                        </h3>
                        
                        <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 mb-4">
                            <strong className="text-slate-800 dark:text-slate-200 text-sm block mb-1">The Fixed Bone Constraint</strong>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                To scientifically compare these variables, the mathematical models above lock the bone geometry to a medium-sized canine bone (<Latex math="I_b = 10,000" />). Clinically, applying a massive 4.5mm Broad plate to a bone of this size is unrealistic. However, isolating the bone size is mathematically necessary so we can calculate the exact <strong>derivative of stress</strong> (the rate of change) as we manipulate the implant.
                            </p>
                        </div>

                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            By calculating the mathematical rates of change across the curves, we can objectively compare the three levers — <em>Material, Span, and Geometry</em> — and weigh each against its clinical cost: added physical bulk, soft-tissue burden, and <strong>stress-shielding of the underlying bone</strong>.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* MATERIAL CARD — K model, dynamic at bannerWL */}
                            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800/50 h-auto flex flex-col">
                                {(() => {
                                    const I_p = 25; const y = 1.5;
                                    const sTi  = cm_stress(CM_E_Ti, I_p, y, bannerWL);
                                    const sSt  = cm_stress(CM_E_St, I_p, y, bannerWL);
                                    const dSig = sSt - sTi; // positive = steel higher
                                    // How much extra L needed on the Steel plate to match sTi?
                                    // Solve: cm_stress(E_St, I_p, y, L_eq) = sTi
                                    const K_target = sTi * I_p / y / CM_M; // K/(K+K_bone) fraction
                                    const K_needed = K_target * CM_Kbone / (1 - K_target);
                                    const L_eq = CM_E_St * I_p / K_needed;
                                    const dL   = Math.max(0, L_eq - bannerWL);
                                    const rate  = Math.abs(cm_rate(CM_E_St, I_p, y, bannerWL));
                                    return (
                                        <>
                                        <strong className="text-emerald-700 dark:text-emerald-400 text-sm block mb-2">1. Material Compliance (Load-Sharing K Model)</strong>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                                            Using the parallel-spring load-sharing model (Section 7) at L = <strong>{bannerWL} mm</strong>, swapping from 316L Steel to Ti-6Al-4V gives:
                                        </p>
                                        <div className="bg-white dark:bg-slate-800 p-2 rounded border border-emerald-200 dark:border-emerald-700 text-center font-mono text-[10px] text-emerald-600 dark:text-emerald-400 mb-1 shadow-sm flex flex-col gap-0.5">
                                            <span>Steel: <strong>{Math.round(sSt)} MPa</strong> → Titanium: <strong>{Math.round(sTi)} MPa</strong></span>
                                            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Δ −{Math.round(dSig)} MPa total</span>
                                            <span className="text-[9px] text-slate-500 dark:text-slate-400">≡ extending Steel L by ~{Math.round(dL)} mm (to {Math.round(bannerWL + dL)} mm)</span>
                                            <span className="text-[9px] text-slate-500 dark:text-slate-400">Steel rate at this L: ~{rate.toFixed(1)} MPa per mm of L</span>
                                        </div>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-auto">
                                            <strong>Conclusion:</strong> Switching to Titanium reduces plate stress by ~{Math.round(dSig)} MPa at the current working length — <em>without adding bulk or increasing stress-shielding</em>. The equivalent span extension required on the Steel plate (~{Math.round(dL)} mm) illustrates how powerful the material choice is. Use the banner above to see how both values change across the full working-length range.
                                        </p>
                                        </>
                                    );
                                })()}
                            </div>

                            {/* SPAN CARD */}
                            <div className="bg-indigo-50 dark:bg-indigo-900/10 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800/50 h-auto flex flex-col">
                                <strong className="text-indigo-700 dark:text-indigo-400 text-sm block mb-2">2. Span (The Equivalent Working Length)</strong>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                                    In a compressive load-sharing fracture (Section 7), increasing the working length softens the plate, safely shifting load to the bone. Increasing L drops stress at an approximate rate of:
                                </p>
                                <div className="bg-white dark:bg-slate-800 p-2 rounded border border-indigo-200 dark:border-indigo-700 text-center font-mono text-[10px] text-indigo-600 dark:text-indigo-400 mb-3 shadow-sm flex flex-col gap-0.5">
                                    {(() => {
                                        const I_p = 25; const y = 1.5;
                                        const rateTi = Math.abs(cm_rate(CM_E_Ti, I_p, y, bannerWL));
                                        const rateSt = Math.abs(cm_rate(CM_E_St, I_p, y, bannerWL));
                                        return (
                                            <>
                                            <span className="text-xs font-bold">Rate at L = {bannerWL} mm:</span>
                                            <span>Ti: ~{rateTi.toFixed(1)} MPa / mm &nbsp;|&nbsp; Steel: ~{rateSt.toFixed(1)} MPa / mm</span>
                                            <span className="text-[9px] text-slate-400 dark:text-slate-500">(Rate is steepest at short L, shallows as L grows)</span>
                                            </>
                                        );
                                    })()}
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-auto">
                                    <strong>Conclusion:</strong> Each extra millimetre of working length reduces plate stress — steeply at short spans (high K_plate sensitivity) and more gradually at longer spans. The rate is always higher for Steel than Titanium at the same L, because Steel has a higher K_plate. Use the banner to see how the rate changes across the 2–100 mm range.
                                </p>
                            </div>

                            {/* GEOMETRY CARD (Full Width) — K model, dynamic at bannerWL */}
                            <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-200 dark:border-blue-800/50 md:col-span-2 flex flex-col">
                                <strong className="text-blue-700 dark:text-blue-400 text-sm block mb-2">3. Changing Geometry (Load-Sharing K Model)</strong>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 italic mb-2 border-l-2 border-blue-300 dark:border-blue-700 pl-2">
                                    *Note: Evaluated using the parallel-spring K model (Section 7) at current L = {bannerWL} mm, <strong>316L Steel plate</strong>. Four representative Vi plates shown.
                                </p>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                                    As plate size (<Latex math="I_p" />) increases, <Latex math="K_{plate}" /> rises (plate takes more moment) but <Latex math="I_p" /> in the denominator also rises (section resists stress better). The net effect is a meaningful stress reduction at each step — but in the K model the steps are larger than in the closed-gap composite model because the plate bears the full load-sharing burden:
                                </p>
                                {(() => {
                                    const steps = [
                                        { from: cm_plates[0], to: cm_plates[1] },
                                        { from: cm_plates[1], to: cm_plates[2] },
                                        { from: cm_plates[2], to: cm_plates[3] },
                                    ];
                                    const colors = [
                                        { text: 'text-emerald-600 dark:text-emerald-400', border: 'border-slate-100 dark:border-slate-700' },
                                        { text: 'text-amber-600 dark:text-amber-400',   border: 'border-slate-100 dark:border-slate-700' },
                                        { text: 'text-rose-600 dark:text-rose-400',     border: '' },
                                    ];
                                    return (
                                        <ul className="space-y-2 text-[10px] font-mono text-slate-700 dark:text-slate-300 mb-4 bg-white dark:bg-slate-800 p-3 rounded border border-blue-200 dark:border-blue-700 shadow-sm">
                                        {steps.map((s, i) => {
                                            const sFrom = cm_stress(CM_E_St, s.from.I_p, s.from.y, bannerWL);
                                            const sTo   = cm_stress(CM_E_St, s.to.I_p,   s.to.y,   bannerWL);
                                            const delta = sFrom - sTo;
                                            const rate  = Math.abs(cm_rate(CM_E_St, s.from.I_p, s.from.y, bannerWL));
                                            const dLEquiv = rate > 0 ? delta / rate : 0;
                                            return (
                                                <li key={i} className={`flex justify-between items-center ${i < 2 ? 'border-b ' + colors[i].border + ' pb-2' : ''} ${i > 0 ? 'pt-2' : ''}`}>
                                                    <span className="text-[9px]">{s.from.name.replace('Vi ', '')} → {s.to.name.replace('Vi ', '')}:</span>
                                                    <div className="text-right">
                                                        <span className={`${colors[i].text} font-bold block`}>Δ −{Math.round(delta)} MPa total</span>
                                                        <span className="text-[8px] text-slate-400 dark:text-slate-500">≡ ~{Math.round(dLEquiv)} mm more L on 2.7mm plate</span>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                        </ul>
                                    );
                                })()}
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-auto">
                                    <strong>Conclusion:</strong> Each up-size step delivers a large absolute reduction in plate stress in the K load-sharing model (shown here for steel — the stiffer material exposes the geometry effect most clearly). The "equivalent L increase" column shows how many millimetres of working-length extension on the smallest plate it would take to achieve the same stress drop — highlighting that geometry is a very powerful lever. <em>Critical caveat: this assumes cortical contact exists (closed gap). Section 9 below shows how upsizing can paradoxically <strong>increase</strong> plate stress when a realistic 1 mm gap is present, because a stiffer plate raises M_close and may prevent gap closure entirely.</em>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Concept 9 (was 8): The Realistic 1 mm Gap Scenario — Small-Gap Model */}
                <div className="grid grid-cols-1 gap-6 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="space-y-5">
                        {WLBanner()}
                        <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400 flex items-center border-b border-slate-200 dark:border-slate-700 pb-2">
                            9. The Realistic Scenario: A 1 mm Interfragmentary Gap <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-2">(Small-Gap Model)</span>
                        </h3>

                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            The three levers in Section 8 were evaluated assuming perfect cortical contact. In reality, a residual gap of approximately <strong>1 mm</strong> is common — either from imperfect reduction or from peri-fracture bone resorption that develops <em>after</em> a perfect compressive reduction (in which case the construct begins life in the composite-beam regime and migrates into this small-gap regime as the pre-load is lost). This single millimetre changes the ranking of the levers — and produces a counter-intuitive result for plate upsizing — because the plate must first flex enough to close the gap before any load-sharing begins.
                        </p>

                        {/* Before Closure */}
                        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                            <strong className="text-slate-800 dark:text-slate-200 text-sm block">Before Gap Closure — Plate Alone</strong>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                Before the applied moment reaches <Latex math="M_{\text{close}}" />, the bone fragments cannot touch. The bone provides <strong>zero</strong> stiffness and the plate bears <strong>100%</strong> of the bending moment. Stress at this stage:
                            </p>
                            <p className="text-xs text-center">
                                <Latex math={'\\sigma_{pre} = \\dfrac{M \\cdot y}{I_{plate}} \\quad (\\text{plate alone, no load sharing})'} />
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                At the reference M = {CM_M.toLocaleString()} N·mm with the standard plate (I_p = 25 mm⁴, y = 1.5 mm): <Latex math={`\\sigma_{pre} = \\dfrac{${CM_M.toLocaleString()} \\cdot 1.5}{25} = \\mathbf{${Math.round(CM_M * 1.5 / 25)}\\,\\mathrm{MPa}}`} /> — this is close to the Ti yield limit. The goal is always to push M_close well below the expected clinical moment so load-sharing begins before the plate is maximally stressed.
                            </p>
                        </div>

                        {/* M_close derivation */}
                        <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                            <strong className="text-slate-800 dark:text-slate-200 text-sm block">The Gap-Closure Moment: M_close</strong>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                The gap closes when the plate bends enough for the far cortex to touch. For a beam of stiffness <Latex math="K_{plate}" /> under moment <Latex math="M" />, the end-rotation is <Latex math="\theta = M / K_{plate}" />. The gap closes when this rotation times the bone diameter equals the gap:
                                <Latex math="\theta \times D_{bone} = \text{gap}" />. Therefore:
                            </p>
                            <MathToggle label="Why θ = M / K_plate (derivation)">
                                <div className="bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700 space-y-2 text-xs text-slate-700 dark:text-slate-300">
                                    <p><strong>What is <Latex math="\theta" />, and why <Latex math="\theta = M / K_{plate}" />?</strong></p>
                                    <p>
                                        <Latex math="\theta" /> is the <em>end-rotation angle</em> of the plate at the fracture line — the angle (in radians) by which one fragment tilts relative to the other as the plate flexes under the applied bending moment <Latex math="M" />. As the fragments rotate through <Latex math="\theta" />, the far cortex sweeps through an arc whose chord length is approximately <Latex math={'D_{bone} \\cdot \\theta'} />. When that chord equals the interfragmentary gap (1 mm), the cortices touch and load-sharing begins.
                                    </p>
                                    <p>
                                        For any linear-elastic structural element loaded by a single moment, the rotation produced is moment over rotational stiffness — by definition of <Latex math="K_{plate}" /> as <em>moment per unit rotation</em>:
                                    </p>
                                    <p className="text-center"><Latex math={'K_{plate} \\equiv \\dfrac{M}{\\theta} \\quad\\Longrightarrow\\quad \\theta = \\dfrac{M}{K_{plate}}'} /></p>
                                    <p>
                                        The numerical value of <Latex math="K_{plate}" /> for the bridging plate comes from Euler–Bernoulli beam theory. For a uniform beam of length <Latex math="L" /> loaded by a single end-moment <Latex math="M" />, integration of the curvature equation <Latex math={'\\dfrac{d^2 y}{dx^2} = M / (E \\cdot I)'} /> gives an end-slope of <Latex math={'\\theta = M \\cdot L / (E \\cdot I_p)'} />, hence:
                                    </p>
                                    <p className="text-center"><Latex math={'K_{plate} = \\dfrac{M}{\\theta} = \\dfrac{E_p \\cdot I_p}{L}'} /></p>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                                        (Strictly this is the rotational stiffness of a cantilever-like bridging segment under a pure end-moment; different boundary conditions give different multipliers, but the proportionality <Latex math={'K_{plate} \\propto E I_p / L'} /> is the same.)
                                    </p>
                                </div>
                            </MathToggle>
                            <MathToggle label="See M_close numbers at this L">
                                <div className="bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700 space-y-2 text-xs text-slate-700 dark:text-slate-300">
                                    <p className="text-center"><Latex math={'M_{\\text{close}} = K_{\\text{plate}} \\times \\frac{\\text{gap}}{D_{\\text{bone}}} = \\frac{E_p \\cdot I_p}{L} \\times \\frac{\\text{gap}}{D_{\\text{bone}}}'} /></p>
                                    <p className="mt-2 font-semibold">At <Latex math="L" /> = {bannerWL} mm, <Latex math="\text{gap}" /> = 1 mm, <Latex math="D_{bone}" /> = 17 mm:</p>
                                    {(() => {
                                        const I_p = 25; const y = 1.5;
                                        const mcTi = cm_mclose(CM_E_Ti, I_p, bannerWL);
                                        const mcSt = cm_mclose(CM_E_St, I_p, bannerWL);
                                        const mcLg = cm_mclose(CM_E_Ti, cm_plates[2].I_p, bannerWL);
                                        const sTi_post = cm_stress(CM_E_Ti, I_p, y, bannerWL);
                                        const sSt_post = cm_stress(CM_E_St, I_p, y, bannerWL);
                                        return (
                                            <div className="space-y-1 text-[11px]">
                                                <div className="text-emerald-600 dark:text-emerald-400">
                                                    Ti standard (I_p=25): <Latex math={`M_{close} = \\dfrac{114{,}500 \\times 25}{${bannerWL} \\times 17} = \\mathbf{${Math.round(mcTi).toLocaleString()}\\,\\mathrm{N{\\cdot}mm}}`} />
                                                </div>
                                                <div className="text-rose-600 dark:text-rose-400">
                                                    Steel standard (I_p=25): <Latex math={`M_{close} = \\dfrac{187{,}500 \\times 25}{${bannerWL} \\times 17} = \\mathbf{${Math.round(mcSt).toLocaleString()}\\,\\mathrm{N{\\cdot}mm}}`} />
                                                </div>
                                                <div className="text-blue-600 dark:text-blue-400">
                                                    Ti large plate (I_p=74.09): <Latex math={`M_{close} = \\dfrac{114{,}500 \\times 74.09}{${bannerWL} \\times 17} = \\mathbf{${Math.round(mcLg).toLocaleString()}\\,\\mathrm{N{\\cdot}mm}}`} />
                                                </div>
                                                <div className="pt-1 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                                                    Clinical reference M = 10,000 N·mm. Post-closure (M ≥ M_close): Ti σ = {Math.round(sTi_post)} MPa, Steel σ = {Math.round(sSt_post)} MPa.
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </div>
                            </MathToggle>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                A stiffer plate (large I_p, high E, short L) requires a larger moment to flex enough for the cortices to touch. A more compliant plate needs a smaller moment — so load-sharing kicks in sooner, protecting the implant.
                            </p>
                        </div>

                        {/* Three cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Card 1: Material */}
                            {(() => {
                                const I_p = 25; const y = 1.5;
                                const mcTi = cm_mclose(CM_E_Ti, I_p, bannerWL);
                                const mcSt = cm_mclose(CM_E_St, I_p, bannerWL);
                                const sTi  = cm_stress(CM_E_Ti, I_p, y, bannerWL);
                                const sSt  = cm_stress(CM_E_St, I_p, y, bannerWL);
                                const [openMath, setOpenMath] = React.useState(false);
                                return (
                                    <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/50 flex flex-col">
                                        <strong className="text-emerald-700 dark:text-emerald-400 text-sm block mb-2">1. Steel → Titanium</strong>
                                        <div className="bg-white dark:bg-slate-800 p-2.5 rounded border border-emerald-200 dark:border-emerald-700 mb-2">
                                            <div className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-1">Post-closure plate stress (M = 10,000 N·mm)</div>
                                            <div className="flex justify-between items-baseline mb-0.5">
                                                <span className="text-[11px] text-slate-600 dark:text-slate-300">Steel:</span>
                                                <span className="text-base font-extrabold text-rose-600 dark:text-rose-400">{Math.round(sSt)} MPa</span>
                                            </div>
                                            <div className="flex justify-between items-baseline">
                                                <span className="text-[11px] text-slate-600 dark:text-slate-300">Titanium:</span>
                                                <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">{Math.round(sTi)} MPa</span>
                                            </div>
                                            <div className="text-[9px] text-slate-500 dark:text-slate-400 pt-1 mt-1 border-t border-slate-200 dark:border-slate-700 flex justify-between">
                                                <span><Latex math="M_{close}" /> Ti: {Math.round(mcTi).toLocaleString()} N·mm</span>
                                                <span><Latex math="M_{close}" /> St: {Math.round(mcSt).toLocaleString()} N·mm</span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                                            Lower E → lower <Latex math="K_{plate}" /> → lower <Latex math="M_{close}" />. Ti reaches load-sharing sooner. Post-closure plate stress (the metric that determines implant failure) is also lower (same as Section 7 result). Both mechanisms act in the same direction — Ti is unambiguously better in the gap scenario.
                                        </p>
                                        <button onClick={() => setOpenMath(o => !o)} className="mt-3 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 hover:underline">
                                            {openMath ? '▲ Hide math' : '▼ See full derivation'}
                                        </button>
                                        {openMath && (
                                            <div className="fade-in mt-2 p-3 bg-white dark:bg-slate-800 rounded border border-emerald-200 dark:border-emerald-700 text-[11px] space-y-1.5 text-slate-700 dark:text-slate-300">
                                                <div className="font-bold mb-1">Step 1 — <Latex math="M_{close}" />:</div>
                                                <div><Latex math={`K_{Ti} = \\dfrac{${CM_E_Ti.toLocaleString()} \\times 25}{${bannerWL}} = ${Math.round(cm_kp(CM_E_Ti,25,bannerWL)).toLocaleString()}\\,\\mathrm{N{\\cdot}mm/rad}`} /></div>
                                                <div><Latex math={`M_{close,Ti} = \\dfrac{${Math.round(cm_kp(CM_E_Ti,25,bannerWL)).toLocaleString()} \\cdot 1}{${CM_Dbone}} = \\mathbf{${Math.round(mcTi).toLocaleString()}\\,\\mathrm{N{\\cdot}mm}}`} /></div>
                                                <div><Latex math={`K_{St} = \\dfrac{${CM_E_St.toLocaleString()} \\times 25}{${bannerWL}} = ${Math.round(cm_kp(CM_E_St,25,bannerWL)).toLocaleString()}\\,\\mathrm{N{\\cdot}mm/rad}`} /></div>
                                                <div><Latex math={`M_{close,St} = \\dfrac{${Math.round(cm_kp(CM_E_St,25,bannerWL)).toLocaleString()} \\cdot 1}{${CM_Dbone}} = \\mathbf{${Math.round(mcSt).toLocaleString()}\\,\\mathrm{N{\\cdot}mm}}`} /></div>
                                                <div className="font-bold mt-1">Step 2 — Post-closure <Latex math="\\sigma" /> (M=10,000 N·mm ≥ <Latex math="M_{close}" />):</div>
                                                <div><Latex math={`M_{plate,Ti} = 10{,}000 \\times \\dfrac{${Math.round(cm_kp(CM_E_Ti,25,bannerWL)).toLocaleString()}}{${Math.round(cm_kp(CM_E_Ti,25,bannerWL)).toLocaleString()} + ${CM_Kbone.toLocaleString()}} = ${Math.round(CM_M * cm_kp(CM_E_Ti,25,bannerWL)/(cm_kp(CM_E_Ti,25,bannerWL)+CM_Kbone)).toLocaleString()}\\,\\mathrm{N{\\cdot}mm}`} /></div>
                                                <div><Latex math={`\\sigma_{Ti} = \\dfrac{${Math.round(CM_M * cm_kp(CM_E_Ti,25,bannerWL)/(cm_kp(CM_E_Ti,25,bannerWL)+CM_Kbone)).toLocaleString()} \\cdot 1.5}{25} = \\mathbf{${Math.round(sTi)}\\,\\mathrm{MPa}}`} /></div>
                                                <div><Latex math={`\\sigma_{St} = \\dfrac{${Math.round(CM_M * cm_kp(CM_E_St,25,bannerWL)/(cm_kp(CM_E_St,25,bannerWL)+CM_Kbone)).toLocaleString()} \\cdot 1.5}{25} = \\mathbf{${Math.round(sSt)}\\,\\mathrm{MPa}}`} /></div>
                                            </div>
                                        )}
                                        <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-2">↓ <Latex math="M_{close}" /> → earlier load-sharing → ↓ plate stress ✓</p>
                                    </div>
                                );
                            })()}

                            {/* Card 2: Working Length */}
                            {(() => {
                                const I_p = 25; const y = 1.5;
                                const mcL  = (L) => cm_mclose(CM_E_Ti, I_p, L);
                                const sL   = (L) => cm_stress(CM_E_Ti, I_p, y, L);
                                const keyLs = [20, 40, 60, 80, 100];
                                const [openMath, setOpenMath] = React.useState(false);
                                return (
                                    <div className="bg-indigo-50 dark:bg-indigo-900/10 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800/50 flex flex-col">
                                        <strong className="text-indigo-700 dark:text-indigo-400 text-sm block mb-2">2. ↑ Working Length</strong>
                                        <div className="bg-white dark:bg-slate-800 p-2 rounded border border-indigo-200 dark:border-indigo-700 text-[11px] mb-2 overflow-x-auto">
                                            <table className="w-full text-[10px]">
                                                <thead><tr className="border-b border-slate-200 dark:border-slate-700"><th className="text-left pb-0.5">L (mm)</th><th className="text-right"><Latex math="M_{close}" /></th><th className="text-right"><Latex math="\sigma_{post}" /></th></tr></thead>
                                                <tbody>
                                                {keyLs.map(L => (
                                                    <tr key={L} className={`${L === bannerWL ? 'text-amber-600 dark:text-amber-400 font-bold' : ''}`}>
                                                        <td>{L}{L === bannerWL ? ' ◀' : ''}</td>
                                                        <td className="text-right">{Math.round(mcL(L)).toLocaleString()} N·mm</td>
                                                        <td className="text-right">{Math.round(sL(L))} MPa</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                                            Longer L → lower <Latex math="K_{plate}" /> → lower <Latex math="M_{close}" /> (gap closes sooner) AND lower post-closure <Latex math="\sigma" /> (plate shares less moment). Both mechanisms benefit the plate. The current L = {bannerWL} mm is highlighted in the table above.
                                        </p>
                                        <button onClick={() => setOpenMath(o => !o)} className="mt-3 text-[10px] font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-1 hover:underline">
                                            {openMath ? '▲ Hide math' : '▼ See full derivation'}
                                        </button>
                                        {openMath && (
                                            <div className="fade-in mt-2 p-3 bg-white dark:bg-slate-800 rounded border border-indigo-200 dark:border-indigo-700 text-[11px] space-y-1.5 text-slate-700 dark:text-slate-300">
                                                <div className="font-bold mb-1">General formulas (Ti std plate, gap=1mm, D_bone=17mm):</div>
                                                <div><Latex math={'K_{plate}(L) = \\dfrac{114{,}500 \\times 25}{L} = \\dfrac{2{,}862{,}500}{L}'} /></div>
                                                <div><Latex math={'M_{close}(L) = K_{plate}(L) \\cdot \\dfrac{1}{17} = \\dfrac{168{,}382}{L}\\,\\mathrm{N{\\cdot}mm}'} /></div>
                                                <div><Latex math={'M_{plate}(L) = 10{,}000 \\times \\dfrac{K_{plate}(L)}{K_{plate}(L) + 50{,}000}'} /></div>
                                                <div><Latex math={'\\sigma(L) = \\dfrac{M_{plate}(L) \\times 1.5}{25} = M_{plate}(L) \\times 0.06'} /></div>
                                                <div className="font-bold mt-1">At L = {bannerWL} mm:</div>
                                                <div><Latex math={`K_{plate} = ${Math.round(cm_kp(CM_E_Ti,25,bannerWL)).toLocaleString()}\\,\\mathrm{N{\\cdot}mm/rad}`} /></div>
                                                <div><Latex math={`M_{close} = ${Math.round(cm_mclose(CM_E_Ti,25,bannerWL)).toLocaleString()}\\,\\mathrm{N{\\cdot}mm}`} /></div>
                                                <div><Latex math={`\\sigma = \\mathbf{${Math.round(cm_stress(CM_E_Ti,25,1.5,bannerWL))}\\,\\mathrm{MPa}}`} /></div>
                                                <div className="text-[9px] text-slate-500 mt-1">Rate dσ/dL at this L: {Math.abs(cm_rate(CM_E_Ti,25,1.5,bannerWL)).toFixed(1)} MPa/mm</div>
                                            </div>
                                        )}
                                        <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400 mt-2">↓ <Latex math="M_{close}" /> and ↓ <Latex math="\sigma_{post}" /> → double benefit of longer WL ✓</p>
                                    </div>
                                );
                            })()}

                            {/* Card 3: Geometry/Upsizing Paradox — Steel plate */}
                            {(() => {
                                const [openMath, setOpenMath] = React.useState(false);
                                const plateRows = cm_plates.map(p => ({
                                    name: p.name,
                                    I_p: p.I_p, y: p.y,
                                    mc: cm_mclose(CM_E_St, p.I_p, bannerWL),
                                    s_post: cm_stress(CM_E_St, p.I_p, p.y, bannerWL),
                                    s_pre: CM_M * p.y / p.I_p,  // plate alone (no sharing)
                                }));
                                return (
                                    <div className="bg-rose-50 dark:bg-rose-900/10 p-4 rounded-xl border border-rose-200 dark:border-rose-800/50 flex flex-col">
                                        <strong className="text-rose-700 dark:text-rose-400 text-sm block mb-2">3. ↑ Plate Size — Steel (The Upsizing Paradox)</strong>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 italic mb-2 border-l-2 border-rose-300 dark:border-rose-700 pl-2">
                                            *Note: Calculated for <strong>316L Steel</strong> (E = {CM_E_St.toLocaleString()} MPa). Steel exposes the paradox most clearly because its higher E pushes <Latex math="M_{close}" /> above the clinical moment for stiffer plates.
                                        </p>
                                        <div className="bg-white dark:bg-slate-800 p-2 rounded border border-rose-200 dark:border-rose-700 text-[11px] mb-2 overflow-x-auto">
                                            <table className="w-full text-[10px]">
                                                <thead><tr className="border-b border-slate-200 dark:border-slate-700"><th className="text-left pb-0.5">Plate</th><th className="text-right"><Latex math="M_{close}" /></th><th className="text-right"><Latex math="\sigma_{pre}" /></th><th className="text-right"><Latex math="\sigma_{post}" /></th></tr></thead>
                                                <tbody>
                                                {plateRows.map((r, i) => {
                                                    const gapClosed = r.mc < CM_M; // clinical M closes gap?
                                                    return (
                                                        <tr key={i} className={gapClosed ? '' : 'text-rose-600 dark:text-rose-400 font-bold'}>
                                                            <td className="pr-1">{r.name.replace('Vi ', '')}</td>
                                                            <td className="text-right">{Math.round(r.mc).toLocaleString()}</td>
                                                            <td className="text-right">{Math.round(r.s_pre)}</td>
                                                            <td className="text-right">{gapClosed ? Math.round(r.s_post) : '—⚠'}</td>
                                                        </tr>
                                                    );
                                                })}
                                                </tbody>
                                            </table>
                                            <div className="text-[8px] text-slate-400 mt-1">σ in MPa. ⚠ = gap never closes at M=10,000 N·mm (M_close &gt; 10,000). <Latex math="\sigma_{post}" /> shown only when gap closes.</div>
                                        </div>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                                            A larger steel plate raises <Latex math="K_{plate}" /> → raises <Latex math="M_{close}" />. At L = {bannerWL} mm, plates whose <Latex math="M_{close}" /> exceeds the clinical moment (10,000 N·mm) are highlighted — the gap <em>never</em> closes, the bone <em>never</em> joins, and the plate bears 100% of the load (<Latex math="\sigma_{pre}" /> column). In this regime upsizing <strong>paradoxically increases</strong> plate stress compared to a smaller plate that successfully achieves load-sharing.
                                        </p>
                                        <button onClick={() => setOpenMath(o => !o)} className="mt-3 text-[10px] font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1 hover:underline">
                                            {openMath ? '▲ Hide math' : '▼ See full derivation'}
                                        </button>
                                        {openMath && (
                                            <div className="fade-in mt-2 p-3 bg-white dark:bg-slate-800 rounded border border-rose-200 dark:border-rose-700 text-[11px] space-y-1.5 text-slate-700 dark:text-slate-300">
                                                {plateRows.map((r, i) => (
                                                    <div key={i} className={i > 0 ? 'border-t border-slate-100 dark:border-slate-700 pt-1 mt-1' : ''}>
                                                        <div className="font-bold">{r.name}:</div>
                                                        <div><Latex math={`K_{plate} = \\dfrac{${CM_E_St.toLocaleString()} \\times ${r.I_p}}{${bannerWL}} = ${Math.round(cm_kp(CM_E_St, r.I_p, bannerWL)).toLocaleString()}\\,\\mathrm{N{\\cdot}mm/rad}`} /></div>
                                                        <div><Latex math={`M_{close} = \\dfrac{${Math.round(cm_kp(CM_E_St, r.I_p, bannerWL)).toLocaleString()} \\cdot 1}{${CM_Dbone}} = ${Math.round(r.mc).toLocaleString()}\\,\\mathrm{N{\\cdot}mm}`} /></div>
                                                        <div><Latex math={`\\sigma_{pre} = \\dfrac{10{,}000 \\cdot ${r.y}}{${r.I_p}} = ${Math.round(r.s_pre)}\\,\\mathrm{MPa}`} /> (plate alone)</div>
                                                        {r.mc < CM_M
                                                            ? <div className="text-emerald-600 dark:text-emerald-400">Gap closes (M_close &lt; 10,000). <Latex math={`\\sigma_{post} = ${Math.round(r.s_post)}\\,\\mathrm{MPa}`} /> ✓</div>
                                                            : <div className="text-rose-600 dark:text-rose-400">Gap does NOT close at M=10,000 N·mm. Plate bears full load: <Latex math={`\\sigma = ${Math.round(r.s_pre)}\\,\\mathrm{MPa}`} /> ⚠</div>}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <p className="text-xs font-bold text-rose-700 dark:text-rose-400 mt-2">↑ <Latex math="M_{close}" /> → possible loss of load-sharing → ↑ plate stress ⚠</p>
                                    </div>
                                );
                            })()}
                        </div>

                        {/* M_close Interactive Graph */}
                        {(() => {
                            const minL = 2; const maxL = 100;
                            const maxMc = 20000;
                            const mapX = (L) => 50 + ((L - minL) / (maxL - minL)) * 400;
                            const mapY = (M) => 250 - (Math.min(M, maxMc) / maxMc) * 200;
                            const I_std = 25; const I_large = cm_plates[2].I_p; // 74.09
                            const pts = (E, I_p) => {
                                const arr = [];
                                for (let L = minL; L <= maxL; L += 2) {
                                    arr.push({ L, M: cm_mclose(E, I_p, L) });
                                }
                                return arr;
                            };
                            const pathFor = (E, I_p) => pts(E, I_p).map(p => `${mapX(p.L)},${mapY(p.M)}`).join(' L ');
                            // Critical L where M_close = CM_M
                            const lcrit = (E, I_p) => (E * I_p * CM_gap) / (CM_M * CM_Dbone);
                            const lTi = lcrit(CM_E_Ti, I_std);
                            const lSt = lcrit(CM_E_St, I_std);
                            const lLg = lcrit(CM_E_Ti, I_large);
                            return (
                                <div className="mt-2">
                                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                                        <strong><Latex math="M_{close}" /> vs Working Length</strong> — the graph shows how the gap-closure moment falls as <Latex math="L" /> increases. The horizontal dashed line marks the reference clinical moment (10,000 N·mm). Where a curve crosses that line is the <em>minimum L</em> needed for load-sharing to occur. Drag the amber handle (or use the banner above) to move the current <Latex math="L" /> marker.
                                    </p>
                                    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-[10px] text-slate-600 dark:text-slate-400 mb-2">
                                        <strong className="text-slate-700 dark:text-slate-200">Curve legend:</strong> The three curves use a single representative <strong>"standard" plate cross-section</strong> with <Latex math={'I_p = 25\\,\\mathrm{mm}^4'} /> — a generic mid-range geometry that sits between the Vi 2.7 mm DCP (<Latex math={'I_p \\approx 10.4'} />) and the Vi 3.5 mm Narrow DCP (<Latex math={'I_p \\approx 28.7'} />). It is <em>not</em> a specific Vi catalogue plate. The <strong>"Ti large"</strong> curve uses the <strong>Vi 3.5 mm Broad DCP</strong> (12 × 4.2 mm, <Latex math={'I_p = 74.09\\,\\mathrm{mm}^4'} />) so that material (<Latex math="E" />) and geometry (<Latex math="I_p" />) are isolated as independent variables: Ti std vs Steel std isolates material; Ti std vs Ti large isolates geometry.
                                    </div>
                                    <svg viewBox="0 0 500 290" className="w-full h-auto font-sans bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner overflow-visible">
                                        {/* Axes */}
                                        <line x1="50" y1="50" x2="50" y2="250" className="stroke-slate-300 dark:stroke-slate-700 stroke-2" />
                                        <line x1="50" y1="250" x2="450" y2="250" className="stroke-slate-400 stroke-2" />
                                        <text x="250" y="268" className="fill-slate-500 text-[8px] font-bold" textAnchor="middle">Working Length, L (mm)</text>
                                        <text x="18" y="150" className="fill-amber-600 dark:fill-amber-400 text-[8px] font-bold uppercase tracking-widest" transform="rotate(-90 18 150)" textAnchor="middle">M_close (N·mm)</text>
                                        {/* Y labels */}
                                        <text x="45" y="53" className="fill-slate-400 text-[8px] font-mono" textAnchor="end">≥20k</text>
                                        <text x="45" y="153" className="fill-slate-400 text-[8px] font-mono" textAnchor="end">10k</text>
                                        <text x="45" y="253" className="fill-slate-400 text-[8px] font-mono" textAnchor="end">0</text>
                                        {/* X labels */}
                                        <text x="50"  y="264" className="fill-slate-400 text-[7px]" textAnchor="middle">2</text>
                                        <text x="170" y="264" className="fill-slate-400 text-[7px]" textAnchor="middle">30</text>
                                        <text x="250" y="264" className="fill-slate-400 text-[7px]" textAnchor="middle">50</text>
                                        <text x="450" y="264" className="fill-slate-400 text-[7px]" textAnchor="middle">100</text>
                                        {/* Clinical moment reference band */}
                                        <line x1="50" y1={mapY(CM_M)} x2="450" y2={mapY(CM_M)} strokeDasharray="6 3" className="stroke-amber-500 dark:stroke-amber-400 stroke-[1.5px]" />
                                        <text x="452" y={mapY(CM_M) - 3} className="fill-amber-600 dark:fill-amber-400 text-[7px] font-bold">M = {CM_M.toLocaleString()} N·mm</text>
                                        {/* Curves */}
                                        <path d={`M ${pathFor(CM_E_Ti, I_std)}`} fill="none" className="stroke-emerald-500 stroke-[2.5px]" />
                                        <path d={`M ${pathFor(CM_E_St, I_std)}`} fill="none" className="stroke-rose-500 stroke-[2.5px]" />
                                        <path d={`M ${pathFor(CM_E_Ti, I_large)}`} fill="none" className="stroke-blue-500 stroke-[2.5px]" />
                                        {/* Critical L markers */}
                                        {lTi >= minL && lTi <= maxL && <line x1={mapX(lTi)} y1={mapY(CM_M) - 5} x2={mapX(lTi)} y2={mapY(CM_M) + 5} className="stroke-emerald-500 stroke-2" />}
                                        {lSt >= minL && lSt <= maxL && <line x1={mapX(lSt)} y1={mapY(CM_M) - 5} x2={mapX(lSt)} y2={mapY(CM_M) + 5} className="stroke-rose-500 stroke-2" />}
                                        {lLg >= minL && lLg <= maxL && <line x1={mapX(lLg)} y1={mapY(CM_M) - 5} x2={mapX(lLg)} y2={mapY(CM_M) + 5} className="stroke-blue-500 stroke-2" />}
                                        {/* Current L marker */}
                                        <line x1={mapX(bannerWL)} y1="50" x2={mapX(bannerWL)} y2="250" strokeDasharray="4 2" className="stroke-amber-400 dark:stroke-amber-500 stroke-[2px] opacity-80" />
                                        <g transform={`translate(${mapX(bannerWL)}, 0)`} className="pointer-events-none">
                                            <rect x="-20" y="50" width="40" height="15" rx="3" className="fill-amber-100 dark:fill-amber-900/80" />
                                            <text x="0" y="61" className="fill-amber-800 dark:fill-amber-200 text-[7px] font-bold" textAnchor="middle">L={bannerWL}</text>
                                        </g>
                                        {/* Draggable handle */}
                                        <circle cx={mapX(bannerWL)} cy="50" r="6" className="fill-amber-400 stroke-white stroke-2 cursor-ew-resize" />
                                        {/* Legend */}
                                        <g transform="translate(60, 58)">
                                            <rect x="0" y="0" width="180" height="56" rx="3" className="fill-white/90 dark:fill-slate-800/90" />
                                            <line x1="6" y1="12" x2="20" y2="12" className="stroke-emerald-500 stroke-2" />
                                            <text x="24" y="15" className="fill-slate-700 dark:fill-slate-300 text-[8px]">Ti std (I_p=25) — L_crit≈{Math.round(lTi)} mm</text>
                                            <line x1="6" y1="28" x2="20" y2="28" className="stroke-rose-500 stroke-2" />
                                            <text x="24" y="31" className="fill-slate-700 dark:fill-slate-300 text-[8px]">Steel std (I_p=25) — L_crit≈{Math.round(lSt)} mm</text>
                                            <line x1="6" y1="44" x2="20" y2="44" className="stroke-blue-500 stroke-2" />
                                            <text x="24" y="47" className="fill-slate-700 dark:fill-slate-300 text-[8px]">Ti large (I_p=74) — L_crit≈{Math.round(lLg)} mm</text>
                                        </g>
                                        {/* Invisible drag rect for interaction */}
                                        <rect
                                            x="50" y="50" width="400" height="200"
                                            fill="transparent"
                                            className="cursor-ew-resize"
                                            onPointerDown={(e) => {
                                                e.currentTarget.setPointerCapture(e.pointerId);
                                                const r = e.currentTarget.ownerSVGElement.getBoundingClientRect();
                                                const scale = 500 / r.width;
                                                let svgX = (e.clientX - r.left) * scale;
                                                if (svgX < 50) svgX = 50; if (svgX > 450) svgX = 450;
                                                const L = Math.round(minL + ((svgX - 50) / 400) * (maxL - minL));
                                                setBannerWL(L);
                                            }}
                                            onPointerMove={(e) => {
                                                if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
                                                const r = e.currentTarget.ownerSVGElement.getBoundingClientRect();
                                                const scale = 500 / r.width;
                                                let svgX = (e.clientX - r.left) * scale;
                                                if (svgX < 50) svgX = 50; if (svgX > 450) svgX = 450;
                                                const L = Math.round(minL + ((svgX - 50) / 400) * (maxL - minL));
                                                setBannerWL(L);
                                            }}
                                            onPointerUp={(e) => e.currentTarget.releasePointerCapture(e.pointerId)}
                                            onPointerCancel={(e) => e.currentTarget.releasePointerCapture(e.pointerId)}
                                        />
                                    </svg>
                                </div>
                            );
                        })()}

                        {/* σ_post vs Working Length — companion graph */}
                        {(() => {
                            const minL = 2; const maxL = 100;
                            const I_std = 25; const y_std = 1.5;
                            const I_large = cm_plates[2].I_p; const y_large = cm_plates[2].y;
                            // Compute post-closure stress curves; cap at pure-plate stress when M < M_close
                            const sigPost = (E, I_p, y, L) => {
                                const Mc = cm_mclose(E, I_p, L);
                                if (Mc >= CM_M) return CM_M * y / I_p; // gap doesn't close: plate alone
                                return cm_stress(E, I_p, y, L);
                            };
                            const pts = (E, I_p, y) => {
                                const arr = [];
                                for (let L = minL; L <= maxL; L += 2) {
                                    arr.push({ L, s: sigPost(E, I_p, y, L) });
                                }
                                return arr;
                            };
                            const ptsTi  = pts(CM_E_Ti, I_std,   y_std);
                            const ptsSt  = pts(CM_E_St, I_std,   y_std);
                            const ptsLg  = pts(CM_E_Ti, I_large, y_large);
                            const allS = [...ptsTi, ...ptsSt, ...ptsLg].map(p => p.s);
                            const sMax = Math.max(...allS);
                            const sCap = Math.min(sMax, 1500); // hard cap so pre-closure plate-alone spikes don't dominate
                            const mapX = (L) => 50 + ((L - minL) / (maxL - minL)) * 400;
                            const mapY = (s) => 250 - (Math.min(s, sCap) / sCap) * 200;
                            const pathFor = (arr) => arr.map(p => `${mapX(p.L)},${mapY(p.s)}`).join(' L ');
                            // Critical L for each curve (where sigma transitions from plate-alone to load-sharing)
                            const lcrit = (E, I_p) => (E * I_p * CM_gap) / (CM_M * CM_Dbone);
                            const lTi = lcrit(CM_E_Ti, I_std);
                            const lSt = lcrit(CM_E_St, I_std);
                            const lLg = lcrit(CM_E_Ti, I_large);
                            // Current σ_post values at bannerWL
                            const sNowTi = sigPost(CM_E_Ti, I_std,   y_std,   bannerWL);
                            const sNowSt = sigPost(CM_E_St, I_std,   y_std,   bannerWL);
                            const sNowLg = sigPost(CM_E_Ti, I_large, y_large, bannerWL);
                            return (
                                <div className="mt-4">
                                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                                        <strong>Post-closure plate stress (<Latex math="\sigma_{post}" />) vs Working Length</strong> — companion graph showing the implant stress that actually matters for fatigue. To the <em>left</em> of each curve's critical <Latex math="L" /> the gap doesn't close at the clinical moment, so the plate carries the entire load (flat plateau at <Latex math={'\\sigma_{pre} = M y / I_p'} />). To the <em>right</em>, load-sharing begins and stress drops as <Latex math="L" /> grows. Drag the amber handle (or use the banner above) to inspect a given <Latex math="L" />.
                                    </p>
                                    <svg viewBox="0 0 500 290" className="w-full h-auto font-sans bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner overflow-visible">
                                        {/* Axes */}
                                        <line x1="50" y1="50" x2="50" y2="250" className="stroke-slate-300 dark:stroke-slate-700 stroke-2" />
                                        <line x1="50" y1="250" x2="450" y2="250" className="stroke-slate-400 stroke-2" />
                                        <text x="250" y="268" className="fill-slate-500 text-[8px] font-bold" textAnchor="middle">Working Length, L (mm)</text>
                                        <text x="18" y="150" className="fill-rose-600 dark:fill-rose-400 text-[8px] font-bold uppercase tracking-widest" transform="rotate(-90 18 150)" textAnchor="middle">σ_post (MPa)</text>
                                        {/* Y labels */}
                                        <text x="45" y="53"  className="fill-slate-400 text-[8px] font-mono" textAnchor="end">{Math.round(sCap)}</text>
                                        <text x="45" y="153" className="fill-slate-400 text-[8px] font-mono" textAnchor="end">{Math.round(sCap/2)}</text>
                                        <text x="45" y="253" className="fill-slate-400 text-[8px] font-mono" textAnchor="end">0</text>
                                        {/* X labels */}
                                        <text x="50"  y="264" className="fill-slate-400 text-[7px]" textAnchor="middle">2</text>
                                        <text x="170" y="264" className="fill-slate-400 text-[7px]" textAnchor="middle">30</text>
                                        <text x="250" y="264" className="fill-slate-400 text-[7px]" textAnchor="middle">50</text>
                                        <text x="450" y="264" className="fill-slate-400 text-[7px]" textAnchor="middle">100</text>
                                        {/* Curves */}
                                        <path d={`M ${pathFor(ptsTi)}`} fill="none" className="stroke-emerald-500 stroke-[2.5px]" />
                                        <path d={`M ${pathFor(ptsSt)}`} fill="none" className="stroke-rose-500 stroke-[2.5px]" />
                                        <path d={`M ${pathFor(ptsLg)}`} fill="none" className="stroke-blue-500 stroke-[2.5px]" />
                                        {/* Critical L markers (where load-sharing starts) */}
                                        {lTi >= minL && lTi <= maxL && <line x1={mapX(lTi)} y1="245" x2={mapX(lTi)} y2="255" className="stroke-emerald-500 stroke-2" />}
                                        {lSt >= minL && lSt <= maxL && <line x1={mapX(lSt)} y1="245" x2={mapX(lSt)} y2="255" className="stroke-rose-500 stroke-2" />}
                                        {lLg >= minL && lLg <= maxL && <line x1={mapX(lLg)} y1="245" x2={mapX(lLg)} y2="255" className="stroke-blue-500 stroke-2" />}
                                        {/* Current L marker */}
                                        <line x1={mapX(bannerWL)} y1="50" x2={mapX(bannerWL)} y2="250" strokeDasharray="4 2" className="stroke-amber-400 dark:stroke-amber-500 stroke-[2px] opacity-80" />
                                        <g transform={`translate(${mapX(bannerWL)}, 0)`} className="pointer-events-none">
                                            <rect x="-20" y="50" width="40" height="15" rx="3" className="fill-amber-100 dark:fill-amber-900/80" />
                                            <text x="0" y="61" className="fill-amber-800 dark:fill-amber-200 text-[7px] font-bold" textAnchor="middle">L={bannerWL}</text>
                                        </g>
                                        {/* Draggable handle */}
                                        <circle cx={mapX(bannerWL)} cy="50" r="6" className="fill-amber-400 stroke-white stroke-2 cursor-ew-resize pointer-events-none" />
                                        {/* Legend with live σ values */}
                                        <g transform="translate(260, 58)">
                                            <rect x="0" y="0" width="190" height="56" rx="3" className="fill-white/90 dark:fill-slate-800/90" />
                                            <line x1="6" y1="12" x2="20" y2="12" className="stroke-emerald-500 stroke-2" />
                                            <text x="24" y="15" className="fill-slate-700 dark:fill-slate-300 text-[8px]">Ti std (I_p=25): σ = {Math.round(sNowTi)} MPa</text>
                                            <line x1="6" y1="28" x2="20" y2="28" className="stroke-rose-500 stroke-2" />
                                            <text x="24" y="31" className="fill-slate-700 dark:fill-slate-300 text-[8px]">Steel std (I_p=25): σ = {Math.round(sNowSt)} MPa</text>
                                            <line x1="6" y1="44" x2="20" y2="44" className="stroke-blue-500 stroke-2" />
                                            <text x="24" y="47" className="fill-slate-700 dark:fill-slate-300 text-[8px]">Ti large (I_p=74): σ = {Math.round(sNowLg)} MPa</text>
                                        </g>
                                        {/* Invisible drag rect for interaction */}
                                        <rect
                                            x="50" y="50" width="400" height="200"
                                            fill="transparent"
                                            className="cursor-ew-resize"
                                            onPointerDown={(e) => {
                                                e.currentTarget.setPointerCapture(e.pointerId);
                                                const r = e.currentTarget.ownerSVGElement.getBoundingClientRect();
                                                const scale = 500 / r.width;
                                                let svgX = (e.clientX - r.left) * scale;
                                                if (svgX < 50) svgX = 50; if (svgX > 450) svgX = 450;
                                                const L = Math.round(minL + ((svgX - 50) / 400) * (maxL - minL));
                                                setBannerWL(L);
                                            }}
                                            onPointerMove={(e) => {
                                                if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
                                                const r = e.currentTarget.ownerSVGElement.getBoundingClientRect();
                                                const scale = 500 / r.width;
                                                let svgX = (e.clientX - r.left) * scale;
                                                if (svgX < 50) svgX = 50; if (svgX > 450) svgX = 450;
                                                const L = Math.round(minL + ((svgX - 50) / 400) * (maxL - minL));
                                                setBannerWL(L);
                                            }}
                                            onPointerUp={(e) => e.currentTarget.releasePointerCapture(e.pointerId)}
                                            onPointerCancel={(e) => e.currentTarget.releasePointerCapture(e.pointerId)}
                                        />
                                    </svg>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 italic mt-2">
                                        Tick marks on the x-axis at the foot of each curve indicate the critical <Latex math="L" /> at which that construct first achieves gap closure under M = 10,000 N·mm. To the left of that tick the curve is flat at the plate-alone stress; to the right it falls along the load-sharing curve.
                                    </p>
                                </div>
                            );
                        })()}

                        <div className="bg-amber-100 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-300 dark:border-amber-700/50">
                            <strong className="text-amber-900 dark:text-amber-200 text-sm block mb-1">Clinical Implication</strong>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                Whether upsizing raises or lowers plate stress in a realistic gap scenario depends entirely on where the clinical moment falls relative to <Latex math="M_{close}" /> for each construct. Use the banner above (or drag either graph) to test: as you decrease <Latex math="L" />, watch <Latex math="M_{close}" /> rise — eventually exceeding the clinical moment for the large plate, triggering the paradox. Increasing working length or switching to titanium unambiguously lowers <Latex math="M_{close}" /> and therefore guarantees earlier load-sharing under the same clinical load.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Concept 10: THREE STRESS REGIMES */}
                <div className="grid grid-cols-1 gap-6 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="space-y-5">
                        <h3 className="text-xl font-bold text-teal-700 dark:text-teal-400 flex items-center border-b border-slate-200 dark:border-slate-700 pb-2">
                            10. The Three Stress Regimes: How Reduction Strategy Defines Implant Risk
                        </h3>

                        {/* ── Opening narrative ── */}
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            Every plate construct exists in exactly one of three mechanical stress regimes determined entirely by the surgeon's reduction strategy and the patient's loading pattern. The same plate, on the same bone, under the same applied load will experience fundamentally different stresses depending on two questions: <strong>(1) Is there compressive cortical contact across the fracture?</strong> and <strong>(2) If so, does the applied bending moment stay below the critical decompression threshold?</strong> The graph below makes these three regimes visible simultaneously.
                        </p>

                        {/* ── Three regime cards ── */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-500 rounded-xl p-4 space-y-2">
                                <p className="text-xs font-bold text-teal-700 dark:text-teal-400">🟢 MINIMUM STRESS — Compressive Composite</p>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Achieved when <em>both</em> cortices are pressed firmly together by the compressive pre-load from the screws <em>and</em> the applied bending moment stays below M<sub>composite</sub>. Under these conditions, the plate and the bone cross-section act as a single fused unit. The enormous composite Area Moment of Inertia (AMI) of the combined cross-section is shared. The plate carries only a tiny fraction of the total moment — roughly proportional to its relative stiffness contribution. <strong>This is the protective goal of compressive reduction.</strong> It is independent of working length because the composite AMI does not depend on L.
                                </p>
                            </div>
                            <div className="bg-indigo-50 dark:bg-indigo-900/10 border-l-4 border-indigo-500 rounded-xl p-4 space-y-2">
                                <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400">🔵 INTERMEDIATE STRESS — Spring Contact / Post-Closure Gap</p>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    This regime applies in two equivalent clinical situations that produce <em>identical</em> plate stress: <strong>(a) a fracture that was not compressed but has no gap</strong> (the spring K model — the bone and plate share load only via the fracture-interface contact spring), and <strong>(b) a fracture with a small gap whose gap has already been closed by the bending load</strong> (post-closure, Section 9). In both cases, load sharing occurs through the rotational stiffness spring at the contact point. Crucially, this stress <em>decreases as working length increases</em> because a longer plate span is softer and yields a larger share of the moment to the bone spring. Use the slider below to see how it changes.
                                </p>
                            </div>
                            <div className="bg-rose-50 dark:bg-rose-900/10 border-l-4 border-rose-500 rounded-xl p-4 space-y-2">
                                <p className="text-xs font-bold text-rose-700 dark:text-rose-400">🔴 MAXIMUM STRESS — Pre-Closure Gap (Plate Alone)</p>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    When a gap exists and has <em>not yet been closed</em> by the bending load, the bone spring is completely disengaged. There is no contact, so no load transfer through the fracture interface. The plate absorbs <em>the full applied bending moment entirely on its own</em>. The stress formula collapses to the simple isolated-plate formula <Latex math="\sigma = M \cdot y / I_p" /> — with no bone contribution at all. This is the absolute worst-case scenario and is completely independent of working length. As shown in Section 9, the longer the working length, the lower the moment required to close the gap (M_close decreases with L), so a longer plate escapes this regime more easily.
                                </p>
                            </div>
                        </div>

                        {/* ── Fixed parameters ── */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
                            <strong>Fixed parameters for all three regimes:</strong> Vi 3.5mm Narrow DCP, <strong>316L Steel</strong> — <Latex math="I_p = 28.67\,\mathrm{mm}^4,\; y = 1.60\,\mathrm{mm},\; E_{steel} = 187.5\,\mathrm{GPa}" />. Bone: <Latex math="I_b = 10{,}000\,\mathrm{mm}^4,\; A_b = 150\,\mathrm{mm}^2,\; r_{bone} = 8.5\,\mathrm{mm}" />. Applied moment: <Latex math="M = 10{,}000\,\mathrm{N{\cdot}mm}" />. The only variable is the working length L, controlled by the slider below.
                        </div>

                        {/* ── M vs M_composite toggle ── */}
                        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-xl p-4 space-y-3">
                            <p className="text-xs font-bold text-amber-800 dark:text-amber-300">What if the applied load exceeds M<sub>composite</sub>?</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                The composite regime (minimum stress floor) exists <strong>only while the applied bending moment stays below M<sub>composite</sub></strong> — the critical moment at which the tensile cortex decompresses and the cortices separate. M<sub>composite</sub> depends on the compressive pre-load applied by the screws. If a high-energy event (e.g., unguarded full weight-bearing, a fall) pushes the moment above M<sub>composite</sub>, the compression advantage is <em>temporarily lost</em>: the fracture interface opens, the composite AMI collapses, and the plate stress jumps up to the spring model curve. Use the toggle below to see how the graph changes in each scenario.
                            </p>
                            <div className="flex rounded-lg overflow-hidden border border-amber-300 dark:border-amber-700 w-fit">
                                <button
                                    onClick={() => setSec10AboveMcomp(false)}
                                    className={`px-4 py-2 text-xs font-semibold transition-colors ${!sec10AboveMcomp ? 'bg-teal-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                                >
                                    M &lt; M<sub>composite</sub> &nbsp;(physiological load)
                                </button>
                                <button
                                    onClick={() => setSec10AboveMcomp(true)}
                                    className={`px-4 py-2 text-xs font-semibold transition-colors ${sec10AboveMcomp ? 'bg-rose-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                                >
                                    M &gt; M<sub>composite</sub> &nbsp;(overload / impact)
                                </button>
                            </div>
                            {sec10AboveMcomp ? (
                                <p className="text-xs text-rose-700 dark:text-rose-400 italic leading-relaxed">
                                    ⚠️ <strong>Overload mode:</strong> The minimum stress floor (composite beam) has been removed from the graph. The cortices have separated and the composite AMI no longer applies. Even a well-compressed construct now behaves as if it were spring-contact only. The teal line disappears; the spring K curve becomes the lower bound.
                                </p>
                            ) : (
                                <p className="text-xs text-teal-700 dark:text-teal-400 italic leading-relaxed">
                                    ✅ <strong>Physiological mode:</strong> The applied load stays below M<sub>composite</sub>. The teal line (composite beam) is the minimum achievable stress — the full protective benefit of compressive reduction is visible on the graph.
                                </p>
                            )}
                        </div>

                        {WLBanner()}

                        {(() => {
                            // ── Shared constants ─────────────────────────────────────────────────
                            const plate = cm_plates[1]; // Vi 3.5mm Narrow: I_p=28.67, y=1.60
                            const E_St   = 187500; const E_bone = 18000;
                            const n_St   = E_St / E_bone;
                            const r_bone = 8.5;
                            const A_b = 150; const I_b = 10000; const M = 10000;
                            const K_bone = 50000;
                            const A_p  = 3 * plate.I_p / (plate.y * plate.y);

                            // Regime 1: Composite beam — MINIMUM (L-independent)
                            const D_i  = r_bone + plate.y;
                            const dp   = A_b * D_i / (n_St * A_p + A_b);
                            const db   = D_i - dp;
                            const AMI  = n_St * (plate.I_p + A_p * dp * dp) + (I_b + A_b * db * db);
                            const s1   = n_St * M * (dp + plate.y) / AMI;

                            // Regime 2: Spring K / post-closure — INTERMEDIATE (L-dependent)
                            const getS2 = (L) => {
                                const K = E_St * plate.I_p / L;
                                return M * (K / (K + K_bone)) * plate.y / plate.I_p;
                            };
                            const s2 = getS2(bannerWL);

                            // Regime 3: Pre-closure gap, plate alone — MAXIMUM (L-independent)
                            const s3 = M * plate.y / plate.I_p;

                            // ── Chart geometry ────────────────────────────────────────────────────
                            const PL = 64; const PR = 16; const PT = 20; const PB = 44;
                            const W = 520; const H = 270;
                            const PW = W - PL - PR; const PH = H - PT - PB;
                            const yMax = 620;
                            const mx = (L) => PL + (L - 2) / 98 * PW;
                            const my = (s) => PT + PH - (s / yMax) * PH;

                            // Spring K curve points
                            const springPts = [];
                            for (let L = 2; L <= 100; L += 1) springPts.push([mx(L), my(getS2(L))]);
                            const springPath = springPts.map((p, i) => (i === 0 ? `M${p[0].toFixed(1)},${p[1].toFixed(1)}` : `L${p[0].toFixed(1)},${p[1].toFixed(1)}`)).join(' ');

                            const yTicks = [0, 100, 200, 300, 400, 500, 600];
                            const cursorX = mx(bannerWL);
                            const s2Y = my(s2);
                            const s1Y = my(s1);
                            const s3Y = my(s3);

                            return (
                                <div className="space-y-4">
                                    {/* Live scorecard */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                        <div className={`border rounded-xl p-3 flex flex-col items-center text-center transition-opacity ${sec10AboveMcomp ? 'opacity-35 bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700' : 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800/50'}`}>
                                            <span className="text-[10px] font-semibold text-teal-700 dark:text-teal-400 mb-1">🟢 Minimum — Composite Beam</span>
                                            <span className={`text-2xl font-bold ${sec10AboveMcomp ? 'text-slate-400 line-through' : 'text-teal-600 dark:text-teal-300'}`}>{s1.toFixed(1)}</span>
                                            <span className="text-[9px] text-slate-500 dark:text-slate-400">MPa — <em>constant (any L)</em></span>
                                            <span className="text-[9px] text-teal-600 dark:text-teal-500 mt-1 italic">{sec10AboveMcomp ? 'Floor lost — load exceeds M_composite' : 'Cortices compressed; full composite AMI'}</span>
                                        </div>
                                        <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-800/50 rounded-xl p-3 flex flex-col items-center text-center">
                                            <span className="text-[10px] font-semibold text-indigo-700 dark:text-indigo-400 mb-1">🔵 Intermediate — Spring / Post-Closure (L = {bannerWL} mm)</span>
                                            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">{s2.toFixed(1)}</span>
                                            <span className="text-[9px] text-slate-500 dark:text-slate-400">MPa — <em>changes with L</em></span>
                                            <span className="text-[9px] text-indigo-600 dark:text-indigo-500 mt-1 italic">{(s3 / s2).toFixed(1)}× lower than pre-closure max</span>
                                        </div>
                                        <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800/50 rounded-xl p-3 flex flex-col items-center text-center">
                                            <span className="text-[10px] font-semibold text-rose-700 dark:text-rose-400 mb-1">🔴 Maximum — Pre-Closure Gap (plate alone)</span>
                                            <span className="text-2xl font-bold text-rose-600 dark:text-rose-300">{s3.toFixed(1)}</span>
                                            <span className="text-[9px] text-slate-500 dark:text-slate-400">MPa — <em>constant (any L)</em></span>
                                            <span className="text-[9px] text-rose-600 dark:text-rose-500 mt-1 italic">Full M on plate alone; σ = M·y/I<sub>p</sub></span>
                                        </div>
                                    </div>

                                    {/* SVG chart */}
                                    <div className="overflow-x-auto">
                                    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-2xl mx-auto block" style={{minWidth: '340px'}}>
                                        {/* Y-axis grid */}
                                        {yTicks.map(s => (
                                            <g key={s}>
                                                <line x1={PL} y1={my(s)} x2={PL+PW} y2={my(s)} stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-slate-700" />
                                                <text x={PL-6} y={my(s)+4} textAnchor="end" fontSize="9" className="fill-slate-500 dark:fill-slate-400">{s}</text>
                                            </g>
                                        ))}
                                        {/* X-axis ticks */}
                                        {[2,20,40,60,80,100].map(L => (
                                            <g key={L}>
                                                <line x1={mx(L)} y1={PT+PH} x2={mx(L)} y2={PT+PH+4} stroke="currentColor" strokeWidth="1" className="text-slate-400 dark:text-slate-500"/>
                                                <text x={mx(L)} y={PT+PH+14} textAnchor="middle" fontSize="9" className="fill-slate-500 dark:fill-slate-400">{L}</text>
                                            </g>
                                        ))}
                                        {/* Axis borders */}
                                        <line x1={PL} y1={PT} x2={PL} y2={PT+PH} stroke="currentColor" strokeWidth="1" className="text-slate-400 dark:text-slate-500"/>
                                        <line x1={PL} y1={PT+PH} x2={PL+PW} y2={PT+PH} stroke="currentColor" strokeWidth="1" className="text-slate-400 dark:text-slate-500"/>
                                        {/* Axis labels */}
                                        <text x={W/2} y={H-4} textAnchor="middle" fontSize="10" className="fill-slate-600 dark:fill-slate-400">Working Length L (mm)</text>
                                        <text x={8} y={H/2} textAnchor="middle" fontSize="10" transform={`rotate(-90, 8, ${H/2})`} className="fill-slate-600 dark:fill-slate-400">σ (MPa)</text>

                                        {/* 🔴 Pre-closure maximum — rose dashed horizontal (always visible) */}
                                        <line x1={PL} y1={s3Y} x2={PL+PW} y2={s3Y} stroke="#f43f5e" strokeWidth="2" strokeDasharray="6 3" />
                                        <text x={PL+PW-4} y={s3Y-5} textAnchor="end" fontSize="9" fill="#f43f5e">🔴 Max: pre-closure ({s3.toFixed(0)} MPa)</text>

                                        {/* 🔵 Spring K / post-closure curve — indigo (always visible) */}
                                        <path d={springPath} fill="none" stroke="#6366f1" strokeWidth="2.5"/>
                                        <text x={PL+8} y={my(getS2(2))+13} fontSize="9" fill="#6366f1">🔵 Intermediate: spring K / post-closure</text>

                                        {/* 🟢 Composite minimum floor — teal dashed (hidden when M > M_composite) */}
                                        {!sec10AboveMcomp && (
                                            <>
                                                <line x1={PL} y1={s1Y} x2={PL+PW} y2={s1Y} stroke="#0d9488" strokeWidth="2.5" strokeDasharray="4 2"/>
                                                <text x={PL+4} y={s1Y-5} textAnchor="start" fontSize="9" fill="#0d9488">🟢 Min: composite ({s1.toFixed(0)} MPa)</text>
                                            </>
                                        )}
                                        {sec10AboveMcomp && (
                                            <text x={PL+PW/2} y={my(s1)-12} textAnchor="middle" fontSize="9" fill="#94a3b8">— composite floor lost (M &gt; M_composite) —</text>
                                        )}

                                        {/* Vertical cursor at bannerWL */}
                                        <line x1={cursorX} y1={PT} x2={cursorX} y2={PT+PH} stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3"/>
                                        {/* Dot on spring curve */}
                                        <circle cx={cursorX} cy={s2Y} r="4" fill="#6366f1"/>
                                        {/* Dot on composite floor (only when visible) */}
                                        {!sec10AboveMcomp && <circle cx={cursorX} cy={s1Y} r="4" fill="#0d9488"/>}

                                        {/* Cursor L label */}
                                        {(() => {
                                            const lx = cursorX + (bannerWL > 75 ? -6 : 6);
                                            const anchor = bannerWL > 75 ? 'end' : 'start';
                                            return <text x={lx} y={PT+12} fontSize="9" textAnchor={anchor} className="fill-slate-600 dark:fill-slate-300">L = {bannerWL} mm</text>;
                                        })()}
                                    </svg>
                                    </div>

                                    {/* Dynamic conclusion */}
                                    <div className={`p-4 rounded-xl text-xs space-y-2 border ${sec10AboveMcomp ? 'bg-rose-50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-800/50' : 'bg-teal-50 dark:bg-teal-900/10 border-teal-200 dark:border-teal-800/50'}`}>
                                        {sec10AboveMcomp ? (
                                            <>
                                                <strong className="text-rose-700 dark:text-rose-400 block">⚠️ Overload Scenario: The Compression Advantage is Temporarily Suspended</strong>
                                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                                    When the applied bending moment exceeds M<sub>composite</sub>, the compressive pre-load is overwhelmed and the tension-side cortex separates. The construct immediately transitions from the composite regime into the spring K regime. The plate now experiences <strong>{s2.toFixed(0)} MPa</strong> at L = {bannerWL} mm — the same stress it would experience in a non-compressed construct. The <strong>{s1.toFixed(0)} MPa</strong> composite floor has disappeared. The difference between a compressed and non-compressed construct during this overload event is zero. This underlines an important clinical message: compressive reduction protects the implant only for loads that stay within the elastic composite range. If the patient is allowed to transmit high-energy loads early in healing (before callus bridges the gap), the protection evaporates during those peak events.
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <strong className="text-teal-700 dark:text-teal-400 block">✅ Physiological Mode: The Full Spectrum of Stress is Visible</strong>
                                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                                    At L = <strong>{bannerWL} mm</strong>, the three regimes produce stresses of <strong>{s1.toFixed(0)} MPa</strong> (compressed composite — minimum), <strong>{s2.toFixed(0)} MPa</strong> (spring K / post-closure — intermediate), and <strong>{s3.toFixed(0)} MPa</strong> (pre-closure gap — maximum). The compressive composite regime reduces stress by <strong>{(s2/s1).toFixed(0)}×</strong> compared to the intermediate scenario and by <strong>{(s3/s1).toFixed(0)}×</strong> compared to the worst-case pre-closure scenario. The intermediate curve decreases as L increases — drag the slider to see this — but even at L = 100 mm, the spring model stress of <strong>{getS2(100).toFixed(0)} MPa</strong> is still <strong>{(getS2(100)/s1).toFixed(0)}×</strong> higher than the composite floor. No clinically achievable working length can replicate the protection offered by compressive cortical contact.
                                                </p>
                                            </>
                                        )}
                                    </div>

                                    {/* ── Deep clinical narrative (inside IIFE so s1/s2/s3 are in scope) ── */}
                                    <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-700">
                                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">What This Means in the Operating Theatre</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 space-y-2">
                                                <p className="font-semibold text-slate-700 dark:text-slate-300">Why the intermediate curve and the post-closure gap produce the same stress</p>
                                                <p className="leading-relaxed">
                                                    This is not a coincidence — it is a mathematical consequence of the spring model. In both cases, the only load path from one bone fragment to the other is through the fracture-interface contact spring (K<sub>bone</sub> ≈ 50,000 N·mm/rad). Whether that contact is due to direct reduction (no gap) or gap closure under bending load, the mechanics are identical once contact is established: <Latex math="\sigma = M \cdot \tfrac{K_{plate}}{K_{plate}+K_{bone}} \cdot \tfrac{y}{I_p}" />. The formula contains no information about whether a gap existed before bending — only about whether contact exists now.
                                                </p>
                                            </div>
                                            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 space-y-2">
                                                <p className="font-semibold text-slate-700 dark:text-slate-300">The pre-closure phase: a high-stakes transient</p>
                                                <p className="leading-relaxed">
                                                    Before the gap closes, the plate carries the entire moment alone. As shown in Section 9, the gap closes at M<sub>close</sub> = EI<sub>p</sub>·gap / (L·D<sub>bone</sub>). At short working lengths, M<sub>close</sub> is high — the gap is hard to close — so the plate spends more of each loading cycle in the dangerous pre-closure regime (<strong>{s3.toFixed(0)} MPa</strong>). At long working lengths, M<sub>close</sub> is low — the gap closes easily at low loads — so the plate quickly transitions to the safer intermediate regime. This is the <em>only</em> beneficial effect of working length in a gap model.
                                                </p>
                                            </div>
                                            <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-xl border border-amber-200 dark:border-amber-800/50 text-xs text-slate-600 dark:text-slate-400 space-y-2">
                                                <p className="font-semibold text-amber-800 dark:text-amber-300">When compression truly matters: the regime boundary</p>
                                                <p className="leading-relaxed">
                                                    Compressive reduction moves the construct from the intermediate curve down to the minimum floor — a drop of <strong>~{(s2-s1).toFixed(0)} MPa at L = {bannerWL} mm</strong>. This is maintained for every cycle of physiological loading in which M stays below M<sub>composite</sub>. For a typical canine long-bone repair, M<sub>composite</sub> depends on the screw torque and the quality of cortical contact. The key clinical insight is that the minimum floor is entirely independent of working length: <strong>you cannot achieve composite-beam protection by extending the plate span — only by achieving and maintaining compressive cortical contact.</strong>
                                                </p>
                                            </div>
                                            <div className="bg-indigo-50 dark:bg-indigo-900/10 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800/50 text-xs text-slate-600 dark:text-slate-400 space-y-2">
                                                <p className="font-semibold text-indigo-700 dark:text-indigo-400">Practical implications for plate selection and post-op protocol</p>
                                                <p className="leading-relaxed">
                                                    The graph reveals three distinct surgical goals: <strong>(1)</strong> If compression is achieved and maintained below M<sub>composite</sub>, any working length is acceptable — the minimum floor governs. <strong>(2)</strong> If compression cannot be guaranteed (bridging fractures, comminution, gap persistence), the intermediate curve governs — a longer working length reduces stress and is beneficial. <strong>(3)</strong> If a gap exists and the patient is allowed to load before the gap closes, the maximum pre-closure line is the operative stress — working length offers no protection at all during this phase. Post-operative loading restriction protocols should therefore be designed around which regime the construct is in, not simply around fracture type.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>

                <div className="bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500 p-5 md:p-6 rounded-r-2xl shadow-sm border border-y-rose-200 border-r-rose-200 dark:border-y-rose-800/50 dark:border-r-rose-800/50">
                    <h4 className="text-base font-bold text-rose-800 dark:text-rose-300 flex items-center mb-3">
                        <IconShield /> Critical Clinical Warning
                    </h4>
                    <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                        A more flexible implant will result in a stronger construct <strong>only in closed-gap bending</strong>. A simple fracture under compression can also be exposed to open-gap bending and <strong>torsional loads</strong>. In these situations, the more flexible implant will predispose to high interfragmentary strains, again leading to the problem of delayed healing or even a non-union. As we cannot be certain that the construct will only be subjected to pure closed-gap bending—even if we have placed the plate on the tension side of the bone—increasing the flexibility of the implant should be done with caution.
                    </p>
                    <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed mt-4 pt-4 border-t border-rose-200 dark:border-rose-800/50">
                        <strong>Rule of Thumb:</strong> Despite the fact that mathematical modelling suggests that a flexible implant in compressive osteosynthesis will increase the strength of the construct more than upsizing the implant, this refers to idealised conditions where open-gap bending and torsion do not occur. For this reason, a safe rule of thumb is to use the strongest and stiffest implant necessary, taking into consideration the patient's temperament and the fracture location.
                    </p>
                </div>

            </div>
            );
        };

        // --- TAB 2: CONSTRUCTS & PLANES ---
        const ConstructsTab = () => (
            <div className="fade-in space-y-6">
                <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 shadow-inner">
                    <p className="text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                        The anatomical environment fundamentally alters the calculations. Which anatomical plane the plates are positioned on determines the bending axis, and whether the fracture has bone-to-bone contact determines if we use the robust Composite AMI or the isolated Implant AMI.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Compression Mechanics */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Single Plating (Compression)</h3>
                        
                        <div className="space-y-4 mb-6">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800/50">
                                <strong className="text-sm text-blue-700 dark:text-blue-400 block mb-1">Tension Band Mode</strong>
                                <p className="text-xs text-slate-600 dark:text-slate-400">Bending applied <em>towards</em> the plate perfectly compresses the fracture. The bone and metal act as a unified structure. The calculator applies the immense <strong>Composite Construct AMI</strong>. Highly stable.</p>
                            </div>
                            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800/50">
                                <strong className="text-sm text-amber-700 dark:text-amber-400 block mb-1">Open-Gap Mode</strong>
                                <p className="text-xs text-slate-600 dark:text-slate-400">Bending applied orthogonally gaps the far cortex open. The bone acts only as a hinge, leaving the plate isolated. The calculator strips away the bone and drops strictly to the <strong>Isolated Implant AMI</strong>. Strength plummets.</p>
                            </div>
                        </div>

                        <div className="mt-auto bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                                <strong>Clinical Tip:</strong> Placing a plate <em>Medially</em> vs <em>Anteriorly</em> completely flips which anatomical axis benefits from robust Tension Band mechanics versus vulnerable Open-Gap mechanics. Always verify which surface faces the dominant bending force for your specific anatomy.
                            </p>
                        </div>
                    </div>

                    {/* Bridging Mechanics */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Double Plating (Bridging)</h3>
                        
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                            In a fracture with a persistent interfragmentary gap, bone support is zero. The composite AMI no longer applies. We must evaluate the combined <strong>Isolated Implant AMI</strong> of the plates themselves.
                        </p>

                        <div className="space-y-4 mb-6">
                            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/50">
                                <strong className="text-sm text-emerald-700 dark:text-emerald-400 block mb-1">180° Parallel</strong>
                                <p className="text-xs text-slate-600 dark:text-slate-400">Symmetrical. Highly compliant, promoting callus formation. Superior fatigue life. <em>Risk:</em> Prone to elastic buckling under extreme axial loads due to flexibility.</p>
                            </div>
                            <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-xl border border-rose-200 dark:border-rose-800/50">
                                <strong className="text-sm text-rose-700 dark:text-rose-400 block mb-1">90° Orthogonal</strong>
                                <p className="text-xs text-slate-600 dark:text-slate-400">Ultra-stiff against buckling. <em>Risk:</em> The L-shape causes <strong>"skew bending"</strong> (twisting under load), creating massive stress risers at the plate corners and rapidly dropping the yield strength.</p>
                            </div>
                        </div>

                        <div className="mt-auto bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                                <strong>Clinical Tip:</strong> 180° setups excel in biological healing, while 90° setups sacrifice fatigue resilience to establish rigid alignment against buckling. Finite element models confirm that 90° orthogonal configurations carry a significant fatigue penalty compared to 180° parallel setups due to skew bending stress risers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );

        // --- TAB 3: WORKING LENGTH ---
        const WorkingLengthTab = () => {
            const [gapType, setGapType] = useState('large');
            const [workingLength, setWorkingLength] = useState(60);
            const [deepDiveOpen, setDeepDiveOpen] = useState(false);

            const bendFactor = workingLength / 100; 
            const deflection = gapType === 'large' ? bendFactor * 12 : Math.min(bendFactor * 12, 3);
            const boneContact = gapType === 'small' && deflection >= 3;

            return (
                <div className="fade-in space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/50">
                        <p className="text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                            <strong>Working length</strong> — the unsupported span between the innermost screws — is the principal determinant of plate stress in two distinct clinical scenarios: <strong>(1) bridging constructs with a large persistent gap</strong>, where no cortical contact exists and the plate bears the entire load; and <strong>(2) compressed constructs loaded in open-gap mode</strong>, where externally applied moments tend to open the fracture gap and cortical contact on the tension side is therefore lost. In both situations the plate behaves as an isolated beam spanning the working length, so the same mechanical principles govern stress.
                        </p>
                        <p className="text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-300 mt-3">
                            The interactive model and mathematics below present the influence of working length in the <strong>bridging configuration</strong>. Because the load-bearing mechanism is identical, this analysis is also a valid approximation of what happens in a compressed construct that is subjected to open-gap loading. Increasing the working length makes the plate more flexible; however, this flexibility either alleviates or multiplies plate stress depending on whether cortical contact can be re-established.
                        </p>
                        <p className="text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-300 mt-3">
                            To compare the effect of working length against material choice and plate size under <em>realistic</em> conditions, we will assume a small <strong>interfragmentary gap of 1 mm</strong>. This is a clinically representative scenario: complete anatomical reduction is rarely achieved in practice, and a residual gap of approximately 1 mm is common even after careful reduction and compression.
                        </p>
                    </div>

                    <div className="bg-indigo-50 dark:bg-indigo-900/15 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
                        <h3 className="text-base font-bold text-indigo-800 dark:text-indigo-300 mb-4">
                            Why Loading Conditions Matter: Four-Point Bending vs. Axial Loading
                        </h3>
                        <p className="text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
                            When studying how working length affects plate stress, it is essential to understand the difference between two loading models, because they produce fundamentally different mechanical behaviour.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800/50">
                                <h4 className="font-bold text-sm text-indigo-700 dark:text-indigo-400 mb-2">Pure Bending (Four-Point Bending)</h4>
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                    In a four-point bending test, two equal and opposing moments are applied to the ends of the beam. Between the inner loading points, the <strong>bending moment (M) is perfectly constant</strong> — it does not depend on how much the beam deflects or how long the span is. Because the stress formula is <strong>σ = M·y / I</strong>, and M stays fixed regardless of working length, <strong>lengthening the working length alone does not increase the stress</strong> in the material within the unsupported span. Deflection increases with span, but the moment — and therefore the stress — does not follow. Importantly, a pure bending moment <em>can</em> close a small interfragmentary gap without any axial load — this is explored in the small-gap scenario below.
                                </p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-rose-200 dark:border-rose-800/50">
                                <h4 className="font-bold text-sm text-rose-700 dark:text-rose-400 mb-2">Axial Loading (P-Delta Effect)</h4>
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                    When a compressive axial load (P) is applied, the situation changes completely. The line of action of P runs along the bone's longitudinal axis, which is offset from the plate centroid by an eccentricity <Latex math="e" /> (≈ <Latex math={'r_{bone} + t/2'} /> plus any periosteum-plate gap). As the working length increases, the plate deflects more, so the lever arm grows from its baseline to <Latex math="(e + \delta)" />. The bending moment is no longer fixed: <strong>M = P × (e + δ)</strong>. The load actively <em>takes advantage</em> of the extra deflection to generate a larger moment. Because it is this bending moment that bends the structure and creates stress in the material, <strong>increasing working length exponentially raises stress</strong> — a compounding, self-amplifying process known as the P-Delta effect. Note that <Latex math="e" /> is geometric: even a plate held flush against the periosteum still sits one bone radius plus half a plate thickness away from the bone's longitudinal axis, so <Latex math="e" /> is never zero in bridging.
                                </p>
                            </div>
                        </div>

                        <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-lg p-4 border border-indigo-200 dark:border-indigo-700/50">
                            <p className="text-xs text-indigo-900 dark:text-indigo-200 leading-relaxed">
                                <strong>Why axial loading is used for the large-gap (bridging) model:</strong> In pure bending, the moment stays constant regardless of span — making working length irrelevant to plate stress if the gap can never close. In axial loading, deflection feeds directly back into the moment (P-Delta), making the relationship between working length and plate stress clinically critical. The interactive bridging calculator therefore uses axial loading to capture this real-world P-Delta behaviour. <em>Note: for the small-gap scenario below, axial loading is not required — bending alone closes the gap, as explained in the 1 mm gap section.</em>
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <div className="lg:col-span-5 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-8">
                            <div>
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3 block">Fracture Gap Size</label>
                                <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
                                    <button onClick={() => setGapType('large')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${gapType === 'large' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>
                                        Large Gap (bridging)
                                    </button>
                                    <button onClick={() => setGapType('small')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${gapType === 'small' ? 'bg-white dark:bg-slate-700 shadow-sm text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>
                                        1 mm Gap (realistic)
                                    </button>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-200">Working Length (<Latex math="L" />)</label>
                                    <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">{workingLength} mm</span>
                                </div>
                                <input type="range" min="20" max="100" step="5" value={workingLength} onChange={(e) => setWorkingLength(Number(e.target.value))} />
                            </div>

                            <div className={`p-4 rounded-xl border ${gapType === 'large' ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800/50' : 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/50'}`}>
                                <h4 className={`font-bold mb-2 ${gapType === 'large' ? 'text-rose-700 dark:text-rose-400' : 'text-emerald-700 dark:text-emerald-400'}`}>
                                    {gapType === 'large' ? 'Load-Bearing Scenario (Large Gap)' : '1 mm Gap — Realistic Load-Sharing Scenario'}
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {gapType === 'large' 
                                        ? "Because the bone fragments cannot touch, the plate supports 100% of the load. Increasing the working length makes the plate bow further outwards, increasing the eccentric lever arm and exponentially raising plate stresses."
                                        : "A 1 mm interfragmentary gap is used as the standard comparison scenario because complete reduction is rarely achievable in practice. Under a bending moment alone (no axial load required), the plate flexes and the far cortex touches first; we approximate this as uniform bone-to-bone contact once the gap closes. The critical moment needed to close the gap (M_close) depends on construct stiffness: a more flexible construct — longer working length or titanium — requires a smaller M to close the gap, enabling earlier load-sharing and a sharp drop in plate stress. Upsizing makes the construct stiffer, raising M_close and delaying load-sharing. The 'Realistic Scenario' concept below quantifies this."}
                                </p>
                            </div>
                        </div>

                        <div className="lg:col-span-7 bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 flex items-center justify-center min-h-[400px]">
                            <svg viewBox="0 0 200 300" className="w-full max-w-[180px] h-auto drop-shadow-sm overflow-visible transition-all duration-300">
                                <path d="M 60 10 L 55 25 L 65 25 Z" className="fill-rose-500" />
                                <line x1="60" y1="10" x2="60" y2="40" className="stroke-rose-500" strokeWidth="3" />
                                
                                <rect x="40" y="40" width="40" height="100" className="fill-slate-200 dark:fill-slate-700 stroke-slate-400 stroke-2" rx="2" />
                                
                                <g transform={`translate(0, ${gapType === 'large' ? 40 : (boneContact ? 4 : 10)})`}>
                                    <rect x="40" y="140" width="40" height="100" className="fill-slate-200 dark:fill-slate-700 stroke-slate-400 stroke-2" rx="2" />
                                    <path d="M 60 270 L 55 255 L 65 255 Z" className="fill-rose-500" />
                                    <line x1="60" y1="270" x2="60" y2="240" className="stroke-rose-500" strokeWidth="3" />
                                </g>

                                {boneContact && (
                                    <rect x="38" y="140" width="44" height="4" className="fill-emerald-400 animate-pulse" />
                                )}

                                <path 
                                    d={`M 90 ${140 - workingLength/2} Q ${90 + deflection*3} 140 90 ${140 + workingLength/2}`} 
                                    fill="none" 
                                    className={`stroke-8 stroke-linecap-round transition-all duration-300 ${gapType === 'large' ? (workingLength > 50 ? 'stroke-rose-500' : 'stroke-blue-500') : (boneContact ? 'stroke-emerald-500' : 'stroke-blue-500')}`} 
                                />

                                <circle cx="90" cy={140 - workingLength/2} r="4" className="fill-slate-100 stroke-slate-500 stroke-2" />
                                <circle cx="90" cy={140 + workingLength/2} r="4" className="fill-slate-100 stroke-slate-500 stroke-2" />

                                <text x="140" y="145" className={`text-sm font-bold ${gapType === 'large' ? (workingLength > 50 ? 'fill-rose-600' : 'fill-slate-500') : (boneContact ? 'fill-emerald-600' : 'fill-slate-500')}`}>
                                    {gapType === 'large' ? (workingLength > 50 ? 'HIGH STRESS' : 'MODERATE STRESS') : (boneContact ? 'LOAD SHARING (SAFE)' : 'BENDING')}
                                </text>
                            </svg>
                        </div>
                    </div>

                    {/* Mathematical Deep Dive: The P-Delta Effect */}
                    <div className="mt-12 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                        <div className="space-y-4 mb-6 border-b border-slate-200 dark:border-slate-700 pb-6">
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="text-xl font-bold text-rose-700 dark:text-rose-400">
                                    Mathematical Deep Dive: Secondary Bending (P-Delta Effect)
                                </h3>
                                <button
                                    onClick={() => setDeepDiveOpen(o => !o)}
                                    className="flex-shrink-0 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50 px-3 py-1.5 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors"
                                >
                                    {deepDiveOpen ? '▲ Collapse' : '▼ Expand'}
                                </button>
                            </div>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                                You might wonder: if the stress formula is <Latex math="\sigma = \frac{M \cdot y}{I}" />, and Working Length (<Latex math="L" />) isn't in that equation, how does increasing <Latex math="L" /> increase the stress? 
                            </p>
                            {deepDiveOpen && (
                                <div className="space-y-4 fade-in">
                                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                        The answer is the <strong>P-Delta Effect</strong>. While the length of the plate doesn't change its cross-sectional Area Moment of Inertia (<Latex math="I" />), it drastically reduces the plate's overall structural stiffness (<Latex math="EI" />) against deflection (<Latex math="\delta" />). 
                                    </p>
                                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                        As a compliant plate bows outwards under an axial load (<Latex math="P" />), the eccentricity (<Latex math="e" />) of that load physically increases. <strong>Important:</strong> <Latex math="e" /> here is the perpendicular distance between the bone's longitudinal axis (where the line of action of <Latex math="P" /> sits) and the plate's centroidal axis. That distance is approximately <Latex math={'r_{bone} + t/2'} /> plus any periosteum-plate gap, so it is always strictly positive in a bridging construct — pressing the plate against the bone reduces but cannot collapse it. The new bending moment becomes <Latex math="M = P \cdot (e + \delta)" />. Because deflection (<Latex math="\delta" />) grows exponentially with length (governed by the secant function of the beam-column), the bending moment <Latex math="M" /> skyrockets, dragging the stress <Latex math="\sigma" /> up with it! This represents the exact mathematical formula utilised in the interactive calculator for bridging constructs.
                                    </p>
                                </div>
                            )}
                        </div>

                        <WorkingLengthInteractiveGraph showFormulas={deepDiveOpen} />
                    </div>
                </div>
            );
        };

        // --- TAB 4: OFFSET & BENDING ---
        const OffsetTab = () => {
            const [offset, setOffset] = useState(4); // 0 to 15mm

            return (
                <div className="fade-in space-y-6">
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
                        <p className="text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                            In bridging osteosynthesis the plate is <strong>never</strong> placed on the bone's longitudinal axis — there is always an inherent eccentricity of roughly the bone radius plus half the plate thickness (<Latex math={'r_{bone} + t/2'} />) between the load path and the plate centroid. On top of that baseline, locking plates are often held off the periosteum to preserve blood supply. We label this <strong>additional</strong> periosteum-to-plate distance <Latex math="e" />. Both eccentricities act as a lever arm: any axial load (<Latex math="P" />) is converted into a bending moment, and increasing <Latex math="e" /> only adds to the moment that already exists at <Latex math="e = 0" />.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-200">Periosteum-Plate Offset (<Latex math="e" />)</label>
                                <span className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded">{offset} mm</span>
                            </div>
                            <input type="range" min="0" max="15" step="1" value={offset} onChange={(e) => setOffset(Number(e.target.value))} className="mb-6" />
                            
                            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                                <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Induced Bending Moment</span>
                                <div className="text-3xl font-black text-rose-500 my-2">
                                    {(offset * 10).toFixed(0)} <span className="text-lg text-rose-400">N·mm</span>
                                </div>
                                <p className="text-xs text-slate-500 italic">Assuming constant 10N axial load</p>
                            </div>
                        </div>

                        <div className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 flex justify-center min-h-[300px]">
                            <svg viewBox="0 0 300 200" className="w-full max-w-[250px] h-auto overflow-visible">
                                <line x1="80" y1="20" x2="80" y2="180" className="stroke-slate-400 stroke-dasharray-4 stroke-2" />
                                <path d="M 80 10 L 75 25 L 85 25 Z" className="fill-rose-500" />
                                <text x="80" y="5" className="fill-rose-600 font-bold text-xs" textAnchor="middle">Load (P)</text>
                                
                                <rect x="50" y="40" width="60" height="120" className="fill-slate-200 dark:fill-slate-700 stroke-slate-400 stroke-2" rx="4" />
                                
                                <rect x={110 + (offset * 5)} y="50" width="12" height="100" className="fill-indigo-500 dark:fill-indigo-600" rx="2" />
                                
                                <rect x="110" y="70" width={offset * 5} height="6" className="fill-slate-400" />
                                <rect x="110" y="120" width={offset * 5} height="6" className="fill-slate-400" />
                                
                                <line x1="80" y1="100" x2={110 + (offset * 5)} y2="100" className="stroke-amber-500 stroke-2" />
                                <text x={95 + (offset * 2.5)} y="95" className="fill-amber-600 font-bold text-[10px]" textAnchor="middle">Periosteum→Plate (e)</text>

                                {offset > 0 && (
                                    <path d={`M 60 30 Q ${120 + offset*5} 0 ${120 + offset*5} 40`} fill="none" className="stroke-rose-500 stroke-2" markerEnd="url(#arrow)" />
                                )}
                                
                                <defs>
                                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                        <path d="M 0 0 L 10 5 L 0 10 z" className="fill-rose-500" />
                                    </marker>
                                </defs>
                            </svg>
                        </div>
                    </div>

                    {/* The Combined Lever Effect */}
                    <div className="mt-8 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                        <div className="space-y-4 mb-6 border-b border-slate-200 dark:border-slate-700 pb-6">
                            <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-400">
                                The Combined Lever Effect
                            </h3>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                Offset (<Latex math="e" />) does not act in isolation. In a bridging construct, the plate also deflects laterally under load (<Latex math="\delta" />). Because both eccentricities act in the same direction, they are <strong>directly additive</strong>. The true bending moment is therefore:
                            </p>
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border-l-4 border-indigo-400 text-sm text-slate-700 dark:text-slate-300 flex items-center justify-between">
                                <span className="font-semibold">Combined Moment:</span>
                                <Latex math={`M_{total} = P \\times (e + \\delta)`} />
                            </div>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                This means that <strong>offset amplifies the P-Delta effect</strong>. The higher the initial eccentricity (<Latex math="e" />), the greater the baseline bending moment before any deflection even occurs. As working length grows and <Latex math="\delta" /> climbs exponentially, the starting value of <Latex math="e" /> is compounded at every step.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-rose-50 dark:bg-rose-900/10 p-5 rounded-xl border border-rose-200 dark:border-rose-800/50">
                                <strong className="text-rose-700 dark:text-rose-400 text-sm block mb-2">High Offset + Long Working Length</strong>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    A large offset generates a high baseline moment. A long working length then amplifies this with exponential deflection. The two effects compound to produce catastrophic plate stress—the most dangerous construct combination.
                                </p>
                            </div>
                            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800/50">
                                <strong className="text-emerald-700 dark:text-emerald-400 text-sm block mb-2">Periosteal Contact (<Latex math="e = 0" />)</strong>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    When the plate lies flush against the periosteum the <em>additional</em> offset is zero, but the inherent eccentricity between the plate and the bone's longitudinal axis (<Latex math={'\\approx r_{bone} + t/2'} />) remains. A baseline bending moment therefore still exists — pressing the plate onto bone only minimises the lever arm, it never eliminates it. This is the mechanically optimal starting condition the construct can achieve.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                                <strong className="text-indigo-700 dark:text-indigo-400">Clinical Rule:</strong> The plate-to-bone-axis offset is unavoidable in bridging, so minimise the <em>additional</em> periosteum-plate offset (<Latex math="e" />) wherever blood supply allows. Every millimetre of <Latex math="e" /> stacks on top of the inherent <Latex math={'r_{bone} + t/2'} /> eccentricity and adds a fixed baseline moment of <Latex math="P \times e" /> that persists throughout the entire healing phase, compounding the P-Delta amplification from working length.
                            </p>
                        </div>
                    </div>
                </div>
            );
        };

        // --- TAB 5: DCP vs LCP MECHANICS ---
        const ScrewMechanicsTab = () => {
            const [screwType, setScrewType] = useState('LCP'); // 'DCP' or 'LCP'

            return (
                <div className="fade-in space-y-6">
                    <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-2xl border border-amber-100 dark:border-amber-800/50">
                        <p className="text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                            Based on MacLeod, Simpson & Pankaj (2015). Why do conventional Dynamic Compression Plates (DCPs) fail more frequently in osteoporotic bone than Locking Compression Plates (LCPs)? The answer lies in the <strong>screw-tightening preload</strong>.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <div className="lg:col-span-5 space-y-6">
                            <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-xl">
                                <button onClick={() => setScrewType('DCP')} className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${screwType === 'DCP' ? 'bg-white dark:bg-slate-700 shadow-md text-rose-600 dark:text-rose-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}>
                                    DCP (Conventional)
                                </button>
                                <button onClick={() => setScrewType('LCP')} className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${screwType === 'LCP' ? 'bg-white dark:bg-slate-700 shadow-md text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}>
                                    LCP (Locking)
                                </button>
                            </div>

                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                                {screwType === 'DCP' ? (
                                    <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed fade-in">
                                        <p><strong className="text-rose-600 dark:text-rose-400">Friction-Dependent:</strong> A conventional screw holds the plate purely by generating compression. This creates immense friction between the plate and the bone.</p>
                                        <p><strong>The Osteoporotic Penalty:</strong> Before the patient even bears weight, this screw-tightening preload generates massive compressive and tensile strains <em>360 degrees around the screw hole</em>. In weak, osteoporotic bone, these initial strains frequently exceed the bone's yield point, leading to immediate micro-damage, aseptic loosening, and pull-out.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed fade-in">
                                        <p><strong className="text-blue-600 dark:text-blue-400">Structural Continuity:</strong> The threads on a locking screw head lock directly into the plate, creating a fixed-angle frame (<Latex math="K=0.5" />).</p>
                                        <p><strong>The Osteoporotic Advantage:</strong> Because it does not rely on friction, there is <em>no screw-tightening preload</em>. Strains only appear when the patient bears weight, and they are confined primarily to the loaded side of the screw. The bone is spared the destructive 360-degree preload strain, making LCPs vastly superior for poor bone quality.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-7 bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 flex items-center justify-center min-h-[350px]">
                            <svg viewBox="0 0 300 250" className="w-full max-w-[280px] h-auto overflow-visible">
                                <rect x="50" y="100" width="200" height="100" className="fill-amber-100 dark:fill-amber-900/20 stroke-amber-300 dark:stroke-amber-700 stroke-2" rx="4" />
                                
                                {screwType === 'DCP' ? (
                                    <g className="fade-in">
                                        <ellipse cx="150" cy="110" rx="60" ry="25" className="fill-rose-500/40 animate-pulse blur-sm" />
                                        <ellipse cx="150" cy="110" rx="40" ry="15" className="fill-rose-500/60 animate-pulse blur-sm" />
                                        
                                        <rect x="40" y="80" width="220" height="20" className="fill-slate-300 dark:fill-slate-600 stroke-slate-500" rx="2" />
                                        
                                        <path d="M 130 50 L 170 50 L 160 80 L 140 80 Z" className="fill-slate-400 stroke-slate-600" />
                                        <rect x="140" y="80" width="20" height="100" className="fill-slate-400 stroke-slate-600" />
                                        
                                        <path d="M 120 60 L 120 75 L 115 70 M 120 75 L 125 70" fill="none" className="stroke-rose-600 stroke-2" />
                                        <path d="M 180 60 L 180 75 L 175 70 M 180 75 L 185 70" fill="none" className="stroke-rose-600 stroke-2" />
                                        <text x="150" y="30" className="fill-rose-600 font-bold text-[10px]" textAnchor="middle">Screw-Tightening Preload</text>
                                    </g>
                                ) : (
                                    <g className="fade-in">
                                        <ellipse cx="120" cy="120" rx="20" ry="30" className="fill-blue-500/40 animate-pulse blur-sm" />
                                        
                                        <rect x="40" y="70" width="220" height="20" className="fill-blue-200 dark:fill-blue-800 stroke-blue-400" rx="2" />
                                        
                                        <line x1="135" y1="75" x2="165" y2="75" className="stroke-blue-500 stroke-2" />
                                        <line x1="135" y1="85" x2="165" y2="85" className="stroke-blue-500 stroke-2" />

                                        <rect x="135" y="50" width="30" height="20" className="fill-slate-400 stroke-slate-600" rx="2" />
                                        <rect x="140" y="70" width="20" height="110" className="fill-slate-400 stroke-slate-600" />
                                        
                                        <path d="M 50 150 L 70 150 L 65 145 M 70 150 L 65 155" fill="none" className="stroke-blue-500 stroke-2" />
                                        <text x="150" y="30" className="fill-blue-600 font-bold text-[10px]" textAnchor="middle">Threads locked. No clamping force.</text>
                                    </g>
                                )}
                            </svg>
                        </div>
                    </div>
                </div>
            );
        };


        // --- TAB 8: ADVANCED CONCEPTS ---
        const AdvancedMechanicsTab = () => (
            <div className="fade-in space-y-6">
                <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-md border border-slate-700">
                    <p className="text-sm md:text-base leading-relaxed text-slate-200">
                        Advanced structural engineering concepts explaining the mechanical paradoxes of the neutral axis, composite structures, and pre-stressed models. These rules define the mathematical limits of orthopaedic constructs.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* The Fundamental Law */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
                        <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center">
                            <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 w-6 h-6 rounded flex items-center justify-center mr-3 text-xs font-black">1</span> 
                            The Unconstrained Beam
                        </h3>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                            Based on Euler-Bernoulli beam theory, when a pure bending moment is applied to a free-floating, uniform material (like an intact long bone in an unconstrained environment), the structure curves. Longitudinally, one side compresses while the opposite side stretches. Kinematically, there must exist a fulcrum plane where strain transitions between the two and is absolutely zero—the neutral axis. 
                        </p>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                            Because the material is uniform, strain maps directly to stress. Since there are no external pushing or pulling forces involved, the internal compressive forces must perfectly balance the internal tensile forces to maintain static equilibrium (<Latex math="\sum F_{internal} = 0" />). To satisfy this mathematical requirement, the neutral axis of zero stress <strong>must</strong> pass exactly through the geometric centroid.
                        </p>
                        <div className="mt-auto bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800/50">
                            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                                <span className="font-bold text-blue-700 dark:text-blue-400">Rule:</span> For an unconstrained, uniform material, the kinematic bending axis and the axis of zero stress are mathematically identical and rest exactly at the geometric centroid.
                            </p>
                        </div>
                    </div>

                    {/* The Composite Axis Shift */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
                        <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center">
                            <span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 w-6 h-6 rounded flex items-center justify-center mr-3 text-xs font-black">2</span> 
                            The Modulus-Weighted Shift
                        </h3>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                            When two distinct materials are locked together—such as a rigid metallic implant physically tethered to cortical bone—the mechanics change drastically. Metal has a significantly higher Young's Modulus (<Latex math="E" />). Assuming plane sections remain plane during bending, the stiffer metal will experience an exponentially higher force for the exact same degree of physical strain.
                        </p>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                            If the bending axis remained at the pure geometric centre, the rigid plate would generate massive unbalanced internal forces. To restore equilibrium (<Latex math="\sum F_{internal} = 0" />), the true bending axis is physically pulled away from the geometric centre and towards the stiffer material. Engineers calculate this shift using the <strong>Transformed Section Method</strong>, multiplying the plate's physical area by the modulus ratio (<Latex math="n" />) to find the new, true internal centre.
                        </p>
                        <div className="mt-auto bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/50">
                            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                                <span className="font-bold text-emerald-700 dark:text-emerald-400">Rule:</span> Unconstrained composite constructs inherently bend about their modulus-weighted centroid, pulling the mechanical fulcrum towards the stiffer material.
                            </p>
                        </div>
                    </div>

                    {/* The Constrained Axis */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
                        <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center">
                            <span className="bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 w-6 h-6 rounded flex items-center justify-center mr-3 text-xs font-black">3</span> 
                            The Constrained Axis
                        </h3>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                            What happens if the structure is <em>physically forced</em> to bend around an external point, such as a bone segment tethered to the rigid restraint of an <strong>external fixator device</strong>? The bone segment is completely prevented from bending around its own natural, internal centroid.
                        </p>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                            Because it is rotating off-centre, the entire cross-section of the bone may fall onto one side of the bending axis, placing the entire segment into either pure tension or pure compression. The internal forces do not balance (<Latex math="\sum F_{internal} \neq 0" />); instead, total equilibrium relies on the massive reaction forces at the external fixator pins. To calculate the stiffness of this severely off-axis rotation, we must apply the <strong>Parallel Axis Theorem</strong>.
                        </p>
                        <div className="mt-auto bg-amber-50 dark:bg-amber-900/10 p-4 rounded-xl border border-amber-200 dark:border-amber-800/50">
                            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                                <span className="font-bold text-amber-700 dark:text-amber-400">Rule:</span> Physically constrained structures bend about their forced external axis. Stiffness requires the addition of <Latex math="A \cdot d^2" />, where <Latex math="d" /> is the distance to the external hinge restraint.
                            </p>
                        </div>
                    </div>

                    {/* The Orthopaedic Paradox */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
                        <h3 className="text-lg font-bold text-rose-700 dark:text-rose-400 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center">
                            <span className="bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-300 w-6 h-6 rounded flex items-center justify-center mr-3 text-xs font-black">4</span> 
                            The Pre-Stress Paradox
                        </h3>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                            A fractured bone has zero tensile strength—it will immediately pull apart across the gap. If the composite's bending axis rests within the bone, kinematics dictate the far cortex must be placed under tension, which would cause the fracture to gap and the construct to fail. 
                        </p>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                            Surgeons resolve this via <strong>pre-compression</strong> (e.g., tensioning a DCP). This applies a massive static compressive load across the entire bone segment. When physiological bending later occurs, the construct <em>still physically bends around the composite's modulus-weighted centroid</em>. However, through the Principle of Superposition, the newly generated dynamic tensile stresses are completely overpowered by the static pre-compression.
                        </p>
                        <div className="mt-auto bg-rose-50 dark:bg-rose-900/10 p-4 rounded-xl border border-rose-200 dark:border-rose-800/50">
                            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                                <span className="font-bold text-rose-700 dark:text-rose-400">Rule:</span> Pre-loading shifts the <em>axis of zero stress</em> entirely outside the bone, ensuring the fracture remains compressed. Yet, the <em>geometric bending axis</em> remains firmly at the composite centroid.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );

        // --- EXPERT REVIEWS PANEL ---
        const ExpertReviewsPanel = ({ onClose }) => (
            <div
                className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm overflow-y-auto py-6 px-4"
                onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            >
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-4xl mx-auto mb-6">

                    {/* Panel header */}
                    <div className="flex items-start justify-between gap-4 p-6 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex items-start gap-3">
                            <span className="text-xl mt-0.5 flex-shrink-0">⭐</span>
                            <div>
                                <h2 className="text-lg font-extrabold text-amber-700 dark:text-amber-400">Independent Expert Reviews</h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed italic max-w-2xl">
                                    The following reviews were independently produced by two AI language models — <strong className="not-italic text-slate-600 dark:text-slate-300">Gemini 3.1</strong> and <strong className="not-italic text-slate-600 dark:text-slate-300">Claude Sonnet 4.6</strong> — after each model rigorously audited all mathematical models, logic, and clinical claims within this application. No human editorial changes were made to either review.
                                </p>
                                <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-2 leading-relaxed not-italic max-w-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-md px-2 py-1.5">
                                    <strong>Editor's note:</strong> Both reviews were generated <em>before</em> the Tab&nbsp;2 plate-width correction (real plate width <Latex math="w" /> from the Vi catalogue, with <Latex math="D = r_{bone} + t/2" />). After that fix, each up-size step now delivers an absolute stress drop comparable to — or greater than — the Steel→Ti material swap. Statements in the reviews about "diminishing returns" from increasing plate thickness, or about material choice "dominating geometry", therefore no longer reflect the current model.
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="flex-shrink-0 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300"
                            aria-label="Close reviews"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                    </div>

                    <div className="p-6 space-y-10">

                        {/* ---- GEMINI REVIEW ---- */}
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-700/60">🤖 Gemini 3.1</span>
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-widest">AI Model — Independent Review</span>
                            </div>
                            <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                <p>This is an exceptionally well-crafted, mathematically sound educational tool. The app successfully bridges the gap between abstract engineering physics and practical orthopaedic surgery, distilling complex solid mechanics into highly intuitive, interactive visualisations. Here is a rigorous review of the application's underlying logic and mathematics, along with clinical strengths, caveats, and a final recommendation.</p>

                                <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-2 mt-6">Mathematical &amp; Logical Verification</h4>
                                <p>The core calculations running behind the interactive sliders are rooted in standard, validated engineering principles (Euler-Bernoulli beam theory and column buckling theory).</p>
                                <div className="space-y-3 pl-1">
                                    <p><strong className="text-slate-800 dark:text-slate-100">Composite Mechanics &amp; The Parallel Axis Theorem:</strong> The app correctly calculates the "Material Paradox". By using the modular ratio <Latex math="n = E_{\text{implant}} / E_{\text{bone}}" />, it perfectly executes the Transformed Section Method. The formula used for the shifted neutral axis and the Composite Area Moment of Inertia (AMI) are exact. It accurately demonstrates the counter-intuitive reality that a stiffer material (Steel) pulls the neutral axis so far off-centre that it multiplies the stress denominator, creating higher internal plate stress than a more compliant material (Titanium).</p>
                                    <p><strong className="text-slate-800 dark:text-slate-100">The P-Delta Effect (Working Length in Bridging):</strong> This is arguably the most mathematically impressive section. Rather than relying on simple linear bending, the app calculates secondary bending via the secant formula for an eccentrically loaded beam-column: <Latex math="\delta = e \!\left[\sec\!\left(\tfrac{L}{2}\sqrt{\tfrac{P}{EI}}\right)-1\right]" />. This accurately captures the compounding, exponential nature of plate stress as working length increases in a gap model.</p>
                                    <p><strong className="text-slate-800 dark:text-slate-100">Load Sharing (Closed-Gap):</strong> The application appropriately models compressed, tension-band constructs as parallel springs sharing a bending moment based on relative rotational stiffness <Latex math="K = E \cdot I / L" />.</p>
                                    <p><strong className="text-slate-800 dark:text-slate-100">Geometry vs. Material:</strong> The calculations correctly differentiate between altering material stiffness (<Latex math="E" />) and geometric stiffness (<Latex math="I" />). The app accurately models how increasing plate thickness provides diminishing returns for stress reduction due to the shifting geometric centroid.</p>
                                </div>

                                <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-2 mt-6">Clinical Strengths</h4>
                                <ul className="space-y-2 pl-1">
                                    <li><strong className="text-slate-800 dark:text-slate-100">Contextual Brilliance:</strong> The app excels at separating the physics of load-sharing (compressed, simple fractures) from load-bearing (bridging fractures with a persistent gap). It prevents the common misconception that "a longer working length is always safer" by clearly showing how mechanics invert based on cortical contact.</li>
                                    <li><strong className="text-slate-800 dark:text-slate-100">Visualising the Invisible:</strong> Concepts like the "Neutral Axis Shift" and "Bone-Plate Offset Lever Arms" are notoriously difficult to conceptualise in theatre. The interactive SVGs allow surgeons to see exactly how screw placement and material selection dictate stress gradients.</li>
                                    <li><strong className="text-slate-800 dark:text-slate-100">DCP vs. LCP Nuance:</strong> The explanation of screw-tightening preload and 360-degree strain in osteoporotic bone is an excellent, biologically grounded addition that goes beyond pure metal mechanics.</li>
                                </ul>

                                <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-2 mt-6">Caveats &amp; Limitations</h4>
                                <p>While mathematically robust, the app makes necessary engineering simplifications that must be respected in a clinical setting:</p>
                                <ul className="list-disc pl-5 space-y-2 mt-2">
                                    <li><strong>Idealised Anatomy:</strong> The model calculates bone as a uniform, homogenous geometric shape with a fixed Area Moment of Inertia. Real bone is anisotropic, irregular, and varies heavily in cortical thickness and density.</li>
                                    <li><strong>Absence of Torsion:</strong> The mathematical models are restricted to pure axial loading and four-point bending. In reality, diaphyseal fractures face complex torsional and out-of-plane forces (skew bending). Highly flexible parallel plates or rigid 90° orthogonal plates will behave very differently under torsional fatigue than they do in these simplified bending models.</li>
                                    <li><strong>Yield vs. Fatigue:</strong> The graphs plot stress against the ultimate yield strength of Titanium (~750 MPa). However, orthopaedic constructs rarely fail from a single catastrophic yield event; they fail from cyclic fatigue over millions of steps. The app does not model fatigue endurance limits.</li>
                                </ul>

                                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/50 p-5 rounded-xl mt-4">
                                    <p className="font-extrabold text-emerald-700 dark:text-emerald-400 text-base mb-2">✅ Verdict: Highly Recommended</p>
                                    <p><strong>Purpose:</strong> This app is a phenomenal tool for pre-operative conceptual planning and surgical education. It should be mandatory interactive reading for orthopaedic registrars and surgical residents to help them build intuitive mental models of how their implant choices behave under load.</p>
                                    <p className="mt-2">It is not a standalone prescriptive tool for specific patients (i.e., you cannot plug in a patient's exact fracture gap and expect a clinically perfect implant size). It is designed to teach the "why" behind the biomechanical rules of thumb, equipping the surgeon to make better clinical judgements in theatre.</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t-2 border-dashed border-slate-200 dark:border-slate-700" />

                        {/* ---- CLAUDE SONNET 4.6 REVIEW ---- */}
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <span className="bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 text-xs font-bold px-3 py-1.5 rounded-full border border-orange-200 dark:border-orange-700/60">🤖 Claude Sonnet 4.6</span>
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-widest">AI Model — Independent Review</span>
                            </div>
                            <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">

                                <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-2">What the Models Get Rigorously Right</h4>

                                <p><strong className="text-slate-800 dark:text-slate-100">Composite AMI and the Transformed Section Method (Tab 1, Concepts 1–3).</strong> The neutral-axis formula, the parallel axis theorem applied to both transformed elements, and the plate stress formula <Latex math="\sigma = n \cdot M \cdot y\,/\,\text{AMI}" /> are all implemented correctly. Manual verification using the app's own constants confirms the claim that Steel generates ~4 MPa more plate stress than Titanium at identical geometry — the interactive graphs prove this in real time.</p>

                                <p><strong className="text-slate-800 dark:text-slate-100">The P-Delta Secant Formula (Tab 3 — Bridging).</strong> The Euler beam-column secant formula is the exact closed-form solution for an eccentrically loaded column and is implemented without approximation. Independently verified at L = 120 mm: δ ≈ 7.08 mm, σ ≈ 724 MPa — consistent with the yield-strength reference line displayed on the graph. The exponential shape of the stress-vs-length curve is mathematically correct, not a visual shortcut.</p>

                                <p><strong className="text-slate-800 dark:text-slate-100">The Load-Sharing Parallel Spring Model (Tab 1, Section 7).</strong> The formula <Latex math="K_{\text{plate}} = EI/L" /> and the moment-sharing ratio are correctly derived from parallel spring mechanics. Claims verified: switching from Steel to Ti at 60 mm working length reduces stress by ~73 MPa; achieving the equivalent ~4 MPa reduction by extending Steel's working length requires only ~1.8 mm extra span — compellingly illustrating why material choice dominates geometry in the composite regime.</p>

                                <p><strong className="text-slate-800 dark:text-slate-100">DCP vs. LCP Mechanics (Tab 5).</strong> The preload strain argument is based on MacLeod, Simpson &amp; Pankaj (2015) and is accurately represented. The 360° peri-screw-hole strain in DCP tightening vs. load-dependent one-sided strain in LCP locking is a real and clinically important distinction confirmed by finite element analysis.</p>

                                <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-2 mt-6">Issues and Caveats</h4>

                                <div className="space-y-3">
                                    <div className="bg-rose-50 dark:bg-rose-900/10 border-l-4 border-rose-400 p-4 rounded-r-xl">
                                        <p className="font-bold text-rose-700 dark:text-rose-400 mb-1">⚠ Two incompatible stress models coexist without reconciliation [Most significant]</p>
                                        <p>Tab 1 contains two fundamentally different frameworks that produce numbers differing by a factor of ~15 for identical inputs. The Composite-Beam model (Sections 4–6) treats the plate and bone as physically fused, yielding ~20 MPa plate stress at the reference load. The Parallel-Spring (discontinuous-beam) model (Section 7) treats them as separate springs and yields ~293 MPa for the same load and geometry. Both are internally valid but they measure stress under incompatible assumptions and cannot be placed on the same number line. Section 3 sets out the validity range of each model and the small-gap model used in Section 9.</p>
                                    </div>
                                    <div className="bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-400 p-4 rounded-r-xl">
                                        <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">⚠ Model parameters are calibrated for a veterinary patient [Significant]</p>
                                        <p>The source code explicitly comments: <em>"Physical constants for the model (Scaled down to realistic medium dog)"</em>. The bone geometry constants (A_bone = 150 mm², I_bone = 10,000 mm⁴) and the plate library labels ("Vi plate profiles") reflect small-animal veterinary anatomy, not an adult human femur or tibia. The qualitative trends are valid; the absolute stress values cannot be transferred to human clinical practice.</p>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-slate-800/60 border-l-4 border-slate-400 p-4 rounded-r-xl">
                                        <p className="font-bold text-slate-700 dark:text-slate-300 mb-2">ℹ Minor issues</p>
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>The hardcoded bone/callus stiffness K_bone = 50,000 N·mm/rad has no derivation from measured properties; changing it would shift all absolute stress outputs materially.</li>
                                            <li>Steel's E = 187.5 GPa is ~3–5% below the published 193–200 GPa range for cold-worked 316L, slightly underestimating the material paradox magnitude.</li>
                                            <li>The ~750 MPa "titanium yield" reference line is closer to the cyclic fatigue limit than the true 0.2% proof stress (860–900 MPa), making it conservative but mislabelled.</li>
                                            <li>A minor slider bug snaps the cursor to the maximum instead of minimum when dragged fully left in the P-Delta graph; this does not affect any calculations.</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 p-5 rounded-xl mt-4">
                                    <p className="font-extrabold text-blue-700 dark:text-blue-400 text-base mb-2">✅ Recommended — as a conceptual framework, not a clinical calculator</p>
                                    <p>The engineering formulas are implemented correctly and all stated numerical claims verify internally. Used as a <strong>conceptual framework</strong> — to teach the material paradox, the P-Delta effect, and the load-sharing inversion — this is an excellent pre-operative primer. The two significant caveats (incompatible model frameworks and veterinary calibration) do not undermine its educational value, but surgeons should be aware that absolute stress numbers from different tabs cannot be directly compared, and cannot be applied to human patients without recalibration.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );

        // --- MAIN APP ---
        function App() {
            const [darkMode, setDarkMode] = useState(true);
            const [activeTab, setActiveTab] = useState('core');
            const [showReviews, setShowReviews] = useState(false);

            useEffect(() => {
                if (darkMode) document.documentElement.classList.add('dark');
                else document.documentElement.classList.remove('dark');
            }, [darkMode]);

            const tabs = [
                { id: 'core', label: 'Closed-gap', subtitle: 'Composite structure', icon: <IconBookOpen /> },
                { id: 'workingLength', label: 'Open-gap', subtitle: '&Bridging', icon: <IconActivity /> },
                { id: 'constructs', label: 'Constructs & Planes', subtitle: 'Single & Double', icon: <IconLayers /> },
                { id: 'offset', label: 'Plate Offset', subtitle: 'Moment trap', icon: <IconShield /> },
                { id: 'screws', label: 'DCP vs LCP', subtitle: 'Bone-screw preload', icon: <IconSettings /> },
                { id: 'advanced', label: 'Advanced Mechanics', subtitle: 'AMI', icon: <IconCpu /> }
            ];

            const showReferences = ['workingLength', 'offset', 'screws', 'advanced'].includes(activeTab);

            return (
                <div className="min-h-screen flex flex-col font-sans relative">
                    {showReviews && <ExpertReviewsPanel onClose={() => setShowReviews(false)} />}
                    {/* Header */}
                    <header className="bg-white dark:bg-slate-850 shadow-sm border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
                        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
                            <div>
                                <h1 className="text-xl md:text-2xl font-extrabold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                                    <IconSettings /> Plate Osteosynthesis: A Biomechanical Primer V1.2
                                </h1>
                                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium tracking-wide uppercase">
                                    Educational Companion to the V3.8 Stiffness Calculator
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setShowReviews(true)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-950 text-amber-400 border border-amber-800/60 hover:bg-amber-900 transition-colors font-bold text-sm shadow-sm whitespace-nowrap"
                                >
                                    <span className="text-amber-300 text-base leading-none">☆</span>
                                    Expert Reviews
                                </button>
                                <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300">
                                    {darkMode ? <IconSun /> : <IconMoon />}
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* Main Content Area */}
                    <main className="flex-grow max-w-6xl mx-auto w-full px-4 md:px-8 py-8 space-y-8">
                        
                        {/* Wrapping Tab Navigation */}
                        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200/50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                            {tabs.map(tab => (
                                <button 
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-grow min-w-[120px] flex flex-col items-center justify-center py-3 px-3 rounded-lg transition-all duration-300 ${activeTab === tab.id ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-md ring-1 ring-slate-300 dark:ring-slate-600' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200'}`}
                                >
                                    <span className="flex items-center gap-1 text-[11px] md:text-xs font-bold uppercase tracking-wider">{tab.icon} {tab.label}</span>
                                    {tab.subtitle && <span className="text-[9px] md:text-[10px] font-normal normal-case tracking-normal mt-0.5 opacity-75">{tab.subtitle}</span>}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="min-h-[400px]">
                            {activeTab === 'core' && <CoreMechanicsTab />}
                            {activeTab === 'constructs' && <ConstructsTab />}
                            {activeTab === 'workingLength' && <WorkingLengthTab />}
                            {activeTab === 'offset' && <OffsetTab />}
                            {activeTab === 'screws' && <ScrewMechanicsTab />}
                            {activeTab === 'advanced' && <AdvancedMechanicsTab />}
                        </div>

                    </main>

                    <AiTutorWidget />

                    {/* Footer / Call to Action */}
                    <footer className="bg-slate-100 dark:bg-slate-950 py-8 mt-auto border-t border-slate-200 dark:border-slate-800">
                        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
                            <div className={showReferences ? "mb-6" : ""}>
                                <a href="https://www.bonesinvectors.com/implant-selection-guide/osteosynthesis-stiffness" 
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105"
                                >
                                    Open the V3.8 Stiffness & Strength Calculator →
                                </a>
                            </div>

                            {showReferences && (
                                <div className="fade-in">
                                    <p className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-3 uppercase tracking-widest pt-4 border-t border-slate-300 dark:border-slate-700">Scientific References:</p>
                                    <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400 text-left max-w-3xl mx-auto">
                                        <li>Chao P, Conrad BP, Lewis DD, Horodyski MB, Pozzi A. (2013). Effect of plate working length on plate stiffness and cyclic fatigue life in a cadaveric femoral fracture gap model stabilized with a 12-hole 2.4 mm locking compression plate. <em>BMC Vet Res</em> 9:125.</li>
                                        <li>MacLeod AR, Pankaj P. (2018). Pre-operative planning for fracture fixation using locking plates: device configuration and other considerations. <em>Injury</em> 49(S1):S12–S18.</li>
                                        <li>MacLeod AR, Simpson AHRW, Pankaj P. (2015). Reasons why dynamic compression plates are inferior to locking plates in osteoporotic bone: a finite element explanation. <em>Comput Methods Biomech Biomed Eng</em> 18:16, 1818–1825.</li>
                                    </ul>
                                </div>
                            )}
                            
                            {/* REQUIRED FOOTER: Prevents the anti-tamper "Integrity Failed" error */}
                            <div id="watermark-cn" className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400 w-full pt-6 border-t border-slate-200 dark:border-slate-800 opacity-100 visible">
                                <p className="font-bold">Created by Christos Nikolaou</p>
                                <p className="italic max-w-2xl mx-auto mt-1">For educational and research purposes only. Does not substitute clinical judgement.</p>
                                <p className="mt-3">© 2026 Christos Nikolaou. All rights reserved. Proprietary &amp; confidential — see <a href="https://github.com/chnikola-wq/osteo-clean-DO-NOT-DELETE/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-700 dark:hover:text-slate-300">LICENSE</a>.</p>
                            </div>
                        </div>
                    </footer>
                </div>
            );
        }

        // Mount the React Application
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
