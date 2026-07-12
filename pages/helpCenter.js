/* ==========================================================================
   SECUREOPS // Help Center & FAQ (`pages/helpCenter.js`)
   ========================================================================== */

const HelpCenterPage = {
    render() {
        const faqs = [
            {
                q: "How do I suppress or whitelist a false positive vulnerability finding?",
                a: "If Bandit or Gitleaks flags an intentional test secret or non-exploitable segment, add a inline comment `# nosec` or `# gitleaks:allow` directly above the line in your source code. Upon next commit, SECUREOPS will automatically categorize it as a verified exception."
            },
            {
                q: "What happens when an AWS/GCP root key is discovered during pre-commit?",
                a: "If 'Autonomous Secret Revocation via Cloud IAM APIs' is enabled under #/settings, SECUREOPS instantly intercepts the payload and issues an API call to AWS/GCP to invalidate the compromised token within 18 milliseconds, guaranteeing zero exploitation window."
            },
            {
                q: "Can I write custom AST static analysis rules for proprietary internal libraries?",
                a: "Yes! Under `.secureops/rules.yaml` in your repository root, you can define custom Semgrep and Bandit regex/AST pattern matching rules that our edge scanning workers will load dynamically during PR evaluation."
            },
            {
                q: "How do I enroll physical YubiKey 5C FIDO2 tokens for hardware MFA?",
                a: "Navigate to #/profile and click 'Manage Hardware Keys'. Insert your physical YubiKey via USB-C or tap via NFC when prompted by your browser's WebAuthn biometric dialog to complete cryptographic attestation."
            }
        ];

        return `
            <div style="display: flex; flex-direction: column; gap: 28px; max-width: 950px; margin: 0 auto;">
                <!-- Header -->
                <div class="glass-card" style="padding: 36px; text-align: center; border-top: 3px solid var(--neon-green);">
                    <span style="font-size: 2.5rem; margin-bottom: 12px; display: inline-block;">🆘</span>
                    <h2 style="font-family: var(--font-heading); font-size: 2rem; font-weight: 800; color: #FFF; margin-bottom: 8px;">
                        DevSecOps Help Center & Knowledge Base
                    </h2>
                    <p style="color: var(--text-secondary); font-size: 0.95rem; max-width: 650px; margin: 0 auto 24px;">
                        Quickly resolve false positives, configure custom AST scan heuristics, and understand automated guardrail SLA policies.
                    </p>

                    <!-- Search Input -->
                    <div style="max-width: 500px; margin: 0 auto; display: flex; gap: 10px;">
                        <input type="text" class="form-input" placeholder="Search knowledge base (e.g. false positive, YubiKey, webhook)..." style="padding: 12px 18px; font-size: 0.95rem;" id="help-search-input" />
                        <button class="btn btn-primary" onclick="window.showToast('Searching knowledge base articles...', 'info')">🔍 Search</button>
                    </div>
                </div>

                <!-- FAQ Accordion List -->
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <h3 style="font-family: var(--font-heading); font-size: 1.3rem; font-weight: 700; color: #FFF;">Frequently Asked Questions</h3>

                    ${faqs.map(f => `
                        <div class="glass-card" style="padding: 24px; border-left: 4px solid var(--primary-cyan);">
                            <h4 style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 700; color: #FFF; margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">
                                <span style="color: var(--primary-cyan);">Q:</span> ${f.q}
                            </h4>
                            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin: 0;">
                                <strong style="color: var(--neon-green);">A:</strong> ${f.a}
                            </p>
                        </div>
                    `).join('')}
                </div>

                <!-- Live Support Box -->
                <div class="glass-card" style="padding: 24px; display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap;">
                    <div>
                        <h4 style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 700; color: #FFF; margin-bottom: 4px;">Need custom architectural assistance?</h4>
                        <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">Our on-call Security Operations Center (SOC) engineers respond within 15 minutes.</p>
                    </div>
                    <button class="btn btn-secondary" onclick="window.showToast('Support priority ticket #8942 opened with CISO escalation queue.', 'success')">
                        💬 Open SOC Priority Ticket
                    </button>
                </div>
            </div>
        `;
    }
};

window.HelpCenterPage = HelpCenterPage;
