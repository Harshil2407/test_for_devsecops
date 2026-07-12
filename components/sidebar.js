/* ==========================================================================
   SECUREOPS // Collapsible Sidebar Component (`components/sidebar.js`)
   ========================================================================== */

function renderSidebar() {
    const sidebarEl = document.getElementById('sidebar');
    if (!sidebarEl) return;

    const unreadCount = AppState ? AppState.getUnreadCount() : 3;

    sidebarEl.innerHTML = `
        <div class="sidebar-header">
            <a href="#/" class="sidebar-brand">
                <div style="width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, var(--primary-cyan), var(--cyber-violet)); display: flex; align-items: center; justify-content: center; font-weight: 900; color: #FFF; box-shadow: 0 0 16px rgba(0,240,255,0.4);">
                    S
                </div>
                <span>SECUREOPS</span>
            </a>
        </div>

        <nav class="sidebar-nav">
            <div class="nav-section-title">Overview</div>
            <a href="#/" class="nav-item">
                <div class="icon">🎬</div>
                <span>Story Trailer</span>
            </a>
            <a href="#/dashboard" class="nav-item active">
                <div class="icon">⚡</div>
                <span>Dashboard</span>
            </a>
            <a href="#/repositories" class="nav-item">
                <div class="icon">📦</div>
                <span>Repositories</span>
            </a>

            <div class="nav-section-title">Continuous Security</div>
            <a href="#/scan-center" class="nav-item">
                <div class="icon">🛡️</div>
                <span>Scan Center</span>
            </a>
            <a href="#/scan-history" class="nav-item">
                <div class="icon">🕒</div>
                <span>Scan History</span>
            </a>
            <a href="#/vulnerabilities" class="nav-item">
                <div class="icon">🐛</div>
                <span>Vulnerabilities</span>
            </a>
            <a href="#/pipeline" class="nav-item">
                <div class="icon">🚀</div>
                <span>CI/CD Pipeline</span>
            </a>

            <div class="nav-section-title">Governance & Analytics</div>
            <a href="#/reports" class="nav-item">
                <div class="icon">📊</div>
                <span>Reports & Compliance</span>
            </a>
            <a href="#/audit-logs" class="nav-item">
                <div class="icon">📜</div>
                <span>Audit Logs</span>
            </a>
            <a href="#/notifications" class="nav-item">
                <div class="icon">🔔</div>
                <span>Notifications</span>
                ${unreadCount > 0 ? `<span id="sidebar-notif-badge" style="margin-left: auto; background: var(--alert-red); color: #FFF; font-size: 0.7rem; font-weight: 700; padding: 2px 6px; border-radius: 99px;">${unreadCount}</span>` : ''}
            </a>

            <div class="nav-section-title">Administration</div>
            <a href="#/profile" class="nav-item">
                <div class="icon">👤</div>
                <span>User Profile</span>
            </a>
            <a href="#/admin" class="nav-item">
                <div class="icon">⚙️</div>
                <span>Admin Control</span>
            </a>
            <a href="#/settings" class="nav-item">
                <div class="icon">🛠️</div>
                <span>Portal Settings</span>
            </a>
            <a href="#/roadmap" class="nav-item">
                <div class="icon">🎯</div>
                <span>Feature Backlog</span>
            </a>
        </nav>

        <div class="sidebar-footer">
            <div style="display: flex; align-items: center; gap: 10px; overflow: hidden;">
                <img src="${AppState ? AppState.getState().currentUser.avatar : ''}" style="width: 32px; height: 32px; border-radius: 50%; border: 1.5px solid var(--primary-cyan); object-fit: cover;" alt="Avatar" />
                <div style="display: flex; flex-direction: column; overflow: hidden; white-space: nowrap;">
                    <span style="font-size: 0.85rem; font-weight: 600; color: #FFF;">${AppState ? AppState.getState().currentUser.name : 'Architect'}</span>
                    <span style="font-size: 0.7rem; color: var(--text-muted);">Principal DevSecOps</span>
                </div>
            </div>
            <button class="sidebar-toggle-btn" id="sidebar-toggle" title="Toggle Sidebar">
                ◀
            </button>
        </div>
    `;

    // Toggle Sidebar Event
    const toggleBtn = document.getElementById('sidebar-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            sidebarEl.classList.toggle('collapsed');
            toggleBtn.textContent = sidebarEl.classList.contains('collapsed') ? '▶' : '◀';
        });
    }
}

window.renderSidebar = renderSidebar;
