/* ==========================================================================
   SECUREOPS // Architecture & Developer Documentation (`pages/documentation.js`)
   ========================================================================== */

const DocumentationPage = {
    render() {
        return `
            <div style="display: flex; flex-direction: column; gap: 28px; max-width: 1050px; margin: 0 auto;">
                <!-- Header -->
                <div class="glass-card" style="padding: 32px; border-top: 3px solid var(--primary-cyan);">
                    <span class="badge badge-secure" style="margin-bottom: 12px;">D E V E L O P E R   G U I D E   //   V 1 . 0 . 0</span>
                    <h2 style="font-family: var(--font-heading); font-size: 2.2rem; font-weight: 800; color: #FFF; margin-bottom: 8px;">
                        SECUREOPS CLI & CI/CD Integration Guide
                    </h2>
                    <p style="color: var(--text-secondary); font-size: 1rem; line-height: 1.6;">
                        Embed autonomous SAST, container layer validation, and secret scanning directly into local pre-commit hooks and GitHub Actions workflows.
                    </p>
                </div>

                <!-- Section 1: Local CLI Installation -->
                <div class="glass-card" style="padding: 28px; display: flex; flex-direction: column; gap: 16px;">
                    <div class="flex-between">
                        <h3 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: #FFF;">1. Local Developer CLI (&lt;code&gt;secureops-cli&lt;/code&gt;)</h3>
                        <span class="badge badge-secure">Cross-Platform (Linux/macOS/Win)</span>
                    </div>
                    <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                        Run instantaneous pre-commit checks locally before executing &lt;code&gt;git push&lt;/code&gt; to intercept hardcoded tokens and high-CVSS flaws on your dev machine.
                    </p>
                    <div style="background: #06070B; border: 1px solid var(--glass-border); border-radius: var(--radius-md); padding: 20px; font-family: var(--font-mono); font-size: 0.88rem; color: var(--primary-cyan); line-height: 1.8;">
                        <div style="color: var(--text-muted); font-size: 0.8rem;"># 1. Install via npm global repository or standalone binary</div>
                        <div><span class="prompt">$</span> npm install -g @secureops/cli --registry=https://npm.secureops.dev</div>
                        <div style="margin-top: 10px; color: var(--text-muted); font-size: 0.8rem;"># 2. Authenticate using your Personal Security Token (generated via #/profile)</div>
                        <div><span class="prompt">$</span> secureops auth login --token=secops_live_94f8a1...c490e</div>
                        <div style="margin-top: 10px; color: var(--text-muted); font-size: 0.8rem;"># 3. Install pre-commit git hook into local repository</div>
                        <div><span class="prompt">$</span> secureops hook install --mode=autonomous-block</div>
                    </div>
                </div>

                <!-- Section 2: GitHub Actions Manifest -->
                <div class="glass-card" style="padding: 28px; display: flex; flex-direction: column; gap: 16px;">
                    <div class="flex-between">
                        <h3 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: #FFF;">2. GitHub Actions Zero-Trust Workflow (`.github/workflows/secureops.yml`)</h3>
                        <button class="btn btn-secondary btn-sm" onclick="window.showToast('YAML workflow manifest copied to clipboard!', 'info')">📋 Copy Manifest YAML</button>
                    </div>
                    <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                        Drop this manifest into any microservice repository to enable autonomous pull request blocking and AI fix branches.
                    </p>
                    <pre style="background: #06070B; border: 1px solid var(--glass-border); border-radius: var(--radius-md); padding: 20px; font-family: var(--font-mono); font-size: 0.85rem; color: var(--neon-green); line-height: 1.6; overflow-x: auto;">name: SECUREOPS Autonomous Guardrail Suite

on:
  pull_request:
    branches: [ "main", "staging" ]

jobs:
  security-gate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Target Branch
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Execute SECUREOPS 4-Engine Suite
        uses: secureops/action-guardrail@v1
        with:
          api-key: \${{ secrets.SECOPS_RUNNER_KEY }}
          fail-on-cvss-threshold: "7.0"
          enable-auto-ai-patch: true
          container-image-target: "api-gateway:latest"</pre>
                </div>

                <!-- Section 3: REST API Reference -->
                <div class="glass-card" style="padding: 28px; display: flex; flex-direction: column; gap: 16px;">
                    <h3 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: #FFF;">3. REST API & Webhook Endpoints</h3>
                    <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                        All dashboard charts and terminal triggers communicate via secured JSON endpoints authenticated with Bearer JWT or API tokens.
                    </p>

                    <div style="display: flex; flex-direction: column; gap: 12px; font-family: var(--font-mono); font-size: 0.88rem;">
                        <div class="card" style="padding: 14px; border: 1px solid var(--glass-border); border-radius: var(--radius-sm); display: flex; align-items: center; gap: 16px;">
                            <span class="badge" style="background: var(--neon-green); color: #08090C; font-weight: 800; width: 60px; text-align: center;">POST</span>
                            <span style="color: #FFF;">/api/v1/scans/trigger</span>
                            <span style="color: var(--text-muted); font-family: var(--font-base); font-size: 0.8rem; margin-left: auto;">Dispatches autonomous 4-engine scan</span>
                        </div>

                        <div class="card" style="padding: 14px; border: 1px solid var(--glass-border); border-radius: var(--radius-sm); display: flex; align-items: center; gap: 16px;">
                            <span class="badge" style="background: var(--primary-cyan); color: #08090C; font-weight: 800; width: 60px; text-align: center;">GET</span>
                            <span style="color: #FFF;">/api/v1/repos/{id}/vulnerabilities</span>
                            <span style="color: var(--text-muted); font-family: var(--font-base); font-size: 0.8rem; margin-left: auto;">Returns open CVE/CWE line snippets</span>
                        </div>

                        <div class="card" style="padding: 14px; border: 1px solid var(--glass-border); border-radius: var(--radius-sm); display: flex; align-items: center; gap: 16px;">
                            <span class="badge" style="background: var(--cyber-violet); color: #FFF; font-weight: 800; width: 60px; text-align: center;">POST</span>
                            <span style="color: #FFF;">/api/v1/remediate/pr</span>
                            <span style="color: var(--text-muted); font-family: var(--font-base); font-size: 0.8rem; margin-left: auto;">Generates autonomous AI patch pull request</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

window.DocumentationPage = DocumentationPage;
