/* ==========================================================================
   SECUREOPS // Admin Control Panel (`pages/admin.js`)
   ========================================================================== */

const AdminPage = {
    render() {
        const members = [
            { id: 1, name: "Harshil Architect", email: "harshil@secureops.dev", role: "Organization Owner & CISO", status: "Active", mfa: "Enrolled (YubiKey)" },
            { id: 2, name: "Elena Rostova", email: "elena@secureops.dev", role: "Principal Security Engineer", status: "Active", mfa: "Enrolled (WebAuthn)" },
            { id: 3, name: "Marcus Vance", email: "marcus@secureops.dev", role: "Lead Platform Engineer", status: "Active", mfa: "Enrolled (TOTP)" },
            { id: 4, name: "AI Guardrail Bot (`bot@secops.ai`)", email: "autonomous-service@secops.internal", role: "Autonomous AI Engine Account", status: "System Service", mfa: "Enrolled (mTLS Cert)" }
        ];

        return `
            <div style="display: flex; flex-direction: column; gap: 28px;">
                <!-- Header -->
                <div class="flex-between flex-wrap" style="gap: 16px;">
                    <div>
                        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: #FFF; margin-bottom: 4px;">
                            Organization Administration & IAM Matrix
                        </h2>
                        <p style="color: var(--text-secondary); font-size: 0.95rem;">
                            Manage enterprise team members, enforce FIDO2 hardware MFA policies, and configure Role-Based Access Control (RBAC).
                        </p>
                    </div>

                    <div style="display: flex; gap: 12px;">
                        <button class="btn btn-secondary" onclick="window.showToast('LDAP & SAML directory sync completed (14 verified users).', 'success')">
                            🔄 Sync Directory (SAML/Okta)
                        </button>
                        <button class="btn btn-primary" id="invite-member-btn">
                            + Invite Team Member
                        </button>
                    </div>
                </div>

                <!-- Members Table -->
                <div class="glass-card" style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
                    <div class="flex-between">
                        <h3 style="font-family: var(--font-heading); font-size: 1.2rem; font-weight: 700; color: #FFF;">Enrolled Organization Members (${members.length})</h3>
                        <span class="badge badge-secure">● Zero-Trust IAM Active</span>
                    </div>

                    <div class="data-table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Member Name</th>
                                    <th>Email Identity</th>
                                    <th>Assigned Role</th>
                                    <th>MFA Security Posture</th>
                                    <th>Status</th>
                                    <th style="text-align: right;">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${members.map(m => `
                                    <tr>
                                        <td><strong style="color: #FFF; font-size: 0.95rem;">${m.name}</strong></td>
                                        <td style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-secondary);">${m.email}</td>
                                        <td><span class="badge" style="background: rgba(0, 240, 255, 0.1); color: var(--primary-cyan); font-weight: 600;">${m.role}</span></td>
                                        <td style="font-size: 0.85rem; color: var(--neon-green);">🔐 ${m.mfa}</td>
                                        <td><span class="badge ${m.status.includes('Active') || m.status.includes('System') ? 'badge-secure' : 'badge-warning'}">${m.status}</span></td>
                                        <td style="text-align: right;">
                                            <button class="btn btn-secondary btn-sm" onclick="showModal({ title: 'Edit RBAC Role for ${m.name}', confirmText: 'Update Role', bodyHtml: '<label class=\\'form-label\\'>Assign New Role</label><select class=\\'form-input\\'><option>Organization Owner & CISO</option><option>Security Engineer</option><option>Read-Only Auditor</option></select>', onConfirm: () => window.showToast('Role permissions updated!', 'success') })">
                                                ⚙️ Role
                                            </button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Role Permissions Matrix -->
                <div class="glass-card" style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
                    <div>
                        <h3 style="font-family: var(--font-heading); font-size: 1.2rem; font-weight: 700; color: #FFF;">RBAC Granular Permissions Matrix</h3>
                        <p style="font-size: 0.85rem; color: var(--text-muted);">Inspect role capabilities across continuous scanning, code remediation, and cryptographic operations.</p>
                    </div>

                    <div class="data-table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Capability / Action</th>
                                    <th style="text-align: center;">Owner / CISO</th>
                                    <th style="text-align: center;">Security Engineer</th>
                                    <th style="text-align: center;">Platform Developer</th>
                                    <th style="text-align: center;">AI Autonomous Bot</th>
                                </tr>
                            </thead>
                            <tbody style="text-align: center;">
                                <tr>
                                    <td style="text-align: left;"><strong>Trigger Manual Workspace Scans</strong></td>
                                    <td style="color: var(--neon-green);">✅ Allow</td>
                                    <td style="color: var(--neon-green);">✅ Allow</td>
                                    <td style="color: var(--neon-green);">✅ Allow</td>
                                    <td style="color: var(--neon-green);">✅ Allow (Webhook)</td>
                                </tr>
                                <tr>
                                    <td style="text-align: left;"><strong>Apply AI Remediation Pull Requests</strong></td>
                                    <td style="color: var(--neon-green);">✅ Allow</td>
                                    <td style="color: var(--neon-green);">✅ Allow</td>
                                    <td style="color: var(--warning-amber);">⚠️ Require Review</td>
                                    <td style="color: var(--neon-green);">✅ Allow (Auto-Merge)</td>
                                </tr>
                                <tr>
                                    <td style="text-align: left;"><strong>Modify Pre-Commit Branch Guardrails</strong></td>
                                    <td style="color: var(--neon-green);">✅ Allow</td>
                                    <td style="color: var(--neon-green);">✅ Allow</td>
                                    <td style="color: var(--alert-red);">❌ Deny</td>
                                    <td style="color: var(--alert-red);">❌ Deny</td>
                                </tr>
                                <tr>
                                    <td style="text-align: left;"><strong>Revoke Organization API & CLI Keys</strong></td>
                                    <td style="color: var(--neon-green);">✅ Allow</td>
                                    <td style="color: var(--alert-red);">❌ Deny</td>
                                    <td style="color: var(--alert-red);">❌ Deny</td>
                                    <td style="color: var(--neon-green);">✅ Allow (Incident Only)</td>
                                </tr>
                                <tr>
                                    <td style="text-align: left;"><strong>Export Cryptographic Audit Proofs</strong></td>
                                    <td style="color: var(--neon-green);">✅ Allow</td>
                                    <td style="color: var(--neon-green);">✅ Allow</td>
                                    <td style="color: var(--alert-red);">❌ Deny</td>
                                    <td style="color: var(--alert-red);">❌ Deny</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    },

    afterRender() {
        const inviteBtn = document.getElementById('invite-member-btn');
        if (inviteBtn) {
            inviteBtn.addEventListener('click', () => {
                showModal({
                    title: "Invite Enterprise Team Member",
                    confirmText: "Send SAML/Email Invitation",
                    bodyHtml: `
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            <p style="font-size: 0.85rem; color: var(--text-secondary);">An onboarding link with cryptographic invite validation will be sent via email.</p>
                            <div>
                                <label class="form-label">Colleague Work Email</label>
                                <input type="email" class="form-input" placeholder="alex@secureops.dev" value="developer@secureops.dev" />
                            </div>
                            <div>
                                <label class="form-label">Initial RBAC Role</label>
                                <select class="form-input">
                                    <option>Senior DevOps / Platform Engineer</option>
                                    <option>Principal Security Engineer</option>
                                    <option>Read-Only Auditor</option>
                                </select>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; font-size: 0.85rem; color: var(--neon-green);">
                                <input type="checkbox" checked /> Require hardware FIDO2 MFA enrollment upon first login
                            </div>
                        </div>
                    `,
                    onConfirm: () => {
                        window.showToast("Invitation dispatched via enterprise SMTP relay!", "success");
                    }
                });
            });
        }
    }
};

window.AdminPage = AdminPage;
