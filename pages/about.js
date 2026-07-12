/* ==========================================================================
   SECUREOPS // About & Architectural Vision (`pages/about.js`)
   ========================================================================== */

const AboutPage = {
    render() {
        return `
            <div style="display: flex; flex-direction: column; gap: 32px; max-width: 1000px; margin: 0 auto;">
                <!-- Hero Banner -->
                <div class="glass-card" style="padding: 40px; text-align: center; border-top: 3px solid var(--primary-cyan); background: linear-gradient(135deg, rgba(0,240,255,0.08), rgba(138,43,226,0.12));">
                    <div style="width: 72px; height: 72px; border-radius: 18px; background: linear-gradient(135deg, var(--primary-cyan), var(--cyber-violet)); display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-size: 2.8rem; font-weight: 900; color: #FFF; margin: 0 auto 20px; box-shadow: 0 0 35px rgba(0, 240, 255, 0.4);">
                        S
                    </div>
                    <span class="badge badge-secure" style="margin-bottom: 12px;">S E C U R E O P S   //   O R I G I N   &   M I S S I O N</span>
                    <h1 style="font-family: var(--font-heading); font-size: 2.6rem; font-weight: 900; color: #FFF; margin-bottom: 16px;">
                        Engineering Autonomous Security at the Pulse of Development
                    </h1>
                    <p style="color: var(--text-secondary); font-size: 1.15rem; line-height: 1.7; max-width: 760px; margin: 0 auto;">
                        Traditional application security tools are slow, clunky, and wake up weeks after insecure code has already been deployed to production. SECUREOPS was born out of a simple engineering mandate: <strong>embed autonomous AI guardrails directly into the developer workflow in sub-20 milliseconds.</strong>
                    </p>
                </div>

                <!-- 4 Pillars Grid -->
                <div>
                    <h2 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: #FFF; margin-bottom: 20px; text-align: center;">
                        The Four Pillars of SECUREOPS Architecture
                    </h2>

                    <div class="grid-2" style="gap: 20px;">
                        <div class="glass-card card-3d" style="padding: 28px; border-left: 4px solid var(--primary-cyan);">
                            <span style="font-size: 2rem; margin-bottom: 12px; display: inline-block;">⚡</span>
                            <h3 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: #FFF; margin-bottom: 8px;">1. Sub-20ms Autonomous Edge Guardrails</h3>
                            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                                By running static AST checks and heuristic pattern models directly on edge cloud proxies, SECUREOPS intercepts credential leaks and SQLi vectors before git commits ever reach upstream servers.
                            </p>
                        </div>

                        <div class="glass-card card-3d" style="padding: 28px; border-left: 4px solid var(--neon-green);">
                            <span style="font-size: 2rem; margin-bottom: 12px; display: inline-block;">🐙</span>
                            <h3 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: #FFF; margin-bottom: 8px;">2. Zero-Trust Git Interception</h3>
                            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                                We never assume inside network trust. Every pull request triggered via GitHub Enterprise or GitLab webhooks must verify its SHA-256 integrity and pass all 4 scanner engines prior to CI/CD merge.
                            </p>
                        </div>

                        <div class="glass-card card-3d" style="padding: 28px; border-left: 4px solid var(--cyber-violet);">
                            <span style="font-size: 2rem; margin-bottom: 12px; display: inline-block;">💡</span>
                            <h3 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: #FFF; margin-bottom: 8px;">3. Autonomous AI Auto-Remediation</h3>
                            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                                Instead of just reporting vulnerabilities and creating ticket spam, our generative AI engine inspects the AST context, generates the exact secure code fix, and opens verified pull requests automatically.
                            </p>
                        </div>

                        <div class="glass-card card-3d" style="padding: 28px; border-left: 4px solid var(--warning-amber);">
                            <span style="font-size: 2rem; margin-bottom: 12px; display: inline-block;">🔐</span>
                            <h3 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: #FFF; margin-bottom: 8px;">4. Verifiable Merkle Audit Trail</h3>
                            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                                For compliance auditors (SOC 2, ISO 27001, PCI-DSS), all telemetry, token revocations, and IAM role updates are recorded into an immutable SHA-256 hash sequence with instant root verification.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Footer Summary Box -->
                <div class="glass-card" style="padding: 28px; text-align: center; border-top: 1px solid var(--glass-border);">
                    <h3 style="font-family: var(--font-heading); font-size: 1.2rem; font-weight: 700; color: #FFF; margin-bottom: 8px;">Handwritten Zero-Dependency Engineering</h3>
                    <p style="font-size: 0.9rem; color: var(--text-secondary); max-width: 650px; margin: 0 auto 20px; line-height: 1.6;">
                        This platform demonstrates technical mastery across modern Vanilla HTML5, CSS3 ($20M startup design tokens, glassmorphism, micro-animations), and modular Object-Oriented JavaScript without heavy client frameworks.
                    </p>
                    <div style="display: flex; justify-content: center; gap: 16px;">
                        <a href="#/roadmap" class="btn btn-primary" style="padding: 12px 28px;">🎯 View Engineering Roadmap</a>
                        <a href="#/documentation" class="btn btn-secondary" style="padding: 12px 28px;">📖 Architecture Docs</a>
                    </div>
                </div>
            </div>
        `;
    }
};

window.AboutPage = AboutPage;
