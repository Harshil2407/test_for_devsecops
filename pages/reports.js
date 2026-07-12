/* ==========================================================================
   SECUREOPS // Compliance & Executive Reports (`pages/reports.js`)
   ========================================================================== */

const ReportsPage = {
    render() {
        const state = AppState ? AppState.getState() : { metrics: {} };
        const { metrics } = state;

        const frameworks = [
            {
                id: "soc2",
                title: "SOC 2 Type II Autonomous Audit",
                desc: "Continuous verification of Trust Services Criteria (Security, Availability, and Confidentiality) across all 18 repositories and edge proxies.",
                status: "COMPLIANT",
                score: "99.4%",
                badge: "badge-secure",
                lastGenerated: "Today, 06:00 UTC",
                jsonPayload: {
                    report_id: "soc2-type2-live-2026",
                    timestamp: new Date().toISOString(),
                    auditor: "SECUREOPS AI Engine",
                    trust_criteria_score: 99.4,
                    encryption_in_transit: "ENFORCED (TLS 1.3)",
                    access_control: "RBAC + mTLS verified",
                    unresolved_critical_cves: 0
                }
            },
            {
                id: "iso27001",
                title: "ISO/IEC 27001 Cloud Security",
                desc: "Information Security Management System (ISMS) alignment covering cryptographic vault proxies, container build layers, and secret handling.",
                status: "COMPLIANT",
                score: "98.1%",
                badge: "badge-secure",
                lastGenerated: "Yesterday, 18:00 UTC",
                jsonPayload: {
                    report_id: "iso27001-cloud-2026",
                    timestamp: new Date().toISOString(),
                    scope: "All AWS EKS / ArgoCD Clusters",
                    key_rotation_policy: "ACTIVE (30-day interval)",
                    incident_response_slas: "Sub-18ms autonomous edge block"
                }
            },
            {
                id: "owasp-top10",
                title: "OWASP Top 10 API Guardrails",
                desc: "Dynamic and static assessment against Broken Object Level Authorization (BOLA), SQL injection, and SSRF vulnerabilities across API endpoints.",
                status: "ACTION REQUIRED",
                score: "88.5%",
                badge: "badge-warning",
                lastGenerated: "Today, 11:20 UTC",
                jsonPayload: {
                    report_id: "owasp-api-top10-2026",
                    timestamp: new Date().toISOString(),
                    target_repos: ["api-gateway", "auth-service", "payment-processor"],
                    open_findings: [
                        { cwe: "CWE-89 (SQL Injection)", severity: "Critical", status: "Open" },
                        { cwe: "CWE-918 (SSRF)", severity: "High", status: "Open" }
                    ]
                }
            },
            {
                id: "pci-dss",
                title: "PCI-DSS v4.0 Payment Adapter Audit",
                desc: "Payment Card Industry data security standards verification focused strictly on the `payment-processor` repository and billing workers.",
                status: "CRITICAL FINDING",
                score: "74.0%",
                badge: "badge-critical",
                lastGenerated: "Today, 14:22 UTC",
                jsonPayload: {
                    report_id: "pci-dss-v4-audit-2026",
                    timestamp: new Date().toISOString(),
                    target: "payment-processor",
                    finding: "Hardcoded AWS IAM access key found in workers/aws_billing_sync.py",
                    remediation: "IAM Token Revoked via Autonomous Guardrail"
                }
            }
        ];

        return `
            <div style="display: flex; flex-direction: column; gap: 24px;">
                <!-- Header -->
                <div class="flex-between flex-wrap" style="gap: 16px;">
                    <div>
                        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: #FFF; margin-bottom: 4px;">
                            Executive Compliance & Audit Reports
                        </h2>
                        <p style="color: var(--text-secondary); font-size: 0.95rem;">
                            Export real-time compliance matrices, verify regulatory adherence, and inspect raw cryptographic JSON audit proofs.
                        </p>
                    </div>

                    <button class="btn btn-primary" onclick="window.showToast('Full Governance & Audit Bundle (All Frameworks) compiled into ZIP archive.', 'success')">
                        📦 Export Full Compliance ZIP
                    </button>
                </div>

                <!-- Framework Cards Grid -->
                <div class="grid-2" style="gap: 20px;">
                    ${frameworks.map(f => `
                        <div class="scanner-card" style="border-top: 3px solid ${f.status === 'COMPLIANT' ? 'var(--neon-green)' : f.status === 'ACTION REQUIRED' ? 'var(--warning-amber)' : 'var(--alert-red)'};">
                            <div class="scanner-card-header">
                                <div style="display: flex; flex-direction: column;">
                                    <span style="font-weight: 700; font-size: 1.15rem; color: #FFF;">${f.title}</span>
                                    <span style="font-size: 0.75rem; color: var(--text-muted);">Score: <strong style="color: var(--primary-cyan); font-family: var(--font-mono);">${f.score}</strong> // Last verified: ${f.lastGenerated}</span>
                                </div>
                                <span class="badge ${f.badge}">${f.status}</span>
                            </div>

                            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; flex: 1;">${f.desc}</p>

                            <div class="flex-between" style="border-top: 1px solid var(--glass-border); padding-top: 16px; margin-top: 4px;">
                                <button class="btn btn-secondary btn-sm preview-json-btn" data-json='${JSON.stringify(f.jsonPayload)}' data-title="${f.title}">
                                    👁️ Preview JSON Manifest
                                </button>
                                <button class="btn btn-primary btn-sm download-pdf-btn" data-title="${f.title}">
                                    📄 Download PDF Report
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Executive Risk Matrix Summary -->
                <div class="glass-card" style="padding: 24px;">
                    <div class="flex-between" style="margin-bottom: 16px;">
                        <div>
                            <h3 style="font-family: var(--font-heading); font-size: 1.2rem; font-weight: 700; color: #FFF;">Executive Risk Matrix & Guardrail SLAs</h3>
                            <span style="font-size: 0.8rem; color: var(--text-muted);">Real-time governance standards enforced across ${metrics.totalRepositories || 18} microservices</span>
                        </div>
                        <span class="badge badge-secure">● SLAs Met</span>
                    </div>

                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>SLA Guardrail Metric</th>
                                <th>Target Threshold</th>
                                <th>Current Telemetry</th>
                                <th>Enforcement Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Pre-Commit SAST Scan Time</strong></td>
                                <td style="font-family: var(--font-mono);">&lt; 45 seconds</td>
                                <td style="font-family: var(--font-mono); color: var(--neon-green);">18.4s average</td>
                                <td><span class="badge badge-secure">PASSED</span></td>
                            </tr>
                            <tr>
                                <td><strong>Secret Exfiltration Interception</strong></td>
                                <td style="font-family: var(--font-mono);">0 Exposed Secrets</td>
                                <td style="font-family: var(--font-mono); color: var(--primary-cyan);">1 Revoked Autonomous</td>
                                <td><span class="badge badge-secure">ENFORCED</span></td>
                            </tr>
                            <tr>
                                <td><strong>Internal mTLS Encryption</strong></td>
                                <td style="font-family: var(--font-mono);">100% Microservices</td>
                                <td style="font-family: var(--font-mono); color: var(--warning-amber);">94.4% (1 In Progress)</td>
                                <td><span class="badge badge-warning">TRACKING</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    afterRender() {
        const previewBtns = document.querySelectorAll('.preview-json-btn');
        previewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const title = btn.getAttribute('data-title');
                const rawJson = JSON.parse(btn.getAttribute('data-json') || '{}');
                const formattedJson = JSON.stringify(rawJson, null, 4);

                showModal({
                    title: `Audit Manifest // ${title}`,
                    confirmText: "Copy JSON Manifest",
                    bodyHtml: `
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <p style="font-size: 0.85rem; color: var(--text-secondary);">This cryptographically signed JSON manifest serves as verifiable audit proof for compliance auditors.</p>
                            <pre style="background: #06070B; border: 1px solid var(--glass-border); border-radius: var(--radius-md); padding: 16px; font-family: var(--font-mono); font-size: 0.85rem; color: var(--primary-cyan); max-height: 340px; overflow: auto; line-height: 1.6;">${formattedJson}</pre>
                        </div>
                    `,
                    onConfirm: () => {
                        window.showToast("JSON audit manifest copied to clipboard!", "info");
                    }
                });
            });
        });

        const downloadBtns = document.querySelectorAll('.download-pdf-btn');
        downloadBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const title = btn.getAttribute('data-title').replace(/\s+/g, '_');
                window.showToast(`Compiling ${title}_2026.pdf...`, "info");
                setTimeout(() => {
                    window.showToast(`✅ ${title}_2026.pdf downloaded successfully!`, "success");
                }, 1200);
            });
        });
    }
};

window.ReportsPage = ReportsPage;
