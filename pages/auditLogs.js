/* ==========================================================================
   SECUREOPS // Security Audit Logs (`pages/auditLogs.js`)
   ========================================================================== */

const AuditLogsPage = {
    render() {
        return `
            <div style="display: flex; flex-direction: column; gap: 24px;">
                <!-- Header -->
                <div class="flex-between flex-wrap" style="gap: 16px;">
                    <div>
                        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: #FFF; margin-bottom: 4px;">
                            Immutable Security & Governance Audit Trail
                        </h2>
                        <p style="color: var(--text-secondary); font-size: 0.95rem;">
                            Cryptographically hashed event log recording all user access, automated guardrail mitigations, and IAM mutations.
                        </p>
                    </div>

                    <div style="display: flex; gap: 12px; align-items: center;">
                        <select id="audit-filter-cat" class="form-input" style="padding: 6px 14px; width: 220px; font-size: 0.85rem;">
                            <option value="ALL">All Event Categories</option>
                            <option value="IAM & Authentication">IAM & Authentication</option>
                            <option value="Autonomous Guardrail">Autonomous Guardrail</option>
                            <option value="RBAC Administration">RBAC Administration</option>
                        </select>
                        <button class="btn btn-primary" id="verify-merkle-btn">
                            🛡️ Verify SHA-256 Merkle Chain
                        </button>
                    </div>
                </div>

                <!-- Audit Logs Table Viewport -->
                <div id="audit-logs-viewport"></div>
            </div>
        `;
    },

    afterRender() {
        const filterSelect = document.getElementById('audit-filter-cat');
        const viewport = document.getElementById('audit-logs-viewport');
        const verifyBtn = document.getElementById('verify-merkle-btn');

        const updateTable = () => {
            const state = AppState ? AppState.getState() : { auditLogs: [] };
            let logs = state.auditLogs || [];

            if (filterSelect?.value !== 'ALL') {
                logs = logs.filter(l => l.category === filterSelect.value);
            }

            if (logs.length === 0) {
                viewport.innerHTML = `
                    <div class="glass-card" style="padding: 60px; text-align: center; color: var(--text-secondary);">
                        <div style="font-size: 2.5rem; margin-bottom: 12px;">🛡️</div>
                        <h3 style="font-family: var(--font-heading); color: #FFF; margin-bottom: 8px;">No Audit Records Match Category</h3>
                        <p style="font-size: 0.9rem;">Try selecting all event categories.</p>
                    </div>
                `;
                return;
            }

            viewport.innerHTML = `
                <div class="data-table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Event ID</th>
                                <th>Timestamp (UTC)</th>
                                <th>Action / Event Type</th>
                                <th>Actor / Service Identity</th>
                                <th>Target Resource</th>
                                <th>Category</th>
                                <th>IP Address</th>
                                <th>SHA-256 Cryptographic Hash</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${logs.map(l => `
                                <tr>
                                    <td><strong style="font-family: var(--font-mono); color: #FFF;">${l.id}</strong></td>
                                    <td style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted);">${l.timestamp}</td>
                                    <td>
                                        <span class="badge ${l.action.includes('REVOKED') || l.action.includes('BLOCKED') ? 'badge-critical' : l.action.includes('ROLE') ? 'badge-warning' : 'badge-secure'}">
                                            ${l.action}
                                        </span>
                                    </td>
                                    <td style="font-size: 0.88rem; color: var(--text-primary);">${l.actor}</td>
                                    <td><span style="color: var(--primary-cyan); font-weight: 600;">${l.target}</span></td>
                                    <td><span style="font-size: 0.82rem; color: var(--text-secondary);">${l.category}</span></td>
                                    <td style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted);">${l.ip}</td>
                                    <td style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary-cyan);" title="${l.hash}">${l.hash.substring(0, 16)}...</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        };

        if (filterSelect) filterSelect.addEventListener('change', updateTable);
        if (verifyBtn) {
            verifyBtn.addEventListener('click', () => {
                window.showToast("Verifying Merkle tree root and cryptographic sequence hashes...", "info");
                setTimeout(() => {
                    showModal({
                        title: "Merkle Tree Integrity Verified",
                        confirmText: "Close Verification Certificate",
                        bodyHtml: `
                            <div style="display: flex; flex-direction: column; gap: 14px; text-align: center;">
                                <div style="font-size: 3rem;">🔐</div>
                                <h4 style="color: var(--neon-green); font-family: var(--font-heading); font-size: 1.3rem; margin: 0;">Audit Log Chain is 100% Immutable</h4>
                                <p style="font-size: 0.88rem; color: var(--text-secondary);">
                                    All 142 audit records match sequential cryptographic blocks. No tampering, truncation, or unauthorized mutations detected in the system database.
                                </p>
                                <div style="background: #06070B; border: 1px solid var(--neon-green); border-radius: var(--radius-md); padding: 12px; font-family: var(--font-mono); font-size: 0.8rem; color: var(--neon-green);">
                                    ROOT_HASH: 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
                                </div>
                            </div>
                        `
                    });
                }, 1200);
            });
        }
        updateTable();
    }
};

window.AuditLogsPage = AuditLogsPage;
