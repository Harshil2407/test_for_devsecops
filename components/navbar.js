/* ==========================================================================
   SECUREOPS // Top Navbar Component (`components/navbar.js`)
   ========================================================================== */

function renderNavbar() {
    const navbarEl = document.getElementById('navbar');
    if (!navbarEl) return;

    const unreadCount = AppState ? AppState.getUnreadCount() : 3;
    const currentUser = AppState ? AppState.getState().currentUser : { name: "Harshil Architect", avatar: "" };

    navbarEl.innerHTML = `
        <div class="navbar-left">
            <div class="breadcrumbs">
                <a href="#/dashboard" style="color: var(--text-muted); text-decoration: none;">Portal</a>
                <span class="separator">/</span>
                <span id="breadcrumb-current" class="current">Dashboard</span>
            </div>

            <div class="search-bar" style="margin-left: 24px;">
                <span class="search-icon">🔍</span>
                <input type="text" class="form-input" id="navbar-search" placeholder="Search repos, CVEs, pipelines (⌘K)..." autocomplete="off" />
                <div id="search-dropdown" class="glass-card hidden" style="position: absolute; top: 48px; left: 0; width: 360px; max-height: 380px; overflow-y: auto; padding: 12px; z-index: var(--z-dropdown); box-shadow: var(--shadow-lg);">
                    <!-- Dynamic search results -->
                </div>
            </div>
        </div>

        <div class="navbar-right">
            <!-- Theme Toggle Button -->
            <button class="btn btn-secondary btn-sm" id="theme-toggle-btn" title="Toggle Theme/Glow" style="padding: 8px 12px;">
                🌙 / ⚡
            </button>

            <!-- Notifications Drawer Trigger -->
            <div style="position: relative;">
                <button class="btn btn-secondary btn-sm" id="navbar-notif-btn" title="Notifications" style="padding: 8px 14px; position: relative;">
                    🔔
                    ${unreadCount > 0 ? `<span id="navbar-notif-badge" style="position: absolute; top: -6px; right: -6px; background: var(--alert-red); color: #FFF; font-size: 0.65rem; font-weight: 700; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px var(--alert-red);">${unreadCount}</span>` : ''}
                </button>

                <div id="notif-dropdown" class="glass-card hidden" style="position: absolute; top: 46px; right: 0; width: 380px; max-height: 440px; overflow-y: auto; padding: 16px; z-index: var(--z-dropdown); box-shadow: var(--shadow-lg); display: flex; flex-direction: column; gap: 12px;">
                    <!-- Rendered dynamically on click -->
                </div>
            </div>

            <!-- Profile Menu Trigger -->
            <div style="position: relative;">
                <button class="btn btn-secondary btn-sm" id="navbar-profile-btn" style="padding: 6px 12px; gap: 10px; border-color: rgba(0,240,255,0.2);">
                    <img src="${currentUser.avatar}" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover;" alt="Avatar" />
                    <span style="font-size: 0.85rem; font-weight: 600;">${currentUser.name}</span>
                    <span style="font-size: 0.7rem; color: var(--text-muted);">▼</span>
                </button>

                <div id="profile-dropdown" class="glass-card hidden" style="position: absolute; top: 46px; right: 0; width: 220px; padding: 8px; z-index: var(--z-dropdown); box-shadow: var(--shadow-lg); display: flex; flex-direction: column; gap: 4px;">
                    <a href="#/profile" class="nav-item" style="padding: 8px 12px;">👤 My Profile & Tokens</a>
                    <a href="#/settings" class="nav-item" style="padding: 8px 12px;">⚙️ Portal Settings</a>
                    <a href="#/admin" class="nav-item" style="padding: 8px 12px;">🔐 Admin RBAC</a>
                    <div style="height: 1px; background: var(--glass-border); margin: 4px 0;"></div>
                    <a href="#/" class="nav-item" style="padding: 8px 12px; color: var(--text-muted);">🎬 Replay Story Trailer</a>
                    <a href="#/login" class="nav-item" style="padding: 8px 12px; color: var(--alert-red);">🚪 Sign Out</a>
                </div>
            </div>
        </div>
    `;

    // 1. Setup Search Autocomplete
    const searchInput = document.getElementById('navbar-search');
    const searchDropdown = document.getElementById('search-dropdown');
    if (searchInput && searchDropdown) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (!query) {
                searchDropdown.classList.add('hidden');
                return;
            }

            const state = AppState.getState();
            const matchingRepos = state.repositories.filter(r => r.name.toLowerCase().includes(query) || r.language.toLowerCase().includes(query)).slice(0, 3);
            const matchingVulns = state.vulnerabilities.filter(v => v.id.toLowerCase().includes(query) || v.title.toLowerCase().includes(query)).slice(0, 3);

            let html = `<div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; margin-bottom: 8px;">Quick Results</div>`;
            
            if (matchingRepos.length === 0 && matchingVulns.length === 0) {
                html += `<div style="padding: 12px; font-size: 0.85rem; color: var(--text-secondary);">No direct matches found. Try entering full CVE or repo ID.</div>`;
            } else {
                matchingRepos.forEach(r => {
                    html += `
                        <a href="#/repositories" class="nav-item" style="padding: 8px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                            <span>📦 <strong>${r.name}</strong> (${r.language})</span>
                            <span class="badge ${r.status === 'Secure' ? 'badge-secure' : 'badge-critical'}">${r.status}</span>
                        </a>
                    `;
                });
                matchingVulns.forEach(v => {
                    html += `
                        <a href="#/vulnerabilities" class="nav-item" style="padding: 8px; border-radius: 6px; display: flex; flex-direction: column; gap: 2px;">
                            <span style="color: var(--alert-red); font-weight: 700;">🐛 ${v.id} (${v.severity})</span>
                            <span style="font-size: 0.8rem; color: var(--text-secondary); white-space: normal;">${v.title}</span>
                        </a>
                    `;
                });
            }

            searchDropdown.innerHTML = html;
            searchDropdown.classList.remove('hidden');
        });

        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
                searchDropdown.classList.add('hidden');
            }
        });
    }

    // 2. Setup Notification Dropdown
    const notifBtn = document.getElementById('navbar-notif-btn');
    const notifDropdown = document.getElementById('notif-dropdown');
    if (notifBtn && notifDropdown) {
        notifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notifDropdown.classList.toggle('hidden');
            if (!notifDropdown.classList.contains('hidden')) {
                const notifs = AppState.getNotifications();
                notifDropdown.innerHTML = `
                    <div class="flex-between" style="border-bottom: 1px solid var(--glass-border); padding-bottom: 8px;">
                        <span style="font-weight: 700; font-size: 0.95rem;">Notifications</span>
                        <button class="btn btn-secondary btn-sm" id="mark-all-read-btn" style="padding: 4px 8px; font-size: 0.75rem;">Mark All Read</button>
                    </div>
                    ${notifs.map(n => `
                        <div style="padding: 10px; border-radius: 8px; background: ${n.read ? 'transparent' : 'rgba(0,240,255,0.06)'}; border-left: 3px solid ${n.type === 'critical' ? 'var(--alert-red)' : 'var(--primary-cyan)'}; display: flex; flex-direction: column; gap: 4px;">
                            <div class="flex-between">
                                <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary);">${n.title}</span>
                                <span style="font-size: 0.7rem; color: var(--text-muted);">${n.time}</span>
                            </div>
                            <span style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">${n.message}</span>
                        </div>
                    `).join('')}
                    <a href="#/notifications" class="btn btn-secondary btn-sm" style="text-align: center; margin-top: 4px;">View All Alerts & Routing</a>
                `;

                const markReadBtn = document.getElementById('mark-all-read-btn');
                if (markReadBtn) {
                    markReadBtn.addEventListener('click', () => {
                        AppState.markAllNotificationsRead();
                        renderNavbar();
                        renderSidebar();
                    });
                }
            }
        });
    }

    // 3. Setup Profile Dropdown & Theme Toggle
    const profileBtn = document.getElementById('navbar-profile-btn');
    const profileDropdown = document.getElementById('profile-dropdown');
    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('hidden');
        });

        document.addEventListener('click', (e) => {
            if (notifDropdown && !notifBtn?.contains(e.target) && !notifDropdown.contains(e.target)) {
                notifDropdown.classList.add('hidden');
            }
            if (profileDropdown && !profileBtn?.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.add('hidden');
            }
        });
    }

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            AppState.toggleTheme();
        });
    }
}

window.renderNavbar = renderNavbar;
