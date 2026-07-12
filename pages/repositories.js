/* ==========================================================================
   SECUREOPS // Repository Management Center (`pages/repositories.js`)
   ========================================================================== */

const RepositoriesPage = {
    render() {
        const state = AppState ? AppState.getState() : { repositories: [] };
        const repos = state.repositories || [];

        return `
            <div style="display: flex; flex-direction: column; gap: 24px;">
                <!-- Header & Action Toolbar -->
                <div class="flex-between flex-wrap" style="gap: 16px;">
                    <div>
                        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: #FFF; margin-bottom: 4px;">
                            Monitored Repositories & Microservices
                        </h2>
                        <p style="color: var(--text-secondary); font-size: 0.95rem;">
                            Manage continuous SAST, container security, and secret guardrails across ${repos.length} active codebases.
                        </p>
                    </div>

                    <div style="display: flex; gap: 12px; align-items: center;">
                        <div class="btn-group" style="display: flex; background: var(--bg-elevated); padding: 4px; border-radius: var(--radius-md); border: 1px solid var(--glass-border);">
                            <button class="btn btn-sm btn-primary" id="view-toggle-cards">⚡ Cards</button>
                            <button class="btn btn-sm btn-secondary" id="view-toggle-table">📋 Table</button>
                        </div>

                        <button class="btn btn-primary" id="add-repo-btn">
                            + Connect New Repository
                        </button>
                    </div>
                </div>

                <!-- Filter Controls -->
                <div class="glass-card" style="padding: 16px; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; gap: 12px; flex: 1; min-width: 260px;">
                        <span style="font-size: 1.1rem;">🔍</span>
                        <input type="text" id="repo-search-input" class="form-input" placeholder="Filter by repository name, language, or branch..." style="border: none; background: transparent; padding: 6px 0; font-size: 0.95rem; width: 100%;" />
                    </div>

                    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
                        <select id="repo-filter-lang" class="form-input" style="padding: 6px 12px; width: 150px; font-size: 0.85rem;">
                            <option value="ALL">All Languages</option>
                            <option value="Go">Go</option>
                            <option value="Python">Python</option>
                            <option value="TypeScript">TypeScript</option>
                            <option value="Rust">Rust</option>
                            <option value="YAML / HCL">YAML / HCL</option>
                        </select>

                        <select id="repo-filter-status" class="form-input" style="padding: 6px 12px; width: 160px; font-size: 0.85rem;">
                            <option value="ALL">All Statuses</option>
                            <option value="Secure">Secure (Pass)</option>
                            <option value="Action Required">Action Required</option>
                            <option value="Critical">Critical Findings</option>
                        </select>
                    </div>
                </div>

                <!-- Repositories Grid/Table Viewport -->
                <div id="repo-viewport">
                    <!-- Dynamic rendering inside afterRender/filters -->
                </div>
            </div>
        `;
    },

    afterRender(containerEl) {
        let currentView = 'cards';
        let searchQuery = '';
        let langFilter = 'ALL';
        let statusFilter = 'ALL';

        const viewport = document.getElementById('repo-viewport');
        const searchInput = document.getElementById('repo-search-input');
        const langSelect = document.getElementById('repo-filter-lang');
        const statusSelect = document.getElementById('repo-filter-status');
        const btnCards = document.getElementById('view-toggle-cards');
        const btnTable = document.getElementById('view-toggle-table');
        const btnAddRepo = document.getElementById('add-repo-btn');

        const updateView = () => {
            const state = AppState ? AppState.getState() : { repositories: [] };
            let filtered = state.repositories || [];

            if (searchQuery) {
                filtered = filtered.filter(r => 
                    r.name.toLowerCase().includes(searchQuery) ||
                    r.language.toLowerCase().includes(searchQuery) ||
                    r.description.toLowerCase().includes(searchQuery)
                );
            }
            if (langFilter !== 'ALL') {
                filtered = filtered.filter(r => r.language === langFilter);
            }
            if (statusFilter !== 'ALL') {
                filtered = filtered.filter(r => r.status === statusFilter);
            }

            if (filtered.length === 0) {
                viewport.innerHTML = `
                    <div class="glass-card" style="padding: 60px; text-align: center; color: var(--text-secondary);">
                        <div style="font-size: 2.5rem; margin-bottom: 12px;">📭</div>
                        <h3 style="font-family: var(--font-heading); color: #FFF; margin-bottom: 8px;">No Repositories Match This Criteria</h3>
                        <p style="font-size: 0.9rem; max-width: 400px; margin: 0 auto;">Try clearing your search filters or connect a new GitHub repository.</p>
                    </div>
                `;
                return;
            }

            if (currentView === 'cards') {
                viewport.innerHTML = `
                    <div class="grid-3" style="gap: 20px;">
                        ${filtered.map(r => `
                            <div class="scanner-card" style="border-top: 3px solid ${r.status === 'Secure' ? 'var(--neon-green)' : r.status === 'Action Required' ? 'var(--warning-amber)' : 'var(--alert-red)'};">
                                <div class="scanner-card-header">
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <span style="font-size: 1.4rem;">${r.language === 'Go' ? '🐹' : r.language === 'Python' ? '🐍' : r.language === 'TypeScript' ? '⚡' : r.language === 'Rust' ? '🦀' : '📑'}</span>
                                        <div style="display: flex; flex-direction: column;">
                                            <span style="font-weight: 700; font-size: 1.05rem; color: #FFF;">${r.name}</span>
                                            <span style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">branch: ${r.branch}</span>
                                        </div>
                                    </div>
                                    <span class="badge ${r.status === 'Secure' ? 'badge-secure' : r.status === 'Action Required' ? 'badge-warning' : 'badge-critical'}">${r.status}</span>
                                </div>

                                <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; flex: 1;">${r.description}</p>

                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; background: rgba(0,0,0,0.3); padding: 10px; border-radius: var(--radius-sm); font-size: 0.75rem; text-align: center;">
                                    <div>
                                        <div style="color: var(--alert-red); font-weight: 700; font-family: var(--font-mono); font-size: 0.95rem;">${r.critical}</div>
                                        <div style="color: var(--text-muted);">Critical</div>
                                    </div>
                                    <div>
                                        <div style="color: var(--warning-amber); font-weight: 700; font-family: var(--font-mono); font-size: 0.95rem;">${r.high}</div>
                                        <div style="color: var(--text-muted);">High</div>
                                    </div>
                                    <div>
                                        <div style="color: var(--primary-cyan); font-weight: 700; font-family: var(--font-mono); font-size: 0.95rem;">${r.score}/100</div>
                                        <div style="color: var(--text-muted);">Score</div>
                                    </div>
                                </div>

                                <div class="flex-between" style="border-top: 1px solid var(--glass-border); padding-top: 14px; margin-top: 4px;">
                                    <span style="font-size: 0.75rem; color: var(--text-muted);">Last scan: ${r.lastScanned}</span>
                                    <button class="btn btn-primary btn-sm" onclick="window.location.hash = '#/scan-center'" style="padding: 6px 14px; font-size: 0.8rem;">⚡ Scan Now</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            } else {
                viewport.innerHTML = `
                    <div class="data-table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Repository Name</th>
                                    <th>Language</th>
                                    <th>Branch</th>
                                    <th>Security Score</th>
                                    <th>Status</th>
                                    <th>CVE Findings (C / H / M)</th>
                                    <th>Last Scanned</th>
                                    <th style="text-align: right;">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${filtered.map(r => `
                                    <tr>
                                        <td>
                                            <strong style="color: #FFF; font-size: 0.95rem;">${r.name}</strong>
                                            <div style="font-size: 0.75rem; color: var(--text-muted); max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${r.description}</div>
                                        </td>
                                        <td><span class="badge" style="background: rgba(255,255,255,0.06);">${r.language}</span></td>
                                        <td style="font-family: var(--font-mono); font-size: 0.85rem;">${r.branch}</td>
                                        <td><span style="font-family: var(--font-mono); font-weight: 700; color: var(--primary-cyan); font-size: 1rem;">${r.score}</span></td>
                                        <td><span class="badge ${r.status === 'Secure' ? 'badge-secure' : r.status === 'Action Required' ? 'badge-warning' : 'badge-critical'}">${r.status}</span></td>
                                        <td>
                                            <span style="color: var(--alert-red); font-weight: 700;">${r.critical}C</span> / 
                                            <span style="color: var(--warning-amber); font-weight: 700;">${r.high}H</span> / 
                                            <span style="color: var(--primary-cyan);">${r.medium}M</span>
                                        </td>
                                        <td style="color: var(--text-secondary); font-size: 0.85rem;">${r.lastScanned}</td>
                                        <td style="text-align: right;">
                                            <button class="btn btn-secondary btn-sm" onclick="window.location.hash = '#/scan-center'">⚡ Launch Scan</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
            }
        };

        // Attach listeners
        if (searchInput) searchInput.addEventListener('input', (e) => { searchQuery = e.target.value.toLowerCase().trim(); updateView(); });
        if (langSelect) langSelect.addEventListener('change', (e) => { langFilter = e.target.value; updateView(); });
        if (statusSelect) statusSelect.addEventListener('change', (e) => { statusFilter = e.target.value; updateView(); });

        if (btnCards && btnTable) {
            btnCards.addEventListener('click', () => {
                currentView = 'cards';
                btnCards.className = 'btn btn-sm btn-primary';
                btnTable.className = 'btn btn-sm btn-secondary';
                updateView();
            });
            btnTable.addEventListener('click', () => {
                currentView = 'table';
                btnTable.className = 'btn btn-sm btn-primary';
                btnCards.className = 'btn btn-sm btn-secondary';
                updateView();
            });
        }

        if (btnAddRepo) {
            btnAddRepo.addEventListener('click', () => {
                showModal({
                    title: "Connect GitHub/GitLab Repository",
                    confirmText: "Authorize & Install Webhook",
                    bodyHtml: `
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            <p style="font-size: 0.9rem; color: var(--text-secondary);">Enter the repository URL and target branch to enable autonomous pre-commit guardrails.</p>
                            <div>
                                <label class="form-label">Git Repository URL</label>
                                <input type="text" class="form-input" placeholder="https://github.com/secureops-org/new-service" value="https://github.com/secureops-org/billing-engine-v2" />
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                                <div>
                                    <label class="form-label">Primary Branch</label>
                                    <input type="text" class="form-input" value="main" />
                                </div>
                                <div>
                                    <label class="form-label">Language Stack</label>
                                    <select class="form-input">
                                        <option>Go / Microservice</option>
                                        <option>TypeScript / Node</option>
                                        <option>Python / FastAPI</option>
                                        <option>Rust / Systems</option>
                                    </select>
                                </div>
                            </div>
                            <div style="background: rgba(0, 240, 255, 0.08); border: 1px solid rgba(0,240,255,0.25); padding: 12px; border-radius: var(--radius-md); font-size: 0.85rem; color: var(--primary-cyan);">
                                🛡️ SECUREOPS will automatically generate a zero-trust GitHub Action manifest (`.github/workflows/secureops.yml`) upon authorization.
                            </div>
                        </div>
                    `,
                    onConfirm: () => {
                        window.showToast("Repository authorized! Webhook manifest generated.", "success");
                    }
                });
            });
        }

        updateView();
    }
};

window.RepositoriesPage = RepositoriesPage;
