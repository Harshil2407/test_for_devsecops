/* ==========================================================================
   SECUREOPS // Main Application Bootstrapper (`script.js`)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Reactive State & Components
    if (window.AppState) {
        window.AppState.subscribe(() => {
            if (window.renderNavbar) renderNavbar();
            if (window.renderSidebar) renderSidebar();
        });
    }

    if (window.renderNavbar) renderNavbar();
    if (window.renderSidebar) renderSidebar();

    // 2. Initialize Canvas Particle Engine
    const canvasEl = document.getElementById('particle-canvas');
    if (canvasEl && window.ParticleEngine) {
        window.ParticleEngine.init(canvasEl);
    }

    // 3. Register SPA Routes
    if (window.Router) {
        window.Router.register('/', {
            render: (el) => window.renderStoryPage(el)
        });

        window.Router.register('/login', {
            render: (el) => { el.innerHTML = window.AuthPages.renderLogin(); }
        });

        window.Router.register('/register', {
            render: (el) => { el.innerHTML = window.AuthPages.renderRegister(); }
        });

        window.Router.register('/forgot-password', {
            render: (el) => { el.innerHTML = window.AuthPages.renderForgot(); }
        });

        window.Router.register('/dashboard', window.DashboardPage);
        window.Router.register('/repositories', window.RepositoriesPage);
        window.Router.register('/scan-center', window.ScanCenterPage);
        window.Router.register('/scan-history', window.ScanHistoryPage);
        window.Router.register('/reports', window.ReportsPage);
        window.Router.register('/vulnerabilities', window.VulnerabilityExplorerPage);
        window.Router.register('/pipeline', window.PipelinePage);
        window.Router.register('/notifications', window.NotificationsPage);
        window.Router.register('/profile', window.ProfilePage);
        window.Router.register('/admin', window.AdminPage);
        window.Router.register('/settings', window.SettingsPage);
        window.Router.register('/audit-logs', window.AuditLogsPage);
        window.Router.register('/about', window.AboutPage);
        window.Router.register('/documentation', window.DocumentationPage);
        window.Router.register('/help', window.HelpCenterPage);
        window.Router.register('/roadmap', window.RoadmapPage);

        window.Router.register('404', window.NotFoundPage);

        // Start Router navigation
        window.Router.init();
    }

    // 4. Global Keyboard Shortcuts (`Ctrl+K` or `Cmd+K` for Search)
    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchDrawer = document.getElementById('nav-search-drawer');
            const searchInput = document.getElementById('nav-search-input');
            if (searchDrawer) {
                searchDrawer.classList.toggle('hidden');
                if (!searchDrawer.classList.contains('hidden') && searchInput) {
                    searchInput.focus();
                }
            }
        }
    });

    // 5. Global Mouse Spotlight Follower across Glass Cards (Optimized with requestAnimationFrame & query caching)
    let spotlightRaf = null;
    let cachedCards = null;
    let lastQueryTime = 0;

    document.addEventListener('mousemove', (e) => {
        if (spotlightRaf) return;
        const cx = e.clientX;
        const cy = e.clientY;
        spotlightRaf = requestAnimationFrame(() => {
            const now = performance.now();
            if (!cachedCards || now - lastQueryTime > 2000) {
                cachedCards = document.querySelectorAll('.glass-card');
                lastQueryTime = now;
            }
            cachedCards.forEach(card => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--mouse-x', `${cx - rect.left}px`);
                card.style.setProperty('--mouse-y', `${cy - rect.top}px`);
            });
            spotlightRaf = null;
        });
    }, { passive: true });

    // Welcome Toast on First Boot
    setTimeout(() => {
        if (window.showToast) {
            window.showToast("🚀 SECUREOPS DevSecOps Portal ready. All 18 repository guardrails active.", "success");
        }
    }, 1000);
});

