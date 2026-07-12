/* ==========================================================================
   SECUREOPS // Notification Center Page (`pages/notificationsPage.js`)
   ========================================================================== */

const NotificationsPage = {
    render() {
        return `
            <div style="display: flex; flex-direction: column; gap: 24px;">
                <!-- Header -->
                <div class="flex-between flex-wrap" style="gap: 16px;">
                    <div>
                        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: #FFF; margin-bottom: 4px;">
                            Autonomous Alert & Notification Hub
                        </h2>
                        <p style="color: var(--text-secondary); font-size: 0.95rem;">
                            Real-time edge notifications, vulnerability alerts, and security pipeline events across all monitored workspaces.
                        </p>
                    </div>

                    <div style="display: flex; gap: 12px;">
                        <button class="btn btn-secondary" onclick="window.showToast('Test webhook alert dispatched to Slack #security-ops channel.', 'info')">
                            🔔 Send Test Webhook Alert
                        </button>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 2.2fr 1fr; gap: 24px; align-items: start;">
                    <!-- Notification Feed List Area -->
                    <div id="notif-page-list"></div>

                    <!-- Alert Routing & Webhook Integrations Sidebar -->
                    <div class="glass-card" style="padding: 24px; display: flex; flex-direction: column; gap: 20px;">
                        <div>
                            <h3 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700; color: #FFF; margin-bottom: 4px;">Alert Routing Channels</h3>
                            <p style="font-size: 0.82rem; color: var(--text-muted);">Configure external destinations for high and critical CVE triggers.</p>
                        </div>

                        <div style="display: flex; flex-direction: column; gap: 14px;">
                            <div class="flex-between" style="border-bottom: 1px solid var(--glass-border); padding-bottom: 12px;">
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <span style="font-size: 1.3rem;">💬</span>
                                    <div>
                                        <div style="font-weight: 600; font-size: 0.9rem; color: #FFF;">Slack #security-ops</div>
                                        <div style="font-size: 0.75rem; color: var(--neon-green);">Connected (Active)</div>
                                    </div>
                                </div>
                                <input type="checkbox" checked style="accent-color: var(--primary-cyan); cursor: pointer;" />
                            </div>

                            <div class="flex-between" style="border-bottom: 1px solid var(--glass-border); padding-bottom: 12px;">
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <span style="font-size: 1.3rem;">🚨</span>
                                    <div>
                                        <div style="font-weight: 600; font-size: 0.9rem; color: #FFF;">PagerDuty Incident Escalation</div>
                                        <div style="font-size: 0.75rem; color: var(--alert-red);">Critical severity only</div>
                                    </div>
                                </div>
                                <input type="checkbox" checked style="accent-color: var(--primary-cyan); cursor: pointer;" />
                            </div>

                            <div class="flex-between" style="border-bottom: 1px solid var(--glass-border); padding-bottom: 12px;">
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <span style="font-size: 1.3rem;">📧</span>
                                    <div>
                                        <div style="font-weight: 600; font-size: 0.9rem; color: #FFF;">Daily Email Security Digest</div>
                                        <div style="font-size: 0.75rem; color: var(--text-muted);">08:00 UTC Delivery</div>
                                    </div>
                                </div>
                                <input type="checkbox" checked style="accent-color: var(--primary-cyan); cursor: pointer;" />
                            </div>

                            <div class="flex-between">
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <span style="font-size: 1.3rem;">⚡</span>
                                    <div>
                                        <div style="font-weight: 600; font-size: 0.9rem; color: #FFF;">Jira Cloud Ticket Auto-Creation</div>
                                        <div style="font-size: 0.75rem; color: var(--text-muted);">Paused by admin</div>
                                    </div>
                                </div>
                                <input type="checkbox" style="accent-color: var(--primary-cyan); cursor: pointer;" />
                            </div>
                        </div>

                        <button class="btn btn-secondary btn-sm" onclick="window.showToast('Routing channels updated successfully.', 'success')" style="width: 100%; justify-content: center;">
                            Save Routing Preferences
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    afterRender() {
        const container = document.getElementById('notif-page-list');
        if (container && window.NotificationCenter) {
            window.NotificationCenter.render(container, 'all');
        }
    }
};

window.NotificationsPage = NotificationsPage;
