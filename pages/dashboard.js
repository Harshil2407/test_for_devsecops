/* ==========================================================================
   SECUREOPS // Executive DevSecOps Dashboard (`pages/dashboard.js`)
   ========================================================================== */

const DashboardPage = {
    render() {
        const state = AppState ? AppState.getState() : { metrics: {}, chartData: {}, repositories: [] };
        const { metrics, chartData, repositories } = state;

        return `
            <div style="display: flex; flex-direction: column; gap: 28px;">
                <!-- 1. Executive Banner & Actions -->
                <div class="flex-between flex-wrap" style="gap: 16px;">
                    <div>
                        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: #FFF; margin-bottom: 4px;">
                            DevSecOps Pulse & Intelligence
                        </h2>
                        <p style="color: var(--text-secondary); font-size: 0.95rem;">
                            Real-time autonomous guardrail telemetry across ${metrics.totalRepositories || 18} active codebases.
                        </p>
                    </div>

                    <div style="display: flex; gap: 12px;">
                        <button class="btn btn-secondary" onclick="window.location.hash = '#/reports'">
                            📑 Download Executive SOC2 Report
                        </button>
                        <button class="btn btn-primary" onclick="window.location.hash = '#/scan-center'">
                            🚀 Trigger Full Workspace Scan
                        </button>
                    </div>
                </div>

                <!-- 2. Metric Stat Cards -->
                <div class="grid-4">
                    <div class="stat-card">
                        <div class="flex-between">
                            <span class="label">Repositories Protected</span>
                            <span style="font-size: 1.4rem;">📦</span>
                        </div>
                        <div class="value">${metrics.totalRepositories || 18}</div>
                        <div class="trend positive">▲ 100% Active Hooks</div>
                    </div>

                    <div class="stat-card">
                        <div class="flex-between">
                            <span class="label">Live Autonomous Scans</span>
                            <span style="font-size: 1.4rem;">⚡</span>
                        </div>
                        <div class="value" style="color: var(--primary-cyan);">${metrics.activeScans || 3}</div>
                        <div class="trend positive">▲ ${metrics.scansToday || 142} Scans Executed Today</div>
                    </div>

                    <div class="stat-card">
                        <div class="flex-between">
                            <span class="label">Critical Findings (Open)</span>
                            <span style="font-size: 1.4rem;">🚨</span>
                        </div>
                        <div class="value" style="color: var(--alert-red);">${metrics.criticalVulnerabilities || 5}</div>
                        <div class="trend negative">▼ 2 AI Fixes Pending Approval</div>
                    </div>

                    <div class="stat-card" style="background: linear-gradient(135deg, rgba(0,240,255,0.06), rgba(138,43,226,0.08)); border-color: rgba(0,240,255,0.3);">
                        <div class="flex-between">
                            <span class="label">Security & Compliance Score</span>
                            <span style="font-size: 1.4rem;">🛡️</span>
                        </div>
                        <div class="value" style="color: #FFF;">${metrics.securityScore || 94}<span style="font-size: 1.2rem; color: var(--text-muted);">/100</span></div>
                        <div class="trend positive">▲ +3.4% vs Last Week</div>
                    </div>
                </div>

                <!-- 3. Interactive Charts Grid -->
                <div style="display: grid; grid-template-columns: 2fr 1.3fr; gap: 24px;">
                    <!-- Line Chart: Weekly Scans & Threats Neutralized -->
                    <div class="glass-card" style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
                        <div class="flex-between">
                            <div>
                                <h3 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700; color: #FFF;">Weekly Autonomous Scan Volume</h3>
                                <span style="font-size: 0.8rem; color: var(--text-muted);">Scans triggered via git push webhooks & scheduled crons</span>
                            </div>
                            <span class="badge badge-secure">Live Telemetry</span>
                        </div>
                        <div id="chart-weekly-scans" style="width: 100%; min-height: 240px;"></div>
                    </div>

                    <!-- Donut Chart: Severity Distribution -->
                    <div class="glass-card" style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
                        <div class="flex-between">
                            <div>
                                <h3 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700; color: #FFF;">Vulnerability Severity</h3>
                                <span style="font-size: 0.8rem; color: var(--text-muted);">Distribution by CVSS 3.1 criteria</span>
                            </div>
                            <a href="#/vulnerabilities" style="font-size: 0.8rem; color: var(--primary-cyan); text-decoration: none;">View All →</a>
                        </div>
                        <div id="chart-severity-donut" style="width: 100%; min-height: 240px; display: flex; align-items: center; justify-content: center;"></div>
                    </div>
                </div>

                <!-- 4. Quick Repository Status Feed -->
                <div class="glass-card" style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
                    <div class="flex-between">
                        <div>
                            <h3 style="font-family: var(--font-heading); font-size: 1.2rem; font-weight: 700; color: #FFF;">High-Priority Repository Status</h3>
                            <span style="font-size: 0.8rem; color: var(--text-muted);">Top monitored microservices & security posture</span>
                        </div>
                        <button class="btn btn-secondary btn-sm" onclick="window.location.hash = '#/repositories'">View All ${repositories.length} Repositories →</button>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                        ${repositories.slice(0, 3).map(r => `
                            <div class="card" style="padding: 16px; border: 1px solid var(--card-border); border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 12px;">
                                <div class="flex-between">
                                    <span style="font-weight: 700; color: #FFF;">📦 ${r.name}</span>
                                    <span class="badge ${r.status === 'Secure' ? 'badge-secure' : r.status === 'Action Required' ? 'badge-warning' : 'badge-critical'}">${r.status}</span>
                                </div>
                                <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4; min-height: 36px;">${r.description}</p>
                                <div class="flex-between" style="border-top: 1px solid var(--glass-border); padding-top: 10px; font-size: 0.8rem;">
                                    <span style="color: var(--text-muted);">Language: <strong style="color: var(--text-primary);">${r.language}</strong></span>
                                    <span style="font-family: var(--font-mono); color: var(--primary-cyan); font-weight: 700;">Score: ${r.score}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    afterRender() {
        const state = AppState ? AppState.getState() : {};
        const { chartData } = state;

        if (window.SecureCharts && chartData) {
            SecureCharts.renderAreaChart(document.getElementById('chart-weekly-scans'), {
                labels: chartData.weeklyScans?.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                values: chartData.weeklyScans?.values || [42, 68, 95, 112, 142, 38, 54],
                color: '#00F0FF',
                height: 230
            });

            SecureCharts.renderDonutChart(document.getElementById('chart-severity-donut'), {
                items: chartData.severityBreakdown || [
                    { label: 'Critical', value: 5, color: '#FF2E63' },
                    { label: 'High', value: 12, color: '#FFB800' },
                    { label: 'Medium', value: 28, color: '#00F0FF' }
                ],
                centerLabel: "Security Score",
                centerValue: "94",
                size: 190
            });
        }
    }
};

window.DashboardPage = DashboardPage;
