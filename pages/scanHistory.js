/* ==========================================================================
   SECUREOPS // Historical Scans Log (`pages/scanHistory.js`)
   ========================================================================== */

const ScanHistoryPage = {
    render() {
        return `
            <div style="display: flex; flex-direction: column; gap: 24px;">
                <!-- Header -->
                <div class="flex-between flex-wrap" style="gap: 16px;">
                    <div>
                        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: #FFF; margin-bottom: 4px;">
                            Scan Execution History & Telemetry Log
                        </h2>
                        <p style="color: var(--text-secondary); font-size: 0.95rem;">
                            Chronological audit of all manual CLI diagnostics, Git webhook triggers, and automated cron scans.
                        </p>
                    </div>

                    <div style="display: flex; gap: 12px; align-items: center;">
                        <select id="history-filter-status" class="form-input" style="padding: 6px 14px; width: 200px; font-size: 0.85rem;">
                            <option value="ALL">All Scan Statuses</option>
                            <option value="PASSED">Passed (Secure)</option>
                            <option value="VULNERABILITIES FOUND">Vulnerabilities Found</option>
                        </select>
                        <button class="btn btn-primary" onclick="window.location.hash = '#/scan-center'">
                            ⚡ Launch New Scan
                        </button>
                    </div>
                </div>

                <!-- History Table Viewport -->
                <div id="history-table-viewport"></div>
            </div>
        `;
    },

    afterRender() {
        const filterSelect = document.getElementById('history-filter-status');
        const viewport = document.getElementById('history-table-viewport');

        const updateTable = () => {
            const state = AppState ? AppState.getState() : { scanHistory: [] };
            let history = state.scanHistory || [];

            if (filterSelect?.value !== 'ALL') {
                history = history.filter(h => h.status === filterSelect.value);
            }

            if (history.length === 0) {
                viewport.innerHTML = `
                    <div class="glass-card" style="padding: 60px; text-align: center; color: var(--text-secondary);">
                        <div style="font-size: 2.5rem; margin-bottom: 12px;">🕒</div>
                        <h3 style="font-family: var(--font-heading); color: #FFF; margin-bottom: 8px;">No Historical Scans Found</h3>
                        <p style="font-size: 0.9rem;">Try selecting all statuses or run a new scan from the Scan Center.</p>
                    </div>
                `;
                return;
            }

            viewport.innerHTML = `
                <div class="data-table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Scan ID</th>
                                <th>Target Repository</th>
                                <th>Engine / Scanner</th>
                                <th>Triggered By</th>
                                <th>Duration</th>
                                <th>Status</th>
                                <th>Findings / Result</th>
                                <th>Execution Timestamp</th>
                                <th style="text-align: right;">Telemetry</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${history.map(h => `
                                <tr>
                                    <td><strong style="font-family: var(--font-mono); color: #FFF;">${h.id}</strong></td>
                                    <td><span style="color: var(--primary-cyan); font-weight: 700;">${h.repo}</span></td>
                                    <td><span class="badge" style="background: rgba(255,255,255,0.06);">${h.scanner}</span></td>
                                    <td style="font-size: 0.85rem; color: var(--text-secondary);">${h.triggeredBy}</td>
                                    <td style="font-family: var(--font-mono); font-size: 0.85rem;">${h.duration}</td>
                                    <td>
                                        <span class="badge ${h.status === 'PASSED' ? 'badge-secure' : 'badge-critical'}">${h.status}</span>
                                    </td>
                                    <td><strong style="color: ${h.status === 'PASSED' ? 'var(--neon-green)' : 'var(--alert-red)'}; font-size: 0.9rem;">${h.findings}</strong></td>
                                    <td style="color: var(--text-muted); font-size: 0.85rem;">${h.timestamp}</td>
                                    <td style="text-align: right;">
                                        <button class="btn btn-secondary btn-sm inspect-history-btn" data-scan-id="${h.id}" data-repo="${h.repo}" data-scanner="${h.scanner}" data-findings="${h.findings}">
                                            👁️ Inspect Telemetry
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;

            document.querySelectorAll('.inspect-history-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const scanId = btn.getAttribute('data-scan-id');
                    const repo = btn.getAttribute('data-repo');
                    const scanner = btn.getAttribute('data-scanner');
                    const findings = btn.getAttribute('data-findings');

                    showModal({
                        title: `Telemetry Diagnostics // ${scanId}`,
                        confirmText: "Download Full Logs",
                        bodyHtml: `
                            <div style="display: flex; flex-direction: column; gap: 14px;">
                                <div class="flex-between" style="font-size: 0.9rem;">
                                    <span>Target: <strong style="color: var(--primary-cyan);">${repo}</strong></span>
                                    <span>Engine: <strong>${scanner}</strong></span>
                                </div>
                                <div style="background: #06070B; border: 1px solid var(--glass-border); border-radius: var(--radius-md); padding: 16px; font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-primary); line-height: 1.6;">
                                    <div class="log-info">$ secureops audit-replay --scan-id=${scanId}</div>
                                    <div class="log-info">[AST] Loaded 4,812 syntax tokens from target workspace...</div>
                                    <div class="log-info">[RULE ENGINE] Evaluated against OWASP Top 10 + NIST SP 800-190...</div>
                                    <div class="${findings.includes('0 Issues') ? 'log-success' : 'log-critical'}">[SUMMARY] Telemetry reported: ${findings}</div>
                                    <div class="log-info">[ARTIFACT] SHA256 checksum: ` + `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` + `</div>
                                </div>
                            </div>
                        `,
                        onConfirm: () => {
                            window.showToast(`Telemetry logs for ${scanId} exported as text archive.`, "success");
                        }
                    });
                });
            });
        };

        if (filterSelect) filterSelect.addEventListener('change', updateTable);
        updateTable();
    }
};

window.ScanHistoryPage = ScanHistoryPage;
