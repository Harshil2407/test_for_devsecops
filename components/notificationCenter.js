/* ==========================================================================
   SECUREOPS // Notification Center (`components/notificationCenter.js`)
   ========================================================================== */

const NotificationCenter = {
    render(containerEl, filter = "all") {
        if (!containerEl) return;
        const allNotifs = AppState ? AppState.getNotifications() : [];
        let filtered = allNotifs;
        if (filter === "unread") filtered = allNotifs.filter(n => !n.read);
        if (filter === "critical") filtered = allNotifs.filter(n => n.type === "critical" || n.type === "warning");

        containerEl.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 20px;">
                <div class="flex-between">
                    <div style="display: flex; gap: 12px;">
                        <button class="btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}" onclick="window.NotificationCenter.render(document.getElementById('notif-page-list'), 'all')">All Alerts (${allNotifs.length})</button>
                        <button class="btn btn-sm ${filter === 'unread' ? 'btn-primary' : 'btn-secondary'}" onclick="window.NotificationCenter.render(document.getElementById('notif-page-list'), 'unread')">Unread (${allNotifs.filter(n => !n.read).length})</button>
                        <button class="btn btn-sm ${filter === 'critical' ? 'btn-primary' : 'btn-secondary'}" onclick="window.NotificationCenter.render(document.getElementById('notif-page-list'), 'critical')">Critical & Warnings</button>
                    </div>

                    <button class="btn btn-secondary btn-sm" onclick="AppState.markAllNotificationsRead(); window.NotificationCenter.render(document.getElementById('notif-page-list'), '${filter}'); renderNavbar(); renderSidebar();">
                        ✓ Mark All as Read
                    </button>
                </div>

                <div style="display: flex; flex-direction: column; gap: 14px;">
                    ${filtered.length === 0 ? `
                        <div class="glass-card" style="padding: 40px; text-align: center; color: var(--text-secondary);">
                            No notifications matching this filter. You are all caught up! ✨
                        </div>
                    ` : filtered.map(n => `
                        <div class="glass-card" style="padding: 20px; border-left: 4px solid ${n.type === 'critical' ? 'var(--alert-red)' : n.type === 'warning' ? 'var(--warning-amber)' : 'var(--primary-cyan)'}; display: flex; justify-content: space-between; align-items: flex-start; gap: 20px;">
                            <div style="display: flex; gap: 16px; align-items: flex-start;">
                                <span style="font-size: 1.5rem;">${n.type === 'critical' ? '🚨' : n.type === 'warning' ? '⚠️' : n.type === 'success' ? '✅' : '💡'}</span>
                                <div style="display: flex; flex-direction: column; gap: 6px;">
                                    <div style="display: flex; align-items: center; gap: 12px;">
                                        <span style="font-size: 1rem; font-weight: 700; color: var(--text-primary);">${n.title}</span>
                                        ${!n.read ? `<span class="badge" style="background: var(--primary-cyan); color: #08090C;">NEW</span>` : ''}
                                    </div>
                                    <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">${n.message}</p>
                                    <span style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono); margin-top: 4px;">${n.time}</span>
                                </div>
                            </div>

                            <button class="btn btn-secondary btn-sm" onclick="window.showToast('Notification dismissed', 'info')" title="Dismiss">✕</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
};

window.NotificationCenter = NotificationCenter;
