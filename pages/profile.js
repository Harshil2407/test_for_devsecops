/* ==========================================================================
   SECUREOPS // User Profile Page (`pages/profile.js`)
   ========================================================================== */

const ProfilePage = {
    render() {
        const user = AppState ? AppState.getUser() : { name: "Harshil Architect", email: "harshil@secureops.dev", role: "Principal DevSecOps Architect", avatar: "👨‍💻" };

        return `
            <div style="display: flex; flex-direction: column; gap: 24px;">
                <!-- Profile Header Banner -->
                <div class="glass-card" style="padding: 32px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; background: linear-gradient(135deg, rgba(0, 240, 255, 0.08), rgba(138, 43, 226, 0.1)); border-top: 3px solid var(--primary-cyan);">
                    <div style="display: flex; align-items: center; gap: 20px;">
                        <div style="width: 80px; height: 80px; border-radius: 50%; background: rgba(0,240,255,0.15); border: 2px solid var(--primary-cyan); display: flex; align-items: center; justify-content: center; font-size: 2.8rem; box-shadow: var(--shadow-glow-cyan);">
                            ${user.avatar || '👨‍💻'}
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <h2 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: #FFF; margin: 0;">${user.name}</h2>
                                <span class="badge badge-secure">● Online // MFA Active</span>
                            </div>
                            <span style="font-size: 0.95rem; color: var(--primary-cyan); font-weight: 600;">${user.role}</span>
                            <span style="font-size: 0.85rem; color: var(--text-muted); font-family: var(--font-mono);">${user.email} // Organization: SECUREOPS Core Tech</span>
                        </div>
                    </div>

                    <div style="display: flex; gap: 12px;">
                        <button class="btn btn-secondary" onclick="showModal({ title: 'Edit Profile Information', confirmText: 'Save Profile', bodyHtml: '<p style=\\'color: var(--text-secondary);\\'>Update personal avatar or contact details.</p><label class=\\'form-label\\'>Display Name</label><input type=\\'text\\' class=\\'form-input\\' value=\\'Harshil Architect\\' />', onConfirm: () => window.showToast('Profile updated successfully!', 'success') })">
                            ✏️ Edit Profile
                        </button>
                        <button class="btn btn-secondary" onclick="window.location.hash = '#/settings'">
                            ⚙️ Workspace Settings
                        </button>
                    </div>
                </div>

                <!-- Main Grid: Tokens vs Activity -->
                <div style="display: grid; grid-template-columns: 1.3fr 1fr; gap: 24px; align-items: start;">
                    <!-- Left: API & CLI Token Generator -->
                    <div class="glass-card" style="padding: 24px; display: flex; flex-direction: column; gap: 20px;">
                        <div class="flex-between">
                            <div>
                                <h3 style="font-family: var(--font-heading); font-size: 1.2rem; font-weight: 700; color: #FFF;">Personal API & CLI Security Tokens</h3>
                                <p style="font-size: 0.85rem; color: var(--text-muted);">Used for &lt;code&gt;secureops-cli&lt;/code&gt; local terminal scanning and GitHub Actions integration.</p>
                            </div>
                            <span class="badge" style="background: rgba(0,240,255,0.1); color: var(--primary-cyan);">Active Keys: 2</span>
                        </div>

                        <!-- Active Tokens List -->
                        <div style="display: flex; flex-direction: column; gap: 14px;">
                            <div class="card" style="padding: 16px; border: 1px solid var(--card-border); border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 700; color: #FFF; font-size: 0.95rem;">Dev Laptop CLI Token (&lt;code&gt;secops_cli_local&lt;/code&gt;)</div>
                                    <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted); margin: 4px 0;">secops_live_94f8a1...c490e</div>
                                    <div style="font-size: 0.75rem; color: var(--neon-green);">Created: 14 days ago // Expires: Never</div>
                                </div>
                                <div style="display: flex; gap: 8px;">
                                    <button class="btn btn-secondary btn-sm" onclick="window.showToast('API token copied to clipboard!', 'info')">📋 Copy</button>
                                    <button class="btn btn-secondary btn-sm" onclick="window.showToast('Token revoked immediately.', 'info')" style="color: var(--alert-red);">Revoke</button>
                                </div>
                            </div>

                            <div class="card" style="padding: 16px; border: 1px solid var(--card-border); border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 700; color: #FFF; font-size: 0.95rem;">CI/CD GitHub Actions Key (&lt;code&gt;secops_runner_key&lt;/code&gt;)</div>
                                    <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted); margin: 4px 0;">secops_live_1092fb...a1883</div>
                                    <div style="font-size: 0.75rem; color: var(--neon-green);">Created: 30 days ago // Expires: in 60 days</div>
                                </div>
                                <div style="display: flex; gap: 8px;">
                                    <button class="btn btn-secondary btn-sm" onclick="window.showToast('API token copied to clipboard!', 'info')">📋 Copy</button>
                                    <button class="btn btn-secondary btn-sm" onclick="window.showToast('Token revoked immediately.', 'info')" style="color: var(--alert-red);">Revoke</button>
                                </div>
                            </div>
                        </div>

                        <!-- Generate New Token Button -->
                        <div style="border-top: 1px solid var(--glass-border); padding-top: 16px;">
                            <button class="btn btn-primary" id="generate-new-token-btn" style="width: 100%; justify-content: center; padding: 12px;">
                                + Generate New Cryptographic API Token
                            </button>
                        </div>
                    </div>

                    <!-- Right: Security Posture & Hardware Keys -->
                    <div style="display: flex; flex-direction: column; gap: 24px;">
                        <div class="glass-card" style="padding: 24px; display: flex; flex-direction: column; gap: 16px; border-top: 3px solid var(--neon-green);">
                            <div class="flex-between">
                                <h3 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700; color: #FFF;">Multi-Factor Authentication (MFA)</h3>
                                <span class="badge badge-secure">FIDO2 Verified</span>
                            </div>
                            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
                                Your account is protected by hardware security keys (YubiKey 5C NFC) and biometric WebAuthn verification.
                            </p>
                            <button class="btn btn-secondary btn-sm" onclick="window.showToast('Hardware security key management modal open.', 'info')" style="align-self: flex-start;">
                                🔐 Manage Hardware Keys (2 enrolled)
                            </button>
                        </div>

                        <!-- Recent User Activity Timeline -->
                        <div class="glass-card" style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
                            <h3 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700; color: #FFF;">Personal Audit Trail</h3>
                            
                            <div style="display: flex; flex-direction: column; gap: 14px; font-size: 0.85rem;">
                                <div style="display: flex; gap: 12px; align-items: flex-start;">
                                    <span style="color: var(--primary-cyan);">⚡</span>
                                    <div>
                                        <div style="color: var(--text-primary);">Triggered autonomous SAST check on <strong>api-gateway</strong></div>
                                        <div style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">Today at 14:10 UTC // IP: 192.168.1.104</div>
                                    </div>
                                </div>

                                <div style="display: flex; gap: 12px; align-items: flex-start;">
                                    <span style="color: var(--neon-green);">✅</span>
                                    <div>
                                        <div style="color: var(--text-primary);">Applied AI code fix to <strong>CVE-2026-1049</strong> (PR #142)</div>
                                        <div style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">Today at 11:22 UTC // IP: 192.168.1.104</div>
                                    </div>
                                </div>

                                <div style="display: flex; gap: 12px; align-items: flex-start;">
                                    <span style="color: var(--cyber-violet);">🔑</span>
                                    <div>
                                        <div style="color: var(--text-primary);">Authenticated session via <strong>GitHub Enterprise SSO</strong></div>
                                        <div style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">Yesterday at 09:00 UTC // IP: 192.168.1.104</div>
                                    </div>
                                </div>
                            </div>

                            <a href="#/audit-logs" style="font-size: 0.85rem; color: var(--primary-cyan); text-decoration: none; margin-top: 6px;">View Full Organization Audit Logs →</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    afterRender() {
        const genBtn = document.getElementById('generate-new-token-btn');
        if (genBtn) {
            genBtn.addEventListener('click', () => {
                const newToken = `secops_live_${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 6)}`;
                showModal({
                    title: "New API & CLI Security Token Created",
                    confirmText: "Copy Token & Close",
                    bodyHtml: `
                        <div style="display: flex; flex-direction: column; gap: 14px;">
                            <p style="font-size: 0.9rem; color: var(--text-secondary);">Make sure to copy your personal API token right now. You won't be able to see it again!</p>
                            <div style="background: #06070B; border: 1px solid var(--primary-cyan); border-radius: var(--radius-md); padding: 14px; font-family: var(--font-mono); font-size: 1.05rem; color: var(--primary-cyan); text-align: center; font-weight: 700;">
                                ${newToken}
                            </div>
                            <div style="font-size: 0.8rem; color: var(--warning-amber);">
                                ⚠️ Token scoped to: full SAST trigger, read repositories, create AI remediation PRs.
                            </div>
                        </div>
                    `,
                    onConfirm: () => {
                        window.showToast("Personal cryptographic token copied to clipboard!", "success");
                    }
                });
            });
        }
    }
};

window.ProfilePage = ProfilePage;
