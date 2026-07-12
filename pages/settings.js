/* ==========================================================================
   SECUREOPS // Portal Settings Page (`pages/settings.js`)
   ========================================================================== */

const SettingsPage = {
    render() {
        return `
            <div style="display: flex; flex-direction: column; gap: 28px;">
                <!-- Header -->
                <div class="flex-between flex-wrap" style="gap: 16px;">
                    <div>
                        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: #FFF; margin-bottom: 4px;">
                            Organization Security Policies & Portal Settings
                        </h2>
                        <p style="color: var(--text-secondary); font-size: 0.95rem;">
                            Configure autonomous pre-commit guardrail thresholds, customize UI themes, and manage global webhooks.
                        </p>
                    </div>

                    <button class="btn btn-primary" onclick="window.showToast('All security policies and portal configurations saved across edge proxies!', 'success')">
                        💾 Save Global Configuration
                    </button>
                </div>

                <div style="display: grid; grid-template-columns: 1.6fr 1fr; gap: 24px; align-items: start;">
                    <!-- Left: Security Thresholds & Autonomous Rules -->
                    <div class="glass-card" style="padding: 24px; display: flex; flex-direction: column; gap: 24px;">
                        <div>
                            <h3 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: #FFF; margin-bottom: 4px;">Autonomous Guardrail Thresholds</h3>
                            <p style="font-size: 0.85rem; color: var(--text-muted);">Define strict CVSS limits that trigger immediate pull request blocks.</p>
                        </div>

                        <!-- Slider: CVSS Block Threshold -->
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <div class="flex-between">
                                <label class="form-label" style="margin: 0; font-size: 0.95rem;">Pre-Commit PR Blocking CVSS Score Limit</label>
                                <span class="badge badge-critical" id="cvss-val-display" style="font-family: var(--font-mono); font-size: 0.9rem;">CVSS ≥ 7.0 (High/Critical)</span>
                            </div>
                            <input type="range" id="cvss-slider" min="4.0" max="9.0" step="0.5" value="7.0" class="form-input" style="padding: 0; cursor: pointer; accent-color: var(--primary-cyan);" />
                            <div class="flex-between" style="font-size: 0.75rem; color: var(--text-muted);">
                                <span>CVSS 4.0 (Medium Block)</span>
                                <span>CVSS 7.0 (High Block)</span>
                                <span>CVSS 9.0 (Critical Only)</span>
                            </div>
                        </div>

                        <div style="height: 1px; background: var(--glass-border);"></div>

                        <!-- Toggle Rules -->
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            <div class="flex-between">
                                <div>
                                    <div style="font-weight: 700; color: #FFF; font-size: 0.95rem;">Autonomous Secret Revocation via Cloud IAM APIs</div>
                                    <div style="font-size: 0.8rem; color: var(--text-secondary);">Instantly invalidate detected AWS/GCP access keys before commit completes.</div>
                                </div>
                                <input type="checkbox" checked style="accent-color: var(--primary-cyan); transform: scale(1.3); cursor: pointer;" />
                            </div>

                            <div class="flex-between">
                                <div>
                                    <div style="font-weight: 700; color: #FFF; font-size: 0.95rem;">Enforce Cosign Cryptographic Signature on Container Images</div>
                                    <div style="font-size: 0.8rem; color: var(--text-secondary);">Block Kubernetes pod deployments if container SHA-256 lacks verification.</div>
                                </div>
                                <input type="checkbox" checked style="accent-color: var(--primary-cyan); transform: scale(1.3); cursor: pointer;" />
                            </div>

                            <div class="flex-between">
                                <div>
                                    <div style="font-weight: 700; color: #FFF; font-size: 0.95rem;">AI Code Auto-Patch Pull Request Generation</div>
                                    <div style="font-size: 0.8rem; color: var(--text-secondary);">Allow SECUREOPS AI agent to automatically open fix branches for CWE defects.</div>
                                </div>
                                <input type="checkbox" checked style="accent-color: var(--primary-cyan); transform: scale(1.3); cursor: pointer;" />
                            </div>
                        </div>
                    </div>

                    <!-- Right: Theme Customizer & Maintenance -->
                    <div style="display: flex; flex-direction: column; gap: 24px;">
                        <!-- Theme Customizer Box -->
                        <div class="glass-card" style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
                            <div>
                                <h3 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700; color: #FFF; margin-bottom: 4px;">Portal Theme Customizer</h3>
                                <p style="font-size: 0.82rem; color: var(--text-muted);">Switch between curated neon palettes for your DevSecOps workspace.</p>
                            </div>

                            <div style="display: flex; flex-direction: column; gap: 10px;">
                                <button class="btn btn-secondary theme-select-btn" data-theme="default" style="justify-content: space-between; border-left: 4px solid #00F0FF;">
                                    <span>⚡ Electric Cyan / Neon Dark (Default)</span>
                                    <span class="badge badge-secure">Active</span>
                                </button>
                                <button class="btn btn-secondary theme-select-btn" data-theme="violet" style="justify-content: space-between; border-left: 4px solid #8A2BE2;">
                                    <span>👾 Deep Cyber Violet</span>
                                    <span style="font-size: 0.75rem; color: var(--text-muted);">Select</span>
                                </button>
                                <button class="btn btn-secondary theme-select-btn" data-theme="emerald" style="justify-content: space-between; border-left: 4px solid #00FF66;">
                                    <span>🐍 Matrix Emerald Green</span>
                                    <span style="font-size: 0.75rem; color: var(--text-muted);">Select</span>
                                </button>
                            </div>
                        </div>

                        <!-- Maintenance Area -->
                        <div class="glass-card" style="padding: 24px; display: flex; flex-direction: column; gap: 16px; border-top: 3px solid var(--alert-red);">
                            <div>
                                <h3 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700; color: var(--alert-red); margin-bottom: 4px;">Danger Zone</h3>
                                <p style="font-size: 0.82rem; color: var(--text-muted);">Irreversible security maintenance actions.</p>
                            </div>

                            <button class="btn btn-secondary btn-sm" onclick="showModal({ title: 'Rotate Master Cryptographic Keys?', confirmText: 'Rotate All Keys', bodyHtml: '<p style=\\'color: var(--alert-red);\\'>Warning: Rotating master keys will require all 18 microservices to re-authenticate with new webhooks.</p>', onConfirm: () => window.showToast('Master keys rotated! Webhook manifests updated.', 'success') })" style="color: var(--alert-red); border-color: rgba(255,46,99,0.3); justify-content: center;">
                                🔑 Rotate Organization Master Keys
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    afterRender() {
        const slider = document.getElementById('cvss-slider');
        const display = document.getElementById('cvss-val-display');

        if (slider && display) {
            slider.addEventListener('input', (e) => {
                const val = parseFloat(e.target.value).toFixed(1);
                display.textContent = `CVSS ≥ ${val} (` + (val < 6 ? 'Medium Block' : val < 8 ? 'High Block' : 'Critical Only') + `)`;
            });
        }

        const themeBtns = document.querySelectorAll('.theme-select-btn');
        themeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.getAttribute('data-theme');
                const root = document.documentElement;

                if (theme === 'violet') {
                    root.style.setProperty('--primary-cyan', '#8A2BE2');
                    root.style.setProperty('--shadow-glow-cyan', '0 0 25px rgba(138, 43, 226, 0.45)');
                    window.showToast("Portal theme switched to Deep Cyber Violet!", "info");
                } else if (theme === 'emerald') {
                    root.style.setProperty('--primary-cyan', '#00FF66');
                    root.style.setProperty('--shadow-glow-cyan', '0 0 25px rgba(0, 255, 102, 0.45)');
                    window.showToast("Portal theme switched to Matrix Emerald Green!", "info");
                } else {
                    root.style.setProperty('--primary-cyan', '#00F0FF');
                    root.style.setProperty('--shadow-glow-cyan', '0 0 25px rgba(0, 240, 255, 0.45)');
                    window.showToast("Portal theme reset to Electric Cyan / Neon Dark!", "success");
                }
            });
        });
    }
};

window.SettingsPage = SettingsPage;
