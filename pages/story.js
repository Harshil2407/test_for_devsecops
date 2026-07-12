/* ==========================================================================
   SECUREOPS // 10-Point Performance Optimized 3D Cinematic Engine (`pages/story.js`)
   ========================================================================== */

function renderStoryPage(containerEl) {
    if (!containerEl) return;

    // Detect initial prefers-reduced-motion setting
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!window.SECUREOPS_QUALITY_MODE) {
        window.SECUREOPS_QUALITY_MODE = prefersReduced ? 'Lite' : 'Cinematic';
    }

    // Inject Virtual Track, Fixed 3D World Stage, Adaptive HUD, and Telemetry Overlay
    containerEl.innerHTML = `
        <!-- Virtual Scroll Track (14,000px depth) -->
        <div id="story-scroll-track"></div>

        <!-- Ambient Volumetric Fog & Lighting -->
        <div id="volumetric-fog"></div>

        <!-- Top-Left Adaptive Quality Mode HUD -->
        <div id="quality-mode-hud" onclick="cycleQualityMode()" title="Click to cycle Performance Modes">
            <div class="quality-indicator-dot ${window.SECUREOPS_QUALITY_MODE.toLowerCase()}" id="quality-hud-dot"></div>
            <span id="quality-hud-text">⚡ Quality: ${window.SECUREOPS_QUALITY_MODE} Mode</span>
        </div>

        <!-- Hidden Developer Performance Telemetry Overlay (Ctrl + Shift + D) -->
        <div id="dev-perf-overlay">
            <div class="flex-between" style="border-bottom: 1px solid var(--primary-cyan); padding-bottom: 8px; margin-bottom: 10px;">
                <strong style="color: var(--primary-cyan); font-size: 0.85rem;">🛠️ DEV PERFORMANCE TELEMETRY</strong>
                <span style="font-size: 0.72rem; color: var(--text-muted);">[CTRL+SHIFT+D]</span>
            </div>
            <div class="dev-perf-row">
                <span class="dev-perf-label">Engine FPS:</span>
                <span class="dev-perf-val" id="telemetry-fps">60.0 fps (Smooth 🟢)</span>
            </div>
            <div class="dev-perf-row">
                <span class="dev-perf-label">Frame Time:</span>
                <span class="dev-perf-val" id="telemetry-frametime">16.6 ms</span>
            </div>
            <div class="dev-perf-row">
                <span class="dev-perf-label">Active Scene:</span>
                <span class="dev-perf-val" id="telemetry-scene">01 // Cyber Terminal</span>
            </div>
            <div class="dev-perf-row">
                <span class="dev-perf-label">DOM Nodes:</span>
                <span class="dev-perf-val" id="telemetry-nodes">142 nodes (Virtualized 🟢)</span>
            </div>
            <div class="dev-perf-row">
                <span class="dev-perf-label">Camera Depth Z:</span>
                <span class="dev-perf-val" id="telemetry-camz">0 px</span>
            </div>
            <div class="dev-perf-row">
                <span class="dev-perf-label">Quality Mode:</span>
                <span class="dev-perf-val" id="telemetry-mode">${window.SECUREOPS_QUALITY_MODE} Mode</span>
            </div>
            <div class="dev-perf-row">
                <span class="dev-perf-label">Animation Budget:</span>
                <span class="dev-perf-val" id="telemetry-budget">3 / 3 Max Active 🟢</span>
            </div>
        </div>

        <!-- Right-Side HUD Cinematic Depth Indicator -->
        <div class="hud-tracker" id="cinematic-hud">
            <div class="hud-step active" data-z="0" onclick="scrollToDepth(0)">
                <div class="hud-step-tooltip">01 // Cyber Terminal</div>
            </div>
            <div class="hud-step" data-z="2600" onclick="scrollToDepth(2600)">
                <div class="hud-step-tooltip">02 // Kinetic Intro</div>
            </div>
            <div class="hud-step" data-z="5600" onclick="scrollToDepth(5600)">
                <div class="hud-step-tooltip">03 // Digital Ecosystem</div>
            </div>
            <div class="hud-step" data-z="8000" onclick="scrollToDepth(8000)">
                <div class="hud-step-tooltip">04 // Threat Intrusion</div>
            </div>
            <div class="hud-step" data-z="10400" onclick="scrollToDepth(10400)">
                <div class="hud-step-tooltip">05 // Blue Energy Wave</div>
            </div>
            <div class="hud-step" data-z="13000" onclick="scrollToDepth(13000)">
                <div class="hud-step-tooltip">06 // Enter Platform</div>
            </div>
        </div>

        <!-- Fixed 3D Cinematic World Stage -->
        <div id="cinematic-world-stage">
            <div id="camera-rig">
                <!-- ==========================================
                     SCENE 1 // CYBER TERMINAL (@ Z = -500px)
                     ========================================== -->
                <div class="world-scene-group scene-1-group" id="group-scene-1" data-depth="500">
                    <div class="story-terminal-window" id="cinematic-terminal-el">
                        <div class="terminal-topbar">
                            <div style="display: flex; gap: 8px;">
                                <div class="terminal-dot red"></div>
                                <div class="terminal-dot yellow"></div>
                                <div class="terminal-dot green"></div>
                            </div>
                            <span style="font-family: var(--font-mono); font-size: 0.85rem; color: #94A3B8;">secureops-kernel@zero-trust-runtime:~</span>
                            <div style="width: 50px;"></div>
                        </div>
                        <div class="terminal-body" id="cinematic-terminal-output">
                            <!-- Character by character typing injected here -->
                        </div>
                    </div>
                    <div style="position: absolute; top: 320px; font-family: var(--font-mono); font-size: 0.85rem; color: var(--primary-cyan); letter-spacing: 0.18em; text-transform: uppercase;">
                        ▼ Scroll down to direct Scene 02 ▼
                    </div>
                </div>

                <!-- ==========================================
                     SCENE 2 // FLOATING CODE & KINETIC TYPOGRAPHY (@ Z = -3400px)
                     ========================================== -->
                <div class="world-scene-group scene-2-group" id="group-scene-2" data-depth="3400">
                    <div class="floating-card-3d" style="top: -240px; left: -460px; transform: translateZ(-200px);">
                        <span style="font-size: 1.8rem;">📦</span>
                        <div>
                            <strong style="color: #FFF; font-size: 0.95rem;">Git Commit #8f92a</strong>
                            <div style="font-size: 0.78rem; color: var(--text-muted);">Author: Sarah Jenkins // Security Guardrail Pass</div>
                        </div>
                    </div>
                    <div class="floating-card-3d" style="top: 180px; left: 340px; transform: translateZ(-500px);">
                        <span style="font-size: 1.8rem;">🐳</span>
                        <div>
                            <strong style="color: var(--primary-cyan); font-size: 0.95rem;">Immutable Container</strong>
                            <div style="font-size: 0.78rem; color: var(--text-muted);">sha256:49102b1c // Signed & Verified</div>
                        </div>
                    </div>

                    <div class="kinetic-sentence-3d" id="kin-sent-1" style="transform: translateZ(800px);">
                        EVERY COMMIT MATTERS
                    </div>
                    <div class="kinetic-sentence-3d" id="kin-sent-2" style="transform: translateZ(0px);">
                        EVERY BUILD MATTERS
                    </div>
                    <div class="kinetic-sentence-3d" id="kin-sent-3" style="transform: translateZ(-800px); background: linear-gradient(135deg, #FF2E63 0%, #00F0FF 50%, #8A2BE2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                        EVERY DEPLOYMENT MATTERS
                    </div>
                </div>

                <!-- ==========================================
                     SCENE 3 // DIGITAL ECOSYSTEM & PACKETS (@ Z = -6200px)
                     ========================================== -->
                <div class="world-scene-group scene-3-group" id="group-scene-3" data-depth="6200">
                    <!-- Lazy-Initialized SVG Network Rings will be dynamically mounted here when approached -->
                    <div id="scene-3-lazy-container" style="position: absolute; inset: 0;"></div>

                    <div class="floating-card-3d" style="top: -240px; left: -380px;">
                        <span style="font-size: 2rem;">🗄️</span>
                        <div>
                            <strong style="color: #FFF; font-size: 1.05rem;">MongoDB Clusters</strong>
                            <div style="font-size: 0.8rem; color: var(--text-muted);">Encrypted at Rest // Multi-Region</div>
                        </div>
                    </div>
                    <div class="floating-card-3d" style="top: -240px; left: 240px;">
                        <span style="font-size: 2rem;">⚡</span>
                        <div>
                            <strong style="color: var(--neon-green); font-size: 1.05rem;">FastAPI Services</strong>
                            <div style="font-size: 0.8rem; color: var(--text-muted);">Zero-Latency Async Routing</div>
                        </div>
                    </div>
                    <div class="floating-card-3d" style="top: 140px; left: -420px;">
                        <span style="font-size: 2rem;">🛡️</span>
                        <div>
                            <strong style="color: var(--primary-cyan); font-size: 1.05rem;">Guardrail Engine</strong>
                            <div style="font-size: 0.8rem; color: var(--text-muted);">124 Active Policies Enforced</div>
                        </div>
                    </div>
                    <div class="floating-card-3d" style="top: 140px; left: 260px;">
                        <span style="font-size: 2rem;">☁️</span>
                        <div>
                            <strong style="color: #FFF; font-size: 1.05rem;">Cloud Infrastructure</strong>
                            <div style="font-size: 0.8rem; color: var(--text-muted);">Zero-Trust K8s Service Mesh</div>
                        </div>
                    </div>

                    <div class="floating-card-3d" style="border-color: var(--primary-cyan); transform: scale(1.15);">
                        <span style="font-size: 2.5rem;">🛡️</span>
                        <div>
                            <strong style="color: #FFF; font-size: 1.2rem;">Interconnected Core</strong>
                            <div style="font-size: 0.85rem; color: var(--primary-cyan);">Continuous Autonomous Inspection</div>
                        </div>
                    </div>
                </div>

                <!-- ==========================================
                     SCENE 4 // THREAT INTRUSION & FREEZE (@ Z = -8500px)
                     ========================================== -->
                <div class="world-scene-group scene-4-group" id="group-scene-4" data-depth="8500">
                    <div style="position: absolute; top: -280px; text-align: center; width: 800px; margin-left: -400px;">
                        <span class="badge badge-danger" style="letter-spacing: 0.15em;">THREAT INTRUSION DETECTED</span>
                        <h2 style="font-family: var(--font-heading); font-size: 2.8rem; font-weight: 800; color: #FFF; margin-top: 12px;">
                            One vulnerability can stop everything.
                        </h2>
                    </div>

                    <div class="threat-alert-box-3d" id="ta-box-1" style="top: -80px; left: -420px; transform: translateZ(100px);">
                        <span style="font-size: 1.8rem;">🚨</span>
                        <div>
                            <strong style="color: #FFF; font-size: 1.02rem;">[ALERT] Hardcoded Secrets Detected</strong>
                            <div style="font-size: 0.8rem; color: rgba(255,255,255,0.7);">Stripe API Key inside /config/settings.py</div>
                        </div>
                    </div>
                    <div class="threat-alert-box-3d" id="ta-box-2" style="top: -80px; left: 140px; transform: translateZ(-100px);">
                        <span style="font-size: 1.8rem;">⚠️</span>
                        <div>
                            <strong style="color: #FFF; font-size: 1.02rem;">[CRITICAL] CVE-2026-9182 Active</strong>
                            <div style="font-size: 0.8rem; color: rgba(255,255,255,0.7);">Debian base image has unpatched OpenSSL</div>
                        </div>
                    </div>
                    <div class="threat-alert-box-3d" id="ta-box-3" style="top: 80px; left: -320px; transform: translateZ(-250px);">
                        <span style="font-size: 1.8rem;">🔥</span>
                        <div>
                            <strong style="color: #FFF; font-size: 1.02rem;">[DANGER] SQL Injection Vector</strong>
                            <div style="font-size: 0.8rem; color: rgba(255,255,255,0.7);">Unsanitized query in auth_router.py</div>
                        </div>
                    </div>
                    <div class="threat-alert-box-3d" id="ta-box-4" style="top: 80px; left: 80px; transform: translateZ(200px);">
                        <span style="font-size: 1.8rem;">🔓</span>
                        <div>
                            <strong style="color: #FFF; font-size: 1.02rem;">[WARNING] Root Container Privilege</strong>
                            <div style="font-size: 0.8rem; color: rgba(255,255,255,0.7);">Pod running without non-root USER flag</div>
                        </div>
                    </div>
                </div>

                <!-- ==========================================
                     SCENE 5 // BLUE ENERGY WAVE & SCORE (@ Z = -10800px)
                     ========================================== -->
                <div class="world-scene-group scene-5-group" id="group-scene-5" data-depth="10800">
                    <div class="blue-energy-wave" id="wave-sweep-el"></div>

                    <div style="text-align: center; z-index: 20;">
                        <span class="badge badge-secure" id="scene-5-status-badge" style="letter-spacing: 0.15em; margin-bottom: 20px;">
                            AUTONOMOUS DEFENSE ACTIVE
                        </span>
                        <div style="font-size: 0.9rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.15em;">
                            Real-Time Zero-Trust Security Score
                        </div>
                        <div class="security-score-3d" id="cinematic-score-el">42</div>

                        <div style="margin-top: 32px; display: flex; flex-direction: column; gap: 8px;">
                            <div style="font-family: var(--font-heading); font-size: clamp(1.8rem, 3.8vw, 2.6rem); font-weight: 800; color: #FFF;">Secure Every Commit.</div>
                            <div style="font-family: var(--font-heading); font-size: clamp(1.8rem, 3.8vw, 2.6rem); font-weight: 800; color: var(--primary-cyan);">Protect Every Container.</div>
                            <div style="font-family: var(--font-heading); font-size: clamp(1.8rem, 3.8vw, 2.6rem); font-weight: 800; color: var(--neon-green);">Deploy With Confidence.</div>
                        </div>
                    </div>
                </div>

                <!-- ==========================================
                     SCENE 6 // ORBITING LOGO & PLATFORM ENTRY (@ Z = -13000px)
                     ========================================== -->
                <div class="world-scene-group scene-6-group" id="group-scene-6" data-depth="13000">
                    <div class="orbit-3d-box" id="scene-6-orbit-box">
                        <!-- Lazy-Initialized Orbit Rings mounted here when approached -->
                        <div class="cinematic-logo-3d" id="logo-assembly-el">
                            SECUREOPS
                        </div>
                    </div>

                    <div style="position: absolute; top: 90px; text-align: center; width: 800px; margin-left: -400px; font-family: var(--font-heading); font-size: 1.8rem; font-weight: 700; color: #FFF;">
                        AI Powered DevSecOps Management Platform
                    </div>

                    <button type="button" class="btn-enter-platform-3d" onclick="enterDashboardCinematic()">
                        <span>⚡ ENTER PLATFORM</span>
                        <span style="font-size: 1.2rem;">→</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    // ==========================================
    // CACHED DOM REFERENCES & TELEMETRY ENGINE
    // ==========================================
    const DOM = {
        track: document.getElementById('story-scroll-track'),
        rig: document.getElementById('camera-rig'),
        fog: document.getElementById('volumetric-fog'),
        terminalEl: document.getElementById('cinematic-terminal-el'),
        terminalOutput: document.getElementById('cinematic-terminal-output'),
        hudSteps: document.querySelectorAll('#cinematic-hud .hud-step'),
        scenes: Array.from(containerEl.querySelectorAll('.world-scene-group')),
        kinetics: [document.getElementById('kin-sent-1'), document.getElementById('kin-sent-2'), document.getElementById('kin-sent-3')],
        threats: [document.getElementById('ta-box-1'), document.getElementById('ta-box-2'), document.getElementById('ta-box-3'), document.getElementById('ta-box-4')],
        wave: document.getElementById('wave-sweep-el'),
        score: document.getElementById('cinematic-score-el'),
        badge: document.getElementById('scene-5-status-badge'),
        logo: document.getElementById('logo-assembly-el'),
        qualityDot: document.getElementById('quality-hud-dot'),
        qualityText: document.getElementById('quality-hud-text'),
        lazyScene3: document.getElementById('scene-3-lazy-container'),
        lazyScene6: document.getElementById('scene-6-orbit-box'),
        telemetry: {
            overlay: document.getElementById('dev-perf-overlay'),
            fps: document.getElementById('telemetry-fps'),
            frametime: document.getElementById('telemetry-frametime'),
            scene: document.getElementById('telemetry-scene'),
            nodes: document.getElementById('telemetry-nodes'),
            camz: document.getElementById('telemetry-camz'),
            mode: document.getElementById('telemetry-mode')
        }
    };

    // Toggle Quality Mode manually via HUD button
    window.cycleQualityMode = () => {
        const modes = ['Cinematic', 'Balanced', 'Lite'];
        const currentIdx = modes.indexOf(window.SECUREOPS_QUALITY_MODE || 'Cinematic');
        const nextMode = modes[(currentIdx + 1) % modes.length];
        window.SECUREOPS_QUALITY_MODE = nextMode;

        if (DOM.qualityDot && DOM.qualityText) {
            DOM.qualityDot.className = `quality-indicator-dot ${nextMode.toLowerCase()}`;
            DOM.qualityText.textContent = `⚡ Quality: ${nextMode} Mode`;
        }
        if (DOM.telemetry.mode) DOM.telemetry.mode.textContent = `${nextMode} Mode (Manual)`;
    };

    // Keyboard shortcut (Ctrl + Shift + D) to reveal developer performance telemetry overlay
    const handleKeydown = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
            e.preventDefault();
            if (DOM.telemetry.overlay) {
                DOM.telemetry.overlay.classList.toggle('dev-perf-visible');
            }
        }
    };
    window.removeEventListener('keydown', window._secureopsPerfKeydown);
    window._secureopsPerfKeydown = handleKeydown;
    window.addEventListener('keydown', handleKeydown);

    // Helper: Scroll directly to virtual Z depth
    window.scrollToDepth = (targetZ) => {
        if (!DOM.track) return;
        const maxScroll = Math.max(DOM.track.offsetHeight - window.innerHeight, 1);
        const progress = Math.min(Math.max(targetZ / 13000, 0), 1);
        window.scrollTo({
            top: progress * maxScroll,
            behavior: 'smooth'
        });
    };

    // ==========================================
    // 1. SCENE 1 TYPING SIMULATOR (Scroll-Decoupled & Throttled)
    // ==========================================
    let terminalStarted = false;
    const runTerminalTyping = () => {
        if (terminalStarted || !DOM.terminalOutput) return;
        terminalStarted = true;
        const lines = [
            "> SecureOps",
            "> Initializing...",
            "> Loading Security Engine...",
            "> Verifying Zero Trust Policies...",
            "> Connecting CI/CD Infrastructure...",
            "> AI Threat Detection Online"
        ];
        let lineIdx = 0, charIdx = 0;
        let activeTextSpan = null;

        const typeChar = () => {
            if (lineIdx >= lines.length || !DOM.terminalOutput) return;

            // 1. If camera has scrolled past Scene 1, pause typing to save CPU cycles
            if (currentCamZ > 1400) {
                setTimeout(typeChar, 400);
                return;
            }

            // 2. If camera is currently in active scroll motion, defer DOM text update to maintain 60 FPS
            if (Math.abs(currentCamZ - lastCamZ) > 1.2 && window.SECUREOPS_QUALITY_MODE !== 'Cinematic') {
                setTimeout(typeChar, 35);
                return;
            }

            if (charIdx === 0) {
                const lineDiv = document.createElement('div');
                lineDiv.className = 'terminal-line visible';
                lineDiv.id = `term-l-${lineIdx}`;
                const promptSpan = document.createElement('span');
                promptSpan.className = 'terminal-prompt';
                promptSpan.textContent = '[$] ';
                activeTextSpan = document.createElement('span');
                activeTextSpan.className = 'terminal-text';
                activeTextSpan.id = `term-t-${lineIdx}`;
                lineDiv.appendChild(promptSpan);
                lineDiv.appendChild(activeTextSpan);
                DOM.terminalOutput.appendChild(lineDiv);
            }

            if (activeTextSpan) {
                activeTextSpan.textContent += lines[lineIdx].charAt(charIdx);
            }
            charIdx++;

            if (charIdx < lines[lineIdx].length) {
                // Slower, calmer typing pace (~10 chars/sec) to avoid layout flooding
                setTimeout(typeChar, 80 + Math.random() * 45);
            } else {
                charIdx = 0;
                lineIdx++;
                activeTextSpan = null;
                setTimeout(typeChar, 550);
            }
        };
        typeChar();
    };
    setTimeout(runTerminalTyping, 350);

    // ==========================================
    // 2. LAZY-INITIALIZATION & ASSET OFFLOADING
    // ==========================================
    let scene3LazyMounted = false;
    let scene6LazyMounted = false;

    const checkLazyMounts = (camZ) => {
        // Scene 3 SVG Network Ring (Lazy mount when dist < 3400)
        const distScene3 = Math.abs(camZ - 6200);
        if (distScene3 < 3400 && !scene3LazyMounted && DOM.lazyScene3) {
            scene3LazyMounted = true;
            DOM.lazyScene3.innerHTML = `
                <svg class="svg-network-ring" viewBox="0 0 1100 550">
                    <path d="M 200,120 L 550,275 L 900,120" class="network-wire" />
                    <path d="M 200,430 L 550,275 L 900,430" class="network-wire" />
                    <path d="M 550,275 L 550,50" class="network-wire" />
                    <circle cx="0" cy="0" r="7" class="wire-packet"><animateMotion path="M 200,120 L 550,275 L 900,120" dur="2.8s" repeatCount="indefinite" /></circle>
                    <circle cx="0" cy="0" r="7" class="wire-packet" style="fill: #00F59B;"><animateMotion path="M 900,430 L 550,275 L 200,430" dur="3.4s" repeatCount="indefinite" /></circle>
                </svg>
            `;
        } else if (distScene3 >= 3600 && scene3LazyMounted && DOM.lazyScene3) {
            scene3LazyMounted = false;
            DOM.lazyScene3.innerHTML = '';
        }

        // Scene 6 Orbit Rings (Lazy mount when dist < 3400)
        const distScene6 = Math.abs(camZ - 13000);
        if (distScene6 < 3400 && !scene6LazyMounted && DOM.lazyScene6) {
            scene6LazyMounted = true;
            const ring1 = document.createElement('div');
            ring1.className = 'orbit-ring-3d orbit-ring-3d-1';
            ring1.id = 'lazy-ring-1';
            const ring2 = document.createElement('div');
            ring2.className = 'orbit-ring-3d orbit-ring-3d-2';
            ring2.id = 'lazy-ring-2';
            DOM.lazyScene6.insertBefore(ring1, DOM.lazyScene6.firstChild);
            DOM.lazyScene6.insertBefore(ring2, DOM.lazyScene6.firstChild);
        } else if (distScene6 >= 3600 && scene6LazyMounted && DOM.lazyScene6) {
            scene6LazyMounted = false;
            const r1 = document.getElementById('lazy-ring-1');
            const r2 = document.getElementById('lazy-ring-2');
            if (r1) r1.remove();
            if (r2) r2.remove();
        }
    };

    // ==========================================
    // 3. CONTINUOUS SCROLL-DRIVEN CAMERA & TELEMETRY LOOP
    // ==========================================
    let currentCamZ = 0;
    let targetCamZ = 0;
    let scoreCounted = false;
    let lastCamZ = -1;

    // Sliding window FPS counter for Adaptive Quality Engine
    const frameTimes = [];
    let lastTime = performance.now();
    let telemetryCounter = 0;
    let activeSceneLabel = '01 // Cyber Terminal';

    const onScrollUpdate = () => {
        if (!DOM.track) return;
        const maxScroll = Math.max(DOM.track.offsetHeight - window.innerHeight, 1);
        const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
        targetCamZ = progress * 13200;
    };
    window.addEventListener('scroll', onScrollUpdate, { passive: true });

    const cameraLoop = (now) => {
        if (!DOM.rig) return;

        // FPS & Frame Time Calculation
        const dt = now - lastTime;
        lastTime = now;
        if (dt > 0 && dt < 250) {
            frameTimes.push(1000 / dt);
            if (frameTimes.length > 30) frameTimes.shift();
        }
        const avgFps = frameTimes.length > 0 ? (frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length) : 60;

        // Autonomous Adaptive Quality Throttling
        if (window.SECUREOPS_QUALITY_MODE !== 'Lite') {
            if (avgFps < 42 && frameTimes.length >= 20) {
                window.SECUREOPS_QUALITY_MODE = 'Lite';
                if (DOM.qualityDot && DOM.qualityText) {
                    DOM.qualityDot.className = 'quality-indicator-dot lite';
                    DOM.qualityText.textContent = '⚡ Quality: Lite Mode (Auto Throttled)';
                }
            } else if (avgFps < 53 && frameTimes.length >= 20 && window.SECUREOPS_QUALITY_MODE === 'Cinematic') {
                window.SECUREOPS_QUALITY_MODE = 'Balanced';
                if (DOM.qualityDot && DOM.qualityText) {
                    DOM.qualityDot.className = 'quality-indicator-dot balanced';
                    DOM.qualityText.textContent = '⚡ Quality: Balanced Mode (Auto Throttled)';
                }
            }
        }

        // Telemetry Overlay Update (Every 15 frames ~250ms)
        telemetryCounter++;
        if (telemetryCounter % 15 === 0 && DOM.telemetry.fps) {
            DOM.telemetry.fps.textContent = `${avgFps.toFixed(1)} fps (${avgFps >= 55 ? 'Smooth 🟢' : avgFps >= 45 ? 'Stable 🟡' : 'Throttled 🔴'})`;
            DOM.telemetry.frametime.textContent = `${dt.toFixed(1)} ms`;
            DOM.telemetry.camz.textContent = `${Math.floor(currentCamZ).toLocaleString()} px`;
            DOM.telemetry.scene.textContent = activeSceneLabel;
            if (telemetryCounter % 60 === 0 && DOM.telemetry.nodes) {
                const totalNodes = document.getElementsByTagName('*').length;
                DOM.telemetry.nodes.textContent = `${totalNodes} nodes (Virtualized 🟢)`;
            }
        }

        // Smooth interpolation toward target Z
        currentCamZ += (targetCamZ - currentCamZ) * 0.14;

        // Throttled Execution: Skip DOM checks if camera stationary and no active alerts
        if (Math.abs(currentCamZ - lastCamZ) > 0.3 || window.SECUREOPS_QUALITY_MODE === 'Cinematic') {
            lastCamZ = currentCamZ;

            let camRx = 0, camRy = 0, camRz = 0;

            // HUD Active State & Scene Label
            if (DOM.hudSteps && DOM.hudSteps.length >= 6) {
                DOM.hudSteps.forEach(step => step.classList.remove('active'));
                if (currentCamZ < 1500) { DOM.hudSteps[0].classList.add('active'); activeSceneLabel = '01 // Cyber Terminal'; }
                else if (currentCamZ < 4500) { DOM.hudSteps[1].classList.add('active'); activeSceneLabel = '02 // Kinetic Intro'; }
                else if (currentCamZ < 7000) { DOM.hudSteps[2].classList.add('active'); activeSceneLabel = '03 // Digital Ecosystem'; }
                else if (currentCamZ < 9400) { DOM.hudSteps[3].classList.add('active'); activeSceneLabel = '04 // Threat Intrusion'; }
                else if (currentCamZ < 11800) { DOM.hudSteps[4].classList.add('active'); activeSceneLabel = '05 // Blue Energy Wave'; }
                else { DOM.hudSteps[5].classList.add('active'); activeSceneLabel = '06 // Enter Platform'; }
            }

            // 1. DOM Virtualization & Distance Culling
            DOM.scenes.forEach((sceneEl) => {
                const depth = parseFloat(sceneEl.getAttribute('data-depth') || '0');
                const dist = Math.abs(currentCamZ - depth);
                if (dist > 3400) {
                    if (!sceneEl.classList.contains('scene-virtualized')) sceneEl.classList.add('scene-virtualized');
                } else {
                    if (sceneEl.classList.contains('scene-virtualized')) sceneEl.classList.remove('scene-virtualized');
                }
            });

            // 2. Lazy-Mount Check
            checkLazyMounts(currentCamZ);

            // 3. SCENE 1 Flythrough & Dissolve
            if (DOM.terminalEl) {
                if (currentCamZ > 950) DOM.terminalEl.classList.add('dissolved');
                else DOM.terminalEl.classList.remove('dissolved');
            }

            // 4. SCENE 2 Kinetic Typography Focus Checks
            DOM.kinetics.forEach((el, idx) => {
                if (!el) return;
                const wordDepth = 2600 + (idx * 800);
                const dist = Math.abs(currentCamZ - wordDepth);
                if (dist < 650) el.classList.add('active-focus');
                else el.classList.remove('active-focus');
            });

            // 5. SCENE 4 Threat Intrusion Shake & Volumetric Red Fog
            if (currentCamZ >= 7200 && currentCamZ < 9500) {
                if (DOM.fog) DOM.fog.style.setProperty('--fog-color', 'rgba(255, 46, 99, 0.22)');
                if (window.SECUREOPS_QUALITY_MODE === 'Cinematic') {
                    camRz = Math.sin(now * 0.04) * 0.75;
                    camRx = Math.cos(now * 0.03) * 0.45;
                }
            } else if (currentCamZ >= 9500) {
                if (DOM.fog) DOM.fog.style.setProperty('--fog-color', 'rgba(0, 240, 255, 0.18)');
            } else {
                if (DOM.fog) DOM.fog.style.setProperty('--fog-color', 'rgba(0, 240, 255, 0.06)');
            }

            // 6. SCENE 5 Energy Wave Sweep & Score Neutralization
            if (currentCamZ >= 9800 && DOM.wave) {
                if (!DOM.wave.classList.contains('sweeping')) {
                    DOM.wave.classList.add('sweeping');
                    DOM.threats.forEach((box, idx) => {
                        setTimeout(() => {
                            if (box) {
                                box.classList.add('neutralized');
                                const strong = box.querySelector('strong');
                                if (strong && strong.textContent) strong.textContent = strong.textContent.replace(/\[.*\]/, '[RESOLVED]');
                            }
                        }, idx * 200);
                    });

                    if (!scoreCounted && DOM.score) {
                        scoreCounted = true;
                        let scoreVal = 42;
                        const steps = [58, 74, 91, 100];
                        let stepIdx = 0;

                        const countStep = () => {
                            if (stepIdx >= steps.length) {
                                DOM.score.classList.add('secured');
                                if (DOM.badge) DOM.badge.textContent = 'ZERO-TRUST ENFORCED: 100% SECURE';
                                return;
                            }
                            const target = steps[stepIdx];
                            const start = scoreVal;
                            const startT = performance.now();
                            const stepAnim = (t) => {
                                const p = Math.min((t - startT) / 420, 1);
                                scoreVal = Math.floor(start + (target - start) * p);
                                if (DOM.score) DOM.score.textContent = scoreVal;
                                if (p < 1) requestAnimationFrame(stepAnim);
                                else { stepIdx++; setTimeout(countStep, 350); }
                            };
                            requestAnimationFrame(stepAnim);
                        };
                        setTimeout(countStep, 380);
                    }
                }
            }

            // 7. SCENE 6 Logo Assembly
            if (currentCamZ >= 12200 && DOM.logo) {
                DOM.logo.classList.add('assembled');
            }

            // Apply Rig Transformation
            DOM.rig.style.setProperty('--cam-z', currentCamZ);
            if (window.SECUREOPS_QUALITY_MODE === 'Cinematic') {
                DOM.rig.style.setProperty('--cam-rx', camRx);
                DOM.rig.style.setProperty('--cam-ry', camRy);
                DOM.rig.style.setProperty('--cam-rz', camRz);
            } else {
                DOM.rig.style.setProperty('--cam-rx', 0);
                DOM.rig.style.setProperty('--cam-ry', 0);
                DOM.rig.style.setProperty('--cam-rz', 0);
            }
        }

        requestAnimationFrame(cameraLoop);
    };

    requestAnimationFrame(cameraLoop);
}

// ==========================================
// OVERDRIVE THRUST INTO DASHBOARD TRANSITION
// ==========================================
window.enterDashboardCinematic = function() {
    const rig = document.getElementById('camera-rig');
    if (rig) {
        rig.classList.add('camera-overdrive-thrust');
    }

    // Switch to dashboard route after camera thrust overdrive finishes
    setTimeout(() => {
        window.location.hash = '#/dashboard';
    }, 680);
};

window.renderStoryPage = renderStoryPage;
