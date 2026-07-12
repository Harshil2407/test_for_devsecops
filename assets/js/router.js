/* ==========================================================================
   SECUREOPS // SPA Hash Router (`assets/js/router.js`)
   ========================================================================== */

class Router {
    constructor(routes = {}) {
        this.routes = routes;
        this.currentRoute = null;
        this.storyViewport = document.getElementById('story-viewport');
        this.appShell = document.getElementById('app-shell');
        this.mainViewport = document.getElementById('main-viewport');
    }

    register(path, handler) {
        // Ensure paths have clean format
        if (!path.startsWith('/') && path !== '404') {
            path = '/' + path;
        }
        this.routes[path] = handler;
    }

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
        // Execute immediately upon init call
        this.handleRoute();
    }

    handleRoute() {
        let hash = window.location.hash.replace('#', '') || '/';
        const cleanHash = hash.split('?')[0];

        const route = this.routes[cleanHash] || this.routes['/404'] || {
            title: "Not Found",
            render: () => `<h2>Page Not Found</h2>`
        };

        this.currentRoute = cleanHash;

        // 1. STORY vs PLATFORM TOGGLE
        if (cleanHash === '/' || cleanHash === '') {
            if (this.storyViewport) this.storyViewport.classList.remove('hidden');
            if (this.appShell) this.appShell.classList.add('hidden');
            if (window.renderStoryPage && this.storyViewport) {
                window.renderStoryPage(this.storyViewport);
            }
        } else {
            if (this.storyViewport) this.storyViewport.classList.add('hidden');
            if (this.appShell) {
                this.appShell.classList.remove('hidden');
                // Trigger sliding navbar and sidebar entry animation when entering app shell
                const sidebar = document.getElementById('sidebar');
                const navbar = document.getElementById('navbar');
                if (sidebar && !sidebar.classList.contains('animated-entry')) {
                    sidebar.classList.add('animated-entry');
                    sidebar.style.animation = 'toastSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';
                }
                if (navbar && !navbar.classList.contains('animated-entry')) {
                    navbar.classList.add('animated-entry');
                    navbar.style.animation = 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';
                }
            }

            if (this.mainViewport && route && typeof route.render === 'function') {
                this.mainViewport.classList.remove('page-transition-enter');
                this.mainViewport.classList.add('page-transition-exit');
                
                setTimeout(() => {
                    this.mainViewport.innerHTML = route.render();
                    if (route.afterRender) {
                        route.afterRender(this.mainViewport);
                    }
                    this.mainViewport.classList.remove('page-transition-exit');
                    this.mainViewport.classList.add('page-transition-enter');
                    window.scrollTo(0, 0);

                    // Staggered card animation on entry
                    const cards = this.mainViewport.querySelectorAll('.card, .glass-card');
                    cards.forEach((card, idx) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50 + (idx * 75));
                    });
                }, 180);
            }

            this.updateSidebarActiveState(cleanHash);
            if (route && route.title) this.updateBreadcrumbs(route.title);
        }

        document.title = `${(route && route.title) || 'Portal'} // SECUREOPS AI DevSecOps`;
    }

    updateSidebarActiveState(hash) {
        const navItems = document.querySelectorAll('#sidebar .nav-item');
        navItems.forEach(item => {
            const itemHref = item.getAttribute('href')?.replace('#', '');
            if (itemHref === hash) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    updateBreadcrumbs(title) {
        const breadcrumbEl = document.getElementById('breadcrumb-current');
        if (breadcrumbEl && title) {
            breadcrumbEl.textContent = title;
        }
    }

    navigate(path) {
        window.location.hash = path;
    }
}

// Instantiate global window.Router singleton so script.js can register all routes
window.Router = new Router({});
window.AppRouter = window.Router;

