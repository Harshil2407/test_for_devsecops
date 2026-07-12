/* ==========================================================================
   SECUREOPS // Live Cyber Terminal Scan Center (`pages/scanCenter.js`)
   ========================================================================== */

const ScanCenterPage = {
    render() {
        const state = AppState ? AppState.getState() : { repositories: [], scanners: [] };
        const repos = state.repositories || [];
        const scanners = state.scanners || [];

        return `
            <div style="display: flex; flex-direction: column; gap: 24px;">
                <!-- Header -->
                <div class="flex-between flex-wrap" style="gap: 16px;">
                    <div>
                        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: #FFF; margin-bottom: 4px;">
                            Autonomous Scan Center & Cyber Terminal
                        </h2>
                        <p style="color: var(--text-secondary); font-size: 0.95rem;">
                            Directly trigger SAST, IaC, DAST, and secret detection checks against selected repositories with real-time log output.
                        </p>
                    </div>

                    <div style="display: flex; gap: 12px; align-items: center;">
                        <span style="font-size: 0.9rem; color: var(--text-muted);">Target Repository:</span>
                        <select id="scan-target-repo" class="form-input" style="padding: 8px 16px; width: 220px; font-size: 0.9rem; font-weight: 600; color: var(--primary-cyan);">
                            ${repos.map(r => `<option value="${r.name}">${r.name} (${r.language})</option>`).join('')}
                        </select>
                        <button class="btn btn-primary" id="launch-all-scans-btn">
                            ⚡ Launch All 4 Engines
                        </button>
                    </div>
                </div>

                <!-- Scanners Grid -->
                <div class="scanner-grid">
                    ${scanners.map(s => `
                        <div class="scanner-card">
                            <div class="scanner-card-header">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div class="scanner-icon">${s.icon || '🛡️'}</div>
                                    <div style="display: flex; flex-direction: column;">
                                        <span style="font-weight: 700; font-size: 1.1rem; color: #FFF;">${s.name}</span>
                                        <span style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">${s.type} // v${s.version}</span>
                                    </div>
                                </div>
                                <span class="badge badge-secure">● ${s.status}</span>
                            </div>

                            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; flex: 1;">${s.description}</p>

                            <div class="flex-between" style="border-top: 1px solid var(--glass-border); padding-top: 14px; margin-top: 6px;">
                                <span style="font-size: 0.75rem; color: var(--text-muted);">Last run: ${s.lastRun}</span>
                                <button class="btn btn-secondary btn-sm launch-single-btn" data-scanner-id="${s.id}" data-scanner-name="${s.name}">
                                    ▶ Run Engine
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Live Cyber Terminal Output Area -->
                <div class="glass-card" style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
                    <div class="flex-between">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <span style="font-size: 1.3rem;">💻</span>
                            <div>
                                <h3 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700; color: #FFF;">Live Engine Telemetry Output</h3>
                                <span style="font-size: 0.8rem; color: var(--text-muted);" id="scan-terminal-status">System idle. Select a scanner above to begin diagnostics.</span>
                            </div>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <button class="btn btn-secondary btn-sm" id="clear-terminal-btn" style="padding: 4px 10px; font-size: 0.8rem;">Clear Buffer</button>
                            <button class="btn btn-secondary btn-sm" onclick="window.showToast('Log output copied to clipboard as JSON format.', 'info')" style="padding: 4px 10px; font-size: 0.8rem;">📋 Copy JSON</button>
                        </div>
                    </div>

                    <!-- Progress Bar -->
                    <div>
                        <div class="flex-between" style="margin-bottom: 6px; font-size: 0.8rem; font-family: var(--font-mono);">
                            <span style="color: var(--primary-cyan);" id="scan-progress-label">Progress: Idle</span>
                            <span style="color: #FFF; font-weight: 700;" id="scan-progress-percent">0%</span>
                        </div>
                        <div class="scan-progress-bar">
                            <div class="scan-progress-fill" id="scan-progress-fill"></div>
                        </div>
                    </div>

                    <!-- Terminal Viewport -->
                    <div class="scan-terminal-viewport" id="scan-center-terminal">
                        <div class="log-info"><span class="prompt">$</span> secureops-cli --mode=interactive --cluster=edge-us-east-1</div>
                        <div class="log-info"><span class="prompt">$</span> ready for scan instructions...</div>
                    </div>
                </div>
            </div>
        `;
    },

    afterRender() {
        const repoSelect = document.getElementById('scan-target-repo');
        const terminalContainer = document.getElementById('scan-center-terminal');
        const statusLabel = document.getElementById('scan-terminal-status');
        const progressLabel = document.getElementById('scan-progress-label');
        const progressPercent = document.getElementById('scan-progress-percent');
        const progressFill = document.getElementById('scan-progress-fill');
        const clearBtn = document.getElementById('clear-terminal-btn');
        const launchAllBtn = document.getElementById('launch-all-scans-btn');

        let activeSimulator = null;

        const startSimulation = (repoName, scannerName) => {
            if (!terminalContainer) return;
            
            statusLabel.textContent = `Running ${scannerName} against \`${repoName}\`...`;
            statusLabel.style.color = "var(--primary-cyan)";
            progressLabel.textContent = `Scanning \`${repoName}\` with ${scannerName}...`;

            if (activeSimulator) activeSimulator.stop();

            const isVulnerable = Math.random() > 0.4 || repoName === "payment-processor";

            const lines = [
                { text: `secureops scan --engine=${scannerName.toLowerCase().replace(/\s+/g, '-')} --target=${repoName}`, type: "info", prompt: "[$]" },
                { text: `Resolving dependency tree and AST models for repository \`${repoName}\`...`, type: "info", delayAfter: 600 },
                { text: `Applying 1,420 zero-day signature rules and OWASP Top 10 heuristics...`, type: "info", delayAfter: 700 },
                { text: `[CHECK 1/4] Static AST code inspection completed. Scanning memory allocations...`, type: "info", delayAfter: 500 },
                { text: `[CHECK 2/4] Container base layer analysis & SHA-256 fingerprint matching...`, type: "info", delayAfter: 600 },
                { text: `[CHECK 3/4] Secret pattern recognition (` + (repoName === 'payment-processor' ? '1 hardcoded AWS credential matched!' : '0 secrets exposed') + `)...`, type: repoName === 'payment-processor' ? "critical" : "info", delayAfter: 700 }
            ];

            if (isVulnerable) {
                lines.push({ text: `[WARNING] Found 1 High / 2 Medium findings in \`${repoName}\`. Detailed CVE breakdown appended to Vulnerability Explorer.`, type: "warn", delayAfter: 800 });
                lines.push({ text: `[SCAN COMPLETE] Engine status: ACTION REQUIRED (CVSS score 8.2).`, type: "warn", instant: true });
            } else {
                lines.push({ text: `[CHECK 4/4] Zero high-severity vulnerabilities discovered. All security gates passed.`, type: "success", delayAfter: 600 });
                lines.push({ text: `[SCAN COMPLETE] Engine status: SECURE & COMPLIANT (Score: 98/100).`, type: "success", instant: true });
            }

            activeSimulator = new TerminalSimulator(terminalContainer, {
                speed: 18,
                lineDelay: 400,
                lines
            });
            activeSimulator.start();

            // Trigger global AppState reactive progress
            if (AppState) {
                AppState.triggerScan(repoName, scannerName, (percent) => {
                    if (progressPercent) progressPercent.textContent = `${percent}%`;
                    if (progressFill) progressFill.style.width = `${percent}%`;
                }, ({ status }) => {
                    if (progressPercent) progressPercent.textContent = `100% (${status})`;
                    if (progressFill) progressFill.style.width = `100%`;
                    statusLabel.textContent = `Scan finished: ${status} on \`${repoName}\`.`;
                    statusLabel.style.color = status === 'PASSED' ? 'var(--neon-green)' : 'var(--warning-amber)';
                });
            }
        };

        const singleBtns = document.querySelectorAll('.launch-single-btn');
        singleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const scannerName = btn.getAttribute('data-scanner-name');
                const repoName = repoSelect?.value || "api-gateway";
                startSimulation(repoName, scannerName);
            });
        });

        if (launchAllBtn) {
            launchAllBtn.addEventListener('click', () => {
                const repoName = repoSelect?.value || "api-gateway";
                startSimulation(repoName, "Full 4-Engine Suite (SAST + IaC + Secrets + DAST)");
            });
        }

        if (clearBtn && terminalContainer) {
            clearBtn.addEventListener('click', () => {
                terminalContainer.innerHTML = `<div class="log-info"><span class="prompt">$</span> buffer cleared. ready for instructions...</div>`;
                if (progressPercent) progressPercent.textContent = `0%`;
                if (progressFill) progressFill.style.width = `0%`;
                statusLabel.textContent = `System idle.`;
                statusLabel.style.color = `var(--text-muted)`;
            });
        }
    }
};

window.ScanCenterPage = ScanCenterPage;
